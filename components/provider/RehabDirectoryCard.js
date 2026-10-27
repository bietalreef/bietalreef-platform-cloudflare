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
  const logo = /^https:\/\//i.test(profile.logo_url || '') ? profile.logo_url : null;
  const href = presencePath(locale);

  return (
    <article dir={ar ? 'rtl' : 'ltr'} className="overflow-hidden rounded-[1.5rem] border border-[#D8C79E] bg-white shadow-[0_16px_48px_rgba(18,42,73,.10)]">
      <div className="bg-gradient-to-r from-[#163958] to-[#122A49] px-5 py-7 text-white sm:px-7">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
            {logo ? <img src={logo} alt={title} className="h-full w-full object-contain" loading="lazy" /> : <Building2 aria-hidden="true" className="h-9 w-9 text-[#B89149]" />}
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F4D698]"><BadgeCheck size={15} />{ar ? 'حضور موثق على المنصة' : 'Verified platform presence'}</span>
            <h3 className="mt-1 text-xl font-black leading-snug sm:text-2xl"><Link href={href}>{title}</Link></h3>
            <p className="mt-1 text-xs text-white/75" dir="ltr">BR-2000029</p>
          </div>
        </div>
        {intro ? <p className="mt-5 text-sm leading-7 text-white/85">{intro}</p> : null}
      </div>
      <div className="space-y-5 p-5 sm:p-7">
        <div>
          <p className="mb-3 text-sm font-bold text-[#122A49]">{ar ? 'الخدمات المتاحة' : 'Available services'}</p>
          <div className="flex flex-wrap gap-2">
            {data.services.slice(0, 4).map((service) => <Link key={service.id} href={presencePath(locale, { kind: 'services', slug: service.slug })} className="rounded-full border border-[#E6D7B7] bg-[#FBF8F0] px-3 py-2 text-xs font-bold text-[#674A1C] hover:bg-[#F5E8CD]">{nameFor(service, locale)}</Link>)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600"><MapPin size={16} className="text-[#B89149]" /><span>{ar ? `مناطق خدمة معتمدة: ${data.areas.length}` : `Approved coverage areas: ${data.areas.length}`}</span></div>
        <div className="flex flex-wrap gap-2">
          <Link href={href} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#122A49] px-5 py-3 text-sm font-bold text-white hover:bg-[#1D416D]">{ar ? 'عرض صفحات الرحاب' : 'Explore Al Rehab'} {ar ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</Link>
          {profile.phone ? <a className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#C7AB72] px-5 py-3 text-sm font-bold text-[#674A1C]" href={`tel:${String(profile.phone).replace(/[^+\d]/g, '')}`}><Phone size={15} />{ar ? 'اتصال' : 'Call'}</a> : null}
        </div>
      </div>
    </article>
  );
}
