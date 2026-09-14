/**
 * home.js — Landing / Home Page
 */

function renderHome(container) {
  container.innerHTML = `
    <div class="page-home">

      <!-- ── Navbar ───────────────────────────── -->
      <nav class="navbar transparent dark-mode" id="home-nav">
        <div class="navbar-brand">
          <div class="brand-icon">🗺️</div>
          <div class="brand-name">
            <span>دليلي</span>
            <span>القدس — البلدة القديمة</span>
          </div>
        </div>
        <div class="navbar-actions">
          <button class="btn btn-outline hide-mobile" id="nav-how-it-works"
                  style="border-color:rgba(201,151,59,0.5);color:var(--gold-light);">
            كيف يعمل؟
          </button>
          <button class="btn btn-primary" id="nav-start-btn">ابدأ رحلتك</button>
        </div>
      </nav>

      <!-- ── Hero ─────────────────────────────── -->
      <section class="hero-section" id="hero">
        <div class="hero-bg">
          <img src="assets/images/hero.png" alt="القدس البلدة القديمة" loading="eager"/>
        </div>

        <div class="hero-content">
          <div class="container">
            <div class="hero-eyebrow animate-fade-in">
              <span>✨</span>
              <span>دليلك الشخصي في قلب القدس</span>
            </div>

            <h1 class="hero-title animate-fade-up delay-100">
              اكتشف القدس
              <span class="accent">بأسلوبك الخاص</span>
            </h1>

            <p class="hero-description animate-fade-up delay-200">
              اختر اهتماماتك وحدّد وقتك المتاح، وسنبني لك مسار جولة مخصص يمر بأبرز
              معالم البلدة القديمة — دينية، تاريخية، أو ثقافية.
            </p>

            <div class="hero-cta-group animate-fade-up delay-300">
              <button class="btn-primary-lg" id="hero-start-btn">
                <span>🗺️</span>
                ابدأ رحلتك
              </button>
              <button class="btn btn-ghost hide-mobile" id="hero-demo-btn"
                      style="color:rgba(247,242,232,0.8);font-size:15px;">
                شاهد مثالاً
              </button>
            </div>

            <div class="hero-stats animate-fade-up delay-400">
              <div class="hero-stat">
                <span class="num">+50</span>
                <span class="desc">موقعاً مميزاً</span>
              </div>
              <div class="hero-stat">
                <span class="num">3</span>
                <span class="desc">فئات اهتمام</span>
              </div>
              <div class="hero-stat">
                <span class="num">AI</span>
                <span class="desc">مساعد ذكي</span>
              </div>
              <div class="hero-stat">
                <span class="num">مجاناً</span>
                <span class="desc">للجميع</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scroll-cue">
          <span>اكتشف المزيد</span>
          <span style="font-size:20px;">↓</span>
        </div>
      </section>

      <!-- ── Features ──────────────────────────── -->
      <section class="features-section" id="features">
        <div class="container">
          <div class="section-header animate-fade-up">
            <span class="section-label">مميزات التطبيق</span>
            <h2 class="section-title">كل ما تحتاجه لجولة مثالية</h2>
            <p class="section-description">
              نوفر لك تجربة تخطيط سياحي ذكية ومخصصة، من اختيار الأماكن
              حتى تحديد المطاعم والمسافات بدقة.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-card animate-fade-up delay-100">
              <div class="feature-icon" style="background:rgba(201,151,59,0.12);">🗺️</div>
              <h3 class="text-xl font-bold" style="margin-bottom:var(--space-3);">مسار مخصص لك</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                خطة يومية مفصّلة تراعي اهتماماتك وأوقاتك وميزانيتك،
                مع أفضل ترتيب جغرافي للأماكن.
              </p>
            </div>

            <div class="feature-card animate-fade-up delay-200">
              <div class="feature-icon" style="background:rgba(45,90,39,0.12);">🤖</div>
              <h3 class="text-xl font-bold" style="margin-bottom:var(--space-3);">مساعد ذكاء اصطناعي</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                عدّل خطتك لحظياً بالكلام الطبيعي — احذف مكاناً،
                أضف آخر، أو غيّر المسار بالكامل.
              </p>
            </div>

            <div class="feature-card animate-fade-up delay-300">
              <div class="feature-icon" style="background:rgba(184,92,56,0.12);">📍</div>
              <h3 class="text-xl font-bold" style="margin-bottom:var(--space-3);">خريطة تفاعلية</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                تتبّع مسارك على الخريطة مع أوقات المشي ومقترحات
                الاستراحة في أوقات الذروة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── How It Works ──────────────────────── -->
      <section class="how-section" id="how">
        <div class="container">
          <div class="section-header animate-fade-up">
            <span class="section-label">كيف يعمل؟</span>
            <h2 class="section-title">أربع خطوات فقط</h2>
          </div>

          <div class="how-steps">
            <div class="how-step animate-fade-up delay-100">
              <div class="how-step-num">١</div>
              <h3>اختر اهتماماتك</h3>
              <p>ديني، تاريخي، أم ثقافي؟ حدّد ما يناسبك لكل يوم على حدة.</p>
            </div>
            <div class="how-step animate-fade-up delay-200">
              <div class="how-step-num">٢</div>
              <h3>حدّد وقتك وميزانيتك</h3>
              <p>كم يوم لديك؟ كم ساعة يومياً؟ كم ميزانية الطعام؟</p>
            </div>
            <div class="how-step animate-fade-up delay-300">
              <div class="how-step-num">٣</div>
              <h3>استقبل خطتك</h3>
              <p>مسار يومي مفصّل مع خريطة تفاعلية وجدول زمني دقيق.</p>
            </div>
            <div class="how-step animate-fade-up delay-400">
              <div class="how-step-num">٤</div>
              <h3>عدّل مع المساعد</h3>
              <p>اسأل المساعد الذكي وعدّل الخطة في أي لحظة خلال رحلتك.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Interest Categories ────────────────── -->
      <section style="padding:var(--space-16) 0; background:var(--cream);">
        <div class="container">
          <div class="section-header animate-fade-up" style="margin-bottom:var(--space-10);">
            <span class="section-label">فئات الاهتمام</span>
            <h2 class="section-title">ماذا تريد أن تستكشف؟</h2>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-6);">
            <div class="card card-gold animate-fade-up delay-100"
                 style="padding:var(--space-8);text-align:center;cursor:pointer;"
                 onclick="window.router.navigate('setup')">
              <div style="font-size:56px;margin-bottom:var(--space-4);">🕌</div>
              <h3 style="font-size:22px;font-weight:900;margin-bottom:var(--space-3);">ديني</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                المسجد الأقصى، كنيسة القيامة، حائط البراق،
                درب الآلام، وعشرات المواقع الروحانية.
              </p>
            </div>
            <div class="card card-gold animate-fade-up delay-200"
                 style="padding:var(--space-8);text-align:center;cursor:pointer;"
                 onclick="window.router.navigate('setup')">
              <div style="font-size:56px;margin-bottom:var(--space-4);">🏛️</div>
              <h3 style="font-size:22px;font-weight:900;margin-bottom:var(--space-3);">تاريخي</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                قلعة برج داود، سوق القطانين، الكاردو الروماني،
                والأحياء التاريخية العريقة.
              </p>
            </div>
            <div class="card card-gold animate-fade-up delay-300"
                 style="padding:var(--space-8);text-align:center;cursor:pointer;"
                 onclick="window.router.navigate('setup')">
              <div style="font-size:56px;margin-bottom:var(--space-4);">🎭</div>
              <h3 style="font-size:22px;font-weight:900;margin-bottom:var(--space-3);">ثقافي وترفيهي</h3>
              <p class="text-secondary text-sm" style="line-height:1.8;">
                أسواق التراث، الحي الأرمني، الحرف اليدوية،
                والمقاهي والمطاعم الأصيلة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CTA Bottom ─────────────────────────── -->
      <section class="home-cta-section">
        <div class="container" style="position:relative;z-index:1;">
          <div class="animate-fade-up">
            <div style="font-size:48px;margin-bottom:var(--space-4);">🕌</div>
            <h2 class="cta-title">جاهز لاستكشاف القدس؟</h2>
            <p class="cta-subtitle">أنشئ خطتك الشخصية في دقيقتين</p>
            <button class="btn-primary-lg" id="cta-bottom-btn">
              <span>✨</span>
              ابدأ رحلتك الآن
            </button>
          </div>
        </div>
      </section>

      <!-- ── Footer ─────────────────────────────── -->
      <footer style="background:var(--stone-dark);padding:var(--space-8) 0;text-align:center;">
        <div class="container">
          <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-3);margin-bottom:var(--space-4);">
            <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--gold-primary),var(--gold-light));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🗺️</div>
            <span style="font-weight:800;font-size:18px;color:var(--gold-light);">دليلي — القدس</span>
          </div>
          <p style="color:rgba(247,242,232,0.4);font-size:13px;">
            نموذج أولي للعرض — مشروع هاكاثون القدس 2026
          </p>
        </div>
      </footer>

    </div>
  `;

  // ── Event Listeners ──────────────────────────────────
  document.getElementById('nav-start-btn').addEventListener('click', () => window.router.navigate('setup'));
  document.getElementById('hero-start-btn').addEventListener('click', () => window.router.navigate('setup'));
  document.getElementById('cta-bottom-btn').addEventListener('click', () => window.router.navigate('setup'));

  const demoBtn = document.getElementById('hero-demo-btn');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => window.router.navigate('route'));
  }

  const howBtn = document.getElementById('nav-how-it-works');
  if (howBtn) {
    howBtn.addEventListener('click', () => {
      document.getElementById('how').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Navbar scroll effect
  const nav = document.getElementById('home-nav');
  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('scrolled', !entry.isIntersecting);
      nav.classList.toggle('transparent', entry.isIntersecting);
    },
    { threshold: 0.1, rootMargin: '-68px 0px 0px 0px' }
  );
  const hero = document.getElementById('hero');
  if (hero) observer.observe(hero);
}

window.renderHome = renderHome;
