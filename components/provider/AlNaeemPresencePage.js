import Head from 'next/head';
import CleaningServiceDetails from './CleaningServiceDetails';
import { cleaningContent, cleaningRequestMessage } from '../../lib/cleaningLandingContent';
import Link from 'next/link';
import { useState } from 'react';
import { Phone, MessageCircle, MapPin, ArrowLeft, ArrowRight, ChevronDown, Clock3, Sparkles, Droplets, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { alNaeemPath, AL_NAEEM_ORIGIN } from '../../lib/alNaeemPresence';

const texts = {
  ar: {
    brand: 'شركة النعيم', sector: 'خدمات التنظيف والتعقيم', home:'الرئيسية', services:'الخدمات', offers:'العروض', 'service-areas':'مناطق الخدمة',
    badge:'تنظيف المنازل والمفروشات والخزانات', hero:'النعيم لخدمات تنظيف بيتك ومفروشاتك.',
    lead:'تنظيف المنازل والفلل، غسيل وتعقيم الخزانات، وتنظيف الكنب والسجاد والستائر والمجالس. أخبرنا بالتفاصيل لتحصل على عرض واضح قبل التنفيذ.',
    book:'اطلب عرض سعر عبر واتساب', call:'اتصل الآن', whatsapp:'واتساب', seeServices:'استكشف الخدمات',
    locations:'دبي • الشارقة • أم القيوين • رأس الخيمة • العين', serviceTitle:'اختر الخدمة التي تحتاجها',
    serviceLead:'اختر ما يحتاجه بيتك، وتعرّف على التفاصيل لترتيب الخدمة المناسبة.',
    offerTitle:'عروض النعيم لخدمات التنظيف', offerLead:'تعرّف على تفاصيل الخصم واطلب تأكيد السعر الأساسي وشروط السريان مباشرة من الشركة قبل الحجز.',
    areaTitle:'أين تتوفر خدمات النعيم؟', areaLead:'اختر منطقتك لعرض تفاصيل التواصل والخدمات، ثم أكّد إمكانية الوصول والموعد قبل الحجز.',
    about:'عن شركة النعيم', aboutTitle:'اهتمام بالتفاصيل يبدأ من فهم المكان',
    aboutCopy:'تختلف احتياجات الفيلا عن الشقة، كما يختلف تنظيف خزان المياه عن العناية بالأقمشة والمجالس. لذلك يبدأ طلب الخدمة بتحديد نوع الموقع، وحجم العمل، ونوع الأسطح أو الأقمشة وحالتها. بعدها يمكن الاتفاق على نطاق واضح للخدمة والتوقيت والسعر.',
    process:'كيف تطلب الخدمة؟', processSteps:['اختر الخدمة المناسبة','أرسل صورًا أو تفاصيل الموقع ونطاق العمل','اطلب عرض سعر مكتوبًا وحدّد الموعد'],
    faqs:'أسئلة شائعة قبل الحجز',
    questions:[
      ['كيف أحصل على عرض سعر دقيق؟','أرسل نوع الخدمة والمنطقة والمساحة أو أبعاد القطع، وأرفق صورًا إن أمكن. بعد تقييم التفاصيل يتم تأكيد نطاق العمل والسعر.'],
      ['هل الأسعار ثابتة لجميع المنازل والخزانات؟','لا. يعتمد السعر على مساحة الموقع ونوع الخدمة وحالة الأقمشة أو الخزان والمعدات والوقت المطلوب.'],
      ['هل تتوفر الخدمة في العين أو خارج دبي؟','تستقبل الشركة الطلبات للمناطق المذكورة، لكن التوافر وتوقيت الانتقال يُؤكدان مباشرة قبل الحجز.'],
      ['كيف أستفيد من خصم عشرة بالمئة؟','راجع صفحة العرض الخاص بالخدمة واطلب تأكيد السعر الأصلي وقيمة الخصم وشروط سريانه قبل الموافقة على تنفيذ العمل.']
    ],
    city:'الموقع الأساسي', address:'القصيص، شارع دمشق، دبي', map:'ابحث عن العنوان في خرائط Google',
    related:'خدمات قد تهمك', coverageNote:'توافر الخدمة والموعد والسعر يؤكدها فريق الشركة بعد مراجعة الموقع.',
    view:'عرض التفاصيل', all:'عرض جميع الصفحات', back:'العودة إلى الشركة', more:'اكتشف المزيد',
    official:'دليل الشركات والمهنيين', offerBadge:'خصم عشرة بالمئة', request:'اطلب التفاصيل', serviceScope:'قبل طلب الخدمة',
    companyDetails:'معلومات التواصل', emailNote:'التواصل المباشر مع الشركة عبر الهاتف أو واتساب.',
    imagesNote:'الصور توضيحية للخدمات وليست توثيقًا لأعمال نفّذتها الشركة.',
    noOffers:'لا توجد عروض متاحة حاليًا.', noAreas:'لا توجد مناطق معلنة حاليًا.',
    noService:'لا توجد خدمات متاحة حاليًا.',
    secure:'لا توجد أسعار ثابتة غير مؤكدة', feedback:'خدمة مناسبة، عرض واضح، وقرار أسهل.',
    category:'دليل خدمات التنظيف', langSwitch:'English', discover:'تصفّح الأقسام',
  },
  en: {
    brand:'Al Nuaim',sector:'Cleaning & Sanitization Services',home:'Home',services:'Services',offers:'Offers','service-areas':'Service areas',
    badge:'Homes, upholstery and water tank cleaning',hero:'Al Nuaim cleaning for your home and furnishings.',
    lead:'Home and villa cleaning, water tank cleaning and sanitization, steam cleaning for sofas and carpets, plus curtains and majlis care. Share your requirements to receive a clear quotation.',
    book:'Request a quote on WhatsApp',call:'Call now',whatsapp:'WhatsApp',seeServices:'Explore services',
    locations:'Dubai • Sharjah • Umm Al Quwain • Ras Al Khaimah • Al Ain',serviceTitle:'Find the cleaning service you need',
    serviceLead:'Choose what your home needs and explore the details to plan a suitable visit.',
    offerTitle:'Al Nuaim cleaning offers',offerLead:'Check the service-specific offer, then confirm the original price, discount conditions and availability with the company before booking.',
    areaTitle:'Where does Al Nuaim take requests?',areaLead:'Explore service-area details and contact options, and confirm scheduling and availability before booking.',
    about:'About Al Nuaim',aboutTitle:'Good cleaning starts with understanding the space',
    aboutCopy:'A villa needs a different cleaning plan from an apartment, and water tanks require different procedures from upholstery and majlis seating. Start by describing the location, scope, materials and condition, then agree on timing, price and the included work.',
    process:'How to request a service',processSteps:['Choose the appropriate service','Share photos or details of your property and required work','Request a written quotation and confirm the date'],
    faqs:'Frequently asked questions',
    questions:[
      ['How do I get an accurate quote?','Share the service, location, area or dimensions, and photographs where possible. The company can then confirm the work scope and price.'],
      ['Are prices fixed for every home and water tank?','No. The price depends on size, materials, condition, equipment and the estimated time required.'],
      ['Can I request cleaning in Al Ain or outside Dubai?','The company accepts enquiries for the listed areas, but availability and travel times must be confirmed directly before booking.'],
      ['How can I use the ten percent discount?','Open the relevant offer page and confirm the original quoted price, discount amount and validity with the company before agreeing to work.']
    ],
    city:'Business contact location',address:'Damascus Street, Al Qusais, Dubai',map:'Find address on Google Maps',
    related:'Related services',coverageNote:'Final service availability, appointment and pricing are confirmed after reviewing your property and requirements.',
    view:'View details',all:'View all pages',back:'Back to company',more:'Learn more',
    official:'Business & Professionals Directory',offerBadge:'ten percent off',request:'Request details',serviceScope:'Before booking',
    companyDetails:'Contact details',emailNote:'Contact the company directly by phone or WhatsApp.',
    noOffers:'No offers currently available.',noAreas:'No declared service areas.',
    noService:'No services currently available.',
    secure:'No unconfirmed fixed prices',feedback:'The right service, a clear quote, an easier decision.',
    category:'Cleaning service directory',langSwitch:'العربية',discover:'Browse sections',
  }
};
const prefixPath = (locale,path) => (locale==='en'?'/en':'')+path;
const pick = (item,locale,key='name') => item?.[key+'_'+locale] || item?.[key+'_ar'] || '';
const whatsappHref = (number,subject) => {
  const n=String(number||'').replace(/\D/g,'');
  return n.length>=9&&n.length<=15?'https://wa.me/'+n+'?text='+encodeURIComponent(subject):null;
};
const safeTel = n => {
  const s=String(n||'').replace(/[^\d+]/g,'');
  return s.length>=10?'tel:'+s:null;
};
const mediaAlt = (item,locale) => pick(item,locale);
const mapUrl = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Damascus Street, Al Qusais, Dubai');
function QuoteActions({phone,wa,locale,subject,large=false}) {
  const t=texts[locale];const phoneLink=safeTel(phone), waLink=whatsappHref(wa,subject);
  return <div className={"flex flex-wrap items-center gap-2 "+(large?"mt-6":"mt-4")}>
    {waLink&&<a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#163d58] px-5 py-3 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#0e2b40]"><MessageCircle size={18}/>{large?t.book:t.whatsapp}</a>}
    {phoneLink&&<a href={phoneLink} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#d4bb89] bg-white px-5 py-3 text-[15px] font-bold text-[#173b56]"><Phone size={17}/>{t.call}</a>}
  </div>;
}
function ServiceCard({item,locale,kind='services'}) {
  const t=texts[locale];const isOffer=kind==='offers';
  return <article className="group overflow-hidden rounded-[22px] border border-[#e4e5e5] bg-white shadow-[0_8px_26px_rgba(19,48,70,.055)] transition hover:-translate-y-0.5 hover:shadow-lg">
    <Link href={alNaeemPath(locale,{kind,slug:item.slug})} className="flex sm:block focus-visible:outline-offset-4">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden sm:h-auto sm:w-full sm:aspect-[16/10] bg-[#edf0ec]">
        <img src={item.image} alt={mediaAlt(item,locale)} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
        {isOffer&&<span className="absolute end-3 top-3 rounded-full bg-[#d7ad61] px-3 py-1.5 text-sm font-black text-[#102f46]">{t.offerBadge}</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-5">
        <h3 className="text-[19px] font-extrabold leading-[1.5] text-[#17344d] sm:text-[20px]">{pick(item,locale)}</h3>
        <p className="line-clamp-2 sm:line-clamp-3 text-[14px] leading-[1.75] text-[#607181]">{pick(item,locale,'description')}</p>
        <span className="mt-2 inline-flex items-center gap-2 self-start rounded-xl border border-[#e4e8e9] bg-[#f8fafb] px-3.5 py-2 text-[14px] font-bold text-[#153a54]">{t.view}<ArrowLeft aria-hidden size={16} className={locale==='en'?'rotate-180':''}/></span>
      </div>
    </Link>
  </article>;
}
function CardGrid({items,kind,locale}) {
  const t=texts[locale];
  if(!items?.length)return <p className="rounded-2xl border border-dashed p-5">{kind==='offers'?t.noOffers:t.noService}</p>;
  if(kind==='service-areas')return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    {items.map(x=><Link href={alNaeemPath(locale,{kind,slug:x.slug})} key={x.slug} className="flex min-h-28 flex-col items-start justify-between rounded-[18px] border border-[#e6e8e9] bg-white p-4 shadow-sm transition hover:border-[#c9aa68]">
      <MapPin size={23} className="text-[#c59b4f]"/><span className="text-[16px] font-bold text-[#163b56]">{pick(x,locale)}</span><span className="text-[12px] text-[#6c7e8d]">{t.view}</span>
    </Link>)}
  </div>;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:gap-5">{items.map(item=><ServiceCard key={item.id} item={item} locale={locale} kind={kind}/>)}</div>;
}
function Segment({kind,locale,items,title,lead,showAll=true}) {
  const t=texts[locale];return <section id={kind} className="mx-auto w-full max-w-[1180px] scroll-mt-28 px-4 py-8 sm:px-6 sm:py-12">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[760px]"><span className="mb-2 block text-[12px] font-bold tracking-wide text-[#ab803b]">{t.brand} / {t[kind]}</span>
        <h2 className="text-[25px] font-extrabold leading-tight text-[#17334a] sm:text-[32px]">{title||t[kind]}</h2>
        {lead&&<p className="mt-2 text-[15px] leading-7 text-[#647384]">{lead}</p>}
      </div>
      {showAll&&items.length>0&&<Link href={alNaeemPath(locale,{kind})} className="rounded-full border border-[#d6c49e] px-4 py-2 text-[13px] font-bold text-[#163951]">{t.all}</Link>}
    </div>
    <CardGrid items={items} kind={kind} locale={locale}/>
  </section>;
}
function FAQ({locale,subject,phone,wa}) {
  const t=texts[locale];return <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
    <h2 className="mb-5 text-[26px] font-extrabold text-[#153650]">{t.faqs}</h2>
    <div className="grid gap-3 md:grid-cols-2">{t.questions.map(([q,a])=><details key={q} className="group rounded-[18px] border border-[#e0e6e9] bg-white p-4 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[15px] font-bold text-[#17354b]">{q}<ChevronDown size={19} className="shrink-0 text-[#b18b49] transition group-open:rotate-180"/></summary>
      <p className="mt-3 text-[14px] leading-7 text-[#5b6e7a]">{a}</p>
    </details>)}</div>
    <QuoteActions phone={phone} wa={wa} locale={locale} subject={subject}/>
  </section>;
}
export default function AlNaeemPresencePage({data,locale='ar',route={kind:'home'},unavailable=false}) {
  const en=locale==='en',t=texts[locale];
  if(unavailable||!data)return <><Navbar locale={locale}/><main className="p-8" role="status">{en?'The company page is temporarily unavailable.':'صفحة الشركة غير متاحة مؤقتًا.'}</main><Footer locale={locale}/></>;
  const root=alNaeemPath(locale), path=alNaeemPath(locale,route);
  const alt=alNaeemPath(en?'ar':'en',route);
  const cols={services:data.services,offers:data.offers,'service-areas':data.areas};
  const item=route.slug?cols[route.kind]?.find(x=>x.slug===route.slug):null;
  const name=pick(data.profile,locale), title=route.kind==='home'?name:item?pick(item,locale):t[route.kind];
  const subject=cleaningRequestMessage({locale,company:t.brand,title,path});
  const serviceContent = item && route.kind === 'services' ? cleaningContent(item.slug,locale) : null;
  const relatedOffers = item && route.kind === 'services' ? data.offers.filter(offer=>offer.service_slug===item.slug) : [];
  const summary=item ? `${pick(item,locale)} — ${t.brand}. ${pick(item,locale,'description')}` : route.kind==='home'?t.lead:`${t[route.kind]} — ${t.brand}. ${route.kind==='services'?t.serviceLead:route.kind==='offers'?t.offerLead:t.areaLead}`;
  const metaTitle=title+' | '+(route.kind==='home'?t.sector:t.brand)+' | '+(en?'Biet Al Reef':'بيت الريف');
  const photo=data.profile.cover_image_url;
  const phone=data.profile.phone,wa=data.profile.whatsapp;
  const related=item?data.services.filter(x=>x.slug!==item.slug).slice(0,2):[];
  const companySchema={'@context':'https://schema.org','@type':'LocalBusiness','@id':AL_NAEEM_ORIGIN+root+'#company',name,url:AL_NAEEM_ORIGIN+root,telephone:phone,image:AL_NAEEM_ORIGIN+photo,address:{'@type':'PostalAddress',streetAddress:'Damascus Street, Al Qusais',addressLocality:'Dubai',addressCountry:'AE'},areaServed:data.areas.map(a=>({'@type':'Place',name:pick(a,locale)}))};
  const pageSchema={'@context':'https://schema.org','@type':item&&route.kind==='services'?'Service':route.kind==='home'?'WebPage':item&&route.kind==='offers'?'WebPage':'CollectionPage',name:title,url:AL_NAEEM_ORIGIN+path,description:summary,...(item&&route.kind==='services'?{provider:{'@id':companySchema['@id']},areaServed:companySchema.areaServed}:{about:{'@id':companySchema['@id']}})};
  const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:t.official,item:AL_NAEEM_ORIGIN+(en?'/en':'')+'/providers'},{name:t.brand,item:AL_NAEEM_ORIGIN+root},...(route.kind==='home'?[]:[{name:t[route.kind],item:AL_NAEEM_ORIGIN+alNaeemPath(locale,{kind:route.kind})}]),...(item?[{name:title,item:AL_NAEEM_ORIGIN+path}]:[])].map((entry,index)=>({'@type':'ListItem',position:index+1,...entry}))};
  const structured=[companySchema,pageSchema,breadcrumbSchema];
  return <div dir={en?'ltr':'rtl'} lang={en?'en':'ar'} className="min-h-screen bg-[#faf9f6] font-sans text-[#1a3143]">
    <Head>
      <title>{metaTitle}</title><meta name="description" content={(summary||t.lead).slice(0,165)}/>
      <meta name="robots" content="index,follow"/>
      <link rel="canonical" href={AL_NAEEM_ORIGIN+path}/>
      <link rel="alternate" hrefLang={en?'en-AE':'ar-AE'} href={AL_NAEEM_ORIGIN+path}/>
      <link rel="alternate" hrefLang={en?'ar-AE':'en-AE'} href={AL_NAEEM_ORIGIN+alt}/>
      <link rel="alternate" hrefLang="x-default" href={AL_NAEEM_ORIGIN+alNaeemPath('ar',route)}/>
      <meta property="og:title" content={metaTitle}/>
      <meta property="og:description" content={(summary||t.lead).slice(0,165)}/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content={AL_NAEEM_ORIGIN+photo}/>
      <meta property="og:url" content={AL_NAEEM_ORIGIN+path}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    </Head>
    <Navbar locale={locale}/>
    <main>
      <div className="mx-auto max-w-[1180px] px-4 pt-4 sm:px-6">
        <nav aria-label={en?'Breadcrumb':'مسار التنقل'} className="mb-4 flex flex-wrap items-center gap-2 text-[12px] text-[#67798b]">
          <Link href={en?'/en/providers':'/providers'}>{t.official}</Link><span>›</span><Link href={root}>{t.brand}</Link>
          {route.kind!=='home'&&<><span>›</span><Link href={alNaeemPath(locale,{kind:route.kind})}>{t[route.kind]}</Link></>}
          {item&&<><span>›</span><span className="font-bold text-[#183852]">{title}</span></>}
        </nav>
      </div>
      <section className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-[24px] border border-[#e5e7e9] bg-white shadow-[0_14px_42px_rgba(21,49,68,.07)] sm:rounded-[30px]">
          <div className="grid md:grid-cols-[1fr_1.02fr]">
            <div className="relative h-40 sm:h-auto sm:min-h-[330px] md:order-2 md:min-h-[440px]">
              <img src={item?.image||photo} alt={item?mediaAlt(item,locale):en?'Al Nuaim home cleaning services':'خدمات شركة النعيم لتنظيف المنازل والفلل'} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
             </div>
            <div className="flex flex-col justify-center p-5 sm:p-9 md:order-1 md:p-10">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#eadbc0] bg-[#fff9ed] px-3 py-2 text-[12px] font-bold text-[#8b6c37]"><Sparkles size={14}/>{t.badge}</span>
              {route.kind==='home'&&<p className="mb-2 text-[15px] font-bold text-[#aa8648]">{name}</p>}
              <h1 className="text-[27px] font-extrabold leading-[1.35] tracking-[-.025em] text-[#142f48] sm:text-[40px] lg:text-[47px]">{route.kind==='home'?t.hero:route.kind==='service-areas'&&item?(en?`${t.brand} cleaning in ${title}`:`خدمات ${t.brand} في ${title}`):title}</h1>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#536b7c] sm:text-[17px]">{route.kind==='home'?t.lead:(item?pick(item,locale,'description'):t.lead)}</p>
              <QuoteActions phone={phone} wa={wa} locale={locale} subject={subject} large/>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-[#566f7e]"><MapPin size={16} className="text-[#b28c4a]"/>{t.address}</div>
              {route.kind==='home'&&<Link href={alNaeemPath(locale,{kind:'services'})} className="mt-4 inline-flex items-center gap-2 self-start text-[15px] font-bold text-[#18425e]">{t.seeServices}<ArrowLeft size={16} className={en?'rotate-180':''}/></Link>}
            </div>
          </div>
        </div>
      </section>
      <nav aria-label={t.discover} className="sticky top-0 z-30 mt-5 border-y border-[#e7e8e3] bg-[#fbfaf7]/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1180px] gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {[{kind:'home'},{kind:'services'},{kind:'offers'},{kind:'service-areas'}].map(r=><Link key={r.kind} href={alNaeemPath(locale,r)} className={"shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold transition "+(route.kind===r.kind?'bg-[#193b53] text-white':'border border-[#e6e8e8] bg-white text-[#325065] hover:bg-[#edf1f3]')}>{t[r.kind]}</Link>)}
          <Link href={alt} className="shrink-0 rounded-full border border-[#d9c7a6] bg-white px-4 py-2.5 text-[13px] font-bold text-[#193b53]">{t.langSwitch}</Link>
        </div>
      </nav>
      {route.kind==='home'?<>
        <Segment kind="services" locale={locale} title={t.serviceTitle} lead={t.serviceLead} items={data.services}/>
        <div className="border-y border-[#e9e6df] bg-[#f2f1eb]"><Segment kind="offers" locale={locale} title={t.offerTitle} lead={t.offerLead} items={data.offers}/></div>
        <Segment kind="service-areas" locale={locale} title={t.areaTitle} lead={t.areaLead} items={data.areas}/>
        <section className="mx-auto grid max-w-[1180px] gap-6 px-4 py-9 sm:px-6 md:grid-cols-2">
          <div className="rounded-[25px] border border-[#e7e3db] bg-white p-6 sm:p-8">
            <span className="text-[12px] font-bold text-[#ad8444]">{t.about}</span>
            <h2 className="mt-2 text-[24px] font-extrabold text-[#153850]">{t.aboutTitle}</h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5c7180]">{t.aboutCopy}</p>
          </div>
          <div className="rounded-[25px] bg-[#18394f] p-6 text-white sm:p-8">
            <h2 className="text-[24px] font-extrabold">{t.process}</h2>
            <ol className="mt-5 space-y-4">{t.processSteps.map((step,i)=><li key={step} className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d1af73] font-extrabold text-[#18394f]"><CheckCircle2 size={18} aria-hidden="true"/></span><span className="text-[15px] leading-6">{step}</span></li>)}</ol>
          </div>
        </section>
      </>:item?<>
        <section className="mx-auto max-w-[1180px] px-4 py-9 sm:px-6">
          <div className="rounded-[22px] border border-[#e2e6e7] bg-white p-5 sm:p-8">
            <span className="text-[13px] font-bold text-[#ac8649]">{route.kind==='services'?t.serviceScope:t[route.kind]}</span>
            <h2 className="mt-2 text-[24px] font-extrabold text-[#153b55]">{route.kind==='services'?(en?'Service details':'تفاصيل الخدمة'):title}</h2>
            <p className="mt-4 max-w-4xl text-[16px] leading-9 text-[#526b7b]">{pick(item,locale,'details')||pick(item,locale,'description')||t.coverageNote}</p>
            {serviceContent&&<CleaningServiceDetails content={serviceContent} locale={locale}/>}
            {route.kind==='offers'&&item.service_slug&&<Link href={alNaeemPath(locale,{kind:'services',slug:item.service_slug})} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#d7c49d] px-4 py-2.5 text-[14px] font-bold text-[#174059]">{en?'Explore included service':'تفاصيل الخدمة المرتبطة'}<ArrowLeft size={16} className={en?'rotate-180':''}/></Link>}
            {route.kind==='service-areas'&&<p className="mt-4 rounded-xl bg-[#f7f4eb] p-4 text-[14px] leading-7 text-[#735e39]">{t.coverageNote}</p>}
            <QuoteActions phone={phone} wa={wa} locale={locale} subject={subject}/>
          </div>
        </section>
        {relatedOffers.length>0&&<Segment kind="offers" locale={locale} items={relatedOffers} title={en?'Offers for this service':'عروض هذه الخدمة'} showAll={false}/>}
        {route.kind==='service-areas'?<Segment kind="services" locale={locale} items={data.services} title={t.related} showAll/>:related.length>0?<Segment kind="services" locale={locale} items={related} title={t.related}/>:null}
      </>:<Segment kind={route.kind} locale={locale} items={cols[route.kind]||[]} title={route.kind==='services'?t.serviceTitle:route.kind==='offers'?t.offerTitle:t.areaTitle} lead={route.kind==='services'?t.serviceLead:route.kind==='offers'?t.offerLead:t.areaLead} showAll={false}/>}
      {!serviceContent&&<FAQ locale={locale} subject={subject} phone={phone} wa={wa}/>}
      <section className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6"><h2 className="text-xl font-bold text-[#173b53]">{en?'Explore cleaning on Biet Al Reef':'اكتشف خدمات التنظيف في بيت الريف'}</h2><div className="mt-4 flex flex-wrap gap-3 text-sm font-bold underline underline-offset-4"><Link href={en?'/en/categories/cleaning-services':'/services/cleaning'}>{en?'Cleaning services':'خدمات التنظيف'}</Link><Link href={prefixPath(locale,'/uae/abu-dhabi/al-ain/cleaning-services')}>{en?'Cleaning in Al Ain':'خدمات التنظيف في العين'}</Link><Link href={root}>{t.brand}</Link></div></section>
      <section className="mx-auto max-w-[1180px] px-4 pb-12 sm:px-6">
        <div className="rounded-[22px] border border-[#e1e5e7] bg-white p-5 sm:p-7">
          <h2 className="text-[20px] font-extrabold text-[#173b53]">{t.companyDetails}</h2>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4"><p className="flex items-center gap-2 text-[15px] text-[#586d7b]"><MapPin size={17}/>{t.address}</p>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#d3bea0] px-4 py-2.5 text-[14px] font-bold text-[#173b53]">{t.map}</a></div>
         </div>
      </section>
    </main>
    <Footer locale={locale}/>
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#e7e7e6] bg-white/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-5px_22px_rgba(12,37,55,.13)] backdrop-blur-xl md:hidden">
      <a href={safeTel(phone)} className="flex min-h-[47px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#c8ac79] bg-white text-[14px] font-bold text-[#173b55]"><Phone size={17}/>{t.call}</a>
      <a href={whatsappHref(wa,subject)} target="_blank" rel="noopener noreferrer" className="flex min-h-[47px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#173e59] text-[14px] font-bold text-white"><MessageCircle size={18}/>{t.whatsapp}</a>
    </div>
    <div className="h-20 md:hidden" aria-hidden="true"/>
  </div>;
}
