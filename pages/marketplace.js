import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ProductsSmartFooter from '../components/ProductsSmartFooter';
import DiscoveryDirectoryHero from '../components/DiscoveryDirectoryHero';
import SectionBackBar from '../components/SectionBackBar';
import ConstitutionalSectionCards from '../components/ConstitutionalSectionCards';
import { getUaeSectionCards } from '../lib/platformDirectoryCards';
import { buildCardWhatsappUrl } from '../lib/providerWhatsapp';
import { ArrowRight, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronLeft, Sparkles } from 'lucide-react';

const WHITE_WHALE_QUARTZ_WHATSAPP = buildCardWhatsappUrl({
  phone: '971506623518',
  locale: 'ar',
  cardType: 'product',
  providerName: 'مصنع الحوت الأبيض للرخام والجرانيت',
  providerCode: 'BR-PROV-HOT-001',
  title: 'كوارتز مطابخ فاخر حسب الطلب',
  description: 'توريد وتصنيع وتركيب أسطح المطابخ والكونترات والجزر حسب المقاسات واللون والتشطيب.',
  category: 'كوارتز · أسطح مطابخ · كونترات',
  price: 'السعر حسب المقاسات والمواصفات',
  pricingModel: 'متوفر حسب الطلب',
  location: 'العين · أبوظبي',
  pagePath: '/marketplace',
});

const categories = [
  {
    id: 'building-materials',
    title: 'مواد البناء الأساسية',
    desc: 'أسمنت، حديد تسليح، بلوك، ومواد العزل الأساسية.',
    icon: '🏗️',
    image: '/images/sector-cards/building-materials-stores-card.webp',
    badge: 'مواد أساسية',
  },
  {
    id: 'finishing-works',
    title: 'مواد التشطيب والديكور',
    desc: 'رخام، سيراميك، بورسلان، وأرضيات خشبية فاخرة.',
    icon: '✨',
    image: '/images/sector-cards/factories-suppliers-workshops-card.webp',
    badge: 'تشطيبات',
  },
  {
    id: 'smart-systems',
    title: 'الإنارة والأنظمة الذكية',
    desc: 'حلول إضاءة داخلية وخارجية وأنظمة التحكم المنزلي.',
    icon: '💡',
    image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp',
    badge: 'أنظمة ذكية',
  },
  {
    id: 'furniture-decor',
    title: 'الأثاث والمفروشات',
    desc: 'أثاث غرف النوم والمعيشة والمطابخ بتصاميم عصرية.',
    icon: '🛋️',
    image: '/images/sector-cards/aluminium-glass-wood-card.webp',
    badge: 'أثاث وديكور',
  },
];

const faq = [
  { q: 'هل قسم المنتجات والمتاجر هو نفسه الخدمات؟', a: 'لا. المنتجات والمتاجر مخصص للمواد والمنتجات والموردين، أما الخدمات والعروض فهي للأعمال والخدمات التنفيذية.' },
  { q: 'هل المنتجات لها أسعار ثابتة؟', a: 'لا يتم عرض أسعار غير معتمدة. يمكن طلب عرض سعر حسب الكمية، النوع، وموقع التوريد.' },
  { q: 'هل يمكن التوريد لجميع الإمارات؟', a: 'يعتمد ذلك على المورد، وسيتم توضيح مناطق التوريد عند اعتماد بيانات المنتجات والمتاجر.' },
];

export { categories as marketplaceCategories };

export default function MarketplacePage({ directoryCards }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'المنتجات والمتاجر في بيت الريف',
    description: 'قسم مستقل للمنتجات والمتاجر ومواد البناء والتشطيب داخل بيت الريف.',
    url: 'https://bietalreef.ae/marketplace',
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7]">
      <SEOHead
        title="المنتجات والمتاجر | مواد البناء والتشطيب والأثاث في الإمارات"
        description="قسم المنتجات والمتاجر في بيت الريف: مواد بناء، تشطيبات، أنظمة ذكية، وأثاث. مسار مستقل عن الخدمات ودليل الإمارات."
        keywords="منتجات بناء, مواد بناء, متاجر تشطيب, موردين, رخام, سيراميك, أثاث"
        canonicalPath="/marketplace"
        ogImage="https://bietalreef.ae/images/materials-products-hero.webp"
        structuredData={structuredData}
      />
      <Navbar pageTitle="المنتجات والمتاجر" />
      <SectionBackBar />

      <main className="-mt-[1px]">
        <DiscoveryDirectoryHero type="products" locale="ar" />


        <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-8 text-center md:text-right">
            <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">فئات المنتجات</span>
            <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">اختر نوع المادة أو المنتج</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">كروت المنتجات أصبحت بنفس أسلوب باقي الأقسام: صورة واضحة، محتوى مختصر، ومسار مباشر للطلب أو التصفح.</p>
          </div>

          <div className="mb-20">
            <ConstitutionalSectionCards cards={directoryCards} sectionKey="products_stores" locale="ar" />
          </div>

          {false && null}

          <section className="mb-20 rounded-[40px] border border-[#E6DCC8] bg-white p-8 md:p-16"><div className="grid gap-12 md:grid-cols-3"><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Search className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">بحث ومقارنة</h3><p className="text-sm text-gray-500">تصفح فئات المنتجات بشكل مستقل ومنظم.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Star className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">موردون ومتاجر</h3><p className="text-sm text-gray-500">ربط المنتجات بالموردين والمتاجر عند اعتماد البيانات.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Zap className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">طلب عرض سعر</h3><p className="text-sm text-gray-500">اطلب سعرًا حسب الكمية والنوع وموقع المشروع.</p></div></div></section>

          <section className="mx-auto mb-20 max-w-3xl"><h2 className="mb-10 text-center text-2xl font-black text-[#0F3F1A]">الأسئلة الشائعة حول المنتجات والمتاجر</h2><div className="space-y-4">{faq.map((item, i) => <div key={i} className="rounded-2xl border border-[#E6DCC8] bg-white p-6"><h3 className="mb-2 font-black text-[#0F3F1A]">{item.q}</h3><p className="text-sm leading-relaxed text-gray-600">{item.a}</p></div>)}</div></section>

          <section className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 text-center shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:p-12"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">تحتاج منتجًا أو مادة لمشروعك؟</h2><p className="mx-auto mb-8 max-w-xl font-semibold leading-8 text-gray-600">أرسل نوع المنتج والكمية والمواصفات وموقع التوريد للحصول على توجيه مناسب.</p><a href="https://wa.me/971564456337" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0F3F1A] px-8 py-3 font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">تواصل مع بيت الريف</a></section>
        </section>
        <ProductsSmartFooter locale="ar" directoryCards={directoryCards} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const directoryCards = await getUaeSectionCards('ar', 'products_stores');
  return { props: { directoryCards }, revalidate: 300 };
}
