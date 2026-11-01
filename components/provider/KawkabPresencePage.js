import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import KawkabMobileContactBar from './KawkabMobileContactBar';
import KawkabServiceVisual from './KawkabServiceVisual';
import { KawkabProjectShowcase, KawkabServiceCoverGallery } from './KawkabPortfolioSections';
import {
  KAWKAB_PROFILE, KAWKAB_PROVIDER_CODE, KAWKAB_COVERAGE, KAWKAB_SPECIALTIES,
  KAWKAB_IMAGES, KAWKAB_GALLERY, KAWKAB_DETAILS, KAWKAB_ORIGIN, KAWKAB_HERO, KAWKAB_LOGO, KAWKAB_BRAND_GALLERY, KAWKAB_AL_AIN_AREAS, kawkabPath, kawkabWhatsapp, kawkabServicePath, kawkabServiceImage, kawkabAreaPath,
} from '../../lib/kawkabPresence';

const i18n = {
  ar:{home:'الرئيسية',services:'التخصصات',areas:'مناطق الخدمة',gallery:'المشاريع والأغلفة',badge:'ملف شركة معتمد لدى بيت الريف',business:'كوكب الصعيد للخدمات الفنية',sub:'الدهانات، التشطيبات، الصيانة والديكور الداخلي',intro:'خدمات فنية للمنازل والمباني، تشمل الدهانات والبلاستر وورق الجدران والنجارة والسباكة والتكييف. تعرّف على التخصصات ونطاق العمل ثم اطلب عرض سعر مناسبًا لمشروعك.',call:'اتصال مباشر',whatsapp:'طلب عرض سعر',learn:'تصفح التخصصات',imageTitle:'معرض الديكور والتشطيبات',imageDesc:'مجموعة صور مقدمة من الشركة، تعرض نماذج للدهانات والتشطيبات والديكور الداخلي.',areasTitle:'الإمارات المشمولة بنطاق الخدمة',areasDesc:'تواصل مع كوكب الصعيد لتأكيد توفر الخدمة وتحديد الموعد المناسب في منطقتك.',seeAll:'عرض التفاصيل',servicesTitle:'تخصصات كوكب الصعيد',servicesDesc:'تعرّف على تخصصات كوكب الصعيد واختر الخدمة المناسبة لمشروعك، ثم اطلب عرض سعر حسب نطاق العمل.',ask:'استفسر عن الخدمة',galleryTitle:'المشاريع وأغلفة الخدمات',galleryDesc:'مشروع واحد يجمع الصور المترابطة، ومكتبة منفصلة لأغلفة التشطيبات والخدمات.',detailTitle:'تفاصيل التشطيبات والديكورات',note:'اختر التفاصيل الأقرب لاحتياجاتك وأرسل صور موقعك للحصول على عرض مناسب.',areasNote:'للمعاينة أو تحديد الخدمة المناسبة، أرسل عنوان الموقع وتفاصيل العمل إلى كوكب الصعيد.',lead:'اطلب تقييم مشروعك',leadText:'حدد الإمارة ونوع الخدمة ومساحة العمل والوقت المناسب في رسالة واتساب للحصول على عرض سعر.',back:'ملف الشركة',directory:'دليل الشركات والمهنيين',emirateDirectory:'دليل الإمارة',noOffer:'يتم تحديد الخدمة والسعر وفق المعاينة أو وصف العمل.',official:'رقم المزود',phone:'الهاتف',faq:'قبل طلب عرض السعر',faq1:'ما البيانات المطلوبة لطلب عرض سعر؟',answer1:'حدد المنطقة، نوع العمل، المساحة التقريبية، وأرسل صور الموقع إن توفرت.',faq2:'هل تتوفر الخدمة في جميع أحياء العين؟',answer2:'أرسل عنوان الموقع وتفاصيل العمل عبر واتساب للتأكد من توفر الخدمة والموعد المناسب.',homeText:'الملف الرئيسي',galleryText:'المشاريع والأغلفة',areasText:'نطاق التغطية',servicesText:'مجالات العمل',brandingTitle:'هوية كوكب الصعيد والخدمات الفنية',brandingDesc:'اكتشف صور الهوية والعروض البصرية لأعمال الدهانات والديكور والصيانة، مع شرح التفاصيل التي تساعدك على تحديد الخدمة المناسبة.',ainTitle:'خدمات فنية لمناطق مدينة العين',ainDesc:'اختر منطقتك في العين وأرسل موقع العقار ونوع العمل للحصول على استفسار مخصص حول الدهانات أو البلاستر أو ورق الجدران أو الصيانة.',areaAsk:'استفسر عن هذه المنطقة',processTitle:'من المعاينة إلى عرض السعر',processDesc:'يساعد تحديد حالة الموقع ومساحة العمل ونوع التشطيب في تقديم عرض واضح يناسب احتياجات العقار.',workGuideTitle:'ما الذي يؤثر في جودة التشطيب؟',workGuide:'قبل الصباغة، ينبغي فحص الطبقات القديمة والشروخ ومناطق الرطوبة وتجهيز السطح وفق حالته. أما ورق الجدران والأرضيات الخشبية فيحتاجان إلى قياسات دقيقة وحالة سطح مناسبة. تشمل تفاصيل عرض السعر نطاق الأعمال والمواد والتحضير والتنظيف والمدة المتوقعة.',coverCaption:'كوكب الصعيد للخدمات الفنية · الدهانات والديكور والصيانة'},
  en:{home:'Home',services:'Specialties',areas:'Service areas',gallery:'Projects & service covers',badge:'Verified business profile on Biet Al Reef',business:'Kawkab Al Saeed Technical Services',sub:'Painting, maintenance, finishing and interior décor',intro:'Technical services for homes and buildings, including painting, plaster, wallpaper, carpentry, plumbing and air conditioning. Explore the areas covered and request a quote for your requirements.',call:'Call now',whatsapp:'Request a quote',learn:'Explore specialties',imageTitle:'Interior décor and finishing gallery',imageDesc:'Provider-supplied images of painting, finishing and interior design examples.',areasTitle:'Emirates served',areasDesc:'Contact Kawkab Al Saeed to confirm availability and arrange a suitable visit to your location.',seeAll:'View details',servicesTitle:'Kawkab Al Saeed specialties',servicesDesc:'Explore the company’s specialties and request a quote tailored to your project.',ask:'Ask about this service',galleryTitle:'Projects and service covers',galleryDesc:'One grouped interior design project and a separate library of service and finishing cover photos.',detailTitle:'Finishing and décor details',note:'Choose the finishes that suit your space and share site photos for a tailored quote.',areasNote:'For a consultation or to confirm the service, share your site address and requirements.',lead:'Discuss your project',leadText:'Send your emirate, service, approximate area and preferred timing for a tailored quote.',back:'Company profile',directory:'Companies & professionals',emirateDirectory:'Emirate directory',noOffer:'Scope and pricing depend on the requirements and site assessment.',official:'Provider ID',phone:'Phone',faq:'Before requesting a quote',faq1:'What should I include in my quote request?',answer1:'Share your location, type of work, approximate size and photos if available.',faq2:'Do you cover every neighborhood in Al Ain?',answer2:'Share your address and requirements by WhatsApp to confirm service availability and timing.',homeText:'Company profile',galleryText:'Projects & covers',areasText:'Service coverage',servicesText:'Areas of work',brandingTitle:'Kawkab Al Saeed brand and technical services',brandingDesc:'Browse branded company visuals and technical-service presentations with clear details to help you choose the right scope.',ainTitle:'Technical services across Al Ain districts',ainDesc:'Choose your Al Ain district and share your property location and requirements to ask about painting, plaster, wallpaper or maintenance.',areaAsk:'Ask about this district',processTitle:'From assessment to quotation',processDesc:'Site condition, surface area and the selected finish help define a clear, tailored scope of work.',workGuideTitle:'What affects the quality of finishing?',workGuide:'Before painting, existing coatings, cracks and damp areas need to be assessed and surfaces prepared appropriately. Wallpaper and wooden flooring also depend on accurate measurements and suitable substrates. A useful quotation identifies the scope, materials, preparation, cleanup and expected timing.',coverCaption:'Kawkab Al Saeed Technical Services · painting, décor and maintenance'}
};
const routeLabels = (t) => ({home:t.home, services:t.services, 'service-areas':t.areas, gallery:t.gallery});
const local = (image,key,locale) => image?.[key+'_'+locale] || image?.[key+'_ar'] || '';
const abs = path => path.startsWith('https://')?path:KAWKAB_ORIGIN+path;
function ImageCard({image,locale,prefetch=false,detailed=false}){
  return <figure className="min-w-0 overflow-hidden rounded-xl border border-[#e8e1d6] bg-white">
    <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label={local(image,'alt',locale)} className="block overflow-hidden"><img src={image.url} alt={local(image,'alt',locale)} title={local(image,'image_title',locale)} width={image.width} height={image.height}
      loading={prefetch?'eager':'lazy'} fetchPriority={prefetch?'high':undefined} decoding="async" className="aspect-[4/3] w-full bg-[#eee9e1] object-cover transition-transform duration-300 hover:scale-[1.03]" /></a>
    <figcaption className="px-3 py-3">
      <p className="line-clamp-1 text-sm font-semibold text-[#292722]">{local(image,'image_title',locale).split('|')[0].trim()}</p>
      <p className={`${detailed ? 'text-sm leading-6' : 'line-clamp-2 text-xs leading-5'} mt-1 text-[#646058]`}>{local(image,'description',locale)||local(image,'caption',locale)}</p>
    </figcaption>
  </figure>;
}
function SectionTitle({title,desc,href,cta}){
  return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div className="min-w-0"><h2 className="text-xl font-bold tracking-tight text-[#28231f] sm:text-2xl">{title}</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-[#6b6359]">{desc}</p></div>{href&&<Link href={href} className="shrink-0 text-sm font-semibold text-[#836334] hover:underline">{cta} ←</Link>}</div>;
}
function Services({locale,short=false}){
 const t=i18n[locale],items=KAWKAB_SPECIALTIES;
 return <section className="mx-auto max-w-6xl px-3 py-5 md:px-4 md:py-10" id="company-specialties">
  <SectionTitle title={t.servicesTitle} desc={t.servicesDesc} href={short?kawkabPath(locale,'services'):null} cta={t.seeAll}/>
  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
   {items.map((item,index)=><Link key={item.id} href={kawkabServicePath(locale,item.id)}
      className="flex min-w-0 flex-col rounded-xl border border-[#e5dacb] bg-white p-3 transition hover:border-[#bd9f73] md:p-5">
     <span className="text-xs font-semibold text-[#9b784a]">{String(index+1).padStart(2,'0')}</span>
     <h3 className="mt-2 text-sm font-bold leading-6 text-[#293346] md:text-lg">{item[locale]}</h3>
     <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#665d52] md:mt-3 md:line-clamp-none md:text-sm md:leading-7">{item[locale+'Desc']}</p>
     <span className="mt-3 hidden text-sm font-bold text-[#89633c] md:block">{locale==='en'?'Explore service':'تفاصيل الخدمة'} ←</span>
   </Link>)}
  </div>
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
 return <><KawkabProjectShowcase locale={locale} compact={short}/><KawkabServiceCoverGallery locale={locale} compact={short}/></>;
}

function BrandingGallery({locale,short=false}){
 const t=i18n[locale],list=short?KAWKAB_BRAND_GALLERY.slice(0,4):KAWKAB_BRAND_GALLERY;
 return <section className="mx-auto w-full max-w-6xl px-4 py-7 sm:py-10" id="company-identity">
  <SectionTitle title={t.brandingTitle} desc={t.brandingDesc} href={short?kawkabPath(locale,'gallery'):null} cta={t.seeAll}/>
  <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:gap-4">{list.map(image=><ImageCard key={image.id} locale={locale} image={image} detailed={!short}/>)}</div>
 </section>;
}
function AlAinCoverage({locale,short=false}){
 const t=i18n[locale],items=short?KAWKAB_AL_AIN_AREAS.slice(0,6):KAWKAB_AL_AIN_AREAS;
 return <section className="mx-auto w-full max-w-6xl px-4 py-7 sm:py-10" id="al-ain-districts">
  <SectionTitle title={t.ainTitle} desc={t.ainDesc} href={short?kawkabPath(locale,'al-ain'):null} cta={t.seeAll}/>
  <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">{items.map(area=><article key={area.slug} id={'district-'+area.slug} className={`min-w-0 rounded-xl border border-[#e8dfd4] bg-white p-3 sm:p-4 ${short && items.indexOf(area)>3 ? "hidden md:block" : ""}`}>
   <h3 className="truncate text-sm font-bold text-[#302b24]">{area[locale]}</h3>
   <Link className="mt-2 inline-flex text-xs font-semibold leading-6 text-[#806333]" href={`${kawkabAreaPath(locale,area.slug)}/general-maintenance`}>{locale==='en'?'View maintenance services':'خدمات الصيانة في المنطقة'} ←</Link>
  </article>)}</div>
  {!short&&<div className="mt-5 rounded-xl bg-[#f3eee5] p-4"><h3 className="font-bold">{t.processTitle}</h3><p className="mt-2 text-sm leading-7 text-[#665e52]">{t.processDesc}</p><p className="mt-2 text-sm leading-7 text-[#665e52]">{t.workGuide}</p></div>}
 </section>;
}
function ProcessGuide({locale}){
 const t=i18n[locale];return <section className="mx-auto max-w-6xl px-4 py-7"><h2 className="text-xl font-bold">{t.workGuideTitle}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#62594d]">{t.workGuide}</p>
 <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">{(locale==='en'?['Share site location','Describe surfaces and work','Select finishes and materials','Confirm scope and quote']:['حدد الموقع والمساحة','اشرح حالة الجدران ونوع العمل','اختر الألوان والخامات','راجع نطاق العمل وعرض السعر']).map((item,i)=><div key={item} className="rounded-xl border border-[#e8dfd4] bg-white p-3"><span className="text-xs font-semibold text-[#977746]">{String(i+1).padStart(2,'0')}</span><h3 className="mt-2 text-sm font-semibold">{item}</h3></div>)}</div></section>;
}

// Detailed, helpful service guidance remains in the rendered HTML. Mobile keeps a
// compact first view with optional details; desktop reads as a complete guide.
const WORK_NOTES = {
  ar: [
    {name:'الدهانات والديكور',when:'تجديد لون الجدران والأسقف أو معالجة التشققات والدهان المتقشر.',inspect:'حالة الدهان القديم، الرطوبة، استواء السطح، عدد الطبقات ونوع التشطيب.',quote:'مساحة الجدران والأسقف، صور الموقع، اللون المطلوب ونطاق الحماية والتنظيف.'},
    {name:'البلاستر وتجهيز الأسطح',when:'تسوية الجدران قبل أعمال الطلاء أو معالجة عيوب السطح.',inspect:'درجة استواء الجدار، مناطق الشروخ، التماسك ونقاط الرطوبة.',quote:'المساحة، حالة السطح، سمك المعالجة إن لزم والمراحل المطلوبة قبل الدهان.'},
    {name:'ورق الجدران',when:'تنفيذ جدار مميز أو تحديث تشطيب غرفة دون تغيير كامل الديكور.',inspect:'نعومة الجدار وجفافه، أبعاد الزوايا، فتحات الكهرباء ونقشة الورق.',quote:'القياسات، نوع الورق، عدد الجدران وصور الزوايا والتفاصيل.'},
    {name:'النجارة والأرضيات الخشبية',when:'تجديد عناصر خشبية أو تركيب تشطيب أرضيات يناسب استخدام المساحة.',inspect:'المقاسات، استواء الأرضية، الرطوبة، طبيعة الاستخدام والتفاصيل الطرفية.',quote:'رسم أو قياسات مبدئية، صور الموقع، نوع الخامة وأعمال الفك أو التركيب.'},
    {name:'السباكة والتمديدات',when:'مراجعة تمديدات أو تجهيز نقاط صحية ضمن أعمال الصيانة والتجديد.',inspect:'موضع المشكلة أو نقطة التمديد، إمكانية الوصول وحالة الوصلات.',quote:'وصف العمل، صور واضحة، موقع العقار وتحديد ما إذا كان هناك تكسير أو إعادة تشطيب.'},
    {name:'التكييف والتهوية',when:'تركيب أو صيانة أجهزة التكييف أو تحسين توزيع التهوية.',inspect:'نوع النظام، الموديل، حالة التركيب، مسار الهواء والتصريف.',quote:'صور الوحدة، الموديل، وصف العطل أو العمل المطلوب والموقع.'}
  ],
  en: [
    {name:'Painting and decorating',when:'Refresh walls and ceilings or address cracking and worn coatings.',inspect:'Existing paint, moisture, surface flatness, preparation and finish.',quote:'Approximate area, site images, preferred colour and protection requirements.'},
    {name:'Plaster and surface preparation',when:'Prepare uneven or damaged walls before finishing.',inspect:'Surface adhesion, cracks, dampness and levelling needs.',quote:'Area, current condition and expected preparation stages.'},
    {name:'Wallpaper installation',when:'Create an accent wall or refresh a room finish.',inspect:'Wall dryness, corners, outlets, dimensions and pattern repeat.',quote:'Wall sizes, chosen wallpaper and detailed location photographs.'},
    {name:'Carpentry and wooden flooring',when:'Renew woodwork or install an interior floor finish.',inspect:'Measurements, level, moisture, usage and finishing edges.',quote:'Dimensions, images, material preference and installation requirements.'},
    {name:'Plumbing and sanitary work',when:'Maintain plumbing or adjust sanitary connections during refurbishment.',inspect:'Connection access, problem location and surrounding finishes.',quote:'Service description, photos, location and any associated reinstatement.'},
    {name:'Air conditioning and ventilation',when:'Install, maintain or review air-conditioning and ventilation equipment.',inspect:'Unit model, current condition, airflow and drainage.',quote:'Model, unit photos, symptoms and property location.'}
  ]
};
function DetailedCompanyGuide({locale}) {
  const en=locale==='en';
  const notes=WORK_NOTES[locale];
  const blocks=<>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{notes.map((note,index)=><article key={note.name} className="rounded-xl border border-[#e9dfd0] bg-white p-5">
      <div className="mb-3 hidden h-1 w-12 rounded-full bg-[#cbb08c] md:block" aria-hidden="true"/>
      <span className="text-xs font-semibold text-[#856737]">{String(index+1).padStart(2,'0')}</span>
      <h3 className="mt-1 text-lg font-bold text-[#29251e]">{note.name}</h3>
      <p className="mt-3 text-sm leading-7 text-[#524d43]"><strong>{en?'When it is relevant: ':'متى تحتاجها؟ '}</strong>{note.when}</p>
      <p className="mt-2 text-sm leading-7 text-[#524d43]"><strong>{en?'What to inspect: ':'ما الذي يُراجع؟ '}</strong>{note.inspect}</p>
      <p className="mt-2 text-sm leading-7 text-[#524d43]"><strong>{en?'For a quotation: ':'قبل طلب السعر: '}</strong>{note.quote}</p>
    </article>)}</div>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-[#f2ece2] p-5"><h3 className="font-bold">{en?'Site review and execution scope':'تحديد نطاق العمل قبل التنفيذ'}</h3><p className="mt-2 text-sm leading-7">{en?'A useful quotation separates inspection and preparation, materials, installation or finishing, protection of existing areas, waste removal and expected timing. Confirm the scope with the provider before starting.':'يتضمن عرض السعر الواضح حالة الموقع، أعمال التحضير والمعالجة، الخامات، التنفيذ، حماية الأثاث والأرضيات، التنظيف بعد العمل والمدة المتوقعة. تختلف البنود بحسب المساحة وحالة الموقع ونوع التشطيب، لذا ينبغي الاتفاق عليها مع الشركة قبل التنفيذ.'}</p></div>
      <div className="rounded-xl bg-[#f2ece2] p-5"><h3 className="font-bold">{en?'How to request an accurate quotation':'كيف تطلب عرض سعر أدق؟'}</h3><p className="mt-2 text-sm leading-7">{en?'Send your district and property type, choose one or more specialties, describe the condition and approximate dimensions, and include clear photos. The provider can then confirm availability and discuss an assessment.':'أرسل اسم المنطقة ونوع العقار، وحدد التخصص المطلوب ووصف المشكلة أو التشطيب، ثم أرفق قياسات تقريبية وصورًا واضحة. بعد ذلك يمكن للشركة تأكيد توفر الخدمة ومراجعة ما إذا كانت المعاينة مطلوبة قبل التسعير.'}</p></div>
    </div>
  </>;
  return <section className="mx-auto max-w-6xl px-4 py-5 md:py-12" aria-labelledby="kawkab-detailed-guide">
    <h2 id="kawkab-detailed-guide" className="text-lg font-bold md:text-2xl">{en?'Technical services and quotation guide':'دليل خدمات كوكب الصعيد وتفاصيل طلب عرض السعر'}</h2>
    <p className="mt-2 hidden max-w-4xl text-sm leading-7 text-[#62594d] md:block">{en?'Learn what each trade involves, what to check on site and which details help a contractor prepare a useful quotation. These are general planning guidelines; the actual scope is confirmed with the company.':'تعرف على نطاق كل تخصص وما يجب فحصه قبل البدء والمعلومات التي يحتاجها المقاول لإعداد عرض واضح. هذه إرشادات عامة تساعد العميل على اختيار الخدمة، ويُحدد نطاق التنفيذ الفعلي بالتنسيق مع الشركة.'}</p>
    <div className="mt-4 hidden md:block">{blocks}</div>
    <details className="mt-2 rounded-lg border border-[#e9dfd0] bg-white px-3 py-2 md:hidden"><summary className="cursor-pointer text-xs font-semibold">{en?'Full service and quotation guide':'عرض تفاصيل الخدمات والتسعير'}</summary><div className="mt-3">{blocks}</div></details>
  </section>;
}

function Faq({locale}) {
 const en=locale==='en',t=i18n[locale];
 const items=[
  [t.faq1,t.answer1],
  [t.faq2,t.answer2],
  en?['Does a quotation include materials?','Ask the company to specify materials, preparation, installation, clean-up and any exclusions in writing before confirming.']:['هل يشمل عرض السعر الخامات؟','اطلب توضيح تكلفة الخامات، وتجهيز الأسطح والتنفيذ والتنظيف وأي استثناءات ضمن عرض السعر قبل الموافقة.'],
  en?['Is a site visit needed before pricing?','Photos and approximate dimensions help, but plaster, dampness, plumbing or equipment faults may require an on-site inspection.']:['هل تحتاج الأعمال إلى معاينة؟','تساعد الصور والمقاسات في تقييم الطلب، لكن معالجة الرطوبة والبلاستر وأعطال السباكة أو التكييف قد تحتاج فحص الموقع.'],
  en?['What should I check before painting or wallpaper?','Check the walls for moisture and cracks, then agree on substrate preparation, finish, colour or pattern and the number of coats or rolls.']:['كيف أجهّز المنزل قبل الدهان أو ورق الجدران؟','راجع حالة الجدران والشروخ والرطوبة، ثم اتفق على التجهيز ونوع الخامة واللون أو النقشة وحماية الأثاث أثناء التنفيذ.'],
  en?['How do I contact Kawkab Al Saeed?','Choose a specialty, provide your area and photos, and use the company call or WhatsApp buttons to ask about availability and a quotation.']:['كيف أتواصل مع كوكب الصعيد؟','اختر الخدمة، وحدد المنطقة وأرسل صور الموقع والمقاسات إن وجدت، ثم تواصل عبر زر الاتصال أو واتساب الخاص بالشركة.']
 ];
 return <section id="company-faq" className="mx-auto max-w-6xl px-3 py-6 sm:px-4 md:py-12" aria-labelledby="company-faq-title">
  <h2 id="company-faq-title" className="mb-3 text-lg font-extrabold md:mb-6 md:text-2xl">{en?'Frequently asked questions':'الأسئلة الشائعة عن كوكب الصعيد'}</h2>
  <div className="grid gap-2 md:grid-cols-2 md:gap-4">{items.map(([question,answer])=><div key={question} className="rounded-xl border border-[#e9e1d7] bg-white">
   <details className="group p-3 md:hidden"><summary className="cursor-pointer text-sm font-bold leading-6">{question}</summary><p className="mt-2 text-sm leading-7 text-[#625b54]">{answer}</p></details>
   <div className="hidden p-5 md:block"><h3 className="font-bold leading-7">{question}</h3><p className="mt-2 text-sm leading-8 text-[#625b54]">{answer}</p></div>
  </div>)}</div>
 </section>;
}
export default function KawkabPresencePage({locale='ar',section='home'}){
  const lang=locale==='en'?'en':'ar', t=i18n[lang], direction=lang==='ar'?'rtl':'ltr';
  const paths={ar:kawkabPath('ar',section),en:kawkabPath('en',section)};
  const titles={home:t.business,services:t.servicesTitle,'service-areas':t.areasTitle,gallery:t.galleryTitle,'al-ain':t.ainTitle};
  const descriptions={home:t.intro,services:t.servicesDesc,'service-areas':t.areasDesc,gallery:t.galleryDesc,'al-ain':t.ainDesc};
  const currentPath=paths[lang],currentUrl=abs(currentPath);
  const mainImage=KAWKAB_GALLERY[0];
  const imagesForPage=section==='gallery'?[KAWKAB_HERO,KAWKAB_LOGO,...KAWKAB_IMAGES]:section==='home'?[KAWKAB_HERO,KAWKAB_LOGO,...KAWKAB_GALLERY]:[];
  const pageSchema={ '@context':'https://schema.org','@graph':[
    {'@type':'HomeAndConstructionBusiness','@id':abs(kawkabPath('ar'))+'#business', name:KAWKAB_PROFILE.nameAr,alternateName:KAWKAB_PROFILE.nameEn,url:abs(kawkabPath('ar')),telephone:'+971556485364',identifier:KAWKAB_PROVIDER_CODE,areaServed:KAWKAB_COVERAGE.map(area=>({'@type':'AdministrativeArea',name:area.en})),image:[KAWKAB_HERO,KAWKAB_LOGO,...KAWKAB_IMAGES].map(image=>abs(image.url)),description:KAWKAB_PROFILE.descriptionEn},
    {'@type':'WebPage','@id':currentUrl+'#webpage',url:currentUrl,name:titles[section],description:descriptions[section],inLanguage:lang==='en'?'en-AE':'ar-AE',about:{'@id':abs(kawkabPath('ar'))+'#business'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:t.directory,item:abs(lang==='en'?'/en/providers':'/providers')},{'@type':'ListItem',position:2,name:t.business,item:abs(kawkabPath(lang))},...(section==='home'?[]:[{'@type':'ListItem',position:3,name:titles[section],item:currentUrl}])]},
    ...imagesForPage.map((image,index)=>({'@type':'ImageObject',contentUrl:abs(image.url),name:local(image,'image_title',lang),caption:local(image,'caption',lang),width:image.width,height:image.height,encodingFormat:'image/webp',representativeOfPage:index===0&&section==='home'})),
  ]};
  const pageTitle=section==='home' ? `${t.business} | ${lang==='en'?'Biet Al Reef':'بيت الريف'}` : `${titles[section]} | ${t.business} | ${lang==='en'?'Biet Al Reef':'بيت الريف'}`;
  return <div dir={direction} lang={lang==='en'?'en':'ar'} className="min-h-screen bg-[#fbfaf7] pb-20 text-[#292520] sm:pb-0">
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={descriptions[section]} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={currentUrl}/>
      <link rel="alternate" hrefLang="ar-AE" href={abs(paths.ar)}/>
      <link rel="alternate" hrefLang="en-AE" href={abs(paths.en)}/>
      <link rel="alternate" hrefLang="x-default" href={abs(paths.ar)}/>
      <meta property="og:type" content="website"/><meta property="og:url" content={currentUrl}/><meta property="og:title" content={pageTitle}/><meta property="og:description" content={descriptions[section]}/><meta property="og:image" content={abs(KAWKAB_HERO.url)}/><meta property="og:locale" content={lang==='en'?'en_AE':'ar_AE'}/><meta name="twitter:card" content="summary_large_image"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(pageSchema).replace(/</g,'\\u003c')}}/>
    </Head>
    <Navbar/>
    <main>
      <div className="border-b border-[#e8dfd5] bg-white"><nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-xs text-[#786e60]"><Link href={lang==='en'?'/en/providers':'/providers'} className="hover:underline">{t.directory}</Link><span>/</span>{section==='home'?<span className="font-medium text-[#302a23]">{t.business}</span>:<><Link href={kawkabPath(lang)} className="hover:underline">{t.business}</Link><span>/</span><span className="font-medium">{titles[section]}</span></>}</nav></div>
      <header className="bg-[#fbfaf7]">
        <div className="mx-auto max-w-6xl px-3 pt-3 md:px-4 md:pt-6">
          <picture className="block w-full overflow-hidden rounded-xl bg-[#eee8de] md:rounded-2xl">
            <source media="(max-width: 639px)" srcSet={KAWKAB_HERO.mobile_url || KAWKAB_HERO.url}/>
            <img src={KAWKAB_HERO.url} alt={local(KAWKAB_HERO,'alt',lang)} width={KAWKAB_HERO.width} height={KAWKAB_HERO.height}
              loading="eager" fetchPriority="high" decoding="async" style={{display:"block",width:"100%",height:"auto",minHeight:"160px",maxWidth:"none",objectFit:"cover"}} className="block aspect-[16/9] w-full object-cover object-center md:aspect-[3/1]" />
          </picture>
          <div className="relative mt-3 rounded-xl bg-white px-3 pb-4 pt-2 md:mt-5 md:border md:border-[#ece3d6] md:px-6 md:py-6">
            <div className="flex items-start gap-3 md:gap-5">
              <img src={KAWKAB_LOGO.url} alt={local(KAWKAB_LOGO,'alt',lang)} width="512" height="512" loading="eager" decoding="async"
                className="h-16 w-16 shrink-0 rounded-xl border border-[#ebdfce] bg-white p-1 object-contain shadow-sm md:h-24 md:w-24" />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-[#f6f0e6] px-2 py-1 text-[10px] font-bold text-[#806333] md:text-xs">{t.badge}</span>
                <h1 className="mt-2 text-xl font-extrabold leading-tight tracking-tight text-[#27231d] sm:text-2xl md:text-4xl">{section==='home'?t.business:titles[section]}</h1>
                <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#514941] md:mt-2 md:text-lg md:font-semibold">{lang==='en'?'Painting, finishing, maintenance and décor':'الدهانات والتشطيبات والصيانة والديكور'}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-1 text-xs leading-6 text-[#514941] md:hidden">{lang==='en'?'Select a service and contact the company for a quotation.':'اختر الخدمة وتواصل مع الشركة لطلب عرض سعر.'}</p>
            <p className="mt-4 hidden max-w-4xl text-base leading-8 text-[#514941] md:block">{section==='home'?t.intro:descriptions[section]}</p>
            <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
              <a href={kawkabWhatsapp(lang)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#302b24] px-5 py-3 text-sm font-semibold text-white">{t.whatsapp}</a>
              <a href="tel:+971556485364" className="rounded-lg border border-[#bfb5a4] bg-white px-5 py-3 text-sm font-semibold text-[#332c24]">{t.call}</a>
            </div>
          </div>
        </div>
      </header>
      <nav aria-label={lang==='en'?'Company sections':'أقسام الشركة'} className="border-b border-[#e9e2d8] bg-white"><div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-2 py-2 sm:gap-3">{Object.entries(routeLabels(t)).map(([key,label])=><Link key={key} href={kawkabPath(lang,key)} aria-current={key===section?'page':undefined} className={`rounded-lg px-1 py-2 text-center text-xs font-medium sm:px-3 sm:text-sm ${key===section?'bg-[#f0e8da] text-[#5c421d]':'text-[#5e574e] hover:bg-[#f7f4ee]'}`}>{label}</Link>)}</div></nav>
      {section==='home'?<><Gallery locale={lang} short/><Services locale={lang} short/><DetailedCompanyGuide locale={lang}/><div className="hidden md:block"><ProcessGuide locale={lang}/></div><Areas locale={lang} short/><AlAinCoverage locale={lang} short/><Faq locale={lang}/></>:null}
      {section==='services'?<><Services locale={lang}/><DetailedCompanyGuide locale={lang}/><div className="hidden md:block"><ProcessGuide locale={lang}/></div><Link href={kawkabPath(lang,'gallery')} className="mx-auto mb-4 block max-w-6xl px-4 text-sm font-bold text-[#865f34] underline">{lang==='en'?'View projects and all service cover images':'عرض المشروع وجميع أغلفة الخدمات'}</Link><Faq locale={lang}/></>:null}
      {section==='service-areas'?<><Areas locale={lang}/><AlAinCoverage locale={lang}/><Services locale={lang} short/><Faq locale={lang}/></>:null}
      {section==='gallery'?<><Gallery locale={lang}/><Faq locale={lang}/></>:null}
      {section==='al-ain'?<><AlAinCoverage locale={lang}/><Services locale={lang}/><ProcessGuide locale={lang}/><Faq locale={lang}/></>:null}
      <section className="mt-4 bg-[#302b26] px-4 py-8 text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">{t.lead}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#e9e0d2]">{t.leadText}</p></div><a href={kawkabWhatsapp(lang)} className="rounded-lg bg-[#e9d0a2] px-5 py-3 text-sm font-bold text-[#26211d]" target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div></section>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-[#766b5d]"><span>{t.business} · {t.phone}: <a href="tel:+971556485364" className="hover:underline">0556485364</a></span><Link href={kawkabPath(lang)} className="font-semibold hover:underline">{t.back}</Link></div>
    </main><Footer/><KawkabMobileContactBar locale={lang}/>
  </div>;
}
