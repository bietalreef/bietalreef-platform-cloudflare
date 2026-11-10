import ScrollToSection from '../components/ScrollToSection';
import { getPlatformChannelOfferCards } from '../lib/platformPublishedServiceCards';
import PublishedOfferGrid from '../components/PublishedOfferGrid';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import ServicesSmartFooter from "../components/ServicesSmartFooter";
import DiscoveryDirectoryHero from "../components/DiscoveryDirectoryHero";
import SectionBackBar from "../components/SectionBackBar";
import YouTubeVideoSection from "../components/YouTubeVideoSection";
import MainSectorCards from "../components/MainSectorCards";
import { getPublishedSectionEntities, getUaeSectionCards } from "../lib/platformDirectoryCards";
import PublishedEntityGrid from "../components/PublishedEntityGrid";
import { ArrowRight, MessageCircle, Search, Wrench } from "lucide-react";

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "خدمات وعروض بيت الريف في الإمارات",
  "description": "استكشف خدمات البناء والصيانة والتصميم ومواد البناء وغيرها من قطاعات بيت الريف.",
  "url": "https://bietalreef.ae/services"
};

function getCategorySlug(serviceId) {
  const categoryMap = {
    construction: 'general-contracting',
    'interior-design': 'interior-design',
    'project-management': 'general-contracting',
    'engineering-consultants': 'engineering-consultants',
    maintenance: 'general-maintenance',
    'equipment-rental': 'equipment-rental',
    'cleaning-services': 'cleaning-services',
    'furniture-decoration': 'furniture-decor',
    'building-materials': 'building-materials',
    'specialized-services': 'general-maintenance',
    craftsmen: 'carpentry',
    workshops: 'workshops',
    cleaning: 'cleaning-services',
    'furniture-decor': 'furniture-decor'
  };
  return categoryMap[serviceId] || serviceId;
}

export default function Services({ directoryCards, publishedServices = [], publishedOffers = [] }) {
  return (
    <>
      <SEOHead
        title="الخدمات والعروض | مقاولات، صيانة، تصميم داخلي، مواد بناء في الإمارات"
        description="قسم الخدمات والعروض في بيت الريف: اختر الخدمة المطلوبة في البناء والصيانة والتصميم والمواد، ثم اطلب عرض سعر حسب تفاصيل مشروعك."
        keywords="خدمات بناء الإمارات, عروض مقاولات, صيانة, تصميم داخلي, سباكة, كهرباء, تكييف, دهانات, نجارة, مواد بناء"
        canonicalPath="/services"
        ogImage="https://bietalreef.ae/images/services-offers-hero.webp"
        structuredData={servicesItemListSchema}
        breadcrumbs={[{ name: "الخدمات والعروض", item: "https://bietalreef.ae/services" }]}
      />

      <div dir="rtl" className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar pageTitle="الخدمات والعروض" />
      <SectionBackBar />
        <main className="flex-1 -mt-[1px]">
          <DiscoveryDirectoryHero type="services" locale="ar" />


          <section id="services-list" className="mx-auto max-w-6xl px-3 py-8 sm:px-4 md:py-12">
            <div className="mb-5 text-center md:text-right"><span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">قطاعات الخدمات</span><h2 className="mt-3 text-2xl font-black text-[#193b53] md:text-3xl">اختر نوع الخدمة</h2><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">اضغط «المزيد» لفتح دليل كامل لكل قطاع، يشمل تفاصيل الخدمات والصور ونصائح تجهيز الطلب وروابط الإمارات. واستخدم «استكشف» للوصول مباشرة إلى مسار التخصص.</p></div>
            <MainSectorCards sectionKey="services_offers" locale="ar" />
          </section>

          <PublishedEntityGrid items={publishedServices} locale="ar" type="service" />
          <PublishedOfferGrid items={publishedOffers} locale="ar" />
          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"><div className="max-w-6xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">كيف تختار الخدمة المناسبة؟</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">1️⃣</div><h3 className="font-bold text-lg mb-3">حدد الخدمة</h3><p className="text-gray-600 text-sm">ابدأ من نوع العمل المطلوب: مقاولات، صيانة، نجارة، رخام أو غيرها.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">2️⃣</div><h3 className="font-bold text-lg mb-3">أضف التفاصيل</h3><p className="text-gray-600 text-sm">الموقع، المقاسات، الصور، والمواد المطلوبة تساعد على توجيه الطلب.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">3️⃣</div><h3 className="font-bold text-lg mb-3">اطلب عرض سعر</h3><p className="text-gray-600 text-sm">لا نعتمد على سعر عام؛ السعر الصحيح يحتاج تفاصيل المشروع.</p></div></div></div></section>
          <YouTubeVideoSection locale="ar" videoId="MUuZRsaCe9s" />
          <ServicesSmartFooter locale="ar" directoryCards={directoryCards} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [directoryCards, publishedServices, publishedOffers] = await Promise.all([
    getUaeSectionCards('ar', 'services_offers'),
    getPublishedSectionEntities('ar', 'services_offers', 'cleaning-operations-equipment'),
    getPlatformChannelOfferCards('ar', 'cleaning-services'),
  ]);
  return { props: { directoryCards, publishedServices, publishedOffers }, revalidate: 300 };
}
