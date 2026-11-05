import Link from 'next/link';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import { UAE_EMIRATE_GUIDES_AR } from '../data/uaeEmirateGuidesAr';
import { UAE_EMIRATE_GUIDES_EN } from '../data/uaeEmirateGuidesEn';

const sourceNamesEn = {
  'دائرة البلديات والنقل في أبوظبي': 'Abu Dhabi Department of Municipalities and Transport',
  'منصة بناء': 'Binaa construction permits platform',
  'استعلام المنشآت الهندسية': 'Abu Dhabi engineering firms',
  'بلدية دبي — إجراءات تصاريح البناء': 'Dubai Municipality: building permits',
  'بلدية دبي — التخطيط والإنشاءات': 'Dubai Municipality: planning and construction',
  'بلدية مدينة الشارقة — خدمات البناء والتشييد': 'Sharjah City Municipality: building services',
  'المنصة الرسمية لحكومة الإمارات — سلامة المباني': 'UAE Government portal',
  'دائرة البلدية والتخطيط بعجمان — طلب تصريح بناء': 'Ajman Municipality: building permits',
  'حكومة عجمان الرقمية — دليل خدمات البلدية': 'Ajman Government: municipal services',
  'بلدية رأس الخيمة — إدارة المباني والأنظمة': 'Ras Al Khaimah Municipality: building regulations',
  'خدمة تصريح بناء جديد — رأس الخيمة': 'Ras Al Khaimah: new building permit',
  'بلدية الفجيرة — منصة رخصتي للخدمات الرقمية': 'Fujairah Municipality: Rukhsati services',
  'بوابة حكومة أم القيوين': 'Umm Al Quwain Government portal',
  'المنصة الرسمية لحكومة الإمارات — الشهادات والتصاريح': 'UAE Government: certificates and permits',
};

export function emirateSummary(slug, locale) {
  return (locale === 'en' ? UAE_EMIRATE_GUIDES_EN : UAE_EMIRATE_GUIDES_AR)[slug]?.summary || '';
}

export default function DirectoryEmirateReading({ emirate, locale = 'ar' }) {
  const en = locale === 'en';
  const ar = UAE_EMIRATE_GUIDES_AR[emirate.slug];
  const english = UAE_EMIRATE_GUIDES_EN[emirate.slug];
  const blocks = en
    ? [{ type: 'paragraph', text: english.summary }, ...english.blocks, { type: 'heading', text: 'Official sources' }, ...ar.blocks.filter(block => block.type === 'link')]
    : ar.blocks;
  const name = en ? emirate.nameEn : emirate.nameAr;
  return <DirectoryReadingDialog title={en ? `${name} directory: companies and services` : ar.title} locale={locale}>
    {blocks.map((block, index) => {
      if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>;
      if (block.type === 'subheading') return <h4 key={index}>{block.text}</h4>;
      if (block.type === 'link') return <p key={index}><a href={block.href} target="_blank" rel="noopener noreferrer">{en ? (sourceNamesEn[block.text] || new URL(block.href).hostname) : block.text}</a></p>;
      return <p key={index}>{block.text}</p>;
    })}
    <p><Link href={`${en ? '/en' : ''}/uae/${emirate.slug}`}>{en ? `Explore the ${name} directory` : `استكشف دليل ${name}`}</Link></p>
  </DirectoryReadingDialog>;
}
