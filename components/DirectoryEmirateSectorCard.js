import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import chapterIndex from '../data/abuDhabiChapterIndex.json';
import { EMIRATE_LABELS, EMIRATE_SECTOR_CONTEXTS, EMIRATE_SECTOR_ORDER } from '../data/emirateSectorContexts';
import { EMIRATE_TOPIC_ANSWERS } from '../data/emirateTopicAnswers';
import { UAE_SECTOR_GUIDES_AR } from '../data/uaeSectorGuidesAr';
import { UAE_SECTOR_GUIDES_EN } from '../data/uaeSectorGuidesEn';
import { references } from './EmirateKnowledge';
import s from './AlAinHubPage.module.css';
import d from './DirectoryLandingPage.module.css';
import guide from './EmirateSectorGuide.module.css';

import { emirateTopicTitle } from '../lib/emirateTopicTitle';

// The national directory's existing editorial guide provides the common
// professional background. Each local page adds its own location-specific
// context, locally named headings and the relevant local authority links.
function localGuideBlocks(slug, mode, locale) {
  const place = EMIRATE_LABELS[mode][locale === 'en' ? 1 : 0];
  const source = locale === 'en' ? UAE_SECTOR_GUIDES_EN : UAE_SECTOR_GUIDES_AR;
  return (source[slug] || []).filter(block =>
    block.type !== 'link' &&
    block.text !== 'المراجع الرسمية' &&
    !block.text.startsWith('اختر الإمارة واستكشف') &&
    !block.text.startsWith('لا توجد مدونة جديدة أو أقسام منفصلة')
  ).map(block => {
    let text = block.text;
    if (locale === 'ar') {
      if (text.startsWith('تختلف خدمات تصاريح البناء والاعتمادات')) {
        text = `تختلف خدمات التصاريح والاعتمادات بحسب موقع المشروع ونوع المبنى في ${place}. راجع الجهة المختصة بالموقع والاستشاري قبل البدء، واستخدم الروابط الرسمية في نهاية هذا الدليل للتحقق من الخدمة الحالية.`;
      } else {
        text = text.replaceAll('لجميع مشاريع الإمارات', `لجميع المشاريع في ${place}`)
          .replaceAll('في الإمارات', `في ${place}`)
          .replaceAll('لكل الإمارات', `لكل المواقع في ${place}`);
      }
    }
    return { ...block, text };
  });
}

export default function DirectoryEmirateSectorCard({ sector, locale = 'ar', mode, Action }) {
  const en = locale === 'en';
  const number = EMIRATE_SECTOR_ORDER.indexOf(sector.slug);
  const local = EMIRATE_SECTOR_CONTEXTS[mode]?.[number]?.[en ? 1 : 0];
  const topics = chapterIndex.items[sector.slug] || [];
  const answers = EMIRATE_TOPIC_ANSWERS[sector.slug] || [];
  if (!local || topics.length !== 17 || answers.length !== 17) return null;
  const place = EMIRATE_LABELS[mode][en ? 1 : 0];
  const reading = localGuideBlocks(sector.slug, mode, locale);
  const federalSources = (UAE_SECTOR_GUIDES_AR[sector.slug] || []).filter(block =>
    block.type === 'link' && /^https:\/\/(?:u\.ae|www\.moet\.gov\.ae)\//.test(block.href || '')
  );
  return <article className={`${s.card} ${d.sectorCard}`} id={`emirate-sector-${sector.slug}`}>
    <Action item={sector} className={`${s.cardImage} ${d.sectorImage}`}>
      <DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale}/>
    </Action>
    <div className={`${s.cardBody} ${d.directoryCardBody}`}>
      <h3><Action item={sector}>{sector.name[locale]}</Action></h3>
      <p className={d.sectorSummary}>{local}</p>
      <div className={d.sectorActions}>
        <DirectoryReadingDialog title={en ? `${sector.name.en} in ${place}` : `${sector.name.ar} في ${place}`} locale={locale}>
          <h3>{en ? `Your project in ${place}` : `ما الذي يهم مشروعك في ${place}؟`}</h3>
          <p>{local}</p>
          {reading.map((block, index) => {
            if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>;
            if (block.type === 'subheading') return <h4 key={index}>{block.text}</h4>;
            return <p key={index}>{block.text}</p>;
          })}
          <h3>{en ? '17 practical questions' : '17 محورًا يساعدك على الاختيار'}</h3>
          <p>{en ? 'These concise answers help you prepare the next step. Check current requirements for your project and location.' : 'إجابات عملية مختصرة تساعدك على تجهيز خطوتك التالية؛ تحقق من المتطلبات السارية لمشروعك وموقعك.'}</p>
          <ol className={guide.topics}>
            {topics.map((topic, index) => <li key={topic.id}>
              <h4>{emirateTopicTitle(en ? topic.enTitle : topic.arTitle, mode, locale)}</h4>
              <p>{answers[index][en ? 1 : 0]}</p>
            </li>)}
          </ol>
          <h3>{en ? 'Official references' : 'المراجع الرسمية'}</h3>
          {(references[mode] || []).map(([ar, english, href]) => <p key={href}><a href={href} target="_blank" rel="noopener noreferrer">{en ? english : ar}</a></p>)}
          {federalSources.map(source => <p key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{en ? `Official source: ${new URL(source.href).hostname}` : source.text}</a></p>)}
          <p><Action item={sector}>{en ? 'Explore this specialty' : 'استكشف هذا التخصص'}</Action></p>
        </DirectoryReadingDialog>
        <Action item={sector} className={`${s.textLink} ${d.cardAction}`}>{en ? 'Explore' : 'استكشف'}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Action>
      </div>
    </div>
  </article>;
}
