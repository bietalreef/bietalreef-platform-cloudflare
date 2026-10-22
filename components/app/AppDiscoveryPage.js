import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Monitor, Tablet, ArrowLeft, ArrowRight, CheckCircle2, Search, ShoppingBag, FolderOpen, BriefcaseBusiness, Globe2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { APP_EDITIONS, APP_DISCOVERY_COPY } from '../../lib/appDiscovery';
import { GOOGLE_PLAY_URL, PROVIDERS_APP_URL, MARKET_URL } from '../../lib/platformUrls';

const icons = { android: Smartphone, 'web-app': Monitor, ios: Tablet };
const actionClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A45B]';

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
    <div dir={dir} lang={locale} className="min-h-screen bg-[#FAF9F6] text-[#242424] font-sans">
      <SEOHead title={`${page.title} | ${en ? 'Biet Al Reef' : 'بيت الريف'}`} description={page.description} canonicalPath={path} structuredData={schema} breadcrumbs={breadcrumbs} noIndex={edition === 'ios'} noIndexFollow={edition === 'ios'} />
      <Navbar locale={locale} />
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-8 sm:px-6 lg:px-10 md:pt-12">
        <nav aria-label={en ? 'Breadcrumb' : 'مسار الصفحة'} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#24354B]">
          <Link href={prefix || '/'} className="underline underline-offset-4">{en ? 'Home' : 'الرئيسية'}</Link><span aria-hidden="true">/</span>
          {edition !== 'app' ? <><Link href={`${prefix}/app`} className="underline underline-offset-4">{en ? 'Apps' : 'التطبيقات'}</Link><span aria-hidden="true">/</span></> : null}
          <span aria-current="page">{page.title}</span>
        </nav>
        <section className="grid overflow-hidden rounded-[2rem] border border-[#E8E4DC] bg-white shadow-[0_18px_54px_rgba(36,36,36,.06)] lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)]">
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mb-6 flex items-center gap-3">
              <Image src="/icons/logo-512.webp" alt={en ? 'Biet Al Reef' : 'بيت الريف'} width={64} height={64} className="h-14 w-14 rounded-2xl object-contain" />
              <span className="rounded-full border border-[#E8E4DC] bg-[#FAF9F6] px-4 py-2 text-xs font-black text-[#8B713F]">{edition === 'ios' ? t.future : t.available}</span>
            </div>
            <h1 className="max-w-3xl text-3xl font-black leading-[1.45] text-[#24354B] sm:text-4xl lg:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-9 text-[#686868]">{page.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {edition === 'android' ? <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label={en ? 'Get Biet Al Reef on Google Play' : 'تحميل بيت الريف من Google Play'} className="inline-flex min-h-14 items-center rounded-xl bg-white p-1 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C7A45B]"><img src={en ? 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' : 'https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png'} alt={en ? 'Get it on Google Play' : 'احصل عليه من Google Play'} width="202" height="78" loading="eager" decoding="async" className="h-auto w-[180px] sm:w-[205px]" /></a> : null}
              {edition !== 'android' && edition !== 'app' ? <a href={PROVIDERS_APP_URL} className={`${actionClass} bg-[#24354B] text-white`}><Monitor className="h-5 w-5" aria-hidden="true" />{t.web}</a> : null}
              {edition === 'app' ? <a href="#app-editions" className={`${actionClass} bg-[#24354B] text-white`}>{t.choose}<Arrow className="h-4 w-4" aria-hidden="true" /></a> : null}
              <a href={MARKET_URL} className={`${actionClass} border border-[#E8E4DC] bg-[#FAF9F6] text-[#24354B]`}><ShoppingBag className="h-5 w-5" aria-hidden="true"/>{t.market}</a>
            </div>
          </div>
          <div className="relative flex min-h-[255px] flex-col justify-between overflow-hidden bg-[#F2ECE1] p-7 sm:p-10 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full border-[45px] border-white/50"/>
            <div className="relative z-10 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#24354B] shadow-sm"><Smartphone className="h-7 w-7" aria-hidden="true"/></span><span className="text-sm font-black text-[#24354B]">{en ? 'Work wherever you are' : 'أعمالك معك أينما كنت'}</span></div>
            <div className="relative z-10 grid grid-cols-2 gap-3">
              {[[BriefcaseBusiness,en?'Manage your business':'إدارة نشاطك'],[FolderOpen,en?'Your documents':'ملفاتك'],[ShoppingBag,en?'Explore the market':'اكتشف السوق'],[Globe2,en?'Open anywhere':'على كل جهاز']].map(([Icon,label])=><div key={label} className="flex min-h-24 flex-col justify-center gap-2 rounded-2xl border border-white/85 bg-white/85 p-4 shadow-sm"><Icon className="h-6 w-6 text-[#C7A45B]" aria-hidden="true"/><span className="text-sm font-bold text-[#24354B]">{label}</span></div>)}
            </div>
          </div>
        </section>
        <section className="mt-8 rounded-[2rem] border border-[#E6DCC8] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#24354B]">{t.start}</h2>
          <ol className="mt-5 space-y-4">{page.steps.map((step, index) => <li key={step} className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F2E8] font-bold text-[#765A17]">{index + 1}</span><span className="pt-0.5 leading-7 text-gray-700">{step}</span></li>)}</ol>
          <p className="mt-6 border-t border-[#E6DCC8] pt-5 text-sm leading-7 text-gray-600">{t.note}</p>
        </section>
        <section id="app-editions" className="mt-10 scroll-mt-24">
          <h2 className="mb-5 text-2xl font-bold text-[#24354B]">{edition === 'app' ? t.choose : t.related}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" dir={dir}>
            {APP_EDITIONS.filter(item => item.key !== 'app' && (edition === 'app' || item.key !== edition)).map(item => { const Icon = icons[item.key]; const card = t.cards[item.key]; return <Link key={item.key} href={`${prefix}${item.path}`} dir={dir} className="group flex min-w-0 flex-col rounded-[1.5rem] border border-[#E6DCC8] bg-white p-6 shadow-sm transition hover:border-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24354B]"><span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#F3ECE0]"><Icon className="h-7 w-7 text-[#24354B]" aria-hidden="true" /></span><h3 className="text-xl font-bold text-[#24354B]">{card[0]}</h3><p className="mb-5 mt-3 text-sm leading-7 text-gray-600">{card[1]}</p><span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#765A17]">{item.key === 'ios' ? t.future : t.details}<Arrow className="h-4 w-4" aria-hidden="true" /></span></Link>; })}
          </div>
        </section>
      </main>
      <Footer locale={locale} showRequestCTA={false} />
    </div>
  );
}
