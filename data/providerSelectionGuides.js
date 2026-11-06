export const PROVIDER_SELECTION_GUIDES = [
  {
    id:'check-business', image:'consultation',
    ar:{title:'كيف تتحقق من الشركة قبل الاتفاق؟',summary:'راجع الاسم والنشاط والرخصة والتغطية المناسبة لمشروعك قبل طلب التنفيذ.',alt:'تصور توضيحي لعميل يراجع تفاصيل مشروعه مع مختص',paragraphs:[
      'ابدأ بالاسم القانوني ورقم الرخصة والنشاط المرتبط بالخدمة التي تحتاجها. يمكنك الاستعلام عن الرخص الاقتصادية من خلال السجل الاقتصادي الوطني أو الجهة التي أصدرت الرخصة، مع مراجعة حالة السجل وبياناته الحالية لدى المصدر.',
      'في المشاريع الهندسية أو الإنشائية، اسأل عن التصنيف أو التأهيل والموافقات التي قد تنطبق على نوع العمل وموقعه. وفي أبوظبي تنشر دائرة البلديات والنقل قائمة بالشركات الهندسية ذات التصنيف الساري. لا تفترض أن رخصة المنشأة هي تصريح المشروع.',
      'ظهور شارة التوثيق في بيت الريف، عند وجودها، يتعلق بحالة الملف على المنصة ولا يغنيك عن التحقق من الرخصة أو التأهيل لدى الجهة الرسمية. اسأل الشركة كذلك عن الخبرة المشابهة وتغطية عنوانك والموعد الفعلي.' ]},
    en:{title:'How can you check a business before you agree?',summary:'Check the legal name, activity, licence and suitability for your project.',alt:'Illustration of a client reviewing project details with a professional',paragraphs:[
      'Start with the legal name, licence number and activity relevant to the service. Check current economic licence information through the National Economic Register or the issuing authority.',
      'For engineering or construction, ask about classification, qualifications and approvals applicable to the work and location. Abu Dhabi’s Department of Municipalities and Transport publishes a list of engineering firms with valid classifications. A business licence is not a project permit.',
      'A Biet Al Reef verification badge, where displayed, concerns the profile’s status on the platform and does not replace a check with the official authority. Confirm comparable experience, coverage of your address and actual availability directly.' ]},
    sources:[['السجل الاقتصادي الوطني','UAE National Economic Register','https://u.ae/en/information-and-services/business/important-digital-services/national-economic-register'],['الشركات الهندسية المصنفة في أبوظبي','Abu Dhabi engineering firms with valid classification','https://pages.dmt.gov.ae/en/Engineering-Firms']],
    action:['دليل الأماكن في الإمارات','Explore locations in the UAE','/uae']
  },
  {
    id:'compare-quotes',image:'compare-quotes',
    ar:{title:'كيف تقارن عروض الشركات بشكل عادل؟',summary:'وحّد نطاق العمل والمواصفات، ثم قارن ما يشمله العرض وما يستثنيه.',alt:'تصور توضيحي لمقارنة عروض ومستندات وخامات لمشروع',paragraphs:[
      'قد يختلف عرضان لأن أحدهما يتضمن مواد أو زيارات أو تركيبًا أو اختبارات لا يشملها الآخر. أرسل الوصف والمقاسات والصور والمخططات نفسها، واطلب من كل جهة تقسيم العرض إلى أعمال ومواد ونقل وضريبة عند انطباقها.',
      'قارن الموعد والمدة والدفعات والاستثناءات وطريقة اعتماد الأعمال الإضافية والضمان. في الصيانة، اسأل عن قيمة المعاينة والقطع وإعادة التشطيب؛ وفي التوريد، تحقق من موعد التسليم والتفريغ والاستبدال.',
      'قبل الدفع، احتفظ باسم الجهة والفاتورة والاتفاق والمراسلات المؤثرة، وحدد ما ستفعله إذا ظهر اختلاف أو تأخير. الأقل سعرًا لا يكون الخيار الأنسب تلقائيًا، ولا نعرض سعرًا موحدًا دون نطاق ومواصفات.' ]},
    en:{title:'How can you compare company quotations fairly?',summary:'Standardise scope and specifications, then compare inclusions and exclusions.',alt:'Illustration of comparing quotations, documents and project materials',paragraphs:[
      'Two offers can differ because one includes materials, visits, installation or tests that the other excludes. Send the same description, dimensions, photos and plans, and request a breakdown of work, materials, transport and applicable tax.',
      'Compare dates, duration, payments, exclusions, approval of extra work and warranty. For maintenance ask about inspection, parts and reinstatement; for supply confirm delivery, unloading and replacement.',
      'Before payment keep the business details, invoice, agreement and relevant correspondence, and agree how differences or delays will be handled. The lowest headline price is not automatically the best fit; no universal price is implied.' ]},
    sources:[['حماية المستهلك في الإمارات','UAE Government: consumer protection','https://u.ae/en/information-and-services/justice-safety-and-the-law/consumer-protection']],
    action:['جهّز طلب عرض سعر','Prepare a quotation request','/request-quote']
  },
  {
    id:'prepare-request',image:'handover',
    ar:{title:'ماذا تكتب في طلب الخدمة أو التوريد؟',summary:'وصف واضح ومقاسات وموعد يساعد الجهات على تقديم عروض قابلة للمقارنة.',alt:'تصور توضيحي لعميل ومختص يراجعان قائمة متطلبات المنزل',paragraphs:[
      'ابدأ بالإمارة والمنطقة ونوع العقار أو المشروع، ثم اشرح المشكلة أو النتيجة المطلوبة. اذكر المساحة أو عدد القطع، وأرفق صورًا أو مخططات متاحة، وبيّن ما إذا كان الموقع مشغولًا أو يحتاج ترتيبات دخول.',
      'للمواد والتجهيز، أضف الكميات والمواصفات ومكان التسليم واحتياج التركيب. وللمقاولات والتصميم، وضّح مرحلة المشروع والرسومات المطلوبة؛ وللتنظيف والصيانة، حدد الخامات وحالة الموقع ومواعيد العمل الممكنة.',
      'اطلب من الجهة تأكيد قدرتها على الوصول ونطاق العمل وموعد المعاينة، ولا ترسل عنوانًا دقيقًا أو مستندات خاصة إلا عبر قناة مناسبة بعد اختيار الجهة. خدمة عملاء بيت الريف تساعدك في ترتيب الطلب إذا لم تجد التخصص المناسب.' ]},
    en:{title:'What should you include in a service or supply request?',summary:'A clear brief, measurements and timing help businesses provide comparable offers.',alt:'Illustration of a customer and professional reviewing a home requirements checklist',paragraphs:[
      'Start with the emirate, area and property or project type, then describe the problem or result required. Add area or item counts and available photos or plans; explain whether the site is occupied or has access arrangements.',
      'For materials and fit-out, add quantities, specifications, delivery and installation needs. For construction and design, state the project stage and required drawings; for cleaning and maintenance, describe surfaces, condition and working times.',
      'Ask the business to confirm coverage, scope and inspection timing. Share the precise address and private documents through an appropriate channel once you have chosen the recipient. Biet Al Reef customer service can help organise the request.' ]},
    sources:[],
    action:['ابدأ طلبك','Start your request','/request-quote']
  }
];
