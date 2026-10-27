import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight, Layers3, ListFilter } from 'lucide-react';
import { getSectionCardHref } from '../lib/sectionCardRoutes';

/** The mobile directory uses the exact same live taxonomy and routes as the UAE directory cards. */
export default function ProvidersSectorList({ cards = [], locale = 'ar' }) {
  const english = locale === 'en';
  const sectors = cards
    .filter((card) => card.sectionKey === 'providers')
    .sort((left, right) => left.displayOrder - right.displayOrder);
  const Arrow = english ? ChevronRight : ChevronLeft;

  if (!sectors.length) return null;

  return (
    <details className="group overflow-hidden rounded-2xl border border-[#E4D8BF] bg-white shadow-[0_2px_12px_rgba(18,42,73,.05)]">
      <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 marker:content-none">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F0DC] text-[#92702D]"><ListFilter size={19} aria-hidden="true" /></span>
        <span className="min-w-0 flex-1">
          <strong className="block text-sm font-black text-[#122A49]">{english ? 'Browse businesses by sector' : 'تصفح الشركات حسب القطاع'}</strong>
          <span className="block text-[11px] font-semibold text-slate-500">{english ? `${sectors.length} active sectors · specializations` : `${sectors.length} قطاعات · تخصصات مرتبطة بالدليل`}</span>
        </span>
        <ChevronDown aria-hidden="true" size={19} className="shrink-0 text-[#92702D] transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-px border-t border-[#EEE5D4] bg-[#EEE9E0] sm:grid-cols-2">
        {sectors.map((sector) => (
          <Link
            key={sector.id}
            href={getSectionCardHref(sector, 'providers', locale)}
            className="flex min-h-12 min-w-0 items-center gap-2 bg-white px-3 py-2.5 transition hover:bg-[#FFF9EC]"
          >
            <Layers3 size={15} className="shrink-0 text-[#B08B42]" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-extrabold text-[#122A49]">{sector.title}</span>
              <span className="block text-[10px] font-medium text-slate-500">
                {english ? `${sector.activity.specialtyCount} specialties` : `${sector.activity.specialtyCount} تخصصات`}
              </span>
            </span>
            <Arrow size={16} className="shrink-0 text-[#9A7229]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </details>
  );
}
