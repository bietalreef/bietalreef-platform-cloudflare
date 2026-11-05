import ScrollToSection from '../../components/ScrollToSection';
import { getPlatformChannelOfferCards } from '../../lib/platformPublishedServiceCards';
import PublishedOfferGrid from '../../components/PublishedOfferGrid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import ServicesSmartFooter from '../../components/ServicesSmartFooter';
import DiscoveryDirectoryHero from '../../components/DiscoveryDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';
import YouTubeVideoSection from '../../components/YouTubeVideoSection';
import MainSectorCards from '../../components/MainSectorCards';
import { getPublishedSectionEntities, getUaeSectionCards } from '../../lib/platformDirectoryCards';
import PublishedEntityGrid from '../../components/PublishedEntityGrid';
import { ArrowLeft, MessageCircle, Search, Wrench } from 'lucide-react';

const serviceCopy = {
  'general-contracting': ['Construction Contracting', 'Certified contracting companies for villas, buildings and residential or commercial projects.'],
  'engineering-consultants': ['Engineering Consultation', 'Certified engineering offices and professional architectural and technical supervision.'],
  'general-maintenance': ['Maintenance Companies', 'Comprehensive maintenance for buildings and villas: plumbing, electrical, AC, painting and repair.'],
  carpentry: ['Craftsmen & Workers', 'Skilled workers for construction, finishing, carpentry, marble, gypsum, paint and more.'],
  workshops: ['Industrial Workshops', 'Metal, carpentry, aluminium, marble and glass workshops with high quality standards.'],
  'equipment-rental': ['Equipment Rental', 'Cranes, excavators, mixers and construction equipment for rental.'],
  'building-materials': ['Building Material Stores', 'Cement, steel, blocks, sand, gravel and finishing materials.'],
  'furniture-decor': ['Furniture & Décor', 'Furniture, custom majlis, curtains, carpets, accessories and décor.'],
  'cleaning-services': ['Cleaning Services', 'Home, building, post-construction and maintenance cleaning services.'],
};

const benefitCopy = {
  'general-contracting': ['Trusted contractors with documented project records', 'Compare quotation options clearly'],
  'engineering-consultants': ['Experienced engineering specialists', 'Design, approval and supervision support'],
  'general-maintenance': ['Fast response for maintenance requests', 'Specialized technicians across key trades'],
  carpentry: ['Skilled craftsmen across multiple trades', 'Direct service request based on the required work'],
  workshops: ['Specialized workshops by field', 'Custom fabrication and professional installation'],
  'equipment-rental': ['Reliable site equipment', 'Flexible daily, weekly and monthly options'],
  'building-materials': ['Material supply for projects', 'Construction and finishing material options'],
  'furniture-decor': ['Furniture and décor paths', 'Custom furnishing and interior support'],
  'cleaning-services': ['Cleaning for homes and buildings', 'Post-construction cleaning support'],
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
    'furniture-decor': 'furniture-decor',
  };
  return categoryMap[serviceId] || serviceId;
}

export default function ServicesEnglishPage({ directoryCards, publishedServices = [], publishedOffers = [] }) {
  return (
    <>
      <Head>
        <title>Services & Offers | Contracting, Maintenance, Interior Design and Building Materials in the UAE</title>
        <meta name="description" content="Biet Al Reef Services & Offers: choose the service type first, then send your project details to receive suitable guidance or a quotation." />
        <meta name="keywords" content="UAE construction services, contracting offers, maintenance, interior design, plumbing, electrical, AC, painting, carpentry, building materials" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bietalreef.ae/en/services" />
        <link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/services" />
        <link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/services" />
        <meta property="og:title" content="Services & Offers | Biet Al Reef" />
        <meta property="og:description" content="Construction, maintenance, interior design and project service paths in the UAE." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bietalreef.ae/en/services" />
        <meta property="og:image" content="https://bietalreef.ae/images/services-offers-hero.webp" />
        <meta property="og:image:alt" content="Services & Offers | Biet Al Reef" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services & Offers | Biet Al Reef" />
        <meta name="twitter:image" content="https://bietalreef.ae/images/services-offers-hero.webp" />
      </Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] flex-1 bg-[#FDFBF7] text-left">
          <DiscoveryDirectoryHero type="services" locale="en" />


          <section id="services-list" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <div className="mb-8 text-center md:text-left"><span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">Service sectors</span><h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the service type</h2><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">Mobile-first cards: clear image, focused content and a direct path to open each service.</p></div>
            <MainSectorCards sectionKey="services_offers" locale="en" />
          </section>

          <PublishedEntityGrid items={publishedServices} locale="en" type="service" />
          <PublishedOfferGrid items={publishedOffers} locale="en" />
          <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24"><div className="max-w-6xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How do you choose the right service?</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">1️⃣</div><h3 className="font-bold text-lg mb-3">Define the service</h3><p className="text-gray-600 text-sm">Start from the type of work required: contracting, maintenance, carpentry, marble or another service.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">2️⃣</div><h3 className="font-bold text-lg mb-3">Add the details</h3><p className="text-gray-600 text-sm">Location, measurements, photos and required materials help guide the request.</p></div><div className="text-center p-6 rounded-xl bg-white shadow-soft"><div className="text-5xl mb-4">3️⃣</div><h3 className="font-bold text-lg mb-3">Request a quotation</h3><p className="text-gray-600 text-sm">We do not rely on a general price. The correct price needs project details.</p></div></div></div></section>
          <YouTubeVideoSection locale="en" videoId="ST8u4b8g2zs" />
          <ServicesSmartFooter locale="en" directoryCards={directoryCards} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps() {
  const [directoryCards, publishedServices, publishedOffers] = await Promise.all([
    getUaeSectionCards('en', 'services_offers'),
    getPublishedSectionEntities('en', 'services_offers', 'cleaning-operations-equipment'),
    getPlatformChannelOfferCards('en', 'cleaning-services'),
  ]);
  return { props: { directoryCards, publishedServices, publishedOffers }, revalidate: 300 };
}
