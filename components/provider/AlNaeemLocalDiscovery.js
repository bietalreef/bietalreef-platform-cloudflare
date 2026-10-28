import Link from 'next/link';
import AlNaeemDirectoryCard from './AlNaeemDirectoryCard';
import { AL_NAEEM_EDITORIAL_DATA } from '../../lib/alNaeemPresence';
import { alNaeemCoverageFor, AL_NAEEM_EAST_COAST_DETAILS } from '../../lib/alNaeemLocalSeo';

export default function AlNaeemLocalDiscovery({ emirate, area = null, locale = 'ar', detailed = false }) {
  const coverageSlug = alNaeemCoverageFor(emirate?.slug, area?.slug || null);
  const place = AL_NAEEM_EDITORIAL_DATA.coverageAreas.find(item => item.slug === coverageSlug);
  if (!place) return null;

  const en = locale === 'en', prefix = en ? '/en' : '';
  const cityName = area ? (en ? area.nameEn : area.nameAr) : (en ? emirate.nameEn : emirate.nameAr);
  const cityDetails = AL_NAEEM_EAST_COAST_DETAILS[coverageSlug]?.[locale];
  const companyPath = `${prefix}/providers/al-naeem-cleaning-services`;
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
    <AlNaeemDirectoryCard data={AL_NAEEM_EDITORIAL_DATA} locale={locale} whatsappMessage={whatsappMessage} />
  </div>;
}
