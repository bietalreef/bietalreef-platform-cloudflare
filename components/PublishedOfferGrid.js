import Link from 'next/link';
import { BadgePercent, ArrowUpLeft, ArrowUpRight } from 'lucide-react';

// A discoverability view only: the individual provider owns the offer and its terms.
// This grid never manufactures discounts or reads app/market-channel records.
export default function PublishedOfferGrid({ items = [], locale = 'ar' }) {
  if (!items.length) return null;
  const en = locale === 'en';
  const Arrow = en ? ArrowUpRight : ArrowUpLeft;
  return <section id="published-offers" dir={en?'ltr':'rtl'} className="border-y border-[#e6ddcf] bg-[#fcfaf6] py-8 sm:py-12">
    <div className="mx-auto max-w-6xl px-3 sm:px-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs font-semibold text-[#8d703c]">{en?'Published by verified companies':'عروض منشورة من شركات موثقة'}</p>
          <h2 className="mt-1 text-xl font-extrabold text-[#20354a] sm:text-3xl">{en?'Cleaning offers and discounts':'عروض وخصومات خدمات التنظيف'}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{en?'View the individual offer and confirm its scope and final quotation directly with the provider.':'افتح العرض المستقل وراجع نطاق الخدمة، ثم أكد الخصم وعرض السعر النهائي مباشرة مع الشركة.'}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(item=><article key={item.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e6dfd2] bg-white">
          <Link href={item.href} className="group relative block h-32 bg-[#ebe8df] sm:h-40" aria-label={item.name}>
            {item.image?<img src={item.image} alt={item.name} loading="lazy" width="420" height="210" className="h-full w-full object-cover" />:
              <div className="flex h-full items-center justify-center text-[#b29b71]"><BadgePercent size={38}/></div>}
            {item.discountPercent===10?<span className="absolute end-2 top-2 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-black text-[#20354a] shadow-sm">{en?'10% OFF':'خصم 10%'}</span>:null}
          </Link>
          <div className="flex flex-1 flex-col p-3 sm:p-4">
            <h3 className="text-sm font-extrabold leading-6 text-[#21374f] sm:text-base"><Link href={item.href}>{item.name}</Link></h3>
            <p className="mt-1 line-clamp-3 text-xs leading-6 text-slate-600">{item.description}</p>
            <Link className="mt-2 text-xs font-semibold text-[#786039]" href={item.providerHref}>{item.providerName}</Link>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-xs font-bold">
              <Link href={item.href} className="inline-flex items-center gap-1 rounded-lg bg-[#20354a] px-3 py-2.5 text-white">{en?'Offer details':'تفاصيل العرض'}<Arrow size={15}/></Link>
              {item.linkedServiceHref?<Link href={item.linkedServiceHref} className="text-[#806338] underline underline-offset-4">{en?'Service scope':'نطاق الخدمة'}</Link>:null}
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
