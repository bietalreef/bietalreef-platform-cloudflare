import Head from 'next/head';
import Link from 'next/link';
import { Building2, MapPin, Phone, MessageCircle, ShieldCheck, ChevronLeft, ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { companyPath } from '../../lib/publishedCompanyPresence';

const labels={
 ar:{home:'الرئيسية',services:'الخدمات','service-areas':'مناطق الخدمة',offers:'العروض',about:'عن الشركة',all:'عرض الكل',details:'التفاصيل',contact:'اتصل الآن',whatsapp:'واتساب',verified:'شركة موثّقة في بيت الريف',none:'لا يوجد محتوى معتمد ومنشور في هذا القسم حاليًا.',description:'راجع نطاق العمل ومناطق الخدمة، ثم تواصل مع الشركة لتأكيد السعر والموعد.',allCompanies:'دليل الشركات',sector:'قطاع التنظيف',areaNotice:'تواصل مع الشركة لتأكيد توفر الخدمة وتوقيت التنفيذ في المنطقة.',location:'مناطق تقديم الخدمة',unavailable:'تعذّر تحميل بيانات الشركة مؤقتًا. يرجى المحاولة لاحقًا.',direct:'طلب عرض سعر'},
 en:{home:'Home',services:'Services','service-areas':'Service areas',offers:'Offers',about:'About the company',all:'View all',details:'Details',contact:'Call now',whatsapp:'WhatsApp',verified:'Verified business on Biet Al Reef',none:'No approved content is currently published in this section.',description:'Review the scope and coverage, then contact the provider to confirm price and availability.',allCompanies:'Company directory',sector:'Cleaning services',areaNotice:'Contact the provider to confirm availability and timing in this area.',location:'Areas served',unavailable:'Company data temporarily unavailable. Please try again later.',direct:'Request a quote'}
};
const text=(item,locale,key='name')=>item?.[key+'_'+locale]||item?.[key+'_ar']||'';
const safeImg=(s)=>typeof s==='string'&&(/^https:\/\//i.test(s)||s.startsWith('/'))?s:null;
function phoneHref(phone){
 const digits=String(phone||'').replace(/\D/g,'');return digits.length>=9?'tel:+'+digits:null;
}
function waHref(phone,name){
 let digits=String(phone||'').replace(/\D/g,'');
 if(digits.startsWith('0'))digits='971'+digits.slice(1);
 return digits.length>=9?'https://wa.me/'+digits+'?text='+encodeURIComponent(name):null;
}
function Collections({items,kind,locale,slug,cover}){
 const t=labels[locale];
 if(!items.length)return <p className="rounded-xl border border-dashed border-[#d9d3c7] bg-white p-5 text-sm text-slate-600">{t.none}</p>;
 return <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item=><Link href={companyPath(slug,locale,kind,item.slug)} key={item.id} className="group flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-[#e8e0d1] bg-white p-2 shadow-sm transition hover:border-[#b99b61] sm:block sm:p-0">
   {kind==='service-areas'?<div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-[#f1ece0] text-[#9c7a38] sm:h-44 sm:w-full"><MapPin size={31}/></div>:
   (safeImg(item.image)||safeImg(cover))?<img alt={text(item,locale)} src={safeImg(item.image)||safeImg(cover)} width="400" height="250" loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-44 sm:w-full sm:rounded-none"/>:<div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-[#f1ece0] sm:h-44 sm:w-full"><Building2/></div>}
   <span className="flex min-w-0 flex-1 flex-col justify-center p-1 sm:p-4"><strong className="text-sm text-[#18334c] sm:text-lg">{text(item,locale)}</strong>{text(item,locale,'description')?<span className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 sm:line-clamp-3">{text(item,locale,'description')}</span>:null}<span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#8b6c37] sm:text-sm">{t.details}<ChevronLeft size={14}/></span></span>
 </Link>)}</div>;
}
function Section({title,url,children,locale}){
 return <section className="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-8"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-xl font-bold text-[#18334c] sm:text-3xl">{title}</h2>{url?<Link className="rounded-full border border-[#ceb781] px-3 py-1.5 text-xs font-bold text-[#8b6c37]" href={url}>{labels[locale].all} →</Link>:null}</div>{children}</section>;
}
export default function PublishedCompanyPresencePage({data,locale='ar',route={kind:'home'},unavailable=false,slug:missingSlug=''}){
 const t=labels[locale]||labels.ar;const rtl=locale!=='en';
 if(unavailable||!data)return <main role="alert" className="p-10 text-center">{t.unavailable}</main>;
 const {profile,services,offers,areas,categories=[]}=data;const slug=profile.slug;const section=route.kind;
 const collection=section==='services'?services:section==='offers'?offers:section==='service-areas'?areas:null;
 const detail=route.slug?collection?.find(x=>x.slug===route.slug):null;
 const name=text(profile,locale);const pageLabel=detail?text(detail,locale):section==='home'?name:t[section];
 const relative=companyPath(slug,locale,section,route.slug);
 const arabic=companyPath(slug,'ar',section,route.slug);const english=companyPath(slug,'en',section,route.slug);
 const origin='https://bietalreef.ae';
 const description=(detail&&text(detail,locale,'description'))||text(profile,locale,'short_description')||t.description;
 const canonical=origin+relative;
 const empty=section==='services'&&!services.length||section==='offers'&&!offers.length||section==='service-areas'&&!areas.length;
 const schema={'@context':'https://schema.org','@type':'LocalBusiness','@id':origin+companyPath(slug,'ar')+'#company',name,url:origin+companyPath(slug,locale),telephone:profile.phone||undefined,image:safeImg(profile.cover_image_url)||undefined,areaServed:areas.map(a=>({'@type':'Place',name:text(a,locale)}))};
 const wa=waHref(profile.whatsapp,name);
 const call=phoneHref(profile.phone);
 const cover=safeImg(profile.cover_image_url)||safeImg(profile.logo_url);
 return <div dir={rtl?'rtl':'ltr'} lang={locale==='ar'?'ar-AE':'en-AE'} className="min-h-screen bg-[#faf8f3] pb-24 sm:pb-0">
 <Head>
  <title>{section==='home'?name+' | '+(rtl?'خدمات التنظيف | بيت الريف':'Cleaning services | Biet Al Reef'):pageLabel+' | '+name+' | '+(rtl?'بيت الريف':'Biet Al Reef')}</title>
  <meta name="description" content={description}/><link rel="canonical" href={canonical}/>
  <link rel="alternate" hrefLang="ar-AE" href={origin+arabic}/><link rel="alternate" hrefLang="en-AE" href={origin+english}/><link rel="alternate" hrefLang="x-default" href={origin+arabic}/>
  {empty?<meta name="robots" content="noindex,follow"/>:null}
  <meta property="og:title" content={pageLabel+' | '+name}/><meta property="og:description" content={description}/>{cover?<meta property="og:image" content={cover}/>:null}
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(detail&&section==='services'?{'@context':'https://schema.org','@type':'Service',name:pageLabel,description,provider:{'@id':schema['@id']}}:schema).replace(/</g,'\\u003c')}}/>
 </Head>
 <Navbar locale={locale}/>
 <header className="border-b border-[#e7ddcc] bg-white">
  <nav aria-label="Company pages" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-3 text-xs font-bold sm:px-5 sm:text-sm">
   <Link href={companyPath(slug,locale)} className="font-extrabold text-[#173d31]">{name}</Link>
   <span className="flex flex-wrap items-center gap-3 text-[#173d31]">
    {['home','services','offers','service-areas'].map(k=><Link key={k} href={companyPath(slug,locale,k)}>{t[k]}</Link>)}
   </span>
  </nav>
 </header>
 {cover?<img src={cover} alt={name} fetchPriority="high" width="1200" height="340" className="mx-auto block max-h-80 w-full max-w-6xl object-contain bg-white"/>:null}
 <div className="mx-auto max-w-6xl border-b border-[#e7ddcc] bg-white px-4 py-5 sm:rounded-b-2xl sm:px-7">
  <nav className="mb-2 flex items-center gap-2 text-xs text-[#755f34]"><Link href={locale==='en'?'/en/providers':'/providers'}>{t.allCompanies}</Link><span>/</span><Link href={companyPath(slug,locale)}>{name}</Link>{section!=='home'?<span>/ {pageLabel}</span>:null}</nav>
  <span className="inline-flex items-center gap-1 rounded-full bg-[#f6eedc] px-3 py-1 text-xs font-bold text-[#82682f]"><ShieldCheck size={14}/>{t.verified}</span>
  <h1 className="mt-3 text-2xl font-black leading-relaxed text-[#163c30] sm:text-5xl">{pageLabel}</h1>
  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
  <div className="mt-3 flex flex-wrap gap-2">{areas.map(a=><Link className="rounded-full border border-[#e3d8c2] bg-[#fdfbf7] px-3 py-1.5 text-xs" key={a.id} href={companyPath(slug,locale,'service-areas',a.slug)}><MapPin className="me-1 inline-block" size={13}/>{text(a,locale)}</Link>)}</div>
  <div className="mt-4 hidden flex-wrap gap-3 sm:flex">{call?<a className="rounded-xl bg-[#183d31] px-5 py-3 font-bold text-white" href={call}>{t.contact}</a>:null}{wa?<a className="rounded-xl border border-[#ceb77c] bg-white px-5 py-3 font-bold text-[#183d31]" href={wa}>{t.whatsapp}</a>:null}</div>
 </div>
 {section==='home'?<>
  <Section title={t.about} locale={locale}><p className="rounded-2xl border border-[#e6dece] bg-white p-4 leading-8 text-slate-600">{text(profile,locale,'description')||description}</p></Section>
  <Section title={t.services} url={companyPath(slug,locale,'services')} locale={locale}><Collections locale={locale} slug={slug} kind="services" items={services} cover={cover}/></Section>
  {offers.length?<Section title={t.offers} url={companyPath(slug,locale,'offers')} locale={locale}><Collections locale={locale} slug={slug} kind="offers" items={offers} cover={cover}/></Section>:null}
  <Section title={t.location} url={companyPath(slug,locale,'service-areas')} locale={locale}><Collections locale={locale} slug={slug} kind="service-areas" items={areas}/></Section>
 </>:detail? <Section title={pageLabel} locale={locale}>
   <div className="grid overflow-hidden rounded-2xl border border-[#e6dece] bg-white md:grid-cols-2">
   {detail.image||cover?<img src={detail.image||cover} alt={pageLabel} width="600" height="350" className="h-56 w-full object-cover md:h-full"/>:null}
   <div className="p-5"><p className="leading-8 text-slate-700">{text(detail,locale,'description')||t.description}</p>{section==='service-areas'?<p className="mt-2 leading-7 text-slate-500">{t.areaNotice}</p>:null}{wa?<a href={wa} className="mt-4 inline-flex rounded-xl bg-[#183d31] px-5 py-3 font-bold text-white">{t.direct}</a>:null}</div>
   </div>
   {section==='service-areas'&&services.length?<div className="mt-4"><h2 className="mb-3 text-lg font-bold">{t.services}</h2><Collections locale={locale} slug={slug} kind="services" items={services} cover={cover}/></div>:null}
  </Section>:<Section title={t[section]} locale={locale}><Collections items={collection||[]} locale={locale} slug={slug} kind={section} cover={cover}/></Section>}
  <Section title={t.location} locale={locale}><p className="text-xs text-slate-500">{areas.map(a=>text(a,locale)).join(locale==='ar'?'، ':', ')}</p></Section>
  <Footer/>
  <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#ded2b9] bg-white p-2 pb-[calc(8px+env(safe-area-inset-bottom))] sm:hidden">{call?<a href={call} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#173d31] px-3 py-3 text-xs font-bold text-white"><Phone size={17}/>{t.contact}</a>:null}{wa?<a href={wa} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#c6ad78] bg-[#f8f4e8] px-3 py-3 text-xs font-bold text-[#173d31]"><MessageCircle size={17}/>{t.whatsapp}</a>:null}</div>
 </div>;
}
