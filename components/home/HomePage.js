import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import ProjectDiscovery from './ProjectDiscovery';

const SITE_URL = 'https://bietalreef.ae';
const seo = {
  ar: {
    title: 'بيت الريف | محرك الأعمال الرقمي للمقاولات والبناء في الإمارات',
    description: 'بيت الريف محرك الأعمال الرقمي لقطاع المقاولات والبناء في الإمارات. يساعد العميل على البحث والتواصل أو تحويل احتياجه إلى مناقصة داخلية، ويساعد الشركة على بناء حضور رقمي منظم ومستدام.',
    keywords: 'بيت الريف, محرك الأعمال الرقمي, مقاولات الإمارات, شركات خدمات, دليل الإمارات, مواد بناء, تصميم داخلي, صيانة, وياك AI',
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
      <main>
        <section aria-label={isEnglish ? 'Google Workspace first-year referral offer' : 'عرض Google Workspace للشركات'} className="border-b border-[#D9E6D8] bg-[#F3F7EF]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm leading-7 text-[#173F35]">
              <strong className="font-black">{isEnglish ? 'Google Workspace · 10% eligible first-year savings' : 'ميزة للأعمال: خصم مؤهل 10% على السنة الأولى من Google Workspace'}</strong>
              <span className="block text-xs text-[#52675B]">{isEnglish ? 'New customers; a unique individual promotion code is required. Google Cloud is not included.' : 'للاشتراكات الجديدة المؤهلة وباستخدام رمز ترويجي فردي. الخصم لا يشمل Google Cloud.'}</span>
            </div>
            <a href={isEnglish ? '/en/google-workspace-biet-alreef' : '/google-workspace-biet-alreef'} className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#173F35] px-5 py-3 text-sm font-black text-white hover:bg-[#275949]">
              {isEnglish ? 'Explore the offer and setup' : 'التفاصيل وتجهيز مساحة عمل لشركتك'}
            </a>
          </div>
        </section>
        <ProjectDiscovery locale={language} />
      </main>
      <Footer locale={language} showRequestCTA={false} />
    </div>
  </>;
}
