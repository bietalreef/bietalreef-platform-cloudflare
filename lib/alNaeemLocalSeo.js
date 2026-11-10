import { getArea, getEmirate } from '../data/siteTaxonomy';
import { AL_NAEEM_SLUG, AL_NAEEM_EDITORIAL_DATA, alNaeemPath, resolveAlNaeemRoute } from './alNaeemPresence';
// Keep company placements aligned with actual geography and existing directory URLs.
// Kalba and Khorfakkan are cities in Sharjah; Fujairah City is in Fujairah.
export function alNaeemCoverageFor(emirateSlug, areaSlug = null) {
  if (emirateSlug === 'sharjah' && (areaSlug === 'kalba' || areaSlug === 'khorfakkan')) return areaSlug;
  // Emirate-level enquiry coverage includes approved Fujairah districts; verify each appointment.
  if (emirateSlug === 'abu-dhabi') return areaSlug === 'al-ain' ? 'al-ain' : null;
  if (emirateSlug === 'fujairah') return 'fujairah';
  return emirateSlug;
}

export const AL_NAEEM_EAST_COAST_DETAILS = {
  fujairah: {
    ar: {
      title: 'تنظيف الفلل والمنازل والواجهات في الفجيرة',
      intro: 'عند طلب تنظيف في الفجيرة، أرسل موقع العقار ومساحته وعدد الغرف أو تفاصيل الخزان والمفروشات. يساعد تحديد العمل المطلوب في مقارنة عروض الأسعار واختيار موعد مناسب.',
      quote: 'اذكر الحي في الفجيرة، ونوع العقار، وصور الأجزاء المطلوب تنظيفها، واسأل عن نطاق التنفيذ وتكلفة الانتقال قبل الحجز.',
    },
    en: {
      title: 'Home, villa and exterior cleaning in Fujairah',
      intro: 'For a cleaning enquiry in Fujairah, share the property location, size and room count, or details of the water tank and furnishings. A clear scope helps you compare quotes and confirm scheduling.',
      quote: 'Share your Fujairah neighbourhood, property type and photos, and confirm the work scope and any travel charges before booking.',
    },
  },
  kalba: {
    ar: {
      title: 'خدمات تنظيف المنازل والخزانات والأحواش في كلباء',
      intro: 'في كلباء، حدّد إن كان المطلوب تنظيفًا داخليًا للفيلا، أو تنظيف الخزان، أو الأسطح الخارجية والأحواش. تختلف التجهيزات حسب نوع الأرضية ومدى اتساخها وإمكانية الوصول.',
      quote: 'شارك موقع العقار في كلباء، والمساحة، وصور الخزان أو الأحواش أو الواجهة، واطلب تحديد الأعمال المشمولة كتابيًا.',
    },
    en: {
      title: 'Home, tank and courtyard cleaning in Kalba',
      intro: 'In Kalba, distinguish between interior villa cleaning, tank cleaning and outdoor courtyards. Equipment and scope depend on surface material, condition and access.',
      quote: 'Share the Kalba location, measurements and photos of the tank, courtyard or facade, and request a written scope of work.',
    },
  },
  khorfakkan: {
    ar: {
      title: 'تنظيف الواجهات والفلل والمواقف في خورفكان',
      intro: 'في خورفكان، اذكر نوع الواجهة أو الموقف أو المنزل ومساحة العمل، خصوصًا عند وجود أملاح أو أتربة على الأسطح الخارجية. طريقة التنظيف المناسبة تُحدّد بعد مراجعة مادة السطح وإمكانية الوصول.',
      quote: 'أرسل موقع العقار في خورفكان وصور الواجهة أو موقف السيارات وعدد الأدوار أو المساحة، واطلب توضيح السلامة والتجهيزات اللازمة.',
    },
    en: {
      title: 'Facade, villa and parking-area cleaning in Khorfakkan',
      intro: 'In Khorfakkan, specify the facade material, parking-area size or property layout, especially where salt or dust affects outdoor surfaces. The suitable method depends on materials and safe access.',
      quote: 'Share the Khorfakkan location, photos and measurements, and confirm access and safety arrangements for facade or parking cleaning.',
    },
  },
};

/**
 * Resolve older contextual directory links to the same canonical provider
 * page used by the current card. Unknown and unsupported areas remain 404.
 */
export function alNaeemDirectoryRedirect(parts,locale='ar') {
  if(!Array.isArray(parts)||parts.at(-1)!==AL_NAEEM_SLUG)return null;
  const emirate=parts[0];
  let area=null;
  if(parts.length===3&&parts[1]==='cleaning-services') {
    area=null;
  } else if(parts.length===4&&parts[2]==='cleaning-services'&&
    (getArea(emirate,parts[1])||(emirate==='abu-dhabi'&&parts[1]==='al-ain'))) {
    area=parts[1];
  } else return null;
  const coverage=alNaeemCoverageFor(emirate,area);
  if(!coverage || !AL_NAEEM_EDITORIAL_DATA.coverageAreas.some(row=>row.slug===coverage))return null;
  return alNaeemPath(locale,{kind:'service-areas',slug:coverage});
}

// One contextual company/service route for all approved locations. The
// approved company source and service collection are reused, not cloned.
export function alNaeemContextBase(emirateSlug, areaSlug = null) {
  const emirate = getEmirate(emirateSlug);
  const area = areaSlug ? getArea(emirateSlug, areaSlug) : null;
  if (!emirate || (areaSlug && !area && !(emirateSlug === 'abu-dhabi' && areaSlug === 'al-ain'))) return null;
  const coverage = alNaeemCoverageFor(emirateSlug, areaSlug);
  if (!coverage || !AL_NAEEM_EDITORIAL_DATA.coverageAreas.some(item => item.slug === coverage)) return null;
  return '/uae/' + emirateSlug + (areaSlug ? '/' + areaSlug : '') + '/cleaning-services';
}

export function alNaeemContextPath(locale = 'ar', emirateSlug, areaSlug = null, kind = 'home', slug = null) {
  const contextBase = alNaeemContextBase(emirateSlug, areaSlug);
  if (!contextBase) return null;
  return alNaeemPath(locale, {kind, slug, contextBase});
}

export function getAlNaeemDirectoryContextProps(parts, locale = 'ar') {
  if (!Array.isArray(parts) || !parts.includes(AL_NAEEM_SLUG)) return null;
  const emirateSlug = parts[0];
  const companyIndex = parts[1] === 'cleaning-services' && parts[2] === AL_NAEEM_SLUG ? 2
    : parts[2] === 'cleaning-services' && parts[3] === AL_NAEEM_SLUG ? 3 : -1;
  if (companyIndex < 0) return {notFound:true};
  const areaSlug = companyIndex === 3 ? parts[1] : null;
  const contextBase = alNaeemContextBase(emirateSlug, areaSlug);
  const route = resolveAlNaeemRoute(parts.slice(companyIndex + 1));
  if (!contextBase || !route) return {notFound:true};
  const data = AL_NAEEM_EDITORIAL_DATA;
  const collection = route.kind === 'services' ? data.services
    : route.kind === 'offers' ? data.offers
    : route.kind === 'service-areas' ? data.coverageAreas : null;
  if (route.slug && !collection?.some(item => item.slug === route.slug)) return {notFound:true};
  const emirate = getEmirate(emirateSlug);
  const area = areaSlug ? getArea(emirateSlug, areaSlug) : null;
  const placeAr = area?.nameAr || (areaSlug === 'al-ain' ? 'العين' : emirate.nameAr);
  const placeEn = area?.nameEn || (areaSlug === 'al-ain' ? 'Al Ain' : emirate.nameEn);
  return {
    props: {
      alNaeemContext:true,
      data,
      locale,
      route:{
        ...route,
        contextBase,
        contextAreaSlug:areaSlug,
        contextPlaceAr:areaSlug ? placeAr+'، '+emirate.nameAr : emirate.nameAr,
        contextPlaceEn:areaSlug ? placeEn+', '+emirate.nameEn : emirate.nameEn,
      },
    },
  };
}
