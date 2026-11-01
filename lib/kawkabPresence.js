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
export const KAWKAB_SECTIONS = ['home', 'services', 'service-areas', 'gallery'];

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

export const KAWKAB_IMAGES = media.assets.map(item => ({ ...item }));
export const KAWKAB_GALLERY = KAWKAB_IMAGES.filter(image => image.category === 'project');
export const KAWKAB_DETAILS = KAWKAB_IMAGES.filter(image => image.category === 'service');

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
