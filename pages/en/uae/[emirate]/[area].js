import DirectoryContextCompany from '../../../../components/provider/DirectoryContextCompany';
import { getCompanyStaticContextProps } from '../../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../../components/provider/RehabPresencePage';
import { getRehabStaticContextProps } from '../../../../lib/rehabPresence';
import LocalServicesPage from '../../../../components/LocalServicesPage';
import { localProps } from '../../../../lib/localRouteProps';
import { AREAS, CATEGORY } from '../../../../data/localServices';
import EnglishLayout from '../../../../components/EnglishLayout';
import FAQ from '../../../../components/FAQ';
import SeoContent from '../../../../components/SeoContent';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCardsEn from '../../../../components/SeoProofCardsEn';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import UaeActivityProviders from '../../../../components/UaeActivityProviders';
import GeographicServiceCards from '../../../../components/GeographicServiceCards';
import GeographicOfferCards from '../../../../components/GeographicOfferCards';
import { getGeographicPublishedServiceCards } from '../../../../lib/platformPublishedServiceCards';
import { ABU_DHABI_SECTOR_SEO, directorySectorSeo } from '../../../../data/abuDhabiSectorSeo';
import { UAE_SECTOR_ASSETS } from '../../../../data/uaeDirectoryVisuals';
import sectorEditorial from '../../../../data/abuDhabiSectorEditorial.json';
import { EditorialBody } from '../../../../components/DirectoryAbuDhabiSectorCard';
import AlNaeemLocalDiscovery from '../../../../components/provider/AlNaeemLocalDiscovery';
import { AL_NAEEM_EDITORIAL_DATA } from '../../../../lib/alNaeemPresence';
import { alNaeemCoverageFor } from '../../../../lib/alNaeemLocalSeo';
import { getRehabSiteData } from '../../../../lib/rehabPresence';
import UaeDirectorySectorCards from '../../../../components/UaeDirectorySectorCards';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../components/UaeContextInfoCard';
import UaeDirectorySeo from '../../../../components/UaeDirectorySeo';
import AbuDhabiAreaGuide, {isAbuDhabiDirectoryArea} from '../../../../components/AbuDhabiAreaGuide';
import {getPublishedAbuDhabiAreaCompanies} from '../../../../lib/abuDhabiAreaPublishedCompanies';
import abuAreaEditorial from '../../../../data/abuDhabiAreaEditorial.json';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';
import { getEnglishUaeDirectoryCards } from '../../../../lib/platformDirectoryCards';

function EnglishEmirateServiceHub({ emirate, service, rehab, geographicCards, geographicOffers }) {
  const seo = directorySectorSeo(service.slug, 'en', emirate);
  const geoSector = emirate.slug === 'abu-dhabi' && !!seo;
  const title = seo?.heading || `${service.nameEn} in ${emirate.nameEn}`;
  const description = seo?.description || `Explore ${service.nameEn.toLowerCase()} providers and related locations across ${emirate.nameEn}.`;
  const sectorImage = seo ? UAE_SECTOR_ASSETS[service.slug]?.desktop : undefined;
  const showSeoProof = false;
  const faqItems = [
    [`Is ${service.nameEn} available across ${emirate.nameEn}?`, `Yes. Related area links are available below so you can continue to ${service.nameEn.toLowerCase()} by area within ${emirate.nameEn}.`],
    ['Were the existing area pages removed?', 'No. Existing area pages remain active and are used as supporting internal navigation without changing their routes.'],
    ['Are real provider examples shown on this page?', showSeoProof ? 'Yes. This page includes a real path that connects the activity to a provider, service, product and quotation step.' : 'Approved providers and products are added progressively after their data is reviewed.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={title} seoTitle={seo?.title} description={description} image={sectorImage} path={`/en/uae/${emirate.slug}/${service.slug}`} alternatePath={`/uae/${emirate.slug}/${service.slug}`} emirate={emirate} service={service} />
      <EnglishLayout>
        {emirate.slug !== 'abu-dhabi' && <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />}
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={title} description={description} image={sectorImage} emirate={emirate} service={service} cleanNavigation />
          {geoSector ? <GeographicServiceCards items={geographicCards} locale="en" place="Abu Dhabi"/> : <UaeActivityProviders locale="en" emirate={emirate} service={service} rehab={rehab} />}
          {geoSector && <GeographicOfferCards items={geographicOffers} locale="en" place="Abu Dhabi"/>}
          {geoSector && sectorEditorial['en']?.[service.slug] && <section className="mx-auto max-w-6xl px-4 py-6"><details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700"><summary className="cursor-pointer text-lg font-bold text-[#193b53]">{sectorEditorial['en'][service.slug].title}</summary><div className="mt-4 space-y-4 leading-8"><EditorialBody html={sectorEditorial['en'][service.slug].html}/></div></details></section>}
          {showSeoProof && (
            <SeoProofCardsEn
              title={`Real provider, service and product path for ${service.nameEn} in ${emirate.nameEn}`}
              desc="This service hub is connected to a verified provider profile, a requestable service path, product intent and a quotation step."
            />
          )}
          {!seo && <SeoContent title={`${title} inside Biet Al Reef`}>
            <p>This is an emirate-level activity page. City and area links remain organized below so the browsing journey stays clear and consistent.</p>
          </SeoContent>}
          {!seo && <FAQ items={faqItems} title={`Frequently asked questions about ${title}`} />}
          <UaeSmartFooter locale="en" pageType="emirateService" emirate={emirate} service={service} />
        </main>
      </EnglishLayout>
    </>
  );
}

export default function EnglishAreaOrServicePage({ model, mode, emirate, area, service, directoryCards = [], publishedCompanies = [], geographicCards = null, geographicOffers = null, baniyasReadingHtml = null, rehab = null, rehabContext = false, companyContext = false, data = null, route = null, kawkabContext = null, section = null, serviceId = null, contextBase = '', unavailable = false }) {
  if (rehabContext) return <RehabPresencePage data={data} locale="en" route={route} />;
  if (companyContext) return <DirectoryContextCompany data={data} locale="en" route={route} kawkabContext={kawkabContext} section={section} serviceId={serviceId} contextBase={contextBase} unavailable={unavailable} />;
  if (model) return <LocalServicesPage model={model} />;
  if (mode === 'emirateService') {
    return <EnglishEmirateServiceHub emirate={emirate} service={service} rehab={rehab} geographicCards={geographicCards} geographicOffers={geographicOffers} />;
  }

  const abuLocal=emirate.slug==='abu-dhabi'&&isAbuDhabiDirectoryArea(area.slug);
  const localEditorial=abuLocal?abuAreaEditorial.areas[area.slug].en:null;
  const pageData = abuLocal
    ? {h1:localEditorial.title,desc:localEditorial.intro}
    : {h1:`Construction and contracting services in ${area.nameEn}`,desc:`Choose the right service in ${area.nameEn}, ${emirate.nameEn}: contracting, carpentry, marble, maintenance, interior design and building materials.`};
  const alNaeemAreaSlug = alNaeemCoverageFor(emirate.slug, area.slug);
  const showAlNaeemArea = AL_NAEEM_EDITORIAL_DATA.coverageAreas.some(item => item.slug === alNaeemAreaSlug)
    && (emirate.slug !== 'abu-dhabi' || area.slug === 'al-ain');

  const faqItems = [
    [`What services are available in ${area.nameEn}?`, `Browse contracting, maintenance, finishing, carpentry, marble, interior design and other services available in ${area.nameEn}.`],
    ['How do I request a quotation?', 'Choose the required service, then use the quotation path or ask Weyaak to help route your request.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={pageData.h1} description={pageData.desc} path={`/en/uae/${emirate.slug}/${area.slug}`} alternatePath={`/uae/${emirate.slug}/${area.slug}`} emirate={emirate} />
      <EnglishLayout>
        {emirate.slug !== 'abu-dhabi' && <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}`} backLabel={`Back to ${emirate.nameEn}`} />}
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={pageData.h1} description={pageData.desc} emirate={emirate} area={area} cleanNavigation />

          {!abuLocal&&<UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`Services and specialties available in ${area.nameEn}`} description={`This page shows every Biet Al Reef specialty in ${area.nameEn}. Choose a specialty to open its page and browse provider profiles connected to the location and specialty.`} />}

          <UaeDirectoryWeyaakCard locale="en" title={`Weyaak in ${area.nameEn}`} description={`Tell Weyaak what your project needs in ${area.nameEn}, and it will help you choose the specialty and reach the right provider or request path.`} />

          {abuLocal?<AbuDhabiAreaGuide areaSlug={area.slug} locale="en" providers={publishedCompanies} baniyasReadingHtml={baniyasReadingHtml} />:<UaeDirectorySectorCards emirate={emirate} area={area} locale="en" directoryCards={directoryCards} />}
          {showAlNaeemArea && <section className="mx-auto max-w-6xl px-4 py-8" aria-label="Cleaning company serving this area">
            <h2 className="mb-4 text-2xl font-extrabold text-[#193b54]">Cleaning company serving this area</h2>
            <div className="max-w-[620px]"><AlNaeemLocalDiscovery emirate={emirate} area={area} locale="en" /></div>
          </section>}

          {!abuLocal&&<SeoContent title={`${area.nameEn} inside Biet Al Reef UAE Directory`}>
            <p>The {area.nameEn} page in {emirate.nameEn} connects the location with available services while preserving the geographic links and a clear browsing path.</p>
          </SeoContent>}

          {!abuLocal&&<FAQ items={faqItems} title={`Frequently asked questions about services in ${area.nameEn}`} />}
          <UaeSmartFooter locale="en" pageType="area" emirate={emirate} area={area} directoryCards={directoryCards} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  if (params.emirate === 'abu-dhabi' && params.area === 'alrehab-home-clean') return getRehabStaticContextProps('en', '/uae/abu-dhabi', []);
  if (params.emirate === 'abu-dhabi' && params.area === 'al-ain') return localProps('en', []);
  const emirate = getEmirate(params.emirate);
  if (!emirate) return { notFound: true };

  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.area);

  if (!area && !service && params.emirate === 'abu-dhabi') return getCompanyStaticContextProps('en', params.area, []);
  if (!area && !service) return { notFound: true };
  const directoryCards = area ? await getEnglishUaeDirectoryCards() : [];
  const publishedCompanies=area&&emirate.slug==='abu-dhabi'&&isAbuDhabiDirectoryArea(area.slug)
    ? await getPublishedAbuDhabiAreaCompanies(directoryCards,'en',area.slug) : [];
  const baniyasReadingHtml=area?.slug==='baniyas' && emirate.slug==='abu-dhabi'
    ? (await import('../../../../data/baniyasConstructionReading')).baniyasConstructionReadingHtml('en')
    : null;
  const geographicCards = emirate.slug === 'abu-dhabi' && service && !area && ABU_DHABI_SECTOR_SEO[service.slug]
    ? await getGeographicPublishedServiceCards('en', {sector: service.slug}).catch(error => { console.error('Unable to load geographic services:', error?.message); return null; }) : null;
  const geographicOffers = emirate.slug === 'abu-dhabi' && service && !area && ABU_DHABI_SECTOR_SEO[service.slug] ? await getGeographicPublishedServiceCards('en', {sector:service.slug,cardType:'offer'}).catch(error=>{console.error('Unable to load geographic offers:',error?.message);return null;}) : null;
  const rehab = service?.slug === 'cleaning-services' && !area && emirate.slug !== 'abu-dhabi' ? await getRehabSiteData().catch(() => null) : null;

  return {
    props: {
      mode: service && !area ? 'emirateService' : 'area',
      emirate,
      area: area || null,
      service: service || null,
      directoryCards,
      publishedCompanies,
      geographicCards,
      geographicOffers,
      baniyasReadingHtml,
      rehab,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const areaPaths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => areaPaths.push({ params: { emirate: emirate.slug, area: area.slug } }));
  });
  const servicePaths = [];
  UAE_EMIRATES.forEach((emirate) => {
    SERVICE_CATEGORIES.forEach((service) => servicePaths.push({ params: { emirate: emirate.slug, area: service.slug } }));
  });
  return { paths: [...areaPaths, ...servicePaths], fallback: 'blocking' };
}
