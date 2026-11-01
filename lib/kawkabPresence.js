/**
 * Kawkab Al Saeed: one provider identity, one canonical route, no speculative
 * neighborhood pages. The public data below is the owner-approved publication
 * snapshot of Supabase BR-3000485 (reviewed 2026-11-01). Listing and sitemap
 * activation remain under the existing platform account lifecycle.
 */
import media from '../data/provider-media/provider-3000485.json';

export const KAWKAB_SLUG = 'kawkab-al-saeed';
export const KAWKAB_PROFILE_ID = 'c93b1b94-4d2e-4736-b1de-37e5bc93afa2';
export const KAWKAB_PROVIDER_CODE = 'BR-3000485';
export const KAWKAB_ORIGIN = 'https://bietalreef.ae';
export const KAWKAB_SECTIONS = ['home', 'services', 'service-areas', 'gallery', 'al-ain'];

export const KAWKAB_PROFILE = Object.freeze({
  id: KAWKAB_PROFILE_ID,
  code: KAWKAB_PROVIDER_CODE,
  nameAr: 'كوكب الصعيد للخدمات الفنية',
  nameEn: 'Kawkab Al Saeed Technical Services', // presentation translation, not legal name
  phone: '0556485364',
  descriptionAr: 'تتخصص كوكب الصعيد للخدمات الفنية في أعمال الصباغة والدهانات والبلاستر وورق الجدران والسباكة والنجارة والأرضيات الخشبية، وتركيب وصيانة أنظمة التكييف والتهوية وتنقية الهواء.',
  descriptionEn: 'Kawkab Al Saeed Technical Services provides painting, plaster work, wallpaper installation, plumbing, carpentry, wooden-floor installation, and air-conditioning and ventilation installation and maintenance.',
  verification: 'verified',
});

// Three active, emirate-level provider_service_locations rows in Supabase.
// No individual Al Ain neighborhood has its own approved coverage record.
export const KAWKAB_COVERAGE = Object.freeze([
  { slug:'abu-dhabi', ar:'أبوظبي', en:'Abu Dhabi', directory:'/uae/abu-dhabi/directory' },
  { slug:'dubai', ar:'دبي', en:'Dubai', directory:'/uae/dubai/directory' },
  { slug:'sharjah', ar:'الشارقة', en:'Sharjah', directory:'/uae/sharjah/directory' },
]);

// The specialties are explicitly in the canonical business description.
// The provider_services table contains zero published service items for this ID;
// therefore do not fabricate service-specific URLs or claim approved catalog items.
export const KAWKAB_SPECIALTIES = Object.freeze([
  { id:'painting',ar:'الصباغة والدهانات الداخلية',en:'Interior painting and decorating',arDesc:'تجديد ألوان الحوائط وتنسيق التشطيبات بحسب طبيعة المساحة.',enDesc:'Refresh walls and coordinate finishes according to the space.' },
  { id:'plaster',ar:'أعمال البلاستر وتجهيز الأسطح',en:'Plaster and surface preparation',arDesc:'أعمال التجهيز والتسوية ضمن مراحل التشطيب.',enDesc:'Surface preparation and plaster work within the finishing process.' },
  { id:'wallpaper',ar:'تركيب ورق الجدران',en:'Wallpaper installation',arDesc:'اختيار وتركيب تشطيبات جدارية مناسبة للتصميم الداخلي.',enDesc:'Wallpaper fitting and coordinated decorative wall finishes.' },
  { id:'plumbing',ar:'السباكة والتمديدات الصحية',en:'Plumbing and sanitary work',arDesc:'أعمال التمديدات والصيانة الصحية للمنازل والمباني.',enDesc:'Plumbing installation and maintenance for homes and buildings.' },
  { id:'carpentry',ar:'النجارة والأرضيات الخشبية',en:'Carpentry and wooden flooring',arDesc:'الأعمال الخشبية وتركيب الأرضيات ضمن احتياجات التجديد والتشطيب.',enDesc:'Woodwork and wood flooring as part of fitting out and renovation.' },
  { id:'hvac',ar:'تركيب وصيانة التكييف والتهوية',en:'Air conditioning and ventilation',arDesc:'خدمات تركيب وصيانة أنظمة التكييف والتهوية وتنقية الهواء.',enDesc:'Air-conditioning, ventilation and air-filtration installation and maintenance.' },
]);

// Active Al Ain districts from Supabase platform_areas, city id 96888f25-4cc3-4dc4-ab30-3caa34c1efda.
// City district selection is a quoting aid, not proof of completed projects or local branches.
export const KAWKAB_AL_AIN_AREAS = Object.freeze([
  {slug:'al-jimi',ar:'الجيمي',en:'Al Jimi'},
  {slug:'sanaiya',ar:'الصناعية',en:'Sanaiya'},
  {slug:'al-towayya',ar:'الطوية',en:'Al Towayya'},
  {slug:'al-foah',ar:'الفوعة',en:'Al Foah'},
  {slug:'al-markhaniya',ar:'المرخانية',en:'Al Markhaniya'},
  {slug:'al-maqam',ar:'المقام',en:'Al Maqam'},
  {slug:'al-muwaiji',ar:'المويجعي',en:'Al Muwaiji'},
  {slug:'al-hili',ar:'الهيلي',en:'Al Hili'},
  {slug:'al-yahar',ar:'اليحر',en:'Al Yahar'},
  {slug:'remah',ar:'رماح',en:'Remah'},
  {slug:'sweihan',ar:'سويحان',en:'Sweihan'},
  {slug:'falaj-hazza',ar:'فلج هزاع',en:'Falaj Hazza'},
  {slug:'mazid',ar:'مزيد',en:'Mazid'},
  {slug:'mazid-company-camp',ar:'مزيد - معسكر الشركات',en:'Mazyad Company Camp'},
  {slug:'nahil',ar:'ناهل',en:'Nahil'}
]);
// Use the actual published profile cover and avatar; do not substitute an AI-generated office or logo.
export const KAWKAB_HERO = Object.freeze({
  id:'profile-cover',url:'/images/providers/provider-3000485/kawkab-al-saeed-hero-cover.webp',
  mobile_url:'/images/providers/provider-3000485/kawkab-al-saeed-hero-cover-mobile.webp',width:1920,height:640,
  alt_ar:'صورة الغلاف الأصلية لكوكب الصعيد للخدمات الفنية',
  alt_en:'Original Kawkab Al Saeed Technical Services profile cover',
  image_title_ar:'كوكب الصعيد للخدمات الفنية',image_title_en:'Kawkab Al Saeed Technical Services',
  caption_ar:'الصورة المعتمدة في ملف الشركة',caption_en:'The image currently registered in the company profile'
});
export const KAWKAB_LOGO = Object.freeze({
  id:'profile-logo',url:'/images/providers/provider-3000485/kawkab-al-saeed-brand-logo.webp',
  width:512,height:512,
  alt_ar:'شعار كوكب الصعيد للخدمات الفنية المسجل في الملف',
  alt_en:'Kawkab Al Saeed registered company profile logo',
  image_title_ar:'شعار كوكب الصعيد',image_title_en:'Kawkab Al Saeed logo',
  caption_ar:'الهوية الموجودة في ملف الشركة',caption_en:'Branding currently registered in the provider profile'
});
// The previous generated office and invented logo assets remain archived, not public-facing.
export const KAWKAB_BRAND_GALLERY = Object.freeze([]);
export const KAWKAB_IMAGES = media.assets.map(item => ({ ...item }));
export const KAWKAB_SERVICE_MEDIA = Object.freeze({
  painting:'service-07', plaster:'service-02', wallpaper:'service-08',
  plumbing:null, carpentry:'service-04', hvac:null,
});
// If no authentic specialty image is available, use the identifiable company cover rather than falsely illustrating a different trade.
export const kawkabServiceImage = (id) => KAWKAB_IMAGES.find(image=>image.id===KAWKAB_SERVICE_MEDIA[id]) || KAWKAB_HERO;
export function kawkabServicePath(locale='ar', id='painting') {
  if (!KAWKAB_SPECIALTIES.some(item=>item.id===id)) return null;
  return `${locale==='en'?'/en':''}/providers/${KAWKAB_SLUG}/services/${id}`;
}
export function kawkabAreaServicePath(locale='ar', district='al-hili', service='painting') {
  if (!KAWKAB_AL_AIN_AREAS.some(area => area.slug === district) || !KAWKAB_SPECIALTIES.some(item => item.id === service)) return null;
  return `${locale==='en'?'/en':''}/uae/abu-dhabi/al-ain/${district}/general-maintenance/${service}`;
}
export function kawkabAreaPath(locale='ar',slug='al-jimi') {
  return `${locale==='en'?'/en':''}/uae/abu-dhabi/al-ain/${slug}`;
}
// The first three views depict one coherent living/dining composition.
// Keep the separate kitchen image in service-cover inventory, not as a second project.
export const KAWKAB_GALLERY = KAWKAB_IMAGES.filter(image => ['project-01','project-02','project-03'].includes(image.id));
export const KAWKAB_DETAILS = KAWKAB_IMAGES.filter(image => image.category === 'service' || image.id === 'project-04');

export const KAWKAB_PROJECT = Object.freeze({
  slug:'living-dining-interior',
  name_ar:'تصميم داخلي لصالة معيشة وطعام',
  name_en:'Living and Dining Interior Design',
  description_ar:'تصميم مترابط لصالة معيشة ومنطقة طعام، يجمع بين جدار تلفزيون بكسوة رخامية، خزائن وألواح خشبية، وإضاءة معلقة ومخفية. الصور الثلاث توثق زوايا مختلفة لنفس التكوين التصميمي.',
  description_en:'A coordinated living and dining interior with a marble-effect TV wall, wood cabinetry and panels, pendant lighting and discreet ambient illumination. Three images show different angles of the same design composition.',
  images:KAWKAB_GALLERY,
});
export function kawkabProjectPath(locale='ar'){
  return `${locale==='en'?'/en':''}/providers/${KAWKAB_SLUG}/projects/${KAWKAB_PROJECT.slug}`;
}
// One source image per visual cover. Covers route to an existing specialty if
// its subject matches, otherwise to the company enquiry rather than invent a trade.
const COVER_SERVICES = {
  'project-04':'carpentry',
  'service-01':'painting',
  'service-02':'plaster',
  'service-03':'painting',
  'service-04':'carpentry',
  'service-05':null,
  'service-06':'painting',
  'service-07':'painting',
  'service-08':'painting',
};
export const KAWKAB_SERVICE_COVERS = KAWKAB_DETAILS.map(image => ({
  ...image, serviceId:COVER_SERVICES[image.id] || null,
}));

export function kawkabPath(locale='ar', section='home') {
  if (!KAWKAB_SECTIONS.includes(section)) return null;
  return `${locale === 'en' ? '/en' : ''}/providers/${KAWKAB_SLUG}${section==='home'?'':'/'+section}`;
}
export function kawkabWhatsapp(locale='ar', service='') {
  const message = locale==='en'
    ? `Hello, I found Kawkab Al Saeed Technical Services (${KAWKAB_PROVIDER_CODE}) on Biet Al Reef. I'd like a quote${service ? ' for '+service : ''}. Location and scope: `
    : `مرحبًا كوكب الصعيد للخدمات الفنية (${KAWKAB_PROVIDER_CODE})، وصلت إليكم عبر بيت الريف وأرغب في عرض سعر${service?' لخدمة '+service:''}. الموقع والتفاصيل: `;
  return 'https://wa.me/971556485364?text='+encodeURIComponent(message);
}
export function getKawkabPageProps(locale, section='home') {
  if(!KAWKAB_SECTIONS.includes(section)) return {notFound:true};
  return {props:{locale:locale==='en'?'en':'ar',section}};
}
