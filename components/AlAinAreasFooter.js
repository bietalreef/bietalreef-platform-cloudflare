import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { AREAS } from '../data/localServices';
import { localPath } from '../lib/localServices';
import styles from './AlAinAreasFooter.module.css';

export default function AlAinAreasFooter({ locale = 'ar' }) {
  const en = locale === 'en';
  const firstAreas = AREAS.slice(0, 6);
  const moreAreas = AREAS.slice(6);
  const areaList = areas => <ul className={styles.areas}>{areas.map(area => <li key={area.slug}>
    <Link href={localPath({ locale, area: area.slug })}>
      <span>{en ? area.nameEn : area.nameAr}</span>{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}
    </Link>
  </li>)}</ul>;

  return <nav className={styles.context} aria-labelledby="al-ain-footer-heading" data-al-ain-footer="true">
    <div className={styles.heading}>
      <div><p className={styles.eyebrow}><MapPin aria-hidden="true"/>{en ? 'AL AIN DIRECTORY' : 'دليل العين'}</p>
        <h2 id="al-ain-footer-heading">{en ? 'Explore Al Ain by area' : 'استكشف مناطق العين'}</h2>
        <p className={styles.description}>{en ? 'Choose an area to see its existing local directory.' : 'اختر منطقتك للوصول إلى دليلها المحلي.'}</p>
      </div>
      <Link className={styles.cityLink} href={localPath({ locale })}>{en ? 'Al Ain directory' : 'دليل العين'}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Link>
    </div>
    {areaList(firstAreas)}
    {moreAreas.length > 0 && <details className={styles.more}>
      <summary>{en ? 'See all Al Ain areas' : 'عرض كل مناطق العين'}<span aria-hidden="true">⌄</span></summary>
      {areaList(moreAreas)}
    </details>}
  </nav>;
}
