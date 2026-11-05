import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import DirectorySectorReading from './DirectorySectorReading';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import s from './AlAinHubPage.module.css';
import d from './DirectoryLandingPage.module.css';

export default function DirectoryUaeSectorCard({ sector, locale, Action }) {
  const en = locale === 'en';
  return <article className={`${s.card} ${d.sectorCard}`}>
    <Action item={sector} className={`${s.cardImage} ${d.sectorImage}`}>
      <DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale} />
    </Action>
    <div className={`${s.cardBody} ${d.directoryCardBody}`}>
      <h3><Action item={sector}>{sector.name[locale]}</Action></h3>
      <p className={d.sectorSummary}>{sector.description[locale]}</p>
      <div className={d.sectorActions}>
        <DirectorySectorReading sector={sector} locale={locale} />
        <Action item={sector} className={`${s.textLink} ${d.cardAction}`}>{en ? 'Explore' : 'استكشف'}{en ? <ArrowUpRight aria-hidden="true" /> : <ArrowUpLeft aria-hidden="true" />}</Action>
      </div>
    </div>
  </article>;
}
