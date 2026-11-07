import DiscoveryEntityCard from './cards/DiscoveryEntityCard';
import DirectoryCustomerSupportCard from './DirectoryCustomerSupportCard';

export default function GeographicServiceCards({items, locale = 'ar', place = '', id = 'published-services'}) {
  const en = locale === 'en';
  return <section id={id} className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12" aria-labelledby={`${id}-title`}>
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <div><p className="mb-1 text-xs font-bold text-[#557183]">{en ? 'SERVICES FROM PUBLISHED COMPANIES' : 'خدمات الشركات المنشورة'}</p>
        <h2 id={`${id}-title`} className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en ? `Services in ${place}` : `الخدمات في ${place}`}</h2></div>
      <p className="text-sm text-slate-600">{en ? 'Confirm the exact scope and appointment with the company.' : 'تأكد مع الشركة من نطاق الخدمة والموعد.'}</p>
    </div>
    {items === null ? <p role="status" className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">{en ? 'Services are temporarily unavailable. Please try again.' : 'تعذر تحميل الخدمات مؤقتًا. حاول مرة أخرى.'}</p> :
      items.length ? <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{items.map(item => <DiscoveryEntityCard key={item.id} item={item} locale={locale} type="service"/>)}</div> :
      <DirectoryCustomerSupportCard locale={locale}/>}
  </section>;
}
