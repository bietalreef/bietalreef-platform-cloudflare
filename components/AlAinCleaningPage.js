import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, ArrowUpRight, Check, CheckCheck, ChevronDown, ChevronLeft, ChevronRight, MapPin, Sparkles, ClipboardList, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { CLEANING_SERVICES } from '../data/alAinCleaningGuide';
import { localPath } from '../lib/localServices';
import { trackPublicEvent } from '../lib/publicAnalytics';
import styles from './AlAinCleaningPage.module.css';

// All paragraph text is server rendered. Toggling only changes its presentation.
export function CleaningReadMore({text,en=false,className=''}) {
  const [expanded,setExpanded] = useState(false);
  const id=useId(), paragraph=useRef(null);
  const [expandable,setExpandable]=useState(text.length>85);
  useEffect(()=>{
    const node=paragraph.current;
    if(!node) return;
    const measure=()=>setExpandable(node.scrollHeight>parseFloat(getComputedStyle(node).lineHeight)*3+2);
    measure();
    const observer=new ResizeObserver(measure);observer.observe(node);
    return ()=>observer.disconnect();
  },[text]);
  return <div className={`${styles.readMore} ${className}`}><p ref={paragraph} id={id} className={!expanded?styles.clamped:undefined}>{text}</p>{expandable&&<button type="button" aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(!expanded)}>{expanded?(en?'Show less':'أقل'):(en?'Read more':'المزيد')}<ChevronDown aria-hidden="true" className={expanded?styles.rotated:undefined}/></button>}</div>;
}

export default function AlAinCleaningPage({model}) {
  const {locale,guide,service,providers,relatedProviders=[],areas}=model;
  const en=locale==='en', t=value=>value[locale], prefix=en?'/en':'';
  const Next=en?ArrowUpRight:ArrowUpLeft, Trail=en?ChevronRight:ChevronLeft;
  const [district,setDistrict]=useState('');
  const [chosenService,setChosenService]=useState(service||'');
  const hub=localPath({locale,category:'cleaning-services'});
  const detailsHref=slug=>localPath({locale,category:'cleaning-services',service:slug});
  const quoteHref=`${prefix}/request-quote?${new URLSearchParams({city:'al-ain',category:'cleaning-services',...(chosenService?{service:chosenService}:{}),...(district?{area:district}:{})})}`;
  const exactMatch = !service || providers.length>0;
  const viewProviders=(exactMatch?providers:relatedProviders).filter(p=>!district||p.coverage.some(c=>c.approved&&c.city==='al-ain'&&c.areas.includes(district)));
  const linkMore=(slug)=>service===slug?'#scope':detailsHref(slug);
  // Existing editorial cleaning guides remain unchanged; these are direct links
  // to the independent Al Nuaim company landing pages, not verification records.
  const alNaeemOffers = [
    {slug:'home-villa-cleaning',name:{ar:'تنظيف المنازل والفلل',en:'Home & Villa Cleaning'},image:'/images/providers/al-naeem/home-villa-male.webp'},
    {slug:'steam-carpet-sofa-cleaning',name:{ar:'غسيل السجاد والكنب بالبخار',en:'Carpet & Sofa Steam Cleaning'},image:'/images/providers/al-naeem/sofa-carpet-male.webp'},
    {slug:'curtains-upholstery-majlis-cleaning',name:{ar:'تنظيف المراتب والمفروشات',en:'Upholstery Deep Cleaning'},image:'/images/providers/al-naeem/majlis-upholstery-male.webp'},
    {slug:'curtains-upholstery-majlis-cleaning',name:{ar:'تنظيف المجالس العربية',en:'Arabic Majlis Cleaning'},image:'/images/providers/al-naeem/majlis-upholstery-male.webp'},
  ];
  const sections=guide.sections;
  const allFaq=[...guide.faq,...(service?[{q:{ar:'كيف أطلب هذه الخدمة في العين؟',en:'How do I request this service in Al Ain?'},a:{ar:'حدد المنطقة والعدد أو المساحة وأرفق صورًا حديثة. اطلب تأكيد طريقة التنظيف والنطاق والسعر والموعد قبل اعتماد الحجز.',en:'Share your district, quantity or area and recent photos. Confirm method, scope, price and date before booking.'}}]:[])];
  const track=(event,p)=>void trackPublicEvent('click',{metadata:{local_event:event,city:'al-ain',category:'cleaning-services',service:service||'',provider_id:p.id}});
  return <>
    <SEOHead title={model.title} description={model.description} canonicalPath={model.canonical.replace('https://bietalreef.ae','')} alternatePath={model.alternates.en.replace('https://bietalreef.ae','')} noIndex={!model.indexable} noIndexFollow ogImage={'https://bietalreef.ae'+guide.image} structuredData={model.schema} breadcrumbs={model.breadcrumbs}/>
    <div className={styles.page} dir="rtl" lang={locale}>
      <Navbar locale={locale}/>
      <main className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label={en?'Breadcrumbs':'مسار التصفح'}><Link href={prefix||'/'}>{en?'Home':'الرئيسية'}</Link><Trail aria-hidden="true"/>{model.breadcrumbs.map((c,i)=><span key={c.href}><Link href={c.href} aria-current={i===model.breadcrumbs.length-1?'page':undefined}>{c.name}</Link>{i<model.breadcrumbs.length-1&&<Trail aria-hidden="true"/>}</span>)}</nav>
        <section className={styles.hero} aria-labelledby="cleaning-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span/> {en?'YOUR HOME. EVERY DETAIL.':'بيتك يستحق اهتمامًا بالتفاصيل'}</span>
            <h1 id="cleaning-title">{service?model.heading:<>{en?'Cleaning companies & services':'شركات وخدمات التنظيف'}<br/><span>{en?'in Al Ain.':'في العين.'}</span></>}</h1>
            {!service&&<p className={styles.heroSubtitle}>{en?'A cleaner home. A clearer choice.':'بيت أنظف. واختيار أوضح.'}</p>}
            <CleaningReadMore text={t(guide.intro)} en={en}/>
            <div className={styles.heroActions}><a href={service?'#scope':'#cleaning-services'} className={styles.primary}>{service?(en?'Explore the scope':'تعرّف على نطاق الخدمة'):(en?'Choose your service':'اختر خدمة التنظيف')}<Next aria-hidden="true"/></a><a href="#prepare-request" className={styles.secondary}>{en?'Prepare your request':'جهّز طلبك'}</a></div>
            <div className={styles.heroMeta}><span><MapPin aria-hidden="true"/>{en?'Al Ain · Abu Dhabi':'العين · أبوظبي'}</span><span><CheckCheck aria-hidden="true"/>{en?'Clear scope before booking':'نطاق واضح قبل الحجز'}</span></div>
          </div>
          <figure className={styles.heroImage}><Image src={guide.image} alt={en?'Illustration of professional cleaning; not a verified completed project':'صورة توضيحية لخدمات التنظيف، وليست توثيقًا لمشروع منفذ'} fill sizes="(max-width: 700px) 100vw, 50vw" priority/><figcaption><Sparkles aria-hidden="true"/><span>{en?'Care for the spaces you live in.':'عناية بالمساحات التي تعيش فيها.'}<small>{en?'Illustrative service image':'صورة توضيحية للخدمة'}</small></span></figcaption></figure>
        </section>
        <nav className={styles.jumpNav} aria-label={en?'On this page':'داخل الصفحة'}>{[[service?'#scope':'#cleaning-services',en?'Services':'الخدمات'],['#companies',en?'Companies':'الشركات'],['#cost',en?'Pricing':'التكلفة'],['#guide',en?'Cleaning guide':'دليل التنظيف'],['#questions',en?'Questions':'الأسئلة']].map(([href,title])=><a href={href} key={href}>{title}</a>)}</nav>
        {!service&&<p className={styles.sectionIntro}>{en?'Looking for hourly home cleaning? ':'تبحث عن تنظيف المنازل بالساعة؟ '}<Link className={styles.textLink} href={`${prefix}/uae/abu-dhabi/al-ain/hourly-cleaning`}>{en?'Explore the dedicated section':'استكشف القسم المستقل'}</Link></p>}
        <section id="companies" className={styles.section} aria-labelledby="company-heading"><div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'CHOOSE WITH CONFIDENCE':'تعرّف على الجهة قبل التواصل'}</span><h2 id="company-heading">{!exactMatch ? (en?'Related cleaning companies in Al Ain':'شركات تنظيف في العين ذات خدمات مرتبطة') : (en?'Cleaning companies in Al Ain':'شركات التنظيف في العين')}</h2></div><BuildingLabel en={en}/></div>{!exactMatch && <p className={styles.sectionIntro} role="status">{en?'There is no independently published service card confirming that these companies offer this exact cleaning service. They are shown for related published cleaning work only. Ask each company to confirm the requested service before contacting or booking.':'لا توجد حاليًا بطاقة خدمة منشورة تثبت تقديم هذه الخدمة تحديدًا. الشركات التالية لديها خدمات تنظيف أخرى منشورة وتغطية معتمدة في العين؛ لا نعرضها باعتبارها متخصصة في هذه الخدمة. استفسر من الشركة عن توفر الخدمة المطلوبة قبل الاتفاق.'}</p>}
          {viewProviders.length?<div className={styles.providers}>{viewProviders.map(p=><article className={styles.provider} key={p.id}><header><Image src={p.image} width={56} height={56} alt={t(p.name)}/><div><h3><Link href={`${prefix}/providers/${p.slug}`}>{t(p.name)}</Link></h3>{p.verified&&<span><ShieldCheck aria-hidden="true"/>{en?'Verified business':'نشاط موثّق'}</span>}</div></header><p><MapPin aria-hidden="true"/>{en?'Service coverage: Al Ain':'نطاق الخدمة: العين'}</p><div className={styles.providerTags}>{p.services.filter(s=>s.category==='cleaning-services').slice(0,3).map(s=><span key={s.id}>{t(s.title)}</span>)}</div><Link className={styles.primary} href={`${prefix}/providers/${p.slug}`} onClick={()=>track('provider_view_from_area',p)}>{en?'View business profile':'عرض ملف الشركة'}<Next aria-hidden="true"/></Link><div className={styles.contactLinks}>{p.phone&&<a href={`tel:${p.phone}`} onClick={()=>track('phone_click',p)}><Phone aria-hidden="true"/>{en?'Call':'اتصال'}</a>}{p.whatsapp&&<a href={`https://wa.me/${p.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" onClick={()=>track('whatsapp_click',p)}><MessageCircle aria-hidden="true"/>{en?'WhatsApp':'واتساب'}</a>}</div></article>)}</div>:<div className={styles.emptyState}><span><ShieldCheck aria-hidden="true"/></span><div><h3>{en?'Need help choosing a company?':'تحتاج مساعدة في اختيار الشركة؟'}</h3><p>{en?'Tell us your service and district. Biet Alreef customer service can help you find an option suited to your home.':'حدّد الخدمة ومنطقتك، وإذا لم تجد ما يناسب احتياجك فخدمة عملاء بيت الريف دائمًا معك لمساعدتك في الاختيار.'}</p></div><a href="https://wa.me/971564456337" className={styles.textLink}>{en?'Contact customer service':'تواصل مع خدمة العملاء'}<Next aria-hidden="true"/></a></div>}
        </section>
        {!service?<section id="cleaning-services" className={styles.section} aria-labelledby="services-heading">
          <div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'START WITH WHAT YOU NEED':'ابدأ من احتياجك'}</span><h2 id="services-heading">{en?'What needs a little care?':'ما الذي يحتاج إلى عناية؟'}</h2></div><span className={styles.sectionNote}>{en?'Explore the scope first':'تعرّف على التفاصيل أولًا'}</span></div>
          <div className={styles.serviceGrid}>{CLEANING_SERVICES.map((item,i)=><article key={item.slug} className={`${styles.serviceCard} ${i===0?styles.wideCard:''}`}>
            <Link href={detailsHref(item.slug)} className={styles.serviceImage} tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 50vw, 30vw"/><span>{t(item.tag)}</span></Link>
            <div className={styles.serviceCopy}><h3><Link href={detailsHref(item.slug)}>{t(item.title)}</Link></h3><CleaningReadMore text={t(item.intro)} en={en}/><Link href={detailsHref(item.slug)} className={styles.textLink}>{en?'Service details':'تفاصيل الخدمة'}<Next aria-hidden="true"/></Link></div>
          </article>)}</div>
        </section>:<section id="scope" className={styles.section} aria-labelledby="scope-heading"><div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'AGREE ON EVERY DETAIL':'اتفق على كل التفاصيل'}</span><h2 id="scope-heading">{en?'What is included?':'ما الذي يشمله التنظيف؟'}</h2></div><Link href={hub} className={styles.textLink}>{en?'All services':'كل الخدمات'}<Next aria-hidden="true"/></Link></div><p className={styles.sectionIntro}>{en?'Use this guide when discussing a quotation. The provider must confirm each item.':'استخدم هذه البنود عند مناقشة العرض؛ تؤكد الشركة كل بند قبل الحجز.'}</p><div className={styles.scopeGrid}><article className={styles.scopeCard}><h3><CheckCheck aria-hidden="true"/>{en?'Discuss these inclusions':'بنود تناقشها ضمن العرض'}</h3><ul>{t(guide.includes).map(v=><li key={v}><Check aria-hidden="true"/>{v}</li>)}</ul></article><article className={`${styles.scopeCard} ${styles.scopeNeutral}`}><h3><ClipboardList aria-hidden="true"/>{en?'Confirm separately':'تحتاج اتفاقًا منفصلًا'}</h3><ul>{t(guide.excludes).map(v=><li key={v}><span className={styles.listDot}/>{v}</li>)}</ul></article></div></section>}
        <section id="prepare-request" className={styles.prepare} aria-labelledby="request-heading"><div className={styles.prepareCopy}><span className={styles.kicker}>{en?'LESS BACK AND FORTH':'تفاصيل قليلة. طلب أوضح.'}</span><h2 id="request-heading">{en?'Tell us what your home needs.':'حدّد احتياج بيتك.'}</h2><p>{en?'Choose your service and district to prepare the next step.':'اختر الخدمة والمنطقة لتجهيز الخطوة التالية.'}</p></div><div className={styles.requestFields}><label htmlFor="cleaning-service">{en?'Service':'الخدمة'}<select id="cleaning-service" value={chosenService} onChange={e=>setChosenService(e.target.value)}><option value="">{en?'Choose a service':'اختر الخدمة'}</option>{CLEANING_SERVICES.map(s=><option key={s.slug} value={s.slug}>{t(s.title)}</option>)}</select></label><label htmlFor="cleaning-district">{en?'Al Ain district':'المنطقة داخل العين'}<select id="cleaning-district" value={district} onChange={e=>setDistrict(e.target.value)}><option value="">{en?'Choose your district':'اختر المنطقة'}</option>{areas.map(a=><option key={a.slug} value={a.slug}>{en?a.nameEn:a.nameAr}</option>)}</select></label><Link href={quoteHref} className={styles.primary}>{en?'Continue your request':'استكمل تفاصيل طلبك'}<Next aria-hidden="true"/></Link><p className={styles.fieldNote}>{en?'Coverage and availability are confirmed before booking.':'تُؤكَّد التغطية وإمكانية التنفيذ قبل الحجز.'}</p></div></section>
        <div className={styles.editorialLayout}>
          <div className={styles.editorialMain}>
            <section id="cost" className={styles.section}><div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'UNDERSTAND THE QUOTE':'قبل مقارنة الأسعار'}</span><h2>{en?'What affects cleaning cost?':'كيف تتحدد تكلفة التنظيف؟'}</h2></div></div><CleaningReadMore en={en} text={en?'Cleaning costs depend on the service and area or item count, the material, condition, access and agreed extras. A quote for a furnished villa cannot be compared with an empty flat, and a sofa seat is different from a full majlis. Ask for a written scope, included materials and transport, applicable taxes and the final total. Biet Alreef customer service can help you prepare and compare quotations.':'تتحدد التكلفة حسب نوع الخدمة والمساحة أو عدد القطع والخامة وحالة الاتساخ وإمكانية الوصول والإضافات المتفق عليها. لا يُقارن تنظيف فيلا مفروشة بشقة فارغة، ولا تنظيف مقعد كنب بمجلس كامل. اطلب نطاقًا مكتوبًا والمواد والتنقل والضريبة المستحقة والمبلغ النهائي. خدمة عملاء بيت الريف تساعدك في تجهيز الطلب ومقارنة العروض.'}/><div className={styles.costFactors}>{[[en?'Size & count':'المساحة والعدد','01'],[en?'Material & condition':'الخامة والحالة','02'],[en?'Scope & access':'النطاق والوصول','03']].map(([v,n])=><div key={n}><span>{n}</span><h3>{v}</h3></div>)}</div></section>
            <section id="guide" className={styles.section}><div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'A PRACTICAL GUIDE':'إجابات تساعدك تختار'}</span><h2>{en?'Before the team arrives':'قبل وصول فريق التنظيف'}</h2></div><span className={styles.sectionNote}>{en?'Details when you need them':'التفاصيل عندما تحتاجها'}</span></div><div className={styles.guideArticles}>{sections.map((s,i)=><article key={s.title.ar}><span className={styles.articleNumber}>{String(i+1).padStart(2,'0')}</span><div><h3>{t(s.title)}</h3><CleaningReadMore text={t(s.body)} en={en}/></div></article>)}</div></section>
            <section id="questions" className={styles.section}><div className={styles.sectionHead}><div><span className={styles.kicker}>{en?'QUICK ANSWERS':'بقي عندك سؤال؟'}</span><h2>{en?'Frequently asked questions':'أسئلة قبل الحجز'}</h2></div></div><div className={styles.faq}>{allFaq.map(f=><details key={f.q.ar}><summary><h3>{t(f.q)}</h3><ChevronDown aria-hidden="true"/></summary><p>{t(f.a)}</p></details>)}</div></section>
          </div>
          <aside className={styles.checklist}><span className={styles.asideIcon}><ClipboardList aria-hidden="true"/></span><h2>{en?'Ready for a clearer quote?':'للحصول على عرض أوضح'}</h2><p>{en?'Prepare these details before you contact a company.':'جهّز هذه التفاصيل قبل التواصل مع الشركة.'}</p><ul>{(service?t(guide.checklist):(en?['Your service and Al Ain district','Area, item count and dimensions','Recent photos and priority areas','Preferred date and access details']:['الخدمة والمنطقة داخل العين','المساحة أو عدد القطع والمقاسات','صور حديثة والأماكن ذات الأولوية','الموعد المناسب وتفاصيل الوصول'])).map(v=><li key={v}><Check aria-hidden="true"/>{v}</li>)}</ul><a className={styles.primary} href="#prepare-request">{en?'Prepare my request':'جهّز طلبي'}<Next aria-hidden="true"/></a><small>{en?'Share the precise address privately.':'شارك العنوان الدقيق بشكل خاص.'}</small></aside>
        </div>
        <section className={styles.areasSection}><div><MapPin aria-hidden="true"/><h2>{en?'Your district in Al Ain':'منطقتك داخل العين'}</h2></div><p>{en?'Select a district to prepare your request. Confirm coverage with the provider.':'اختر المنطقة لتجهيز الطلب. تأكد من تغطيتها مع الشركة قبل الحجز.'}</p><div className={styles.areaChips}>{areas.map(a=><button key={a.slug} type="button" aria-pressed={district===a.slug} onClick={()=>setDistrict(a.slug)}>{en?a.nameEn:a.nameAr}{district===a.slug&&<Check aria-hidden="true"/>}</button>)}</div><p className={styles.selectionStatus} role="status">{district?(en?'Selected: ':'المنطقة المختارة: ')+(en?areas.find(a=>a.slug===district).nameEn:areas.find(a=>a.slug===district).nameAr):''}</p></section>
        {service&&<section className={styles.section}><div className={styles.sectionHead}><h2>{en?'Explore more cleaning services':'خدمات أخرى لبيتك'}</h2><Link href={hub} className={styles.textLink}>{en?'All services':'كل الخدمات'}<Next aria-hidden="true"/></Link></div><div className={styles.related}>{CLEANING_SERVICES.filter(s=>s.slug!==service).map(s=><Link key={s.slug} href={linkMore(s.slug)}><Image src={s.image} width={64} height={48} alt=""/><span>{t(s.title)}</span><Next aria-hidden="true"/></Link>)}</div>
          <div className={styles.sectionHead} style={{marginTop:24}}><div><span className={styles.kicker}>{en?'AL NUAIM CLEANING SERVICES':'شركة النعيم لخدمات التنظيف'}</span><h3>{en?'Explore these services with Al Nuaim':'بطاقات خدمات النعيم المرتبطة بهذا القسم'}</h3></div><Link href={`${prefix}/providers/al-naeem-cleaning-services`} className={styles.textLink}>{en?'Company page':'صفحة الشركة'}<Next aria-hidden="true"/></Link></div>
          <div className={styles.related}>
            {alNaeemOffers.map((v,i)=><Link key={i} href={`${prefix}/providers/al-naeem-cleaning-services/services/${v.slug}`}><Image src={v.image} width={64} height={48} alt="" /><span>{v.name[locale]} — {en?'Al Nuaim':'النعيم'}</span><Next aria-hidden="true"/></Link>)}
          </div>
        </section>}
        <p className={styles.editorialNote}>{en?'Your home, your priorities. Biet Alreef customer service is here to help you choose.':'بيتك وأولوياتك. وخدمة عملاء بيت الريف دائمًا معك لمساعدتك في الاختيار.'}</p>
      </main>
      <Footer locale={locale} showRequestCTA={false}/>
    </div>
  </>;
}
function BuildingLabel({en}) {return <span className={styles.companyLabel}><ShieldCheck aria-hidden="true"/>{en?'Choose what suits your needs':'اختر الأنسب لاحتياجك'}</span>;}
