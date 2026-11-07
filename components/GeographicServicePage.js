import Link from 'next/link';
import {MapPin, Phone, MessageCircle} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import {UAE_MAIN_SECTORS} from '../data/directoryDiscovery';
import {cleaningContent} from '../lib/cleaningLandingContent';

export default function GeographicServicePage({item}) {
  const en = item.locale === 'en';
  const sector = UAE_MAIN_SECTORS.find(row => row.slug === item.sector) || UAE_MAIN_SECTORS.find(row => row.slug === 'aluminium-glass' && item.sector === 'aluminium-wood-glass') || UAE_MAIN_SECTORS.find(row => row.slug === 'equipment-rental' && item.sector === 'factories-suppliers');
  const prefix = en ? '/en' : '';
  const place = item.placeName || (item.city ? (en ? 'Al Ain' : 'العين') : (en ? 'Abu Dhabi' : 'أبوظبي'));
  const sectorName = sector?.name?.[item.locale] || (en ? 'Services' : 'الخدمات');
  const placePath = `${prefix}/uae/abu-dhabi${item.city ? '/al-ain' : ''}${item.area ? `/${item.area}` : ''}`;
  const sectorPath = `${placePath}/${item.sector}`;
  const title = en ? `${item.name} in ${place} | ${item.providerName} | Biet Alreef` : `${item.name} في ${place} | ${item.providerName} | بيت الريف`;
  const description = (en ? `${item.name} in ${place} from ${item.providerName}. ${item.description}` : `${item.name} في ${place} من ${item.providerName}. ${item.description}`).slice(0, 165);
  const guide = item.sector === 'cleaning-services' ? cleaningContent(item.serviceSlug, item.locale) : null;
  const crumbs = [
    {name:en?'UAE directory':'دليل الإمارات',href:`${prefix}/uae`},
    {name:en?'Abu Dhabi':'أبوظبي',href:`${prefix}/uae/abu-dhabi`},
    ...(item.city ? [{name:place,href:placePath}] : []),
    {name:sectorName,href:sectorPath},
    {name:item.name,href:`${sectorPath}/${item.serviceSlug}`},
    {name:item.providerName,href:item.href},
  ];
  const img = item.image?.startsWith('/') ? `https://bietalreef.ae${item.image}` : item.image;
  const schema = {'@context':'https://schema.org','@type':'Service',name:item.name,description:item.description,areaServed:{'@type':'AdministrativeArea',name:place},provider:{'@type':'LocalBusiness',name:item.providerName,url:`https://bietalreef.ae${item.providerHref}`}};
  return <>
    <SEOHead title={title} description={description} canonicalPath={item.href} ogImage={img || undefined} structuredData={schema} breadcrumbs={crumbs}/>
    <div dir={en?'ltr':'rtl'} lang={item.locale} className="min-h-screen bg-[#f7f9fc] text-[#193b53]">
      <Navbar locale={item.locale}/>
      <main className="mx-auto max-w-6xl px-4 py-5 md:py-10">
        <nav className="mb-5 flex flex-wrap gap-2 text-xs text-slate-600" aria-label={en?'Breadcrumbs':'مسار التصفح'}>{crumbs.slice(0,-1).map((crumb,i)=><span key={`${crumb.href}-${i}`}><Link href={crumb.href} className="underline-offset-4 hover:underline">{crumb.name}</Link><span aria-hidden="true"> / </span></span>)}<span aria-current="page">{item.providerName}</span></nav>
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          {item.image ? <picture className="block min-h-48 bg-slate-50 md:min-h-80">{item.imageMobile&&<source media="(max-width:700px)" srcSet={item.imageMobile}/>}<img src={item.image} alt={item.name} className="h-full max-h-[420px] w-full object-cover"/></picture> : <div className="flex min-h-48 items-center justify-center bg-slate-50 text-slate-400"><MapPin size={42}/></div>}
          <div className="flex flex-col items-start gap-3 p-5 md:p-8"><p className="text-sm font-bold text-[#185b87]">{sectorName} · {place}</p><h1 className="text-2xl font-black leading-snug md:text-4xl">{item.name} {en?'in':'في'} {place}</h1><Link href={item.providerHref} className="text-sm font-bold text-[#185b87] underline">{item.providerName}</Link><p className="text-sm leading-7 text-slate-600 md:text-base">{item.description}</p>{item.imageIllustrative&&<small className="text-slate-500">{en?'Illustrative image':'صورة توضيحية'}</small>}
            <div className="mt-auto flex flex-wrap gap-2">{item.providerPhone&&<a className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#185b87] px-4 text-sm font-bold text-white" href={`tel:${item.providerPhone.replace(/[^0-9+]/g,'')}`}><Phone size={16}/>{en?'Call':'اتصل الآن'}</a>}{item.providerWhatsapp&&<a className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#a8c8dd] px-4 text-sm font-bold text-[#185b87]" href={item.providerWhatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>{en?'WhatsApp':'واتساب'}</a>}</div>
          </div>
        </div>
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 md:p-8"><h2 className="text-xl font-bold">{en?'About this service':'عن الخدمة'}</h2><p className="mt-3 leading-8 text-slate-700">{guide?.intro || item.description}</p>{guide?.scope?.length>0&&<><h2 className="mt-6 text-xl font-bold">{en?'Discuss the scope':'نطاق العمل'}</h2><ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">{guide.scope.map(line=><li key={line}>{line}</li>)}</ul></>}
          <h2 className="mt-6 text-xl font-bold">{en?'Prepare your request':'جهّز طلب عرض السعر'}</h2><p className="mt-3 leading-8 text-slate-700">{en?'Share your location, photos, approximate dimensions and preferred date. Confirm the scope, timing and quotation with the company.':'أرسل موقعك وصور العمل والمقاسات التقريبية والموعد المناسب، واتفق مع الشركة على نطاق الخدمة والسعر قبل التنفيذ.'}</p>
        </section>
      </main><Footer locale={item.locale} showRequestCTA={false}/>
    </div>
  </>;
}
