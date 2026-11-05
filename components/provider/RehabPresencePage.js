import Head from 'next/head';
import CleaningServiceDetails from './CleaningServiceDetails';
import DiscoveryEntityCard from '../cards/DiscoveryEntityCard';
import { cleaningContent, cleaningRequestMessage } from '../../lib/cleaningLandingContent';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CalendarDays, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { presencePath, REHAB_MAP_URL, REHAB_ORIGIN } from '../../lib/rehabPresence';
import { AREAS as AL_AIN_AREAS } from '../../data/localServices';
import { ABU_DHABI_AREAS } from '../../data/directoryDiscovery';
import { UAE_EMIRATES } from '../../data/siteTaxonomy';
import { rehabServiceImage, rehabServiceAlternate } from '../../lib/rehabServiceImages';
import Navbar from '../Navbar';
import Footer from '../Footer';

const copy = {
  ar: {
    home: 'الرئيسية', services: 'الخدمات', offers: 'العروض', 'service-areas': 'مناطق الخدمة',
    contact: 'اتصل الآن', whatsapp: 'تواصل عبر واتساب', more: 'عرض الكل', details: 'تفاصيل الخدمة',
    view: 'عرض التفاصيل', verified: 'شركة موثقة في بيت الريف', quote: 'اطلب عرض سعر بعد تقييم الاحتياج',
    intro: 'اعرف الخدمات والمناطق المتاحة وتواصل مباشرة مع الشركة لتأكيد نطاق العمل والموعد.',
    servicesHeading: 'خدمات الرحاب', offersHeading: 'عروض الرحاب المعتمدة', areasHeading: 'أماكن تقديم الخدمة',
    emptyServices: 'لا توجد خدمات معتمدة للنشر على المنصة حاليًا.',
    emptyOffers: 'لا توجد عروض معتمدة وسارية للنشر على المنصة حاليًا.',
    emptyAreas: 'لا توجد مناطق خدمة معتمدة للنشر حاليًا.',
    offeredInArea: 'اسأل الشركة عن توافر الخدمة في هذه المنطقة وتوقيت الزيارة قبل الحجز.',
    faq: 'أسئلة شائعة', gallery: 'أعمال معتمدة', about: 'عن الشركة', back: 'العودة إلى ملف الشركة',
    browse: 'اختر القسم المناسب', inquiry: 'للحصول على عرض دقيق، أرسل تفاصيل الموقع والخدمة عبر واتساب.',
    officialInfo: 'معلومات النشاط التجاري', businessType: 'النشاط والتخصص', years: 'سنوات الخبرة', founded: 'تأسست عام',
    hours: 'أيام العمل', publicEmail: 'البريد الإلكتروني', code: 'رقم الحساب', coverage: 'مناطق تقديم الخدمة',
    location: 'الموقع الأساسي', region: 'العين، أبوظبي', registration: 'مسجلة على بيت الريف منذ',
    browseDirectory: 'دليل الشركات', browseCleaning: 'قطاع التنظيف', published: 'خدمات منشورة ومعتمدة',
    workingWeek: 'من السبت إلى الجمعة',
    googleMaps: 'موقع الرحاب على خرائط Google', mapAddress: 'الهيلي الصناعية، العين، أبوظبي',
    openMaps: 'الموقع والاتجاهات', platformSections: 'تصفح عبر بيت الريف',
    unavailable: 'تعذر تحميل بيانات الشركة مؤقتًا. يرجى إعادة المحاولة لاحقًا.',
  },
  en: {
    home: 'Home', services: 'Services', offers: 'Offers', 'service-areas': 'Service areas',
    contact: 'Call now', whatsapp: 'WhatsApp', more: 'View all', details: 'Service details',
    view: 'View details', verified: 'Verified on Biet Al Reef', quote: 'Request a quote after assessment',
    intro: 'Explore available services and coverage areas, then contact the company to confirm scope and availability.',
    servicesHeading: 'Al Rehab services', offersHeading: 'Approved Al Rehab offers', areasHeading: 'Coverage areas',
    emptyServices: 'No services are currently approved for publication on the platform.',
    emptyOffers: 'No current offers are approved for publication on the platform.',
    emptyAreas: 'No coverage areas are currently approved for publication.',
    offeredInArea: 'Contact the company to confirm service availability and booking in this area.',
    faq: 'Frequently asked questions', gallery: 'Approved work', about: 'About the company',
    back: 'Back to company', browse: 'Explore', inquiry: 'Share the location and required work on WhatsApp to get an accurate quote.',
    officialInfo: 'Verified business information', businessType: 'Business sector', years: 'Years of experience', founded: 'Founded',
    hours: 'Working days', publicEmail: 'Business email', code: 'Account ID', coverage: 'Service coverage',
    location: 'Business location', region: 'Al Ain, Abu Dhabi', registration: 'On Biet Al Reef since',
    browseDirectory: 'Company directory', browseCleaning: 'Cleaning sector', published: 'Approved published services',
    workingWeek: 'Saturday to Friday',
    googleMaps: 'Al Rehab on Google Maps', mapAddress: 'Hili Industrial Area, Al Ain, Abu Dhabi',
    openMaps: 'Map and directions', platformSections: 'Explore on Biet Al Reef',
    unavailable: 'Company data is temporarily unavailable. Please try again later.',
  },
};

const pick = (row, locale, key = 'name') => row?.[`${key}_${locale}`] || '';
// Legacy Google Drive `uc?export=view` links are not direct, stable public
// image assets. Leave the approved URL in the database for its owner to
// replace, but never render a visibly broken image in the public page.
const detailsFor = (route, data) => route?.slug && (route.kind === 'service-areas' && route.districtArea ? route.districtArea : (route.kind === 'services' ? data.services : route.kind === 'offers' ? data.offers : data.areas).find((x) => x.slug === route.slug));
function whatsappUrl(number, name) {
  const digits = String(number || '').replace(/\D/g, '');
  const e164 = digits.startsWith('0') ? `971${digits.slice(1)}` : digits;
  if (e164.length < 9 || e164.length > 15) return null;
  return `https://wa.me/${e164}?text=${encodeURIComponent(name)}`;
}

function Collection({ items, locale, routeKind, empty, companyCover, areaSlug, citySlug, districtArea, contextBase }) {
  const t = copy[locale];
  if (!items.length) return <p className="rounded-xl border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-600 sm:rounded-2xl sm:p-7">{empty}</p>;
  if (routeKind === 'services' || routeKind === 'offers') return <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(item=>{const artwork=routeKind==='services'?rehabServiceImage(item.slug):null;return <DiscoveryEntityCard key={item.id} locale={locale} type={routeKind==='offers'?'offer':'service'} item={{href:presencePath(locale,{kind:routeKind,slug:item.slug,contextBase,...(routeKind==='services'&&areaSlug?{areaSlug,citySlug,districtArea}:{})}),name:pick(item,locale),description:pick(item,locale,'description'),image:artwork?.desktop||item.image||companyCover,imageMobile:artwork?.mobile}}/>})}</div>;
  return <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
    {items.map((item) => { const serviceImage=routeKind==='services'?rehabServiceImage(item.slug):null; return <Link key={item.id} href={presencePath(locale, { kind: routeKind, slug: item.slug, contextBase, ...(routeKind === 'services' && areaSlug ? { areaSlug, citySlug, districtArea } : {}) })} className="group flex min-w-0 flex-row overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_9px_rgba(18,42,73,.04)] transition hover:border-[#B89149] hover:shadow-lg sm:flex-col sm:rounded-[1.35rem] sm:shadow-sm sm:hover:-translate-y-1">
      {serviceImage ? <picture className="block h-24 w-24 shrink-0 overflow-hidden sm:h-44 sm:w-full"><source media="(max-width:700px)" srcSet={serviceImage.mobile}/><img loading="lazy" src={serviceImage.desktop} alt={pick(item,locale)} width="1448" height="1086" className="h-full w-full object-cover"/></picture> : item.image || (routeKind === 'services' && companyCover) ? <img loading="lazy" src={item.image || companyCover} alt={item.image ? pick(item, locale) : (locale === 'ar' ? 'الغلاف المعتمد للرحاب هوم كلين' : 'Approved Al Rehab Home Clean company cover')} className="h-24 w-24 shrink-0 object-cover sm:h-44 sm:w-full" /> : <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-[#F7F3E9] text-[#B89149] sm:h-36 sm:w-full">{routeKind === 'service-areas' ? <MapPin size={28} strokeWidth={1.4} /> : <Sparkles size={28} strokeWidth={1.4} />}</div>}
      <span className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:justify-start sm:p-5">
        <span className="text-[14px] font-extrabold leading-snug text-[#122A49] sm:mb-2 sm:text-lg">{pick(item, locale)}</span>
        {pick(item, locale, 'description') ? <span className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-600 sm:mt-0 sm:line-clamp-3 sm:text-sm sm:leading-7">{pick(item, locale, 'description')}</span> : null}
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#9A7229] sm:mt-auto sm:gap-2 sm:pt-5 sm:text-sm">{t.view} {locale === 'ar' ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}</span>
      </span>
    </Link>})}
  </div>;
}

function Section({ title, href, children, locale, mobileOrder = '' }) {
  return <section className={`mx-auto w-full max-w-6xl px-3 py-3 sm:order-none sm:px-4 sm:py-10 ${mobileOrder}`}>
    <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 sm:mb-5 sm:gap-3">
      <h2 className="text-lg font-black tracking-tight text-[#122A49] sm:text-3xl">{title}</h2>
      {href ? <Link className="inline-flex min-h-9 items-center gap-1 rounded-full border border-[#C8AB76] px-3 py-1.5 text-xs font-bold text-[#76531D] hover:bg-[#FFF8E9] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm" href={href}>{copy[locale].more} {locale === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}</Link> : null}
    </div>{children}
  </section>;
}

function RehabAreaDirectory({ locale, areas, expanded = false }) {
  const en = locale === 'en';
  const abu = UAE_EMIRATES.find(item => item.slug === 'abu-dhabi');
  const groups = [
    areas.some(item => item.slug === 'al-ain') && { id:'al-ain', title:en?'Al Ain districts':'مناطق العين', items:AL_AIN_AREAS.map(item=>({slug:item.slug, name:en?item.nameEn:item.nameAr, href:presencePath(locale,{kind:'service-areas',citySlug:'al-ain',districtArea:{slug:item.slug}})})) },
    areas.some(item => item.slug === 'abu-dhabi') && { id:'abu-dhabi', title:en?'Abu Dhabi City areas':'مناطق مدينة أبوظبي', items:(abu?.areas||[]).filter(item=>ABU_DHABI_AREAS.includes(item.slug)).map(item=>({slug:item.slug, name:en?item.nameEn:item.nameAr, href:presencePath(locale,{kind:'service-areas',citySlug:'abu-dhabi',districtArea:{slug:item.slug}})})) },
  ].filter(Boolean);
  if (!groups.length) return null;
  return <Section title={en?'Choose your area':'اختر منطقتك'} locale={locale} mobileOrder="order-6">
    <p className="mb-3 text-sm leading-7 text-slate-600">{en?'Choose your area to see the company’s services, then confirm availability for your address.':'اختر منطقتك لعرض خدمات الرحاب، ثم أكد توفرها لعنوانك والموعد المناسب.'}</p>
    <div className="grid gap-2 md:grid-cols-2">{groups.map(group=><details key={group.id} open={expanded} className="rounded-xl border border-[#e8dfd2] bg-white p-3 sm:p-4"><summary className="cursor-pointer text-sm font-bold text-[#24354b]">{group.title}</summary><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{group.items.map(item=><Link key={item.slug} href={item.href} className="rounded-lg border border-[#e8dfd2] px-2 py-2 text-center text-xs font-semibold leading-5 text-[#24354b]">{item.name}</Link>)}</div></details>)}</div>
  </Section>;
}

function BusinessInformation({ data, locale }) {
  const p = data.profile;
  const t = copy[locale];
  const category = data.categories?.[0];
  const cards = [
    { key: 'category', icon: BriefcaseBusiness, label: t.businessType, value: category ? pick(category, locale) : null },
    { key: 'location', icon: MapPin, label: t.location, value: t.mapAddress, href: REHAB_MAP_URL },
    { key: 'hours', icon: Clock3, label: t.hours, value: p.working_hours_ar ? t.workingWeek : null },
    { key: 'coverage', icon: MapPin, label: t.coverage, value: data.areas.map((area) => pick(area, locale)).join(locale === 'ar' ? '، ' : ', ') },
    { key: 'email', icon: Mail, label: t.publicEmail, value: p.public_email, href: p.public_email ? `mailto:${p.public_email}` : null },
  ].filter((card) => card.value !== null && card.value !== undefined && String(card.value).trim() !== '');
  return <div className="overflow-hidden rounded-2xl border border-[#E1D4BD] bg-white shadow-sm sm:rounded-[1.5rem]">
    <div className="border-b border-[#EDE3CF] bg-[#FFF8E9] px-3 py-2.5 text-xs font-bold text-[#7A5B27] sm:px-5 sm:py-4 sm:text-sm"><ShieldCheck size={16} className="me-2 inline-block align-middle" />{t.verified}</div>
    <div className="grid grid-cols-2 gap-px bg-[#EAE5DB] lg:grid-cols-3">
      {cards.map(({ key, icon: Icon, label, value, href }) => <div key={key} className={`min-w-0 bg-white px-3 py-3 sm:px-5 sm:py-5 ${key === 'coverage' || key === 'location' ? 'col-span-2 lg:col-span-1' : ''}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 sm:gap-2 sm:text-sm"><Icon size={15} className="shrink-0 text-[#B89149] sm:h-[18px] sm:w-[18px]" />{label}</div>
        {href ? <a href={href} className="mt-1 block break-words text-xs font-bold leading-5 text-[#122A49] underline underline-offset-4 sm:mt-2 sm:text-base">{value}</a>
          : <p className="mt-1 whitespace-pre-line text-xs font-bold leading-5 text-[#122A49] sm:mt-2 sm:text-base sm:leading-7" dir={key === 'code' ? 'ltr' : undefined}>{value}</p>}
      </div>)}
    </div>
  </div>;
}

function Seo({ data, locale, route, detail }) {
  const p = data.profile;
  const t = copy[locale];
  const area = route.directoryArea || route.districtArea || (route.areaSlug ? data.areas.find((item) => item.slug === route.areaSlug) : null);
  const canonicalRoute = route.directoryArea || route.districtArea ? (route.kind==='services' ? {kind:'services',slug:route.slug} : route.kind==='service-areas' ? {kind:'service-areas',slug:route.citySlug} : {kind:'home'}) : { ...route, contextBase: undefined };
  const path = presencePath(locale, canonicalRoute);
  const baseName = pick(p, locale);
  const pageName = detail ? (area && route.kind === 'services' ? (locale === 'ar' ? `${pick(detail, locale)} في ${pick(area, locale)}` : `${pick(detail, locale)} in ${pick(area, locale)}`) : pick(detail, locale)) : route.kind === 'home' ? baseName : t[route.kind];
  const brand = locale === 'ar' ? 'بيت الريف' : 'Biet Al Reef';
  const title = route.kind === 'home' ? `${baseName} | ${locale === 'ar' ? 'خدمات التنظيف في العين وأبوظبي' : 'Cleaning services in Al Ain and Abu Dhabi'} | ${brand}` : `${pageName} | ${baseName} | ${brand}`;
  const description = area && detail ? (locale === 'ar' ? `${pick(detail, locale)} في ${pick(area, locale)} من ${baseName}. اطلب الخدمة وحدد الموقع والموعد عبر الاتصال أو واتساب.` : `${pick(detail, locale)} in ${pick(area, locale)} by ${baseName}. Call or send your location and requirements for a quote.`) : detail ? (route.kind === 'service-areas' ? (locale === 'ar' ? `خدمات ${baseName} في ${pageName}. اختر خدمة التنظيف المناسبة وأرسل تفاصيل موقعك لترتيب عرض السعر والموعد.` : `${baseName} cleaning in ${pageName}. Explore services and share your location to arrange a quotation and visit.`) : `${pageName} — ${baseName}. ${pick(detail, locale, 'description')}`) : route.kind === 'home' ? (pick(p, locale, 'short_description') || t.intro) : `${pageName} — ${baseName}. ${t.intro}`;
  const isEmptySection = !detail && ((route.kind === 'offers' && !data.offers.length) || (route.kind === 'services' && !data.services.length) || (route.kind === 'service-areas' && !data.areas.length));
  const organization = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${REHAB_ORIGIN}/providers/alrehab-home-clean#company`,
    name: baseName, url: `${REHAB_ORIGIN}${presencePath(locale)}`, telephone: p.phone || undefined,
    hasMap: REHAB_MAP_URL,
    address: { '@type': 'PostalAddress', streetAddress: 'Building 11, Office 11, Hili Industrial Area', addressLocality: 'Al Ain', addressRegion: 'Abu Dhabi', addressCountry: 'AE' },
    ...(p.logo_url ? { logo: p.logo_url } : {}),
    ...(data.areas.length ? { areaServed: data.areas.map((area) => ({ '@type': 'AdministrativeArea', name: pick(area, locale) })) } : {}),
  };
  const schema = detail && route.kind === 'services' ? {
    '@context': 'https://schema.org', '@type': 'Service', name: pageName, description, provider: { '@id': organization['@id'] }, areaServed: area && !route.directoryArea && !route.districtArea ? [{ '@type': 'AdministrativeArea', name: pick(area, locale) }] : organization.areaServed,
  } : route.kind === 'home' ? organization : { '@context': 'https://schema.org', '@type': detail && route.kind === 'offers' ? 'WebPage' : 'CollectionPage', name: title, url: `${REHAB_ORIGIN}${path}`, about: { '@id': organization['@id'] } };
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: t.browseDirectory, item: `${REHAB_ORIGIN}${locale === 'en' ? '/en' : ''}/providers` }, { name: baseName, item: `${REHAB_ORIGIN}${presencePath(locale)}` }, ...(route.kind === 'home' ? [] : area ? [{ name: t['service-areas'], item: `${REHAB_ORIGIN}${presencePath(locale, { kind: 'service-areas' })}` }, { name: pick(area, locale), item: `${REHAB_ORIGIN}${route.directoryArea ? `${locale==='en'?'/en':''}/uae/abu-dhabi/al-ain/${area.slug}` : presencePath(locale, { kind: 'service-areas', slug: area.slug, citySlug:route.citySlug, districtArea:route.districtArea })}` }] : [{ name: t[route.kind], item: `${REHAB_ORIGIN}${presencePath(locale, { kind: route.kind })}` }]), ...(detail ? [{ name: pageName, item: `${REHAB_ORIGIN}${path}` }] : [])].map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })) };
  return <Head>
    <title>{title}</title><meta name="description" content={description} />
    <link rel="canonical" href={`${REHAB_ORIGIN}${path}`} />
    <link rel="alternate" hrefLang="ar-AE" href={`${REHAB_ORIGIN}${presencePath('ar', canonicalRoute)}`} />
    <link rel="alternate" hrefLang="en-AE" href={`${REHAB_ORIGIN}${presencePath('en', canonicalRoute)}`} />
    <link rel="alternate" hrefLang="x-default" href={`${REHAB_ORIGIN}${presencePath('ar', canonicalRoute)}`} />
    {isEmptySection || route.directoryArea || route.districtArea ? <meta name="robots" content="noindex,follow" /> : null}
    <meta property="og:title" content={title} /><meta property="og:description" content={description} />
    {data.media?.cover ? <meta property="og:image" content={`${REHAB_ORIGIN}${data.media.cover}`} /> : null}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(route.kind === 'home' ? [organization, breadcrumbs] : [organization, schema, breadcrumbs]).replace(/</g, '\\u003c') }} />
  </Head>;
}

export default function RehabPresencePage({ data: sourceData, locale = 'ar', route = { kind: 'home' }, unavailable = false }) {
  const t = copy[locale];
  const rtl = locale === 'ar';
  if (unavailable || !sourceData) return <main dir={rtl ? 'rtl' : 'ltr'} className="mx-auto max-w-4xl p-10 text-center" role="alert"><h1>{t.unavailable}</h1></main>;
  const legacyArea = (route.kind === 'service-areas' && route.slug && !['abu-dhabi','al-ain'].includes(route.slug)) || (route.areaSlug && !['abu-dhabi','al-ain'].includes(route.areaSlug));
  const scopedProfile = { ...sourceData.profile,
    short_description_ar: 'خدمات تنظيف المنازل والفلل والمفروشات في العين وأبوظبي، مع تأكيد التوفر حسب الموقع.',
    short_description_en: 'Home, villa and upholstery cleaning in Al Ain and Abu Dhabi, with availability confirmed by location.',
    description_ar: (sourceData.profile.description_ar || '').replace(/تغطي خدماتنا جميع إمارات الدولة:[^.]+\./, 'تُنسّق الطلبات في العين وأبوظبي بعد تأكيد الموقع والموعد.'),
    description_en: (sourceData.profile.description_en || '').replace('Quote requests are accepted across the UAE,', 'For Al Ain and Abu Dhabi,'),
  };
  const data = { ...sourceData, profile: scopedProfile, areas: legacyArea ? sourceData.areas : sourceData.areas.filter(area=>['abu-dhabi','al-ain'].includes(area.slug)) };
  const p = data.profile;
  const navPath = (next = { kind: 'home' }) => presencePath(locale, { ...next, contextBase: route.contextBase });
  const detail = detailsFor(route, data);
  const area = route.directoryArea || route.districtArea || (route.areaSlug ? data.areas.find((item) => item.slug === route.areaSlug) : null);
  const name = pick(p, locale);
  const phone = String(p.phone || '').replace(/[^+\d]/g, '');
  const currentName = detail ? (area && route.kind === 'services' ? (rtl ? `${pick(detail, locale)} في ${pick(area, locale)}` : `${pick(detail, locale)} in ${pick(area, locale)}`) : pick(detail, locale)) : route.kind === 'home' ? name : t[route.kind];
  const wa = whatsappUrl(p.whatsapp, cleaningRequestMessage({ locale, company: name, title: currentName, path: navPath(route) }));
  const serviceContent = detail && route.kind === 'services' ? cleaningContent(detail.slug, locale) : null;
  const serviceImage = detail && route.kind === 'services' ? rehabServiceImage(detail.slug) : null;
  const alternateImage = detail && route.kind === 'services' ? rehabServiceAlternate(detail.slug) : null;
  const categories = [
    { kind: 'services', title: t.servicesHeading, items: data.services, empty: t.emptyServices },
    { kind: 'offers', title: t.offersHeading, items: data.offers, empty: t.emptyOffers },
    { kind: 'service-areas', title: t.areasHeading, items: data.areas, empty: t.emptyAreas },
  ].filter(c => c.items.length || c.kind === route.kind);

  return <div dir={rtl ? 'rtl' : 'ltr'} lang={locale === 'ar' ? 'ar-AE' : 'en-AE'} className="min-h-screen bg-[#F8F9FB] pb-20 text-slate-800 sm:pb-0">
    <Seo data={data} locale={locale} route={route} detail={detail} />
    <Navbar locale={locale} />
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3" aria-label="Company navigation">
        <Link href={navPath()} className="flex min-w-0 items-center gap-2 sm:gap-3">
          {p.logo_url ? <img src={p.logo_url} alt="" className="h-7 w-7 shrink-0 rounded-lg border border-slate-200 bg-white object-contain sm:h-11 sm:w-11 sm:rounded-xl" /> : <Building2 className="text-[#B89149]" />}
          <strong className="truncate text-sm text-[#122A49] sm:text-lg">{name}</strong>
        </Link>
        <div className="flex min-w-0 flex-nowrap items-center justify-between gap-2 overflow-x-auto text-xs font-bold text-[#122A49] sm:flex-wrap sm:justify-start sm:gap-3 sm:overflow-visible sm:text-sm">
          <Link className="whitespace-nowrap rounded-lg bg-[#F6F3EC] px-2 py-1.5 sm:bg-transparent sm:p-0" href={navPath()}>{t.home}</Link>
          <Link className="whitespace-nowrap px-1 py-1.5 sm:p-0" href={navPath({ kind: 'services' })}>{t.services}</Link>
          {data.offers.length > 0 && <Link className="whitespace-nowrap px-1 py-1.5 sm:p-0" href={navPath({ kind: 'offers' })}>{t.offers}</Link>}
          <Link className="whitespace-nowrap px-1 py-1.5 sm:p-0" href={navPath({ kind: 'service-areas' })}>{t['service-areas']}</Link>
        </div>
      </nav>
    </header>

    <main>
    {route.directoryArea && <nav aria-label={rtl?'مسار التصفح':'Breadcrumbs'} className="mx-auto max-w-6xl px-3 py-3 text-xs text-slate-600"><Link href={`${rtl?'':'/en'}/uae/abu-dhabi/al-ain`}>{rtl?'العين':'Al Ain'}</Link> / <Link href={`${rtl?'':'/en'}/uae/abu-dhabi/al-ain/${route.directoryArea.slug}`}>{pick(route.directoryArea,locale)}</Link>{route.kind==='services'&&<> / <Link href={`${rtl?'':'/en'}/uae/abu-dhabi/al-ain/${route.directoryArea.slug}/cleaning-services/${route.slug}`}>{rtl?'العودة إلى الخدمة':'Back to service'}</Link></>}</nav>}
    <section className="overflow-hidden border-b border-[#E8E2D7] bg-white text-[#122A49] sm:border-0 sm:bg-[#132D4D] sm:text-white">
      {data.media?.cover ? <img src={data.media.cover} alt={rtl ? 'غلاف الرحاب هوم كلين المعتمد في حساب الشركة' : 'Approved Al Rehab Home Clean profile cover'} className="h-auto max-h-[330px] w-full object-cover object-center" width="1376" height="386" fetchPriority="high" /> : null}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-3 py-3 sm:flex-nowrap sm:gap-8 sm:px-4 sm:py-12">
        <div className="min-w-0 flex-1">
        <div className="mb-4 hidden flex-wrap items-center gap-2 text-sm text-white/75 sm:flex">
          <Link href={rtl ? '/providers' : '/en/providers'}>{t.browseDirectory}</Link><span>/</span><Link href={rtl ? '/services/cleaning' : '/en/categories/cleaning-services'}>{t.browseCleaning}</Link><span>/</span><Link href={navPath()}>{name}</Link>{route.kind !== 'home' ? <span>/ {currentName}</span> : null}
        </div>
        <div className="flex items-center gap-2.5 sm:block">
          {data.media?.avatar ? <img src={data.media.avatar} alt={rtl ? 'الصورة المعتمدة لحساب الرحاب' : 'Approved Al Rehab account photo'} width="800" height="800" className="h-14 w-14 shrink-0 rounded-xl border border-[#D9C8A1] object-cover sm:hidden" /> : null}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7E8] px-2 py-1 text-[10px] font-bold text-[#806024] sm:gap-2 sm:border sm:border-[#DCC18D]/50 sm:bg-[#B89149]/20 sm:px-3 sm:py-1.5 sm:text-xs sm:text-[#FFE8B6]"><ShieldCheck size={12} className="sm:h-[15px] sm:w-[15px]" />{t.verified}</span>
            <h1 className="mt-1.5 max-w-4xl text-xl font-black leading-tight sm:mt-5 sm:text-5xl">{currentName}</h1>

          </div>
        </div>
        <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8 sm:text-white/85">{detail ? pick(detail, locale, 'description') || t.inquiry : pick(p, locale, 'short_description') || t.intro}</p>
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
          {phone ? <a className="hidden min-h-12 items-center gap-2 rounded-xl bg-[#D4AD63] px-5 py-3 font-bold text-[#152E4A] hover:bg-[#F0C779] sm:inline-flex" href={`tel:${phone}`}><Phone size={18} /> {t.contact}</a> : null}
          {wa ? <a className="hidden min-h-12 items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20 sm:inline-flex" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> {t.whatsapp}</a> : null}
          <a className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[#DFD2BA] bg-[#FCF9F3] px-3 py-1.5 text-xs font-bold text-[#76531D] sm:min-h-12 sm:gap-2 sm:border-white/50 sm:bg-white/10 sm:px-5 sm:py-3 sm:text-base sm:text-white sm:hover:bg-white/20" href={REHAB_MAP_URL} target="_blank" rel="noopener noreferrer"><MapPin size={16} className="sm:h-[18px] sm:w-[18px]" /> {t.openMaps}</a>
        </div>
        </div>
        {data.media?.avatar ? <figure className="hidden w-48 shrink-0 overflow-hidden rounded-[1.5rem] border-4 border-white/20 bg-white shadow-2xl sm:block lg:w-60"><img src={data.media.avatar} alt={rtl ? 'صورة الملف الشخصي المنشورة للرحاب هوم كلين على تطبيق بيت الريف' : 'Al Rehab Home Clean approved Biet Al Reef app profile photo'} width="800" height="800" className="aspect-square w-full object-cover" /><figcaption className="px-3 py-2 text-center text-xs font-bold text-[#122A49]">{name}</figcaption></figure> : null}
      </div>
    </section>

    {route.kind === 'home' ? <div className="flex flex-col sm:block">
      <Section title={t.about} locale={locale} mobileOrder="order-2"><div className="grid items-start gap-5 md:grid-cols-[1fr_220px]"><p className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-7 text-slate-700 sm:p-6 sm:text-base sm:leading-9">{pick(p, locale, 'description') || pick(p, locale, 'short_description')}</p></div></Section>
      <Section title={t.officialInfo} locale={locale} mobileOrder="order-3"><BusinessInformation data={data} locale={locale} /></Section>
      <Section title={rtl ? 'تقييمات الرحاب على خرائط Google' : 'Al Rehab reviews on Google Maps'} locale={locale} mobileOrder="order-4"><div className="rounded-2xl border border-[#E1D4BD] bg-white p-4 sm:p-5"><p className="text-sm leading-7 text-slate-600">{rtl ? 'اطّلع على آراء العملاء من تبويب التقييمات في ملف الرحاب على خرائط Google.' : 'Read customer feedback in the reviews tab on the Al Rehab Google Maps listing.'}</p><a href={REHAB_MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D8C6A5] bg-[#F8F4ED] px-4 py-2 text-sm font-bold text-[#193b53]"><MapPin size={17} aria-hidden="true"/>{rtl ? 'افتح ملف الرحاب وتقييماته' : 'Open the listing and reviews'}</a></div></Section>
      {categories.map((c) => <Section key={c.kind} title={c.title} href={navPath({ kind: c.kind })} locale={locale} mobileOrder={c.kind === 'services' ? 'order-1' : c.kind === 'offers' ? 'order-5' : 'order-6'}><Collection contextBase={route.contextBase} items={c.items.slice(0, 3)} routeKind={c.kind} locale={locale} empty={c.empty} companyCover={data.media?.cover} /></Section>)}
      <RehabAreaDirectory locale={locale} areas={data.areas} />
      {data.projects.length ? <Section title={t.gallery} locale={locale} mobileOrder="order-7"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.projects.map((item) => <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white" key={item.id}>{item.cover_image_url ? <img src={item.cover_image_url} loading="lazy" alt={pick(item, locale, 'title')} className="h-48 w-full object-cover" /> : null}<figcaption className="p-4"><strong>{pick(item, locale, 'title')}</strong><p className="text-sm leading-7 text-slate-600">{pick(item, locale, 'description')}</p></figcaption></figure>)}</div></Section> : null}
      {data.faqs.length ? <Section title={t.faq} locale={locale} mobileOrder="order-8"><div className="space-y-2 sm:space-y-3">{data.faqs.map((faq) => <details key={faq.id} className="group rounded-xl border border-slate-200 bg-white p-3 text-sm sm:rounded-2xl sm:p-5 sm:text-base"><summary className="cursor-pointer font-bold text-[#122A49]">{pick(faq, locale, 'question')}</summary><p className="pt-2 leading-7 text-slate-600 sm:pt-3 sm:leading-8">{pick(faq, locale, 'answer')}</p></details>)}</div></Section> : null}
      <Section title={t.platformSections} locale={locale} mobileOrder="order-last"><div className="flex flex-wrap gap-1.5 rounded-2xl border border-[#E1D4BD] bg-white p-3 text-xs font-bold sm:gap-3 sm:p-5 sm:text-sm"><Link href={rtl ? '/providers' : '/en/providers'} className="rounded-lg bg-[#F2F5F8] px-3 py-2 text-[#122A49] sm:rounded-xl sm:px-5 sm:py-3">{t.browseDirectory}</Link><Link href={rtl ? '/services/cleaning' : '/en/categories/cleaning-services'} className="rounded-lg bg-[#F2F5F8] px-3 py-2 text-[#122A49] sm:rounded-xl sm:px-5 sm:py-3">{t.browseCleaning}</Link><Link href={rtl ? '/uae/abu-dhabi/al-ain/cleaning-services' : '/en/uae/abu-dhabi/al-ain/cleaning-services'} className="rounded-lg bg-[#F2F5F8] px-3 py-2 text-[#122A49] sm:rounded-xl sm:px-5 sm:py-3">{rtl ? 'شركات التنظيف في العين' : 'Cleaning in Al Ain'}</Link><a href={REHAB_MAP_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#FFF6E5] px-3 py-2 text-[#785927] sm:rounded-xl sm:px-5 sm:py-3"><MapPin size={15} className="me-1 inline-block" />{t.openMaps}</a></div></Section>
    </div> : route.slug ? <>
      <Section title={route.kind === 'services' ? (rtl ? 'تفاصيل الخدمة' : 'Service details') : currentName} locale={locale}>
        <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
          {serviceImage ? <picture><source media="(max-width:700px)" srcSet={serviceImage.mobile}/><img src={serviceImage.desktop} alt={currentName} width="1448" height="1086" className="max-h-96 w-full bg-[#f3efe7] object-contain" /></picture> : detail?.image ? <img src={detail.image} alt={currentName} className="max-h-96 w-full bg-[#f3efe7] object-contain" /> : null}
          <div className="p-6 sm:p-9">{serviceContent ? <CleaningServiceDetails content={serviceContent} locale={locale} /> : <p className="whitespace-pre-line text-base leading-9 text-slate-700">{pick(detail, locale, 'description') || (route.kind === 'service-areas' ? t.offeredInArea : t.inquiry)}</p>}
            {route.kind === 'service-areas' ? <><p className="mt-4 leading-8 text-slate-600">{rtl ? `اختر من خدمات ${name} في ${currentName}، وحدّد المنطقة ونوع العقار أو المفروشات والموعد المناسب. أرسل الصور لتوضيح المطلوب وترتيب تفاصيل الزيارة مع الشركة.` : `Explore ${name} services in ${currentName}. Share your district, property or furnishing details, photos and preferred date to arrange the visit with the company.`}</p><div className="mt-7"><Collection contextBase={route.contextBase} items={data.services} routeKind="services" locale={locale} empty={t.emptyServices} companyCover={data.media?.cover} areaSlug={route.slug} citySlug={route.citySlug} districtArea={route.districtArea} /></div></> : null}
            {area && route.kind === 'services' ? <p className="mt-4"><Link className="text-sm font-bold text-[#76531D] underline underline-offset-4" href={route.directoryArea ? `${rtl?'':'/en'}/uae/abu-dhabi/al-ain/${area.slug}/cleaning-services/${route.slug}` : navPath({ kind: 'service-areas', slug: area.slug, citySlug:route.citySlug, districtArea:route.districtArea })}>{route.directoryArea ? (rtl ? `العودة إلى الخدمة في ${pick(area, locale)}` : `Back to the service in ${pick(area, locale)}`) : (rtl ? `جميع خدمات الرحاب في ${pick(area, locale)}` : `All Al Rehab services in ${pick(area, locale)}`)}</Link></p> : null}
            {route.kind === 'services' ? <p className="mt-5"><Link href={rtl ? '/services/cleaning' : '/en/categories/cleaning-services'} className="inline-flex min-h-11 items-center rounded-xl border border-[#C8AB76] px-5 py-3 text-sm font-bold text-[#76531D]">{rtl ? 'الخدمة ضمن قطاع التنظيف على بيت الريف' : 'Explore the cleaning sector on Biet Al Reef'}</Link></p> : null}
            {alternateImage && <picture className="mt-5 block max-w-lg overflow-hidden rounded-xl"><source media="(max-width:700px)" srcSet={alternateImage.mobile}/><img loading="lazy" src={alternateImage.desktop} alt={currentName} width="1448" height="1086" className="h-auto w-full"/></picture>}
            <p className="mt-6 text-sm text-slate-600">{t.inquiry}</p>
            {wa ? <a className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D4AD63] px-5 py-3 font-bold text-[#152E4A]" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />{t.whatsapp}</a> : null}
          </div>
        </article>
      </Section>
    </> : <Section title={categories.find((c) => c.kind === route.kind)?.title} locale={locale}><Collection contextBase={route.contextBase} items={categories.find((c) => c.kind === route.kind)?.items || []} routeKind={route.kind} locale={locale} empty={categories.find((c) => c.kind === route.kind)?.empty} companyCover={data.media?.cover} /></Section>}

    {route.kind === 'service-areas' && !route.slug && <RehabAreaDirectory locale={locale} areas={data.areas} expanded />}

    {route.kind === 'services' && detail && data.services.length > 1 ? <Section title={rtl ? 'خدمات أخرى من الرحاب' : 'More Al Rehab services'} locale={locale}><Collection contextBase={route.contextBase} items={data.services.filter(item => item.slug !== detail.slug)} locale={locale} routeKind="services" companyCover={data.media?.cover} areaSlug={route.areaSlug} citySlug={route.citySlug} districtArea={route.districtArea} /></Section> : null}
    </main>
    <Footer locale={locale} showRequestCTA={false} />
    {(phone || wa) ? <nav aria-label={rtl ? 'اتصال مباشر بالرحاب' : 'Contact Al Rehab'} className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-5px_22px_rgba(18,42,73,.10)] backdrop-blur-xl sm:hidden">
      {phone ? <a href={`tel:${phone}`} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F1E1BE] px-2 py-2 text-sm font-black text-[#122A49]"><Phone size={17} />{t.contact}</a> : null}
      {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168E4B] px-2 py-2 text-sm font-black text-white"><MessageCircle size={17} />{t.whatsapp}</a> : null}
    </nav> : null}
  </div>;
}
