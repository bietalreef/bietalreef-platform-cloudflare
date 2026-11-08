import { directoryCompanyCards } from '../../../lib/directoryCompanyCards';
import { providerDirectorySchema } from '../../../lib/providerDirectorySeo';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import EnglishLayout from '../../../components/EnglishLayout';
import ProvidersSmartFooter from '../../../components/ProvidersSmartFooter';
import CompanyDirectoryList from '../../../components/CompanyDirectoryList';
import ProviderSectorCards from '../../../components/ProviderSectorCards';
import ProviderSelectionGuide from '../../../components/ProviderSelectionGuide';
import {
  getPublishedProviderCards,
  getUaeSectionCards,
} from '../../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../../components/ProvidersDirectoryHero';
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
      <SEOHead title="UAE Business and Professional Directory | Biet Al Reef" description="Explore UAE construction, maintenance, cleaning, design and supply businesses. Review each profile and specialty before requesting a quotation." canonicalPath="/en/providers" alternatePath="/en/providers" ogImage="https://bietalreef.ae/images/providers-hero.webp" structuredData={providerDirectorySchema(companyCards, 'en')}/>
      <EnglishLayout>
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left">
          <ProvidersDirectoryHero locale="en" />
          <CompanyDirectoryList companies={companyCards} locale="en" />
          <section id="provider-sectors" className="scroll-mt-40 mx-auto max-w-6xl px-3 py-2 md:px-4 md:py-14">
            <div className="mb-2 md:mb-8 md:text-left">
              <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm md:inline-flex">8 main sectors</span>
              <h2 className="text-base font-black text-[#0F3F1A] md:mt-4 md:text-4xl">Sectors & specialties</h2>
              <p className="mx-auto mt-3 hidden max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:block md:text-base">Choose an activity to reach the related provider specialties through a clear, database-backed journey.</p>
            </div>
            <ProviderSectorCards locale="en" />
          </section>

          <ProviderSelectionGuide locale="en" />
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
