import Link from 'next/link';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import { AL_AIN_CITY_EDITORIAL } from '../data/alAinCityEditorial';

export default function AlAinCityReading({ locale = 'ar', description }) {
  const en = locale === 'en';
  const content = AL_AIN_CITY_EDITORIAL[locale];
  const root = `${en ? '/en' : ''}/uae/abu-dhabi/al-ain`;
  return <>
    <p>{description}</p>
    <DirectoryReadingDialog title={content.title} locale={locale}>
      {content.sections.map(section => <section key={section.heading}>
        <h3>{section.heading}</h3>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>)}
      <h3>{en ? 'Explore Al Ain specialties' : 'استكشف تخصصات العين'}</h3>
      <p><Link href={`${root}/general-contracting`}>{en ? 'Contracting and construction' : 'المقاولات والبناء'}</Link> · <Link href={`${root}/general-maintenance`}>{en ? 'Maintenance' : 'الصيانة'}</Link> · <Link href={`${root}/cleaning-services`}>{en ? 'Cleaning services' : 'خدمات التنظيف'}</Link> · <Link href={`${root}/building-materials`}>{en ? 'Building materials' : 'مواد البناء'}</Link></p>
      <p><a href="https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched" target="_blank" rel="noopener noreferrer">{en ? 'Department of Municipalities and Transport: Binaa' : 'دائرة البلديات والنقل: منصة بناء'}</a></p>
      <p><a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{en ? 'Engineering firms with valid classification' : 'الشركات الهندسية ذات التصنيف الساري'}</a></p>
    </DirectoryReadingDialog>
  </>;
}
