import DirectoryCompanyCard from './provider/DirectoryCompanyCard';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, MapPin, MessageCircle } from 'lucide-react';
import { directoryProviders } from '../data/providers';
import { buildProviderWhatsappUrl } from '../lib/providerWhatsapp';
import RehabDirectoryCard from './provider/RehabDirectoryCard';
import AlNaeemLocalDiscovery from './provider/AlNaeemLocalDiscovery';
import { AL_NAEEM_EDITORIAL_DATA } from '../lib/alNaeemPresence';
import { alNaeemCoverageFor } from '../lib/alNaeemLocalSeo';

const emirateCities = {
  'abu-dhabi': ['abu-dhabi-city', 'al-ain'],
  dubai: ['dubai-city'],
  sharjah: ['sharjah-city'],
  ajman: ['ajman-city'],
  'umm-al-quwain': ['umm-al-quwain-city'],
  'ras-al-khaimah': ['ras-al-khaimah-city'],
  fujairah: ['fujairah-city'],
};

function providerLocations(provider) {
  return provider.locations?.length
    ? provider.locations
    : [{ emirate: provider.emirate, city: provider.city, area: provider.area, coverageType: provider.area ? 'area' : 'city' }];
}

function coversLocation(provider, emirateSlug, areaSlug) {
  const locations = providerLocations(provider).filter((location) => location.emirate === emirateSlug);
  if (!locations.length) return false;
  if (!areaSlug) return true;
  if (locations.some((location) => location.coverageType === 'emirate' || location.area === areaSlug || location.city === areaSlug)) return true;
  const coveredCities = new Set(locations.filter((location) => location.coverageType === 'city').map((location) => location.city));
  return (emirateCities[emirateSlug] || []).every((city) => coveredCities.has(city));
}

function matchesSector(provider, sectorSlug) {
  return provider.categorySlugs?.includes(sectorSlug) || provider.directoryServices?.some((item) => item.categorySlug === sectorSlug);
}

function locationLabel(provider, emirateSlug, locale) {
  const isEn = locale === 'en';
  const locations = providerLocations(provider).filter((location) => location.emirate === emirateSlug);
  return locations.map((location) => {
    if (location.area) return isEn ? location.areaEn || location.area : location.areaAr || location.area;
    return isEn ? location.cityEn || location.city : location.cityAr || location.city;
  }).filter(Boolean).join(isEn ? ' · ' : ' · ');
}

function primaryLocationLabel(provider, locale) {
  const isEn = locale === 'en';
  const location = providerLocations(provider).find((item) => item.isPrimary) || providerLocations(provider)[0];
  if (!location) return '';
  const place = isEn ? location.areaEn || location.cityEn || location.area || location.city : location.areaAr || location.cityAr || location.area || location.city;
  return place;
}

function DirectoryProviderCard({ provider, emirateSlug, locale }) {
  const isEn = locale === 'en';
  const name = isEn ? provider.nameEn || provider.nameAr : provider.nameAr;
  const href = `${isEn ? '/en' : ''}/providers/${provider.slug}`;
  const location = locationLabel(provider, emirateSlug, locale);
  const whatsapp = buildProviderWhatsappUrl({
    phone: provider.whatsapp,
    locale,
    providerName: name,
    providerCode: provider.providerId,
    location,
    summary: isEn ? provider.descriptionEn || provider.descriptionAr : provider.descriptionAr,
    profilePath: href,
  }) || href;
  return <DirectoryCompanyCard locale={locale} item={{id:provider.slug,href,name,city:primaryLocationLabel(provider,locale),summary:isEn?provider.descriptionEn||provider.descriptionAr:provider.descriptionAr,coverImage:provider.cover,logoImage:provider.logo,verified:provider.verified,whatsapp,phone:provider.phone,specialties:(provider.directoryServices||[]).map(s=>isEn?s.nameEn:s.nameAr).filter(Boolean)}}/>;
}

export default function UaeActivityProviders({ emirate, area = null, service, locale = 'ar', rehab = null }) {
  const isEn = locale === 'en';
  const showRehab = service.slug === 'cleaning-services' && rehab?.services?.length > 0 &&
    rehab.categories?.some((category) => category.slug === 'cleaning-services') &&
    rehab.areas?.some((location) => location.slug === emirate.slug);
  // Standalone company page appears only within its explicitly named coverage;
  // it does not inherit the database verification state of another business.
  const naeemCoverageSlug = alNaeemCoverageFor(emirate.slug, area?.slug || null);
  const showNaeem = service.slug === 'cleaning-services'
    && AL_NAEEM_EDITORIAL_DATA.coverageAreas.some(location => location.slug === naeemCoverageSlug)
    && (emirate.slug !== 'abu-dhabi' || area?.slug === 'al-ain');
  // Removed from these directory listings at the owner's request; retain its profile.
  const providers = directoryProviders.filter((provider) => !(showRehab && ['alrehab-home-clean','alrehab-cleaning-sanitizing'].includes(provider.slug)) && !(showNaeem && provider.slug === 'al-naeem-cleaning-services') && provider.providerId !== 'BR-PROV-ALR-001' && coversLocation(provider, emirate.slug, area?.slug) && matchesSector(provider, service.slug));
  const locationName = area ? (isEn ? area.nameEn : area.nameAr) : (isEn ? emirate.nameEn : emirate.nameAr);
  return (
    <section dir={isEn ? 'ltr' : 'rtl'} className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className={isEn ? 'mb-8 text-left' : 'mb-8 text-right'}>
        <span className="inline-flex rounded-full border border-[#DCCAA7] bg-[#FFF9EC] px-4 py-1.5 text-xs font-black text-[#8A611B]">{isEn ? 'Find a company' : 'اختر الشركة المناسبة'}</span>
        <h2 className="mt-4 text-3xl font-black text-[#0F3F1A]">{isEn ? `${service.nameEn} providers in ${locationName}` : `شركات ${service.nameAr} في ${locationName}`}</h2>
      </div>
      {providers.length || showRehab || showNaeem ? <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">{showRehab ? <RehabDirectoryCard data={rehab} locale={locale} /> : null}{showNaeem ? <AlNaeemLocalDiscovery emirate={emirate} area={area} locale={locale} detailed /> : null}{providers.map((provider) => <DirectoryProviderCard key={provider.slug} provider={provider} emirateSlug={emirate.slug} locale={locale} />)}</div> : <div className="rounded-[2rem] border border-[#D7C7A7] bg-white p-8 text-center text-sm font-bold leading-7 text-gray-600"><p>{isEn ? 'Tell Biet Al Reef customer support what you need and where, and get help with your quotation request.' : 'حدّد الخدمة والمنطقة وتواصل مع خدمة عملاء بيت الريف لمساعدتك في طلب عرض السعر المناسب لاحتياجك.'}</p><a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-[#0F3F1A] px-5 text-white">{isEn ? 'Contact customer support' : 'تواصل مع خدمة العملاء'}</a></div>}
    </section>
  );
}
