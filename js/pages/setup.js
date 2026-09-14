/**
 * setup.js — Trip Setup Wizard (3 steps)
 *
 * Step 1: Number of days + hours per day
 * Step 2: Per-day interest selection
 * Step 3: Food budget + starting point
 */

function renderSetup(container) {
  // Initialize state
  const state = {
    currentStep: 1,
    totalSteps: 3,
    days: 3,
    hoursPerDay: 6,
    budget: 20,
    startingPoint: 'jaffa-gate',
    dayInterests: {}, // { 0: ['religious'], 1: ['historical','cultural'], ... }
  };

  // Pre-fill default interests
  for (let i = 0; i < state.days; i++) {
    state.dayInterests[i] = ['religious'];
  }

  container.innerHTML = `
    <div class="page-setup">

      <!-- Navbar -->
      <nav class="navbar scrolled">
        <div class="navbar-brand" onclick="window.router.navigate('home')" style="cursor:pointer;">
          <div class="brand-icon">🗺️</div>
          <div class="brand-name">
            <span>دليلي</span>
            <span>القدس — البلدة القديمة</span>
          </div>
        </div>
        <div class="navbar-actions">
          <button class="btn btn-ghost" onclick="window.router.navigate('home')">← الرئيسية</button>
        </div>
      </nav>

      <!-- Header -->
      <div class="setup-header">
        <div class="container">
          <span class="section-label">إعداد الرحلة</span>
          <h1>خصّص جولتك</h1>
          <p>أخبرنا بتفاصيل رحلتك وسنبني لك المسار الأمثل</p>

          <!-- Progress -->
          <div class="setup-progress" style="margin-top:var(--space-6);" id="progress-indicator">
          </div>
        </div>
      </div>

      <!-- Steps -->
      <div class="setup-body">
        <div class="container" style="max-width:680px;">

          <!-- Step 1: Days & Hours -->
          <div class="setup-step active" id="step-1">
            <div class="setup-card">
              <div class="setup-label">الخطوة الأولى</div>
              <div class="setup-title">كم يوماً لديك للاستكشاف؟</div>

              <div style="margin-bottom:var(--space-8);">
                <div class="setup-label" style="margin-bottom:var(--space-4);">عدد الأيام</div>
                <div style="display:flex;align-items:center;justify-content:center;">
                  <div class="num-selector">
                    <button class="num-selector-btn" id="days-minus">−</button>
                    <span class="num-selector-value" id="days-value">٣</span>
                    <button class="num-selector-btn" id="days-plus">+</button>
                  </div>
                </div>
                <p class="text-muted text-sm" style="text-align:center;margin-top:var(--space-3);">
                  يمكنك اختيار من ١ إلى ٧ أيام
                </p>
              </div>

              <div class="divider"></div>

              <div style="margin-top:var(--space-6);">
                <div class="setup-label" style="margin-bottom:var(--space-2);">الساعات المتاحة يومياً</div>
                <div class="budget-display" id="hours-display" style="color:var(--text-primary);font-size:28px;">
                  ٦ ساعات
                </div>
                <input type="range" class="range-slider" id="hours-slider"
                       min="2" max="10" value="6" step="1"/>
                <div class="budget-labels">
                  <span>ساعتان</span>
                  <span>يوم كامل (١٠ ساعات)</span>
                </div>
              </div>
            </div>

            <div class="setup-nav">
              <div></div>
              <button class="btn btn-primary" id="step1-next">
                التالي ←
              </button>
            </div>
          </div>

          <!-- Step 2: Interests per day -->
          <div class="setup-step" id="step-2">
            <div class="setup-card">
              <div class="setup-label">الخطوة الثانية</div>
              <div class="setup-title">ما الذي تريد استكشافه؟</div>
              <p class="text-secondary text-sm" style="margin-bottom:var(--space-6);">
                اختر فئة اهتمام واحدة أو أكثر لكل يوم على حدة
              </p>

              <div class="days-interests-grid" id="days-interests-container">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <div class="setup-nav">
              <button class="btn btn-ghost" id="step2-back">→ السابق</button>
              <button class="btn btn-primary" id="step2-next">التالي ←</button>
            </div>
          </div>

          <!-- Step 3: Budget + Starting point -->
          <div class="setup-step" id="step-3">
            <div class="setup-card" style="margin-bottom:var(--space-5);">
              <div class="setup-label">الخطوة الثالثة</div>
              <div class="setup-title">ميزانية الطعام اليومية</div>

              <div class="budget-display" id="budget-display">$٢٠</div>
              <input type="range" class="range-slider" id="budget-slider"
                     min="5" max="80" value="20" step="5"/>
              <div class="budget-labels">
                <span>$٥ — اقتصادي</span>
                <span>$٨٠ — فاخر</span>
              </div>

              <div style="margin-top:var(--space-5);padding:var(--space-4);
                          background:var(--cream);border-radius:var(--radius-lg);
                          border:1px solid var(--border);">
                <p id="budget-hint" class="text-sm text-secondary" style="text-align:center;"></p>
              </div>
            </div>

            <div class="setup-card">
              <div class="setup-label" style="margin-bottom:var(--space-4);">نقطة البداية</div>
              <div class="setup-title" style="font-size:18px;margin-bottom:var(--space-5);">
                من أين تبدأ جولتك؟
              </div>
              <div class="start-points-grid" id="start-points-grid">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <!-- Summary card -->
            <div class="setup-card" id="summary-card"
                 style="background:linear-gradient(135deg,var(--stone-dark),var(--stone-medium));
                        border-color:rgba(201,151,59,0.2);">
              <h3 style="font-size:16px;font-weight:800;color:var(--gold-light);
                         margin-bottom:var(--space-4);display:flex;align-items:center;gap:var(--space-2);">
                ✅ ملخص رحلتك
              </h3>
              <div id="trip-summary" style="display:flex;flex-direction:column;gap:var(--space-3);">
              </div>
            </div>

            <div class="setup-nav">
              <button class="btn btn-ghost" id="step3-back"
                      style="color:var(--cream);">→ السابق</button>
              <button class="btn-primary-lg" id="generate-btn" style="font-size:16px;padding:var(--space-3) var(--space-8);">
                <span>✨</span>
                أنشئ خطتي
              </button>
            </div>
          </div>

        </div><!-- /container -->
      </div><!-- /setup-body -->
    </div>
  `;

  // ── Helpers ────────────────────────────────────────────────────
  const arabicNum = n => n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

  function updateProgress() {
    const el = document.getElementById('progress-indicator');
    let html = '<div class="progress-steps">';
    for (let i = 1; i <= state.totalSteps; i++) {
      const cls = i < state.currentStep ? 'completed' : i === state.currentStep ? 'active' : '';
      const icon = i < state.currentStep ? '✓' : i;
      html += `<div class="step-item">
        <div class="step-circle ${cls}">${icon}</div>
      </div>`;
      if (i < state.totalSteps) {
        html += `<div class="step-line ${i < state.currentStep ? 'completed' : ''}"></div>`;
      }
    }
    html += '</div>';
    el.innerHTML = html;
  }

  function showStep(n) {
    document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${n}`).classList.add('active');
    state.currentStep = n;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDaysInterests() {
    const container = document.getElementById('days-interests-container');
    const interests = [
      { id: 'religious', label: 'ديني',          icon: '🕌' },
      { id: 'historical', label: 'تاريخي',        icon: '🏛️' },
      { id: 'cultural',  label: 'ثقافي وترفيهي', icon: '🎭' },
    ];
    const dayNames = ['اليوم الأول','اليوم الثاني','اليوم الثالث',
                      'اليوم الرابع','اليوم الخامس','اليوم السادس','اليوم السابع'];

    let html = '';
    for (let d = 0; d < state.days; d++) {
      html += `
        <div class="day-interests-row">
          <div class="day-label-row">
            <span class="day-number-badge">📅 ${dayNames[d]}</span>
            <span class="text-muted text-sm">اختر واحداً أو أكثر</span>
          </div>
          <div class="chips-row" data-day="${d}">
      `;
      interests.forEach(interest => {
        const sel = (state.dayInterests[d] || []).includes(interest.id) ? 'selected' : '';
        html += `
          <button class="interest-chip ${sel}" data-day="${d}" data-interest="${interest.id}">
            <span class="chip-icon">${interest.icon}</span>
            ${interest.label}
          </button>
        `;
      });
      html += '</div></div>';
    }
    container.innerHTML = html;

    // Chip click handlers
    container.querySelectorAll('.interest-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const day = parseInt(chip.dataset.day);
        const interest = chip.dataset.interest;
        if (!state.dayInterests[day]) state.dayInterests[day] = [];
        const idx = state.dayInterests[day].indexOf(interest);
        if (idx === -1) {
          state.dayInterests[day].push(interest);
          chip.classList.add('selected');
        } else {
          if (state.dayInterests[day].length === 1) return; // keep at least one
          state.dayInterests[day].splice(idx, 1);
          chip.classList.remove('selected');
        }
      });
    });
  }

  function renderStartPoints() {
    const grid = document.getElementById('start-points-grid');
    grid.innerHTML = MOCK_DATA.startingPoints.map(sp => `
      <div class="start-point-card ${sp.id === state.startingPoint ? 'selected' : ''}"
           data-sp="${sp.id}">
        <div class="sp-icon">${sp.icon}</div>
        <div class="sp-name">${sp.name}</div>
        <div class="sp-desc">${sp.desc}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.start-point-card').forEach(card => {
      card.addEventListener('click', () => {
        state.startingPoint = card.dataset.sp;
        grid.querySelectorAll('.start-point-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateSummary();
      });
    });
  }

  function updateBudgetHint() {
    const b = state.budget;
    let hint = '';
    if (b <= 10)      hint = '💚 مثالي للمسافرين الاقتصاديين — كنافة، فلافل، وقهوة عربية';
    else if (b <= 25) hint = '🥙 تغطية جيدة — وجبة رئيسية واستراحة مريحة';
    else if (b <= 50) hint = '🍽️ خيارات أرحب — مطاعم تراثية وتجارب أصيلة';
    else              hint = '🌟 تجربة فاخرة — أفضل المطاعم ووجبات متعددة';
    document.getElementById('budget-hint').textContent = hint;
  }

  function updateSummary() {
    const sp = MOCK_DATA.startingPoints.find(s => s.id === state.startingPoint);
    const dayNames = ['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع'];
    const interestMap = { religious: 'ديني 🕌', historical: 'تاريخي 🏛️', cultural: 'ثقافي 🎭' };
    const summaryEl = document.getElementById('trip-summary');

    let html = `
      <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
        <div style="padding:var(--space-2) var(--space-4);background:rgba(201,151,59,0.15);
                    border-radius:var(--radius-full);color:var(--gold-light);font-size:13px;font-weight:700;">
          📅 ${arabicNum(state.days)} أيام
        </div>
        <div style="padding:var(--space-2) var(--space-4);background:rgba(201,151,59,0.15);
                    border-radius:var(--radius-full);color:var(--gold-light);font-size:13px;font-weight:700;">
          ⏱️ ${arabicNum(state.hoursPerDay)} ساعات/يوم
        </div>
        <div style="padding:var(--space-2) var(--space-4);background:rgba(201,151,59,0.15);
                    border-radius:var(--radius-full);color:var(--gold-light);font-size:13px;font-weight:700;">
          💰 $${state.budget}/يوم
        </div>
        <div style="padding:var(--space-2) var(--space-4);background:rgba(201,151,59,0.15);
                    border-radius:var(--radius-full);color:var(--gold-light);font-size:13px;font-weight:700;">
          📍 ${sp ? sp.name : ''}
        </div>
      </div>
    `;

    for (let d = 0; d < state.days; d++) {
      const interests = (state.dayInterests[d] || ['religious'])
        .map(i => interestMap[i] || i).join(' + ');
      html += `
        <div style="display:flex;align-items:center;justify-content:space-between;
                    padding:var(--space-2) 0;border-bottom:1px solid rgba(201,151,59,0.1);">
          <span style="color:rgba(247,242,232,0.7);font-size:13px;">اليوم ${dayNames[d]}</span>
          <span style="color:var(--cream);font-size:13px;font-weight:700;">${interests}</span>
        </div>
      `;
    }
    summaryEl.innerHTML = html;
  }

  // ── Initial Renders ────────────────────────────────────────────
  updateProgress();
  updateBudgetHint();

  // ── Step 1 Logic ───────────────────────────────────────────────
  function syncDaysDisplay() {
    document.getElementById('days-value').textContent = arabicNum(state.days);
    // Re-sync interests object when days change
    for (let i = 0; i < state.days; i++) {
      if (!state.dayInterests[i]) state.dayInterests[i] = ['religious'];
    }
  }

  document.getElementById('days-minus').addEventListener('click', () => {
    if (state.days > 1) { state.days--; syncDaysDisplay(); }
  });
  document.getElementById('days-plus').addEventListener('click', () => {
    if (state.days < 7) { state.days++; syncDaysDisplay(); }
  });

  const hoursSlider = document.getElementById('hours-slider');
  hoursSlider.addEventListener('input', () => {
    state.hoursPerDay = parseInt(hoursSlider.value);
    document.getElementById('hours-display').textContent =
      `${arabicNum(state.hoursPerDay)} ${state.hoursPerDay === 1 ? 'ساعة' : 'ساعات'}`;
  });

  document.getElementById('step1-next').addEventListener('click', () => {
    showStep(2);
    renderDaysInterests();
  });

  // ── Step 2 Logic ───────────────────────────────────────────────
  document.getElementById('step2-back').addEventListener('click', () => showStep(1));
  document.getElementById('step2-next').addEventListener('click', () => {
    showStep(3);
    renderStartPoints();
    updateSummary();
    updateBudgetHint();
  });

  // ── Step 3 Logic ───────────────────────────────────────────────
  document.getElementById('step3-back').addEventListener('click', () => {
    showStep(2);
    renderDaysInterests();
  });

  const budgetSlider = document.getElementById('budget-slider');
  budgetSlider.addEventListener('input', () => {
    state.budget = parseInt(budgetSlider.value);
    document.getElementById('budget-display').textContent = `$${arabicNum(state.budget)}`;
    updateBudgetHint();
    updateSummary();
  });

  document.getElementById('generate-btn').addEventListener('click', () => {
    // Save to global AppState for the route page to read
    window.AppState.tripConfig = { ...state };

    // Show loading animation briefly
    const btn = document.getElementById('generate-btn');
    btn.innerHTML = '<span class="spinner" style="width:22px;height:22px;border-width:2px;"></span> جارٍ الإنشاء...';
    btn.disabled = true;

    setTimeout(() => {
      window.router.navigate('route');
    }, 1200);
  });
}

window.renderSetup = renderSetup;
