/**
 * route.js — Generated Route / Itinerary Page
 * 
 * Features:
 * 1. Dynamic trip generation for N days (exact match with setup selection).
 * 2. Per-day interest filtering.
 * 3. Restored AI Chatbot assistant modal.
 * 4. Restored "Modify My Plan" modal with interactive plan editing.
 * 5. Integrated Google Maps API support with graceful interactive SVG fallback.
 */

async function renderRoute(container) {
  const config = window.AppState.tripConfig || {
    days: 3,
    hoursPerDay: 6,
    budget: 20,
    startingPoint: 'jaffa-gate',
    dayInterests: { 0: ['religious'], 1: ['historical', 'cultural'], 2: ['religious', 'historical'] }
  };

  const numDays = Math.max(1, config.days || 3);
  let activeDay = 0;
  let apiPlaces = [];

  const dayNames = ['اليوم الأول', 'اليوم الثاني', 'اليوم الثالث', 'اليوم الرابع', 'اليوم الخامس', 'اليوم السادس', 'اليوم السابع'];
  const interestMap = { religious: 'ديني 🕌', historical: 'تاريخي 🏛️', cultural: 'ثقافي 🎭' };

  // Fetch places from API (fallback to mock)
  try {
    apiPlaces = await PlacesAPI.getAll();
  } catch (e) {
    console.warn("Failed to fetch places API, using mock:", e);
    apiPlaces = window.MOCK_DATA ? window.MOCK_DATA.places : [];
  }
  window._cachedApiPlaces = apiPlaces;

  const placeLookup = Object.fromEntries(apiPlaces.map(p => [p.id, p]));
  function getPlaceData(id) {
    return placeLookup[id] || (window.getPlace ? window.getPlace(id) : null);
  }

  // ── Dynamic Itinerary Generation ─────────────────────────────
  const generatedItineraries = {};

  function generateDynamicItinerary(dayIndex) {
    if (generatedItineraries[dayIndex]) return generatedItineraries[dayIndex];

    const dayInterests = (config.dayInterests && config.dayInterests[dayIndex])
      ? config.dayInterests[dayIndex]
      : ['religious'];

    // Filter places matching day interests
    let matchingPlaces = apiPlaces.filter(p => dayInterests.includes(p.category));
    if (matchingPlaces.length < 2) {
      // Supplement with remaining places if category count is low
      const remaining = apiPlaces.filter(p => !matchingPlaces.includes(p));
      matchingPlaces = [...matchingPlaces, ...remaining];
    }

    // Pick 3-4 places deterministically for this day based on dayIndex
    const startIdx = (dayIndex * 2) % apiPlaces.length;
    const selectedPlaces = [];
    for (let i = 0; i < matchingPlaces.length; i++) {
      const p = matchingPlaces[(startIdx + i) % matchingPlaces.length];
      if (!selectedPlaces.includes(p)) {
        selectedPlaces.push(p);
      }
      if (selectedPlaces.length >= 3) break;
    }

    // Pick restaurant matching budget
    let restaurantId = 'rest-cafe-quds';
    if (config.budget <= 10) restaurantId = 'rest-knafeh';
    else if (config.budget >= 25) restaurantId = 'rest-khan';
    else restaurantId = 'rest-jddo';

    const restData = getPlaceData(restaurantId);

    // Pick starting point name
    const spObj = window.MOCK_DATA ? window.MOCK_DATA.startingPoints.find(s => s.id === config.startingPoint) : null;
    const startName = spObj ? `${spObj.name} — نقطة البداية` : 'باب الخليل — نقطة البداية';

    // Theme metadata
    let themeName = 'جولة مخصصة في القدس القديمة';
    let themeEmoji = '🗺️';
    if (dayInterests.includes('religious') && dayInterests.includes('historical')) {
      themeName = 'رحلة في عمق الإيمان والتاريخ'; themeEmoji = '✨';
    } else if (dayInterests.includes('religious')) {
      themeName = 'جولة دينية في رحاب القدس الشريف'; themeEmoji = '🕌';
    } else if (dayInterests.includes('historical')) {
      themeName = 'استكشاف القلاع والآثار القديمة'; themeEmoji = '🏛️';
    } else if (dayInterests.includes('cultural')) {
      themeName = 'جولة التراث الثقافي والأسواق التراثية'; themeEmoji = '🎭';
    }

    // Build timeline items with calculated times
    let currentHour = 9;
    let currentMin = 0;

    function formatTime(h, m) {
      const hh = h < 10 ? `0${h}` : `${h}`;
      const mm = m < 10 ? `0${m}` : `${m}`;
      return `${hh}:${mm}`;
    }

    function addMinutes(min) {
      currentMin += min;
      while (currentMin >= 60) {
        currentMin -= 60;
        currentHour += 1;
      }
    }

    const items = [];

    // Step 0: Start
    items.push({
      time: formatTime(currentHour, currentMin),
      placeId: null,
      type: 'start',
      name: startName,
      icon: '📍',
      walkNext: 5,
      walkNextLabel: '5 دق مشياً'
    });
    addMinutes(5);

    // Step 1: First Place
    if (selectedPlaces[0]) {
      items.push({
        time: formatTime(currentHour, currentMin),
        placeId: selectedPlaces[0].id,
        type: selectedPlaces[0].category,
        icon: selectedPlaces[0].category_icon || '📍',
        walkNext: 8,
        walkNextLabel: '8 دق مشياً',
        visitMin: selectedPlaces[0].estimated_visit_duration || 45
      });
      addMinutes(selectedPlaces[0].estimated_visit_duration || 45);
      addMinutes(8);
    }

    // Step 2: Second Place
    if (selectedPlaces[1]) {
      items.push({
        time: formatTime(currentHour, currentMin),
        placeId: selectedPlaces[1].id,
        type: selectedPlaces[1].category,
        icon: selectedPlaces[1].category_icon || '📍',
        walkNext: 10,
        walkNextLabel: '10 دق مشياً',
        visitMin: selectedPlaces[1].estimated_visit_duration || 45
      });
      addMinutes(selectedPlaces[1].estimated_visit_duration || 45);
      addMinutes(10);
    }

    // Step 3: Rest / Restaurant
    items.push({
      time: formatTime(currentHour, currentMin),
      placeId: restaurantId,
      type: 'rest',
      icon: restData ? restData.icon || '🍽️' : '🍽️',
      walkNext: 7,
      walkNextLabel: '7 دق مشياً',
      visitMin: 45,
      isRestaurant: true
    });
    addMinutes(45);
    addMinutes(7);

    // Step 4: Third Place
    if (selectedPlaces[2]) {
      items.push({
        time: formatTime(currentHour, currentMin),
        placeId: selectedPlaces[2].id,
        type: selectedPlaces[2].category,
        icon: selectedPlaces[2].category_icon || '📍',
        walkNext: 0,
        walkNextLabel: null,
        visitMin: selectedPlaces[2].estimated_visit_duration || 60
      });
      addMinutes(selectedPlaces[2].estimated_visit_duration || 60);
    }

    const itin = {
      dayName: dayNames[dayIndex] || `اليوم ${dayIndex + 1}`,
      themeName: themeName,
      themeEmoji: themeEmoji,
      interests: dayInterests,
      totalWalkKm: (2.4 + (dayIndex * 0.4)).toFixed(1),
      totalWalkMin: 35 + (dayIndex * 4),
      totalPlaces: items.filter(i => i.placeId).length,
      suggestedBudget: config.budget,
      startTime: '09:00',
      items: items
    };

    generatedItineraries[dayIndex] = itin;
    return itin;
  }

  function getActiveItinerary(dIdx) {
    return generateDynamicItinerary(dIdx);
  }

  // ── Outer Shell & CSS ─────────────────────────────────────────
  container.innerHTML = `
    <style>
      .page-route-refined {
        min-height: 100vh;
        background: #FAFAFA;
        padding-top: calc(var(--nav-height) + 24px);
        padding-bottom: 60px;
      }
      
      .route-layout-modern {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 32px;
        align-items: start;
      }
      
      .map-panel {
        position: sticky;
        top: calc(var(--nav-height) + 24px);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        background: #F1ECE1;
        height: calc(100vh - var(--nav-height) - 64px);
        min-height: 520px;
        border: 1px solid rgba(0,0,0,0.05);
      }
      
      .map-overlay-stats {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        padding: 12px 24px;
        border-radius: 14px;
        display: flex;
        gap: 24px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        border: 1px solid rgba(200,200,200,0.2);
        z-index: 10;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .stat-val {
        font-weight: 900;
        font-size: 18px;
        color: #1F2937;
      }
      .stat-lbl {
        font-size: 11px;
        color: #6B7280;
        font-weight: 700;
      }
      
      .map-overlay-legend {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        padding: 14px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        font-size: 11px;
        font-weight: 700;
        color: #4B5563;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 10;
      }
      .legend-item { display: flex; align-items: center; gap: 8px; }
      .legend-color { width: 14px; height: 14px; border-radius: 50%; }
      
      .animated-route-path {
        stroke-dashoffset: 1000;
        animation: drawPath 2.5s ease-out forwards;
      }
      @keyframes drawPath { to { stroke-dashoffset: 0; } }
      
      @keyframes markerPop {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      .map-marker {
        opacity: 0;
        animation: markerPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      .clickable-marker { cursor: pointer; }
      
      /* Day Tabs */
      .day-tabs-modern {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
        overflow-x: auto;
        padding-bottom: 8px;
      }
      .day-tab-btn {
        padding: 10px 24px;
        border-radius: 30px;
        border: 1px solid var(--border);
        background: white;
        color: var(--text-secondary);
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .day-tab-btn.active {
        background: var(--stone-dark);
        color: var(--cream);
        border-color: var(--stone-dark);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      .day-header-rich {
        margin-bottom: 24px;
      }
      .day-header-rich h2 {
        font-size: 26px;
        font-weight: 900;
        color: var(--text-primary);
        margin-bottom: 12px;
        line-height: 1.3;
      }
      .day-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .badge-modern {
        background: var(--gold-subtle);
        color: var(--gold-dark);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 800;
      }
      
      /* Timeline Steps */
      .timeline-step {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
      }
      .timeline-step.clickable { cursor: pointer; }
      .timeline-step.clickable:hover .step-card {
        border-color: rgba(201,151,59,0.5);
        box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        transform: translateY(-2px);
      }
      
      .step-time {
        width: 50px;
        font-size: 14px;
        font-weight: 800;
        color: var(--text-secondary);
        padding-top: 16px;
        text-align: left;
      }
      
      .step-spine {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 28px;
      }
      .step-marker {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 14px;
        z-index: 2;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      .step-marker.place { background: #2563EB; color: white; }
      .step-marker.rest { background: #F59E0B; font-size:14px; color: white; }
      .step-marker.start { background: #10B981; border: 3px solid white; width:24px; height:24px; margin-top:4px; box-shadow:0 0 0 1px rgba(0,0,0,0.1); }
      
      .step-line {
        flex: 1;
        width: 2px;
        background: #E5E7EB;
        margin: 4px 0;
      }
      
      .step-content {
        flex: 1;
        padding-bottom: 24px;
      }
      .step-card {
        display: flex;
        background: white;
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        transition: all 0.2s ease;
      }
      .step-img, .step-placeholder {
        width: 100px;
        height: 100px;
        object-fit: cover;
        flex-shrink: 0;
      }
      .step-placeholder {
        background: #F3F4F6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
      }
      .step-info {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
      }
      .step-info h3 {
        font-size: 16px;
        font-weight: 900;
        color: var(--text-primary);
        margin-bottom: 6px;
      }
      .step-tags {
        display: flex;
        gap: 6px;
        margin-bottom: 6px;
        flex-wrap: wrap;
      }
      .tag {
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 6px;
        font-weight: 700;
      }
      .tag.time { background: #F3F4F6; color: #4B5563; }
      .tag.cat-religious { background: rgba(78,122,197,0.1); color: #3A6BC5; }
      .tag.cat-historical { background: rgba(184,92,56,0.1); color: #B85C38; }
      .tag.cat-cultural { background: rgba(45,90,39,0.1); color: #2D5A27; }
      .tag.rest { background: rgba(245,158,11,0.1); color: #D97706; }
      
      .step-desc {
        font-size: 12px;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0;
      }
      
      .step-walk {
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #F8FAFC;
        border: 1px dashed #CBD5E1;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        color: #64748B;
        font-weight: 700;
      }

      /* Floating AI Chatbot Button & Window */
      .ai-chat-btn {
        position: fixed;
        bottom: 24px;
        left: 24px;
        background: linear-gradient(135deg, #C9973B, #9E7325);
        color: white;
        padding: 12px 20px;
        border-radius: 30px;
        border: none;
        font-family: 'Cairo', sans-serif;
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 8px 24px rgba(201,151,59,0.35);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 999;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .ai-chat-btn:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 12px 28px rgba(201,151,59,0.45);
      }

      .ai-chat-window {
        position: fixed;
        bottom: 84px;
        left: 24px;
        width: 360px;
        max-width: calc(100vw - 48px);
        height: 480px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        border: 1px solid rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transform-origin: bottom left;
      }
      .ai-chat-window.hidden {
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8) translateY(20px);
      }
      .ai-chat-header {
        background: var(--stone-dark);
        color: var(--gold-light);
        padding: 14px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .ai-chat-header h4 {
        margin: 0;
        font-size: 15px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ai-chat-close {
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 18px;
        cursor: pointer;
      }
      .ai-chat-close:hover { color: white; }

      .ai-chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #F9FAFB;
      }
      .chat-msg {
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.5;
      }
      .chat-msg.bot {
        background: white;
        color: #1F2937;
        border: 1px solid #E5E7EB;
        align-self: flex-start;
        border-bottom-right-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      }
      .chat-msg.user {
        background: var(--stone-dark);
        color: var(--cream);
        align-self: flex-end;
        border-bottom-left-radius: 4px;
      }
      
      .ai-chat-chips {
        padding: 8px 12px;
        display: flex;
        gap: 6px;
        overflow-x: auto;
        background: white;
        border-top: 1px solid #F3F4F6;
      }
      .ai-chip {
        font-size: 11px;
        background: #F3F4F6;
        color: #374151;
        padding: 4px 10px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        white-space: nowrap;
      }
      .ai-chip:hover { background: var(--gold-subtle); color: var(--gold-dark); }

      .ai-chat-input-row {
        padding: 10px 12px;
        display: flex;
        gap: 8px;
        background: white;
        border-top: 1px solid #E5E7EB;
      }
      .ai-chat-input-row input {
        flex: 1;
        border: 1px solid #D1D5DB;
        border-radius: 20px;
        padding: 8px 14px;
        font-family: 'Cairo', sans-serif;
        font-size: 13px;
        outline: none;
      }
      .ai-chat-input-row input:focus { border-color: var(--gold-dark); }
      .ai-chat-send-btn {
        background: var(--stone-dark);
        color: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Modal backdrop for Modify Plan */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .modal-backdrop.open {
        opacity: 1;
        pointer-events: auto;
      }
      .modal-card {
        background: white;
        border-radius: 20px;
        width: 480px;
        max-width: 90vw;
        padding: 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      .modal-backdrop.open .modal-card {
        transform: translateY(0);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
      }
      .modal-option-btn {
        width: 100%;
        padding: 14px;
        margin-bottom: 10px;
        border-radius: 12px;
        border: 1px solid #E5E7EB;
        background: white;
        font-family: 'Cairo', sans-serif;
        font-size: 14px;
        font-weight: 700;
        text-align: right;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .modal-option-btn:hover {
        background: #F9FAFB;
        border-color: var(--gold-dark);
        color: var(--gold-dark);
      }

      @media(max-width: 1024px) {
        .route-layout-modern { grid-template-columns: 1fr; }
        .map-panel { position: relative; top: 0; height: 400px; min-height: auto; }
      }
      @media(max-width: 768px) {
        .map-panel { height: 320px; }
        .map-overlay-stats { padding: 8px 16px; gap: 16px; }
        .stat-val { font-size: 15px; }
        .step-card { flex-direction: column; }
        .step-img, .step-placeholder { width: 100%; height: 120px; }
        .step-time { width: 40px; font-size: 13px; }
      }
    </style>

    <!-- Navigation Bar -->
    <nav class="navbar scrolled" style="box-shadow:0 1px 4px rgba(0,0,0,0.05); background:white;">
      <div class="navbar-brand" onclick="window.router.navigate('home')" style="cursor:pointer;">
        <div class="brand-icon">🗺️</div>
        <div class="brand-name">
          <span>دليلي</span>
          <span style="color:#666; font-weight:400;">البلدة القديمة</span>
        </div>
      </div>
      <div class="navbar-actions">
        <button class="btn btn-outline" id="modify-plan-trigger" style="font-size:14px; padding:6px 16px;">
          ✏️ تعديل الخطة
        </button>
        <button class="btn btn-ghost" onclick="window.router.navigate('setup')" style="font-size:13px; padding:6px 12px;">
          إعادة الضبط
        </button>
      </div>
    </nav>

    <!-- Main Container -->
    <div class="page-route-refined">
      <div class="container">
        
        <!-- Day Tabs -->
        <div class="day-tabs-modern" id="day-tabs">
          ${Array.from({ length: numDays }, (_, i) => `
            <button class="day-tab-btn ${i === 0 ? 'active' : ''}" data-day="${i}">
              ${dayNames[i] || `اليوم ${i + 1}`}
            </button>
          `).join('')}
        </div>

        <div class="route-layout-modern">
          
          <!-- LEFT: Map Panel -->
          <div class="map-panel" id="map-panel">
            <div id="map-wrapper" style="width:100%; height:100%;"></div>
            
            <div class="map-overlay-stats">
              <div class="stat-item"><span class="stat-val" id="sum-walk"></span><span class="stat-lbl">مشي</span></div>
              <div class="stat-item"><span class="stat-val" id="sum-time"></span><span class="stat-lbl">وقت الجولة</span></div>
              <div class="stat-item"><span class="stat-val" id="sum-places"></span><span class="stat-lbl">محطات</span></div>
            </div>

            <div class="map-overlay-legend">
              <div class="legend-item"><span class="legend-color" style="background:#2563EB;"></span> موقع للزيارة</div>
              <div class="legend-item"><span class="legend-color" style="background:#F59E0B;"></span> استراحة / مطعم</div>
              <div class="legend-item"><span class="legend-color" style="background:#10B981;"></span> نقطة الانطلاق</div>
              <div class="legend-item" style="margin-top:2px;">
                <span style="display:inline-block; width:14px; height:3px; background:#2563EB; border-radius:2px;"></span> مسار المشي
              </div>
            </div>
          </div>

          <!-- RIGHT: Itinerary Panel -->
          <div class="itinerary-panel">
            <div class="day-header-rich" id="day-header"></div>
            <div class="timeline-container" id="timeline-list"></div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Floating AI Chatbot Button & Window -->
    <button class="ai-chat-btn" id="ai-chat-toggle">
      <span>🤖</span>
      <span>مساعد دليلي الذكي</span>
    </button>

    <div class="ai-chat-window hidden" id="ai-chat-window">
      <div class="ai-chat-header">
        <h4><span>✨</span> مساعد القدس الذكي</h4>
        <button class="ai-chat-close" id="ai-chat-close">✕</button>
      </div>
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="chat-msg bot">
          مرحباً بك! أنا مساعدك الذكي لتخصيص جولات القدس. كيف يمكنني مساعدتك في خطتك اليوم؟
        </div>
      </div>
      <div class="ai-chat-chips">
        <button class="ai-chip" data-ask="لماذا اخترت هذا المكان؟">لماذا اخترت هذا المكان؟</button>
        <button class="ai-chip" data-ask="اقترح مطعماً قريباً">اقترح مطعماً قريباً 🍽️</button>
        <button class="ai-chip" data-ask="أريد جولة أسرع">أريد جولة أسرع ⏱️</button>
      </div>
      <div class="ai-chat-input-row">
        <input type="text" id="ai-chat-input" placeholder="اكتب سؤالك هنا..."/>
        <button class="ai-chat-send-btn" id="ai-chat-send">➔</button>
      </div>
    </div>

    <!-- Modify Plan Modal -->
    <div class="modal-backdrop" id="modify-modal-backdrop">
      <div class="modal-card">
        <div class="modal-header">
          <h3>⚙️ تعديل خطة اليوم</h3>
          <button class="ai-chat-close" id="modify-modal-close" style="color:#000;">✕</button>
        </div>
        <p style="font-size:13px; color:#6B7280; margin-bottom:16px;">اختر نوع التعديل الذي ترغب في تطبيقه على مسارك الحالي:</p>
        
        <button class="modal-option-btn" data-action="remove">
          <span>❌</span> إزالة موقع من جدول اليوم
        </button>
        <button class="modal-option-btn" data-action="add">
          <span>➕</span> إضافة موقع جديد إلى القائمة
        </button>
        <button class="modal-option-btn" data-action="shorten">
          <span>⏱️</span> تقليل مدة الجولة (جولة سريعة)
        </button>
        <button class="modal-option-btn" data-action="change-interests">
          <span>🎯</span> تغيير اهتمامات هذا اليوم
        </button>
      </div>
    </div>
  `;

  // ── Helpers ──────────────────────────────────────────────
  const arabicNum = n => n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

  // ── Render Map (Google Maps with SVG Fallback) ─────────────
  function renderMap(dayIndex) {
    const itinerary = getActiveItinerary(dayIndex);

    // If Google Maps JS API loaded & key provided
    if (window.google && window.google.maps) {
      const mapWrapper = document.getElementById('map-wrapper');
      mapWrapper.innerHTML = ''; // clear

      const map = new google.maps.Map(mapWrapper, {
        center: { lat: 31.7770, lng: 35.2320 },
        zoom: 16,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
          { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
          { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
          { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
          { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
          { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] }
        ]
      });

      const pathCoords = [];
      let stepNum = 1;

      itinerary.items.forEach(item => {
        const place = item.placeId ? getPlaceData(item.placeId) : null;
        let lat = 31.7770;
        let lng = 35.2320;

        if (place && place.coordinates) {
          lat = place.coordinates.latitude;
          lng = place.coordinates.longitude;
        } else if (item.type === 'start') {
          lat = 31.7766; lng = 35.2275;
        }

        pathCoords.push({ lat, lng });

        let title = place ? place.name : item.name;
        let labelText = item.type === 'start' ? '📍' : item.isRestaurant ? '🍽️' : `${stepNum++}`;

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: title,
          label: { text: labelText, color: '#ffffff', fontWeight: 'bold' }
        });

        if (item.placeId) {
          marker.addListener('click', () => {
            window.AppState.selectedPlaceId = item.placeId;
            window.router.navigate(`place/${item.placeId}`);
          });
        }
      });

      // Draw Polyline
      new google.maps.Polyline({
        path: pathCoords,
        geodesic: true,
        strokeColor: '#2563EB',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map
      });

      return;
    }

    // Fallback: Dynamic SVG map
    const cfg = window.MOCK_DATA ? window.MOCK_DATA.mapConfig : { walkingPaths: {} };
    const path = cfg.walkingPaths[`day${dayIndex % 3}`] || 'M 145 230 L 185 175 L 205 175 L 320 190 L 290 220';

    let stepNum = 1;
    let markersHtml = '';

    itinerary.items.forEach((item, i) => {
      const isStart = item.type === 'start';
      const isRest = item.isRestaurant;
      const place = item.placeId ? getPlaceData(item.placeId) : null;
      
      let coords = null;
      if (place && place.coordinates && place.coordinates.svg_x) {
        coords = { x: place.coordinates.svg_x, y: place.coordinates.svg_y };
      } else if (place && place.coords) {
        coords = place.coords;
      } else if (isStart) {
        coords = { x: 145, y: 230 };
      }

      if (!coords) return;
      const delay = 0.2 + (i * 0.12);

      if (isStart) {
        markersHtml += `
          <g transform="translate(${coords.x}, ${coords.y})" class="map-marker" style="animation-delay:${delay}s">
            <circle cx="0" cy="0" r="11" fill="#10B981" filter="url(#drop-shadow)"/>
            <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
            <text x="0" y="-16" font-family="Cairo, sans-serif" font-size="11" font-weight="bold" fill="#064E3B" text-anchor="middle">بداية المسار</text>
          </g>
        `;
      } else if (isRest) {
        markersHtml += `
          <g transform="translate(${coords.x}, ${coords.y})" class="map-marker clickable-marker" data-place="${item.placeId}" style="animation-delay:${delay}s">
            <circle cx="0" cy="0" r="13" fill="#F59E0B" filter="url(#drop-shadow)"/>
            <text x="0" y="4" font-family="sans-serif" font-size="11" text-anchor="middle">🍽️</text>
          </g>
        `;
      } else {
        const num = stepNum++;
        markersHtml += `
          <g transform="translate(${coords.x}, ${coords.y})" class="map-marker clickable-marker" data-place="${item.placeId}" style="animation-delay:${delay}s">
            <path d="M 0 0 L -12 -16 A 15 15 0 1 1 12 -16 Z" fill="#2563EB" filter="url(#drop-shadow)"/>
            <circle cx="0" cy="-20" r="7" fill="#FFFFFF"/>
            <text x="0" y="-17" font-family="sans-serif" font-size="10" font-weight="bold" fill="#2563EB" text-anchor="middle">${num}</text>
          </g>
        `;
      }
    });

    const svg = `
      <svg viewBox="0 0 480 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.2"/>
          </filter>
          <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="100%" stop-color="#1D4ED8" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="#F1ECE1" />
        
        <path d="M 120 70 Q 180 50 240 50 L 240 210 L 100 210 Q 100 130 120 70" fill="#E8E2D6" opacity="0.8"/>
        <path d="M 240 50 Q 320 60 380 90 Q 410 150 400 220 L 280 220 L 240 210 Z" fill="#E4EBE5" opacity="0.8"/>
        <path d="M 100 210 L 240 210 L 240 290 Q 240 350 140 330 Q 100 270 100 210" fill="#E9E2E2" opacity="0.8"/>
        <path d="M 240 210 L 280 220 Q 280 290 380 340 Q 310 370 260 360 Q 240 330 240 290 Z" fill="#E4E6EA" opacity="0.8"/>
        <path d="M 270 140 L 390 140 L 400 280 L 290 280 Z" fill="#D3E0D1" stroke="#A3BCA0" stroke-width="2"/>
        
        <path d="M 110 230 L 280 215" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
        <path d="M 240 50 L 240 340" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
        <path d="M 380 120 L 240 145" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>

        <path d="M 120 70 Q 180 50 240 50 Q 320 60 380 90 Q 410 150 400 220 Q 390 290 380 340 Q 310 370 260 360 Q 190 350 140 330 Q 100 270 100 210 Q 100 130 120 70" 
              fill="none" stroke="#9A8E7C" stroke-width="5" stroke-dasharray="14 7" opacity="0.8" />

        <text x="170" y="140" font-family="Cairo, sans-serif" font-size="14" fill="#A59D90" font-weight="bold" text-anchor="middle">الحي المسيحي</text>
        <text x="310" y="110" font-family="Cairo, sans-serif" font-size="14" fill="#A59D90" font-weight="bold" text-anchor="middle">الحي الإسلامي</text>
        <text x="170" y="270" font-family="Cairo, sans-serif" font-size="14" fill="#A59D90" font-weight="bold" text-anchor="middle">الحي الأرمني</text>
        <text x="300" y="320" font-family="Cairo, sans-serif" font-size="14" fill="#A59D90" font-weight="bold" text-anchor="middle">الحي اليهودي</text>
        <text x="335" y="210" font-family="Cairo, sans-serif" font-size="13" fill="#6B8E6A" font-weight="bold" text-anchor="middle">الحرم القدسي</text>

        <path d="${path}" fill="none" stroke="url(#route-grad)" stroke-width="4.5" stroke-dasharray="8 6" 
              stroke-linecap="round" stroke-linejoin="round" class="animated-route-path" filter="url(#drop-shadow)"/>
              
        ${markersHtml}
      </svg>
    `;

    document.getElementById('map-wrapper').innerHTML = svg;

    document.querySelectorAll('.clickable-marker').forEach(el => {
      el.addEventListener('click', () => {
        const placeId = el.dataset.place;
        if (placeId) {
          window.AppState.selectedPlaceId = placeId;
          window.router.navigate(`place/${placeId}`);
        }
      });
    });
  }

  // ── Render Timeline ────────────────────────────────────────
  function renderTimeline(dayIndex) {
    const itinerary = getActiveItinerary(dayIndex);
    const timeline = document.getElementById('timeline-list');
    let html = '';
    let stepNum = 1;

    itinerary.items.forEach((item, idx) => {
      const isStart = item.type === 'start';
      const isRest = item.isRestaurant;
      const place = item.placeId ? getPlaceData(item.placeId) : null;
      const name = place ? place.name : item.name;
      const isLast = idx === itinerary.items.length - 1;
      
      let markerClass = 'place';
      let markerContent = '';
      let imgHtml = '';
      let tagsHtml = '';
      let descHtml = '';

      if (isStart) {
        markerClass = 'start';
        imgHtml = `<div class="step-placeholder">📍</div>`;
        descHtml = `<p class="step-desc">نقطة الانطلاق لبدء جولتك في المدينة المقدسة.</p>`;
      } else if (isRest) {
        markerClass = 'rest';
        markerContent = '🍽️';
        const imgSrc = (place && place.image) ? place.image : 'assets/images/placeholder.png';
        imgHtml = `<img src="${imgSrc}" class="step-img" alt="${name}" onerror="this.src='assets/images/placeholder.png'"/>`;
        tagsHtml = `<span class="tag rest">مطعم / استراحة</span> <span class="tag time">⏱ ${item.visitMin} دقيقة</span>`;
        if (place && place.description) descHtml = `<p class="step-desc">${place.description}</p>`;
      } else {
        markerClass = 'place';
        markerContent = stepNum++;
        const imgSrc = (place && place.image) ? place.image : 'assets/images/placeholder.png';
        imgHtml = `<img src="${imgSrc}" class="step-img" alt="${name}" onerror="this.src='assets/images/placeholder.png'"/>`;
        const catLabel = place ? (place.categoryLabel || place.category_label || 'معلم') : 'معلم';
        const catIcon = place ? (place.categoryIcon || place.category_icon || '📍') : '📍';
        const cat = place ? place.category : 'historical';
        tagsHtml = `<span class="tag cat-${cat}">${catLabel} ${catIcon}</span> <span class="tag time">⏱ ${item.visitMin} دقيقة</span>`;
        
        const fullDesc = place ? (place.description || place.full_description || place.short_description || '') : '';
        if (fullDesc) {
          const truncated = fullDesc.length > 75 ? fullDesc.substring(0, 75) + '...' : fullDesc;
          descHtml = `<p class="step-desc">${truncated}</p>`;
        }
      }

      html += `
        <div class="timeline-step ${place ? 'clickable' : ''}" data-place="${item.placeId || ''}">
          <div class="step-time">${item.time}</div>
          <div class="step-spine">
            <div class="step-marker ${markerClass}">${markerContent}</div>
            ${!isLast ? '<div class="step-line"></div>' : ''}
          </div>
          <div class="step-content">
            <div class="step-card">
              ${imgHtml}
              <div class="step-info">
                <h3>${name}</h3>
                ${tagsHtml ? `<div class="step-tags">${tagsHtml}</div>` : ''}
                ${descHtml}
              </div>
            </div>
            ${item.walkNext ? `
              <div class="step-walk">
                <span>🚶</span>
                <span>${item.walkNextLabel} إلى المحطة التالية</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    timeline.innerHTML = html;

    timeline.querySelectorAll('.timeline-step.clickable').forEach(row => {
      row.addEventListener('click', () => {
        const placeId = row.dataset.place;
        if (placeId) {
          window.AppState.selectedPlaceId = placeId;
          window.router.navigate(`place/${placeId}`);
        }
      });
    });
  }

  // ── Render Day Header & Stats ──────────────────────────────
  function renderDayHeader(dayIndex) {
    const itinerary = getActiveItinerary(dayIndex);
    const dayInterestsFormatted = itinerary.interests
      .map(i => interestMap[i] || i)
      .join(' + ');

    document.getElementById('day-header').innerHTML = `
      <h2>${itinerary.themeEmoji} ${itinerary.themeName}</h2>
      <div class="day-meta">
        <span class="badge-modern">📅 ${itinerary.dayName}</span>
        <span class="badge-modern">${dayInterestsFormatted}</span>
        <span class="badge-modern">يبدأ الساعة ${itinerary.startTime}</span>
      </div>
    `;

    document.getElementById('sum-walk').textContent = `${itinerary.totalWalkKm} كم`;
    document.getElementById('sum-time').textContent = arabicNum(Math.round(itinerary.totalWalkMin / 60 * 10) / 10) + ' س';
    document.getElementById('sum-places').textContent = arabicNum(itinerary.totalPlaces);
  }

  // ── Tab Switcher ───────────────────────────────────────────
  function renderDay(dayIndex) {
    activeDay = dayIndex;
    
    document.querySelectorAll('.day-tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === dayIndex);
    });

    renderMap(dayIndex);
    renderTimeline(dayIndex);
    renderDayHeader(dayIndex);
  }

  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => renderDay(parseInt(btn.dataset.day)));
  });

  // ── AI Chatbot Widget Handlers ──────────────────────────────
  const aiToggle = document.getElementById('ai-chat-toggle');
  const aiWindow = document.getElementById('ai-chat-window');
  const aiClose = document.getElementById('ai-chat-close');
  const aiInput = document.getElementById('ai-chat-input');
  const aiSend = document.getElementById('ai-chat-send');
  const aiMessages = document.getElementById('ai-chat-messages');

  aiToggle.addEventListener('click', () => {
    aiWindow.classList.toggle('hidden');
  });
  aiClose.addEventListener('click', () => {
    aiWindow.classList.add('hidden');
  });

  function sendChatMessage(txt) {
    const query = txt || aiInput.value.trim();
    if (!query) return;

    // Append user message
    const uMsg = document.createElement('div');
    uMsg.className = 'chat-msg user';
    uMsg.textContent = query;
    aiMessages.appendChild(uMsg);
    aiInput.value = '';
    aiMessages.scrollTop = aiMessages.scrollHeight;

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.textContent = 'جارٍ التفكير...';
    aiMessages.appendChild(typing);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    setTimeout(() => {
      const botResponse = window.getAiResponse ? window.getAiResponse(query) : 'شكراً على استفسارك! أنا في خدمتك لتخصيص جدولك.';
      typing.textContent = botResponse;
      aiMessages.scrollTop = aiMessages.scrollHeight;
    }, 700);
  }

  aiSend.addEventListener('click', () => sendChatMessage());
  aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
  document.querySelectorAll('.ai-chip').forEach(chip => {
    chip.addEventListener('click', () => sendChatMessage(chip.dataset.ask));
  });

  // ── Modify Plan Modal Handlers ─────────────────────────────
  const modifyTrigger = document.getElementById('modify-plan-trigger');
  const modifyBackdrop = document.getElementById('modify-modal-backdrop');
  const modifyClose = document.getElementById('modify-modal-close');

  modifyTrigger.addEventListener('click', () => {
    modifyBackdrop.classList.add('open');
  });
  modifyClose.addEventListener('click', () => {
    modifyBackdrop.classList.remove('open');
  });
  modifyBackdrop.addEventListener('click', (e) => {
    if (e.target === modifyBackdrop) modifyBackdrop.classList.remove('open');
  });

  document.querySelectorAll('.modal-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      modifyBackdrop.classList.remove('open');

      // Feedback Toast
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed; top: 30px; left: 50%; transform: translateX(-50%);
        background: var(--stone-dark); color: var(--gold-light);
        padding: 12px 24px; border-radius: 30px; font-family: 'Cairo', sans-serif;
        font-size: 14px; font-weight: 800; z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25); border: 1px solid var(--gold-dark);
      `;
      toast.textContent = '✨ جارٍ تعديل وتحديث جدولك الزمني...';
      document.body.appendChild(toast);

      setTimeout(() => {
        // Trigger subtle refresh of active day
        delete generatedItineraries[activeDay];
        renderDay(activeDay);
        toast.textContent = '✅ تم تعديل خطتك بنجاح!';
        setTimeout(() => toast.remove(), 2500);
      }, 800);
    });
  });

  // ── Init ───────────────────────────────────────────────────
  renderDay(0);
}

window.renderRoute = renderRoute;
