import { getPlatformChannelServiceCards, getPlatformChannelOfferCards } from '../../lib/platformPublishedServiceCards';
import PublishedOfferGrid from '../../components/PublishedOfferGrid';
import AlAinSectorDiscovery from '../../components/AlAinSectorDiscovery';
import { CONTENT } from '../../data/alAinContent';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import SEOHead from '../../components/SEOHead';
import { SERVICE_CATEGORIES, UAE_EMIRATES, getServiceCategory } from '../../data/siteTaxonomy';
import { getSectorCardImage } from '../../lib/sectorCards';
import SectionBackBar from '../../components/SectionBackBar';
import ServicesSmartFooter from '../../components/ServicesSmartFooter';
import SectionCategoryHero from '../../components/SectionCategoryHero';
import PublishedEntityGrid from '../../components/PublishedEntityGrid';
import {
  getPublishedSectionEntities,
  getUaeFooterCards,
} from '../../lib/platformDirectoryCards';
import { getSectionActivitySlug } from '../../lib/sectionCardRoutes';
import { buildCardWhatsappUrl } from '../../lib/providerWhatsapp';
import { KAWKAB_PROFILE, KAWKAB_HERO, KAWKAB_LOGO, KAWKAB_SPECIALTIES, KAWKAB_AL_AIN_AREAS, kawkabServicePath, kawkabWhatsapp, kawkabPath } from '../../lib/kawkabPresence';
import KawkabServiceVisual from '../../components/provider/KawkabServiceVisual';
import DirectoryCompanyCard from '../../components/provider/DirectoryCompanyCard';

const SITE_URL = 'https://bietalreef.ae';
const WHITE_WHALE_SERVICE_WHATSAPP = buildCardWhatsappUrl({
  phone: '971506623518',
  locale: 'ar',
  cardType: 'service',
  providerName: 'مصنع الحوت الأبيض للرخام والجرانيت',
  providerCode: 'BR-PROV-HOT-001',
  cardCode: 'BR-SRV-HOT-001',
  title: 'توريد وتصنيع وتركيب الرخام والجرانيت والكوارتز',
  description: 'توريد وقص وتصنيع وتركيب الخامات حسب المقاسات وموقع المشروع وطريقة التنفيذ المطلوبة.',
  category: 'رخام وسيراميك وتشطيبات',
  pricingModel: 'السعر بعد مراجعة الخامة والمقاسات والموقع',
  location: 'العين · أبوظبي',
  pagePath: '/services/workshops',
});

const customServices = {
  workshops: {
    slug: 'workshops',
    nameAr: 'الورش الصناعية',
    nameEn: 'Industrial Workshops',
    icon: '🏭',
    descAr: 'ورش حدادة، نجارة، ألمنيوم، رخام وزجاج بأعلى معايير الجودة.'
  }
};

const aliases = {
  construction: 'general-contracting',
  maintenance: 'general-maintenance',
  cleaning: 'cleaning-services',
  welding: 'aluminium-glass',
  'project-management': 'general-contracting',
  'interior-design': 'interior-design',
  'equipment-rental': 'equipment-rental',
  'building-materials': 'building-materials',
  'furniture-decoration': 'furniture-decor',
  'furniture-decor': 'furniture-decor',
  'engineering-consultation': 'engineering-consultants',
};


function KawkabMaintenanceSection() {
  const companyHref=kawkabPath('ar');
  const quoteHref=kawkabWhatsapp('ar','الصيانة العامة والتشطيبات');
  return <section id="general-maintenance-companies" aria-label="شركات الصيانة العامة" className="mx-auto max-w-6xl px-4 py-5 md:py-14">
    <div className="mb-3 flex items-center justify-between gap-2 md:mb-6"><h2 className="text-lg font-extrabold text-[#29251e] md:text-3xl">شركات الصيانة العامة والتشطيبات</h2><Link className="shrink-0 text-xs font-bold text-[#805d32] underline md:text-sm" href="/providers/specialty/general-maintenance">دليل الشركات</Link></div>
    <div className="max-w-xl"><DirectoryCompanyCard locale="ar" item={{href:companyHref,name:KAWKAB_PROFILE.nameAr,coverImage:KAWKAB_HERO.url,logoImage:KAWKAB_LOGO.url,summary:'دهانات، بلاستر، ورق جدران، نجارة، سباكة وتكييف',city:'العين',verified:KAWKAB_PROFILE.verification==='verified',phone:KAWKAB_PROFILE.phone,whatsapp:quoteHref}}/></div>
    <p className="mt-4 hidden text-sm leading-8 text-[#50483e] md:block">{KAWKAB_PROFILE.descriptionAr} يمكنك اختيار التخصص وقراءة خطوات التحضير، ثم إرسال بيانات العقار والقياسات والصور للشركة. يُحدّد السعر النهائي حسب حالة الموقع ونطاق الأعمال والخامات والموقع الجغرافي.</p>
    <div className="mt-6 hidden md:block">
      <h3 className="text-xl font-bold text-[#29251e]">اختر مجال الصيانة المطلوب</h3>
      <p className="mt-2 max-w-4xl text-sm leading-7 text-[#5b5146]">تختلف أعمال التشطيب والصيانة بحسب حالة الأسطح والتمديدات ونوع الخامات، لذلك من الأفضل تحديد العمل بدقة قبل مقارنة عروض الأسعار. اختر التخصص المناسب للاطلاع على التفاصيل والصور ومعلومات التواصل مع كوكب الصعيد.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{KAWKAB_SPECIALTIES.map((specialty,index)=><Link key={specialty.id} href={kawkabServicePath('ar',specialty.id)} className="overflow-hidden rounded-xl border border-[#e5dac9] bg-white p-3 transition hover:border-[#b49b76] md:p-4"><KawkabServiceVisual serviceId={specialty.id} locale="ar" className="mb-3 md:aspect-[16/9]"/><span className="text-xs font-semibold text-[#95764a]">{String(index+1).padStart(2,'0')}</span><h4 className="mt-2 font-bold text-[#29251e]">{specialty.ar}</h4><p className="mt-2 text-sm leading-7 text-[#695e53]">{specialty.arDesc}</p><span className="mt-3 inline-block text-sm font-semibold text-[#856232]">تفاصيل الخدمة ←</span></Link>)}</div>
      <div className="mt-5 rounded-xl bg-[#f0e9dd] p-5"><h3 className="font-bold">قبل طلب السعر</h3><p className="mt-2 text-sm leading-7 text-[#554b41]">حدد نوع العقار وموقعه والمساحات التقريبية، وبيّن حالة السطح أو التجهيزات القائمة، وأرفق صورًا واضحة. اتفق مع الشركة على تفاصيل التحضير والخامات والتركيب أو المعالجة والتنظيف ومدة التنفيذ، وتحقق من نطاق الخدمة قبل بدء العمل.</p></div>
      <section className="mt-6" aria-label="مناطق العين في دليل الصيانة"><h3 className="text-lg font-bold">دليل الصيانة حسب مناطق العين</h3><p className="mt-2 text-sm leading-7 text-[#5b5146]">اختر المنطقة للاطلاع على الشركة والخدمات الفنية المتاحة، ثم حدّد التخصص وتأكد من نطاق تقديم الخدمة قبل حجز المعاينة.</p><div className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-5">{KAWKAB_AL_AIN_AREAS.map(area=><Link key={area.slug} href={`/uae/abu-dhabi/al-ain/${area.slug}/general-maintenance`} className="rounded-lg border border-[#e5dac9] bg-white p-3 text-center text-xs font-semibold text-[#332c23]">{area.ar}</Link>)}</div></section>
    </div>
    <details className="mt-3 rounded-lg border border-[#e5dac9] bg-white p-3 md:hidden"><summary className="cursor-pointer text-xs font-bold">اختيار منطقة العين</summary><div className="mt-3 grid grid-cols-3 gap-2">{KAWKAB_AL_AIN_AREAS.map(area=><Link key={area.slug} href={`/uae/abu-dhabi/al-ain/${area.slug}/general-maintenance`} className="rounded-lg bg-[#f5f0e7] px-2 py-3 text-center text-xs font-semibold">{area.ar}</Link>)}</div></details>
    <details className="mt-3 rounded-lg border border-[#e5dac9] bg-white p-3 md:hidden"><summary className="cursor-pointer text-xs font-bold">عرض تخصصات الشركة الستة</summary><div className="mt-3 grid grid-cols-2 gap-2">{KAWKAB_SPECIALTIES.map(s=><Link key={s.id} href={kawkabServicePath('ar',s.id)} className="rounded-lg bg-[#f5f0e7] px-2 py-3 text-xs font-semibold">{s.ar}</Link>)}</div></details>
  </section>;
}

export default function ServiceLandingPage({
  service,
  directoryCards = [],
  publishedServices = [],
  publishedOffers = [],
}) {
  const title = `${service.nameAr} | الخدمات والعروض`;
  const desc = `صفحة مخصصة لخدمة ${service.nameAr} داخل قسم الخدمات والعروض في بيت الريف، بعيدًا عن مسارات دليل الإمارات أو المنتجات.`;
  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const isWorkshopsPage = service.slug === 'workshops';
  const isGeneralMaintenance = service.slug === 'general-maintenance';
  const faqItems = [
    [`ما هي خدمة ${service.nameAr}؟`, service.descAr],
    ['هل هذه الصفحة من دليل الإمارات؟', 'لا. هذه الصفحة تابعة لقسم الخدمات والعروض. البحث حسب المكان يتم من دليل الإمارات، أما هذه الصفحة فهي للخدمة نفسها.'],
    ['كيف أطلب عرض سعر؟', 'أرسل تفاصيل المشروع، الموقع، الصور أو المقاسات المتاحة حتى يتم توجيه الطلب بطريقة صحيحة.'],
  ];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.nameAr,
      description: service.descAr,
      url: serviceUrl,
      serviceType: service.nameAr,
      areaServed: UAE_EMIRATES.map((emirate) => ({ '@type': 'AdministrativeArea', name: emirate.nameAr })),
      provider: { '@type': 'Organization', name: 'بيت الريف', url: SITE_URL, logo: `${SITE_URL}/logo.png` },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl, servicePhone: '+971564456337' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `الخدمات المنشورة داخل ${service.nameAr}`,
      numberOfItems: publishedServices.length,
      itemListElement: publishedServices.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}${item.providerHref}`,
        item: {
          '@type': 'Service',
          name: item.name,
          description: item.description || item.providerSummary,
          provider: {
            '@type': 'LocalBusiness',
            name: item.providerName,
            url: `${SITE_URL}${item.providerHref}`,
          },
        },
      })),
    },
  ];

  return (
    <>
      <SEOHead title={`${title} | بيت الريف`} description={desc} keywords={`${service.nameAr}, خدمات ${service.nameAr}, عروض ${service.nameAr}, مقاولات الإمارات, بيت الريف`} canonicalPath={`/services/${service.slug}`} ogImage={`${SITE_URL}${getSectorCardImage(service.slug)}`} structuredData={structuredData} breadcrumbs={[{ name: 'الخدمات والعروض', href: '/services' }, { name: service.nameAr, href: `/services/${service.slug}` }]} />
      <div dir="rtl" className="min-h-screen bg-[#FDFBF7] text-gray-900">
        <Navbar pageTitle="الخدمات والعروض" />
        <SectionBackBar href="/services" label="العودة إلى الخدمات والعروض" />
        <main>
          <SectionCategoryHero locale="ar" type="services" compactMobile={isGeneralMaintenance} title={service.nameAr} description={service.descAr} image={getSectorCardImage(service.slug)} primaryHref={Object.hasOwn(CONTENT, service.slug) ? `/uae/abu-dhabi/al-ain/${service.slug}` : undefined} />
          {isGeneralMaintenance ? <KawkabMaintenanceSection/> : null}

          {Object.hasOwn(CONTENT, service.slug) ? <AlAinSectorDiscovery category={service.slug} /> : <section className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['وصف الخدمة', 'طلب عرض سعر', 'اختيار المكان'].map((item, index) => (
                <div key={item} className="rounded-3xl bg-white border border-[#E6DCC8] p-7 shadow-sm"><span className="text-sm font-black text-[#6F5400]">0{index + 1}</span><h2 className="mt-3 text-xl font-black text-[#0F3F1A]">{item}</h2><p className="mt-3 text-sm leading-8 text-gray-600">{index === 0 && `تعرف على نطاق ${service.nameAr} وما يناسب مشروعك.`}{index === 1 && 'أرسل تفاصيل المشروع لتحصل على توجيه مناسب بدل الأسعار العشوائية.'}{index === 2 && 'إذا كنت تبحث حسب المدينة، انتقل إلى دليل الإمارات لاختيار الإمارة والمنطقة.'}</p></div>
              ))}
            </div>
          </section>}

          {null}

          <PublishedEntityGrid items={publishedServices} locale="ar" type="service" />
          <PublishedOfferGrid items={publishedOffers} locale="ar" />

          {publishedServices.length === 0 && !isGeneralMaintenance && (
            <section className="max-w-6xl mx-auto px-4 py-10" aria-label="العروض المتاحة"><div className="rounded-3xl border border-[#E6DCC8] bg-white p-10 text-center shadow-sm" role="status"><h2 className="text-2xl font-black text-[#0F3F1A]">لا توجد خدمات منشورة حاليًا</h2><p className="mt-3 text-gray-600 leading-8">لا توجد بطاقة منشورة من قاعدة البيانات مرتبطة بقسم {service.nameAr} الآن. يمكنك طلب عرض سعر مخصص حسب تفاصيل مشروعك.</p><a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-2xl bg-primary px-7 py-3 text-sm font-black text-white">اطلب عرض سعر مخصص</a></div></section>
          )}

          <section className="max-w-6xl mx-auto px-4 py-10"><div className="rounded-[2rem] bg-white border border-[#E6DCC8] p-8 shadow-sm"><h2 className="text-2xl font-black text-[#0F3F1A] mb-5">اختر الإمارة عند الحاجة للبحث المحلي</h2><div className="flex flex-wrap gap-3">{UAE_EMIRATES.map((emirate) => (<Link key={emirate.slug} href={`/uae/${emirate.slug}`} className="rounded-full border border-[#E6DCC8] px-5 py-3 text-sm font-black text-gray-700 hover:text-primary hover:border-primary">{emirate.nameAr}</Link>))}</div></div></section>

          <FAQ items={faqItems} title={`أسئلة شائعة حول ${service.nameAr}`} />
        </main>
        <ServicesSmartFooter locale="ar" directoryCards={directoryCards} />
        <Footer showRequestCTA={false} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const rawSlug = params?.slug;
  const serviceSlug = aliases[rawSlug] || rawSlug;
  const service = customServices[serviceSlug] || getServiceCategory(serviceSlug);
  if (!service) return { notFound: true };
  const activitySlug = getSectionActivitySlug('services_offers', service.slug);
  const [directoryCards, legacyServices, platformServices, publishedOffers] = await Promise.all([
    getUaeFooterCards('ar'),
    getPublishedSectionEntities('ar', 'services_offers', activitySlug),
    getPlatformChannelServiceCards('ar',service.slug),
    getPlatformChannelOfferCards('ar',service.slug),
  ]);
  const publishedServices=[...legacyServices,...platformServices.filter(x=>!legacyServices.some(y=>y.id===x.id))];
  return { props: { service, directoryCards, publishedServices, publishedOffers }, revalidate: 300 };
}

export async function getStaticPaths() {
  return {
    paths: [...SERVICE_CATEGORIES.map((service) => ({ params: { slug: service.slug } })), { params: { slug: 'workshops' } }],
    fallback: 'blocking',
  };
}
