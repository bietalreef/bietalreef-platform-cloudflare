import DiscoveryEntityCard from './cards/DiscoveryEntityCard';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  MapPin,
  MessageCircle,
  Package,
  Wrench,
} from 'lucide-react';

const COPY = {
  ar: {
    servicesEyebrow: 'خدمات منشورة من شركات المنصة',
    servicesTitle: 'خدمات متاحة الآن',
    servicesDescription: 'اطّلع على تفاصيل الخدمة وتواصل مع الشركة لطلب عرض سعر.',
    productsEyebrow: 'منتجات منشورة من شركات المنصة',
    productsTitle: 'منتجات متاحة الآن',
    productsDescription: 'تصفح المنتجات والمواصفات وتواصل مع المتجر.',
    service: 'خدمة منشورة',
    product: 'منتج منشور',
    verified: 'حساب موثّق',
    provider: 'الشركة',
    location: 'نطاق الخدمة',
    openService: 'فتح الخدمة والشركة',
    openProduct: 'فتح المنتج والمورد',
    whatsapp: 'واتساب',
    startingPrice: 'السعر الابتدائي',
    madeToOrder: 'مصنّع حسب الطلب',
    priceNote: 'السعر النهائي بعد مراجعة المقاسات والمواصفات',
    fallbackDescription: 'افتح ملف الشركة للاطلاع على التفاصيل وطلب عرض مناسب.',
  },
  en: {
    servicesEyebrow: 'Published services from platform providers',
    servicesTitle: 'Services available now',
    servicesDescription: 'Explore service details and contact the company to request a quote.',
    productsEyebrow: 'Published products from platform providers',
    productsTitle: 'Products available now',
    productsDescription: 'Explore products and specifications, then contact the supplier.',
    service: 'Published service',
    product: 'Published product',
    verified: 'Verified provider',
    provider: 'Provider',
    location: 'Service area',
    openService: 'Open service and provider',
    openProduct: 'Open product and supplier',
    whatsapp: 'WhatsApp',
    startingPrice: 'Starting price',
    madeToOrder: 'Made to order',
    priceNote: 'Final price after dimensions and specifications are reviewed',
    fallbackDescription: 'Open the provider profile to review the details and request a suitable quotation.',
  },
};

export default function PublishedEntityGrid({
  items = [],
  locale = 'ar',
  type = 'service',
}) {
  if (!items.length) return null;
  const isEn = locale === 'en';
  const copy = COPY[isEn ? 'en' : 'ar'];
  const isProduct = type === 'product';
  const DirectionArrow = isEn ? ArrowRight : ArrowLeft;
  const TypeIcon = isProduct ? Package : Wrench;
  const fallbackImage = isProduct
    ? '/images/materials-products-hero.webp'
    : '/images/services-offers-hero.webp';

  return (
    <section
      id={isProduct ? 'published-products' : 'published-services'}
      dir={isEn ? 'ltr' : 'rtl'}
      className="border-y border-[#E6DCC8] bg-white/70 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className={isEn ? 'mb-9 text-left' : 'mb-9 text-right'}>
          <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-[#FFF8E5] px-4 py-1.5 text-xs font-black text-[#8A6A00]">
            {isProduct ? copy.productsEyebrow : copy.servicesEyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-black text-[#20354a] md:text-4xl">
            {isProduct ? copy.productsTitle : copy.servicesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:text-base">
            {isProduct ? copy.productsDescription : copy.servicesDescription}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><DiscoveryEntityCard key={item.id} item={{...item,image:item.image||fallbackImage}} locale={locale} type={type}/>)}</div>
      </div>
    </section>
  );
}
