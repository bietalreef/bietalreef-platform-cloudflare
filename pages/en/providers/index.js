import { directoryCompanyCards } from '../../../lib/directoryCompanyCards';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EnglishLayout from '../../../components/EnglishLayout';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import { ArrowLeft, Building2, MessageCircle, Users } from 'lucide-react';
import { ProviderCard } from '../../../components/cards/SmartEntityCard';
import ConstitutionalSectionCards from '../../../components/ConstitutionalSectionCards';
import {
  getPublishedProviderCards,
  getUaeSectionCards,
} from '../../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../../components/ProvidersDirectoryHero';
import SectionBackBar from '../../../components/SectionBackBar';
import RehabDirectoryCard from '../../../components/provider/RehabDirectoryCard';
import AlNaeemDirectoryCard from '../../../components/provider/AlNaeemDirectoryCard';
import ProvidersSectorList from '../../../components/ProvidersSectorList';
import { getRehabSiteData } from '../../../lib/rehabPresence';
import { getAlNaeemData } from '../../../lib/alNaeemPresence';

const steps = [
  { t: 'Learn how joining works', d: 'Review the platform process and the information required for a business profile.', i: '01' },
  { t: 'Prepare business information', d: 'Share contact details, specialties, coverage, images and available projects.', i: '02' },
  { t: 'Publish the reviewed profile', d: 'The Biet Al Reef team reviews, prepares and publishes the profile in the correct section.', i: '03' }
];

export default function ProvidersEnglishPage({ providers = [], directoryCards = [], rehab = null, alNaeem = null }) {
  const companyCards = directoryCompanyCards(providers,rehab,alNaeem,'en');
  return (
    <>
      <Head><title>Businesses & Professionals | Biet Al Reef</title><meta name="description" content="Browse Biet Al Reef service providers by specialty or register your business to appear inside the platform." /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://bietalreef.ae/en/providers" /><link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/providers" /><link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/providers" /><meta property="og:title" content="Businesses & Professionals | Biet Al Reef" /><meta property="og:description" content="Browse verified service-provider profiles by specialty across Biet Al Reef." /><meta property="og:type" content="website" /><meta property="og:url" content="https://bietalreef.ae/en/providers" /><meta property="og:image" content="https://bietalreef.ae/images/providers-hero.webp" /><meta property="og:image:alt" content="Businesses & Professionals | Biet Al Reef" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="Businesses & Professionals | Biet Al Reef" /><meta name="twitter:image" content="https://bietalreef.ae/images/providers-hero.webp" /></Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left">
          <ProvidersDirectoryHero locale="en" />
          <section id="provider-sectors" className="mx-auto max-w-6xl px-3 py-2 md:px-4 md:py-14">
            <div className="mb-2 md:mb-8 md:text-left">
              <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm md:inline-flex">7 main sectors</span>
              <h2 className="text-base font-black text-[#0F3F1A] md:mt-4 md:text-4xl">Sectors & specialties</h2>
              <p className="mx-auto mt-3 hidden max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:block md:text-base">Choose an activity to reach the related provider specialties through a clear, database-backed journey.</p>
            </div>
            <div className="md:hidden"><ProvidersSectorList cards={directoryCards} locale="en" /></div>
            <div className="hidden md:block"><ConstitutionalSectionCards cards={directoryCards} sectionKey="providers" locale="en" /></div>
          </section>
          <section className="mx-auto max-w-6xl px-3 pb-5 pt-2 md:px-4 md:py-14"><div className="mb-2 md:mb-10 md:text-left"><span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] md:inline-flex">Real providers inside the platform</span><h2 className="text-base font-black text-[#0F3F1A] md:mb-3 md:mt-4 md:text-3xl">Available providers now</h2><p className="hidden leading-8 text-gray-500 md:block">These are the first real service provider profiles inside Biet Al Reef. Each card opens a real provider profile and a contact or quotation path.</p></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">{companyCards.map((provider) => <ProviderCard key={provider.id} item={provider} />)}</div></section>
          <section className="hidden border-y border-[#E6DCC8] bg-white py-20 md:block"><div className="mx-auto max-w-6xl px-4 text-center"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">How do you join the Biet Al Reef network?</h2><p className="mb-12 text-gray-500">Simple steps to start your digital growth journey with us</p><div className="grid gap-12 md:grid-cols-3">{steps.map((step) => (<div key={step.i} className="relative text-center"><div className="absolute -top-10 left-1/2 z-0 -translate-x-1/2 text-8xl font-black text-gray-50">{step.i}</div><div className="relative z-10"><h3 className="mb-3 text-xl font-black text-[#0F3F1A]">{step.t}</h3><p className="text-sm leading-7 text-gray-500">{step.d}</p></div></div>))}</div></div></section>
          <ProvidersSmartFooter locale="en" directoryCards={directoryCards} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getServerSideProps({ res }) {
  const [providers, directoryCards, rehab, alNaeem] = await Promise.all([
    getPublishedProviderCards('en'),
    getUaeSectionCards('en', 'providers'),
    getRehabSiteData().catch(() => null),
    getAlNaeemData().catch(() => null),
  ]);
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');
  return {
    props: { providers, directoryCards, rehab, alNaeem },
  };
}
