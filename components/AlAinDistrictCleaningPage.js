import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { CleaningReadMore } from './AlAinCleaningPage';
import CleaningServiceDetails from './provider/CleaningServiceDetails';
import DirectoryCompanyCard from './provider/DirectoryCompanyCard';
import DiscoveryEntityCard from './cards/DiscoveryEntityCard';
import { cleaningContent } from '../lib/cleaningLandingContent';
import { rehabServiceImage } from '../lib/rehabServiceImages';
import { localPath } from '../lib/localServices';
import styles from './AlAinHubPage.module.css';

export default function AlAinDistrictCleaningPage({model}) {
  const {locale,area,data,service}=model, en=locale==='en';
  const name=en?area.nameEn:area.nameAr;
  const areaPath=localPath({locale,area:area.slug});
  const categoryPath=localPath({locale,area:area.slug,category:'cleaning-services'});
  const currentPath=service?`${categoryPath}/${service.slug}`:categoryPath;
  const serviceName=service?(en?service.name_en:service.name_ar):'';
  const heading=service?(en?`${serviceName} in ${name}, Al Ain`:`${serviceName} في ${name} - العين`):(en?`Cleaning services in ${name}, Al Ain`:`خدمات التنظيف في ${name} - العين`);
  const description=service?(en?service.description_en:service.description_ar):(en?`Explore cleaning services and company profiles for ${name}, Al Ain. Confirm the work scope and availability with each company.`:`تصفح خدمات التنظيف والشركات في ${name} بالعين، وتأكد من نطاق العمل وتوفر الشركة في موقعك قبل الاتفاق.`);
  const crumbs=[{name:en?'UAE':'الإمارات',href:en?'/en/uae':'/uae'},{name:en?'Abu Dhabi':'أبوظبي',href:en?'/en/uae/abu-dhabi':'/uae/abu-dhabi'},{name:en?'Al Ain':'العين',href:localPath({locale})},{name,href:areaPath},{name:en?'Cleaning':'التنظيف',href:categoryPath},...(service?[{name:serviceName,href:currentPath}]:[])];
  const providerHref=service?`${currentPath}/${data.profile.slug}`:`${categoryPath}/${data.profile.slug}`;
  const company=en?data.profile.name_en:data.profile.name_ar;
  const image=service?rehabServiceImage(service.slug):null;
  return <><SEOHead title={`${heading} | ${en?'Biet Al Reef':'بيت الريف'}`} description={description} canonicalPath={currentPath} alternatePath={localPath({locale:'en',area:area.slug,category:'cleaning-services',...(service?{service:service.slug}:{})})} noIndex noIndexFollow breadcrumbs={crumbs}/>
    <div className={styles.page} dir={en?'ltr':'rtl'} lang={locale}><Navbar locale={locale}/><main className={styles.main}>
      <nav className={styles.crumb} aria-label={en?'Breadcrumbs':'مسار التصفح'}>{crumbs.map((c,i)=><span key={c.href}><Link href={c.href}>{c.name}</Link>{i<crumbs.length-1?' / ':''}</span>)}</nav>
      <section className="rounded-2xl border border-[#E9DFCE] bg-white p-5 sm:p-8"><p className="text-xs font-bold text-[#806333]">{en?'AL AIN · ABU DHABI':'العين · أبوظبي'}</p><h1 className="mt-3 text-2xl font-extrabold leading-relaxed text-[#24354B] md:text-4xl">{heading}</h1><div className="mt-3 max-w-4xl"><CleaningReadMore text={description} en={en}/></div><p className="mt-3 text-sm leading-7 text-slate-600">{en?'Share the exact location and confirm the scope, availability and quotation with the company.':'شارك الموقع الدقيق وأكد نطاق العمل وتوفر الشركة وعرض السعر قبل الاتفاق.'}</p></section>
      {!service&&<section className={styles.section}><div className={styles.heading}><div><span className={styles.kicker}>{en?'CHOOSE THE SERVICE':'اختر الخدمة'}</span><h2>{en?`Cleaning services for ${name}`:`خدمات التنظيف في ${name}`}</h2></div></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">{data.services.map(item=>{const artwork=rehabServiceImage(item.slug);return <DiscoveryEntityCard key={item.id} locale={locale} type="service" item={{href:`${categoryPath}/${item.slug}`,name:en?item.name_en:item.name_ar,description:en?item.description_en:item.description_ar,image:artwork?.desktop,imageMobile:artwork?.mobile}}/>})}</div></section>}
      {service&&<section className="rounded-2xl border border-[#E9DFCE] bg-white p-4 md:p-7">{image&&<picture><source media="(max-width:700px)" srcSet={image.mobile}/><img src={image.desktop} alt={serviceName} width="1448" height="1086" className="max-h-80 w-full rounded-xl object-cover"/></picture>}<CleaningServiceDetails content={cleaningContent(service.slug,locale)} locale={locale}/></section>}
      <section className={styles.section}><div className={styles.heading}><div><span className={styles.kicker}>{en?'COMPANY PROFILE':'ملف الشركة'}</span><h2>{en?'A company serving Al Ain':'شركة تخدم مدينة العين'}</h2></div></div><p className="mb-3 text-sm leading-7 text-slate-600">{en?`Al Rehab lists services in Al Ain; confirm availability for ${name} and your requested work before booking.`:`تعرض الرحاب خدماتها في العين؛ أكد معها توفر الخدمة في ${name} ونطاق العمل قبل الحجز.`}</p><div className="max-w-xl"><DirectoryCompanyCard locale={locale} item={{href:providerHref,name:company,logoImage:data.media?.avatar||data.profile.logo_url,coverImage:data.media?.cover,city:en?'Al Ain':'العين',summary:en?`Confirm availability for ${name}.`:`تأكد من توفر الخدمة في ${name}.`,verified:data.profile.verification_status==='verified',phone:data.profile.phone,whatsapp:data.profile.whatsapp}}/></div></section>
      {service&&<section className={styles.section}><div className={styles.heading}><h2>{en?`More cleaning services in ${name}`:`خدمات تنظيف أخرى في ${name}`}</h2></div><div className="flex flex-wrap gap-2">{data.services.filter(item=>item.slug!==service.slug).map(item=><Link key={item.slug} href={`${categoryPath}/${item.slug}`} className="rounded-xl border border-[#E9DFCE] bg-white px-3 py-2 text-sm font-semibold">{en?item.name_en:item.name_ar}</Link>)}</div></section>}
      <section className="rounded-2xl border border-[#E9DFCE] bg-white p-5"><h2 className="text-xl font-bold">{en?'Prepare a clear request':'جهّز طلبًا واضحًا'}</h2><p className="mt-2 text-sm leading-7 text-slate-600">{en?'Include the district, size or item count, photos and preferred date. Agree on inclusions, materials, price and access before booking.':'حدد المنطقة والمساحة أو عدد القطع، وأرسل الصور والموعد المناسب. اتفق على الأعمال المشمولة والمواد والسعر وترتيبات الدخول قبل الحجز.'}</p><Link href={`${en?'/en':''}/request-quote?city=al-ain&area=${area.slug}&category=cleaning-services${service?`&service=${service.slug}`:''}`} className="mt-4 inline-flex rounded-xl bg-[#24354B] px-4 py-3 text-sm font-bold text-white">{en?'Prepare a quote request':'جهّز طلب عرض سعر'}</Link></section>
    </main><Footer locale={locale} showRequestCTA={false}/></div>
  </>;
}
