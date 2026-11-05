import { useState } from 'react';
import Link from 'next/link';
import entries from '../data/emirateKnowledge.json';
import styles from './DirectoryKnowledge.module.css';

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

export default function EmirateKnowledge({ mode, locale = 'ar' }) {
  const sections = entries[mode]?.[locale]?.sections || [];
  if (!sections.length) return null;
  const prefix = locale === 'en' ? '/en' : '';
  return <section id="guide" className={styles.guide} aria-label={locale === 'en' ? 'Local construction guide' : 'دليل البناء المحلي'}>
    <div className={styles.heading}><span>{locale === 'en' ? 'LOCAL GUIDANCE' : 'دليل الإمارة'}</span><h2>{locale === 'en' ? 'Before you begin your project' : 'قبل أن تبدأ مشروعك'}</h2></div>
    <div className={styles.grid}>{sections.map((section, index) => <Topic key={section.heading} section={section} locale={locale} index={index} />)}</div>
    <div className={styles.actions}><Link href={`${prefix}/uae/${mode}/general-contracting`}>{locale === 'en' ? 'Explore local construction services' : 'استكشف خدمات المقاولات في الإمارة'}</Link>{(references[mode] || []).map(([ar, en, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{locale === 'en' ? en : ar}</a>)}</div>
    <p className={styles.reviewed}>{locale === 'en' ? 'Source links reviewed: 3 November 2026. Confirm current requirements with the relevant authority.' : 'مراجعة روابط المصادر: 3 نوفمبر 2026. تحقق من المتطلبات الحالية لدى الجهة المختصة.'}</p>
  </section>;
}
