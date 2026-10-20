import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Monitor, Tablet, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { APP_EDITIONS, APP_DISCOVERY_COPY } from '../../lib/appDiscovery';
import { GOOGLE_PLAY_URL, PROVIDERS_APP_URL, MARKET_URL } from '../../lib/platformUrls';

const icons = { android: Smartphone, 'web-app': Monitor, ios: Tablet };
const actionClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3F1A]';

export default function AppDiscoveryPage({ edition = 'app', locale = 'ar' }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  const dir = en ? 'ltr' : 'rtl';
  const t = APP_DISCOVERY_COPY[locale];
  const page = t[edition];
  const path = `${prefix}/${edition}`;
  const canonical = `https://bietalreef.ae${path}`;
  const Arrow = en ? ArrowRight : ArrowLeft;
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical,
    name: page.title, description: page.description, inLanguage: en ? 'en-AE' : 'ar-AE',
    isPartOf: { '@type': 'WebSite', name: en ? 'Biet Al Reef' : 'بيت الريف', url: 'https://bietalreef.ae' },
    ...(edition === 'android' ? { mainEntity: { '@type': 'SoftwareApplication', name: 'Biet Al Reef', operatingSystem: 'Android', applicationCategory: 'BusinessApplication', installUrl: GOOGLE_PLAY_URL, url: canonical } } : {}),
  };
  const breadcrumbs = edition === 'app'
    ? [{ name: en ? 'Apps' : 'التطبيقات', href: path }]
    : [{ name: en ? 'Apps' : 'التطبيقات', href: `${prefix}/app` }, { name: page.title, href: path }];
  return (
    <div dir={dir} lang={locale} className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      <SEOHead title={`${page.title} | ${en ? 'Biet Al Reef' : 'بيت الريف'}`} description={page.description} canonicalPath={path} structuredData={schema} breadcrumbs={breadcrumbs} noIndex={edition === 'ios'} noIndexFollow={edition === 'ios'} />
      <Navbar locale={locale} />
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 md:pt-12">
        <nav aria-label={en ? 'Breadcrumb' : 'مسار الصفحة'} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#0F3F1A]">
          <Link href={prefix || '/'} className="underline underline-offset-4">{en ? 'Home' : 'الرئيسية'}</Link><span aria-hidden="true">/</span>
          {edition !== 'app' ? <><Link href={`${prefix}/app`} className="underline underline-offset-4">{en ? 'Apps' : 'التطبيقات'}</Link><span aria-hidden="true">/</span></> : null}
          <span aria-current="page">{page.title}</span>
        </nav>
        <section className="rounded-[2rem] border border-[#E6DCC8] bg-white p-6 shadow-sm md:p-10">
          <Image src="/icons/logo-512.webp" alt={en ? 'Biet Al Reef' : 'بيت الريف'} width={72} height={72} className="mb-5 h-16 w-16 object-contain" />
          <p className="mb-3 text-sm font-bold text-[#765A17]">{edition === 'ios' ? t.future : t.available}</p>
          <h1 className="max-w-3xl text-3xl font-black leading-tight text-[#0F3F1A] md:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">{page.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {edition === 'android' ? <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={`${actionClass} bg-[#D4AF37] text-[#0F3F1A]`}><Smartphone className="h-5 w-5" aria-hidden="true" />{t.play}</a> : null}
            {edition !== 'android' && edition !== 'app' ? <a href={PROVIDERS_APP_URL} className={`${actionClass} bg-[#0F3F1A] text-white`}><Monitor className="h-5 w-5" aria-hidden="true" />{t.web}</a> : null}
            {edition === 'app' ? <a href="#app-editions" className={`${actionClass} bg-[#0F3F1A] text-white`}>{t.choose}<Arrow className="h-4 w-4" aria-hidden="true" /></a> : null}
            <a href={MARKET_URL} className={`${actionClass} border border-[#E6DCC8] bg-white text-[#0F3F1A]`}>{t.market}</a>
          </div>
        </section>
        <section className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#0F3F1A]">{t.start}</h2>
          <ol className="mt-5 space-y-4">{page.steps.map((step, index) => <li key={step} className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F2E8] font-bold text-[#765A17]">{index + 1}</span><span className="pt-0.5 leading-7 text-gray-700">{step}</span></li>)}</ol>
          <p className="mt-6 border-t border-[#E6DCC8] pt-5 text-sm leading-7 text-gray-600">{t.note}</p>
        </section>
        <section id="app-editions" className="mt-10 scroll-mt-24">
          <h2 className="mb-5 text-2xl font-bold text-[#0F3F1A]">{edition === 'app' ? t.choose : t.related}</h2>
          <div className="grid gap-4 md:grid-cols-3" dir="rtl">
            {APP_EDITIONS.filter(item => item.key !== 'app' && (edition === 'app' || item.key !== edition)).map(item => { const Icon = icons[item.key]; const card = t.cards[item.key]; return <Link key={item.key} href={`${prefix}${item.path}`} dir={dir} className="group flex min-w-0 flex-col rounded-[1.5rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:border-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3F1A]"><Icon className="mb-4 h-8 w-8 text-[#0F3F1A]" aria-hidden="true" /><h3 className="text-xl font-bold text-[#0F3F1A]">{card[0]}</h3><p className="mb-5 mt-3 text-sm leading-7 text-gray-600">{card[1]}</p><span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#765A17]">{item.key === 'ios' ? t.future : t.details}<Arrow className="h-4 w-4" aria-hidden="true" /></span></Link>; })}
          </div>
        </section>
      </main>
      <Footer locale={locale} showRequestCTA={false} />
    </div>
  );
}
