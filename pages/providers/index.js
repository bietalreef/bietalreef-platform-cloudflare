import { directoryCompanyCards } from '../../lib/directoryCompanyCards';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import ProvidersSmartFooter from '../../components/ProvidersSmartFooter';
import {
  ArrowRight,
  Building2,
  MessageCircle,
  Users,
  ChevronLeft,
} from 'lucide-react';
import { ProviderCard } from '../../components/cards/SmartEntityCard';
import ConstitutionalSectionCards from '../../components/ConstitutionalSectionCards';
import {
  getPublishedProviderCards,
  getUaeSectionCards,
} from '../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../components/ProvidersDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';
import RehabDirectoryCard from '../../components/provider/RehabDirectoryCard';
import AlNaeemDirectoryCard from '../../components/provider/AlNaeemDirectoryCard';
import ProvidersSectorList from '../../components/ProvidersSectorList';
import { getRehabSiteData } from '../../lib/rehabPresence';
import { getAlNaeemData } from '../../lib/alNaeemPresence';

const steps = [
  {
    t: 'تعرف على آلية الانضمام',
    d: 'راجع طريقة عمل المنصة والبيانات المطلوبة لإعداد الملف الرقمي المناسب لنشاطك.',
    i: '01',
  },
  {
    t: 'جهز بيانات النشاط',
    d: 'شارك بيانات التواصل والتخصصات ونطاق الخدمة والصور والمشاريع المتاحة.',
    i: '02',
  },
  {
    t: 'انشر ملفك الرقمي',
    d: 'يتولى فريق بيت الريف مراجعة البيانات وتجهيز الملف ونشره داخل القسم المناسب.',
    i: '03',
  },
];

export default function ProvidersPage({ providers = [], directoryCards = [], rehab = null, alNaeem = null }) {
  const companyCards = directoryCompanyCards(providers,rehab,alNaeem,'ar');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'الشركات والمهنيون في بيت الريف',
    description: 'دليل للشركات والمهنيين في الإمارات: مقاولون، موردون، ورش، مصانع، مكاتب هندسية وحرفيون.',
    url: 'https://bietalreef.ae/providers',
    mainEntity: companyCards.map((provider) => ({
      '@type': 'LocalBusiness',
      name: provider.name,
      url: `https://bietalreef.ae${provider.href}`,
      ...(provider.coverImage ? {image: provider.coverImage.startsWith('http') ? provider.coverImage : `https://bietalreef.ae${provider.coverImage}`} : {}),
      identifier: provider.providerId,
    })),
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead
        title="الشركات والمهنيون | مقاولون وموردون وحرفيون | بيت الريف"
        description="تصفح شركات خدمات البناء والمقاولات والصيانة والتصميم الداخلي داخل بيت الريف، وافتح الملفات الرقمية أو تعرف على آلية الانضمام."
        keywords="شركات خدمات الإمارات, مقاولين, موردين, حرفيين, شركات بناء, ورش نجارة, تسجيل شركة متخصصة"
        canonicalPath="/providers"
        ogImage="https://bietalreef.ae/images/providers-hero.webp"
        structuredData={structuredData}
      />

      <Navbar pageTitle="الشركات والمهنيون" />
      <SectionBackBar />

      <main className="-mt-[1px]">
        <ProvidersDirectoryHero locale="ar" />
        <section id="provider-sectors" className="mx-auto max-w-6xl px-3 py-2 md:px-4 md:py-14">
          <div className="mb-2 md:mb-8 md:text-right">
            <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm md:inline-flex">
              تخصصات لبيتك ومشروعك
            </span>
            <h2 className="text-base font-black text-[#0F3F1A] md:mt-4 md:text-4xl">الأقسام والتخصصات</h2>
            <p className="mx-auto mt-3 hidden max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:block md:text-base">
              اختر القطاع المناسب للوصول إلى الشركات والتخصصات المرتبطة به ضمن رحلة تصفح واضحة ومتناسقة.
            </p>
          </div>
          <div className="md:hidden"><ProvidersSectorList cards={directoryCards} locale="ar" /></div>
          <div className="hidden md:block"><ConstitutionalSectionCards cards={directoryCards} sectionKey="providers" locale="ar" /></div>
        </section>

        <section className="mx-auto max-w-6xl px-3 pb-5 pt-2 md:px-4 md:py-14">
          <div className="mb-2 md:mb-10 md:text-right">
            <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] md:inline-flex">
              تعرف على الشركات وخدماتها
            </span>
            <h2 className="text-base font-black text-[#0F3F1A] md:mb-3 md:mt-4 md:text-3xl">الشركات المتاحة الآن</h2>
            <p className="hidden leading-8 text-gray-500 md:block">
              تعرف على خدمات كل شركة وأعمالها، وتواصل معها لاختيار ما يناسب احتياجك.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">

            {companyCards.map((provider) => (
              <ProviderCard key={provider.id} item={provider} />
            ))}
          </div>
        </section>

        <section className="hidden border-y border-[#E6DCC8] bg-white py-20 md:block">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">كيف تنضم لشبكة بيت الريف؟</h2>
              <p className="text-gray-500">مسار واضح يبدأ بالتعرف على المنصة ثم تجهيز ملف النشاط</p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.i} className="relative text-center">
                  <div className="absolute -top-10 left-1/2 z-0 -translate-x-1/2 text-8xl font-black text-gray-50">
                    {step.i}
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-black text-[#0F3F1A]">{step.t}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#0F3F1A] px-8 py-4 font-black text-white shadow-[0_9px_0_rgba(5,37,13,.16)]"
              >
                تعرف على المنصة وكيف تعمل
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <ProvidersSmartFooter locale="ar" directoryCards={directoryCards} />
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ res }) {
  const [providers, directoryCards, rehab, alNaeem] = await Promise.all([
    getPublishedProviderCards('ar'),
    getUaeSectionCards('ar', 'providers'),
    getRehabSiteData().catch(() => null),
    getAlNaeemData().catch(() => null),
  ]);
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=180');
  return {
    props: { providers, directoryCards, rehab, alNaeem },
  };
}
