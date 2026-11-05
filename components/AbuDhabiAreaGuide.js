import Image from 'next/image';
import Link from 'next/link';
import DirectoryReadModal from './DirectoryReadModal';
import DirectoryCompanyCard from './provider/DirectoryCompanyCard';
import {UAE_MAIN_SECTORS} from '../data/directoryDiscovery';
import regionEditorial from '../data/abuDhabiAreaEditorial.json';
import styles from './AbuDhabiAreaGuide.module.css';

const sectorGuidance={"general-contracting":{"ar":"قبل طلب مقاول، حدد نوع البناء وحالة الأرض أو المبنى، والمخططات المتاحة، والأعمال الإنشائية والتشطيبات المطلوبة. يختلف طلب بناء ملحق عن إصلاح تشققات أو تجديد جزء قائم. لا تستبدل زيارة المختص بوعود مبنية على صور، ولا تقارن عرض عظم بآخر يشمل التسليم الكامل.","en":"Identify the project type, existing condition, available drawings and required structural and finishing work. A new extension is not equivalent to repairing an existing defect. Confirm what each contractor prices before comparing a shell-only quote with a full-delivery proposal."},"interior-design":{"ar":"في التصميم، ابدأ بوظيفة المساحة وأبعادها وأولويات المستخدمين، ثم فرّق بين تصور الألوان والمخططات التنفيذية. تأكد من أن عرض المكتب يحدد رفع المقاسات، وعدد التعديلات، ورسومات الكهرباء والتكييف والنجارة، والإشراف إذا كان مطلوبًا.","en":"Begin with how the space is used, accurate measurements and priorities. Separate visual concepts from construction drawings. Ask which surveys, design revisions, electrical and AC coordination, joinery documents and supervision visits are covered."},"general-maintenance":{"ar":"التشخيص الصحيح سابق للتجميل. في التسربات والرطوبة وضعف التكييف والكهرباء، اطلب شرح السبب وطريقة الإصلاح ثم اختبارات التشغيل أو التسرب قبل إعادة الدهان أو إغلاق الجدران. اتفق على المواد والقطع المستبدلة والضمان وحدوده.","en":"Diagnosis comes before cosmetic reinstatement. For leaks, humidity, cooling or electrical faults, request an explanation of the cause and appropriate checks before surfaces are closed. Clarify replacement parts, workmanship and warranty conditions."},"building-materials":{"ar":"عند شراء مواد المشروع، اذكر المادة والمواصفة والدرجة والكمية ووحدة القياس وموقع التفريغ. قارن التوفر والتوصيل والتنزيل وسعر الوحدة، ولا تستبدل خامة معتمدة في المخططات ببديل لمجرد أنه أقل سعرًا دون موافقة فنية.","en":"Specify the approved material, grade, quantity, unit and unloading point. Compare availability, transport, unloading and unit prices. Where a drawing specifies a product, substitutions should be checked with the responsible professional before purchase."},"aluminium-glass":{"ar":"أعمال الأبواب والنوافذ والبوابات والواجهات تبدأ بمعاينة الفتحات ورفع مقاسات التصنيع، ثم اعتماد رسومات الورشة والعينات والخامات والإكسسوارات. حدد مسؤولية الإغلاق والعزل ومقاومة التآكل، ومن يعالج اختلاف المقاسات بعد التركيب.","en":"Doors, glazing, gates and custom joinery need a site measure followed by approved shop drawings, samples and hardware details. Clarify sealing, corrosion protection, installation tolerances and who corrects a misfit."},"furniture-decor":{"ar":"اختر الأثاث وفق أبعاد المكان ومسارات الحركة لا وفق صورة المعرض وحدها. راجع نوع القماش والحشوة والهيكل ومقاسات المصعد أو الأبواب، وميّز بين أثاث جاهز وتفصيل له شروط إنتاج وتغيير وتسليم مختلفة.","en":"Select furniture for the actual room and access route, not just a showroom image. Check upholstery, cushioning, structure, door and lift clearances, and the different ordering and aftercare terms for custom-made pieces."},"equipment-rental":{"ar":"حدد نوع المهمة وموقع المعدة وظروف الأرض والقدرة المطلوبة ومدة الاستخدام. لا تقارن السعر اليومي وحده؛ اسأل عن المشغل والنقل والتركيب والوقود والصيانة والفحص والتأمين، ومسؤولية التوقف أو التلف بحسب العقد.","en":"Define the site, task, ground conditions, required capacity and hire period. The daily rate is only one element: clarify operator, transport, mobilisation, fuel, inspections, maintenance and downtime under the agreement."},"cleaning-services":{"ar":"حدد نوع العقار ومساحته وحالة الأسطح والمفروشات وما إذا كانت المهمة تنظيفًا دوريًا أو عميقًا أو بعد التشطيب أو مكافحة حشرات. اسأل عن المعدات والمواد وطريقة الشطف أو التجفيف ومخرجات الخدمة، ولا تفترض أن الشركة تقدم جميع الأنواع.","en":"Specify the property, surfaces, furniture and whether the request involves routine cleaning, intensive work, post-build dust or pest treatment. Ask about methods, materials, rinsing or drying and the agreed result; not every cleaning business offers every service."}};
const AREA_KEYS=Object.keys(regionEditorial.areas);
export const isAbuDhabiDirectoryArea=(slug)=>AREA_KEYS.includes(slug);
const safeText=(str)=>String(str||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function readingHtml(entry,sector,locale){
 const note=sectorGuidance[sector.slug]?.[locale];
 const opening=locale==='en'
   ?`<p>In ${safeText(entry.title.replace(/ —.*$/,''))}, choosing ${safeText(sector.name.en.toLowerCase())} starts with a clear description of the work and its location.</p>`
   :`<p>إذا كنت تبحث عن ${safeText(sector.name.ar)} في هذه المنطقة، فابدأ بوصف العمل المطلوب وموقعه وحالته والمعلومات المتاحة قبل طلب السعر.</p>`;
 return opening+
  `<h3>${locale==='en'?'What to check before requesting a quote':'ما الذي تراجعه قبل طلب عرض السعر؟'}</h3><p>${safeText(note)}</p>`+
  `<h3>${locale==='en'?'Practical local considerations':'تفاصيل عملية مرتبطة بموقع العمل'}</h3><p>${safeText(entry.focus)}</p>`+
  `<p>${locale==='en'?'Confirm the business actually covers your site and read the quotation inclusions and exclusions before placing an order.':'تحقق من نطاق تغطية الشركة لموقعك الفعلي، وراجع البنود المشمولة والمستثناة قبل اعتماد العرض.'}</p>`;
}
export default function AbuDhabiAreaGuide({locale='ar',areaSlug,providers=[]}){
 const en=locale==='en',entry=regionEditorial.areas[areaSlug]?.[locale];
 if(!entry)return null;
 const prefix=en?'/en':'';
 const root=`${prefix}/uae/abu-dhabi`;
 return <div dir={en?'ltr':'rtl'} lang={en?'en':'ar'} className={styles.wrapper}>
   <nav aria-label={en?'Breadcrumb':'مسار التصفح'} className={styles.breadcrumb}>
     <Link href={`${prefix}/uae`}>{en?'United Arab Emirates':'الإمارات العربية المتحدة'}</Link>
     <span aria-hidden="true">/</span>
     <Link href={root}>{en?'Abu Dhabi Emirate':'إمارة أبوظبي'}</Link>
     <span aria-hidden="true">/</span>
     <span aria-current="page">{entry.title.replace(/ 2026$/,'')}</span>
   </nav>
   <section className={styles.intro} aria-labelledby="area-information-title">
     <div className={styles.eyebrow}>{en?'LOCAL BUSINESS & SERVICES DIRECTORY':'دليل الأعمال والخدمات المحلي'}</div>
     <h2 id="area-information-title">{en?'Choosing the right service or supplier':'كيف تختار الشركة أو الخدمة المناسبة؟'}</h2>
     <p>{entry.intro}</p><p>{entry.focus}</p>
     <p className={styles.lastReviewed}>{en?'Local editorial reviewed 6 November 2026':'آخر مراجعة تحريرية: 6 نوفمبر 2026'}</p>
   </section>
   <section aria-labelledby="area-sector-title" className={styles.section}>
     <h2 id="area-sector-title">{en?'Eight specialties for your property or project':'التخصصات الثمانية لخدمات العقار والمشاريع'}</h2>
     <p className={styles.lede}>{en?'Choose a specialty to read practical advice or open its existing local page.':'اختر التخصص لقراءة إرشادات عملية، أو افتح صفحته المحلية للبحث عن الخدمات والشركات.'}</p>
     <div className={styles.grid}>
       {UAE_MAIN_SECTORS.map(sector=>{
         const href=`${root}/${areaSlug}/${sector.slug}`;
         const article=readingHtml(entry,sector,locale);
         return <article className={styles.card} key={sector.slug} id={`sector-${sector.slug}`}>
           <div className={styles.photo}>
             {sector.image?<Image src={sector.image} alt="" fill loading="lazy" sizes="(max-width:700px)50vw,(max-width:1200px)33vw,280px" />:
              <span aria-hidden="true" className={styles.imageFallback}>{en?'Equipment & supply':'المعدات والتوريد'}</span>}
           </div>
           <div className={styles.cardBody}>
             <h3>{sector.name[locale]}</h3>
             <p>{sector.description[locale]}</p>
             <div className={styles.actions}>
               <DirectoryReadModal title={`${sector.name[locale]} — ${entry.title.replace(/ 2026$/,'')}`}
                 locale={locale} html={article} href={href} image={sector.image||null}
                 ctaLabel={en?'Explore this specialty':'استكشف هذا التخصص'}/>
               <Link className={styles.explore} href={href}>{en?'Explore':'استكشف'}</Link>
             </div>
           </div>
         </article>;
       })}
     </div>
   </section>
   {providers.length>0&&<section className={styles.section} aria-labelledby="area-companies">
     <h2 id="area-companies">{en?'Published businesses with confirmed coverage':'الشركات المنشورة ذات التغطية المؤكدة'}</h2>
     <div className={styles.businesses}>{providers.map(item=><DirectoryCompanyCard key={item.id} locale={locale} item={item}/>)}</div>
   </section>}
   <section className={styles.section} aria-labelledby="area-questions">
     <h2 id="area-questions">{en?'Questions people ask about services here':'أسئلة تساعدك قبل الاتفاق'}</h2>
     <div className={styles.questions}>{entry.faq.map(([question,answer])=><article key={question} className={styles.question}>
       <h3>{question}</h3><p>{answer}</p>
     </article>)}</div>
   </section>
   <nav className={styles.footNav} aria-label={en?'Related directories':'أدلة مرتبطة'}>
     <Link href={root}>{en?'Back to Abu Dhabi Emirate':'العودة إلى دليل إمارة أبوظبي'}</Link>
     <Link href={`${root}/al-ain`}>{en?'Al Ain directory':'دليل العين'}</Link>
   </nav>
 </div>;
}
