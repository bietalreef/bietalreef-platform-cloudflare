import { useId, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin } from 'lucide-react';
import styles from './CompactAreaLinks.module.css';

// Render every existing destination in the initial HTML; the short first row
// stays compact and the remaining links can be opened without navigation.
export default function CompactAreaLinks({ id, locale = 'ar', title, areas, basePath, headingHref }) {
  const en = locale === 'en';
  const [expanded, setExpanded] = useState(false);
  const restId = useId();
  const links = list => list.map(area => <li key={area.slug}>
    <Link href={`${basePath}/${area.slug}`} title={en ? area.nameEn : area.nameAr}>
      <MapPin aria-hidden="true"/><span>{en ? area.nameEn : area.nameAr}</span>
    </Link>
  </li>);
  return <nav id={id} className={styles.context} aria-label={title}>
    <div className={styles.row}>
      <h2>{headingHref ? <Link href={headingHref}>{title}</Link> : title}</h2>
      <ul className={styles.preview}>{links(areas.slice(0, 2))}</ul>
      {areas.length > 2 && <button type="button" aria-expanded={expanded} aria-controls={restId} onClick={() => setExpanded(!expanded)}>
        {expanded ? (en ? 'Less' : 'أقل') : (en ? 'More' : 'المزيد')}<ChevronDown aria-hidden="true"/>
      </button>}
    </div>
    <ul id={restId} className={styles.more} hidden={!expanded}>{links(areas.slice(2))}</ul>
  </nav>;
}
