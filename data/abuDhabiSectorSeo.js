// Search snippets describe each real sector and its local customer intent.
export const ABU_DHABI_SECTOR_SEO = {
  'general-contracting': { ar: ['شركات المقاولات والبناء في أبوظبي', 'قارن خدمات المقاولات العامة وبناء الفلل والمباني والترميم في أبوظبي، واستعرض خدمات الشركات المنشورة واطلب عرض سعر يناسب مشروعك.'], en: ['Construction and contracting companies in Abu Dhabi', 'Explore published construction, villa building and renovation services in Abu Dhabi, compare providers and request a project quotation.'] },
  'interior-design': { ar: ['الاستشارات الهندسية والتصميم والديكور في أبوظبي', 'اكتشف خدمات الاستشارات الهندسية والتصميم الداخلي والخارجي والديكور في أبوظبي، وتواصل مع الشركات المنشورة لمناقشة مشروعك.'], en: ['Engineering consultancy and interior design in Abu Dhabi', 'Discover engineering consultancy, interior and exterior design services in Abu Dhabi and contact published providers about your project.'] },
  'general-maintenance': { ar: ['شركات الصيانة والتشطيبات في أبوظبي', 'استعرض خدمات صيانة المنازل والتكييف والكهرباء والسباكة والدهانات والتشطيبات في أبوظبي، وقارن أعمال الشركات المنشورة.'], en: ['Maintenance and finishing services in Abu Dhabi', 'Browse published home maintenance, air conditioning, electrical, plumbing, painting and finishing services in Abu Dhabi.'] },
  'building-materials': { ar: ['مواد البناء والتوريد في أبوظبي', 'ابحث عن خدمات توريد مواد البناء واحتياجات المشاريع في أبوظبي، وقارن المواصفات والكميات واطلب عرضًا من الجهات المنشورة.'], en: ['Building materials and suppliers in Abu Dhabi', 'Find building materials and project supplies in Abu Dhabi, compare specifications and quantities, and request a quotation.'] },
  'aluminium-glass': { ar: ['ورش الحديد والألمنيوم والزجاج والأخشاب في أبوظبي', 'اكتشف خدمات تصنيع وتركيب الحديد والألمنيوم والزجاج والأعمال الخشبية في أبوظبي، واطلب عرضًا بحسب المقاسات والمواصفات.'], en: ['Metal, aluminium, glass and wood workshops in Abu Dhabi', 'Explore metalwork, aluminium, glazing and wood fabrication services in Abu Dhabi and discuss your measurements and specifications.'] },
  'furniture-decor': { ar: ['الأثاث والمفروشات والتجهيز في أبوظبي', 'استعرض خدمات الأثاث والمفروشات وتجهيز المساحات في أبوظبي، وتعرّف على الأعمال المنشورة واطلب عرضًا يناسب احتياجك.'], en: ['Furniture, furnishings and fit-out in Abu Dhabi', 'Explore furniture, furnishings and interior fit-out services in Abu Dhabi, view published work and request a quotation.'] },
  'equipment-rental': { ar: ['المصانع ومعدات الإيجار في أبوظبي', 'اكتشف خدمات المصانع وتأجير معدات المشاريع في أبوظبي، وقارن مواصفات المعدات والمدة وشروط التوريد قبل طلب العرض.'], en: ['Factories and equipment rental in Abu Dhabi', 'Discover factory services and project equipment rental in Abu Dhabi, and compare specifications, duration and supply terms.'] },
  'cleaning-services': { ar: ['شركات تنظيف وتعقيم ومكافحة حشرات في أبوظبي', 'اكتشف شركات تنظيف المنازل والفلل والكنب والسجاد وخدمات التعقيم ومكافحة الحشرات في أبوظبي. استعرض الشركات المنشورة، وقارن الخدمات والعروض المتاحة واطلب عرض سعر يناسب احتياجاتك.'], en: ['Cleaning companies and services in Abu Dhabi', 'Explore published home, villa, sofa, carpet and majlis cleaning services in Abu Dhabi, along with disinfection and pest control.'] },
};

// Titles and descriptions are localized from the eight reviewed sector texts.
export function directorySectorSeo(slug, locale, emirate) {
  const entry = ABU_DHABI_SECTOR_SEO[slug]?.[locale];
  if (!entry || !emirate) return null;
  const from = locale === 'en' ? 'Abu Dhabi' : 'أبوظبي';
  const place = locale === 'en' ? emirate.nameEn : emirate.nameAr;
  const [heading, description] = entry.map(value => value.replaceAll(from, place));
  const title = slug === 'cleaning-services' && locale === 'ar'
    ? `شركات تنظيف في ${place} | تنظيف منازل وفلل وتعقيم – بيت الريف`
    : `${heading} | ${locale === 'en' ? 'Biet Al Reef' : 'بيت الريف'}`;
  return { heading, description, title };
}
