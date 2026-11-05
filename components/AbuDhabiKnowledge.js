import DirectoryReadModal from './DirectoryReadModal';
import entries from '../data/abuDhabiDirectoryEditorial.json';
import styles from './AbuDhabiKnowledge.module.css';

export default function AbuDhabiKnowledge({locale='ar'}) {
  const en=locale==='en';
  const guides=entries[locale]?.guides||[];
  return <section id="guide" className={styles.guide} dir={en?'ltr':'rtl'} aria-label={en?'Abu Dhabi service and supplier guide':'دليل اختيار الخدمات والشركات في أبوظبي'}>
    <div className={styles.heading}>
      <span>{en?'YOUR DECISION GUIDE':'دليلك لاتخاذ قرار واضح'}</span>
      <h2>{en?'Choosing companies, services and suppliers in Abu Dhabi Emirate':'دليل اختيار الشركات والخدمات والمحلات والموردين في إمارة أبوظبي'}</h2>
      <p>{en?'Practical answers for homeowners, project owners and businesses across Abu Dhabi City, Al Ain and Al Dhafra.':'معلومات تساعد أصحاب المنازل والمشاريع والشركات في مدينة أبوظبي والعين والظفرة على المقارنة والتعامل بثقة.'}</p>
    </div>
    <div className={styles.grid}>{guides.map((guide,index)=><article key={guide.title} className={styles.card}>
      <span className={styles.counter}>{String(index+1).padStart(2,'0')}</span>
      <h3>{guide.title}</h3>
      <p>{guide.teaser}</p>
      <DirectoryReadModal locale={locale} title={guide.title} html={guide.html}
        href={guide.href} image="/images/uae-2026/abu-dhabi.webp"
        ctaLabel={en?'Explore the relevant services':'استكشف الخدمات ذات الصلة'} />
    </article>)}</div>
  </section>;
}
