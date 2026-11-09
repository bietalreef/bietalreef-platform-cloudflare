import {useState} from 'react';
import DirectoryCompanyCard from './provider/DirectoryCompanyCard';
import GeographicServiceCards from './GeographicServiceCards';
import SectorTaxonomyExplorer from './SectorTaxonomyExplorer';
import DirectorySectorQuoteForm from './DirectorySectorQuoteForm';
import DirectoryCustomerSupportCard from './DirectoryCustomerSupportCard';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import { CleaningReadMore } from './AlAinCleaningPage';
import { KAWKAB_SERVICE_DETAILS } from '../data/kawkabServiceDetails';
import KawkabMobileContactBar from './provider/KawkabMobileContactBar';
import KawkabServiceVisual from './provider/KawkabServiceVisual';
import {KAWKAB_AL_AIN_AREAS,kawkabAreaServicePath,kawkabAreaPath,KAWKAB_SPECIALTIES,KAWKAB_ORIGIN,KAWKAB_IMAGES,KAWKAB_SERVICE_MEDIA} from '../lib/kawkabPresence';

export default function AlAinMaintenanceAreaPage({model}) {
 const {locale,area,providers,service:selectedSlug}=model,en=locale==='en',name=en?area.en:area.ar,pre=en?'/en':'';
 const [requestedService,setRequestedService]=useState('');
 const servicePlace=en?name+', Al Ain':name+'، العين';
 const selectedService=selectedSlug?KAWKAB_SPECIALTIES.find(item=>item.id===selectedSlug):null;
 const technical=selectedSlug?KAWKAB_SERVICE_DETAILS[selectedSlug]?.[locale]:null;
 const basePath=`${pre}/uae/abu-dhabi/al-ain/${area.slug}/general-maintenance`,path=selectedService?`${basePath}/${selectedService.id}`:basePath;
 // Preserve the selected district and service in the page URL and canonical.
 const canon=KAWKAB_ORIGIN+path;
 const title=selectedService?(en?`${selectedService.en} in ${name}, Al Ain | Biet Al Reef`:`${selectedService.ar} في ${name} - العين | بيت الريف`):(en?`Verified maintenance and finishing services in ${name}, Al Ain | Biet Al Reef`:`شركات الصيانة والدهانات في ${name} - العين | بيت الريف`);
 const description=selectedService?(en?`${selectedService.enDesc} For work in ${name}, Al Ain, describe the site and confirm availability before agreeing a quote.`:`${selectedService.arDesc} لطلب العمل في ${name} بالعين، وضّح حالة الموقع وتأكد من توفر الخدمة قبل الاتفاق.`):(en?`Explore maintenance and finishing services for ${name}, Al Ain. Review the work scope and confirm a company's local availability before agreeing.`:`استكشف خدمات الصيانة والتشطيبات في ${name} بالعين، وراجع نطاق العمل وتأكد من توفر الشركة في موقعك قبل الاتفاق.`);
 const hasKawkab=providers.some(p=>p.id==='c93b1b94-4d2e-4736-b1de-37e5bc93afa2');
 const realImage=hasKawkab&&selectedService?KAWKAB_IMAGES.find(item=>item.id===KAWKAB_SERVICE_MEDIA[selectedService.id]):null;
 const heroImage=realImage?.url||'/images/guides/sector-library/general-maintenance/uae-home-general-maintenance.webp';
 const heroAlt=realImage?.['alt_'+locale]||(en?'Illustration of home maintenance work':'صورة توضيحية لأعمال الصيانة المنزلية');
 const kawkabProvider=providers.find(p=>p.id==='c93b1b94-4d2e-4736-b1de-37e5bc93afa2');
 const matchedSpecialties=KAWKAB_SPECIALTIES.filter(item=>kawkabProvider?.services?.some(s=>s.published&&(s.slug===item.id||s.pagePath?.endsWith('/services/'+item.id))));
  const schema={'@context':'https://schema.org','@type':'CollectionPage',name:title,url:canon,description,mainEntity:{'@type':'ItemList',itemListElement:providers.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name[locale],url:KAWKAB_ORIGIN+pre+'/providers/'+p.slug}))}};
 return <div dir={en?'ltr':'rtl'} lang={locale} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#28231e] sm:pb-0">
 <Head><title>{title}</title><meta name="description" content={description}/><meta name="robots" content={model.sectorTaxonomy?.length||technical?"index, follow":"noindex, follow"}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content={heroImage.startsWith('/')?KAWKAB_ORIGIN+heroImage:heroImage}/><meta property="og:image:alt" content={heroAlt}/><link rel="canonical" href={canon}/><link rel="alternate" hrefLang="ar-AE" href={KAWKAB_ORIGIN+`/uae/abu-dhabi/al-ain/${area.slug}/general-maintenance${selectedService?`/${selectedService.id}`:""}`}/><link rel="alternate" hrefLang="en-AE" href={KAWKAB_ORIGIN+`/en/uae/abu-dhabi/al-ain/${area.slug}/general-maintenance${selectedService?`/${selectedService.id}`:""}`}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></Head>
 <Navbar locale={locale}/>
 <main className="mx-auto max-w-6xl px-3 py-4 md:px-5 md:py-9">
 <nav className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#746b5e]"><Link href={pre+'/uae'}>{en?'UAE directory':'دليل الإمارات'}</Link><span>/</span><Link href={pre+'/uae/abu-dhabi/al-ain'}>{en?'Al Ain':'العين'}</Link><span>/</span><Link href={kawkabAreaPath(locale,area.slug)}>{name}</Link><span>/</span><Link href={basePath}>{en?'Maintenance':'الصيانة'}</Link>{selectedService&&<><span>/</span><span>{selectedService[locale]}</span></>}</nav>
 <section className="grid overflow-hidden rounded-2xl border border-[#e8dfd2] bg-white md:grid-cols-2"><div className="px-4 py-6 md:px-7 md:py-10">
 <span className="text-xs font-bold text-[#967646]">{en?'AL AIN · ABU DHABI':'العين · أبوظبي'}</span>
 <h1 className="mt-2 text-xl font-extrabold md:text-4xl">{title.split(' | ')[0]}</h1>
 <p className="mt-2 text-sm leading-6 md:hidden">{en?'Describe the work and confirm local availability.':'حدّد العمل وتأكد من توفر الخدمة في موقعك.'}</p>
 <p className="mt-4 hidden max-w-4xl text-base leading-8 text-[#665d50] md:block">{description} {en?'Confirm the exact scope, materials, district and timing with the chosen provider before agreeing.':'احرص على تحديد المساحة وحالة الموقع ونوع الخدمة والخامات والموعد، ثم اطلب من الشركة عرضًا يوضح نطاق العمل والتفاصيل قبل البدء.'}</p>
 <div className="mt-4 flex flex-wrap gap-2"><Link href={pre+'/providers'} className="rounded-xl border px-4 py-3 text-sm font-semibold">{en?'Companies directory':'دليل الشركات'}</Link><Link href={pre+'/uae/abu-dhabi/al-ain/general-maintenance'} className="rounded-xl bg-[#302b25] px-4 py-3 text-sm font-semibold text-white">{en?'All Al Ain maintenance':'صيانة العين'}</Link></div></div><figure className="relative min-h-48 bg-slate-100"><img src={heroImage} alt={heroAlt} width="1000" height="650" className="h-56 w-full object-cover md:absolute md:inset-0 md:h-full"/><figcaption className="absolute bottom-0 inset-x-0 bg-slate-900/70 px-3 py-2 text-xs text-white">{realImage?(en?'Photo supplied by Kawkab Al Saeed':'صورة مقدمة من كوكب الصعيد'):(en?'Illustrative image':'صورة توضيحية')}</figcaption></figure></section>
 {!selectedService&&<SectorTaxonomyExplorer sector="general-maintenance" items={model.sectorTaxonomy} locale={locale} place={servicePlace} pagePath={basePath} reviewedServiceGuides={model.reviewedServiceGuides} serviceGuides={model.sectorGuides} quotePlacement="external" onServiceRequest={setRequestedService}/>}
 {technical&&<section className="mt-6 rounded-xl border border-[#e9dfd1] bg-white p-4 md:p-6"><h2 className="text-lg font-bold md:text-2xl">{en?'Understand the work before requesting a quote':'افهم العمل قبل طلب عرض السعر'}</h2><div className="mt-3 text-sm leading-7 text-[#665d50]"><CleaningReadMore text={technical.summary} en={en}/></div><details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-[#806333]">{en?'What to check and send':'ما الذي تفحصه وتجهزه؟'}</summary><ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-7">{technical.steps.map(step=><li key={step}>{step}</li>)}</ul><p className="mt-3 text-sm leading-7">{technical.answer}</p></details><Link href={pre+'/request-quote'} className="mt-4 inline-flex rounded-lg border border-[#d8c8aa] px-4 py-2 text-sm font-bold">{en?'Prepare a quotation request':'جهّز طلب عرض سعر'}</Link></section>}
 {selectedService?<section id="companies" className="mt-6"><h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Companies serving Al Ain':'شركات تخدم مدينة العين'}</h2>
 {providers.length?<><p className="mb-3 text-sm leading-7 text-slate-600">{en?`Confirm availability in ${name} with the company before booking.`:`أكد توفر الخدمة في ${name} مع الشركة قبل الحجز.`}</p><div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">{providers.map(p=><DirectoryCompanyCard key={p.id} locale={locale} item={{href:`${path}/${p.slug}`,name:p.name[locale],logoImage:p.image,coverImage:p.cover,city:en?'Al Ain':'العين',summary:en?'Confirm availability for your location.':'تأكد من توفر الخدمة في موقعك.',verified:p.verified,phone:p.phone,whatsapp:p.whatsapp}}/>)}</div></>:<DirectoryCustomerSupportCard locale={locale}/>}</section>:<GeographicServiceCards id="companies" items={model.geographicCards ?? null} locale={locale} place={name}/>}
 {selectedService&&hasKawkab&&matchedSpecialties.length>0&&<section className="mt-7"><h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Published Kawkab Al Saeed services':'خدمات كوكب الصعيد المنشورة'}</h2><div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">{(selectedService?matchedSpecialties.filter(item=>item.id===selectedService.id):matchedSpecialties).map(service=><article key={service.id} className="overflow-hidden rounded-xl border bg-white"><Link href={kawkabAreaServicePath(locale,area.slug,service.id)}><KawkabServiceVisual serviceId={service.id} locale={locale}/><h3 className="px-3 py-2 text-sm font-bold">{service[locale]}</h3></Link><p className="hidden px-3 pb-3 text-sm leading-7 text-[#6b6052] md:block">{service[locale+'Desc']}</p></article>)}</div></section>}
 <section className="mt-6 hidden rounded-xl border bg-white p-6 md:block"><h2 className="text-lg font-bold">{en?'Plan a clear quotation':'جهّز طلب عرض سعر واضحًا'}</h2><p className="mt-3 leading-8 text-[#6b6052]">{en?`For work in ${name}, include your address, dimensions, pictures of existing finishes or equipment, desired materials and a suitable date. Compare the scope with providers before selecting a quote.`:`عند طلب الصيانة أو التشطيبات في ${name}، حدد عنوان العقار ومساحة العمل وصور الجدران أو الأجهزة والخامات المطلوبة والموعد المناسب. قارن نطاق التنفيذ والمواد ومدة العمل مع الشركة قبل اتخاذ القرار.`}</p></section>
 {hasKawkab&&<section className="mt-7 rounded-xl border border-[#e9dfd1] bg-white p-3 md:p-6" aria-label={en?'Frequently asked questions':'الأسئلة الشائعة'}>
  <h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Frequently asked questions':'أسئلة شائعة عن الصيانة في '+name}</h2>
  {[
   [en?'How do I request service in this district?':'كيف أطلب الخدمة في '+name+'؟',en?'Select the required specialty and send the property location, photos, and approximate dimensions to confirm availability.':'اختر التخصص وأرسل موقع العقار وصور الحالة والمقاسات التقريبية لتأكيد توفر الخدمة.'],
   [en?'Can the price be confirmed without visiting?':'هل يمكن تحديد السعر من الصور؟',en?'Photographs help outline the work, but some maintenance tasks require an inspection before a final price.':'الصور تساعد في تحديد نطاق العمل، لكن بعض أعمال الصيانة تحتاج معاينة قبل اعتماد السعر النهائي.']
  ].map(([q,a])=><details key={q} className="mb-2 rounded-lg border border-[#e9dfd1] p-3" open={false}><summary className="cursor-pointer text-sm font-semibold">{q}</summary><p className="mt-2 text-sm leading-7 text-[#665d50]">{a}</p></details>)}
  </section>}
 <section className="mt-7"><h2 className="mb-3 text-lg font-bold">{en?'Other Al Ain districts':'مناطق أخرى في العين'}</h2><div className="grid grid-cols-3 gap-2 md:grid-cols-5">{KAWKAB_AL_AIN_AREAS.filter(a=>a.slug!==area.slug).map(a=><Link key={a.slug} href={selectedService?kawkabAreaServicePath(locale,a.slug,selectedService.id):`${pre}/uae/abu-dhabi/al-ain/${a.slug}/general-maintenance`} className="rounded-lg border bg-white px-2 py-2 text-center text-xs md:text-sm">{a[locale]}</Link>)}</div></section>
 {!selectedService&&<DirectorySectorQuoteForm locale={locale} place={servicePlace} groups={model.sectorTaxonomy||[]} requestedService={requestedService} pagePath={basePath}/>}
 </main><Footer locale={locale} hideEmirateContext/>{selectedService&&hasKawkab?<KawkabMobileContactBar locale={locale} service={`${selectedService[locale]} - ${name}`}/>:null}</div>;
}
