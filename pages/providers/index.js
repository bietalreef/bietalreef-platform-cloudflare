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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'الشركات والمهنيون في بيت الريف',
    description: 'قسم مستقل لالشركات والمهنيين في الإمارات: مقاولون، موردون، ورش، مصانع، مكاتب هندسية وحرفيون.',
    url: 'https://bietalreef.ae/providers',
    mainEntity: providers.map((provider) => ({
      '@type': 'LocalBusiness',
      name: provider.name,
      url: `https://bietalreef.ae${provider.href}`,
      image: provider.coverImage?.startsWith('http') ? provider.coverImage : `https://bietalreef.ae${provider.coverImage}`,
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

      <main className="-mt-[1px] [&>section:nth-of-type(2)]:hidden">
        <ProvidersDirectoryHero locale="ar" />
        <section className="relative isolate overflow-hidden bg-[#FDFBF7]">
          <div className="relative min-h-[600px] overflow-hidden md:min-h-[680px] lg:min-h-[740px]">
            <Image
              src="/images/providers-hero.webp"
              alt="شركات خدمات البناء والمقاولات والصيانة داخل بيت الريف"
              fill
              priority
              className="-translate-y-[6%] scale-[1.16] object-cover object-[52%_36%] md:-translate-y-[4%] md:scale-110 md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#FDFBF7]/48 via-[#FDFBF7]/8 to-transparent" />

            <Link
              href="/"
              className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37]/45 bg-white/76 px-3 py-2 text-xs font-black text-[#123A46] shadow-xl shadow-[#123A46]/16 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:right-8 md:top-8 md:px-4 md:py-3 md:text-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              العودة إلى الرئيسية
            </Link>

            <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-4 pb-8 pt-20 md:min-h-[680px] md:pb-12 lg:min-h-[740px]">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#123A46]/95 px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#123A46]/22 backdrop-blur-xl md:text-sm">
                <Users className="h-4 w-4 text-[#F7E7A0]" aria-hidden="true" />
                بوابة الشركات والمهنيين
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#0F3F1A] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] md:text-6xl">
                اجعل نشاطك حاضرًا
                <br />
                حيث يبحث العميل عن الخدمة
              </h1>

              <div className="mt-5 max-w-3xl rounded-[2.1rem] border border-white/70 bg-white/64 p-4 shadow-2xl shadow-[#123A46]/14 backdrop-blur-2xl md:p-6">
                <p className="max-w-2xl text-sm font-bold leading-8 text-gray-700 md:text-lg md:leading-9">
                  بيت الريف لا يضعك في قائمة أسماء فقط؛ بل يبني لك حضورًا رقميًا واضحًا يربط نشاطك بالمكان والتخصص والطلبات داخل منصة موجهة لقطاع البناء والصيانة في الإمارات.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/how-it-works"
                    className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-black text-[#0F3F1A] shadow-[0_12px_0_rgba(138,106,0,0.22),0_22px_38px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#c9a52f]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    تعرف على المنصة وكيف تعمل
                  </Link>

                  <a
                    href="https://wa.me/971564456337"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-[#123A46]/20 bg-white/86 px-5 py-4 text-base font-black text-[#123A46] shadow-[0_10px_0_rgba(18,58,70,0.08),0_18px_30px_rgba(18,58,70,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A46] text-[#F7E7A0] shadow-inner transition group-hover:scale-105">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </span>
                    تحدث مع فريق الانضمام
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="provider-sectors" className="mx-auto max-w-6xl px-3 py-2 md:px-4 md:py-14">
          <div className="mb-2 md:mb-8 md:text-right">
            <span className="hidden rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm md:inline-flex">
              7 قطاعات رئيسية
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
              شركاتن فعليون داخل المنصة
            </span>
            <h2 className="text-base font-black text-[#0F3F1A] md:mb-3 md:mt-4 md:text-3xl">الشركات المتاحة الآن</h2>
            <p className="hidden leading-8 text-gray-500 md:block">
              كل كارت يفتح ملف جهة فعليًا، مع معلومات النشاط والخدمات والمشاريع ومسارات التواصل وطلب التفاصيل.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
            {rehab ? <RehabDirectoryCard data={rehab} locale="ar" /> : null}{alNaeem ? <AlNaeemDirectoryCard data={alNaeem} locale="ar" /> : null}
            {providers.map((provider) => (
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
