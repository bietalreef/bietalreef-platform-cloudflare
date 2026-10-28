export const AL_NAEEM_SLUG = 'al-naeem-cleaning-services';
export const AL_NAEEM_ORIGIN = 'https://bietalreef.ae';
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_SECTIONS = ['services', 'offers', 'service-areas'];
const MEDIA = '/images/providers/al-naeem/';

// Independent editorial landing content supplied by the platform owner.
// No Supabase account is impersonated or modified. This launch is a public
// advertising landing page, NOT an admin-verified provider profile.
const services = [
  {
    id:'naeem-home', slug:'home-villa-cleaning',
    name_ar:'تنظيف المنازل والفلل', name_en:'Home & Villa Cleaning',
    description_ar:'تنظيف المنازل والشقق والفلل مع تحديد عدد الغرف والحمامات والمساحة قبل إعداد عرض السعر. يمكن إضافة تنظيف المجالس والأحواش إلى نطاق الطلب حسب الحاجة.',
    description_en:'Home, apartment and villa cleaning tailored to the number of rooms, bathrooms and property size. Majlis and courtyard cleaning can be included in the requested scope.',
    details_ar:'يشمل تحديد الاحتياج تنظيف الأسطح والأرضيات والمطابخ والحمامات والأماكن المتفق عليها. أرسل نوع العقار، الموقع، المساحة والوقت المناسب للحصول على عرض واضح قبل التنفيذ.',
    details_en:'Share your property type, location, size and preferred date. Cleaning can cover agreed surfaces, floors, kitchens and bathrooms; exact tasks are confirmed before work starts.',
    image: "/images/providers/al-naeem/home-villa-male.webp"
  },
  {
    id:'naeem-tank', slug:'water-tank-cleaning-sanitization',
    name_ar:'غسيل وتعقيم خزانات المياه', name_en:'Water Tank Cleaning & Sanitization',
    description_ar:'غسيل خزانات المياه وتنظيف الرواسب وإجراءات التعقيم المناسبة حسب نوع الخزان وحجمه وسهولة الوصول إليه.',
    description_en:'Water tank cleaning, sediment removal and suitable sanitization according to tank material, capacity and accessibility.',
    details_ar:'لتقدير الخدمة، حدّد سعة الخزان وموقعه ونوعه وإمكانية تصريف المياه والوقت المناسب. يتم تأكيد طريقة التنظيف والتعقيم بعد مراجعة ظروف الموقع.',
    details_en:'Tell us the tank volume, type, location, drainage and access conditions. The cleaning and sanitization method is confirmed after assessing the site.',
    image: "/images/providers/al-naeem/water-tank-male.webp"
  },
  {
    id:'naeem-steam', slug:'steam-carpet-sofa-cleaning',
    name_ar:'غسيل السجاد والكنب بالبخار', name_en:'Carpet & Sofa Steam Cleaning',
    description_ar:'تنظيف الكنب والسجاد والمفروشات بالبخار أو بالطريقة المناسبة لنوع القماش وحالته، مع مراجعة البقع قبل التنفيذ.',
    description_en:'Sofa, carpet and upholstery cleaning by steam or another suitable method, depending on fabric condition and stain type.',
    details_ar:'قبل تحديد السعر والطريقة، أرسل صور القطع وعدد المقاعد أو مقاسات السجاد ونوع القماش إن كان معروفًا. تختلف النتائج بحسب طبيعة الألياف والبقع.',
    details_en:'Provide item photos, seating count or carpet dimensions and fabric details if known. Suitable methods and expected results depend on the material and stains.',
    image: "/images/providers/al-naeem/sofa-carpet-male.webp"
  },
  {
    id:'naeem-curtain',slug:'curtains-upholstery-majlis-cleaning',
    name_ar:'تنظيف الستائر والمفروشات والمجالس',name_en:'Curtains, Upholstery & Majlis Deep Cleaning',
    description_ar:'تنظيف عميق للستائر والمفروشات والمجالس العربية مع اختيار أسلوب مناسب لطبيعة الأقمشة وتركيبها.',
    description_en:'Deep cleaning for curtains, upholstery and Arabic majlis seating using approaches suitable for the fabric and installation.',
    details_ar:'حدّد نوع المفروشات وأعدادها وحالتها، وما إذا كانت الستائر ثابتة أو قابلة للفك. نؤكد نطاق العمل والتكلفة بناءً على تفاصيل الطلب.',
    details_en:'Confirm the item count, materials, condition and whether curtains can be removed. The service scope and quote are based on these details.',
    image: "/images/providers/al-naeem/majlis-upholstery-male.webp"
  }
];
// Requests showcased on already-established pages. They do not create new URLs
// or imply a confirmed price, team availability or equipment for every site.
const additionalRequests = [
  {
    slug:'facade-cleaning',name_ar:'تنظيف الواجهات',name_en:'Facade & Exterior Cleaning',
    description_ar:'تنظيف واجهات المباني والفلل بحسب مادة الواجهة والارتفاع وإمكانية الوصول الآمن. حدّد نوع الواجهة ومساحتها وأرسل صورًا لتقييم نطاق العمل.',
    description_en:'Facade cleaning scoped to the material, height and safe access conditions. Share facade type, area and photos for a service assessment.',
  },
  {
    slug:'courtyard-garden-cleaning',name_ar:'تنظيف الأحواش والحدائق',name_en:'Courtyard & Garden-Area Cleaning',
    description_ar:'تنظيف أرضيات الأحواش والممرات والمساحات الخارجية المحيطة بالحديقة من الأتربة والمخلفات حسب نوع الأرضية؛ ولا يشمل ذلك تلقائيًا أعمال تنسيق الحدائق.',
    description_en:'Cleaning courtyard floors, paths and garden-adjacent outdoor areas according to surface type. Landscaping work is not automatically included.',
  },
  {
    slug:'parking-area-cleaning',name_ar:'تنظيف مواقف السيارات والباركنات',name_en:'Car Park & Parking-Lot Cleaning',
    description_ar:'تنظيف أرضيات مواقف الفلل والمباني والمواقف التجارية بعد تحديد مساحة الموقف وطبيعة البقع وحركة السيارات. المقصود تنظيف المواقف نفسها وليس غسيل السيارات.',
    description_en:'Cleaning residential or commercial parking surfaces with scope based on area, stains and vehicle access. This is car-park cleaning, not car washing.',
  },
];
const offers = services.map((service,i)=>({
  id:'naeem-offer-'+i,
  slug:service.slug+'-10-percent',
  name_ar:'خصم عشرة بالمئة على '+service.name_ar,
  name_en:'Ten percent off '+service.name_en,
  description_ar:'خصم عشرة بالمئة على سعر الخدمة المعروض في عرض السعر الخاص بها. يتم تأكيد السعر الأساسي النهائي والتوافر وتفاصيل الطلب مع الشركة قبل الحجز. لا يوجد سعر ثابت منشور.',
  description_en:'Ten percent off the quoted price of this service. Confirm the standard quotation, availability and scope with the company before booking. No fixed price is advertised.',
  details_ar:'نسبة الخصم عشرة بالمئة من قيمة عرض السعر الأساسي للخدمة المؤهلة قبل الخصم. اطلب عرض سعر مكتوبًا وتأكيد سريان العرض قبل الموافقة على التنفيذ. لا يشمل العرض تلقائيًا خدمات إضافية خارج نطاق الاتفاق.',
  details_en:'The ten percent discount applies to the standard quotation for the eligible service before discount. Request a written quote and confirm offer availability before accepting work. Additional out-of-scope work is not automatically included.',
  image:service.image,
  service_slug:service.slug,
  discount_percent:10
}));
const areas = [
  {id:'naeem-dubai',slug:'dubai',name_ar:'دبي',name_en:'Dubai',description_ar:'خدمات تنظيف المنازل والفلل والخزانات والمفروشات في دبي، مع تنسيق الموعد بحسب المنطقة وتوافر فريق العمل.',description_en:'Home, villa, tank and upholstery cleaning in Dubai, subject to area-specific availability and appointment scheduling.'},
  {id:'naeem-sharjah',slug:'sharjah',name_ar:'الشارقة',name_en:'Sharjah',description_ar:'يمكن طلب خدمات الشركة في الشارقة مع تأكيد وقت الوصول ونطاق الخدمة والتكلفة قبل الحجز.',description_en:'Request cleaning in Sharjah and confirm travel arrangements, service scope and quotation before booking.'},
  {id:'naeem-umm-al-quwain',slug:'umm-al-quwain',name_ar:'أم القيوين',name_en:'Umm Al Quwain',description_ar:'تقديم خدمات التنظيف في أم القيوين وفق جدول التشغيل وتفاصيل العقار ومتطلبات العمل.',description_en:'Cleaning requests in Umm Al Quwain are scheduled according to operational availability and the property requirements.'},
  {id:'naeem-ras-al-khaimah',slug:'ras-al-khaimah',name_ar:'رأس الخيمة',name_en:'Ras Al Khaimah',description_ar:'استفسر عن خدمات التنظيف في رأس الخيمة وأرسل الموقع لتأكيد إمكانية التنفيذ والموعد.',description_en:'Ask about cleaning services in Ras Al Khaimah and share your location to confirm service availability and timing.'},
  {id:'naeem-al-ain',slug:'al-ain',name_ar:'العين',name_en:'Al Ain',description_ar:'طلبات خدمات تنظيف المنازل والمفروشات والخزانات في العين، مع تأكيد التفاصيل والتوافر مباشرة قبل الموعد.',description_en:'Cleaning enquiries for homes, upholstery and water tanks in Al Ain, subject to direct confirmation of scope and availability.'},
];
// Additional coverage belongs to existing indexed UAE directory routes, not new
// provider /service-areas/ URLs or an expanded sitemap.
const eastCoastCoverage = [
  {
    id:'naeem-fujairah',slug:'fujairah',name_ar:'الفجيرة',name_en:'Fujairah',
    directoryPath:'/uae/fujairah/fujairah-city/cleaning-services',
    description_ar:'اطلب تنظيف المنازل والفلل أو غسيل خزانات المياه أو تنظيف الكنب والمجالس في الفجيرة، مع تأكيد نطاق العمل وتوافر الفريق قبل الحجز.',
    description_en:'Request home and villa cleaning, water tank cleaning, or sofa and majlis care in Fujairah, with service scope and team availability confirmed before booking.',
    details_ar:'لإعداد طلب تنظيف في الفجيرة، حدّد الحي أو أرسل موقع العقار، واذكر إن كان المطلوب تنظيف منزل أو خزان مياه أو مفروشات. أرفق المساحة أو سعة الخزان أو صور الأقمشة حسب الخدمة، ثم اطلب عرض سعر يوضح الأعمال والموعد وتكاليف الانتقال إن وجدت.',
    details_en:'For a cleaning request in Fujairah, share your neighbourhood or property location and whether you need home, water tank or upholstery cleaning. Include the floor area, tank capacity or fabric photos as relevant, then request a quote detailing the scope, visit date and any travel charges.',
    highlights_ar:['للمنازل والفلل: وضّح عدد الغرف وحالة العقار والأماكن التي تحتاج إلى تنظيف.','لخزانات المياه: أرسل نوع الخزان وسعته ومكانه لتحديد طريقة العمل المناسبة.','للكنب والسجاد والمجالس: أرفق صور القطع والمقاسات لتحديد نطاق التنظيف.'],
    highlights_en:['Homes and villas: share the room count, property condition and spaces requiring cleaning.','Water tanks: provide the tank type, capacity and location to discuss a suitable approach.','Sofas, carpets and majlis seating: send photos and dimensions to clarify the work scope.'],
  },
  {
    id:'naeem-kalba',slug:'kalba',name_ar:'كلباء',name_en:'Kalba',
    directoryPath:'/uae/sharjah/kalba/cleaning-services',
    description_ar:'طلبات تنظيف المنازل والفلل والخزانات والمفروشات في كلباء بالمنطقة الشرقية من إمارة الشارقة، مع مراجعة الموقع والموعد قبل الاتفاق.',
    description_en:'Cleaning enquiries for homes, villas, tanks and furnishings in Kalba on Sharjah’s east coast, subject to location and appointment confirmation.',
    details_ar:'إذا كان موقعك في كلباء، أرسل الموقع الدقيق وصورًا توضّح احتياجك. لتنظيف المنزل اذكر عدد الغرف والمساحة، ولغسيل الخزان حدّد السعة وطريقة الوصول، ولتنظيف المجالس والمفروشات أرسل عدد القطع وأبعادها. يتحدد السعر والموعد بعد مراجعة التفاصيل.',
    details_en:'If your property is in Kalba, share its exact location and photos of the work required. For homes, include room count and size; for tanks, capacity and access; for majlis seating and upholstery, item count and dimensions. Pricing and timing are confirmed after reviewing these details.',
    highlights_ar:['تنظيف الشقق والفلل بحسب المساحة وحالة المطبخ والحمامات والمجالس.','غسيل الخزانات وفق نوعها وحجمها وتجهيزات الوصول والتصريف.','العناية بالكنب والستائر والمجالس بعد مراجعة نوع الأقمشة وحالتها.'],
    highlights_en:['Apartment and villa cleaning planned around space, kitchens, bathrooms and majlis areas.','Tank cleaning scoped according to type, size, access and drainage arrangements.','Sofa, curtain and majlis cleaning discussed after checking fabric type and condition.'],
  },
  {
    id:'naeem-khorfakkan',slug:'khorfakkan',name_ar:'خورفكان',name_en:'Khorfakkan',
    directoryPath:'/uae/sharjah/khorfakkan/cleaning-services',
    description_ar:'استفسر عن تنظيف الفلل والشقق وخزانات المياه والكنب والسجاد في خورفكان التابعة لإمارة الشارقة، مع تأكيد التوافر والسعر حسب الطلب.',
    description_en:'Enquire about villa, apartment, water tank, sofa and carpet cleaning in Khorfakkan, Sharjah, with availability and pricing confirmed per request.',
    details_ar:'لترتيب خدمة في خورفكان، شارك موقع العقار ونوعه والمساحات المطلوبة، أو أرسل سعة خزان المياه وصور موقعه، أو صور المفروشات المطلوب تنظيفها. اطلب تحديد الأعمال المشمولة والمواد أو التجهيزات اللازمة والموعد المناسب قبل تأكيد الحجز.',
    details_en:'To arrange a service in Khorfakkan, send your property location, type and areas to clean; alternatively, share water tank capacity and access photos, or photos of the furnishings. Confirm the included tasks, required materials or arrangements and preferred date before booking.',
    highlights_ar:['تنظيف الفلل والمنازل: تحديد الغرف والأرضيات والمطابخ والحمامات المشمولة.','غسيل وتعقيم الخزانات: مراجعة السعة والوصول وإجراءات تجهيز الخزان.','تنظيف الكنب والسجاد: اختيار طريقة مناسبة لنوع القماش والبقع بعد فحص التفاصيل.'],
    highlights_en:['Villa and home cleaning: identify the rooms, floors, kitchens and bathrooms in scope.','Tank cleaning and sanitization: review capacity, access and preparation requirements.','Sofa and carpet care: choose a suitable method after assessing fabrics and stains.'],
  },
];
const coverageAreas = [...areas, ...eastCoastCoverage];
const gallery = [
  {
    id:'naeem-brand-cleaning',image:'/images/providers/al-naeem/brand-cleaning-cover.webp',
    name_ar:'شركة النعيم لخدمات التنظيف',name_en:'Al Naeem Cleaning Services',
    description_ar:'تصميم إعلاني للخدمات المنزلية وتنظيف المباني والخزانات.',
    description_en:'Branded creative for home, building and water tank cleaning.',
  },
  {
    id:'naeem-brand-tank',image:'/images/providers/al-naeem/brand-tank-cleaning.webp',
    name_ar:'غسيل وتعقيم خزانات المياه',name_en:'Water Tank Cleaning & Sanitization',
    description_ar:'تصميم إعلاني خاص بغسيل وتعقيم خزانات المياه.',
    description_en:'Branded creative for water tank cleaning and sanitization.',
  },
  {
    id:'naeem-brand-majlis',image:'/images/providers/al-naeem/brand-majlis-cleaning.webp',
    name_ar:'تنظيف المجالس والستائر والمفروشات',name_en:'Majlis, Curtain & Upholstery Cleaning',
    description_ar:'تصميم إعلاني لتنظيف المجالس والمفروشات والستائر.',
    description_en:'Branded creative for majlis, curtain and upholstery cleaning.',
  },
];

export function alNaeemPath(locale='ar', route={kind:'home'}) {
  const prefix=locale==='en'?'/en':'';
  const base=prefix+'/providers/'+AL_NAEEM_SLUG;
  return route.kind==='home'?base:base+'/'+route.kind+(route.slug?'/'+route.slug:'');
}
export function resolveAlNaeemRoute(parts=[]) {
  if (!Array.isArray(parts)||parts.length>2)return null;
  if(!parts.length)return {kind:'home'};
  const [kind,slug]=parts;
  if (!VALID_SECTIONS.includes(kind))return null;
  return parts.length===1?{kind}:typeof slug==='string'&&VALID_SLUG.test(slug)?{kind,slug}:null;
}
// Shared editorial publication source for company, services and all geographic directory cards.
export const AL_NAEEM_EDITORIAL_DATA = {
    profile: {
      id:'naeem-standalone-platform',
      slug:AL_NAEEM_SLUG,
      name_ar:'شركة النعيم لخدمات التنظيف والتعقيم وتنظيف الخزانات',
      name_en:'Al Naeem Cleaning, Sanitization & Water Tank Cleaning Services',
      description_ar:'شركة النعيم لخدمات التنظيف والتعقيم وتنظيف الخزانات تقدم تنظيف المنازل والفلل والمجالس والأحواش، وغسيل وتعقيم خزانات المياه، وتنظيف السجاد والكنب بالبخار، والعناية بالستائر والمفروشات. مقر التواصل: دبي، القصيص، شارع دمشق. يمكن طلب عرض سعر في دبي والشارقة وأم القيوين ورأس الخيمة والعين والفجيرة وكلباء وخورفكان، مع تأكيد التوافر قبل الحجز.',
      description_en:'Al Naeem provides home and villa cleaning, water tank cleaning and sanitization, carpet and sofa steam cleaning, and deep cleaning for curtains, upholstery and majlis seating. Contact location: Damascus Street, Al Qusais, Dubai. Enquiries are accepted for Dubai, Sharjah, Umm Al Quwain, Ras Al Khaimah, Al Ain, Fujairah, Kalba and Khorfakkan, subject to confirmed availability.',
      short_description_ar:'تنظيف المنازل والفلل والخزانات والكنب والسجاد والمفروشات في الإمارات.',
      short_description_en:'Home, villa, water tank, carpet, sofa and upholstery cleaning in the UAE.',
      phone:'+971522837071',whatsapp:'+971522837071',
      address_ar:'دبي، القصيص، شارع دمشق',address_en:'Damascus Street, Al Qusais, Dubai',
      logo_url:MEDIA+'logo.svg',
      cover_image_url:'/images/providers/al-naeem/home-villa-male.webp',
      
      // Brand-owned generated creative images, not documentation of completed projects.\n      // No verified provider badge, claim of trade licence or fabricated reviews.
      source:'platform_owner_supplied',
    },
    services,offers,areas,coverageAreas,additionalRequests,gallery,
};
export async function getAlNaeemData() { return AL_NAEEM_EDITORIAL_DATA; }

export async function getAlNaeemProps(context,locale,parts=[]) {
  const route=resolveAlNaeemRoute(parts);
  if(!route)return {notFound:true};
  const data=await getAlNaeemData();
  const collection=route.kind==='services'?data.services:route.kind==='offers'?data.offers:route.kind==='service-areas'?data.areas:null;
  if(route.slug&&!collection?.some(x=>x.slug===route.slug))return {notFound:true};
  context.res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=600');
  return {props:{data,route,locale}};
}
