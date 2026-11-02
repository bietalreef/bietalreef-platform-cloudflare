/**
 * Additive editorial unit for existing Next.js 15 Pages Router screens.
 * This component DOES NOT create routes or load third-party content.
 * Page H1, SEOHead, canonical, hreflang, directory cards and provider queries remain owned by the existing page.
 * Only include a key when that page actually exists and the publisher approves content.
 */
import { useState } from 'react';
import contentAr from '../data/editorialContent.ar.json';
import styles from './BietAlreefKnowledge.module.css';

const DISPLAYABLE = new Set(Object.keys(contentAr));
export const AVAILABLE_EDITORIAL_KEYS = Array.from(DISPLAYABLE);

export default function BietAlreefKnowledge({ contentKey, locale = 'ar', editorialApproved = false }) {
  const [expanded, setExpanded] = useState(false);
  if (!editorialApproved || locale !== 'ar' || !DISPLAYABLE.has(contentKey)) return null;
  const item = contentAr[contentKey];
  return (
    <section className={styles.section} aria-label={item.title} data-knowledge-key={contentKey}>
      <div className={`${styles.body} ${expanded ? styles.expanded : ''}`}
           dangerouslySetInnerHTML={{ __html: item.html }} />
      <button type="button" className={styles.mobileMore}
              aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        {expanded ? 'عرض أقل' : 'المزيد'}
      </button>
    </section>
  );
}
