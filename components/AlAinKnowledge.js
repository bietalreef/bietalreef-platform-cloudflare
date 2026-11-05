import Link from 'next/link';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { UAE_KNOWLEDGE_ASSETS } from '../data/uaeDirectoryVisuals';
import { AL_AIN_KNOWLEDGE } from '../data/alAinKnowledge';
import styles from './DirectoryKnowledge.module.css';

export default function AlAinKnowledge({ locale = 'ar' }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  return <section id="al-ain-knowledge" className={styles.guide} aria-label={en ? 'Al Ain project and home guide' : 'دليل البيت والمشروع في العين'}>
    <div className={styles.heading}>
      <span>{en ? 'PRACTICAL GUIDANCE FOR AL AIN' : 'معلومات عملية لأهل العين'}</span>
      <h2>{en ? 'From your question to a clearer next step in Al Ain' : 'من سؤالك إلى خطوة واضحة في العين'}</h2>
      <p>{en ? 'Local guidance for planning, choosing services and preparing your request.' : 'معلومات محلية تساعدك في التخطيط والاختيار وتجهيز طلبك.'}</p>
    </div>
    <div className={styles.grid}>{AL_AIN_KNOWLEDGE.map(topic => {
      const item = topic[locale];
      const href = `${prefix}${topic.href}`;
      return <article key={topic.id} className={styles.topic}>
        <div className={styles.image}><DirectoryResponsiveImage asset={UAE_KNOWLEDGE_ASSETS[topic.id]} locale={locale} kind="knowledge"/></div>
        <div className={styles.body}>
          <h3>{item.title}</h3>
          <p className={styles.summary}>{item.summary}</p>
          <div className={styles.actions}>
            <DirectoryReadingDialog title={item.title} locale={locale}>
              {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {topic.source && <p><a href={topic.source[0]} target="_blank" rel="noopener noreferrer">{topic.source[en ? 2 : 1]}</a></p>}
              <p><Link href={href}>{item.action}</Link></p>
            </DirectoryReadingDialog>
            <Link href={href}>{item.action}</Link>
          </div>
        </div>
      </article>;
    })}</div>
  </section>;
}
