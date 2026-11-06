import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { sectorChoices } from './MainSectorCards';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import editorial from '../data/alAinDistrictEditorial.json';
import { AL_AIN_DISTRICT_SECTOR_CONTEXTS } from '../data/alAinDistrictSectorContexts';
import { HILI_ARTICLES_EN } from '../data/alAinHiliArticlesEn';
import { localPath } from '../lib/localServices';
import styles from './AlAinSectorCards.module.css';
import topicStyles from './AlHiliSectorCards.module.css';

// Render the supplied Arabic draft as semantic text, never as injected HTML.
function ArabicArticle({ markdown }) {
  return markdown.split(/\n\s*\n/).slice(1).map((block, index) => {
    if (block.startsWith('## ')) return <h4 key={index}>{block.slice(3)}</h4>;
    return <p key={index}>{block.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
      part.startsWith('**') && part.endsWith('**') ? <strong key={partIndex}>{part.slice(2, -2)}</strong> : part
    )}</p>;
  });
}

function EnglishArticle({ sections }) {
  return sections.map(([heading, paragraph]) => <div key={heading}><h4>{heading}</h4><p>{paragraph}</p></div>);
}

function TopicIndex({ sector, locale }) {
  const en = locale === 'en';
  return <ol className={topicStyles.topics}>
    {editorial.hiliSectors[sector.slug].topics.map(topic => {
      const complete = sector.slug === 'general-contracting' && [1, 12].includes(topic.number);
      const title = en ? topic.title_en : topic.title_ar;
      if (!complete) return <li key={topic.number}><span>{title}</span><small>{en ? 'In preparation' : 'قيد الإعداد'}</small></li>;
      const arabic = editorial.articlesAr[`hili_general_contracting_${String(topic.number).padStart(2, '0')}`];
      return <li key={topic.number}><details className={topicStyles.article}>
        <summary>{title}<span>{en ? 'Read article' : 'اقرأ المقال'}</span></summary>
        <article>{en ? <EnglishArticle sections={HILI_ARTICLES_EN[topic.number]} /> : <ArabicArticle markdown={arabic} />}</article>
      </details></li>;
    })}
  </ol>;
}

export default function AlAinDistrictSectorCards({ locale = 'ar', area }) {
  const en = locale === 'en';
  const isHili = area.slug === 'al-hili';
  const areaName = en ? area.nameEn : area.nameAr;
  const districtRoot = localPath({ locale, area: area.slug });
  const cityRoot = localPath({ locale });
  const quote = `${en ? '/en' : ''}/contact`;
  return <div className={styles.grid} dir={en ? 'ltr' : 'rtl'}>
    {UAE_MAIN_SECTORS.map(sector => {
      const item = isHili ? editorial.hiliSectors[sector.slug] : AL_AIN_DISTRICT_SECTOR_CONTEXTS[area.slug]?.[sector.slug];
      if (!item) return null;
      const local = sectorChoices(sector, 'providers', locale, districtRoot, 'al-ain-district')[0];
      const city = sectorChoices(sector, 'providers', locale, cityRoot, 'al-ain')[0];
      const href = local?.href || city?.href || quote;
      const destination = local ? (en ? `Explore in ${areaName}` : `استكشف في ${areaName}`) : city ? (en ? 'Explore Al Ain specialty' : 'استكشف تخصص العين') : (en ? 'Contact support' : 'خدمة العملاء');
      return <article id={`sector-${sector.slug}`} key={sector.slug} className={styles.card}>
        <div className={styles.image}><DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale}/></div>
        <div className={styles.body}>
          <h3>{sector.name[locale]}</h3>
          <p className={styles.summary}>{item[locale]}</p>
          <div className={styles.actions}>
            <DirectoryReadingDialog title={en ? `${sector.name.en} in ${areaName}` : `${sector.name.ar} في ${areaName}`} locale={locale}>
              <p>{item[locale]}</p>
              {!isHili && <>
                <h3>{en ? `Planning in ${areaName}` : `خطط لعملك في ${areaName}`}</h3>
                <p>{editorial.areas[area.slug][locale]}</p>
                {editorial.areas[area.slug].reference && <p><a href={editorial.areas[area.slug].reference} target="_blank" rel="noopener noreferrer">{en ? 'Local heritage reference' : 'المصدر المحلي للتراث'}</a></p>}
              </>}
              {isHili && <>
              <h3>{en ? 'Al Hili guide: topics and articles' : 'دليل الهيلي: المحاور والمقالات'}</h3>
              <p>{en ? 'Topics marked “In preparation” are an editorial index, not completed articles. Open any available article below.' : 'المحاور المعلّمة «قيد الإعداد» فهرس تحريري وليست مقالات مكتملة. يمكنك فتح المقالات المتاحة أدناه.'}</p>
              <TopicIndex sector={sector} locale={locale}/>
              {sector.slug === 'general-contracting' && <section><h3>{en ? 'Official references' : 'المراجع الرسمية'}</h3>
                <p><a href="https://www.dmt.gov.ae/en/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched" target="_blank" rel="noopener noreferrer">{en ? 'Department of Municipalities and Transport: Binaa construction permits' : 'دائرة البلديات والنقل: منصة تصاريح البناء «بناء»'}</a></p>
                <p><a href="https://pages.dmt.gov.ae/en/engineering-firms" target="_blank" rel="noopener noreferrer">{en ? 'Classified engineering firms' : 'قائمة الشركات الهندسية المصنفة'}</a></p>
                <p><a href="https://visitabudhabi.ae/en/things-to-do/nature-and-wildlife/parks/hili-archaeological-garden" target="_blank" rel="noopener noreferrer">{en ? 'Al Hili archaeological garden' : 'حديقة آثار الهيلي'}</a></p>
              </section>}
              </>}
              <p><Link href={href}>{destination}</Link></p>
            </DirectoryReadingDialog>
            <Link href={href} className={styles.explore}>{destination}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Link>
          </div>
          {!local && <p className={styles.note}>{city ? (en ? 'Opens the city-wide directory; confirm coverage with the provider.' : 'يفتح دليل العين العام؛ تأكد من تغطية موقعك مع مقدم الخدمة.') : (en ? 'Our team can help with your request.' : 'فريقنا يساعدك في تجهيز طلبك.')}</p>}
        </div>
      </article>;
    })}
  </div>;
}
