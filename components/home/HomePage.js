import { useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import ProjectDiscovery from './ProjectDiscovery';

const SITE_URL = 'https://bietalreef.ae';
const seo = {
  ar: {
    title: 'بيت الريف | دليل الشركات والخدمات والمقاولات في الإمارات',
    description: 'اكتشف الشركات والمهنيين وخدمات المقاولات والبناء والصيانة والتصميم ومواد البناء في الإمارات عبر منصة بيت الريف. استعرض الأعمال والعروض والمنتجات واطلب عرض سعر.',
    keywords: 'بيت الريف, دليل الشركات, دليل المقاولات, خدمات الإمارات, مقاولات, مواد بناء, تصميم داخلي, صيانة, وياك',
    ogImage: `${SITE_URL}/images/seo/home/biet-al-reef-directory-og.webp`,
  },
  en: {
    title: 'Biet Al Reef | UAE companies, services and construction directory',
    description: 'Discover UAE companies, professionals, construction and maintenance services, design, building materials, projects, offers and products.',
    keywords: 'Biet Al Reef, UAE construction, service providers, UAE directory, building materials, interior design, maintenance, Weyaak AI',
    ogImage: `${SITE_URL}/images/seo/home/biet-al-reef-directory-og.webp`,
  },
};
export default function HomePage({ locale = 'ar' }) {
  const language = locale === 'en' ? 'en' : 'ar';
  const isEnglish = language === 'en';
  const content = { seo: seo[language] };
  const offer = useRef(null);
  useEffect(() => {
    const dialog = offer.current;
    if (!dialog || !dialog.showModal) return;
    try {
      if (sessionStorage.getItem('home-workspace-offer')) return;
      dialog.showModal();
      sessionStorage.setItem('home-workspace-offer', 'seen');
    } catch { /* The home page remains usable when storage is unavailable. */ }
  }, []);
  const description = content.seo.description;
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', alternateName: isEnglish ? 'بيت الريف' : 'Biet Al Reef', url: SITE_URL, logo: `${SITE_URL}/logo.png`, description, areaServed: { '@type': 'Country', name: 'United Arab Emirates' } },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: isEnglish ? 'Biet Al Reef' : 'بيت الريف', url: isEnglish ? `${SITE_URL}/en` : SITE_URL, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}${isEnglish ? '/en' : ''}/providers?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', name: content.seo.title, url: isEnglish ? `${SITE_URL}/en` : SITE_URL, description, inLanguage: isEnglish ? 'en-AE' : 'ar-AE', about: isEnglish ? ['construction', 'contracting', 'maintenance', 'interior design', 'building materials', 'UAE service providers'] : ['البناء', 'المقاولات', 'الصيانة', 'التصميم الداخلي', 'مواد البناء', 'دليل الشركات والمهنيين في الإمارات'] },
  ];
  return <>
    <SEOHead title={content.seo.title} description={description} keywords={content.seo.keywords} ogImage={content.seo.ogImage} ogImageWidth={1200} ogImageHeight={630} canonicalPath={isEnglish ? '/en' : '/'} structuredData={structuredData} />
    <div dir={isEnglish ? 'ltr' : 'rtl'} lang={isEnglish ? 'en' : 'ar'} className="app-viewport-lock bg-[#FCFBF7] text-gray-900 font-sans">
      <Navbar locale={language} />
      <main>
        <dialog ref={offer} aria-labelledby="workspace-offer-title" className="m-auto w-[min(90vw,400px)] rounded-3xl border border-slate-200 bg-white p-6 text-start shadow-xl backdrop:bg-slate-900/35">
          <form method="dialog" className="flex justify-end"><button aria-label={isEnglish ? 'Close offer' : 'إغلاق العرض'} className="h-10 w-10 rounded-full bg-slate-100 text-xl">×</button></form>
          <h2 id="workspace-offer-title" className="my-3 text-xl font-bold">{isEnglish ? 'Save 10% on your first year of Google Workspace' : 'خصم 10% على السنة الأولى من Google Workspace'}</h2>
          <p className="mb-5 text-sm leading-7">{isEnglish ? 'For eligible new subscriptions with an individual promotion code. Google Cloud is excluded.' : 'للاشتراكات الجديدة المؤهلة برمز ترويجي فردي. لا يشمل الخصم Google Cloud.'}</p>
          <a href={isEnglish ? '/en/google-workspace-biet-alreef' : '/google-workspace-biet-alreef'} className="inline-block rounded-xl bg-sky-700 px-5 py-3 font-bold text-white">{isEnglish ? 'Offer details' : 'تفاصيل العرض'}</a>
        </dialog>
        <ProjectDiscovery locale={language} />
      </main>
      <Footer locale={language} showRequestCTA={false} />
    </div>
  </>;
}
