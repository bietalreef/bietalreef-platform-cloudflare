import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';
import ProductsSmartFooter from '../../components/ProductsSmartFooter';
import DiscoveryDirectoryHero from '../../components/DiscoveryDirectoryHero';
import SectionBackBar from '../../components/SectionBackBar';
import ConstitutionalSectionCards from '../../components/ConstitutionalSectionCards';
import { getUaeSectionCards } from '../../lib/platformDirectoryCards';
import { buildCardWhatsappUrl } from '../../lib/providerWhatsapp';
import { ArrowLeft, MessageCircle, Search, ShoppingBag, Star, Zap, ChevronRight, Sparkles } from 'lucide-react';

const WHITE_WHALE_QUARTZ_WHATSAPP = buildCardWhatsappUrl({
  phone: '971506623518',
  locale: 'en',
  cardType: 'product',
  providerName: 'White Whale Marble & Granite Factory',
  providerCode: 'BR-PROV-HOT-001',
  title: 'Custom premium kitchen quartz',
  description: 'Supply, fabrication and installation for kitchen tops, countertops and islands according to measurements, colour and finish.',
  category: 'Quartz · Kitchen tops · Countertops',
  price: 'Price based on measurements and specifications',
  pricingModel: 'Available on request',
  location: 'Al Ain · Abu Dhabi',
  pagePath: '/en/marketplace',
});

const categories = [
  { id: 'building-materials', title: 'Basic Building Materials', desc: 'Cement, reinforcement steel, blocks and essential insulation materials.', icon: '🏗️', image: '/images/sector-cards/building-materials-stores-card.webp', badge: 'Core materials' },
  { id: 'finishing-works', title: 'Finishing and Décor Materials', desc: 'Marble, ceramic, porcelain and premium wooden flooring.', icon: '✨', image: '/images/sector-cards/factories-suppliers-workshops-card.webp', badge: 'Finishing' },
  { id: 'smart-systems', title: 'Lighting and Smart Systems', desc: 'Indoor and outdoor lighting solutions and home control systems.', icon: '💡', image: '/images/sector-cards/maintenance-finishing-ac-plumbing-electrical-card.webp', badge: 'Smart systems' },
  { id: 'furniture-decor', title: 'Furniture and Furnishings', desc: 'Bedroom, living room and kitchen furniture with modern designs.', icon: '🛋️', image: '/images/sector-cards/aluminium-glass-wood-card.webp', badge: 'Furniture & décor' }
];

const faq = [
  { q: 'Is Products & Stores the same as Services?', a: 'No. Products & Stores is for materials, products and suppliers, while Services & Offers is for execution work and service requests.' },
  { q: 'Do products have fixed prices?', a: 'Unapproved prices are not shown. You can request a quotation based on quantity, type and supply location.' },
  { q: 'Can supply cover all Emirates?', a: 'This depends on the supplier. Supply areas will be clarified when product and store data is approved.' }
];

export default function MarketplaceEnglishPage({ directoryCards }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Products and Stores in Biet Al Reef',
    description: 'An independent section for products, stores, building materials and finishing products inside Biet Al Reef.',
    url: 'https://bietalreef.ae/en/marketplace',
    inLanguage: 'en-AE',
  };

  return (
    <>
      <Head><title>Products & Stores | Building Materials, Finishing and Furniture in the UAE</title><meta name="description" content="Products & Stores in Biet Al Reef: building materials, finishing products, smart systems and furniture. A separate path from services and the UAE Directory." /><meta name="keywords" content="building products, building materials, finishing stores, suppliers, marble, ceramic, furniture" /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://bietalreef.ae/en/marketplace" /><link rel="alternate" hrefLang="ar-AE" href="https://bietalreef.ae/marketplace" /><link rel="alternate" hrefLang="en-AE" href="https://bietalreef.ae/en/marketplace" /><meta property="og:title" content="Products & Stores | Biet Al Reef" /><meta property="og:description" content="Building materials, finishing products, smart systems and furniture in a dedicated marketplace path." /><meta property="og:type" content="website" /><meta property="og:url" content="https://bietalreef.ae/en/marketplace" /><meta property="og:image" content="https://bietalreef.ae/images/materials-products-hero.webp" /><meta property="og:image:alt" content="Products & Stores | Biet Al Reef" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="Products & Stores | Biet Al Reef" /><meta name="twitter:image" content="https://bietalreef.ae/images/materials-products-hero.webp" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></Head>
      <EnglishLayout>
        <SectionBackBar locale="en" />
        <main dir="ltr" className="-mt-[1px] bg-[#FDFBF7] text-left [&>section:nth-of-type(2)>section:first-of-type]:hidden">
          <DiscoveryDirectoryHero type="products" locale="en" />


          <section id="marketplace-categories" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="mb-8 text-center md:text-left">
              <span className="inline-flex rounded-full border border-[#B8922B]/30 bg-white px-4 py-1.5 text-xs font-black text-[#8A6A00] shadow-sm">Product categories</span>
              <h2 className="mt-4 text-3xl font-black text-[#0F3F1A] md:text-4xl">Choose the material or product type</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-8 text-gray-600 md:mx-0 md:text-base">Product cards now follow the same premium style as the other sections: strong image, focused content and a direct browsing path.</p>
            </div>

            <div className="mb-20">
              <ConstitutionalSectionCards cards={directoryCards} sectionKey="products_stores" locale="en" />
            </div>

            {null}
            <section className="mb-20 rounded-[40px] border border-[#E6DCC8] bg-white p-8 md:p-16"><div className="grid gap-12 md:grid-cols-3"><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Search className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Search and compare</h3><p className="text-sm text-gray-500">Browse product categories independently and clearly.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Star className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Suppliers and stores</h3><p className="text-sm text-gray-500">Connect products with suppliers and stores once data is approved.</p></div><div className="text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Zap className="h-8 w-8" /></div><h3 className="mb-3 font-black text-[#0F3F1A]">Request a quotation</h3><p className="text-sm text-gray-500">Ask for a price based on quantity, type and project location.</p></div></div></section>

            <section className="mx-auto mb-20 max-w-3xl"><h2 className="mb-10 text-center text-2xl font-black text-[#0F3F1A]">FAQ about Products & Stores</h2><div className="space-y-4">{faq.map((item, i) => <div key={i} className="rounded-2xl border border-[#E6DCC8] bg-white p-6"><h3 className="mb-2 font-black text-[#0F3F1A]">{item.q}</h3><p className="text-sm leading-relaxed text-gray-600">{item.a}</p></div>)}</div></section>

            <section className="rounded-[2rem] border border-[#E6DCC8] bg-white p-8 text-center shadow-[0_18px_45px_rgba(18,58,70,0.07)] md:p-12"><h2 className="mb-4 text-3xl font-black text-[#0F3F1A]">Need a product or material for your project?</h2><p className="mx-auto mb-8 max-w-xl font-semibold leading-8 text-gray-600">Send the product type, quantity, specifications and supply location to receive suitable guidance.</p><a href="https://wa.me/971567856001" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0F3F1A] px-8 py-3 font-black text-white shadow-lg transition hover:bg-[#D4AF37] hover:text-[#0F3F1A]">Contact Biet Al Reef</a></section>
          </section>
          <ProductsSmartFooter locale="en" directoryCards={directoryCards} />
        </main>
      </EnglishLayout>
    </>
  );
}

export async function getStaticProps() {
  const directoryCards = await getUaeSectionCards('en', 'products_stores');
  return { props: { directoryCards }, revalidate: 300 };
}
