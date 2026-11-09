import { alAinCompanyProps } from '../../../../../lib/alAinCompanyContext';
import DirectoryContextCompany from '../../../../../components/provider/DirectoryContextCompany';
import { getCompanyStaticContextProps } from '../../../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../../../components/provider/RehabPresencePage';
import { getRehabStaticContextProps } from '../../../../../lib/rehabPresence';
import { findAlAinSector } from '../../../../../data/alAinHub';
import { CONTENT } from '../../../../../data/alAinContent';
import LocalServicesPage from '../../../../../components/LocalServicesPage';
import { localProps } from '../../../../../lib/localRouteProps';
import { AREAS, CATEGORY } from '../../../../../data/localServices';
import EnglishLayout from '../../../../../components/EnglishLayout';
import FAQ from '../../../../../components/FAQ';
import UaeSmartFooter from '../../../../../components/UaeSmartFooter';
import UaeDirectoryHero from '../../../../../components/UaeDirectoryHero';
import SecondaryHeader from '../../../../../components/SecondaryHeader';
import UaeDirectoryWeyaakCard from '../../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../../components/UaeContextInfoCard';
import UaeActivityProviders from '../../../../../components/UaeActivityProviders';
import GeographicServiceCards from '../../../../../components/GeographicServiceCards';
import GeographicOfferCards from '../../../../../components/GeographicOfferCards';
import {getGeographicPublishedServiceCards} from '../../../../../lib/platformPublishedServiceCards';
import {abuDhabiAreaCompanyProps} from '../../../../../lib/abuDhabiAreaCompanyContext';
import {useState} from 'react';
import {directorySectorSeo} from '../../../../../data/abuDhabiSectorSeo';
import {isNorthernEmirate} from '../../../../../data/northernDirectoryContent';
import {northernDirectorySeo} from '../../../../../lib/northernDirectorySeo';
import {northernSectorGuides} from '../../../../../lib/northernSectorGuides';
import DirectorySectorQuoteForm from '../../../../../components/DirectorySectorQuoteForm';
import {UAE_SECTOR_ASSETS} from '../../../../../data/uaeDirectoryVisuals';
import areaContexts from '../../../../../data/abuDhabiAreaSectorContexts.json';
import { getRehabSiteData } from '../../../../../lib/rehabPresence';
import UaeDirectorySeo from '../../../../../components/UaeDirectorySeo';
import SectorVisualGuide from '../../../../../components/SectorVisualGuide';
import SectorTaxonomyExplorer from '../../../../../components/SectorTaxonomyExplorer';
import {getSectorTaxonomy} from '../../../../../lib/sectorTaxonomyExplorer';
import {geographicAreaCompanyProps} from '../../../../../lib/geographicCompanyContext';
import GeographicServiceDirectoryPage from '../../../../../components/GeographicServiceDirectoryPage';
import {geographicRouteProps} from '../../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../../data/directoryDiscovery';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../../data/siteTaxonomy';

export default function EnglishLocalServicePage({ model, geographicServiceCollection = false, geographicCards = null, geographicOffers = null, sectorTaxonomy = undefined, sectorGuides = null, emirate, area, service, rehab = null, rehabContext = false, companyContext = false, data = null, route = null, kawkabContext = null, section = null, serviceId = null, contextBase = '', portfolioProjects = [], unavailable = false }) {
  const [requestedService,setRequestedService]=useState('');
  if (geographicServiceCollection) return <GeographicServiceDirectoryPage model={model}/>;
  if (rehabContext) return <RehabPresencePage data={data} locale="en" route={route} />;
  if (companyContext) return <DirectoryContextCompany data={data} locale="en" route={route} kawkabContext={kawkabContext} section={section} serviceId={serviceId} contextBase={contextBase} portfolioProjects={portfolioProjects} unavailable={unavailable} />;
  if (model) return <LocalServicesPage model={model} />;
  const northern=isNorthernEmirate(emirate.slug);
  const seo = northern?northernDirectorySeo(service.slug,'en',emirate,area):directorySectorSeo(service.slug,'en',area);
  const geoSector = (['abu-dhabi','dubai'].includes(emirate.slug)||northern) && !!seo;
  const title = seo?.heading || `${service.nameEn} in ${area.nameEn}`;
  const description = seo?.description || `Explore ${service.nameEn.toLowerCase()} services in ${area.nameEn}, ${emirate.nameEn}.`;
  const localNote = northern?seo?.localNote:emirate.slug==='abu-dhabi'?areaContexts.contexts[area.slug]?.[service.slug]?.['en']:null;
  const servicePlace=northern?area.nameEn+', '+emirate.nameEn:area.nameEn;
  const sectorImage = seo ? UAE_SECTOR_ASSETS[service.slug]?.desktop : undefined;
  const faqItems = [
    [`How do I find ${service.nameEn} in ${area.nameEn}?`, 'Choose the location and service, then send the project details so the request can be routed correctly.'],
    ['Are prices fixed?', 'No unapproved prices are shown. Pricing depends on project details and the scope of work.'],
    ['Will provider or product cards appear on this page?', 'Approved provider and product cards are added progressively after review.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="en" title={title} seoTitle={seo?.title} description={description} image={sectorImage} path={`/en/uae/${emirate.slug}/${area.slug}/${service.slug}`} alternatePath={`/uae/${emirate.slug}/${area.slug}/${service.slug}`} emirate={emirate} area={area} service={service} />
      <EnglishLayout>
        {!geoSector && emirate.slug !== 'abu-dhabi' && <SecondaryHeader locale="en" backUrl={`/en/uae/${emirate.slug}/${area.slug}`} backLabel={`Back to ${area.nameEn}`} />}
        <main dir="ltr" className="bg-[#FDFBF7] text-left">
          <UaeDirectoryHero locale="en" title={title} description={description} image={sectorImage} emirate={emirate} area={area} service={service} cleanNavigation />
          {!geoSector && <UaeContextInfoCard locale="en" locationLabel={`${area.nameEn}, ${emirate.nameEn}`} title={`About ${service.nameEn} in ${area.nameEn}`} description={`This page places ${service.nameEn.toLowerCase()} in its correct location context and provides a clear path back to the area and emirate or forward to a project request.`} />}
          {geoSector ? <GeographicServiceCards items={geographicCards} locale="en" place={area.nameEn}/> : <UaeActivityProviders locale="en" emirate={emirate} area={area} service={service} rehab={rehab} />}
          {geoSector && <SectorTaxonomyExplorer sector={service.slug} items={sectorTaxonomy} locale="en" place={servicePlace} pagePath={'/en/uae/'+emirate.slug+'/'+area.slug+'/'+service.slug} serviceGuides={sectorGuides} quotePlacement={northern?'external':'inline'} onServiceRequest={setRequestedService}/>}
          {geoSector && <GeographicOfferCards items={geographicOffers} locale="en" place={area.nameEn}/>}
          {geoSector && <SectorVisualGuide sector={service.slug} locale="en" excludeSpecialties={sectorTaxonomy}/>}
          <UaeDirectoryWeyaakCard locale="en" title={`Ask Weyaak about ${service.nameEn} in ${area.nameEn}`} description="Share the service details, measurements or available photos, and Weyaak will help structure and route the request by location and specialty." />
          {localNote && <section className="mx-auto max-w-6xl px-4 py-6"><h2 className="text-xl font-bold text-[#193b53]">{`Planning the work in ${area.nameEn}`}</h2><p className="mt-3 leading-8 text-slate-700">{localNote}</p></section>}
          {!geoSector && <FAQ items={faqItems} title={`Frequently asked questions about ${title}`} />}
          <UaeSmartFooter locale="en" pageType="service" emirate={emirate} area={area} service={service} />
          {northern&&<DirectorySectorQuoteForm locale="en" place={servicePlace} groups={sectorTaxonomy||[]} requestedService={requestedService} pagePath={'/en/uae/'+emirate.slug+'/'+area.slug+'/'+service.slug}/>}
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  if (params.emirate === 'abu-dhabi' && params.area === 'alrehab-home-clean') return getRehabStaticContextProps('en', '/uae/abu-dhabi', [params.service]);
  if (params.emirate === 'abu-dhabi' && params.area === 'cleaning-services' && params.service === 'alrehab-home-clean') return getRehabStaticContextProps('en', '/uae/abu-dhabi/cleaning-services', []);
  if (['abu-dhabi','dubai'].includes(params.emirate) && UAE_MAIN_SECTORS.some(row => row.slug === params.area)) return geographicRouteProps('en', {emirate:params.emirate,sector:params.area,service:params.service});
  if (params.emirate === 'abu-dhabi' && params.area === 'al-ain' && (Boolean(CONTENT[params.service]) || Boolean(findAlAinSector(params.service)) || AREAS.some(area => area.slug === params.service))) return localProps('en', [params.service]);
  if (params.emirate === 'abu-dhabi' && params.area === 'al-ain') return alAinCompanyProps('en', params.service);
  if (params.emirate === 'abu-dhabi' && getArea('abu-dhabi', params.area) && !getServiceCategory(params.service)) return abuDhabiAreaCompanyProps('en', params.area, params.service);
  if (params.emirate === 'dubai' && getArea('dubai', params.area) && !getServiceCategory(params.service)) return geographicAreaCompanyProps('en','dubai',params.area,params.service);
  if (params.emirate === 'abu-dhabi' && !getArea('abu-dhabi', params.area) && !getServiceCategory(params.area)) return getCompanyStaticContextProps('en', params.area, [params.service]);
  const emirate = getEmirate(params.emirate);
  const area = getArea(params.emirate, params.area);
  const service = getServiceCategory(params.service);
  if (!emirate || !area || !service) return { notFound: true };
  const geoSector=(['abu-dhabi','dubai'].includes(emirate.slug)||isNorthernEmirate(emirate.slug)) && directorySectorSeo(service.slug,'en',area);
  const geographicCards = geoSector ? await getGeographicPublishedServiceCards('en', {emirate:emirate.slug,sector:service.slug,area:area.slug}).catch(error=>{console.error('Unable to load area services:',error?.message);return null;}) : null;
  const geographicOffers = geoSector ? await getGeographicPublishedServiceCards('en', {emirate:emirate.slug,sector:service.slug,area:area.slug,cardType:'offer'}).catch(error=>{console.error('Unable to load area offers:',error?.message);return null;}) : null;
  const sectorTaxonomy=geoSector?await getSectorTaxonomy(service.slug,'en',geographicCards||[]).catch(()=>null):null;
  const sectorGuides=isNorthernEmirate(emirate.slug)&&geoSector?northernSectorGuides(service.slug,'en',area.nameEn,sectorTaxonomy):null;
  const rehab = service.slug === 'cleaning-services' && !['abu-dhabi','dubai'].includes(emirate.slug) && !isNorthernEmirate(emirate.slug) ? await getRehabSiteData().catch(() => null) : null;
  return { props: { emirate, area, service, rehab, geographicCards, geographicOffers, sectorTaxonomy,sectorGuides }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = [];
  UAE_EMIRATES.forEach((emirate) => {
    emirate.areas.forEach((area) => {
      SERVICE_CATEGORIES.forEach((service) => {
        paths.push({ params: { emirate: emirate.slug, area: area.slug, service: service.slug } });
      });
    });
  });
  return { paths, fallback: 'blocking' };
}
