import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { sectorChoices } from './MainSectorCards';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import { AL_AIN_SECTOR_INTRODUCTIONS } from '../data/alAinSectorIntroductions';
import { AL_AIN_SECTOR_DETAILS } from '../data/alAinSectorDetails';
import { AL_AIN_SECTOR_TOPICS } from '../data/alAinSectorTopicIndex';
import styles from './AlAinSectorCards.module.css';

function Reading({ sector, locale, choice }) {
  const en = locale === 'en';
  const introductions = AL_AIN_SECTOR_INTRODUCTIONS[sector.slug]?.[locale] || [];
  const topics = AL_AIN_SECTOR_TOPICS[sector.slug]?.[locale] || [];
  const details = AL_AIN_SECTOR_DETAILS[sector.slug]?.[locale] || [];
  const referencesNeeded = ['general-contracting', 'interior-design', 'aluminium-glass'].includes(sector.slug);
  const title = en ? `${sector.name.en} in Al Ain` : `${sector.name.ar} في العين`;

  return <DirectoryReadingDialog title={title} locale={locale}>
    {introductions.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <h3>{en ? 'Plan, compare and agree the work in Al Ain' : 'خطط وقارن واتفق على العمل في العين'}</h3>
    {details.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {referencesNeeded && <>
      <h3>{en ? 'Official references' : 'المراجع الرسمية'}</h3>
      <p><a href="https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched" target="_blank" rel="noopener noreferrer">{en ? 'Department of Municipalities and Transport: Binaa' : 'دائرة البلديات والنقل: منصة بناء'}</a></p>
      <p><a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{en ? 'Engineering firms with valid classification' : 'الشركات الهندسية ذات التصنيف الساري'}</a></p>
    </>}
    <h3>{en ? 'Topics being prepared for this guide' : 'محاور يجري إعدادها لهذا الدليل'}</h3>
    <p>{en ? 'These are the planned topics. Their detailed articles are still being written and reviewed.' : 'هذه عناوين المحاور المخططة؛ الشروح التفصيلية ما زالت قيد الكتابة والمراجعة.'}</p>
    <ol className={styles.topics}>{topics.map(topic => <li key={topic}>{topic}</li>)}</ol>
    {choice ? <p><Link href={choice.href}>{en ? 'Explore this specialty in Al Ain' : 'استكشف التخصص في العين'}</Link></p> :
      <p>{en ? 'Customer service can help you prepare your request and check suitable options.' : 'تساعدك خدمة العملاء في تجهيز طلبك والتحقق من الخيارات المناسبة.'} <Link href={`${en ? '/en' : ''}/contact`}>{en ? 'Contact customer service' : 'تواصل مع خدمة العملاء'}</Link></p>}
  </DirectoryReadingDialog>;
}

export default function AlAinSectorCards({ locale = 'ar', sectors, locationRoot }) {
  const en = locale === 'en';
  return <div className={styles.grid} dir={en ? 'ltr' : 'rtl'}>
    {sectors.map(sector => {
      const choice = sectorChoices(sector, 'providers', locale, locationRoot, 'al-ain')[0];
      return <article id={`sector-${sector.slug}`} key={sector.slug} className={styles.card}>
        <div className={styles.image}><DirectoryResponsiveImage asset={UAE_SECTOR_ASSETS[sector.slug]} locale={locale} /></div>
        <div className={styles.body}>
          <h3>{sector.name[locale]}</h3>
          <p className={styles.summary}>{sector.description[locale]}</p>
          <div className={styles.actions}>
            <Reading sector={sector} locale={locale} choice={choice}/>
            {choice ? <Link href={choice.href} className={styles.explore}>{en ? 'Explore' : 'استكشف'}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Link> :
              <Link href={`${en ? '/en' : ''}/contact`} className={styles.explore}>{en ? 'Contact support' : 'خدمة العملاء'}{en ? <ArrowUpRight aria-hidden="true"/> : <ArrowUpLeft aria-hidden="true"/>}</Link>}
          </div>
          {!choice && <p className={styles.note}>{en ? 'Our team can help with your request.' : 'فريقنا يساعدك في تجهيز طلبك.'}</p>}
        </div>
      </article>;
    })}
  </div>;
}
