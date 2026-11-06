import Link from 'next/link';
import { PROVIDER_SELECTION_GUIDES } from '../data/providerSelectionGuides';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import styles from './DirectoryKnowledge.module.css';

export default function ProviderSelectionGuide({ locale = 'ar' }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  return <section id="provider-guide" className={styles.guide} aria-labelledby="provider-guide-title">
    <div className={styles.heading}>
      <span>{en ? 'A CLEARER CHOICE' : 'اختيار أوضح'}</span>
      <h2 id="provider-guide-title">{en ? 'Before choosing a business' : 'قبل أن تختار الشركة'}</h2>
      <p>{en ? 'Practical steps for checking a business, comparing offers and preparing your request.' : 'خطوات عملية للتحقق من الجهة ومقارنة العروض وتجهيز طلبك.'}</p>
    </div>
    <div className={styles.grid}>{PROVIDER_SELECTION_GUIDES.map(guide => {
      const copy = guide[locale];
      const image = `/images/emirate-guide-2026/${guide.image}`;
      return <article className={styles.topic} key={guide.id}>
        <div className={`${styles.image} ${styles.abuImage}`}><img src={`${image}-large.webp`} srcSet={`${image}-small.webp 600w, ${image}-medium.webp 840w, ${image}-large.webp 1200w`} sizes="(max-width:700px) 95vw, (max-width:1024px) 47vw, 31vw" width="1200" height="675" alt={copy.alt} loading="lazy" decoding="async"/><small className={styles.imageNotice}>{en ? 'Illustrative image' : 'صورة توضيحية'}</small></div>
        <div className={styles.body}><h3>{copy.title}</h3><p className={styles.summary}>{copy.summary}</p>
          <div className={styles.actions}><DirectoryReadingDialog title={copy.title} locale={locale} triggerLabel={en ? `Read more: ${copy.title}` : `المزيد: ${copy.title}`}>
            {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {guide.sources.length > 0 && <><h3>{en ? 'Official sources' : 'المصادر الرسمية'}</h3>{guide.sources.map(([ar, english, href]) => <p key={href}><a href={href} target="_blank" rel="noopener noreferrer">{en ? english : ar}</a></p>)}</>}
            <p><Link href={`${prefix}${guide.action[2]}`}>{guide.action[en ? 1 : 0]}</Link></p>
          </DirectoryReadingDialog><Link href={`${prefix}${guide.action[2]}`}>{guide.action[en ? 1 : 0]}</Link></div>
        </div>
      </article>;
    })}</div>
  </section>;
}
