import DirectoryReadingDialog from './DirectoryReadingDialog';
import { UAE_SECTOR_GUIDES_AR } from '../data/uaeSectorGuidesAr';
import { UAE_SECTOR_GUIDES_EN } from '../data/uaeSectorGuidesEn';

export default function DirectorySectorReading({ sector, locale = 'ar' }) {
  const arabic = UAE_SECTOR_GUIDES_AR[sector.slug] || [];
  const blocks = locale === 'en'
    ? [...(UAE_SECTOR_GUIDES_EN[sector.slug] || []), ...arabic.filter(block => block.type === 'link')]
    : arabic;
  return <DirectoryReadingDialog title={sector.name[locale]} locale={locale}>
    {blocks.map((block, index) => {
      if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>;
      if (block.type === 'subheading') return <h4 key={index}>{block.text}</h4>;
      if (block.type === 'link') return <p key={index}><a href={block.href} target="_blank" rel="noopener noreferrer">{locale === 'en' ? `Official source: ${new URL(block.href).hostname}` : block.text}</a></p>;
      return <p key={index}>{block.text}</p>;
    })}
  </DirectoryReadingDialog>;
}
