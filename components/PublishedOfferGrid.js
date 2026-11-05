import DiscoveryEntityCard from './cards/DiscoveryEntityCard';
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
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><DiscoveryEntityCard key={item.id} item={item} locale={locale} type="offer"/>)}</div>
    </div>
  </section>;
}
