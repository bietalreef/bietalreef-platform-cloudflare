import { directoryCompanyCards } from '../../lib/directoryCompanyCards';
import { providerDirectorySchema } from '../../lib/providerDirectorySeo';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import ProvidersSmartFooter from '../../components/ProvidersSmartFooter';
import { ChevronLeft } from 'lucide-react';
import CompanyDirectoryList from '../../components/CompanyDirectoryList';
import ProviderSectorCards from '../../components/ProviderSectorCards';
import ProviderSelectionGuide from '../../components/ProviderSelectionGuide';
import {
  getPublishedProviderCards,
  getUaeSectionCards,
} from '../../lib/platformDirectoryCards';
import ProvidersDirectoryHero from '../../components/ProvidersDirectoryHero';
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
  const structuredData = providerDirectorySchema(companyCards, 'ar');

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead
        title="دليل شركات المقاولات والخدمات والمهنيين في الإمارات | بيت الريف"
        description="دليل الشركات والمقاولين والمهنيين في الإمارات: استكشف المقاولات والاستشارات الهندسية والصيانة والتشطيبات والتنظيف والتوريد، واطلع على الملفات والخدمات ومناطق التغطية."
        canonicalPath="/providers"
        alternatePath="/en/providers"
        ogImage="https://bietalreef.ae/images/providers-hero.webp"
        structuredData={structuredData}
      />

      <Navbar pageTitle="دليل الشركات والمهنيين" />

      <main className="-mt-[1px]">
        <ProvidersDirectoryHero locale="ar" />
        <CompanyDirectoryList companies={companyCards} locale="ar" />
        <section id="provider-sectors" className="scroll-mt-40 mx-auto max-w-6xl px-3 py-2 md:px-4 md:py-14">
          <div className="mb-2 md:mb-8 md:text-right">
            <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm md:inline-flex">
              تخصصات لبيتك ومشروعك
            </span>
            <h2 className="text-base font-black text-[#0F3F1A] md:mt-4 md:text-4xl">الأقسام والتخصصات</h2>
            <p className="mx-auto mt-3 hidden max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:block md:text-base">
              اختر القطاع المناسب للوصول إلى الشركات والتخصصات المرتبطة به ضمن رحلة تصفح واضحة ومتناسقة.
            </p>
          </div>
          <ProviderSectorCards locale="ar" />
        </section>



        <ProviderSelectionGuide locale="ar" />

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
