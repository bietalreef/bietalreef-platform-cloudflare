import Link from 'next/link';
import AlNaeemDirectoryCard from './AlNaeemDirectoryCard';
import DiscoveryEntityCard from '../cards/DiscoveryEntityCard';
import { AL_NAEEM_EDITORIAL_DATA } from '../../lib/alNaeemPresence';
import { alNaeemCoverageFor, alNaeemContextPath, AL_NAEEM_EAST_COAST_DETAILS } from '../../lib/alNaeemLocalSeo';

export default function AlNaeemLocalDiscovery({ emirate, area = null, locale = 'ar', detailed = false, cardOnly = false, showServices = false }) {
  const coverageSlug = alNaeemCoverageFor(emirate?.slug, area?.slug || null);
  const place = AL_NAEEM_EDITORIAL_DATA.coverageAreas.find(item => item.slug === coverageSlug);
  if (!place) return null;

  const en = locale === 'en', prefix = en ? '/en' : '';
  const cityName = area ? (en ? area.nameEn : area.nameAr) : (en ? emirate.nameEn : emirate.nameAr);
  const cityDetails = AL_NAEEM_EAST_COAST_DETAILS[coverageSlug]?.[locale];
  const contextHref=alNaeemContextPath(locale,emirate.slug,area?.slug||null);
  if(!contextHref)return null;
  const companyPath=contextHref;
  const servicePath = `${prefix}/uae/${emirate.slug}${area ? `/${area.slug}` : ''}/cleaning-services`;
  const whatsappMessage = en
    ? `Hello Al Naeem, I would like a cleaning quotation in ${cityName}.\nService needed: \nProperty / parking area: \nSize / measurements: \nPreferred date: \nPhotos: \nListing: https://bietalreef.ae${servicePath}`
    : `مرحبًا شركة النعيم، أريد عرض سعر للتنظيف في ${cityName}.\nالخدمة المطلوبة: \nنوع العقار أو الموقف: \nالمساحة والمقاسات: \nالموعد المناسب: \nالصور: \nرابط الدليل: https://bietalreef.ae${servicePath}`;
  const crumbs = [
    { href: `${prefix}/uae`, label: en ? 'UAE directory' : 'المنصة' },
    { href: `${prefix}/uae/${emirate.slug}`, label: en ? emirate.nameEn : emirate.nameAr },
    ...(area ? [{ href: `${prefix}/uae/${emirate.slug}/${area.slug}`, label: cityName }] : []),
    { href: servicePath, label: en ? 'Cleaning services' : 'خدمات التنظيف' },
    { href: companyPath, label: en ? 'Al Naeem' : 'شركة النعيم' },
  ];

  // Same compact DirectoryCompanyCard used for Al Rehab on location pages.
  const profileCard=<AlNaeemDirectoryCard data={AL_NAEEM_EDITORIAL_DATA} locale={locale} coverageSlug={coverageSlug} location={cityName} whatsappMessage={whatsappMessage} contextHref={contextHref}/>;
  const publishedServices=showServices?<section aria-label={en?'Al Naeem cleaning services':'خدمات شركة النعيم للتنظيف'} className="space-y-3">
    <h3 className="text-xl font-extrabold text-[#193b53]">{en?'Al Naeem cleaning services in '+cityName:'خدمات شركة النعيم للتنظيف في '+cityName}</h3>
    <p className="text-sm leading-7 text-slate-600">{en?'Review service details for your area, then confirm coverage and appointment availability.':'استعرض تفاصيل الخدمات في منطقتك، ثم تأكد من نطاق التغطية وتوفر الموعد قبل الحجز.'}</p>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {AL_NAEEM_EDITORIAL_DATA.services.map(service=><DiscoveryEntityCard key={service.slug} type="service" locale={locale} item={{
        href:contextHref+'/services/'+service.slug,
        name:service['name_'+locale],description:service['description_'+locale],
        image:service.image,providerName:en?'Al Naeem Cleaning':'شركة النعيم لخدمات التنظيف',
        providerHref:companyPath,location:cityName
      }}/>)}
    </div>
  </section>:null;
  // Directory homepages feature one company profile; cleaning sector pages
  // feature the company's actual service cards, never a second profile card.
  if(cardOnly)return showServices?publishedServices:profileCard;

  return <div dir={en ? 'ltr' : 'rtl'} className="min-w-0 rounded-2xl border border-[#d9c9ac] bg-[#fbfaf6] p-4 sm:p-5">
    <nav aria-label={en ? 'Company discovery path' : 'مسار الوصول إلى الشركة'} className="mb-4 flex flex-wrap items-center gap-1.5 text-xs leading-6 text-[#546778]">
      {crumbs.map((crumb, index) => <span key={crumb.href} className="inline-flex items-center gap-1.5">
        {index > 0 && <span aria-hidden="true">/</span>}
        <Link href={crumb.href} className="font-semibold underline-offset-4 hover:underline">{crumb.label}</Link>
      </span>)}
    </nav>
    <h3 className="mb-2 text-xl font-extrabold leading-8 text-[#193b53]">{cityDetails?.title || (en ? `Al Naeem cleaning enquiries in ${cityName}` : `استفسارات تنظيف النعيم في ${cityName}`)}</h3>
    <p className="mb-4 text-sm leading-8 text-[#536777]">{cityDetails?.intro || place[`description_${locale}`]}</p>
    {detailed && place[`details_${locale}`] && <div className="mb-4 rounded-xl bg-white p-4 text-sm leading-8 text-[#536777]">
      <p>{place[`details_${locale}`]}</p>
      {place[`highlights_${locale}`]?.length > 0 && <ul className="mt-3 list-inside list-disc space-y-1">
        {place[`highlights_${locale}`].map(point => <li key={point}>{point}</li>)}
      </ul>}
    </div>}
    {detailed && <div className="mb-4 border-t border-[#e4dbcb] pt-4">
      <h4 className="mb-3 text-base font-extrabold text-[#193b53]">{en ? 'Additional cleaning requests to discuss' : 'خدمات تنظيف إضافية يمكن الاستفسار عنها'}</h4>
      <ul className="grid gap-2">
        {AL_NAEEM_EDITORIAL_DATA.additionalRequests.map((request) => <li key={request.slug} className="rounded-xl bg-white p-3">
          <strong className="text-sm text-[#193b53]">{request[`name_${locale}`]}</strong>
          <p className="mt-1 text-xs leading-6 text-[#536777]">{request[`description_${locale}`]}</p>
        </li>)}
      </ul>
      <p className="mt-3 text-sm leading-7 text-[#536777]">{cityDetails?.quote || (en ? 'Share the property location, size and photos. Confirm availability, scope and price with the company.' : 'أرسل الموقع والمساحة والصور، ثم تأكد من توافر الخدمة ونطاق التنفيذ والسعر مع الشركة.')}</p>
    </div>}
    {showServices?publishedServices:profileCard}
  </div>;
}
