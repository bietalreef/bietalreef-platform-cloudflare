import {useState} from 'react';
import Link from 'next/link';
import styles from './AlAinConstructionGuide.module.css';

const copy = {
  ar: {
    eyebrow: 'من الفكرة إلى تسليم المشروع',
    intro: 'خطوات ومعلومات تساعدك على بناء فيلتك في العين واختيار الشركاء المناسبين.',
    more: 'المزيد', less: 'عرض أقل',
    roadmap: {
      title: 'رحلة بناء الفيلا في العين',
      summary: 'ست خطوات تساعدك على ترتيب مشروعك من الأرض إلى الاستلام.',
      steps: [
        ['الأرض والميزانية', 'راجع بيانات الأرض وحدد احتياجات الأسرة والميزانية التقريبية.'],
        ['الاستشاري والتصميم', 'اختر مكتبًا هندسيًا مرخّصًا وناقش التصميم والدراسات التي يتطلبها الموقع.'],
        ['المخططات والموافقات', 'نسّق مع الاستشاري إعداد المخططات واستكمال الموافقات المطلوبة.'],
        ['اختيار المقاول', 'اطلب عروضًا على نطاق ومواصفات واضحة، وتحقق من رخص الشركة وتصنيفها المناسب.'],
        ['الترخيص والتنفيذ', 'استكمل الترخيص والتصاريح اللازمة قبل بدء العمل، وتابع التنفيذ مع الاستشاري.'],
        ['الاستلام', 'راجع الأعمال والملاحظات والضمانات والمستندات وفق العقد ونطاق العمل المتفق عليه.'],
      ],
      note: 'قد تتداخل المراحل بحسب نوع المشروع وإجراءات الجهة المختصة.',
    },
    permits: {
      title: 'المخططات والتصاريح في العين',
      summary: 'تعرّف على الجهات الرسمية ومتطلبات أرضك قبل بدء البناء.',
      paragraphs: [
        'قبل بدء العمل في الموقع، نسّق مع مكتب استشاري هندسي مرخّص لإعداد المخططات ومعرفة الموافقات والدراسات اللازمة واستكمال إجراءات الترخيص.',
        'توضح بلدية العين أن قسائم المساكن الخاصة تُدرس جيوفيزيائيًا قبل تسليمها للمواطن. اسأل استشاريك والبلدية عن حالة أرضك والمتطلبات السارية عليها.',
        'قد يكون تكليف المقاول واستشاري الإشراف جزءًا من إجراءات إصدار الرخصة؛ اتبع ترتيب الجهة المختصة لمشروعك.',
      ],
      municipality: 'بلدية مدينة العين', tamm: 'ترخيص البناء عبر تم', binaa: 'منصة بناء', classification: 'التحقق من تصنيف الشركات',
    },
    comparison: {
      title: 'كيف تقارن عروض المقاولين؟',
      summary: 'قارن الأعمال والمواد والمدة، وليس المبلغ وحده.',
      text: 'أرسل المخططات ونطاق العمل نفسه إلى الشركات، واطلب عرضًا مكتوبًا يوضح:',
      items: ['هل العرض للهيكل فقط أم يشمل التشطيبات؟', 'المواد والكميات والمواصفات والأعمال المستثناة.', 'المدة ومراحل الدفع والضريبة والتغييرات الإضافية.', 'الضمانات ومسؤولية الإشراف والاستلام.'],
      button: 'جهّز طلب عرض سعر',
    },
    business: {
      title: 'لشركات المقاولات والمكاتب والموردين',
      summary: 'قدّم نشاطك، وتعرّف على فرص العمل، وابنِ حضور شركتك الرقمي.',
      items: [
        ['ملف يعبّر عن شركتك', 'أضف نشاطك وخدماتك ومشاريعك ومناطق عملك، واستكمل بيانات التحقق والنشر وفق صلاحيات حسابك.'],
        ['طلبات ومناقصات مناسبة', 'تُراجع المناقصات الداخلية وتُختار الجهات المدعوة وفق التخصص والموقع والبيانات المتاحة. تابع الفرص المتاحة لحسابك وقدّم عرضك بحسب شروطها.'],
        ['موقع وحضور رقمي مستقل', 'يمكن تجهيز موقع خاص يعكس هوية شركتك. تُحدد ملكية النطاق والحسابات وصلاحيات الإدارة والتجديد وإمكانية النقل في الاتفاق.'],
        ['متجرك دون عمولة مبيعات', 'اعرض منتجاتك وخدماتك وفق الخطة وقنوات النشر. لا تقتطع بيت الريف عمولة على المبيعات؛ وتُوضح رسوم الاشتراك والخدمات والضريبة وأي رسوم دفع خارجية إن انطبقت.'],
        ['اتفاق مباشر وواضح', 'تواصل مع العميل واتفق معه على السعر والدفع والتسليم والضمان. توفّر بيت الريف أدوات العرض والتواصل، ويظل الاتفاق بين الطرفين.'],
        ['Google ووياك', 'خصم مؤهل 10% على السنة الأولى من Google Workspace للاشتراكات الجديدة المؤهلة برمز فردي؛ لا يشمل الخصم Google Cloud. يساعدك وياك في تنظيم معلومات نشاطك ضمن صلاحيات حسابك.'],
      ],
      app: 'افتح تطبيق بيت الريف', solutions: 'اكتشف حلول الأعمال', market: 'استكشف سوق بيت الريف',
    },
  },
  en: {
    eyebrow: 'From the first idea to handover',
    intro: 'Practical steps for building a villa in Al Ain and choosing the right partners.',
    more: 'Read more', less: 'Show less',
    roadmap: {
      title: 'Your villa building journey in Al Ain',
      summary: 'Six steps to organise your project from land to handover.',
      steps: [
        ['Land and budget', 'Review the plot details and define your family’s needs and approximate budget.'],
        ['Consultant and design', 'Choose a licensed engineering consultant and discuss the design and required site studies.'],
        ['Drawings and approvals', 'Work with your consultant to prepare the drawings and obtain the required approvals.'],
        ['Choosing a contractor', 'Request quotations for the same scope and specifications, and check each company’s licence and relevant classification.'],
        ['Permit and construction', 'Complete the required permit and approvals before site work begins, and follow progress with your consultant.'],
        ['Handover', 'Review the works, outstanding items, warranties and documents against the agreed contract and scope.'],
      ],
      note: 'Some stages may overlap depending on the project and the authority’s procedures.',
    },
    permits: {
      title: 'Drawings and permits in Al Ain',
      summary: 'Find the relevant authorities and check your plot requirements before construction.',
      paragraphs: [
        'Before work starts on site, coordinate with a licensed engineering consultancy to prepare drawings and identify the studies, approvals and permit procedures your project requires.',
        'Al Ain City Municipality explains that private housing plots are surveyed geophysically before they are handed over to citizens. Ask your consultant and the municipality about your plot and current requirements.',
        'Appointing the contractor and supervising consultant may form part of the permit process. Follow the relevant authority’s procedure for your project.',
      ],
      municipality: 'Al Ain City Municipality', tamm: 'Building permit on TAMM', binaa: 'Binaa platform', classification: 'Check company classifications',
    },
    comparison: {
      title: 'How do you compare contractor quotations?',
      summary: 'Compare the scope, materials and schedule as well as the price.',
      text: 'Share the same drawings and scope with each company, and ask for a written quotation covering:',
      items: ['Whether the quote covers the structure only or includes finishing.', 'Materials, quantities, specifications and exclusions.', 'Schedule, payment stages, applicable tax and variations.', 'Warranties and responsibilities for supervision and handover.'],
      button: 'Prepare a quotation request',
    },
    business: {
      title: 'For contractors, consultancies and suppliers',
      summary: 'Present your business, explore relevant opportunities and build your digital presence.',
      items: [
        ['A profile for your business', 'Add your activities, services, projects and coverage areas, and complete verification and publication requirements for your account.'],
        ['Relevant requests and tenders', 'Internal tenders are reviewed and invitees are selected by specialty, location and available information. Follow opportunities available to your account and respond under their terms.'],
        ['Your own digital presence', 'A website can be prepared for your company. Domain ownership, account access, administration, renewal and transfer are defined in your agreement.'],
        ['Your store without sales commission', 'Present products and services according to your plan and publication channels. Biet Alreef takes no sales commission; subscription, service, tax and any external payment fees are disclosed if applicable.'],
        ['A direct, clear agreement', 'Agree price, payment, delivery and warranties directly with your customer. Biet Alreef provides presentation and communication tools; the agreement remains between the parties.'],
        ['Google and Weyaak', 'Eligible new Google Workspace subscriptions receive 10% off the first year with an individual promotional code; the discount does not apply to Google Cloud. Weyaak helps organise business information within your account permissions.'],
      ],
      app: 'Open Biet Alreef app', solutions: 'Explore business solutions', market: 'Explore Biet Alreef Market',
    },
  },
};

function GuidePanel({id, title, summary, more, less, children}) {
  const [expanded, setExpanded] = useState(false);
  return <section className={styles.panel} aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>{title}</h2>
    <p className={styles.summary}>{summary}</p>
    <button className={styles.expand} type="button" aria-expanded={expanded} aria-controls={`${id}-content`} onClick={() => setExpanded(!expanded)}>{expanded ? less : more}</button>
    <div id={`${id}-content`} className={styles.content} data-expanded={expanded}>{children}</div>
  </section>;
}

export default function AlAinConstructionGuide({locale, quoteHref}) {
  const en = locale === 'en';
  const t = copy[en ? 'en' : 'ar'];
  const prefix = en ? '/en' : '';
  const common = {more:t.more, less:t.less};
  return <div id="construction-guide" className={styles.guide}>
    <div className={styles.intro}><span>{t.eyebrow}</span><p>{t.intro}</p></div>
    <GuidePanel id="construction-roadmap" title={t.roadmap.title} summary={t.roadmap.summary} {...common}>
      <ol className={styles.steps}>{t.roadmap.steps.map(([title, body], i) => <li key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      <p className={styles.note}>{t.roadmap.note}</p>
    </GuidePanel>
    <GuidePanel id="construction-permits" title={t.permits.title} summary={t.permits.summary} {...common}>
      {t.permits.paragraphs.map(p => <p key={p}>{p}</p>)}
      <div className={styles.links}>
        <a href="https://www.dmt.gov.ae/AAM/" target="_blank" rel="noopener noreferrer">{t.permits.municipality}</a>
        <a href="https://www.tamm.abudhabi/ar-AE/life-events/business/ManageyourPermitsMemberships/Constructions/RequestforBuildingPermitIssuance" target="_blank" rel="noopener noreferrer">{t.permits.tamm}</a>
        <a href="https://binaa.dmt.gov.ae/" target="_blank" rel="noopener noreferrer">{t.permits.binaa}</a>
        <a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{t.permits.classification}</a>
      </div>
    </GuidePanel>
    <GuidePanel id="construction-comparison" title={t.comparison.title} summary={t.comparison.summary} {...common}>
      <p>{t.comparison.text}</p><ul className={styles.checks}>{t.comparison.items.map(item => <li key={item}>{item}</li>)}</ul>
      <Link className={styles.primary} href={quoteHref}>{t.comparison.button}</Link>
    </GuidePanel>
    <GuidePanel id="construction-business" title={t.business.title} summary={t.business.summary} {...common}>
      <div className={styles.businessGrid}>{t.business.items.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className={styles.links}>
        <a className={styles.primary} href="https://providers.bietalreef.ae/">{t.business.app}</a>
        <Link href={`${prefix}/business-solutions`}>{t.business.solutions}</Link>
        <a href="https://app.bietalreef.ae/">{t.business.market}</a>
      </div>
    </GuidePanel>
  </div>;
}
