/**
 * place.js — Place Detail Page + AI Chat Panel
 *
 * Stage 2: place data is fetched from the FastAPI backend via PlacesAPI.getById().
 * Falls back to mock.js getPlace() if the API is unreachable.
 *
 * Nearby places are resolved from the cached API place list (window._cachedApiPlaces)
 * populated by PlacesAPI.getAll(), with a graceful fallback to mock.js getPlace().
 */

async function renderPlace(container, params) {
  const placeId = params.id || window.AppState.selectedPlaceId;

  // Show a lightweight loading skeleton while the API call is in flight
  container.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
                flex-direction:column;gap:var(--space-4);color:var(--text-muted);
                padding-top:var(--nav-height);">
      <div style="font-size:40px;animation:spin 1s linear infinite;">🔄</div>
      <p style="font-size:14px;font-weight:700;">جارٍ تحميل تفاصيل المكان...</p>
    </div>
    <style>@keyframes spin { to { transform:rotate(360deg); } }</style>
  `;

  // Ensure we have the full place list cached for resolving nearby places.
  // If route.js already called PlacesAPI.getAll(), this is a no-op (instant).
  if (!window._cachedApiPlaces) {
    window._cachedApiPlaces = await PlacesAPI.getAll();
  }

  /**
   * Resolve a nearby place by ID:
   *   1. API-fetched list  (window._cachedApiPlaces)
   *   2. mock.js getPlace  (fallback)
   */
  function resolveNearbyPlace(id) {
    const fromApi = (window._cachedApiPlaces || []).find(p => p.id === id);
    if (fromApi) return fromApi;
    return window.getPlace ? window.getPlace(id) : null;
  }

  // Fetch from API — falls back to mock automatically on network failure
  const place = await PlacesAPI.getById(placeId);

  if (!place) {
    container.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
                  flex-direction:column;gap:var(--space-6);padding:var(--space-8);">
        <div style="font-size:64px;">😕</div>
        <h2 style="font-size:24px;font-weight:800;color:var(--text-primary);">
          المكان غير موجود
        </h2>
        <button class="btn btn-primary" onclick="window.router.navigate('route')">
          ← العودة إلى الخطة
        </button>
      </div>
    `;
    return;
  }

  const isRestaurant = !!place.type; // restaurants have a 'type' field
  const categoryColors = {
    religious:  { bg: 'rgba(78,122,197,0.12)',  color: '#3A6BC5' },
    historical: { bg: 'rgba(184,92,56,0.12)',   color: '#B85C38' },
    cultural:   { bg: 'rgba(45,90,39,0.12)',    color: '#2D5A27' },
  };
  const catStyle = categoryColors[place.category] || categoryColors.cultural;

  // Image or gradient fallback
  const hasImage = place.image;
  const heroStyle = hasImage ? '' : `
    background: linear-gradient(135deg,
      ${catStyle.color} 0%,
      rgba(26,18,8,0.8) 100%);
  `;

  container.innerHTML = `
    <div class="page-place">

      <!-- Navbar -->
      <nav class="navbar scrolled" id="place-nav">
        <div class="navbar-brand" onclick="window.router.navigate('home')" style="cursor:pointer;">
          <div class="brand-icon">🗺️</div>
          <div class="brand-name">
            <span>دليلي</span>
            <span>القدس — البلدة القديمة</span>
          </div>
        </div>
        <div class="navbar-actions">
          <button class="btn btn-ghost" onclick="window.router.navigate('route')"
                  style="display:flex;align-items:center;gap:var(--space-2);">
            ← العودة للخطة
          </button>
        </div>
      </nav>

      <!-- Hero Image -->
      <div class="place-hero" style="${heroStyle}">
        ${hasImage
          ? `<img src="${place.image}" alt="${place.name}" loading="eager" onerror="this.style.display='none'"/>`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;">${place.categoryIcon || '🏛️'}</div>`
        }
        <div class="place-hero-content">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3);">
            <span class="badge badge-${place.category || 'cultural'}" style="font-size:13px;padding:4px 14px;">
              ${place.categoryIcon || '📍'} ${place.categoryLabel || place.type || 'موقع'}
            </span>
            ${place.quarter ? `
              <span style="padding:4px 12px;border-radius:var(--radius-full);font-size:12px;
                           font-weight:700;background:rgba(247,242,232,0.15);color:rgba(247,242,232,0.9);">
                📍 ${place.quarter}
              </span>
            ` : ''}
          </div>
          <h1 class="place-name">${place.name}</h1>
          ${place.rating ? `
            <div style="display:flex;align-items:center;gap:var(--space-2);">
              <span style="color:#FFD700;font-size:18px;">★</span>
              <span style="color:var(--cream);font-weight:700;font-size:15px;">${place.rating}</span>
              <span style="color:rgba(247,242,232,0.6);font-size:13px;">تقييم الزوار</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Content -->
      <div class="container" style="padding-top:0;">
        <div class="place-layout">

          <!-- Left: Info Panel -->
          <div class="place-info-panel">

            <!-- Stats row -->
            <div class="place-section-card" style="padding:var(--space-5);">
              <div class="stat-row">
                ${place.visitDuration ? `
                  <div class="stat-item">
                    <span class="stat-icon">⏱</span>
                    <span class="stat-value">${Math.floor(place.visitDuration / 60) > 0
                      ? `${Math.floor(place.visitDuration / 60)}س ${place.visitDuration % 60 > 0 ? place.visitDuration % 60 + 'د' : ''}`
                      : place.visitDuration + ' د'
                    }</span>
                    <span class="stat-label">مدة الزيارة</span>
                  </div>
                ` : ''}
                ${place.quarter ? `
                  <div class="stat-item">
                    <span class="stat-icon">🏘</span>
                    <span class="stat-value" style="font-size:12px;text-align:center;">${place.quarter}</span>
                    <span class="stat-label">الحي</span>
                  </div>
                ` : ''}
                ${place.entranceFee ? `
                  <div class="stat-item">
                    <span class="stat-icon">🎟</span>
                    <span class="stat-value" style="font-size:12px;text-align:center;">${place.entranceFee}</span>
                    <span class="stat-label">رسوم الدخول</span>
                  </div>
                ` : ''}
                ${place.openHours ? `
                  <div class="stat-item">
                    <span class="stat-icon">🕐</span>
                    <span class="stat-value" style="font-size:11px;text-align:center;">${place.openHours}</span>
                    <span class="stat-label">أوقات الزيارة</span>
                  </div>
                ` : ''}
                ${place.avgCost ? `
                  <div class="stat-item">
                    <span class="stat-icon">💰</span>
                    <span class="stat-value">~$${place.avgCost}</span>
                    <span class="stat-label">متوسط التكلفة</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Description -->
            <div class="place-section-card">
              <h2 class="place-section-title">
                <span>📖</span> عن ${isRestaurant ? 'المكان' : 'الموقع'}
              </h2>
              <p class="place-description">${place.fullDescription || place.description || place.cuisine || ''}</p>
            </div>

            <!-- Significance (places only) -->
            ${place.significance ? `
              <div class="place-section-card"
                   style="background:linear-gradient(135deg,var(--gold-subtle),var(--cream));
                          border-color:var(--border-strong);">
                <h2 class="place-section-title">
                  <span>⭐</span> الأهمية الدينية والتاريخية
                </h2>
                <p class="place-description">${place.significance}</p>
              </div>
            ` : ''}

            <!-- Tags -->
            ${(place.tags || []).length > 0 ? `
              <div class="place-section-card" style="padding:var(--space-4) var(--space-5);">
                <h2 class="place-section-title" style="margin-bottom:var(--space-3);">
                  <span>🏷</span> الفئات
                </h2>
                <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);">
                  ${place.tags.map(t => `
                    <span style="padding:4px 12px;border-radius:var(--radius-full);font-size:12px;
                                 font-weight:700;background:var(--cream-dark);color:var(--text-secondary);
                                 border:1px solid var(--border);">${t}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Nearby places -->
            ${(place.nearbyPlaces || []).length > 0 ? `
              <div class="place-section-card">
                <h2 class="place-section-title">
                  <span>📍</span> مواقع قريبة
                </h2>
                <div style="display:flex;flex-direction:column;gap:var(--space-3);">
                  ${place.nearbyPlaces.slice(0, 3).map(nearId => {
                    const near = resolveNearbyPlace(nearId);
                    if (!near) return '';
                    return `
                      <div class="timeline-item"
                           style="border-radius:var(--radius-lg);border:1px solid var(--border);"
                           onclick="window.AppState.selectedPlaceId='${nearId}';window.router.navigate('place/${nearId}')">
                        <div class="timeline-icon ${near.category || 'cultural'}"
                             style="width:36px;height:36px;font-size:16px;">
                          ${near.categoryIcon || near.icon || '📍'}
                        </div>
                        <div class="timeline-content" style="padding-bottom:0;">
                          <div class="timeline-place-name">${near.name}</div>
                          <div class="timeline-meta">
                            <span class="badge badge-${near.category || 'cultural'}">${near.categoryLabel || near.type || ''}</span>
                          </div>
                        </div>
                        <div style="color:var(--text-muted);font-size:20px;padding-left:var(--space-2);">←</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Back button -->
            <div style="padding-bottom:var(--space-6);">
              <button class="btn btn-outline w-full" onclick="window.router.navigate('route')"
                      style="justify-content:center;">
                ← العودة إلى الخطة اليومية
              </button>
            </div>

          </div><!-- /place-info-panel -->

          <!-- Right: AI Chat sticky -->
          <div class="place-chat-sticky">

            <!-- AI Action buttons -->
            <div style="background:linear-gradient(135deg,var(--stone-dark),var(--stone-medium));
                        border-radius:var(--radius-xl);padding:var(--space-5);">
              <p style="font-size:13px;font-weight:700;color:var(--gold-light);margin-bottom:var(--space-3);
                        display:flex;align-items:center;gap:var(--space-2);">
                ✏️ تعديل الخطة
              </p>
              <div style="display:flex;flex-direction:column;gap:var(--space-2);">
                <button class="ai-quick-chip w-full" style="text-align:right;padding:var(--space-3) var(--space-4);"
                        data-action-msg="احذف ${place.name} من خطتي">
                  🗑️ احذف هذا المكان من الخطة
                </button>
                <button class="ai-quick-chip w-full" style="text-align:right;padding:var(--space-3) var(--space-4);"
                        data-action-msg="استبدل ${place.name} بمكان قريب مماثل">
                  🔄 استبدل بمكان مماثل قريب
                </button>
                <button class="ai-quick-chip w-full" style="text-align:right;padding:var(--space-3) var(--space-4);"
                        data-action-msg="لقد زرت ${place.name} بالفعل، ماذا أزور بعده؟">
                  ✅ لقد زرت هذا المكان بالفعل
                </button>
              </div>
            </div>

            <!-- Chat panel -->
            <div class="chat-panel">
              <div class="chat-header">
                <div class="chat-avatar">🤖</div>
                <div class="chat-header-info">
                  <div class="chat-name">مساعد دليلي الذكي</div>
                  <div class="chat-status">
                    <span class="status-dot"></span>
                    يعرف كل شيء عن ${place.name}
                  </div>
                </div>
              </div>

              <div class="chat-messages" id="place-chat-messages">
                <div class="chat-message ai">
                  <div class="msg-avatar ai">🤖</div>
                  <div class="msg-bubble">
                    مرحباً! أنا هنا لمساعدتك في معرفة كل شيء عن
                    <strong>${place.name}</strong>. يمكنني أيضاً تعديل خطتك أو اقتراح ما تفعله بعد زيارة هذا المكان. 🗺️
                  </div>
                </div>
              </div>

              <div class="chat-quick-actions">
                <button class="quick-action-chip"
                        data-chat-msg="لماذا ${place.name} مهم؟">❓ لماذا هذا المكان مهم؟</button>
                <button class="quick-action-chip"
                        data-chat-msg="كم أحتاج من الوقت لزيارة ${place.name}؟">⏱ كم أحتاج من الوقت؟</button>
                <button class="quick-action-chip"
                        data-chat-msg="ما أقرب مكان يمكن زيارته بعد ${place.name}؟">📍 ما المكان التالي؟</button>
                <button class="quick-action-chip"
                        data-chat-msg="أريد مطعماً رخيصاً بالقرب من ${place.name}">🍽 مطعم قريب رخيص</button>
              </div>

              <div class="chat-input-area">
                <input type="text" class="chat-input" id="place-chat-input"
                       placeholder="اسألني عن هذا المكان أو عدّل خطتك..."/>
                <button class="chat-send-btn" id="place-send-btn">➤</button>
              </div>
            </div>

          </div><!-- /place-chat-sticky -->
        </div><!-- /place-layout -->
      </div><!-- /container -->
    </div><!-- /page-place -->
  `;

  // ── Chat logic ────────────────────────────────────────────
  function sendPlaceChat(msg) {
    const messagesEl = document.getElementById('place-chat-messages');

    messagesEl.innerHTML += `
      <div class="chat-message user">
        <div class="msg-avatar user">أنت</div>
        <div class="msg-bubble">${msg}</div>
      </div>
    `;

    const typingId = 'typing-' + Date.now();
    messagesEl.innerHTML += `
      <div class="chat-message ai" id="${typingId}">
        <div class="msg-avatar ai">🤖</div>
        <div class="msg-bubble" style="padding:var(--space-2) var(--space-3);">
          <div class="typing-dots">
            <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById(typingId);
      if (el) el.querySelector('.msg-bubble').innerHTML = getAiResponse(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 900 + Math.random() * 600);
  }

  // Quick action chips (edit plan)
  document.querySelectorAll('[data-action-msg]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Open from route page context would show route modal,
      // but here we show it in the chat panel directly
      sendPlaceChat(btn.dataset.actionMsg);
      document.querySelector('#place-chat-messages').closest('.chat-panel')
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Chat quick action chips
  document.querySelectorAll('[data-chat-msg]').forEach(chip => {
    chip.addEventListener('click', () => sendPlaceChat(chip.dataset.chatMsg));
  });

  // Send button
  document.getElementById('place-send-btn').addEventListener('click', () => {
    const input = document.getElementById('place-chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    sendPlaceChat(msg);
    input.value = '';
  });

  document.getElementById('place-chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const msg = e.target.value.trim();
      if (!msg) return;
      sendPlaceChat(msg);
      e.target.value = '';
    }
  });
}

// renderPlace is async — the router calls it without await,
// which is fine: the page renders itself once the fetch resolves.
window.renderPlace = renderPlace;
