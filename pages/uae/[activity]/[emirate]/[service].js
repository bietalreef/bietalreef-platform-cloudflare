import { alAinCompanyProps } from '../../../../lib/alAinCompanyContext';
import DirectoryContextCompany from '../../../../components/provider/DirectoryContextCompany';
import { getCompanyStaticContextProps } from '../../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../../components/provider/RehabPresencePage';
import { getRehabStaticContextProps } from '../../../../lib/rehabPresence';
import { findAlAinSector } from '../../../../data/alAinHub';
import { CONTENT } from '../../../../data/alAinContent';
import LocalServicesPage from '../../../../components/LocalServicesPage';
import { localProps } from '../../../../lib/localRouteProps';
import { AREAS, CATEGORY } from '../../../../data/localServices';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import SecondaryHeader from '../../../../components/SecondaryHeader';
import FAQ from '../../../../components/FAQ';
import UaeSmartFooter from '../../../../components/UaeSmartFooter';
import SeoProofCards from '../../../../components/SeoProofCards';
import UaeDirectoryHero from '../../../../components/UaeDirectoryHero';
import UaeDirectoryWeyaakCard from '../../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../../components/UaeContextInfoCard';
import UaeActivityProviders from '../../../../components/UaeActivityProviders';
import GeographicServiceCards from '../../../../components/GeographicServiceCards';
import GeographicOfferCards from '../../../../components/GeographicOfferCards';
import {getGeographicPublishedServiceCards} from '../../../../lib/platformPublishedServiceCards';
import {abuDhabiAreaCompanyProps} from '../../../../lib/abuDhabiAreaCompanyContext';
import {directorySectorSeo} from '../../../../data/abuDhabiSectorSeo';
import {UAE_SECTOR_ASSETS} from '../../../../data/uaeDirectoryVisuals';
import areaContexts from '../../../../data/abuDhabiAreaSectorContexts.json';
import { getRehabSiteData } from '../../../../lib/rehabPresence';
import UaeDirectorySeo from '../../../../components/UaeDirectorySeo';
import SectorVisualGuide from '../../../../components/SectorVisualGuide';
import SectorTaxonomyExplorer from '../../../../components/SectorTaxonomyExplorer';
import {getSectorTaxonomy} from '../../../../lib/sectorTaxonomyExplorer';
import {geographicAreaCompanyProps} from '../../../../lib/geographicCompanyContext';
import GeographicServiceDirectoryPage from '../../../../components/GeographicServiceDirectoryPage';
import {geographicRouteProps} from '../../../../lib/geographicRouteProps';
import {UAE_MAIN_SECTORS} from '../../../../data/directoryDiscovery';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../../data/siteTaxonomy';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

export default function AreaServicePage({ model, geographicServiceCollection = false, geographicCards = null, geographicOffers = null, sectorTaxonomy = undefined, emirate, area, service, emirateSlug, areaSlug, rehab = null, rehabContext = false, companyContext = false, data = null, route = null, kawkabContext = null, section = null, serviceId = null, contextBase = '', portfolioProjects = [], unavailable = false }) {
  if (geographicServiceCollection) return <GeographicServiceDirectoryPage model={model}/>;
  if (rehabContext) return <RehabPresencePage data={data} locale="ar" route={route} />;
  if (companyContext) return <DirectoryContextCompany data={data} locale="ar" route={route} kawkabContext={kawkabContext} section={section} serviceId={serviceId} contextBase={contextBase} portfolioProjects={portfolioProjects} unavailable={unavailable} />;
  if (model) return <LocalServicesPage model={model} />;
  const seo = directorySectorSeo(service.slug, 'ar', area);
  const geoSector = ['abu-dhabi','dubai'].includes(emirate.slug) && !!seo;
  const title = seo?.heading || `${service.nameAr} في ${area.nameAr}`;
  const description = seo?.description || `استعرض خدمات ${service.nameAr} في ${area.nameAr}، ${emirate.nameAr}، واطلب عرض سعر يناسب احتياجك.`;
  const localNote = emirate.slug==='abu-dhabi' ? areaContexts.contexts[area.slug]?.[service.slug]?.['ar'] : null;
  const sectorImage = seo ? UAE_SECTOR_ASSETS[service.slug]?.desktop : undefined;
  const showAlHootPath = false;
  const faqItems = [
    [`كيف أجد ${service.nameAr} في ${area.nameAr}؟`, 'حدد المكان والخدمة ثم أرسل طلبك ليتم توجيهه حسب تفاصيل المشروع.'],
    ['هل الأسعار ثابتة؟', 'لا نعرض أسعارًا غير معتمدة. السعر يعتمد على تفاصيل المشروع ونطاق العمل.'],
    ['هل توجد بطاقة جهة أو منتج داخل الصفحة؟', showAlHootPath ? 'نعم، في هذه الصفحة يظهر مسار مرتبط بشركة متخصصة فعلي وخدمة ومنتج وطلب معاينة.' : 'تتم إضافة البطاقات تدريجياً بعد مراجعة الشركات والمنتجات.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="ar" title={title} seoTitle={seo?.title} description={description} image={sectorImage} path={`/uae/${emirateSlug}/${areaSlug}/${service.slug}`} alternatePath={`/en/uae/${emirateSlug}/${areaSlug}/${service.slug}`} emirate={emirate} area={area} service={service} />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        {!geoSector && emirate.slug !== 'abu-dhabi' && <SecondaryHeader backUrl={`/uae/${emirateSlug}/${areaSlug}`} backLabel={`العودة إلى ${area.nameAr}`} />}
        <main>
          <UaeDirectoryHero locale="ar" title={title} description={description} image={sectorImage} emirate={emirate} area={area} service={service} cleanNavigation />
          {!geoSector && <UaeContextInfoCard locale="ar" locationLabel={`${area.nameAr}، ${emirate.nameAr}`} title={`عن خدمة ${service.nameAr} في ${area.nameAr}`} description={`${service.descAr} تعرض الصفحة هذا التخصص ضمن موقعه الصحيح، مع مسار واضح للعودة إلى المنطقة والإمارة أو الانتقال إلى الطلب.`} />}
          {geoSector ? <GeographicServiceCards items={geographicCards} locale="ar" place={area.nameAr}/> : <UaeActivityProviders locale="ar" emirate={emirate} area={area} service={service} rehab={rehab} />}
          {geoSector && <SectorTaxonomyExplorer sector={service.slug} items={sectorTaxonomy} locale="ar" place={area.nameAr} pagePath={'/uae/'+emirateSlug+'/'+areaSlug+'/'+service.slug}/>}
          {geoSector && <GeographicOfferCards items={geographicOffers} locale="ar" place={area.nameAr}/>}
          {geoSector && <SectorVisualGuide sector={service.slug} locale="ar" excludeSpecialties={sectorTaxonomy}/>}
          <UaeDirectoryWeyaakCard locale="ar" title={`اسأل وياك عن ${service.nameAr} في ${area.nameAr}`} description="أرسل تفاصيل الخدمة والمقاسات أو الصور المتاحة، وسيساعدك وياك في ترتيب الطلب وتوجيهه حسب المكان والتخصص." />
          {localNote && <section className="mx-auto max-w-6xl px-4 py-6"><h2 className="text-xl font-bold text-[#193b53]">{`ما الذي تراجعه قبل الطلب في ${area.nameAr}؟`}</h2><p className="mt-3 leading-8 text-slate-700">{localNote}</p></section>}
          {showAlHootPath && (
            <SeoProofCards
              title={`جهة وخدمة ومنتج داخل صفحة ${title}`}
              desc="هذا المربع يربط صفحة SEO الجغرافية بمسار حقيقي: مصنع الحوت كشركة متخصصة، خدمة توريد وتركيب، منتج رخام/جرانيت حسب الطلب، وخطوة معاينة أو عرض سعر واضحة."
            />
          )}
          {!geoSector && <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />}
          <UaeSmartFooter locale="ar" pageType="service" emirate={emirate} area={area} service={service} />
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  if (params.activity === 'abu-dhabi' && params.emirate === 'alrehab-home-clean') return getRehabStaticContextProps('ar', '/uae/abu-dhabi', [params.service]);
  if (params.activity === 'abu-dhabi' && params.emirate === 'cleaning-services' && params.service === 'alrehab-home-clean') return getRehabStaticContextProps('ar', '/uae/abu-dhabi/cleaning-services', []);
  if (['abu-dhabi','dubai'].includes(params.activity) && UAE_MAIN_SECTORS.some(row => row.slug === params.emirate)) return geographicRouteProps('ar', {emirate:params.activity,sector:params.emirate,service:params.service});
  if (params.activity === 'abu-dhabi' && params.emirate === 'al-ain' && (Boolean(CONTENT[params.service]) || Boolean(findAlAinSector(params.service)) || AREAS.some(area => area.slug === params.service))) return localProps('ar', [params.service]);
  if (params.activity === 'abu-dhabi' && params.emirate === 'al-ain') return alAinCompanyProps('ar', params.service);
  if (params.activity === '[emirate]' && params.emirate === '[area]' && params.service === '[service]') {
    return {
      redirect: {
        destination: '/uae',
        permanent: true,
      },
    };
  }
  if (params.activity === 'abu-dhabi' && getArea('abu-dhabi', params.emirate) && !getServiceCategory(params.service)) return abuDhabiAreaCompanyProps('ar', params.emirate, params.service);
  if (params.activity === 'dubai' && getArea('dubai', params.emirate) && !getServiceCategory(params.service)) return geographicAreaCompanyProps('ar','dubai',params.emirate,params.service);
  if (params.activity === 'abu-dhabi' && !getArea('abu-dhabi', params.emirate) && !getServiceCategory(params.emirate)) return getCompanyStaticContextProps('ar', params.emirate, [params.service]);
  const emirateSlug = params.activity;
  const areaSlug = params.emirate;
  const serviceSlug = params.service;
  const emirate = getEmirate(emirateSlug);
  const area = getArea(emirateSlug, areaSlug);
  const service = getServiceCategory(serviceSlug);
  if (!emirate || !area || !service) return { notFound: true };
  const geoSector=['abu-dhabi','dubai'].includes(emirate.slug) && directorySectorSeo(service.slug, 'ar', area);
  const geographicCards = geoSector ? await getGeographicPublishedServiceCards('ar', {emirate:emirate.slug,sector:service.slug,area:area.slug}).catch(error=>{console.error('Unable to load area services:',error?.message);return null;}) : null;
  const geographicOffers = geoSector ? await getGeographicPublishedServiceCards('ar', {emirate:emirate.slug,sector:service.slug,area:area.slug,cardType:'offer'}).catch(error=>{console.error('Unable to load area offers:',error?.message);return null;}) : null;
  const sectorTaxonomy=geoSector?await getSectorTaxonomy(service.slug,'ar',geographicCards||[]).catch(()=>null):null;
  const rehab = service.slug === 'cleaning-services' && !['abu-dhabi','dubai'].includes(emirate.slug) ? await getRehabSiteData().catch(() => null) : null;
  return { props: { emirate, area, service, emirateSlug, areaSlug, rehab, geographicCards, geographicOffers, sectorTaxonomy }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const paths = UAE_EMIRATES.flatMap((emirate) => emirate.areas.flatMap((area) => SERVICE_CATEGORIES.map((service) => ({ params: { activity: emirate.slug, emirate: area.slug, service: service.slug } }))));
  return { paths, fallback: 'blocking' };
}
