import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import editorial from '../data/abuDhabiSectorEditorial.json';
import s from './AlAinHubPage.module.css';
import d from './DirectoryLandingPage.module.css';

// The reviewed draft contains paragraphs, headings, and emphasis only. Render
// those elements explicitly instead of injecting HTML into the document.
export function EditorialBody({ html }) {
  const blocks = [...html.matchAll(/<(p|h3)>([\s\S]*?)<\/\1>/g)];
  return blocks.map(([, tag, content], index) => {
    const parts = content.split(/(<strong>[\s\S]*?<\/strong>)/g).map((part, partIndex) =>
      part.startsWith('<strong>') ? <strong key={partIndex}>{part.slice(8, -9)}</strong> : part
    );
    return tag === 'h3' ? <h3 key={index}>{parts}</h3> : <p key={index}>{parts}</p>;
  });
}

export default function DirectoryAbuDhabiSectorCard({ sector, locale, Action }) {
  const en = locale === 'en';
  const entry = editorial[locale]?.[sector.slug];
  if (!entry) return null;
  return <article className={`${s.card} ${d.sectorCard}`}>
    <Action item={sector} className={`${s.cardImage} ${d.sectorImage}`}>
      <DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale}/>
    </Action>
    <div className={`${s.cardBody} ${d.directoryCardBody}`}>
      <h3><Action item={sector}>{sector.name[locale]}</Action></h3>
      <p className={d.sectorSummary}>{sector.description[locale]}</p>
      <div className={d.sectorActions}>
        <DirectoryReadingDialog title={entry.title} locale={locale}>
          <EditorialBody html={entry.html}/>
          {['general-contracting', 'interior-design'].includes(sector.slug) && <p><a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{en ? 'Engineering firms with valid classification' : 'الشركات الهندسية ذات التصنيف الساري'}</a></p>}
          <p><Action item={sector}>{en ? 'Explore the specialty' : 'استكشف التخصص'}</Action></p>
        </DirectoryReadingDialog>
        <Action item={sector} className={`${s.textLink} ${d.cardAction}`}>{en ? 'Explore' : 'استكشف'}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Action>
      </div>
    </div>
  </article>;
}
