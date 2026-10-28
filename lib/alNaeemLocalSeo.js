// Keep company placements aligned with actual geography and existing directory URLs.
// Kalba and Khorfakkan are cities in Sharjah; Fujairah City is in Fujairah.
export function alNaeemCoverageFor(emirateSlug, areaSlug = null) {
  if (emirateSlug === 'sharjah' && (areaSlug === 'kalba' || areaSlug === 'khorfakkan')) return areaSlug;
  if (emirateSlug === 'fujairah' && areaSlug && areaSlug !== 'fujairah-city') return null;
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
