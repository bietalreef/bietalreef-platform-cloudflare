import {useState} from 'react';
import Link from 'next/link';
import {localPath} from '../lib/localServices';
import styles from './AlAinConstructionFooter.module.css';

function FooterGroup({id, title, summary, locale, children}) {
  const [open, setOpen] = useState(false);
  const en = locale === 'en';
  return <section className={styles.group} aria-labelledby={`${id}-title`}>
    <div className={styles.groupHead}><div><h3 id={`${id}-title`}>{title}</h3><p>{summary}</p></div>
      <button type="button" className={styles.toggle} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={`${id}-links`} aria-label={`${open?(en?'Close':'إغلاق'):(en?'Open':'فتح')} ${title}`}>{open?'−':'+'}</button>
    </div>
    <div id={`${id}-links`} className={styles.groupContent} data-open={open}>{children}</div>
  </section>;
}

export default function AlAinConstructionFooter({locale='ar',areas=[]}) {
  const en=locale==='en', prefix=en?'/en':'';
  return <nav className={styles.context} aria-labelledby="construction-footer-heading">
    <div className={styles.heading}><div><span>{en?'AL AIN DIRECTORY':'دليل العين'}</span><h2 id="construction-footer-heading">{en?'Explore more for your construction project':'استكشف المزيد لمشروعك في العين'}</h2><p>{en?'Locations, project services, official guidance and business tools.':'المناطق، وخدمات المشروع، والجهات الرسمية، وأدوات الأعمال.'}</p></div><Link className={styles.cityLink} href={localPath({locale})}>{en?'Open Al Ain directory':'افتح دليل العين'}</Link></div>
    <div className={styles.grid}>
      <FooterGroup id="construction-footer-areas" locale={locale} title={en?'Al Ain areas':'مناطق العين'} summary={en?'Browse each area directory':'افتح دليل المنطقة'}>
        <ul className={styles.chips}>{areas.map(a=><li key={a.slug}><Link href={localPath({locale,area:a.slug})}>{en?a.nameEn:a.nameAr}</Link></li>)}</ul>
      </FooterGroup>
      <FooterGroup id="construction-footer-services" locale={locale} title={en?'Project services':'خدمات مشروعك'} summary={en?'Related sectors in Al Ain':'تخصصات مرتبطة في العين'}>
        <ul className={styles.linkList}><li><Link href={localPath({locale,category:'interior-design'})}>{en?'Engineering and design':'الهندسة والتصميم'}</Link></li><li><Link href={localPath({locale,category:'building-materials'})}>{en?'Building materials':'مواد البناء'}</Link></li><li><Link href={localPath({locale,category:'general-maintenance'})}>{en?'Maintenance and finishing':'الصيانة والتشطيبات'}</Link></li></ul>
      </FooterGroup>
      <FooterGroup id="construction-footer-government" locale={locale} title={en?'Official guidance':'الجهات الرسمية'} summary={en?'Permits and classifications':'التراخيص وتصنيف الشركات'}>
        <ul className={styles.linkList}><li><a href="https://binaa.dmt.gov.ae/" target="_blank" rel="noopener noreferrer">{en?'Binaa platform':'منصة بناء'}</a></li><li><a href="https://www.dmt.gov.ae/AAM/" target="_blank" rel="noopener noreferrer">{en?'Al Ain City Municipality':'بلدية مدينة العين'}</a></li><li><a href="https://pages.dmt.gov.ae/en/Engineering-Firms" target="_blank" rel="noopener noreferrer">{en?'Check firm classifications':'التحقق من تصنيف الشركات'}</a></li></ul>
      </FooterGroup>
      <FooterGroup id="construction-footer-business" locale={locale} title={en?'Biet Alreef for business':'بيت الريف للأعمال'} summary={en?'Requests and business tools':'الطلبات وأدوات الشركات'}>
        <ul className={styles.linkList}><li><Link href={`${prefix}/request-quote?city=al-ain&category=general-contracting`}>{en?'Request a quotation':'طلب عرض سعر'}</Link></li><li><Link href={`${prefix}/business-solutions`}>{en?'Business solutions':'حلول الأعمال'}</Link></li><li><Link href={`${prefix}/weyaak-ai`}>{en?'Meet Weyaak':'تعرّف على وياك'}</Link></li><li><a href="https://providers.bietalreef.ae/">{en?'Open the app':'افتح التطبيق'}</a></li></ul>
      </FooterGroup>
    </div>
  </nav>;
}
