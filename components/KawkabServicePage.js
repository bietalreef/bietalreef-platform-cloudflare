import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import KawkabMobileContactBar from './provider/KawkabMobileContactBar';
import KawkabServiceVisual from './provider/KawkabServiceVisual';
import {
 KAWKAB_PROFILE, KAWKAB_SPECIALTIES, KAWKAB_AL_AIN_AREAS,
 KAWKAB_LOGO, KAWKAB_ORIGIN,
 kawkabPath, kawkabWhatsapp, kawkabServicePath, kawkabServiceImage, kawkabAreaPath
} from '../lib/kawkabPresence';

import { KAWKAB_SERVICE_DETAILS } from '../data/kawkabServiceDetails';

export default function KawkabServicePage({locale='ar',serviceId,contextBase='',districtArea=null}){
 const en=locale==='en',d=en?'en':'ar',service=KAWKAB_SPECIALTIES.find(x=>x.id===serviceId);
 if(!service)return null;
 const copy=KAWKAB_SERVICE_DETAILS[serviceId][d],path=kawkabServicePath(d,serviceId),image=kawkabServiceImage(serviceId);
 const pageTitle=`${service[d]} | ${KAWKAB_PROFILE[en?'nameEn':'nameAr']} | ${en?'Biet Al Reef':'بيت الريف'}`;
 const desc=`${copy.lead} ${copy.summary}`.slice(0,225),url=KAWKAB_ORIGIN+path;
 const schema={'@context':'https://schema.org','@graph':[
 {'@type':'Service','@id':url+'#service',name:service[d],description:copy.summary,serviceType:service[d],provider:{'@type':'HomeAndConstructionBusiness',name:KAWKAB_PROFILE.nameAr,url:KAWKAB_ORIGIN+kawkabPath('ar'),telephone:'+971556485364'},areaServed:{'@type':'Place',name:'Al Ain, Abu Dhabi, UAE'}},
 {'@type':'BreadcrumbList',itemListElement:[{ '@type':'ListItem',position:1,name:en?'Companies':'الشركات',item:KAWKAB_ORIGIN+(en?'/en/providers':'/providers')},{'@type':'ListItem',position:2,name:KAWKAB_PROFILE[en?'nameEn':'nameAr'],item:KAWKAB_ORIGIN+kawkabPath(d)},{'@type':'ListItem',position:3,name:service[d],item:url}]}
 ]};
 return <div dir={en?'ltr':'rtl'} lang={d} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#29251f] sm:pb-0">
 <Head><title>{pageTitle}</title><meta name="description" content={desc}/><meta name="robots" content={districtArea?'noindex, follow':'index, follow, max-image-preview:large'}/><link rel="canonical" href={url}/><link rel="alternate" hrefLang="ar-AE" href={KAWKAB_ORIGIN+kawkabServicePath('ar',serviceId)}/><link rel="alternate" hrefLang="en-AE" href={KAWKAB_ORIGIN+kawkabServicePath('en',serviceId)}/><meta property="og:image" content={KAWKAB_ORIGIN+image.url}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></Head>
 <Navbar locale={d}/>
 <main className="mx-auto max-w-6xl px-3 py-4 md:px-5 md:py-9">
 <nav className="mb-3 flex flex-wrap gap-2 text-xs text-[#776b59] md:mb-7">{districtArea&&<><Link href={`${en?'/en':''}/uae/abu-dhabi/al-ain/${districtArea.slug}/general-maintenance/${serviceId}`}>{en?`Service in ${districtArea.en}`:`الخدمة في ${districtArea.ar}`}</Link><span>/</span></>}<Link href={kawkabPath(d,'home',contextBase)}>{KAWKAB_PROFILE[en?'nameEn':'nameAr']}</Link><span>/</span><Link href={kawkabPath(d,'services',contextBase)}>{en?'Services':'الخدمات'}</Link><span>/</span><span>{service[d]}</span></nav>
 <section className="grid gap-3 rounded-2xl bg-white p-3 shadow-sm md:grid-cols-2 md:gap-7 md:p-7">
 <div><span className="text-xs font-semibold text-[#9b7b42]">{KAWKAB_PROFILE[en?'nameEn':'nameAr']} · {en?'Verified on Biet Al Reef':'نشاط موثق على بيت الريف'}</span><h1 className="mt-2 text-xl font-extrabold md:mt-4 md:text-4xl">{service[d]}{districtArea?(en?` in ${districtArea.en}`:` في ${districtArea.ar}`):''}</h1>
 <p className="mt-2 text-sm leading-6 text-[#62574a] md:hidden">{copy.lead}</p>
 <p className="mt-4 hidden text-base leading-8 text-[#62574a] md:block">{copy.summary}</p>
 <div className="mt-3 hidden gap-2 sm:flex md:mt-6"><a href={kawkabWhatsapp(d,service[d])} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#353027] px-3 text-sm font-bold text-white">{en?'Request quote':'اطلب عرض سعر'}</a><a href="tel:+971556485364" className="flex min-h-11 items-center rounded-xl border px-4 text-sm font-bold">{en?'Call':'اتصال'}</a></div>
 </div>
 <KawkabServiceVisual serviceId={serviceId} locale={d} className="rounded-xl"/>
 </section>
 <section className="mt-5 hidden md:block"><h2 className="text-2xl font-bold">{en?'What the service involves':'تفاصيل الخدمة وخطوات المعاينة'}</h2><p className="mt-3 max-w-4xl leading-8 text-[#655d52]">{copy.summary}</p><div className="mt-5 grid gap-3 md:grid-cols-4">{copy.steps.map((step,i)=><article className="rounded-xl border bg-white p-4" key={step}><span className="text-xs font-bold text-[#a0824b]">{String(i+1).padStart(2,'0')}</span><h3 className="mt-2 font-semibold">{step}</h3></article>)}</div></section>
 <section className="mt-5 md:mt-9"><h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Select your district in Al Ain':'اختر منطقتك في العين'}</h2><div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">{KAWKAB_AL_AIN_AREAS.map(area=><Link key={area.slug} href={kawkabAreaPath(d,area.slug)} className="rounded-lg border bg-white px-3 py-3 text-center text-xs font-semibold md:text-sm">{area[d]}</Link>)}</div></section>
 <section id="service-faq" className="mt-6" aria-label={en?'Frequently asked questions':'الأسئلة الشائعة'}>
 <h2 className="mb-3 text-lg font-bold md:text-2xl">{en?'Frequently asked questions':'الأسئلة الشائعة عن '+service.ar}</h2>
 <details className="rounded-xl border bg-white p-3 text-sm md:hidden"><summary className="cursor-pointer font-bold">{copy.question}</summary><p className="mt-2 leading-7 text-[#655d52]">{copy.answer}</p></details>
 <div className="hidden rounded-xl border bg-white p-6 md:block"><h3 className="font-bold">{copy.question}</h3><p className="mt-3 leading-8 text-[#655d52]">{copy.answer}</p></div>
 <details className="mt-2 rounded-xl border bg-white p-3 text-sm md:hidden"><summary className="cursor-pointer font-bold">{en?'What details should I send to request a quote?':'ما المطلوب لإعداد عرض سعر لهذه الخدمة؟'}</summary><p className="mt-2 leading-7">{en?'Send the site location, approximate measurements, photos and a short description of the work.':'أرسل منطقة العقار والمقاسات التقريبية وصور الموقع مع وصف واضح للعمل المطلوب.'}</p></details>
 </section>
 <div className="mt-6 flex flex-wrap gap-3"><Link className="text-sm font-semibold text-[#81622c] underline" href={kawkabPath(d,'home',contextBase)}>{en?'Company profile':'الملف الرئيسي'}</Link><Link className="text-sm font-semibold text-[#81622c] underline" href={kawkabPath(d,'gallery',contextBase)}>{en?'Explore the gallery':'معرض التشطيبات'}</Link></div>
 </main><Footer/><KawkabMobileContactBar locale={d} service={service[d]}/></div>;
}
export async function kawkabServiceProps(locale,serviceId){
 if(!KAWKAB_SPECIALTIES.some(item=>item.id===serviceId))return {notFound:true};
 return {props:{locale,serviceId}};
}
