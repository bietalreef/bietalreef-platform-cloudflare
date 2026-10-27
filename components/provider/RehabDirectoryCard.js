import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, MapPin, Phone } from 'lucide-react';
import { presencePath } from '../../lib/rehabPresence';

const nameFor = (row, locale, key = 'name') => row?.[`${key}_${locale}`] || row?.[`${key}_ar`] || '';

export default function RehabDirectoryCard({ data, locale = 'ar' }) {
  if (!data?.profile || !data?.services?.length) return null;
  const ar = locale === 'ar';
  const profile = data.profile;
  const title = nameFor(profile, locale);
  const intro = nameFor(profile, locale, 'short_description');
  const logo = data.media?.avatar || (/^https:\/\//i.test(profile.logo_url || '') ? profile.logo_url : null);
  const href = presencePath(locale);

  return (
    <article dir={ar ? 'rtl' : 'ltr'} className="overflow-hidden rounded-2xl border border-[#E3D7BD] bg-white shadow-[0_3px_18px_rgba(18,42,73,.06)] sm:rounded-[1.5rem] sm:border-[#D8C79E] sm:shadow-[0_16px_48px_rgba(18,42,73,.10)]">
      {data.media?.cover ? <Link href={href} className="block"><img src={data.media.cover} alt={ar ? 'الغلاف المعتمد لشركة الرحاب في التطبيق' : 'Al Rehab approved app cover'} width="1376" height="386" loading="lazy" className="aspect-[4/1] w-full object-cover object-center sm:aspect-auto" /></Link> : null}
      <div className="bg-white px-3 py-3 text-[#122A49] sm:bg-gradient-to-r sm:from-[#163958] sm:to-[#122A49] sm:px-7 sm:py-7 sm:text-white">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E9DFC9] bg-white p-0.5 sm:h-20 sm:w-20 sm:rounded-2xl sm:border-0 sm:p-2">
            {logo ? <img src={logo} alt={title} className="h-full w-full object-cover" loading="lazy" /> : <Building2 aria-hidden="true" className="h-9 w-9 text-[#B89149]" />}
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#997332] sm:text-xs sm:text-[#F4D698]"><BadgeCheck size={13} />{ar ? 'حضور موثق على المنصة' : 'Verified platform presence'}</span>
            <h3 className="mt-0.5 text-base font-black leading-snug sm:mt-1 sm:text-2xl"><Link href={href}>{title}</Link></h3>
            <p className="mt-0.5 text-[11px] text-slate-500 sm:mt-1 sm:text-xs sm:text-white/75" dir="ltr">BR-2000029</p>
          </div>
        </div>
        {intro ? <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600 sm:mt-5 sm:line-clamp-none sm:text-sm sm:leading-7 sm:text-white/85">{intro}</p> : null}
      </div>
      <div className="space-y-2 border-t border-[#F0E8DA] px-3 pb-3 pt-2 sm:space-y-5 sm:border-0 sm:p-7">
        <div>
          <p className="mb-1.5 text-xs font-bold text-[#122A49] sm:mb-3 sm:text-sm">{ar ? 'الخدمات المتاحة' : 'Available services'}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {data.services.slice(0, 4).map((service) => <Link key={service.id} href={presencePath(locale, { kind: 'services', slug: service.slug })} className="rounded-lg border border-[#E6D7B7] bg-[#FBF8F0] px-2 py-1.5 text-[11px] font-bold leading-4 text-[#674A1C] hover:bg-[#F5E8CD] sm:rounded-full sm:px-3 sm:py-2 sm:text-xs">{nameFor(service, locale)}</Link>)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm"><MapPin size={14} className="text-[#B89149]" /><span>{ar ? `مناطق خدمة معتمدة: ${data.areas.length}` : `Approved coverage areas: ${data.areas.length}`}</span></div>
        <div className="flex flex-wrap gap-2 sm:gap-2">
          <Link href={href} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#122A49] px-3 py-2 text-xs font-bold text-white hover:bg-[#1D416D] sm:min-h-11 sm:flex-none sm:gap-2 sm:px-5 sm:py-3 sm:text-sm">{ar ? 'عرض صفحات الرحاب' : 'Explore Al Rehab'} {ar ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>
          {profile.phone ? <a className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[#C7AB72] px-3 py-2 text-xs font-bold text-[#674A1C] sm:min-h-11 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm" href={`tel:${String(profile.phone).replace(/[^+\d]/g, '')}`}><Phone size={14} />{ar ? 'اتصال' : 'Call'}</a> : null}
        </div>
      </div>
    </article>
  );
}
