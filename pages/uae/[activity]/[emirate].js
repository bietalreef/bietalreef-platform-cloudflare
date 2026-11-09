import {useState} from 'react';
import DubaiDecisionGuide from '../../../components/DubaiDecisionGuide';
import DirectoryContextCompany from '../../../components/provider/DirectoryContextCompany';
import { getCompanyStaticContextProps } from '../../../lib/publishedCompanyPresence';
import RehabPresencePage from '../../../components/provider/RehabPresencePage';
import { getRehabStaticContextProps } from '../../../lib/rehabPresence';
import LocalServicesPage from '../../../components/LocalServicesPage';
import { localProps } from '../../../lib/localRouteProps';
import { AREAS, CATEGORY } from '../../../data/localServices';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SecondaryHeader from '../../../components/SecondaryHeader';
import SeoContent from '../../../components/SeoContent';
import FAQ from '../../../components/FAQ';
import UaeSmartFooter from '../../../components/UaeSmartFooter';
import SeoProofCards from '../../../components/SeoProofCards';
import UaeDirectoryHero from '../../../components/UaeDirectoryHero';
import UaeActivityProviders from '../../../components/UaeActivityProviders';
import GeographicServiceCards from '../../../components/GeographicServiceCards';
import GeographicOfferCards from '../../../components/GeographicOfferCards';
import { getGeographicPublishedServiceCards } from '../../../lib/platformPublishedServiceCards';
import { ABU_DHABI_SECTOR_SEO, directorySectorSeo } from '../../../data/abuDhabiSectorSeo';
import { UAE_SECTOR_ASSETS } from '../../../data/uaeDirectoryVisuals';
import sectorEditorial from '../../../data/abuDhabiSectorEditorial.json';
import { EditorialBody } from '../../../components/DirectoryAbuDhabiSectorCard';
import AlNaeemLocalDiscovery from '../../../components/provider/AlNaeemLocalDiscovery';
import { AL_NAEEM_EDITORIAL_DATA } from '../../../lib/alNaeemPresence';
import { alNaeemCoverageFor } from '../../../lib/alNaeemLocalSeo';
import { getRehabSiteData } from '../../../lib/rehabPresence';
import UaeDirectorySectorCards from '../../../components/UaeDirectorySectorCards';
import UaeDirectoryWeyaakCard from '../../../components/UaeDirectoryWeyaakCard';
import UaeContextInfoCard from '../../../components/UaeContextInfoCard';
import UaeDirectorySeo from '../../../components/UaeDirectorySeo';
import SectorVisualGuide from '../../../components/SectorVisualGuide';
import SectorTaxonomyExplorer from '../../../components/SectorTaxonomyExplorer';
import DirectorySectorQuoteForm from '../../../components/DirectorySectorQuoteForm';
import {getSectorTaxonomy} from '../../../lib/sectorTaxonomyExplorer';
import {getAbuDhabiSectorContent} from '../../../lib/abuDhabiSectorContent';
import {isNorthernEmirate,northernAreaEditorial} from '../../../data/northernDirectoryContent';
import {northernDirectorySeo} from '../../../lib/northernDirectorySeo';
import {northernSectorGuides} from '../../../lib/northernSectorGuides';
import AbuDhabiAreaGuide, {isAbuDhabiDirectoryArea} from '../../../components/AbuDhabiAreaGuide';
import {getPublishedAbuDhabiAreaCompanies} from '../../../lib/abuDhabiAreaPublishedCompanies';
import abuAreaEditorial from '../../../data/abuDhabiAreaEditorial.json';
import { UAE_EMIRATES, SERVICE_CATEGORIES, getEmirate, getArea, getServiceCategory } from '../../../data/siteTaxonomy';
import { getArabicUaeDirectoryCards } from '../../../lib/platformDirectoryCards';

const AL_HOOT_SERVICE_SLUGS = ['marble-ceramic', 'building-materials', 'finishing-works'];

function shouldShowAlHootPath(emirateSlug, serviceSlug) {
  return false;
}

function EmirateServiceHub({ emirate, service, emirateSlug, rehab, geographicCards, geographicOffers, sectorTaxonomy, sectorGuides }) {
  const [requestedService,setRequestedService]=useState('');
  const northern=isNorthernEmirate(emirate.slug);
  const seo = northern?northernDirectorySeo(service.slug,'ar',emirate):directorySectorSeo(service.slug,'ar',emirate);
  const geoSector = (['abu-dhabi','dubai'].includes(emirate.slug)||northern) && !!seo;
  const title = seo?.heading || `${service.nameAr} في ${emirate.nameAr}`;
  const description = seo?.description || service.descAr;
  const sectorImage = seo ? UAE_SECTOR_ASSETS[service.slug]?.desktop : undefined;
  const showAlHootPath = shouldShowAlHootPath(emirateSlug, service.slug);
  const faqItems = [
    [`هل توجد ${service.nameAr} في مناطق ${emirate.nameAr}؟`, `نعم، روابط المناطق متاحة أسفل الصفحة، ويمكنك الانتقال إلى ${service.nameAr} حسب كل منطقة داخل ${emirate.nameAr}.`],
    ['هل تم حذف صفحات المناطق القديمة؟', 'لا، صفحات المناطق القديمة ما زالت تعمل، لكنها أصبحت روابط داخلية مساندة وليست خطوة رئيسية في الصفحة.'],
    ['هل توجد أمثلة حقيقية داخل الصفحة؟', showAlHootPath ? 'نعم، تم إضافة مسار واضح يربط صفحة النشاط بشركة متخصصة فعلي ومنتج وخدمة وطلب معاينة.' : 'يتم إضافة الشركات والمنتجات تدريجياً بعد مراجعة البيانات.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="ar" title={title} seoTitle={seo?.title} description={description} image={sectorImage} path={`/uae/${emirateSlug}/${service.slug}`} alternatePath={`/en/uae/${emirateSlug}/${service.slug}`} emirate={emirate} service={service} />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={title} />
        {!geoSector && emirate.slug !== 'abu-dhabi' && <SecondaryHeader backUrl={`/uae/${emirateSlug}`} backLabel={`العودة إلى ${emirate.nameAr}`} />}
        <main>
          <UaeDirectoryHero locale="ar" title={title} description={description} image={sectorImage} emirate={emirate} service={service} cleanNavigation />
          {geoSector ? <GeographicServiceCards items={geographicCards} locale="ar" place={emirate.nameAr}/> : <UaeActivityProviders locale="ar" emirate={emirate} service={service} rehab={rehab} />}
          {geoSector && <SectorTaxonomyExplorer sector={service.slug} items={sectorTaxonomy} locale="ar" place={emirate.nameAr} pagePath={'/uae/'+emirateSlug+'/'+service.slug} serviceGuides={sectorGuides} quotePlacement="external" onServiceRequest={setRequestedService}/>}
          {geoSector && <GeographicOfferCards items={geographicOffers} locale="ar" place={emirate.nameAr}/>}
          {geoSector && <SectorVisualGuide sector={service.slug} locale="ar" showEditorial excludeSpecialties={sectorTaxonomy}/>}
          {northern&&seo?.localNote&&<section className="mx-auto max-w-6xl px-4 py-6"><h2 className="text-xl font-bold text-[#193b53]">ما الذي تراجعه عند طلب {service.nameAr} في {emirate.nameAr}؟</h2><p className="mt-3 leading-8 text-slate-700">{seo.localNote}</p></section>}
          {emirate.slug==='dubai' && <DubaiDecisionGuide sector={service.slug}/>}
          {emirate.slug==='abu-dhabi' && sectorEditorial['ar']?.[service.slug] && <section className="mx-auto max-w-6xl px-4 py-6"><details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700"><summary className="cursor-pointer text-lg font-bold text-[#193b53]">{sectorEditorial['ar'][service.slug].title}</summary><div className="mt-4 space-y-4 leading-8"><EditorialBody html={sectorEditorial['ar'][service.slug].html}/></div></details></section>}
          {showAlHootPath && (
            <SeoProofCards
              title={`مسار حقيقي لخدمة ${service.nameAr} في ${emirate.nameAr}`}
              desc="تم تثبيت مربع عملي داخل صفحة النشاط يوضح أن الصفحة مرتبطة بشركة متخصصة حقيقي، خدمة قابلة للطلب، منتج واضح، وخطوة معاينة/عرض سعر عبر ملف مصنع الحوت الأبيض للرخام والجرانيت."
            />
          )}
          {!seo && <SeoContent title={`${title} داخل بيت الريف`}>
            <p>هذه صفحة نشاط على مستوى الإمارة. تظهر روابط المدن والمناطق في قسم منظم أسفل الصفحة حتى تبقى الرحلة واضحة وسهلة.</p>
            {showAlHootPath && <p className="mt-4">ولأن هذه الصفحة مرتبطة بمجال الرخام أو مواد البناء أو التشطيبات، تم دعمها بمسار فعلي يفتح ملف شركة متخصصة داخل المنصة بدلاً من الاكتفاء بنص عام.</p>}
          </SeoContent>}
          {!seo && <FAQ items={faqItems} title={`أسئلة شائعة حول ${title}`} />}
          <UaeSmartFooter locale="ar" pageType="emirateService" emirate={emirate} service={service} />
          {geoSector && <DirectorySectorQuoteForm locale="ar" place={emirate.nameAr} groups={sectorTaxonomy||[]} requestedService={requestedService} pagePath={'/uae/'+emirateSlug+'/'+service.slug}/>}
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export default function AreaOrServicePage({ model, mode, emirate, area, service, emirateSlug, areaSlug, directoryCards = [], publishedCompanies = [], geographicCards = null, geographicOffers = null, sectorTaxonomy = undefined, sectorGuides = null, baniyasReadingHtml = null, rehab = null, rehabContext = false, companyContext = false, data = null, route = null, kawkabContext = null, section = null, serviceId = null, contextBase = '', portfolioProjects = [], unavailable = false }) {
  if (rehabContext) return <RehabPresencePage data={data} locale="ar" route={route} />;
  if (companyContext) return <DirectoryContextCompany data={data} locale="ar" route={route} kawkabContext={kawkabContext} section={section} serviceId={serviceId} contextBase={contextBase} portfolioProjects={portfolioProjects} unavailable={unavailable} />;
  if (model) return <LocalServicesPage model={model} />;
  if (!emirate) return null;

  if (mode === 'emirateService') {
    return <EmirateServiceHub emirate={emirate} service={service} emirateSlug={emirateSlug} rehab={rehab} geographicCards={geographicCards} geographicOffers={geographicOffers} sectorTaxonomy={sectorTaxonomy} sectorGuides={sectorGuides} />;
  }

  if (!area) return null;

  const abuLocal=emirate.slug==='abu-dhabi'&&isAbuDhabiDirectoryArea(area.slug);
  const northernLocal=isNorthernEmirate(emirate.slug);
  const northernEditorial=northernLocal?northernAreaEditorial(emirate,area,'ar'):null;
  const localEditorial=abuLocal?abuAreaEditorial.areas[area.slug].ar:null;
  const pageData = abuLocal
    ? {h1:localEditorial.title,desc:localEditorial.intro}
    : northernEditorial?{h1:northernEditorial.title,desc:northernEditorial.intro}: {h1:`خدمات البناء والمقاولات في ${area.nameAr}`,desc:`اختر الخدمة المناسبة في ${area.nameAr} داخل ${emirate.nameAr}: مقاولات، نجارة، رخام، صيانة، تصميم داخلي ومواد بناء.`};

  const alNaeemAreaSlug = alNaeemCoverageFor(emirate.slug, area.slug);
  const showAlNaeemArea = AL_NAEEM_EDITORIAL_DATA.coverageAreas.some(item => item.slug === alNaeemAreaSlug)
    && (emirate.slug !== 'abu-dhabi' || area.slug === 'al-ain');

  const faqItems = [
    [`ما الخدمات المتاحة في ${area.nameAr}؟`, `تستطيع تصفح خدمات المقاولات والصيانة والتشطيبات والنجارة والرخام والتصميم الداخلي وغيرها داخل ${area.nameAr}.`],
    ['كيف أطلب عرض سعر؟', 'اختر الخدمة المطلوبة ثم استخدم زر طلب العرض أو اسأل وياك لتوجيه طلبك.'],
  ];

  return (
    <>
      <UaeDirectorySeo locale="ar" title={pageData.h1} description={pageData.desc} path={`/uae/${emirateSlug}/${areaSlug}`} alternatePath={`/en/uae/${emirateSlug}/${areaSlug}`} emirate={emirate} />

      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
        <Navbar pageTitle={area.nameAr} />
        {emirate.slug !== 'abu-dhabi' && <SecondaryHeader backUrl={`/uae/${emirateSlug}`} backLabel={`العودة إلى ${emirate.nameAr}`} />}

        <main>
          <UaeDirectoryHero locale="ar" title={pageData.h1} description={pageData.desc} emirate={emirate} area={area} cleanNavigation />

          {!abuLocal&&!northernLocal&&<UaeContextInfoCard locale="ar" locationLabel={`${area.nameAr}، ${emirate.nameAr}`} title={`الخدمات والتخصصات المتاحة في ${area.nameAr}`} description={`تعرض هذه الصفحة جميع تخصصات المنصة داخل ${area.nameAr}. اختر التخصص المطلوب للانتقال إلى صفحته واستعراض الشركات المرتبطين بالمكان والتخصص.`} />}

          <UaeDirectoryWeyaakCard locale="ar" title={`وياك في ${area.nameAr}`} description={`أخبر وياك بما يحتاجه مشروعك في ${area.nameAr}، وسيساعدك في تحديد التخصص والوصول إلى الشركة أو مسار الطلب المناسب.`} />

          {abuLocal||northernLocal?<AbuDhabiAreaGuide areaSlug={area.slug} locale="ar" providers={publishedCompanies} emirate={northernLocal?emirate:null} baniyasReadingHtml={baniyasReadingHtml}/>:<UaeDirectorySectorCards emirate={emirate} area={area} locale="ar" directoryCards={directoryCards} />}
          {showAlNaeemArea && <section className="mx-auto max-w-6xl px-4 py-8" aria-label="شركة تنظيف تقدم خدماتها في هذه المنطقة">
            <h2 className="mb-4 text-2xl font-extrabold text-[#193b54]">شركة تنظيف تقدم خدماتها في هذه المنطقة</h2>
            <div className="max-w-[620px]"><AlNaeemLocalDiscovery emirate={emirate} area={area} locale="ar" /></div>
          </section>}

          {!abuLocal&&!northernLocal&&<SeoContent title={`${area.nameAr} في دليل بيت الريف`}>
            <p>صفحة {area.nameAr} داخل {emirate.nameAr} تربط الموقع بالخدمات المتاحة، مع الحفاظ على الروابط الجغرافية ومسار تصفح واضح.</p>
          </SeoContent>}

          {!abuLocal&&!northernLocal&&<FAQ items={faqItems} title={`أسئلة شائعة حول الخدمات في ${area.nameAr}`} />}
          <UaeSmartFooter locale="ar" pageType="area" emirate={emirate} area={area} directoryCards={directoryCards} />
        </main>
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  if (params.activity === 'abu-dhabi' && params.emirate === 'alrehab-home-clean') return getRehabStaticContextProps('ar', '/uae/abu-dhabi', []);
  if (params.activity === 'abu-dhabi' && params.emirate === 'al-ain') return localProps('ar', []);
  const emirateSlug = params.activity;
  const secondSlug = params.emirate;
  const emirate = getEmirate(emirateSlug);
  if (!emirate) return { notFound: true };

  const area = getArea(emirateSlug, secondSlug);
  const service = getServiceCategory(secondSlug);

  if (!area && !service && ['abu-dhabi','dubai'].includes(params.activity)) return getCompanyStaticContextProps('ar', params.emirate, [],params.activity);
  if (!area && !service) return { notFound: true };
  const directoryCards = area ? await getArabicUaeDirectoryCards() : [];
  const publishedCompanies=area&&emirateSlug==='abu-dhabi'&&isAbuDhabiDirectoryArea(area.slug)
    ? await getPublishedAbuDhabiAreaCompanies(directoryCards,'ar',area.slug) : [];
  const baniyasReadingHtml=area?.slug==='baniyas' && emirate.slug==='abu-dhabi'
    ? (await import('../../../data/baniyasConstructionReading')).baniyasConstructionReadingHtml('ar')
    : null;
  const geoSector=(['abu-dhabi','dubai'].includes(emirate.slug)||isNorthernEmirate(emirate.slug)) && service && !area && ABU_DHABI_SECTOR_SEO[service.slug];
  const geographicCards = geoSector ? await getGeographicPublishedServiceCards('ar', {emirate:emirate.slug,sector: service.slug}).catch(error => { console.error('Unable to load geographic services:', error?.message); return null; }) : null;
  const geographicOffers = geoSector ? await getGeographicPublishedServiceCards('ar', {emirate:emirate.slug,sector:service.slug,cardType:'offer'}).catch(error=>{console.error('Unable to load geographic offers:',error?.message);return null;}) : null;
  const sectorTaxonomy=geoSector?await getSectorTaxonomy(service.slug,'ar',geographicCards||[]).catch(()=>null):null;
  const sectorGuides=geoSector?(isNorthernEmirate(emirate.slug)?northernSectorGuides(service.slug,'ar',emirate.nameAr,sectorTaxonomy):emirate.slug==='abu-dhabi'?getAbuDhabiSectorContent(service.slug):null):null;
  const rehab = service?.slug === 'cleaning-services' && !area && !['abu-dhabi','dubai'].includes(emirate.slug) ? await getRehabSiteData().catch(() => null) : null;

  return {
    props: {
      mode: service && !area ? 'emirateService' : 'area',
      emirate,
      area: area || null,
      service: service || null,
      emirateSlug,
      areaSlug: secondSlug,
      directoryCards,
      publishedCompanies,
      geographicCards,
      geographicOffers,
      sectorTaxonomy,
      sectorGuides,
      baniyasReadingHtml,
      rehab,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const areaPaths = UAE_EMIRATES
    .flatMap((emirate) => emirate.areas.map((area) => ({ params: { activity: emirate.slug, emirate: area.slug } })));
  const servicePaths = UAE_EMIRATES.flatMap((emirate) => SERVICE_CATEGORIES.map((service) => ({ params: { activity: emirate.slug, emirate: service.slug } })));
  return { paths: [...areaPaths, ...servicePaths], fallback: 'blocking' };
}
