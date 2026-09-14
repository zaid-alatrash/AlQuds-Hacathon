/**
 * mock.js — All static/mock data for the prototype
 * Replace API_BASE calls here when connecting to FastAPI backend
 *
 * Future integration point:
 *   const API_BASE = 'https://api.qudsroute.com/v1';
 *   const response = await fetch(`${API_BASE}/places`);
 */

const MOCK_DATA = {

  /* ── Places ─────────────────────────────────────────── */
  places: [
    {
      id: 'dome-of-rock',
      name: 'قبة الصخرة',
      nameEn: 'Dome of the Rock',
      category: 'religious',
      categoryLabel: 'ديني',
      categoryIcon: '🕌',
      description: 'قبة الصخرة هي أحد أبرز المعالم الإسلامية في القدس وفي العالم بأسره. بُنيت في القرن السابع الميلادي في عهد الخليفة عبد الملك بن مروان، وتقوم فوق الصخرة المشرفة التي يُعتقد أن النبي محمد ﷺ أُسري به منها إلى السماء. يُعدّ مبناها الثماني الأضلاع المكسو بالقيشاني الأزرق وقبتها الذهبية البراقة أحد أروع الأمثلة على العمارة الإسلامية الكلاسيكية.',
      significance: 'ثالث أقدس المواقع في الإسلام، ومركز أهمية دينية بالغة لليهود والمسيحيين أيضاً.',
      visitDuration: 45,
      coords: { x: 320, y: 190 },
      image: 'assets/images/dome-rock.png',
      rating: 4.9,
      tags: ['إسلامي', 'أموي', 'عمارة إسلامية', 'القرن السابع'],
      quarter: 'الحرم القدسي',
      nearbyPlaces: ['aqsa', 'western-wall', 'islamic-museum'],
      openHours: '08:00 - 17:00',
      entranceFee: 'مجاني (للمسلمين)',
    },
    {
      id: 'aqsa',
      name: 'المسجد الأقصى',
      nameEn: 'Al-Aqsa Mosque',
      category: 'religious',
      categoryLabel: 'ديني',
      categoryIcon: '🕌',
      description: 'المسجد الأقصى هو ثالث أقدس مواقع الإسلام، ويقع في قلب البلدة القديمة من القدس. يتسع لأكثر من خمسة آلاف مصلٍّ، وقد مرّ بمراحل بناء وترميم عديدة عبر القرون. القبة الفضية للمسجد معلمٌ بارز في أفق القدس. يتضمن المسجد تحفاً معمارية رائعة من محاريب ومنابر ونقوش إسلامية.',
      significance: 'ثالث أقدس مواقع الإسلام، وكان أولى قبلتَي المسلمين في بدء الإسلام.',
      visitDuration: 60,
      coords: { x: 290, y: 220 },
      image: 'assets/images/aqsa.png',
      rating: 4.9,
      tags: ['إسلامي', 'ديني', 'تاريخي'],
      quarter: 'الحرم القدسي',
      nearbyPlaces: ['dome-of-rock', 'islamic-museum', 'cotton-market'],
      openHours: '08:00 - 15:00',
      entranceFee: 'مجاني (للمسلمين)',
    },
    {
      id: 'holy-sepulchre',
      name: 'كنيسة القيامة',
      nameEn: 'Church of the Holy Sepulchre',
      category: 'religious',
      categoryLabel: 'ديني',
      categoryIcon: '⛪',
      description: 'كنيسة القيامة هي الموقع الأقدس في المسيحية، إذ تقوم على الأرض التي يُعتقد أن السيد المسيح صُلب فيها ودُفن ثم قام. بُنيت في القرن الرابع الميلادي بأمر الإمبراطور قسطنطين، وتحتضن اليوم طوائف مسيحية عديدة. يضم المبنى حجرة القبر المقدسة وجلجلة الصلب، ويُعدّ وجهة للحجاج من كل أنحاء العالم.',
      significance: 'أقدس مواقع المسيحية في العالم، ومقصد ملايين الحجاج المسيحيين سنوياً.',
      visitDuration: 75,
      coords: { x: 205, y: 175 },
      image: 'assets/images/holy-sepulchre.png',
      rating: 4.8,
      tags: ['مسيحي', 'ديني', 'بيزنطي', 'القرن الرابع'],
      quarter: 'الحي المسيحي',
      nearbyPlaces: ['via-dolorosa', 'tower-david', 'old-market'],
      openHours: '05:00 - 21:00',
      entranceFee: 'مجاني',
    },
    {
      id: 'western-wall',
      name: 'حائط البراق',
      nameEn: 'Western Wall',
      category: 'religious',
      categoryLabel: 'ديني',
      categoryIcon: '🪨',
      description: 'حائط البراق أو ما يُعرف بالحائط الغربي أو "حائط المبكى"، هو الجدار الغربي المتبقي من الجدار المحيط بجبل الهيكل في عهد الملك هيرودس، ويُعدّ أقدس موقع في اليهودية. يتدفق إليه اليهود من كل أنحاء العالم للصلاة وتوجيه التضرعات. يمتد الحائط بطول 488 متراً، غير أن الجزء المكشوف للزيارة يبلغ نحو 60 متراً.',
      significance: 'أقدس موقع في اليهودية، ومقصد يومي لملايين الزوار والمصلين.',
      visitDuration: 45,
      coords: { x: 330, y: 250 },
      image: 'assets/images/western-wall.png',
      rating: 4.9,
      tags: ['يهودي', 'ديني', 'روماني', 'هيرودس'],
      quarter: 'الحي اليهودي',
      nearbyPlaces: ['dome-of-rock', 'jewish-quarter', 'tower-david'],
      openHours: '24 ساعة',
      entranceFee: 'مجاني',
    },
    {
      id: 'tower-david',
      name: 'قلعة القدس — برج داود',
      nameEn: 'Tower of David',
      category: 'historical',
      categoryLabel: 'تاريخي',
      categoryIcon: '🏰',
      description: 'قلعة القدس أو برج داود قلعةٌ تاريخية تقع بالقرب من باب الخليل في الجهة الغربية من البلدة القديمة. تتنوع طبقاتها الأثرية لتشمل حقباً متعاقبة من الحشمونيين إلى هيرودس فالفاطميين والصليبيين والمماليك والعثمانيين. اليوم تضم متحفاً لتاريخ القدس وساحة للعروض الليلية.',
      significance: 'شاهدٌ على آلاف السنين من تاريخ القدس، ورمز معماري بارز.',
      visitDuration: 90,
      coords: { x: 145, y: 230 },
      image: 'assets/images/tower-david.png',
      rating: 4.7,
      tags: ['تاريخي', 'قلعة', 'متحف', 'مماليك', 'عثماني'],
      quarter: 'الحي الأرمني',
      nearbyPlaces: ['holy-sepulchre', 'jaffa-gate', 'armenian-quarter'],
      openHours: '09:00 - 17:00',
      entranceFee: '₪30 / شخص',
    },
    {
      id: 'via-dolorosa',
      name: 'درب الآلام',
      nameEn: 'Via Dolorosa',
      category: 'religious',
      categoryLabel: 'ديني',
      categoryIcon: '✝️',
      description: 'درب الآلام هو الطريق الذي يُعتقد أن السيد المسيح سار فيه حاملاً الصليب إلى موقع صلبه. يمتد في قلب البلدة القديمة عبر أزقة ضيقة ومعقودة بالحجارة القديمة، وتتوزع على امتداده أربع عشرة محطة تأمل. يُعدّ وجهةً دينية كبرى تشهد مواكب إيمانية أسبوعية كل جمعة.',
      significance: 'مسارٌ ديني مسيحي يُحيي ذكرى آلام المسيح وطريق صلبه.',
      visitDuration: 60,
      coords: { x: 240, y: 145 },
      image: 'assets/images/via-dolorosa.png',
      rating: 4.7,
      tags: ['مسيحي', 'ديني', 'تاريخي', 'حجاج'],
      quarter: 'الحي المسلم',
      nearbyPlaces: ['holy-sepulchre', 'st-anne', 'pool-bethesda'],
      openHours: 'طوال اليوم',
      entranceFee: 'مجاني',
    },
    {
      id: 'old-market',
      name: 'أسواق البلدة القديمة',
      nameEn: 'Old City Markets',
      category: 'cultural',
      categoryLabel: 'ثقافي',
      categoryIcon: '🏪',
      description: 'أسواق البلدة القديمة شبكةٌ من الأسواق المسقوفة بالحجارة التي تمتد لكيلومترات، تعجّ بالتوابل العطرية والحرف اليدوية والفخار والمجوهرات والأقمشة التقليدية. أبرزها سوق القطانين وسوق الذهب وسوق الخواجات. تعكس هذه الأسواق روح الحياة اليومية في المدينة المقدسة وتراثها التجاري الممتد لقرون.',
      significance: 'تجسيدٌ حي للتراث الثقافي والتجاري للقدس عبر الحقب المتتالية.',
      visitDuration: 60,
      coords: { x: 220, y: 200 },
      image: 'assets/images/old-market.png',
      rating: 4.6,
      tags: ['ثقافي', 'تراثي', 'تسوق', 'تقليدي'],
      quarter: 'الحي المسلم',
      nearbyPlaces: ['aqsa', 'holy-sepulchre', 'cotton-market'],
      openHours: '08:00 - 18:00',
      entranceFee: 'مجاني',
    },
    {
      id: 'cotton-market',
      name: 'سوق القطانين',
      nameEn: 'Cotton Market',
      category: 'historical',
      categoryLabel: 'تاريخي',
      categoryIcon: '🏛️',
      description: 'سوق القطانين أو خان القطانين أحد أجمل المعالم المملوكية في البلدة القديمة من القدس. شُيّد في القرن الرابع عشر في عهد السلطان تنكز، ويمتد نحو 95 متراً. يتميز بعقوده الحجرية الرائعة وأقواسه البديعة التي تُلقي ظلالاً فريدة، وقد كان مركزاً للتجارة وخاناً للحجاج.',
      significance: 'مثالٌ على العمارة المملوكية في أوجها، وأحد أجمل أسواق القدس التاريخية.',
      visitDuration: 30,
      coords: { x: 270, y: 210 },
      image: 'assets/images/cotton-market.png',
      rating: 4.5,
      tags: ['مملوكي', 'تاريخي', 'عمارة', 'القرن الرابع عشر'],
      quarter: 'الحي المسلم',
      nearbyPlaces: ['aqsa', 'dome-of-rock', 'old-market'],
      openHours: '08:00 - 17:00',
      entranceFee: 'مجاني',
    },
    {
      id: 'jewish-quarter',
      name: 'الحي اليهودي',
      nameEn: 'Jewish Quarter',
      category: 'historical',
      categoryLabel: 'تاريخي',
      categoryIcon: '🏘️',
      description: 'الحي اليهودي في الجزء الجنوبي الغربي من البلدة القديمة يتضمن أحياءً أثرية بارزة، أشهرها الكاردو الروماني الذي يعود إلى القرن الثاني الميلادي، وآثار حريق الحي من عام 1948. يضم الحي متاحف أثرية ومعارض فنية وحدائق هادئة تحكي قصص الوجود اليهودي في القدس.',
      significance: 'توثيقٌ حيّ للحضور اليهودي في القدس عبر ألفَي سنة.',
      visitDuration: 60,
      coords: { x: 270, y: 295 },
      image: 'assets/images/jewish-quarter.png',
      rating: 4.6,
      tags: ['تاريخي', 'روماني', 'يهودي', 'أثري'],
      quarter: 'الحي اليهودي',
      nearbyPlaces: ['western-wall', 'tower-david', 'armenian-quarter'],
      openHours: 'طوال اليوم',
      entranceFee: 'مجاني (متحف الكاردو: ₪15)',
    },
    {
      id: 'armenian-quarter',
      name: 'الحي الأرمني',
      nameEn: 'Armenian Quarter',
      category: 'cultural',
      categoryLabel: 'ثقافي',
      categoryIcon: '🎭',
      description: 'يُعدّ الحي الأرمني في القدس أقدم مجتمع أرمني خارج أرمينيا، ويعود وجوده إلى القرن الرابع الميلادي. يضم الحي كاتدرائية القديس يعقوب الرائعة ومتحف المجلس الأرمني الذي يوثّق تاريخ الإبادة الجماعية والوجود الأرمني في القدس، فضلاً عن مدرسة وطباعة تاريخية.',
      significance: 'أقدم مجتمع أرمني خارج أرمينيا، ونموذجٌ على التنوع الثقافي في القدس.',
      visitDuration: 45,
      coords: { x: 175, y: 280 },
      image: 'assets/images/armenian-quarter.png',
      rating: 4.4,
      tags: ['ثقافي', 'أرمني', 'مسيحي', 'تنوع ثقافي'],
      quarter: 'الحي الأرمني',
      nearbyPlaces: ['tower-david', 'jewish-quarter', 'holy-sepulchre'],
      openHours: '09:00 - 17:00',
      entranceFee: 'مجاني',
    },
  ],

  /* ── Restaurants / Cafes ─────────────────────────────── */
  restaurants: [
    {
      id: 'rest-jddo',
      name: 'مطعم البيت المقدسي',
      type: 'مطعم تراثي',
      cuisine: 'فلسطيني تقليدي',
      icon: '🍽️',
      avgCost: 18,
      description: 'مطعم عائلي دافئ في قلب البلدة القديمة يقدم أشهى الأطباق الفلسطينية التقليدية، من المنسف إلى الفتة، في أجواء تراثية أصيلة.',
      coords: { x: 200, y: 230 },
      rating: 4.7,
      tags: ['تراثي', 'فلسطيني', 'غداء', 'عائلي'],
    },
    {
      id: 'rest-cafe-quds',
      name: 'مقهى القدس',
      type: 'مقهى',
      cuisine: 'قهوة ومشروبات وحلويات',
      icon: '☕',
      avgCost: 8,
      description: 'مقهى هادئ يطل على إحدى ساحات البلدة القديمة، يقدم القهوة العربية والشاي المغربي والعصائر الطازجة مع الكنافة النابلسية.',
      coords: { x: 250, y: 175 },
      rating: 4.6,
      tags: ['مقهى', 'استراحة', 'حلويات'],
    },
    {
      id: 'rest-khan',
      name: 'خان الباشا',
      type: 'مطعم',
      cuisine: 'شرقي مشوي',
      icon: '🥙',
      avgCost: 22,
      description: 'مطعم يقع في خانٍ أثري مملوكي، يقدم مشاوي فاخرة وأطباقاً شرقية متنوعة مع إطلالة على المعالم الأثرية.',
      coords: { x: 230, y: 265 },
      rating: 4.5,
      tags: ['مشاوي', 'غداء', 'أثري', 'فاخر'],
    },
    {
      id: 'rest-knafeh',
      name: 'حلويات أبو يوسف',
      type: 'حلويات',
      cuisine: 'حلويات شرقية',
      icon: '🍯',
      avgCost: 5,
      description: 'بسطة شهيرة للكنافة والقطايف والبقلاوة الطازجة المحضّرة على الطريقة القدسية الأصيلة. تجربة لا تفوت!',
      coords: { x: 215, y: 200 },
      rating: 4.8,
      tags: ['حلويات', 'كنافة', 'خفيف', 'سريع'],
    },
  ],

  /* ── Pre-generated itineraries ─────────────────────────
   * Keyed by day index (0-based) and interest combination.
   * Future: Replace with API call to /api/itinerary/generate
   ─────────────────────────────────────────────────────── */
  itineraries: {
    day0: {
      dayName: 'اليوم الأول',
      themeName: 'جولة دينية في قلب القدس',
      themeEmoji: '🕌',
      interests: ['ديني'],
      totalWalkKm: 2.8,
      totalWalkMin: 38,
      totalPlaces: 5,
      suggestedBudget: 20,
      startTime: '09:00',
      items: [
        { time: '09:00', placeId: null, type: 'start', name: 'باب الخليل — نقطة البداية', icon: '📍', walkNext: 5, walkNextLabel: '5 دق مشياً' },
        { time: '09:10', placeId: 'dome-of-rock', type: 'religious', icon: '🕌', walkNext: 8, walkNextLabel: '8 دق مشياً', visitMin: 45 },
        { time: '10:05', placeId: 'aqsa', type: 'religious', icon: '🕌', walkNext: 12, walkNextLabel: '12 دق مشياً', visitMin: 60 },
        { time: '11:17', placeId: 'rest-cafe-quds', type: 'rest', icon: '☕', walkNext: 10, walkNextLabel: '10 دق مشياً', visitMin: 30, isRestaurant: true },
        { time: '11:57', placeId: 'via-dolorosa', type: 'religious', icon: '✝️', walkNext: 7, walkNextLabel: '7 دق مشياً', visitMin: 60 },
        { time: '13:04', placeId: 'holy-sepulchre', type: 'religious', icon: '⛪', walkNext: 0, walkNextLabel: null, visitMin: 75 },
        { time: '14:19', placeId: 'rest-jddo', type: 'rest', icon: '🍽️', walkNext: 0, walkNextLabel: null, visitMin: 60, isRestaurant: true },
      ],
    },
    day1: {
      dayName: 'اليوم الثاني',
      themeName: 'رحلة في عمق التاريخ والثقافة',
      themeEmoji: '🏛️',
      interests: ['تاريخي', 'ثقافي'],
      totalWalkKm: 3.2,
      totalWalkMin: 44,
      totalPlaces: 5,
      suggestedBudget: 22,
      startTime: '09:30',
      items: [
        { time: '09:30', placeId: null, type: 'start', name: 'باب الخليل — نقطة البداية', icon: '📍', walkNext: 3, walkNextLabel: '3 دق مشياً' },
        { time: '09:35', placeId: 'tower-david', type: 'historical', icon: '🏰', walkNext: 10, walkNextLabel: '10 دق مشياً', visitMin: 90 },
        { time: '11:15', placeId: 'armenian-quarter', type: 'cultural', icon: '🎭', walkNext: 8, walkNextLabel: '8 دق مشياً', visitMin: 45 },
        { time: '12:08', placeId: 'rest-khan', type: 'rest', icon: '🥙', walkNext: 6, walkNextLabel: '6 دق مشياً', visitMin: 60, isRestaurant: true },
        { time: '13:14', placeId: 'jewish-quarter', type: 'historical', icon: '🏘️', walkNext: 9, walkNextLabel: '9 دق مشياً', visitMin: 60 },
        { time: '14:23', placeId: 'cotton-market', type: 'historical', icon: '🏛️', walkNext: 5, walkNextLabel: '5 دق مشياً', visitMin: 30 },
        { time: '14:58', placeId: 'old-market', type: 'cultural', icon: '🏪', walkNext: 0, walkNextLabel: null, visitMin: 60 },
      ],
    },
    day2: {
      dayName: 'اليوم الثالث',
      themeName: 'بين الإيمان والتاريخ',
      themeEmoji: '✨',
      interests: ['ديني', 'تاريخي'],
      totalWalkKm: 3.0,
      totalWalkMin: 41,
      totalPlaces: 5,
      suggestedBudget: 18,
      startTime: '09:00',
      items: [
        { time: '09:00', placeId: null, type: 'start', name: 'باب دمشق — نقطة البداية', icon: '📍', walkNext: 7, walkNextLabel: '7 دق مشياً' },
        { time: '09:07', placeId: 'via-dolorosa', type: 'religious', icon: '✝️', walkNext: 10, walkNextLabel: '10 دق مشياً', visitMin: 60 },
        { time: '10:17', placeId: 'cotton-market', type: 'historical', icon: '🏛️', walkNext: 5, walkNextLabel: '5 دق مشياً', visitMin: 30 },
        { time: '10:52', placeId: 'dome-of-rock', type: 'religious', icon: '🕌', walkNext: 8, walkNextLabel: '8 دق مشياً', visitMin: 45 },
        { time: '11:45', placeId: 'rest-knafeh', type: 'rest', icon: '🍯', walkNext: 6, walkNextLabel: '6 دق مشياً', visitMin: 20, isRestaurant: true },
        { time: '12:11', placeId: 'western-wall', type: 'religious', icon: '🪨', walkNext: 12, walkNextLabel: '12 دق مشياً', visitMin: 45 },
        { time: '13:08', placeId: 'tower-david', type: 'historical', icon: '🏰', walkNext: 0, walkNextLabel: null, visitMin: 90 },
        { time: '14:38', placeId: 'rest-jddo', type: 'rest', icon: '🍽️', walkNext: 0, walkNextLabel: null, visitMin: 60, isRestaurant: true },
      ],
    },
  },

  /* ── SVG Map data ────────────────────────────────────── */
  mapConfig: {
    viewBox: '0 0 480 400',
    quarters: [
      { id: 'muslim',   label: 'الحي الإسلامي',  color: '#D4C5A0', x: 240, y: 180, w: 240, h: 200 },
      { id: 'christian',label: 'الحي المسيحي',   color: '#C8BFA0', x: 0,   y: 0,   w: 240, h: 200 },
      { id: 'jewish',   label: 'الحي اليهودي',   color: '#D0C8A8', x: 240, y: 0,   w: 240, h: 200 },
      { id: 'armenian', label: 'الحي الأرمني',   color: '#C4BAA0', x: 0,   y: 200, w: 240, h: 200 },
    ],
    walkingPaths: {
      day0: 'M 145 230 L 185 175 L 205 175 L 320 190 L 290 220 L 250 175 L 205 175',
      day1: 'M 145 230 L 175 280 L 230 265 L 270 295 L 270 210',
      day2: 'M 240 145 L 270 210 L 320 190 L 290 220 L 330 250 L 145 230',
    },
  },

  /* ── AI Mock Responses ───────────────────────────────── */
  aiResponses: [
    {
      keywords: ['لماذا', 'أهمية', 'مهم', 'تاريخ'],
      responses: [
        'هذا الموقع من أبرز المعالم الدينية والتاريخية في القدس، ويعود تاريخه لأكثر من ألف عام. زيارته تجربة روحانية وثقافية لا تُنسى.',
        'يُعدّ هذا المكان جوهرة في تاج القدس القديمة، فقد شهد أحداثاً مفصلية في تاريخ الحضارات الثلاث: الإسلامية والمسيحية واليهودية.',
      ],
    },
    {
      keywords: ['وقت', 'كم', 'مدة', 'أحتاج', 'ساعة'],
      responses: [
        'يُنصح بتخصيص ما بين 45 إلى 90 دقيقة لهذا الموقع. إذا أردت التأمل والاستمتاع بالتفاصيل، خصص ساعة على الأقل.',
        'معظم الزوار يمضون حوالي ساعة في هذا الموقع، لكن لا تتسرع — بعض الأماكن تستحق أكثر من ذلك.',
      ],
    },
    {
      keywords: ['قريب', 'بعده', 'بجانب', 'التالي', 'المجاور'],
      responses: [
        'أقرب موقع يمكنك زيارته هو على بُعد 5-10 دقائق مشياً. خطتك الحالية تأخذ هذا بعين الاعتبار!',
        'الموقع التالي في خطتك على بُعد نحو 8 دقائق مشياً. درب الآلام والمسجد الأقصى كلاهما قريبان أيضاً.',
      ],
    },
    {
      keywords: ['احذف', 'أحذف', 'أزل', 'إزالة', 'حذف'],
      responses: [
        '✅ تم! سأحذف هذا الموقع من خطتك وإعادة ترتيب الجدول الزمني. هل تريد أن أضيف موقعاً بديلاً في نفس المنطقة؟',
        '✅ تمّت الإزالة. قمت بتعديل الجدول الزمني ليتناسب مع الوقت المتاح. خطتك الآن أكثر مرونة!',
      ],
    },
    {
      keywords: ['استبدل', 'بديل', 'غير', 'بدلاً'],
      responses: [
        '🔄 أقترح عليك زيارة سوق القطانين بدلاً من ذلك — إنه على بُعد 5 دقائق ويقدم تجربة تاريخية رائعة.',
        '🔄 يمكنني استبداله بالحي الأرمني أو متحف برج داود. أيّهما يناسب اهتمامك أكثر؟',
      ],
    },
    {
      keywords: ['مطعم', 'أكل', 'طعام', 'غداء', 'عشاء', 'رخيص', 'أرخص', 'ميزانية'],
      responses: [
        '🍽️ بالقرب منك هناك "حلويات أبو يوسف" بميزانية تبدأ من 5 دولارات، أو "مقهى القدس" للاستراحة بحوالي 8 دولارات.',
        '🍽️ أقترح عليك تجربة الكنافة القدسية الأصلية في بسطة أبو يوسف — لا تفوّتها! وميزانيتها لا تتجاوز 5 دولارات.',
      ],
    },
    {
      keywords: ['ساعتين', 'ساعة', 'وقت قليل', 'أسرع', 'مختصر'],
      responses: [
        '⏱️ سأختصر خطتك لتناسب ساعتين فقط. سأبقي على أهم 3 مواقع وأحذف ما يمكن تأجيله.',
        '⏱️ فهمت! سأرتب لك جولة سريعة تشمل أبرز المعالم خلال الوقت المتاح. هل تفضل التركيز على المواقع الدينية أم التاريخية؟',
      ],
    },
    {
      keywords: ['زرت', 'زيارة', 'سبق', 'كنت'],
      responses: [
        '✅ رائع! سأحذف هذا الموقع وأضيف بديلاً لم تزره من قبل. خطتك محدّثة الآن.',
        '✅ تم تحديث خطتك. سأستبدله بموقع مميز آخر في نفس المنطقة.',
      ],
    },
    {
      keywords: ['أضف', 'إضافة', 'أريد', 'زيادة', 'أكثر'],
      responses: [
        '➕ ممتاز! أقترح إضافة الحي اليهودي أو سوق القطانين إلى جدولك — كلاهما قريب ويستغرق زيارته 30-45 دقيقة.',
        '➕ يمكنني إضافة متحف برج داود إذا كنت مهتماً بالتاريخ. وقت الزيارة المقترح: 90 دقيقة.',
      ],
    },
  ],

  /* ── Starting Points ─────────────────────────────────── */
  startingPoints: [
    { id: 'jaffa-gate',   name: 'باب الخليل',  desc: 'الدخول من الجهة الغربية', icon: '🚪' },
    { id: 'damascus-gate', name: 'باب دمشق',   desc: 'الدخول من الجهة الشمالية', icon: '🚪' },
    { id: 'lion-gate',    name: 'باب الأسباط', desc: 'الدخول من الجهة الشرقية', icon: '🚪' },
    { id: 'dung-gate',    name: 'باب المغاربة', desc: 'قريب من حائط البراق',     icon: '🚪' },
  ],
};

/**
 * Helper: Get place by ID
 * @param {string} id
 * @returns {Object|null}
 */
function getPlace(id) {
  return (
    MOCK_DATA.places.find(p => p.id === id) ||
    MOCK_DATA.restaurants.find(r => r.id === id) ||
    null
  );
}

/**
 * Helper: Get itinerary for a day index (0-based)
 * @param {number} dayIndex
 * @returns {Object}
 */
function getItinerary(dayIndex) {
  return MOCK_DATA.itineraries[`day${dayIndex}`] || MOCK_DATA.itineraries.day0;
}

/**
 * Helper: Get mock AI response for user message
 * @param {string} message
 * @returns {string}
 */
function getAiResponse(message) {
  const lower = message.toLowerCase();
  for (const entry of MOCK_DATA.aiResponses) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      const arr = entry.responses;
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return 'شكراً على سؤالك! أنا هنا لمساعدتك في تعديل خطتك أو الإجابة عن أي استفسار حول معالم القدس. هل تريد تعديل الخطة أو تريد معلومات عن أحد المواقع؟';
}

// Export for use across modules
window.MOCK_DATA = MOCK_DATA;
window.getPlace = getPlace;
window.getItinerary = getItinerary;
window.getAiResponse = getAiResponse;
