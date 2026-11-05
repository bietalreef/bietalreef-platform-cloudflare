import { useState } from 'react';
import Link from 'next/link';
import entries from '../data/emirateKnowledge.json';
import styles from './DirectoryKnowledge.module.css';
import DirectoryReadingDialog from './DirectoryReadingDialog';

const references = {
  'abu-dhabi': [
    ['دائرة البلديات والنقل: منصة بناء', 'Department of Municipalities and Transport: Binaa', 'https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched'],
    ['الشركات الهندسية ذات التصنيف الساري', 'Engineering firms with valid classification', 'https://pages.dmt.gov.ae/en/Engineering-Firms'],
    ['بوابة مشتريات حكومة أبوظبي', 'Abu Dhabi Government Procurement Gate', 'https://www.adgpg.gov.ae/'],
  ],
  dubai: [
    ['بلدية دبي: إجراءات تصاريح البناء', 'Dubai Municipality: building permit procedures', 'https://www.dm.gov.ae/municipality-business/building-permit-steps/'],
    ['بلدية دبي: تطبيق تصاريح البناء', 'Dubai Municipality: building permits app', 'https://www.dm.gov.ae/new-improved-building-permits-app-launched-for-streamlined-services/'],
  ],
  sharjah: [
    ['بلدية مدينة الشارقة: رخصة البناء', 'Sharjah City Municipality: building permit', 'https://shjmun.gov.ae/servicedirectory/details/683d3a96ff3e1753c064e6ee'],
    ['بلدية مدينة الشارقة: تصريح الصيانة', 'Sharjah City Municipality: maintenance permit', 'https://shjmun.gov.ae/servicedirectory/details/683d3a96ff3e1753c064e6fe'],
  ],
  ajman: [
    ['حكومة عجمان: تصريح الإضافة إلى مبنى', 'Ajman Government: permit for an addition', 'https://www.ajman.ae/en/servicecatalog/services/3277'],
  ],
  'umm-al-quwain': [
    ['وام: خدمات بلدية أم القيوين الإلكترونية', 'Emirates News Agency: Umm Al Quwain municipal e-services', 'https://www.wam.ae/ar/article/hszrezwj-%D8%A8%D9%84%D8%AF%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D9%8A%D9%88%D9%8A%D9%86-%D8%AA%D8%B7%D9%84%D9%82-%D9%85%D9%86%D8%B5%D8%A9-%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9'],
  ],
  'ras-al-khaimah': [
    ['بلدية رأس الخيمة: رخصة بناء جديد', 'Ras Al Khaimah Municipality: new building permit', 'https://sanad.mun.rak.ae/docs/services-card-english-temp-49'],
  ],
  fujairah: [
    ['بلدية الفجيرة: دليل طلب تصريح البناء', 'Fujairah Municipality: building permit guide', 'https://portal.fujmun.gov.ae/OnlineEservices/files/How%20to%20apply%20for%20building%20permit.pdf'],
  ],
};

function Inline({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
}

function Block({ text }) {
  const lines = text.split('\n').filter(Boolean);
  if (lines[0]?.startsWith('### ')) return <div><h3>{lines[0].slice(4)}</h3>{lines.length > 1 && <p><Inline text={lines.slice(1).join(' ')} /></p>}</div>;
  if (lines.length && lines.every(line => /^(?:\d+\.|-)\s/.test(line))) return <ul>{lines.map((line, index) => <li key={index}><Inline text={line.replace(/^(?:\d+\.|-)\s*/, '')} /></li>)}</ul>;
  return <p><Inline text={lines.join(' ')} /></p>;
}

function Topic({ section, locale, index }) {
  const [expanded, setExpanded] = useState(false);
  const id = `emirate-guide-${index}`;
  return <article className={styles.topic}>
    <h2>{section.heading}</h2>
    <div id={id} className={`${styles.copy} ${expanded ? styles.expanded : ''}`}>{section.blocks.map((block, i) => <Block key={i} text={block} />)}</div>
    <button type="button" className={styles.more} aria-controls={id} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? (locale === 'en' ? 'Show less' : 'عرض أقل') : (locale === 'en' ? 'Read more' : 'المزيد')}</button>
  </article>;
}

// The current Arabic and English editorial sections have different topics and
// order, so select the image by actual subject rather than by translated index.
const abuDhabiCards = {
  ar: [
    { image: 'consultant-permit', alt: 'تصور توضيحي لاستشاري ومالك يراجعان مخططات مشروع في أبوظبي', summary: 'حدد احتياجات المشروع ومسؤوليات الاستشاري، وتحقق من المتطلبات والموافقات لدى الجهة المختصة.' },
    { image: 'villa-project', alt: 'تصور توضيحي لمهندس يراجع حالة فيلا قيد الإنشاء قبل استكمال المشروع', summary: 'راجع المخططات ونطاق الأعمال وحالة الموقع قبل تسعير فيلا جديدة أو استكمال مشروع متوقف.' },
    { image: 'choose-professionals', alt: 'تصور توضيحي لمالك يقارن خطط العمل مع استشاري ومقاول', summary: 'قارن التخصص والخبرة ونطاق الخدمة واحتياجات الموقع في أبوظبي والعين والظفرة.' },
  ],
  en: [
    { image: 'consultant-permit', alt: 'Illustration of a consultant and homeowner reviewing project plans in Abu Dhabi', summary: 'Define the project and consultant’s responsibilities, then check approvals with the relevant authority.' },
    { image: 'choose-professionals', alt: 'Illustration of a homeowner comparing plans with engineering and construction professionals', summary: 'Check an engineering firm’s classification and compare its suitability for the actual service.' },
    { image: 'villa-project', alt: 'Illustration of an engineer reviewing an unfinished villa before work resumes', summary: 'Review coordinated drawings, completed work and responsibilities before building or resuming a villa.' },
  ],
};

function AbuDhabiTopic({ section, locale, index, prefix }) {
  const card = abuDhabiCards[locale]?.[index];
  if (!card) return <Topic section={section} locale={locale} index={index} />;
  const en = locale === 'en';
  const root = `/images/abu-dhabi-knowledge-2026/${card.image}`;
  return <article className={styles.topic}>
    <div className={`${styles.image} ${styles.abuImage}`}><img
      src={`${root}-large.webp`}
      srcSet={`${root}-small.webp 600w, ${root}-medium.webp 840w, ${root}-large.webp 1200w`}
      sizes="(max-width: 700px) 95vw, (max-width: 1024px) 47vw, 26vw"
      width="1200" height="675" alt={card.alt} loading="lazy" decoding="async"
    /><small className={styles.imageNotice}>{en ? 'Illustrative image' : 'صورة توضيحية'}</small></div>
    <div className={styles.body}>
      <h3>{section.heading}</h3>
      <p className={styles.summary}>{card.summary}</p>
      <div className={styles.actions}>
        <DirectoryReadingDialog title={section.heading} locale={locale}>
          {section.blocks.map((block, i) => <Block key={i} text={block} />)}
          <h3>{en ? 'Official references' : 'المراجع الرسمية'}</h3>
          {(references['abu-dhabi'] || []).map(([ar, english, href]) => <p key={href}><a href={href} target="_blank" rel="noopener noreferrer">{en ? english : ar}</a></p>)}
          <p><Link href={`${prefix}/uae/abu-dhabi/general-contracting`}>{en ? 'Explore local construction services' : 'استكشف خدمات المقاولات في الإمارة'}</Link></p>
        </DirectoryReadingDialog>
      </div>
    </div>
  </article>;
}

export default function EmirateKnowledge({ mode, locale = 'ar' }) {
  const sections = entries[mode]?.[locale]?.sections || [];
  if (!sections.length) return null;
  const prefix = locale === 'en' ? '/en' : '';
  return <section id="guide" className={styles.guide} aria-label={locale === 'en' ? 'Local construction guide' : 'دليل البناء المحلي'}>
    <div className={styles.heading}><span>{locale === 'en' ? 'LOCAL GUIDANCE' : 'دليل الإمارة'}</span><h2>{locale === 'en' ? 'Before you begin your project' : 'قبل أن تبدأ مشروعك'}</h2></div>
    <div className={styles.grid}>{sections.map((section, index) => mode === 'abu-dhabi' ? <AbuDhabiTopic key={section.heading} section={section} locale={locale} index={index} prefix={prefix} /> : <Topic key={section.heading} section={section} locale={locale} index={index} />)}</div>
    <div className={styles.actions}><Link href={`${prefix}/uae/${mode}/general-contracting`}>{locale === 'en' ? 'Explore local construction services' : 'استكشف خدمات المقاولات في الإمارة'}</Link>{(references[mode] || []).map(([ar, en, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{locale === 'en' ? en : ar}</a>)}</div>
    <p className={styles.reviewed}>{locale === 'en' ? 'Source links reviewed: 3 November 2026. Confirm current requirements with the relevant authority.' : 'مراجعة روابط المصادر: 3 نوفمبر 2026. تحقق من المتطلبات الحالية لدى الجهة المختصة.'}</p>
  </section>;
}
