import editorial from '../data/uaeExpertEditorial.json';
import styles from './DirectoryExpertEditorial.module.css';

/**
 * Existing UAE and emirate pages only. Render supplied source-based editorial
 * in HTML without making new routes or changing the directory taxonomy.
 * Editorial remains in review until approved; this component is on a draft branch.
 */
export default function DirectoryExpertEditorial({locale='ar',mode='uae'}){
 const en=locale==='en';
 const sections=editorial[mode]?.[locale] || [];
 if(!sections.length) return null;
 return (
  <section className={styles.editorial} aria-label={en?'Construction and services guide':'الدليل الهندسي والخدمي'} dir={en?'ltr':'rtl'}>
   <div className={styles.heading}>
    <p className={styles.eyebrow}>{en?'PRACTICAL PROJECT KNOWLEDGE':'معرفة عملية لمشروعك'}</p>
    <h2>{en?'Construction, tenders and service decisions':'البناء والمناقصات والخدمات: كيف تختار القرار المناسب؟'}</h2>
    <p>{en?'Choose a topic to understand the scope, requirements and next steps.':'اختر الموضوع الذي تحتاجه، وافهم نطاق العمل والمستندات وما يجب مراجعته قبل القرار.'}</p>
   </div>
   <div className={styles.stack}>
   {sections.map((s,i)=><details className={styles.topic} key={i}>
     <summary><span>{s.heading || (en?'Overview':'نظرة عامة')}</span></summary>
     <div className={styles.body}>
      {s.blocks.map((b,j)=>b.type==='sub'?<h4 key={j}>{b.text}</h4>:
       b.type==='item'?<p className={styles.bullet} key={j}>{'• '+b.text}</p>:
       <p key={j}>{b.text}</p>)}
     </div>
   </details>)}
   </div>
   <p className={styles.disclaimer}>{en?'Permits, licensed scopes and official classifications must be verified through the relevant authority.':'تُراجع التصاريح والأنشطة المرخصة والتصنيفات الرسمية لدى الجهة المختصة حسب الإمارة ونوع المشروع.'}</p>
  </section>
 );
}
