import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpLeft, ArrowUpRight, Search } from 'lucide-react';
import { UAE_MAIN_SECTORS, matchesDirectorySector } from '../data/directoryDiscovery';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import { PROVIDER_SECTOR_EDITORIAL } from '../data/providerSectorEditorial';
import { sectorChoices } from './MainSectorCards';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import styles from './ProviderSectorCards.module.css';

export default function ProviderSectorCards({ locale = 'ar' }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  const Arrow = en ? ArrowUpRight : ArrowUpLeft;
  const [query, setQuery] = useState('');
  const sectors = UAE_MAIN_SECTORS.filter(sector => matchesDirectorySector(sector, query));
  return <>
  <label className={styles.search}><Search aria-hidden="true"/><span className={styles.srOnly}>{en ? 'Search business sectors' : 'ابحث عن قطاع للشركات'}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={en ? 'Search construction, maintenance, cleaning…' : 'ابحث عن مقاولات، صيانة، تنظيف…'}/></label>
  {query && <p className={styles.result} role="status">{en ? `Matching sectors: ${sectors.length}` : `نتائج البحث: ${sectors.length}`}</p>}
  <div className={styles.grid}>
    {sectors.map(sector => {
      const choices = sectorChoices(sector, 'providers', locale);
      const guide = PROVIDER_SECTOR_EDITORIAL[sector.slug]?.[locale];
      const primary = choices[0];
      return <article key={sector.slug} id={`sector-${sector.slug}`} className={styles.card}>
        <div className={styles.image}><DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale}/></div>
        <div className={styles.body}>
          <h3>{sector.name[locale]}</h3>
          <p className={styles.summary}>{sector.description[locale]}</p>
          <div className={styles.actions}>
            <DirectoryReadingDialog title={sector.name[locale]} locale={locale} triggerLabel={en ? `Read more about ${sector.name.en}` : `المزيد عن ${sector.name.ar}`}>
              <p>{guide.intro}</p>
              {guide.sections.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}
              <h3>{en ? 'Explore this sector' : 'استكشف تخصصات هذا القسم'}</h3>
              {choices.map(choice => <p key={choice.slug}><Link href={choice.href}>{choice.name}</Link></p>)}
              <p><Link href={`${prefix}/request-quote`}>{en ? 'Prepare a quotation request' : 'جهّز طلب عرض سعر'}</Link></p>
              {['general-contracting','interior-design'].includes(sector.slug) && <><h3>{en ? 'Official references' : 'مراجع رسمية'}</h3>
                <p><a href="https://u.ae/en/information-and-services/justice-safety-and-the-law/building-safety" target="_blank" rel="noopener noreferrer">{en ? 'UAE Government: building safety' : 'حكومة الإمارات: سلامة المباني'}</a></p>
                <p><a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{en ? 'Abu Dhabi: engineering firms with valid classification' : 'أبوظبي: الشركات الهندسية ذات التصنيف الساري'}</a></p></>}
            </DirectoryReadingDialog>
            {primary ? <Link className={styles.explore} href={primary.href}>{en ? 'Explore' : 'استكشف'}<Arrow aria-hidden="true"/></Link> : <a className={styles.explore} href="https://wa.me/971564456337">{en ? 'Customer service' : 'خدمة العملاء'}<Arrow aria-hidden="true"/></a>}
          </div>
        </div>
      </article>;
    })}
  </div>
  {query && !sectors.length && <p className={styles.result}>{en ? 'Try another term or contact customer service.' : 'جرّب كلمة أخرى أو تواصل مع خدمة العملاء.'} <a href="https://wa.me/971564456337">{en ? 'Contact customer service' : 'تواصل مع خدمة العملاء'}</a></p>}
  </>;
}
