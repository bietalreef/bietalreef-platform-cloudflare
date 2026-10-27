import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { presencePath, REHAB_ORIGIN } from '../../lib/rehabPresence';

const copy = {
  ar: {
    home: 'الرئيسية', services: 'الخدمات', offers: 'العروض', 'service-areas': 'مناطق الخدمة',
    contact: 'اتصل الآن', whatsapp: 'تواصل عبر واتساب', more: 'عرض الكل', details: 'تفاصيل الخدمة',
    view: 'عرض التفاصيل', verified: 'شركة موثقة في بيت الريف', quote: 'اطلب عرض سعر بعد تقييم الاحتياج',
    intro: 'اعرف الخدمات والمناطق المتاحة وتواصل مباشرة مع الشركة لتأكيد نطاق العمل والموعد.',
    servicesHeading: 'خدمات الرحاب', offersHeading: 'عروض الرحاب المعتمدة', areasHeading: 'أماكن تقديم الخدمة',
    emptyServices: 'لا توجد خدمات معتمدة للنشر على المنصة حاليًا.',
    emptyOffers: 'لا توجد عروض معتمدة وسارية للنشر على المنصة حاليًا.',
    emptyAreas: 'لا توجد مناطق خدمة معتمدة للنشر حاليًا.',
    offeredInArea: 'اسأل الشركة عن توافر الخدمة في هذه المنطقة وتوقيت الزيارة قبل الحجز.',
    faq: 'أسئلة شائعة', gallery: 'أعمال معتمدة', about: 'عن الشركة', back: 'العودة إلى ملف الشركة',
    browse: 'اختر القسم المناسب', inquiry: 'للحصول على عرض دقيق، أرسل تفاصيل الموقع والخدمة عبر واتساب.',
    unavailable: 'تعذر تحميل بيانات الشركة مؤقتًا. يرجى إعادة المحاولة لاحقًا.',
  },
  en: {
    home: 'Home', services: 'Services', offers: 'Offers', 'service-areas': 'Service areas',
    contact: 'Call now', whatsapp: 'WhatsApp', more: 'View all', details: 'Service details',
    view: 'View details', verified: 'Verified on Biet Al Reef', quote: 'Request a quote after assessment',
    intro: 'Explore available services and coverage areas, then contact the company to confirm scope and availability.',
    servicesHeading: 'Al Rehab services', offersHeading: 'Approved Al Rehab offers', areasHeading: 'Coverage areas',
    emptyServices: 'No services are currently approved for publication on the platform.',
    emptyOffers: 'No current offers are approved for publication on the platform.',
    emptyAreas: 'No coverage areas are currently approved for publication.',
    offeredInArea: 'Contact the company to confirm service availability and booking in this area.',
    faq: 'Frequently asked questions', gallery: 'Approved work', about: 'About the company',
    back: 'Back to company', browse: 'Explore', inquiry: 'Share the location and required work on WhatsApp to get an accurate quote.',
    unavailable: 'Company data is temporarily unavailable. Please try again later.',
  },
};

const pick = (row, locale, key = 'name') => row?.[`${key}_${locale}`] || '';
const detailsFor = (route, data) => route?.slug && (route.kind === 'services' ? data.services : route.kind === 'offers' ? data.offers : data.areas).find((x) => x.slug === route.slug);
function whatsappUrl(number, name) {
  const digits = String(number || '').replace(/\D/g, '');
  const e164 = digits.startsWith('0') ? `971${digits.slice(1)}` : digits;
  if (e164.length < 9 || e164.length > 15) return null;
  return `https://wa.me/${e164}?text=${encodeURIComponent(name)}`;
}

function Collection({ items, locale, routeKind, empty }) {
  const t = copy[locale];
  if (!items.length) return <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-sm text-slate-600">{empty}</p>;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => <Link key={item.id} href={presencePath(locale, { kind: routeKind, slug: item.slug })} className="group flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#B89149] hover:shadow-lg">
      {item.image ? <img loading="lazy" src={item.image} alt={pick(item, locale)} className="h-44 w-full object-cover" /> : <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#EAF0F7] to-[#FBF6E9] text-[#B89149]">{routeKind === 'service-areas' ? <MapPin size={42} strokeWidth={1.4} /> : <Sparkles size={42} strokeWidth={1.4} />}</div>}
      <span className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-lg font-bold leading-snug text-[#122A49]">{pick(item, locale)}</span>
        {pick(item, locale, 'description') ? <span className="line-clamp-3 text-sm leading-7 text-slate-600">{pick(item, locale, 'description')}</span> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[#9A7229]">{t.view} {locale === 'ar' ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</span>
      </span>
    </Link>)}
  </div>;
}

function Section({ title, href, children, locale }) {
  return <section className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-2xl font-black tracking-tight text-[#122A49] sm:text-3xl">{title}</h2>
      {href ? <Link className="inline-flex items-center gap-2 rounded-full border border-[#C8AB76] px-4 py-2 text-sm font-bold text-[#76531D] hover:bg-[#FFF8E9]" href={href}>{copy[locale].more} {locale === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}</Link> : null}
    </div>{children}
  </section>;
}

function Seo({ data, locale, route, detail }) {
  const p = data.profile;
  const t = copy[locale];
  const path = presencePath(locale, route);
  const equivalent = presencePath(locale === 'en' ? 'ar' : 'en', route);
  const baseName = pick(p, locale);
  const pageName = detail ? pick(detail, locale) : route.kind === 'home' ? baseName : t[route.kind];
  const title = detail ? `${pageName} | ${baseName} | بيت الريف` : `${pageName} | ${baseName} | بيت الريف`;
  const description = (detail && pick(detail, locale, 'description')) || pick(p, locale, 'short_description') || t.intro;
  const isEmptySection = !detail && ((route.kind === 'offers' && !data.offers.length) || (route.kind === 'services' && !data.services.length) || (route.kind === 'service-areas' && !data.areas.length));
  const organization = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${REHAB_ORIGIN}/providers/alrehab-home-clean#company`,
    name: baseName, url: `${REHAB_ORIGIN}${presencePath(locale)}`, telephone: p.phone || undefined,
    ...(p.logo_url ? { logo: p.logo_url } : {}),
    ...(data.areas.length ? { areaServed: data.areas.map((area) => ({ '@type': 'AdministrativeArea', name: pick(area, locale) })) } : {}),
  };
  const schema = detail && route.kind === 'services' ? {
    '@context': 'https://schema.org', '@type': 'Service', name: pageName, description, provider: { '@id': organization['@id'] }, areaServed: organization.areaServed,
  } : organization;
  return <Head>
    <title>{title}</title><meta name="description" content={description} />
    <link rel="canonical" href={`${REHAB_ORIGIN}${path}`} />
    <link rel="alternate" hrefLang="ar-AE" href={`${REHAB_ORIGIN}${presencePath('ar', route)}`} />
    <link rel="alternate" hrefLang="en-AE" href={`${REHAB_ORIGIN}${presencePath('en', route)}`} />
    <link rel="alternate" hrefLang="x-default" href={`${REHAB_ORIGIN}${presencePath('ar', route)}`} />
    {isEmptySection ? <meta name="robots" content="noindex,follow" /> : null}
    <meta property="og:title" content={title} /><meta property="og:description" content={description} />
    {p.cover_image_url ? <meta property="og:image" content={p.cover_image_url} /> : null}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
  </Head>;
}

export default function RehabPresencePage({ data, locale = 'ar', route = { kind: 'home' }, unavailable = false }) {
  const t = copy[locale];
  const rtl = locale === 'ar';
  if (unavailable || !data) return <main dir={rtl ? 'rtl' : 'ltr'} className="mx-auto max-w-4xl p-10 text-center" role="alert"><h1>{t.unavailable}</h1></main>;
  const p = data.profile;
  const detail = detailsFor(route, data);
  const name = pick(p, locale);
  const phone = String(p.phone || '').replace(/[^+\d]/g, '');
  const wa = whatsappUrl(p.whatsapp, name);
  const currentName = detail ? pick(detail, locale) : route.kind === 'home' ? name : t[route.kind];
  const categories = [
    { kind: 'services', title: t.servicesHeading, items: data.services, empty: t.emptyServices },
    { kind: 'offers', title: t.offersHeading, items: data.offers, empty: t.emptyOffers },
    { kind: 'service-areas', title: t.areasHeading, items: data.areas, empty: t.emptyAreas },
  ];

  return <div dir={rtl ? 'rtl' : 'ltr'} lang={locale === 'ar' ? 'ar-AE' : 'en-AE'} className="min-h-screen bg-[#F6F8FC] text-slate-800">
    <Seo data={data} locale={locale} route={route} detail={detail} />
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3" aria-label="Company navigation">
        <Link href={presencePath(locale)} className="flex min-w-0 items-center gap-3">
          {p.logo_url ? <img src={p.logo_url} alt="" className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-contain" /> : <Building2 className="text-[#B89149]" />}
          <strong className="truncate text-base text-[#122A49] sm:text-lg">{name}</strong>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-[#122A49]">
          <Link href={presencePath(locale)}>{t.home}</Link>
          <Link href={presencePath(locale, { kind: 'services' })}>{t.services}</Link>
          <Link href={presencePath(locale, { kind: 'offers' })}>{t.offers}</Link>
          <Link href={presencePath(locale, { kind: 'service-areas' })}>{t['service-areas']}</Link>
          <Link className="rounded-full border border-slate-300 px-3 py-1" href={presencePath(locale === 'ar' ? 'en' : 'ar', route)}>{rtl ? 'English' : 'العربية'}</Link>
        </div>
      </nav>
    </header>

    <section className="relative isolate overflow-hidden bg-[#132D4D] text-white">
      {p.cover_image_url ? <img alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" src={p.cover_image_url} /> : null}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/75">
          <Link href={presencePath(locale)}>{name}</Link>{route.kind !== 'home' ? <span>/ {currentName}</span> : null}
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#DCC18D]/50 bg-[#B89149]/20 px-3 py-1.5 text-xs font-bold text-[#FFE8B6]"><ShieldCheck size={15} />{t.verified}</span>
        <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">{currentName}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{detail ? pick(detail, locale, 'description') || t.inquiry : pick(p, locale, 'short_description') || t.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {phone ? <a className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#D4AD63] px-5 py-3 font-bold text-[#152E4A] hover:bg-[#F0C779]" href={`tel:${phone}`}><Phone size={18} /> {t.contact}</a> : null}
          {wa ? <a className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> {t.whatsapp}</a> : null}
        </div>
      </div>
    </section>

    {route.kind === 'home' ? <>
      <Section title={t.about} locale={locale}><p className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-base leading-9 text-slate-700">{pick(p, locale, 'description') || pick(p, locale, 'short_description')}</p></Section>
      {categories.map((c) => <Section key={c.kind} title={c.title} href={presencePath(locale, { kind: c.kind })} locale={locale}><Collection items={c.items.slice(0, 3)} routeKind={c.kind} locale={locale} empty={c.empty} /></Section>)}
      {data.projects.length ? <Section title={t.gallery} locale={locale}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.projects.map((item) => <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white" key={item.id}>{item.cover_image_url ? <img src={item.cover_image_url} loading="lazy" alt={pick(item, locale, 'title')} className="h-48 w-full object-cover" /> : null}<figcaption className="p-4"><strong>{pick(item, locale, 'title')}</strong><p className="text-sm leading-7 text-slate-600">{pick(item, locale, 'description')}</p></figcaption></figure>)}</div></Section> : null}
      {data.faqs.length ? <Section title={t.faq} locale={locale}><div className="space-y-3">{data.faqs.map((faq) => <details key={faq.id} className="group rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-bold text-[#122A49]">{pick(faq, locale, 'question')}</summary><p className="pt-3 leading-8 text-slate-600">{pick(faq, locale, 'answer')}</p></details>)}</div></Section> : null}
    </> : route.slug ? <>
      <Section title={currentName} locale={locale}>
        <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
          {detail?.image ? <img src={detail.image} alt={currentName} className="max-h-96 w-full object-cover" /> : null}
          <div className="p-6 sm:p-9"><p className="whitespace-pre-line text-base leading-9 text-slate-700">{pick(detail, locale, 'description') || (route.kind === 'service-areas' ? t.offeredInArea : t.inquiry)}</p>
            {route.kind === 'service-areas' ? <><p className="mt-4 text-sm text-slate-600">{t.offeredInArea}</p><div className="mt-7"><Collection items={data.services} routeKind="services" locale={locale} empty={t.emptyServices} /></div></> : null}
            <p className="mt-6 text-sm text-slate-600">{t.inquiry}</p>
            {wa ? <a className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D4AD63] px-5 py-3 font-bold text-[#152E4A]" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />{t.whatsapp}</a> : null}
          </div>
        </article>
      </Section>
    </> : <Section title={categories.find((c) => c.kind === route.kind)?.title} locale={locale}><Collection items={categories.find((c) => c.kind === route.kind)?.items || []} routeKind={route.kind} locale={locale} empty={categories.find((c) => c.kind === route.kind)?.empty} /></Section>}

    <footer className="mt-14 border-t border-[#D5DBE5] bg-white py-9"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-slate-600"><Link href={presencePath(locale)} className="font-bold text-[#122A49]">{name}</Link><span>{t.quote}</span><Link href="/" className="font-semibold text-[#997329]">بيت الريف · Biet Al Reef</Link></div></footer>
  </div>;
}
