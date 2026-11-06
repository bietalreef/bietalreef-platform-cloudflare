// Independently written, practical prompts for the existing district pages.
// These short introductions are not a substitute for the planned long articles.
const sectors=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
const rows={
 'al-jimi':[
  ['حدد إن كان العمل في منزل مأهول أو محل، واتفق على مداخل العمل وحماية المجاورين قبل تسعير البناء.','For an occupied home or shop, agree access and protection of adjoining spaces before pricing construction.'],
  ['عند تصميم محل أو شقة، افصل توزيع الحركة والإضاءة عن المخططات التنفيذية وحدد المطلوب من المصمم.','For a shop or apartment, separate circulation and lighting concepts from the commissioned construction drawings.'],
  ['صوّر العطل وسجل أوقات توقف التكييف أو الكهرباء؛ اطلب تشخيص السبب قبل تسعير الإصلاح والتشطيب.','Record the fault and any cooling or electrical interruptions; request diagnosis before the repair and reinstatement are priced.'],
  ['اطلب كمية كل مادة ومكان تنزيلها ومواعيد التوصيل، خصوصًا إذا كان العمل داخل عقار مستخدم.','Itemise materials, unloading and delivery windows when work takes place in an occupied property.'],
  ['تحقق من قياسات فتحات المحل أو المنزل وإمكانية نقل القطع الكبيرة قبل اعتماد رسومات الورشة.','Check the shop or home openings and the route for large items before approving fabrication drawings.'],
  ['قِس الأبواب والمصعد ومسار التوصيل قبل شراء أثاث الشقة أو تجهيز مكتب ومراجعة عينات الأقمشة.','Measure doors, lifts and delivery access before selecting apartment or office furniture and fabric samples.'],
  ['حدد ساعات دخول المعدة ومساحة المناورة واحتياج المشغل، خاصة عندما يستمر نشاط المحل أثناء العمل.','Specify equipment access hours, manoeuvring space and operator requirements around an operating business.'],
  ['افصل تنظيف المفروشات عن الأرضيات والزجاج، واتفق على أوقات الدخول والتجفيف في العقار المستخدم.','Separate upholstery, floor and glass cleaning and agree access and drying time in occupied premises.']
 ],
 'al-muwaiji':[
  ['في تجديد مبنى قائم، وثق حالة الجدران والأساسات واسأل المختص قبل أي تغيير إنشائي أو هدم.','For an existing building, document walls and foundations and consult a professional before structural alterations.'],
  ['راجع المخطط القائم قبل إعادة توزيع الغرف، وحدد أثر فتحات الأبواب والتهوية والتمديدات.','Review the existing plan before rearranging rooms and coordinate openings, ventilation and services.'],
  ['ابدأ بمصدر الرطوبة أو التشقق، ثم اطلب اختبار المعالجة قبل إغلاق السطح وإعادة الطلاء.','Identify the cause of damp or cracking and agree checks before closing and repainting the surface.'],
  ['طابق مواد العزل والدهان مع حالة الأسطح القائمة، واطلب شروط الاستبدال والتوصيل مكتوبة.','Match waterproofing and paint products to existing surfaces and agree replacement and delivery terms.'],
  ['تحقق من استقامة الفتحات القديمة وسماكات الخشب أو المعدن قبل تصنيع الأبواب والنوافذ.','Check existing openings and material specifications before fabricating replacement doors or windows.'],
  ['اختر أثاث التجديد بعد قياس الغرف والمداخل، وقارن إعادة تنجيد القطع المناسبة بشراء البديل.','Measure renovated rooms and entrances; compare suitable reupholstery with purchasing replacement pieces.'],
  ['لترميم عقار قائم، حدد قيود الوصول والتحميل وحدود العمل قبل اختيار معدات الرفع أو السقالات.','For renovation, establish access and loading limits before selecting lifting equipment or scaffolding.'],
  ['بعد التجديد، حدد إزالة غبار التشطيب وطريقة حماية الأسطح والقطع الحساسة ضمن طلب التنظيف.','After renovation, specify dust removal and protection for sensitive surfaces and furnishings.']
 ],
 'al-markhaniya':[
  ['فرّق بين إصلاح محدود وتجديد متعدد البنود، وعيّن مسؤولًا واضحًا للتنسيق بين التخصصات.','Separate a small repair from multi-trade renovation and identify who coordinates the work.'],
  ['سجل احتياجات الأسرة والمقاسات وأولويات الصيانة قبل اعتماد تعديلات التصميم والخامات.','Record household needs, measurements and maintenance priorities before approving design changes.'],
  ['اطلب جدول فحص للتكييف والتسربات والكهرباء، مع حدود الضمان وقطع الغيار المستبدلة.','Request an inspection schedule for cooling, leaks and electrical work, with replacement parts and warranty limits.'],
  ['افصل سعر المواد عن التوصيل والتركيب، وراجع التوافق مع الأجهزة والأسطح الموجودة.','Separate material prices from delivery and installation and verify compatibility with existing equipment.'],
  ['عند استبدال نافذة أو خزانة، اتفق على المقاسات النهائية والإكسسوارات وحماية المكان أثناء التركيب.','For replacement windows or cabinets, confirm final dimensions, hardware and protection during installation.'],
  ['قارن خامة الأثاث وسهولة تنظيفه مع فترة الضمان وخدمة التركيب وليس مع سعر القطعة وحده.','Compare materials and ease of cleaning alongside warranty and assembly, not only the ticket price.'],
  ['اطلب عرضًا يحدد مدة الإيجار الفعلية، النقل، المشغل ومسؤولية الصيانة في موقع العمل.','Ask for actual hire duration, transport, operator and on-site maintenance responsibilities.'],
  ['حدّد الغرف والقطع وحساسية الأسطح ومواعيد دخول الفريق، ثم اتفق على نطاق التنظيف كتابة.','List rooms, items, sensitive finishes and access times; agree the cleaning scope in writing.']
 ],
 'al-towayya':[
  ['للعمل الخارجي أو التوسعة، حدد حدود الموقع والصرف والوصول قبل مقارنة عروض المقاولين.','For extensions or outdoor work, describe site boundaries, drainage and access before comparing contractors.'],
  ['اربط تصميم المساحة الخارجية بالظل والحركة وصيانة المواد، واطلب مخططًا يوضح الأبعاد.','Connect outdoor design with shade, circulation and maintenance; ask for a dimensioned plan.'],
  ['افحص سبب تجمع المياه وتعرض الأسطح للشمس قبل اختيار إصلاح الرطوبة أو الدهانات.','Investigate drainage and sun exposure before selecting a damp or paint repair.'],
  ['حدد مقاومة المواد الخارجية وطريقة توريدها وتخزينها قبل شراء بلاط أو دهانات أو عزل.','Specify exterior durability, delivery and storage before ordering tiles, paint or waterproofing.'],
  ['للأبواب والمظلات، راجع التثبيت ومقاومة التآكل والعزل والأبعاد قبل التصنيع.','For doors and shades, review fixing, corrosion protection, sealing and dimensions before fabrication.'],
  ['اختر أقمشة الجلسات وفق الاستخدام والتعرض للشمس، واطلب عينة وشروط العناية.','Choose seating fabrics for their use and sun exposure; request samples and care terms.'],
  ['قارن قدرة المعدة ومساحة الدخول ومدة التشغيل، مع فصل النقل والمشغل عن قيمة الإيجار.','Compare capacity, entry space and operating time, separating transport and operator from the hire rate.'],
  ['اذكر المساحات الداخلية والخارجية وأنواع الأرضيات حتى تحدد الشركة المعدات والطريقة المناسبة.','Identify indoor and outdoor areas and flooring so the team can choose an appropriate method.']
 ],
 'al-foah':[
  ['أرفق موقع المشروع ومقاسات الملحق وأوقات الوصول، واطلب فصل الإنشاء عن التشطيبات في العرض.','Provide the site, extension dimensions and access hours; separate structural work from finishes in the bid.'],
  ['حدد وظيفة المجلس أو الغرفة ومقاساتها والميزانية، ثم اتفق على عدد تعديلات التصميم.','Describe the majlis or room, its measurements and budget, and agree how many design revisions are included.'],
  ['اشرح موقع العطل وتاريخه وأرفق صورة، واسأل هل يشمل العرض المعاينة والمواد والضمان.','Describe and photograph the fault; ask whether inspection, materials and warranty are included.'],
  ['حدد موقع التفريغ والكمية وموعد التوريد والمرتجعات؛ ليس سعر المادة وحده تكلفة المشروع.','Specify unloading, quantity, delivery date and returns; the material price alone is not the full cost.'],
  ['أرسل صور الفتحات واطلب معاينة نهائية قبل تفصيل الأبواب والخزائن ونقلها للموقع.','Share photos of the openings and arrange a final measure before making and delivering doors or cabinets.'],
  ['راجع مقاسات المجلس والأبواب ونوع الحشوة والقماش، وحدد من يتولى التوصيل والتركيب.','Check majlis and door dimensions, filling and fabric, and identify who delivers and assembles.'],
  ['في المعدات والمنتجات المصنعة، اسأل عن النقل والتفريغ والمشغل ومدة التجهيز قبل الحجز.','For equipment or fabricated products, clarify transport, unloading, operator and lead time before ordering.'],
  ['ميّز تنظيف البيت عن المجلس والمفروشات والخزانات، وأرسل العدد والحالة والموقع قبل العرض.','Distinguish house, majlis, upholstery and tank cleaning; send quantities, condition and location for the quote.']
 ],
 'zakher':[
  ['حدد ما إذا كان المشروع فيلا أو توسعة أو مجلسًا، وأرفق المخططات المطلوبة لكل نطاق.','Identify whether the project is a villa, extension or majlis and provide the drawings relevant to each scope.'],
  ['وزع الاستخدام بين المجلس والفراغات الخارجية، ثم راجع الأبعاد والإضاءة والخصوصية.','Plan how the majlis and outdoor spaces will be used, then review dimensions, lighting and privacy.'],
  ['افصل إصلاح العزل والتسرب عن إعادة التشطيب، واتفق على اختبار السبب قبل الاستلام.','Separate waterproofing and leak repair from reinstatement; agree how the cause will be checked.'],
  ['قارن خامات الأسطح والواجهات بحسب الاستخدام وتعرضها، وحدد الكميات والتوصيل.','Compare roof and facade materials for the intended exposure, quantities and delivery.'],
  ['للبوابات والمجالس الخارجية، ثبّت المقاسات وطرق الحماية من التآكل ومسؤولية التركيب.','For gates and outdoor seating, agree dimensions, corrosion protection and installation responsibilities.'],
  ['قِس المجلس ومسار إدخال الكنب، واطلب عينة القماش وخيارات الصيانة قبل التفصيل.','Measure the majlis and sofa access; request fabric samples and care details before custom ordering.'],
  ['راجع مساحة وقوف الرافعة أو الحفارة وطبيعة الأرض والنقل قبل توقيع عقد المعدة.','Check crane or excavator standing space, ground conditions and transport before hiring.'],
  ['اذكر تنظيف المجالس والأحواش والمفروشات كلًّا كبند منفصل، وحدد أسلوب المعالجة المناسب للخامات.','List majlis, yard and upholstery cleaning separately and confirm treatment methods for each material.']
 ],
 'asharej':[
  ['قبل استلام عقار جديد أو مجدد، وثق الأعمال الناقصة ومن المسؤول عن كل تصحيح.','At handover of new or renovated property, record outstanding work and who is responsible for each correction.'],
  ['راجع توزيع الغرف والإضاءة مع المخططات الفعلية قبل طلب تجهيزات أو تغيير في الاستخدام.','Review room layouts and lighting against actual drawings before ordering fit-out or changing use.'],
  ['اختبر التكييف والمياه والأبواب، وسجل الأعطال بالصور وحدد أولوية معالجتها.','Test cooling, water and doors; photograph defects and prioritise the repairs.'],
  ['اشترِ مواد الإصلاح بعد تشخيص الحالة وتأكد من المقاسات والمواصفة وحق الاستبدال.','Buy repair materials after diagnosis, checking dimensions, specification and exchange terms.'],
  ['قارن عرض تعديل الأبواب أو المطابخ مع حالة الفتحات والإكسسوارات ومدة التصنيع.','Compare door or kitchen alterations against actual openings, hardware and fabrication time.'],
  ['قبل الانتقال، تأكد من مقاسات الأثاث ووقت التوصيل والتركيب وحماية الأرضيات.','Before moving in, confirm furniture measurements, delivery and assembly timing and floor protection.'],
  ['حدد إن كنت تحتاج سقالة أو معدات نقل مؤقتة، ومن يوفر التركيب والفحص والاستلام.','Specify temporary access or moving equipment and who installs, inspects and collects it.'],
  ['افصل إزالة مخلفات التشطيب عن تنظيف الزجاج والأثاث، وحدد ما هو داخل الخدمة.','Separate construction-debris removal from glass and furniture cleaning and identify included tasks.']
 ],
 'al-maqam':[
  ['حدد حالة التمديدات والأسطح قبل ترتيب أعمال التجديد وشراء خامات التشطيب.','Assess services and surfaces before sequencing renovation and ordering finishes.'],
  ['أعد قياسات واضحة للخزائن والممرات والإضاءة، وحدد رسومات التصميم المطلوبة من المكتب.','Prepare measurements for storage, circulation and lighting, and define the drawings required from the designer.'],
  ['ابدأ بإصلاح الرطوبة أو تمديدات المياه قبل الجبس والدهان، واطلب اختبارًا لكل مرحلة.','Repair moisture and water services before plaster and paint, with appropriate checks at each stage.'],
  ['قارن جودة البلاط والعزل ووحدات القياس، واحسب الفاقد والتوصيل وفق جدول الكميات.','Compare tile and waterproofing specifications, units, measured quantities, waste and delivery.'],
  ['في تفصيل المطابخ والأبواب، اذكر سماكات الخامات والإكسسوارات والقياس بعد التشطيب.','For kitchens and doors, specify material thickness, hardware and measurement after finishes.'],
  ['اختر أبعاد الأثاث بعد اكتمال مخطط الغرفة، وحدد خامة القماش وموعد التسليم.','Select furniture after the room layout is fixed, specifying fabric and delivery timing.'],
  ['إذا احتاج التجديد معدات وصول، وضح الارتفاع ومدة العمل والحماية داخل العقار.','For access equipment, specify working height, duration and protection inside the property.'],
  ['بعد التشطيب، اطلب تنظيفًا يحمي الرخام والدهانات والأجهزة مع تحديد المخلفات المشمولة.','For post-fit-out cleaning, protect stone, paint and appliances and agree which debris is included.']
 ],
 'falaj-hazza':[
  ['في المنزل المأهول، اتفق على تسلسل الأعمال وحماية الغرف ومن ينسق المقاولين.','In an occupied home, agree work sequencing, room protection and who coordinates the trades.'],
  ['حدد المساحات التي ستظل مستخدمة عند تعديل التصميم، وراجع حركة الأسرة ومواقع الخدمات.','Identify rooms remaining in use while reviewing circulation and service locations for a redesign.'],
  ['رتب أعمال السباكة والكهرباء قبل الجبس والطلاء، وحدد مسؤولية كل فني في العقد.','Schedule plumbing and electrical work before plaster and paint, with clear responsibility for each trade.'],
  ['حدد أين ستخزن المواد داخل العقار، وهل يشمل عرض المورد التوصيل والرفع.','Agree material storage in the property and whether delivery and lifting are included.'],
  ['عند تصنيع أبواب داخل منزل مستخدم، حدد وقت أخذ المقاسات وحماية الأثاث والتركيب.','For doors in an occupied home, agree measuring times, furniture protection and installation.'],
  ['قارن تنجيد الأثاث القائم بالتفصيل الجديد بعد فحص الهيكل والقماش وإمكانية النقل.','Compare reupholstering existing furniture with new custom pieces after checking frames, fabric and transport.'],
  ['وضح قيود الدخول والضوضاء وساعات التشغيل قبل طلب معدات لموقع سكني.','Describe residential access, noise constraints and operating hours when requesting equipment.'],
  ['اتفق على التنظيف اليومي أثناء العمل والتنظيف النهائي لكل غرفة بعد انتهاء التشطيبات.','Agree daily site cleaning and final room-by-room cleaning after the finishes are complete.']
 ],
 'al-yahar':[
  ['اكتب نطاق البناء أو التجديد ومقاسات الموقع، وناقش أثر الأعمال على المبنى والخدمات القائمة.','Describe construction or renovation, site measurements and the effect on existing buildings and services.'],
  ['ابدأ بالمقاسات واستخدام المجلس والغرف، وحدد ما إذا كان العرض يشمل المخططات والإشراف.','Start with measurements and the use of the majlis and rooms; clarify drawings and supervision.'],
  ['اشرح أعراض العطل وأي إصلاح سابق، واطلب اختبارًا يثبت معالجة السبب قبل إعادة الطلاء.','Describe fault symptoms and earlier repairs; agree checks before repainting.'],
  ['اطلب مواد محددة بالمواصفة والكمية، وحدد مسؤولية النقل والتفريغ وحفظ المواد.','Specify materials and quantities, assigning responsibility for transport, unloading and storage.'],
  ['قارن سماكة الأبواب والخامات والإكسسوارات مع المعاينة والضمان وطريقة التثبيت.','Compare door thickness, materials and hardware along with measurement, warranty and fixing.'],
  ['قِس المداخل قبل تفصيل الكنب أو الخزائن، وراجع عينات القماش ومدة التسليم.','Measure entrances before ordering sofas or cabinets; review fabric samples and delivery time.'],
  ['حدد طبيعة المهمة ومدة الإيجار وقدرة المعدة ومن يتحمل نقلها وتشغيلها.','Define the task, hire period, equipment capacity and who transports and operates it.'],
  ['أرسل نوع الأسطح وعدد الغرف أو القطع، وحدد إن كان المطلوب تنظيفًا بعد الصيانة.','Provide surface types and room or item counts, including whether cleaning follows maintenance.']
 ],
 'al-dhahir':[
  ['وضح مساحة تخزين المواد وإمكانية دخول العمال والمعدات عند طلب بناء أو تجديد.','Explain storage space and worker and equipment access when requesting construction or renovation.'],
  ['حدد وظيفة الفراغ ومسار الحركة والإنارة، ثم اطلب رسومات قابلة للتنفيذ بالمقاس.','Set out the space’s use, circulation and lighting, then request dimensioned construction drawings.'],
  ['سجّل العطل ومكانه وأوقات استخدام المبنى، واطلب خطة إصلاح واختبار واضحة.','Record the fault, its location and building use; request a clear repair and testing plan.'],
  ['افصل توريد المواد عن تركيبها وبيّن الكميات والتفريغ وحماية المخزون من التلف.','Separate supply from installation and specify quantities, unloading and storage protection.'],
  ['اطلب رفع مقاسات الموقع ورسومات تصنيع للأبواب والنوافذ مع ضمان واضح للتركيب.','Request site measurements and fabrication drawings for doors and windows with installation warranty terms.'],
  ['راجع عرض الأثاث من العينة حتى النقل والتركيب، وتأكد من مرور القطع عبر المداخل.','Review furniture from samples to delivery and assembly, checking all entrance clearances.'],
  ['حدد مساحة حركة المعدة وطبيعة السطح وموعد استلامها وإعادتها.','Identify equipment manoeuvring space, ground conditions and collection and return times.'],
  ['قائمة الغرف والأسطح وحالة المفروشات تساعد الشركة على تقدير العمل وطريقته.','A list of rooms, surfaces and upholstery condition helps the company define the cleaning method.']
 ],
 'sanaiya':[
  ['للمستودع أو الورشة، حدد الأعمال وتأثيرها على الحركة والتشغيل قبل اختيار المقاول.','For a warehouse or workshop, define the work and its effect on operations before appointing a contractor.'],
  ['خطط مسارات الحركة والتخزين والإضاءة حسب النشاط، وراجع الرسومات مع المختص.','Plan circulation, storage and lighting for the business and review drawings with the appropriate professional.'],
  ['في الصيانة التجارية، حدد المعدات المتأثرة وساعات التوقف ومسؤولية إعادة التشغيل.','For commercial maintenance, identify affected equipment, downtime and responsibility for recommissioning.'],
  ['اذكر المواصفات والكمية ومواعيد التفريغ والفاتورة عند طلب التوريد للموقع التشغيلي.','Specify material grades, quantities, unloading windows and documentation for an operating site.'],
  ['اربط طلب الهياكل أو النجارة برسومات التصنيع والتثبيت والأحمال التي يراجعها المختص.','Support fabrication orders with drawings, fixing details and loads reviewed by the responsible professional.'],
  ['لتجهيز مكتب أو معرض، قِس الحركة ومداخل التحميل وحدد متطلبات التجميع والضمان.','For an office or showroom, measure circulation and loading access and specify assembly and warranty.'],
  ['اطلب قدرة المعدة وسجلات الفحص والمشغل والنقل وحدود مسؤولية التعطل في العقد.','Set out equipment capacity, inspection, operator, transport and downtime responsibilities.'],
  ['للمحل أو الورشة، حدد الأسطح ومخلفات التشغيل المسموح التعامل معها وساعات الدخول.','For a shop or workshop, define surfaces, permitted waste handling and access hours.']
 ],
 'remah':[
  ['اذكر موقع العمل الدقيق والوصول وعدد الزيارات عند مقارنة عروض البناء والتجديد.','Provide the exact site, access and expected visits when comparing construction bids.'],
  ['جهز صور الموقع ومقاساته قبل التواصل، وحدد ما يلزم قياسه أثناء الزيارة.','Provide site photos and measurements and identify what the designer must verify during a visit.'],
  ['اجمع أعراض العطل والقطع المتاحة قبل الزيارة، واطلب توضيح انتقال الفريق والضمان.','Collect fault symptoms and available part details; clarify travel, visits and warranty.'],
  ['حدد وجهة التوصيل وإمكانية تفريغ الشحنة، وافصل كلفة النقل عن المواد.','Specify the delivery point and unloading access, separating transport from material prices.'],
  ['اطلب معاينة أو قياسات موثوقة قبل تفصيل القطع، وحدد نقلها وتركيبها.','Arrange a site measure before custom fabrication and specify delivery and installation.'],
  ['تأكد من أبعاد القطع وموعد التوصيل وما إذا كان تجميع الأثاث داخل العرض.','Confirm item dimensions, delivery date and whether furniture assembly is included.'],
  ['قارن مدة الاستخدام الفعلية مع نقل المعدة والمشغل والوقود دون افتراض رسم انتقال ثابت.','Compare actual hire time with transport, operator and fuel without assuming a fixed travel charge.'],
  ['حدد موقع التنظيف وحجم المهمة والصور، واتفق على الانتقال والمواد قبل الموعد.','Provide the cleaning location, size and photos; agree transport and materials before scheduling.']
 ],
 'sweihan':[
  ['صف طبيعة الموقع واحتياجات التجهيز ومسار دخول المعدات قبل تسعير المشروع.','Describe site conditions, mobilisation and equipment access before pricing the project.'],
  ['أرسل الرسم والمقاسات واستعمال المساحة، وحدد هل يتطلب العمل زيارة قبل اعتماد التصميم.','Provide drawings, dimensions and intended use; clarify whether a site visit is needed.'],
  ['صف العطل والمعدات المطلوبة، واسأل عن عدد الزيارات وقطع الغيار ووقت المعاينة.','Describe the fault and equipment needs; ask about visits, parts and inspection timing.'],
  ['حدد نقطة التسليم والكمية والتفريغ، واسأل المورد عن توفر الخامة قبل تثبيت الجدول.','Set the delivery point, quantity and unloading arrangements; confirm stock before scheduling.'],
  ['للأعمال حسب المقاس، وضح من يقيس الموقع ومن ينقل القطع ومن يركبها.','For custom work, identify who measures, transports and installs the finished pieces.'],
  ['اطلب مقاسات الأثاث ومواصفات القماش وموعد النقل وتكاليف التركيب بوضوح.','Request clear furniture dimensions, fabric specifications, transport and installation terms.'],
  ['حدد المعدة وقدرتها ووضع الموقع، واتفق على المشغل والوقود والتأمين حيث يلزم.','Specify equipment capacity and site conditions; agree operator, fuel and insurance where applicable.'],
  ['حدد المساحات والقطع والموعد، واسأل عن المعدات والانتقال وطريقة التجفيف.','List areas, items and timing; ask about equipment, travel and drying methods.']
 ],
 'mazid':[
  ['أرفق رسم الملحق أو صور العقار، وافصل نطاق الإنشاء عن التشطيب والتوصيلات.','Provide extension drawings or property photos and separate construction, finishes and connections.'],
  ['حدد متطلبات الغرف والمجلس ومواقع الكهرباء، واطلب بيان مراحل التصميم والتعديل.','Describe rooms, majlis and power points; ask for design stages and revision terms.'],
  ['وثّق حالة الأجهزة أو الجدران، واتفق على المعاينة وقطع الغيار وموعد الإصلاح.','Document equipment or wall condition and agree inspection, parts and repair timing.'],
  ['قارن وحدات القياس والمواصفات والتوصيل مع ظروف تخزين المواد في الموقع.','Compare units, specifications and delivery against available on-site storage.'],
  ['حدد مقاس الفتحات ونوع الخامة وطريقة التركيب والنقل قبل طلب تصنيع الأبواب.','Specify openings, materials, installation and transport before ordering custom doors.'],
  ['راجع مقاسات المجلس والأبواب وتكاليف النقل والتجميع وعيّنات القماش.','Review majlis and doorway measurements, delivery, assembly and upholstery samples.'],
  ['اذكر موقع العمل وقدرة المعدة والنقل والوقود ومسؤولية صيانتها خلال الإيجار.','State the site, required capacity, transport, fuel and maintenance responsibility during hire.'],
  ['افصل تنظيف الغرف عن الأثاث والساحات، وحدد الماء المتاح وطريقة الوصول.','Separate room, furniture and yard cleaning and discuss water access and entry arrangements.']
 ],
 'mazid-company-camp':[
  ['حدد الجهة المخولة وساعات العمل والتوقف التشغيلي عند تجهيز موقع الشركات.','Identify the authorised contact, working hours and possible downtime for the company site.'],
  ['اطلب توزيعًا يتناسب مع عدد الوحدات ومسارات الدخول واحتياجات المستخدمين الفعلية.','Design around the unit count, controlled access and actual needs of occupants.'],
  ['جهز قائمة الوحدات المتضررة والأعطال وأوقات السماح بدخول فريق الصيانة.','List affected units, faults and approved access windows for the maintenance team.'],
  ['حدد عدد الوحدات والكميات وموقع التسليم والمستندات المطلوبة من المورد.','Specify unit counts, quantities, delivery points and required supplier documentation.'],
  ['قِس الأبواب والخزائن المتكررة واعتمد عينة واحدة وجدول توريد قبل الإنتاج.','Measure repeated doors or cabinets and approve a sample and delivery schedule before production.'],
  ['قارن تجهيز الوحدات بحسب العدد والمتانة والتجميع وإمكانية استبدال القطع.','Compare unit furnishing by quantity, durability, assembly and replaceable components.'],
  ['اشرح متطلبات سلامة الموقع وساعات الدخول وقدرة المعدة والتنسيق مع إدارة الموقع.','Explain site safety, access hours, equipment capacity and coordination with site management.'],
  ['حدد عدد الغرف ومرافقها وخطة الدخول والمواد المسموح بها ومسؤولية النفايات.','Specify room counts, facilities, access, permitted products and waste responsibilities.']
 ],
 'nahil':[
  ['أرسل موقع المشروع وصور الأرض ونوع الأعمال، واطلب بيان الزيارات والتجهيز.','Send the project location, site photos and scope; request mobilisation and visit details.'],
  ['حدد القياسات واستعمال المبنى والمخرجات المطلوبة قبل تحديد موعد المعاينة.','Provide dimensions, building use and design deliverables before arranging a site visit.'],
  ['اذكر العطل وسجل الإصلاحات السابقة وقطع الغيار، واتفق على الزيارة والضمان.','Describe the fault, repair history and parts, and agree the visit and warranty.'],
  ['اطلب جدول الكميات والمواصفات مع موقع التفريغ ومواعيد نقل المواد.','Request quantities and specifications along with unloading location and delivery timing.'],
  ['اعتمد القياسات والإكسسوارات ورسومات التصنيع وحدد النقل والتركيب في العرض.','Approve measurements, hardware and fabrication drawings, with transport and installation in the quote.'],
  ['قارن جودة الأثاث والمقاسات والتوصيل والتجميع قبل اعتماد الطلب.','Compare furniture quality, dimensions, delivery and assembly before ordering.'],
  ['حدد المهمة وقدرة المعدة ومسؤولية النقل والمشغل والصيانة طوال مدة الإيجار.','Specify the task, equipment capacity, transport, operator and maintenance during hire.'],
  ['صف الموقع والقطع وحالة الأسطح، واتفق على موعد الفريق والمعدات وطريقة التنظيف.','Describe the location, items and surface condition and agree staffing, equipment and methods.']
 ],
};

export const AL_AIN_DISTRICT_SECTOR_CONTEXTS=Object.fromEntries(
  Object.entries(rows).map(([area,entries])=>[area,Object.fromEntries(
    sectors.map((sector,index)=>[sector,{ar:entries[index][0],en:entries[index][1]}])
  )])
);
