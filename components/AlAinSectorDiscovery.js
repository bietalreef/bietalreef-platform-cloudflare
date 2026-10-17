import Link from 'next/link';
import { MapPin, ArrowUpLeft, ClipboardList, Calculator } from 'lucide-react';
import { CONTENT } from '../data/alAinContent';
import { localPath } from '../lib/localServices';

export default function AlAinSectorDiscovery({ category, locale = 'ar' }) {
  if (!Object.hasOwn(CONTENT, category)) return null;
  const content = CONTENT[category];
  const en = locale === 'en';
  return <section dir={en ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-8 md:py-12" aria-label={en ? 'Al Ain service guide' : 'دليل الخدمة في العين'}>
    <div className="rounded-3xl border border-[#D6E6E7] bg-[#EBF5F8] p-5 sm:p-8">
      <p className="flex items-center gap-2 font-bold text-[#0F3F1A]"><MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />{en ? 'Start with Al Ain' : 'ابدأ من العين'}</p>
      <h2 className="mt-3 text-2xl font-black leading-relaxed text-[#0F3F1A]">{content.name[locale]} {en ? 'in Al Ain' : 'في العين'}</h2>
      <p className="mt-3 max-w-3xl leading-8 text-[#354D45]">{content.intro[locale]}</p>
      <Link href={localPath({ locale, category })} className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-xl bg-[#0F3F1A] px-5 py-3 text-center font-bold text-white">{en ? 'Open the Al Ain guide' : 'افتح دليل العين'}<ArrowUpLeft className="h-5 w-5 shrink-0" aria-hidden="true" /></Link>
    </div>
    <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-2">
      <section className="min-w-0 rounded-3xl border border-[#E6DCC8] bg-white p-5 sm:p-7"><h2 className="flex items-center gap-3 text-xl font-bold text-[#0F3F1A]"><ClipboardList className="h-6 w-6 shrink-0" aria-hidden="true" />{en ? 'Prepare the work details' : 'جهز تفاصيل العمل'}</h2><ul className="mt-5 list-inside list-disc space-y-3 leading-7">{content.checklist[locale].map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="min-w-0 rounded-3xl border border-[#E6DCC8] bg-white p-5 sm:p-7"><h2 className="flex items-center gap-3 text-xl font-bold text-[#0F3F1A]"><Calculator className="h-6 w-6 shrink-0" aria-hidden="true" />{en ? 'Compare clear quotations' : 'قارن عروض أسعار واضحة'}</h2><p className="mt-5 leading-8">{content.pricing[locale]}</p></section>
    </div>
  </section>;
}
