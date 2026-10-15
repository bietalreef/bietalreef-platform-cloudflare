import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import ProjectDiscovery from './ProjectDiscovery';

const SITE_URL = 'https://bietalreef.ae';
const seo = {
  ar: {
    title: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات',
    description: 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. يساعد العميل على البحث والتواصل أو تحويل احتياجه إلى مناقصة داخلية، ويساعد مزود الخدمة على بناء حضور رقمي منظم ومستدام.',
    keywords: 'بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, مزودو خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI',
    ogImage: `${SITE_URL}/hero-villa-1.webp`,
  },
  en: {
    title: 'Biet Al Reef | UAE digital business engine for construction',
    description: 'Biet Al Reef helps customers discover and contact UAE construction providers and helps providers build a structured, lasting digital presence.',
    keywords: 'Biet Al Reef, UAE construction, service providers, UAE directory, building materials, interior design, maintenance, Weyaak AI',
    ogImage: `${SITE_URL}/hero-villa-1.webp`,
  },
};
export default function HomePage({ locale = 'ar' }) {
  const language = locale === 'en' ? 'en' : 'ar';
  const isEnglish = language === 'en';
  const content = { seo: seo[language] };
  const description = content.seo.description;
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', alternateName: isEnglish ? 'بيت الريف' : 'Biet Al Reef', url: SITE_URL, logo: `${SITE_URL}/logo.png`, description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', url: isEnglish ? `${SITE_URL}/en` : SITE_URL, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}${isEnglish ? '/en' : ''}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', name: content.seo.title, url: isEnglish ? `${SITE_URL}/en` : SITE_URL, description, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', about: isEnglish ? ['construction', 'contracting', 'maintenance', 'interior design', 'building materials', 'UAE service providers'] : ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'دليل الشركات والمهنيين في الإمارات'] },
  ];
  return <>
    <SEOHead title={content.seo.title} description={description} keywords={content.seo.keywords} ogImage={content.seo.ogImage} canonicalPath={isEnglish ? '/en' : '/'} structuredData={structuredData} />
    <div dir={isEnglish ? 'ltr' : 'rtl'} lang={isEnglish ? 'en' : 'ar'} className="app-viewport-lock bg-[#FCFBF7] text-gray-900 font-sans">
      <Navbar locale={language} />
      <main><ProjectDiscovery locale={language} /></main>
      <Footer locale={language} showRequestCTA={false} />
    </div>
  </>;
}
