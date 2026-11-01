import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {
  KAWKAB_PROFILE, KAWKAB_PROVIDER_CODE, KAWKAB_COVERAGE, KAWKAB_SPECIALTIES,
  KAWKAB_IMAGES, KAWKAB_GALLERY, KAWKAB_DETAILS, KAWKAB_ORIGIN, kawkabPath, kawkabWhatsapp,
} from '../../lib/kawkabPresence';

const i18n = {
  ar:{home:'الرئيسية',services:'التخصصات',areas:'مناطق الخدمة',gallery:'معرض الديكور',badge:'ملف شركة معتمد لدى بيت الريف',business:'كوكب الصعيد للخدمات الفنية',sub:'الدهانات، التشطيبات، الصيانة والديكور الداخلي',intro:'خدمات فنية للمنازل والمباني، تشمل الدهانات والبلاستر وورق الجدران والنجارة والسباكة والتكييف. تعرّف على التخصصات ونطاق العمل ثم اطلب عرض سعر مناسبًا لمشروعك.',call:'اتصال مباشر',whatsapp:'طلب عرض سعر',learn:'تصفح التخصصات',imageTitle:'معرض الديكور والتشطيبات',imageDesc:'مجموعة صور مقدمة من الشركة، تعرض نماذج للدهانات والتشطيبات والديكور الداخلي.',areasTitle:'الإمارات المشمولة بنطاق الخدمة',areasDesc:'التغطية المسجلة حاليًا على مستوى الإمارة؛ يُرجى تأكيد الموقع وتوفر الخدمة قبل تحديد الموعد.',seeAll:'عرض التفاصيل',servicesTitle:'تخصصات كوكب الصعيد',servicesDesc:'مجالات العمل المسجلة في الوصف الرسمي للشركة. اطلب تحديد نطاق العمل والسعر وفق احتياجك.',ask:'استفسر عن الخدمة',galleryTitle:'نماذج الديكور الداخلي',galleryDesc:'مجموعة صور للديكور والتشطيبات ضمن المواد المقدمة من الشركة. لا ننسب أي صورة إلى مشروع منفذ في حي أو منطقة دون معلومات تنفيذ موثقة.',detailTitle:'تفاصيل التشطيبات والديكورات',note:'الصور ضمن معرض كوكب الصعيد، ولا تعني وحدها توثيق مشروع مكتمل في موقع محدد.',areasNote:'لم تُخصص صفحات مستقلة لأحياء العين؛ سيتم ربط الصفحات المحلية عندما تتوفر بيانات تغطية ومحتوى محلي مستقل معتمد.',lead:'اطلب تقييم مشروعك',leadText:'حدد الإمارة ونوع الخدمة ومساحة العمل والوقت المناسب في رسالة واتساب للحصول على عرض سعر.',back:'ملف الشركة',directory:'دليل الشركات والمهنيين',emirateDirectory:'دليل الإمارة',noOffer:'يتم تحديد الخدمة والسعر وفق المعاينة أو وصف العمل.',official:'رقم المزود',phone:'الهاتف',faq:'قبل طلب عرض السعر',faq1:'ما البيانات المطلوبة لطلب عرض سعر؟',answer1:'حدد المنطقة، نوع العمل، المساحة التقريبية، وأرسل صور الموقع إن توفرت.',faq2:'هل تتوفر الخدمة في جميع أحياء العين؟',answer2:'نطاق أبوظبي مسجل على مستوى الإمارة، لكن توفر التنفيذ في عنوان محدد يُؤكد مباشرة مع الشركة.',homeText:'الملف الرئيسي',galleryText:'صور الديكور',areasText:'نطاق التغطية',servicesText:'مجالات العمل'},
  en:{home:'Home',services:'Specialties',areas:'Service areas',gallery:'Décor gallery',badge:'Verified business profile on Biet Al Reef',business:'Kawkab Al Saeed Technical Services',sub:'Painting, maintenance, finishing and interior décor',intro:'Technical services for homes and buildings, including painting, plaster, wallpaper, carpentry, plumbing and air conditioning. Explore the areas covered and request a quote for your requirements.',call:'Call now',whatsapp:'Request a quote',learn:'Explore specialties',imageTitle:'Interior décor and finishing gallery',imageDesc:'Provider-supplied images of painting, finishing and interior design examples.',areasTitle:'Emirates served',areasDesc:'Coverage is registered at emirate level; confirm the exact site and service availability before arranging a visit.',seeAll:'View details',servicesTitle:'Kawkab Al Saeed specialties',servicesDesc:'Fields of work recorded in the company description. Confirm your scope and costs directly.',ask:'Ask about this service',galleryTitle:'Interior décor examples',galleryDesc:'A selection of design and finishing images supplied for this business. Images are not assigned to a specific completed local project without supporting details.',detailTitle:'Finishing and décor details',note:'Gallery imagery should not be taken as proof of a completed project at a specific location.',areasNote:'No Al Ain neighborhood pages have been created. Distinct local landing pages will require validated coverage and genuinely useful local content.',lead:'Discuss your project',leadText:'Send your emirate, service, approximate area and preferred timing for a tailored quote.',back:'Company profile',directory:'Companies & professionals',emirateDirectory:'Emirate directory',noOffer:'Scope and pricing depend on the requirements and site assessment.',official:'Provider ID',phone:'Phone',faq:'Before requesting a quote',faq1:'What should I include in my quote request?',answer1:'Share your location, type of work, approximate size and photos if available.',faq2:'Do you cover every neighborhood in Al Ain?',answer2:'Abu Dhabi is recorded at emirate level; confirm availability for your specific address with the company.',homeText:'Company profile',galleryText:'Décor images',areasText:'Service coverage',servicesText:'Areas of work'}
};
const routeLabels = (t) => ({home:t.home, services:t.services, 'service-areas':t.areas, gallery:t.gallery});
const local = (image,key,locale) => image?.[key+'_'+locale] || image?.[key+'_ar'] || '';
const abs = path => path.startsWith('https://')?path:KAWKAB_ORIGIN+path;
function ImageCard({image,locale,prefetch=false}){
  return <figure className="min-w-0 overflow-hidden rounded-xl border border-[#e8e1d6] bg-white">
    <img src={image.url} alt={local(image,'alt',locale)} title={local(image,'image_title',locale)} width={image.width} height={image.height}
      loading={prefetch?'eager':'lazy'} fetchPriority={prefetch?'high':undefined} decoding="async" className="aspect-[4/3] w-full bg-[#eee9e1] object-cover" />
    <figcaption className="px-3 py-3">
      <p className="line-clamp-1 text-sm font-semibold text-[#292722]">{local(image,'image_title',locale).split('|')[0].trim()}</p>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#646058]">{local(image,'caption',locale)}</p>
    </figcaption>
  </figure>;
}
function SectionTitle({title,desc,href,cta}){
  return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div className="min-w-0"><h2 className="text-xl font-bold tracking-tight text-[#28231f] sm:text-2xl">{title}</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-[#6b6359]">{desc}</p></div>{href&&<Link href={href} className="shrink-0 text-sm font-semibold text-[#836334] hover:underline">{cta} ←</Link>}</div>;
}
function Services({locale,short=false}){
  const t=i18n[locale];const items=short?KAWKAB_SPECIALTIES.slice(0,4):KAWKAB_SPECIALTIES;
  return <section className="mx-auto w-full max-w-6xl px-4 py-7 sm:py-10">
    <SectionTitle title={t.servicesTitle} desc={t.servicesDesc} href={short?kawkabPath(locale,'services'):null} cta={t.seeAll}/>
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:gap-4">{items.map((item,index)=><article key={item.id} className="flex min-w-0 flex-col rounded-xl border border-[#ebe5dc] bg-white p-3 sm:p-5">
      <span className="text-xs font-semibold text-[#a48752]">{String(index+1).padStart(2,'0')}</span>
      <h3 className="mt-2 text-sm font-bold leading-6 text-[#272321] sm:text-base">{item[locale]}</h3>
      <p className="mt-1 line-clamp-3 grow text-xs leading-5 text-[#696057] sm:text-sm">{item[locale+'Desc']}</p>
      <a href={kawkabWhatsapp(locale,item[locale])} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs font-semibold text-[#846233] hover:underline">{t.ask} ←</a>
    </article>)}</div>
  </section>;
}
function Areas({locale,short=false}){
  const t=i18n[locale];return <section className="mx-auto max-w-6xl px-4 py-7 sm:py-10">
    <SectionTitle title={t.areasTitle} desc={t.areasDesc} href={short?kawkabPath(locale,'service-areas'):null} cta={t.seeAll}/>
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">{KAWKAB_COVERAGE.map(area=><div key={area.slug} className="rounded-xl border border-[#e7dfd3] bg-white p-3 sm:p-5">
      <h3 className="text-sm font-bold text-[#2c2723] sm:text-lg">{area[locale]}</h3>
      <a href={`${locale==='en'?'/en':''}${area.directory}`} className="mt-2 block text-xs font-medium text-[#876735] hover:underline">{t.emirateDirectory} ←</a>
    </div>)}</div>
    {!short&&<p className="mt-5 text-sm leading-7 text-[#766a5e]">{t.areasNote}</p>}
  </section>;
}
function Gallery({locale,short=false}){
  const t=i18n[locale];return <section className="mx-auto max-w-6xl px-4 py-7 sm:py-10">
    <SectionTitle title={t.galleryTitle} desc={t.galleryDesc} href={short?kawkabPath(locale,'gallery'):null} cta={t.seeAll}/>
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">{KAWKAB_GALLERY.map((image,index)=><ImageCard key={image.id} image={image} locale={locale} prefetch={false}/>)}</div>
    {!short&&<><h3 className="mb-3 mt-9 text-lg font-bold text-[#29241e]">{t.detailTitle}</h3><div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">{KAWKAB_DETAILS.map(image=><ImageCard key={image.id} image={image} locale={locale}/>)}</div><p className="mt-4 text-xs leading-6 text-[#756e66]">{t.note}</p></>}
  </section>;
}
function Faq({locale}){const t=i18n[locale];return <section className="mx-auto max-w-6xl px-4 py-8"><h2 className="mb-4 text-xl font-bold">{t.faq}</h2><div className="grid gap-3 md:grid-cols-2">{[[t.faq1,t.answer1],[t.faq2,t.answer2]].map(([q,a])=><div key={q} className="rounded-xl border border-[#e9e1d7] bg-white p-4"><h3 className="font-semibold">{q}</h3><p className="mt-2 text-sm leading-7 text-[#625b54]">{a}</p></div>)}</div></section>}
export default function KawkabPresencePage({locale='ar',section='home'}){
  const lang=locale==='en'?'en':'ar', t=i18n[lang], direction=lang==='ar'?'rtl':'ltr';
  const paths={ar:kawkabPath('ar',section),en:kawkabPath('en',section)};
  const titles={home:t.business,services:t.servicesTitle,'service-areas':t.areasTitle,gallery:t.galleryTitle};
  const descriptions={home:t.intro,services:t.servicesDesc,'service-areas':t.areasDesc,gallery:t.galleryDesc};
  const currentPath=paths[lang],currentUrl=abs(currentPath);
  const mainImage=KAWKAB_GALLERY[0];
  const imagesForPage=section==='gallery'?KAWKAB_IMAGES:section==='home'?[mainImage,...KAWKAB_GALLERY.slice(1)]:[];
  const pageSchema={ '@context':'https://schema.org','@graph':[
    {'@type':'HomeAndConstructionBusiness','@id':abs(kawkabPath('ar'))+'#business', name:KAWKAB_PROFILE.nameAr,alternateName:KAWKAB_PROFILE.nameEn,url:abs(kawkabPath('ar')),telephone:'+971556485364',identifier:KAWKAB_PROVIDER_CODE,areaServed:KAWKAB_COVERAGE.map(area=>({'@type':'AdministrativeArea',name:area.en})),image:KAWKAB_IMAGES.map(image=>abs(image.url)),description:KAWKAB_PROFILE.descriptionEn},
    {'@type':'WebPage','@id':currentUrl+'#webpage',url:currentUrl,name:titles[section],description:descriptions[section],inLanguage:lang==='en'?'en-AE':'ar-AE',about:{'@id':abs(kawkabPath('ar'))+'#business'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:t.directory,item:abs(lang==='en'?'/en/providers':'/providers')},{'@type':'ListItem',position:2,name:t.business,item:abs(kawkabPath(lang))},...(section==='home'?[]:[{'@type':'ListItem',position:3,name:titles[section],item:currentUrl}])]},
    ...imagesForPage.map((image,index)=>({'@type':'ImageObject',contentUrl:abs(image.url),name:local(image,'image_title',lang),caption:local(image,'caption',lang),width:image.width,height:image.height,encodingFormat:'image/webp',representativeOfPage:index===0&&section==='home'})),
  ]};
  const pageTitle=`${titles[section]} | ${t.business} | بيت الريف`;
  return <div dir={direction} lang={lang==='en'?'en':'ar'} className="min-h-screen bg-[#fbfaf7] text-[#292520]">
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={descriptions[section]} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={currentUrl}/>
      <link rel="alternate" hrefLang="ar-AE" href={abs(paths.ar)}/>
      <link rel="alternate" hrefLang="en-AE" href={abs(paths.en)}/>
      <link rel="alternate" hrefLang="x-default" href={abs(paths.ar)}/>
      <meta property="og:type" content="website"/><meta property="og:url" content={currentUrl}/><meta property="og:title" content={pageTitle}/><meta property="og:description" content={descriptions[section]}/><meta property="og:image" content={abs(mainImage.url)}/><meta property="og:locale" content={lang==='en'?'en_AE':'ar_AE'}/><meta name="twitter:card" content="summary_large_image"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(pageSchema).replace(/</g,'\\u003c')}}/>
    </Head>
    <Navbar/>
    <main>
      <div className="border-b border-[#e8dfd5] bg-white"><nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-xs text-[#786e60]"><Link href={lang==='en'?'/en/providers':'/providers'} className="hover:underline">{t.directory}</Link><span>/</span>{section==='home'?<span className="font-medium text-[#302a23]">{t.business}</span>:<><Link href={kawkabPath(lang)} className="hover:underline">{t.business}</Link><span>/</span><span className="font-medium">{titles[section]}</span></>}</nav></div>
      <header className="bg-[#f3efe7]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-7 md:grid-cols-[1.05fr_1fr] md:items-center md:py-12">
          <div className="min-w-0"><div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#806333]"><span className="rounded-full border border-[#c9b694] bg-white px-3 py-1">{t.badge}</span><span>{t.official}: {KAWKAB_PROVIDER_CODE}</span></div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">{section==='home'?t.business:titles[section]}</h1>
            <p className="mt-2 font-semibold text-[#765936]">{t.sub}</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#514941] sm:text-base">{section==='home'?t.intro:descriptions[section]}</p>
            <div className="mt-5 flex flex-wrap gap-2"><a href={kawkabWhatsapp(lang)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#302b24] px-4 py-3 text-sm font-semibold text-white">{t.whatsapp}</a><a href="tel:+971556485364" className="rounded-lg border border-[#bfb5a4] bg-white px-4 py-3 text-sm font-semibold text-[#332c24]">{t.call}</a></div>
          </div>
          <img src={mainImage.url} alt={local(mainImage,'alt',lang)} width={mainImage.width} height={mainImage.height} loading="eager" fetchPriority="high" decoding="async" className="aspect-[16/10] w-full rounded-xl object-cover shadow-sm" />
        </div>
      </header>
      <nav aria-label={lang==='en'?'Company sections':'أقسام الشركة'} className="border-b border-[#e9e2d8] bg-white"><div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-3 py-2 sm:gap-3">{Object.entries(routeLabels(t)).map(([key,label])=><Link key={key} href={kawkabPath(lang,key)} aria-current={key===section?'page':undefined} className={`rounded-lg px-1 py-2 text-center text-xs font-medium sm:px-3 sm:text-sm ${key===section?'bg-[#f0e8da] text-[#5c421d]':'text-[#5e574e] hover:bg-[#f7f4ee]'}`}>{label}</Link>)}</div></nav>
      {section==='home'?<><Services locale={lang} short/><Gallery locale={lang} short/><Areas locale={lang} short/><Faq locale={lang}/></>:null}
      {section==='services'?<><Services locale={lang}/><Gallery locale={lang} short/></>:null}
      {section==='service-areas'?<><Areas locale={lang}/><Services locale={lang} short/><Faq locale={lang}/></>:null}
      {section==='gallery'?<><Gallery locale={lang}/><Services locale={lang} short/></>:null}
      <section className="mt-4 bg-[#302b26] px-4 py-8 text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">{t.lead}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#e9e0d2]">{t.leadText}</p></div><a href={kawkabWhatsapp(lang)} className="rounded-lg bg-[#e9d0a2] px-5 py-3 text-sm font-bold text-[#26211d]" target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div></section>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-[#766b5d]"><span>{t.official}: {KAWKAB_PROVIDER_CODE} · {t.phone}: <a href="tel:+971556485364" className="hover:underline">0556485364</a></span><Link href={kawkabPath(lang)} className="font-semibold hover:underline">{t.back}</Link></div>
    </main><Footer/>
  </div>;
}
