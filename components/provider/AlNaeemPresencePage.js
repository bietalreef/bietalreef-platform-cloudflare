import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { alNaeemPath, AL_NAEEM_ORIGIN } from '../../lib/alNaeemPresence';

const COPY = {
  ar: {
    home: 'الرئيسية', services: 'الخدمات', offers: 'العروض', 'service-areas': 'مناطق الخدمة',
    title: 'شركة النعيم', company: 'شركة النعيم لخدمات التنظيف والتعقيم وتنظيف الخزانات',
    about: 'عن الشركة', contact: 'اتصل الآن', whatsapp: 'تواصل عبر واتساب',
    view: 'عرض التفاصيل', all: 'عرض الكل', noOffers: 'لا توجد عروض معتمدة وسارية للنشر حاليًا.',
    noServices: 'لا توجد خدمات معتمدة للنشر حاليًا.', noAreas: 'لا توجد مناطق خدمة معتمدة للنشر حاليًا.',
    quote: 'يرجى توضيح نوع الخدمة وموقعها ونطاق العمل للحصول على عرض سعر مناسب.',
    directory: 'دليل الشركات والمهنيين', category: 'خدمات التنظيف', business: 'بيانات النشاط المنشورة',
    more: 'تعرف على التفاصيل', unavailable: 'تعذّر تحميل بيانات الشركة مؤقتًا.',
    areaNote: 'تأكد من توافر الخدمة بالمنطقة وموعد التنفيذ مع الشركة قبل الحجز.',
  },
  en: {
    home: 'Home', services: 'Services', offers: 'Offers', 'service-areas': 'Service areas',
    title: 'Al Nuaim', company: 'Al Nuaim Cleaning, Sanitization & Water Tank Cleaning Services',
    about: 'About the company', contact: 'Call now', whatsapp: 'WhatsApp',
    view: 'View details', all: 'View all', noOffers: 'No current offers have been approved for publication.',
    noServices: 'No services are currently approved for publication.', noAreas: 'No service areas are currently approved for publication.',
    quote: 'Share the service type, location and scope to receive a suitable quote.',
    directory: 'Business directory', category: 'Cleaning services', business: 'Published company information',
    more: 'Read more', unavailable: 'Company details are temporarily unavailable.',
    areaNote: 'Confirm local availability and timing with the company before booking.',
  },
};

const localText = (item, locale, key = 'name') => item?.[key + '_' + locale] || item?.[key + '_ar'] || '';
const phoneUrl = n => {
  const digits = String(n || '').replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15 ? 'tel:+' + digits : null;
};
const waUrl = n => {
  let digits = String(n || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '971' + digits.slice(1);
  return digits.length >= 9 && digits.length <= 15 ? 'https://wa.me/' + digits : null;
};

function Cards({ items, kind, locale }) {
  const t = COPY[locale];
  const imageText = locale === 'ar' ? 'تصميم توضيحي للخدمة' : 'Service illustration';
  if (!items?.length) return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-slate-600">{kind === 'offers' ? t.noOffers : kind === 'services' ? t.noServices : t.noAreas}</p>;
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {items.map(item => <Link key={item.id} href={alNaeemPath(locale, { kind, slug: item.slug })} className="group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 hover:shadow-md">
      {item.image ? <img src={item.image} alt={localText(item,locale) + ' — ' + imageText} loading="lazy" className="h-28 w-32 shrink-0 object-cover sm:h-40 sm:w-36" /> : <div aria-hidden="true" className="flex w-20 shrink-0 items-center justify-center bg-[#EEF1F5] text-2xl text-[#163453] sm:w-28">✦</div>}
      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <h3 className="text-base font-bold text-[#18324c]">{localText(item,locale)}</h3>
        {localText(item,locale,'description') && <p className="mt-1 line-clamp-3 text-sm leading-6 text-slate-600">{localText(item,locale,'description')}</p>}
        <span className="mt-2 inline-block text-xs font-bold text-[#9d7833]">{t.view}</span>
      </div>
    </Link>)}
  </div>;
}

function Section({ kind, items, locale, heading, more }) {
  const t = COPY[locale];
  return <section className="mx-auto max-w-6xl px-4 py-5 sm:py-8">
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-xl font-extrabold text-[#17344c] sm:text-2xl">{heading || t[kind]}</h2>
      {more && items?.length ? <Link href={alNaeemPath(locale,{kind})} className="rounded-full border border-[#dfcfab] px-3 py-2 text-xs font-semibold text-[#17344c]">{t.all}</Link> : null}
    </div>
    <Cards items={items} kind={kind} locale={locale} />
  </section>;
}

export default function AlNaeemPresencePage({ data, locale = 'ar', route = {kind:'home'}, unavailable = false }) {
  const t = COPY[locale];
  const english = locale === 'en';
  const base = alNaeemPath(locale);
  const current = alNaeemPath(locale,route);
  const alt = alNaeemPath(english ? 'ar' : 'en',route);
  if (unavailable || !data) return <div><Navbar /><main className="mx-auto max-w-3xl p-8" role="status">{t.unavailable}</main><Footer /></div>;
  const collections = { services:data.services, offers:data.offers, 'service-areas':data.areas };
  const collection = collections[route.kind] || [];
  const chosen = route.slug && collection.find(x=>x.slug===route.slug);
  const company = localText(data.profile,locale) || t.company;
  const title = route.kind==='home' ? company : chosen ? localText(chosen,locale) : t[route.kind];
  const detail = chosen ? (localText(chosen,locale,'details') || localText(chosen,locale,'description')) : '';
  const description = detail || localText(data.profile,locale, route.kind === 'home' ? 'description' : 'short_description') || t.quote;
  const metaTitle = title + ' | ' + (route.kind==='home' ? t.category : company) + ' | بيت الريف';
  const googleMaps = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Damascus Street, Al Qusais, Dubai');
  const canonical = AL_NAEEM_ORIGIN + current;
  const ph = phoneUrl(data.profile.phone);
  const wa = waUrl(data.profile.whatsapp || data.profile.phone);
  const isEmpty = route.kind !== 'home' && !route.slug && !collection.length;
  const jsonld = {
    '@context':'https://schema.org',
    '@type':'LocalBusiness',
    name:company,
    url:AL_NAEEM_ORIGIN + base,
    ...(ph ? {telephone: data.profile.phone} : {}),
    ...(data.profile.logo_url ? {image:AL_NAEEM_ORIGIN+data.profile.logo_url} : {}),
    address: {'@type':'PostalAddress',streetAddress:'Damascus Street, Al Qusais',addressLocality:'Dubai',addressCountry:'AE'},
    areaServed:data.areas.map(x=>({ '@type':'Place', name:x.name_en })),
    mainEntityOfPage:canonical,
  };
  return <div dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-[#fbfaf7] text-slate-900">
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={description.slice(0,165)} />
      <meta name="robots" content={isEmpty ? 'noindex,follow' : 'index,follow'} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang={english ? 'ar-AE' : 'en-AE'} href={AL_NAEEM_ORIGIN + alt} />
      <link rel="alternate" hrefLang={english ? 'en-AE' : 'ar-AE'} href={canonical} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description.slice(0,165)} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={AL_NAEEM_ORIGIN+data.profile.cover_image_url} />
      <link rel="alternate" hrefLang="x-default" href={AL_NAEEM_ORIGIN + alNaeemPath('ar',route)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonld).replace(/</g,'\\u003c')}} />
    </Head>
    <Navbar />
    <main>
      <nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#425d75]">
        <Link href={english ? '/en/providers' : '/providers'}>{t.directory}</Link><span>/</span>
        <Link href={base}>{company}</Link>{route.kind!=='home' && <><span>/</span><Link href={alNaeemPath(locale,{kind:route.kind})}>{t[route.kind]}</Link></>}
        {chosen && <><span>/</span><span>{localText(chosen,locale)}</span></>}
      </nav>
      {route.kind === 'home' && data.profile.cover_image_url && <div className="mx-auto max-w-6xl px-4"><img src={data.profile.cover_image_url} alt={company} className="w-full rounded-xl object-contain" /></div>}
      <header className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
          <div className="flex items-center gap-3">
            {data.profile.logo_url && <img src={data.profile.logo_url} alt={company} className="h-16 w-16 rounded-2xl border object-contain" />}
            <div><p className="text-xs font-semibold text-[#aa873e]">{t.category}</p><h1 className="text-2xl font-extrabold leading-tight text-[#17344c] sm:text-4xl">{title}</h1></div>
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{description}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-600"><span>{english?'Damascus Street, Al Qusais, Dubai':'دبي، القصيص، شارع دمشق'}</span><a href={googleMaps} rel="noopener noreferrer" target="_blank" className="underline decoration-[#ceb376] underline-offset-4">{english?'View address on Google Maps':'عرض العنوان على خرائط Google'}</a></div>
          <div className="mt-4 flex flex-wrap gap-3">
            {ph && <a href={ph} className="rounded-xl bg-[#193954] px-5 py-3 text-sm font-bold text-white">{t.contact}</a>}
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#ceb376] px-5 py-3 text-sm font-bold text-[#193954]">{t.whatsapp}</a>}
          </div>
        </div>
      </header>
      {route.kind==='home' ? <>
        <Section kind="services" items={data.services.slice(0,4)} locale={locale} more />
        {data.offers.length > 0 && <Section kind="offers" items={data.offers.slice(0,4)} locale={locale} more />}
        <Section kind="service-areas" items={data.areas.slice(0,5)} locale={locale} more />
      </> : chosen ? <>
        <section className="mx-auto max-w-6xl px-4 py-6">
          {chosen.image && <img src={chosen.image} alt={localText(chosen,locale)} className="max-h-[460px] w-full rounded-2xl object-contain" />}
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">{detail || (route.kind==='service-areas' ? t.areaNote : t.quote)}</p>
          <p className="mt-3 text-sm text-slate-500">{route.kind==='service-areas' ? t.areaNote : t.quote}</p>
          {route.kind==='offers' && chosen.service_slug && <Link href={alNaeemPath(locale,{kind:'services',slug:chosen.service_slug})} className="mt-4 inline-block rounded-xl border border-amber-200 px-4 py-2 text-sm font-bold text-[#193954]">{english?'See related service':'تفاصيل الخدمة المرتبطة'}</Link>}
        </section>
        <Section kind="services" items={data.services.filter(x=>x.id!==chosen.id).slice(0,3)} locale={locale} heading={t.services} />
      </> : <Section kind={route.kind} items={collection} locale={locale} />}
      <div className="mx-auto max-w-6xl px-4 py-6"><Link href={base} className="text-sm font-semibold text-[#193954]">{t.home} — {company}</Link></div>
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </main>
    <Footer />
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#eadfcd] bg-white/95 p-2 shadow-[0_-5px_20px_rgba(0,0,0,.08)] backdrop-blur-md sm:hidden">
      {ph && <a href={ph} className="flex-1 rounded-xl bg-[#173b58] px-3 py-3 text-center text-sm font-bold text-white">{t.contact}</a>}
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-xl border border-[#b28a46] bg-[#f8f2e6] px-3 py-3 text-center text-sm font-bold text-[#173b58]">{t.whatsapp}</a>}
    </div>
  </div>;
}
