import Link from 'next/link';

// Navigation shared by every published company landing. No company name or logo
// is repeated above the approved cover/identity.
const labels = {
  ar: {home:'الرئيسية',services:'الخدمات',offers:'العروض','service-areas':'مناطق الخدمة',posts:'المنشورات'},
  en: {home:'Home',services:'Services',offers:'Offers','service-areas':'Service areas',posts:'Posts'},
};
const order = ['home','services','offers','service-areas','posts'];

export default function CompanyPageNav({locale='ar',homeHref,hrefs={},active='home'}) {
  const t=labels[locale]||labels.ar;
  if(!homeHref)return null;
  return <nav aria-label={locale==='en'?'Company sections':'أقسام ملف الشركة'} className="w-full border-b border-[#e7ddcc] bg-white">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 overflow-x-auto whitespace-nowrap px-3 py-1 text-xs font-bold text-[#193b53] sm:justify-start sm:gap-6 sm:px-5 sm:py-2 sm:text-sm">
      {order.map(key=><Link key={key} href={key==='posts'?homeHref+'#company-posts':hrefs[key]||homeHref} aria-current={active===key?'page':undefined} className={'shrink-0 border-b-2 px-0.5 py-2 transition-colors hover:text-[#185b87] '+(active===key?'border-[#193b53]':'border-transparent')}>{t[key]}</Link>)}
    </div>
  </nav>;
}
