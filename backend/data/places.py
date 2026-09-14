"""
backend/data/places.py
Temporary in-memory place data for the prototype stage.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FUTURE STAGE — MongoDB Integration
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Replace the function get_all_places() with a MongoDB query:

      collection = db["places"]
      docs = await collection.find({}).to_list(length=None)
      return [Place(**doc) for doc in docs]

  The router and models stay exactly the same.
  Only this file changes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data fields mirror the frontend mock.js structure intentionally
so the frontend can swap data sources with minimal changes.
"""

from models.place import Place, Coordinates

# ── In-Memory Place Store ────────────────────────────────────
# 8 representative places covering all three interest categories.
# Coordinates include both real lat/lng (for future map tiles)
# and SVG prototype coordinates (for current static SVG map).

_PLACES: list[Place] = [

    # ── Religious ────────────────────────────────────────────

    Place(
        id="dome-of-rock",
        name="قبة الصخرة",
        name_en="Dome of the Rock",
        category="religious",
        category_label="ديني",
        category_icon="🕌",
        short_description="أحد أبرز المعالم الإسلامية في العالم، تعلوها قبتها الذهبية البراقة.",
        full_description=(
            "قبة الصخرة هي أحد أبرز المعالم الإسلامية في القدس وفي العالم بأسره. "
            "بُنيت في القرن السابع الميلادي في عهد الخليفة عبد الملك بن مروان، "
            "وتقوم فوق الصخرة المشرفة التي يُعتقد أن النبي محمد ﷺ أُسري به منها إلى السماء. "
            "يُعدّ مبناها الثماني الأضلاع المكسو بالقيشاني الأزرق وقبتها الذهبية البراقة "
            "أحد أروع الأمثلة على العمارة الإسلامية الكلاسيكية."
        ),
        significance="ثالث أقدس المواقع في الإسلام، ومركز أهمية دينية بالغة لليهود والمسيحيين أيضاً.",
        image="assets/images/dome-rock.png",
        estimated_visit_duration=45,
        quarter="الحرم القدسي",
        open_hours="08:00 - 17:00",
        entrance_fee="مجاني (للمسلمين)",
        rating=4.9,
        tags=["إسلامي", "أموي", "عمارة إسلامية", "القرن السابع"],
        nearby_place_ids=["aqsa", "western-wall", "cotton-market"],
        coordinates=Coordinates(latitude=31.7781, longitude=35.2354, svg_x=320, svg_y=190),
    ),

    Place(
        id="aqsa",
        name="المسجد الأقصى",
        name_en="Al-Aqsa Mosque",
        category="religious",
        category_label="ديني",
        category_icon="🕌",
        short_description="ثالث أقدس مواقع الإسلام، قبته الفضية معلم بارز في أفق القدس.",
        full_description=(
            "المسجد الأقصى هو ثالث أقدس مواقع الإسلام، ويقع في قلب البلدة القديمة من القدس. "
            "يتسع لأكثر من خمسة آلاف مصلٍّ، وقد مرّ بمراحل بناء وترميم عديدة عبر القرون. "
            "القبة الفضية للمسجد معلمٌ بارز في أفق القدس. "
            "يتضمن المسجد تحفاً معمارية رائعة من محاريب ومنابر ونقوش إسلامية."
        ),
        significance="ثالث أقدس مواقع الإسلام، وكان أولى قبلتَي المسلمين في بدء الإسلام.",
        image="assets/images/aqsa.png",
        estimated_visit_duration=60,
        quarter="الحرم القدسي",
        open_hours="08:00 - 15:00",
        entrance_fee="مجاني (للمسلمين)",
        rating=4.9,
        tags=["إسلامي", "ديني", "تاريخي"],
        nearby_place_ids=["dome-of-rock", "cotton-market", "western-wall"],
        coordinates=Coordinates(latitude=31.7765, longitude=35.2359, svg_x=290, svg_y=220),
    ),

    Place(
        id="holy-sepulchre",
        name="كنيسة القيامة",
        name_en="Church of the Holy Sepulchre",
        category="religious",
        category_label="ديني",
        category_icon="⛪",
        short_description="أقدس مواقع المسيحية في العالم، تضم موقع الصلب والقيامة.",
        full_description=(
            "كنيسة القيامة هي الموقع الأقدس في المسيحية، إذ تقوم على الأرض التي يُعتقد أن "
            "السيد المسيح صُلب فيها ودُفن ثم قام. بُنيت في القرن الرابع الميلادي بأمر الإمبراطور "
            "قسطنطين، وتحتضن اليوم طوائف مسيحية عديدة. يضم المبنى حجرة القبر المقدسة وجلجلة الصلب، "
            "ويُعدّ وجهة للحجاج من كل أنحاء العالم."
        ),
        significance="أقدس مواقع المسيحية في العالم، ومقصد ملايين الحجاج المسيحيين سنوياً.",
        image="assets/images/holy-sepulchre.png",
        estimated_visit_duration=75,
        quarter="الحي المسيحي",
        open_hours="05:00 - 21:00",
        entrance_fee="مجاني",
        rating=4.8,
        tags=["مسيحي", "ديني", "بيزنطي", "القرن الرابع"],
        nearby_place_ids=["via-dolorosa", "tower-david", "old-market"],
        coordinates=Coordinates(latitude=31.7785, longitude=35.2296, svg_x=205, svg_y=175),
    ),

    Place(
        id="western-wall",
        name="حائط البراق",
        name_en="Western Wall",
        category="religious",
        category_label="ديني",
        category_icon="🪨",
        short_description="أقدس موقع في اليهودية، مقصد يومي للصلاة والتضرع.",
        full_description=(
            "حائط البراق أو ما يُعرف بالحائط الغربي أو 'حائط المبكى'، هو الجدار الغربي المتبقي "
            "من الجدار المحيط بجبل الهيكل في عهد الملك هيرودس، ويُعدّ أقدس موقع في اليهودية. "
            "يتدفق إليه اليهود من كل أنحاء العالم للصلاة وتوجيه التضرعات. "
            "يمتد الحائط بطول 488 متراً، غير أن الجزء المكشوف للزيارة يبلغ نحو 60 متراً."
        ),
        significance="أقدس موقع في اليهودية، ومقصد يومي لملايين الزوار والمصلين.",
        image="assets/images/western-wall.png",
        estimated_visit_duration=45,
        quarter="الحي اليهودي",
        open_hours="24 ساعة",
        entrance_fee="مجاني",
        rating=4.9,
        tags=["يهودي", "ديني", "روماني", "هيرودس"],
        nearby_place_ids=["dome-of-rock", "jewish-quarter", "tower-david"],
        coordinates=Coordinates(latitude=31.7767, longitude=35.2343, svg_x=330, svg_y=250),
    ),

    # ── Historical ───────────────────────────────────────────

    Place(
        id="tower-david",
        name="قلعة القدس — برج داود",
        name_en="Tower of David",
        category="historical",
        category_label="تاريخي",
        category_icon="🏰",
        short_description="قلعة تاريخية تضم طبقات أثرية تمتد من الحشمونيين حتى العثمانيين.",
        full_description=(
            "قلعة القدس أو برج داود قلعةٌ تاريخية تقع بالقرب من باب الخليل في الجهة الغربية "
            "من البلدة القديمة. تتنوع طبقاتها الأثرية لتشمل حقباً متعاقبة من الحشمونيين إلى هيرودس "
            "فالفاطميين والصليبيين والمماليك والعثمانيين. "
            "اليوم تضم متحفاً لتاريخ القدس وساحة للعروض الليلية."
        ),
        significance="شاهدٌ على آلاف السنين من تاريخ القدس، ورمز معماري بارز.",
        image="assets/images/tower-david.png",
        estimated_visit_duration=90,
        quarter="الحي الأرمني",
        open_hours="09:00 - 17:00",
        entrance_fee="₪30 / شخص",
        rating=4.7,
        tags=["تاريخي", "قلعة", "متحف", "مماليك", "عثماني"],
        nearby_place_ids=["holy-sepulchre", "armenian-quarter", "western-wall"],
        coordinates=Coordinates(latitude=31.7770, longitude=35.2282, svg_x=145, svg_y=230),
    ),

    Place(
        id="via-dolorosa",
        name="درب الآلام",
        name_en="Via Dolorosa",
        category="religious",
        category_label="ديني",
        category_icon="✝️",
        short_description="الطريق الذي سار فيه المسيح حاملاً الصليب، تتوزع عليه 14 محطة تأمل.",
        full_description=(
            "درب الآلام هو الطريق الذي يُعتقد أن السيد المسيح سار فيه حاملاً الصليب إلى موقع صلبه. "
            "يمتد في قلب البلدة القديمة عبر أزقة ضيقة ومعقودة بالحجارة القديمة، "
            "وتتوزع على امتداده أربع عشرة محطة تأمل. "
            "يُعدّ وجهةً دينية كبرى تشهد مواكب إيمانية أسبوعية كل جمعة."
        ),
        significance="مسارٌ ديني مسيحي يُحيي ذكرى آلام المسيح وطريق صلبه.",
        image="assets/images/via-dolorosa.png",
        estimated_visit_duration=60,
        quarter="الحي الإسلامي",
        open_hours="طوال اليوم",
        entrance_fee="مجاني",
        rating=4.7,
        tags=["مسيحي", "ديني", "تاريخي", "حجاج"],
        nearby_place_ids=["holy-sepulchre", "aqsa"],
        coordinates=Coordinates(latitude=31.7800, longitude=35.2318, svg_x=240, svg_y=145),
    ),

    Place(
        id="cotton-market",
        name="سوق القطانين",
        name_en="Cotton Market (Khan al-Qattanin)",
        category="historical",
        category_label="تاريخي",
        category_icon="🏛️",
        short_description="أحد أجمل المعالم المملوكية، عقوده الحجرية الرائعة تعود للقرن الرابع عشر.",
        full_description=(
            "سوق القطانين أو خان القطانين أحد أجمل المعالم المملوكية في البلدة القديمة من القدس. "
            "شُيّد في القرن الرابع عشر في عهد السلطان تنكز، ويمتد نحو 95 متراً. "
            "يتميز بعقوده الحجرية الرائعة وأقواسه البديعة التي تُلقي ظلالاً فريدة، "
            "وقد كان مركزاً للتجارة وخاناً للحجاج."
        ),
        significance="مثالٌ على العمارة المملوكية في أوجها، وأحد أجمل أسواق القدس التاريخية.",
        image="assets/images/cotton-market.png",
        estimated_visit_duration=30,
        quarter="الحي الإسلامي",
        open_hours="08:00 - 17:00",
        entrance_fee="مجاني",
        rating=4.5,
        tags=["مملوكي", "تاريخي", "عمارة", "القرن الرابع عشر"],
        nearby_place_ids=["aqsa", "dome-of-rock", "old-market"],
        coordinates=Coordinates(latitude=31.7775, longitude=35.2338, svg_x=270, svg_y=210),
    ),

    # ── Cultural ─────────────────────────────────────────────

    Place(
        id="old-market",
        name="أسواق البلدة القديمة",
        name_en="Old City Markets",
        category="cultural",
        category_label="ثقافي",
        category_icon="🏪",
        short_description="شبكة أسواق مسقوفة بالحجارة تعجّ بالتوابل والحرف اليدوية والحياة اليومية.",
        full_description=(
            "أسواق البلدة القديمة شبكةٌ من الأسواق المسقوفة بالحجارة التي تمتد لكيلومترات، "
            "تعجّ بالتوابل العطرية والحرف اليدوية والفخار والمجوهرات والأقمشة التقليدية. "
            "أبرزها سوق القطانين وسوق الذهب وسوق الخواجات. "
            "تعكس هذه الأسواق روح الحياة اليومية في المدينة المقدسة وتراثها التجاري الممتد لقرون."
        ),
        significance="تجسيدٌ حي للتراث الثقافي والتجاري للقدس عبر الحقب المتتالية.",
        image="assets/images/old-market.png",
        estimated_visit_duration=60,
        quarter="الحي الإسلامي",
        open_hours="08:00 - 18:00",
        entrance_fee="مجاني",
        rating=4.6,
        tags=["ثقافي", "تراثي", "تسوق", "تقليدي"],
        nearby_place_ids=["aqsa", "holy-sepulchre", "cotton-market"],
        coordinates=Coordinates(latitude=31.7783, longitude=35.2310, svg_x=220, svg_y=200),
    ),

    Place(
        id="jewish-quarter",
        name="الحي اليهودي",
        name_en="Jewish Quarter",
        category="historical",
        category_label="تاريخي",
        category_icon="🏘️",
        short_description="أحياء أثرية بارزة، أشهرها الكاردو الروماني وآثار المعابد القديمة.",
        full_description=(
            "الحي اليهودي في الجزء الجنوبي الغربي من البلدة القديمة يتضمن أحياءً أثرية بارزة، "
            "أشهرها الكاردو الروماني الذي يعود إلى القرن الثاني الميلادي. يضم الحي متاحف "
            "أثرية ومعارض فنية وحدائق هادئة تحكي قصص التواجد التاريخي في القدس."
        ),
        significance="توثيقٌ حيّ للحضور التاريخي والأثري في القدس.",
        image="assets/images/jewish-quarter.png",
        estimated_visit_duration=60,
        quarter="الحي اليهودي",
        open_hours="طوال اليوم",
        entrance_fee="مجاني",
        rating=4.6,
        tags=["تاريخي", "روماني", "أثري"],
        nearby_place_ids=["western-wall", "tower-david", "armenian-quarter"],
        coordinates=Coordinates(latitude=31.7750, longitude=35.2320, svg_x=270, svg_y=295),
    ),

    Place(
        id="armenian-quarter",
        name="الحي الأرمني",
        name_en="Armenian Quarter",
        category="cultural",
        category_label="ثقافي",
        category_icon="🎭",
        short_description="أقدم مجتمع أرمني خارج أرمينيا، يضم كاتدرائية ومتحفاً تاريخياً.",
        full_description=(
            "يُعدّ الحي الأرمني في القدس أقدم مجتمع أرمني خارج أرمينيا، ويعود وجوده "
            "إلى القرن الرابع الميلادي. يضم الحي كاتدرائية القديس يعقوب الرائعة ومتحف المجلس "
            "الأرمني الذي يوثّق التاريخ والتراث الأرمني الأصيل في القدس."
        ),
        significance="أقدم مجتمع أرمني خارج أرمينيا، ونموذجٌ على التنوع الثقافي في القدس.",
        image="assets/images/armenian-quarter.png",
        estimated_visit_duration=45,
        quarter="الحي الأرمني",
        open_hours="09:00 - 17:00",
        entrance_fee="مجاني",
        rating=4.4,
        tags=["ثقافي", "أرمني", "مسيحي", "تنوع ثقافي"],
        nearby_place_ids=["tower-david", "jewish-quarter", "holy-sepulchre"],
        coordinates=Coordinates(latitude=31.7740, longitude=35.2290, svg_x=175, svg_y=280),
    ),

]

# ── Lookup helpers ───────────────────────────────────────────
# These are simple in-memory operations now.
# When MongoDB is added, replace these with async DB queries.

def get_all_places() -> list[Place]:
    """Return all places. Future: await db.places.find({})."""
    return _PLACES


def get_place_by_id(place_id: str) -> Place | None:
    """Return a single place by ID, or None. Future: await db.places.find_one({'id': place_id})."""
    return next((p for p in _PLACES if p.id == place_id), None)


def get_places_by_category(category: str) -> list[Place]:
    """
    Return places filtered by category.
    Future: await db.places.find({'category': {'$in': categories}})
    — already structured to support multi-category lists.
    """
    return [p for p in _PLACES if p.category == category]
