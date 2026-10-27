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
    image: MEDIA+'home-villa-cleaning.svg'
  },
  {
    id:'naeem-tank', slug:'water-tank-cleaning-sanitization',
    name_ar:'غسيل وتعقيم خزانات المياه', name_en:'Water Tank Cleaning & Sanitization',
    description_ar:'غسيل خزانات المياه وتنظيف الرواسب وإجراءات التعقيم المناسبة حسب نوع الخزان وحجمه وسهولة الوصول إليه.',
    description_en:'Water tank cleaning, sediment removal and suitable sanitization according to tank material, capacity and accessibility.',
    details_ar:'لتقدير الخدمة، حدّد سعة الخزان وموقعه ونوعه وإمكانية تصريف المياه والوقت المناسب. يتم تأكيد طريقة التنظيف والتعقيم بعد مراجعة ظروف الموقع.',
    details_en:'Tell us the tank volume, type, location, drainage and access conditions. The cleaning and sanitization method is confirmed after assessing the site.',
    image: MEDIA+'tank-cleaning.svg'
  },
  {
    id:'naeem-steam', slug:'steam-carpet-sofa-cleaning',
    name_ar:'غسيل السجاد والكنب بالبخار', name_en:'Carpet & Sofa Steam Cleaning',
    description_ar:'تنظيف الكنب والسجاد والمفروشات بالبخار أو بالطريقة المناسبة لنوع القماش وحالته، مع مراجعة البقع قبل التنفيذ.',
    description_en:'Sofa, carpet and upholstery cleaning by steam or another suitable method, depending on fabric condition and stain type.',
    details_ar:'قبل تحديد السعر والطريقة، أرسل صور القطع وعدد المقاعد أو مقاسات السجاد ونوع القماش إن كان معروفًا. تختلف النتائج بحسب طبيعة الألياف والبقع.',
    details_en:'Provide item photos, seating count or carpet dimensions and fabric details if known. Suitable methods and expected results depend on the material and stains.',
    image: MEDIA+'steam-cleaning.svg'
  },
  {
    id:'naeem-curtain',slug:'curtains-upholstery-majlis-cleaning',
    name_ar:'تنظيف الستائر والمفروشات والمجالس',name_en:'Curtains, Upholstery & Majlis Deep Cleaning',
    description_ar:'تنظيف عميق للستائر والمفروشات والمجالس العربية مع اختيار أسلوب مناسب لطبيعة الأقمشة وتركيبها.',
    description_en:'Deep cleaning for curtains, upholstery and Arabic majlis seating using approaches suitable for the fabric and installation.',
    details_ar:'حدّد نوع المفروشات وأعدادها وحالتها، وما إذا كانت الستائر ثابتة أو قابلة للفك. نؤكد نطاق العمل والتكلفة بناءً على تفاصيل الطلب.',
    details_en:'Confirm the item count, materials, condition and whether curtains can be removed. The service scope and quote are based on these details.',
    image: MEDIA+'curtains-majlis.svg'
  }
];
const offers = services.map((service,i)=>({
  id:'naeem-offer-'+i,
  slug:service.slug+'-10-percent',
  name_ar:'خصم 10٪ على '+service.name_ar,
  name_en:'10% Off '+service.name_en,
  description_ar:'خصم 10٪ على عرض سعر هذه الخدمة عند ذكر عرض بيت الريف. يتم تأكيد السعر الأساسي النهائي والتوافر وشروط تطبيق الخصم مع الشركة قبل الحجز. لا يوجد سعر ثابت منشور.',
  description_en:'10% off the quotation for this service when mentioning the Biet Al Reef offer. Confirm the standard quotation, availability and eligibility with the company before booking. No fixed price is advertised.',
  details_ar:'نسبة الخصم 10٪ من قيمة عرض السعر الأساسي للخدمة المؤهلة قبل الخصم. اطلب عرض سعر مكتوبًا وتأكيد سريان العرض قبل الموافقة على التنفيذ. لا يشمل العرض تلقائيًا خدمات إضافية خارج نطاق الاتفاق.',
  details_en:'The 10% discount applies to the standard quotation for the eligible service before discount. Request a written quote and confirm offer availability before accepting work. Additional out-of-scope work is not automatically included.',
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
export async function getAlNaeemData() {
  return {
    profile: {
      id:'naeem-standalone-platform',
      slug:AL_NAEEM_SLUG,
      name_ar:'شركة النعيم لخدمات التنظيف والتعقيم وتنظيف الخزانات',
      name_en:'Al Nuaim Cleaning, Sanitization & Water Tank Cleaning Services',
      description_ar:'شركة النعيم لخدمات التنظيف والتعقيم وتنظيف الخزانات تقدم تنظيف المنازل والفلل والمجالس والأحواش، وغسيل وتعقيم خزانات المياه، وتنظيف السجاد والكنب بالبخار، والعناية بالستائر والمفروشات. مقر التواصل: دبي، القصيص، شارع دمشق. يمكنك طلب عرض سعر في دبي والشارقة وأم القيوين ورأس الخيمة والعين.',
      description_en:'Al Nuaim provides home and villa cleaning, water tank cleaning and sanitization, carpet and sofa steam cleaning, and deep cleaning for curtains, upholstery and majlis seating. Contact location: Damascus Street, Al Qusais, Dubai. Enquiries are accepted for Dubai, Sharjah, Umm Al Quwain, Ras Al Khaimah and Al Ain.',
      short_description_ar:'تنظيف المنازل والفلل والخزانات والكنب والسجاد والمفروشات في الإمارات.',
      short_description_en:'Home, villa, water tank, carpet, sofa and upholstery cleaning in the UAE.',
      phone:'+971522837071',whatsapp:'+971522837071',
      address_ar:'دبي، القصيص، شارع دمشق',address_en:'Damascus Street, Al Qusais, Dubai',
      logo_url:MEDIA+'logo.svg',
      cover_image_url:MEDIA+'cover.svg',
      // No verified provider badge, claim of trade licence or fabricated reviews.
      source:'platform_owner_supplied',
    },
    services,offers,areas,
  };
}
export async function getAlNaeemProps(context,locale,parts=[]) {
  const route=resolveAlNaeemRoute(parts);
  if(!route)return {notFound:true};
  const data=await getAlNaeemData();
  const collection=route.kind==='services'?data.services:route.kind==='offers'?data.offers:route.kind==='service-areas'?data.areas:null;
  if(route.slug&&!collection?.some(x=>x.slug===route.slug))return {notFound:true};
  context.res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=600');
  return {props:{data,route,locale}};
}
