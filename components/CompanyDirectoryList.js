import {useMemo, useState} from 'react';
import {Search} from 'lucide-react';
import {ProviderCard} from './cards/SmartEntityCard';
import DirectoryCustomerSupportCard from './DirectoryCustomerSupportCard';

// Search only facts already present in the published company cards.
const normalize = value => String(value || '').toLowerCase().normalize('NFKD')
  .replace(/[\u064b-\u065f\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي');

export default function CompanyDirectoryList({companies = [], locale = 'ar'}) {
  const [query, setQuery] = useState('');
  const en = locale === 'en';
  const found = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return companies;
    return companies.filter(company => normalize([
      company.name, company.summary, company.providerCode, company.city, company.area,
      company.providerType, ...(company.specialties || []),
      ...(company.serviceLinks || []).map(service => service.name),
    ].filter(Boolean).join(' ')).includes(term));
  }, [companies, query]);
  return <section id="published-companies" className="mx-auto max-w-6xl scroll-mt-40 px-3 py-5 md:px-4 md:py-12" aria-labelledby="published-companies-title">
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div><h2 id="published-companies-title" className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en?'Published businesses':'الشركات المنشورة'}</h2><p className="mt-1 text-sm leading-7 text-slate-600">{en?'Discover their services and contact the right provider.':'تعرّف على خدمات كل شركة وتواصل مع الجهة المناسبة.'}</p></div>
      <span className="rounded-full bg-[#eff6fb] px-3 py-1.5 text-xs font-bold text-[#185b87]" role="status">{en?`${found.length} businesses`:`${found.length} شركة`}</span>
    </div>
    <label className="mb-4 flex min-h-12 items-center gap-3 rounded-xl border border-[#d7e3ec] bg-white px-4 text-[#527087] focus-within:border-[#185b87]">
      <Search size={19} aria-hidden="true"/><span className="sr-only">{en?'Search businesses':'ابحث عن شركة'}</span>
      <input type="search" value={query} onChange={event=>setQuery(event.target.value)} className="w-full bg-transparent py-3 text-sm text-[#193b53] outline-none" placeholder={en?'Search by company, service or area':'ابحث باسم الشركة أو الخدمة أو المنطقة'}/>
    </label>
    {found.length?<div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">{found.map(company=><ProviderCard key={company.id} item={company} locale={locale} showReading/>)}</div>:query?<p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">{en?'No matching published businesses. Try another name, service or area.':'لا توجد شركات منشورة تطابق البحث. جرّب اسمًا أو خدمة أو منطقة أخرى.'}</p>:<DirectoryCustomerSupportCard locale={locale}/>}
  </section>;
}
