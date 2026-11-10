import MainSectorCards from './MainSectorCards';

// One directory-card renderer for the eight public sectors.
// Discard the unused legacy parallel 18-card display and its unverified badges,
// artificial service counts and obsolete query-string links.
export default function UaeDirectorySectorCards({emirate,area=null,locale='ar'}) {
  const en=locale==='en';
  const place=area?(en?area.nameEn:area.nameAr):(en?emirate.nameEn:emirate.nameAr);
  const root=(en?'/en':'')+'/uae/'+emirate.slug+(area?'/'+area.slug:'');
  const locationMode=emirate.slug==='abu-dhabi'&&area?.slug==='al-ain'?'al-ain':'emirate-area';
  return <section id="uae-sector-cards" dir={en?'ltr':'rtl'} className="mx-auto max-w-6xl px-3 py-8 sm:px-4 md:py-10" aria-labelledby="uae-sector-cards-title">
    <h2 id="uae-sector-cards-title" className="mb-2 text-xl font-extrabold leading-8 text-[#193b53] sm:text-2xl">
      {en?'Explore services in '+place:'استكشف الخدمات في '+place}
    </h2>
    <p className="mb-5 max-w-3xl text-sm leading-7 text-slate-600">
      {en?'Open a specialty to read its scope and request a quotation. Listed providers and their availability are shown only when published.':'افتح التخصص لتعرف نطاق الأعمال والخدمات وطريقة طلب عرض السعر. تظهر الشركات المنشورة وفق بياناتها الفعلية فقط.'}
    </p>
    <MainSectorCards sectionKey="providers" locale={locale} locationRoot={root} locationMode={locationMode}/>
  </section>;
}
