import { useEffect, useRef } from 'react';
import { CONSENT_EVENT, analyticsConsent } from './PrivacyConsentCenter';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { localPath } from '../lib/localServices';
import { trackPublicEvent } from '../lib/publicAnalytics';

export default function AlAinContentPage({ model }) {
  const { locale, content, providers, category, service } = model;
  const en = locale === 'en';
  const label = value => value[locale];
  const path = model.canonical.replace('https://bietalreef.ae', '');
  const recorded = useRef('');
  useEffect(() => {
    const record = () => {
      if (analyticsConsent() !== 'accepted' || recorded.current === path) return;
      recorded.current = path;
      void trackPublicEvent('page_view', { metadata: { local_event: service ? 'city_service_view' : 'area_page_view', locale, source_page: path, city: 'al-ain', category, service: service || '' } });
    };
    record();
    window.addEventListener(CONSENT_EVENT, record);
    return () => window.removeEventListener(CONSENT_EVENT, record);
  }, [path, locale, category, service]);
  const action = 'inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#0F3F1A] px-5 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
  const outline = 'inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#D8C8AA] bg-white px-5 py-3 font-bold text-[#0F3F1A]';
  const track = (event, provider) => void trackPublicEvent('click', { metadata: { local_event: event, locale, source_page: path, city: 'al-ain', category, service: service || '', provider_id: provider.id, provider_slug: provider.slug } });
  const quote = provider => `${en ? '/en' : ''}/request-quote?${new URLSearchParams({ city: 'al-ain', category, ...(service ? { service } : {}), ...(provider ? { provider: provider.slug } : {}) })}`;
  return <>
    <SEOHead title={model.title} description={model.description} canonicalPath={path} alternatePath={model.alternates.en.replace('https://bietalreef.ae', '')} noIndex={!model.indexable} noIndexFollow structuredData={model.schema} breadcrumbs={model.breadcrumbs} />
    <div dir={en ? 'ltr' : 'rtl'} lang={locale} className="min-h-screen bg-[#F8FBFA] text-[#1D2E22]">
      <Navbar locale={locale} />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <nav aria-label={en ? 'Breadcrumbs' : 'مسار التصفح'} className="flex flex-wrap gap-3 text-sm">{model.breadcrumbs.map(item => <Link href={item.href} key={item.href}>{item.name}</Link>)}</nav>
        <section className="grid overflow-hidden rounded-3xl border border-[#E6DCC8] bg-white md:grid-cols-2">
          <div className="p-6 md:p-10"><p className="font-bold text-[#0F3F1A]">{en ? 'Biet Alreef · Al Ain' : 'بيت الريف · العين'}</p><h1 className="mt-4 text-3xl font-black leading-relaxed">{model.title.split(' | ')[0]}</h1><p className="mt-4 leading-8">{label(content.intro)}</p><div className="mt-6 flex flex-wrap gap-3"><a className={action} href="#companies">{en ? 'View companies' : 'عرض الشركات'}</a><a className={outline} href="#quote-details">{en ? 'Prepare a quote request' : 'جهز طلب عرض السعر'}</a></div></div>
          <div className="relative min-h-[240px]"><Image src={content.image} alt={en ? 'Service illustration' : 'صورة توضيحية للخدمة'} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority /></div>
        </section>
        <nav aria-label={en ? 'Al Ain service sectors' : 'قطاعات خدمات العين'} className="flex flex-wrap gap-3">{model.sectorLinks.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined} className={path === item.href ? action : outline}>{item.name}</Link>)}</nav>
        {category === 'cleaning-services' && !service && <section className="rounded-3xl bg-[#EAF5FA] p-6"><h2 className="text-2xl font-bold">{en ? 'Home and villa cleaning' : 'تنظيف المنازل والفلل'}</h2><p className="my-4 leading-8">{en ? 'Review the scope and information needed for a home or villa cleaning quotation.' : 'راجع نطاق التنظيف والمعلومات اللازمة لطلب عرض سعر لمنزل أو فيلا.'}</p><Link className={action} href={localPath({ locale, category, service: 'home-villa-cleaning' })}>{en ? 'View service details' : 'تفاصيل الخدمة'}</Link></section>}
        <div className="grid gap-5 md:grid-cols-2">{content.sections.map(section => <section key={section.title.en} className="rounded-3xl border border-[#E6DCC8] bg-white p-6"><h2 className="text-2xl font-bold">{label(section.title)}</h2><p className="mt-4 leading-8">{label(section.body)}</p></section>)}</div>
        <section id="companies" className="scroll-mt-24"><h2 className="text-2xl font-bold">{en ? 'Companies serving Al Ain' : 'شركات تخدم العين'}</h2>
          {!providers.length && <div className="mt-4 rounded-3xl border border-[#D8C8AA] bg-white p-6"><p className="leading-8">{en ? 'No eligible company is published in this section yet. You can prepare your requirements below; service availability needs company confirmation.' : 'لا توجد شركة مؤهلة منشورة في هذا القسم حاليًا. يمكنك تجهيز متطلباتك أدناه؛ توفر الخدمة يحتاج تأكيد الشركة.'}</p></div>}
          <div className="mt-5 grid gap-5 md:grid-cols-2">{providers.map(provider => {
            const profile = `${en ? '/en' : ''}/providers/${provider.slug}`;
            return <article className="rounded-3xl border border-[#E6DCC8] bg-white p-6" key={provider.id}>
              <div className="flex items-center gap-4"><Image src={provider.image} alt={provider.name[locale]} width={64} height={64} /><h3 className="text-xl font-bold"><Link href={profile}>{provider.name[locale]}</Link></h3></div>
              <p className="mt-4">{en ? 'Service coverage: Al Ain. Confirm your district and appointment.' : 'نطاق الخدمة: العين. أكد منطقتك والموعد مع الشركة.'}</p>
              <div className="mt-5 flex flex-wrap gap-3"><Link className={action} href={profile} onClick={() => track('provider_view_from_service', provider)}>{en ? 'Visit profile' : 'زيارة الملف'}</Link>
                {provider.phone && <a className={outline} href={`tel:${provider.phone}`} onClick={() => track('phone_click', provider)}>{en ? 'Call' : 'اتصال'}</a>}
                {provider.whatsapp && <a className={outline} href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`${en ? 'Quote request: ' : 'طلب عرض سعر: '}${label(content.name)} ${en ? 'in Al Ain' : 'في العين'}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', provider)}>{en ? 'WhatsApp' : 'واتساب'}</a>}
                <Link className={outline} href={quote(provider)} onClick={() => track('request_quote', provider)}>{en ? 'Request a quote' : 'طلب عرض سعر'}</Link>
              </div>
              <ul className="mt-5 space-y-4">{provider.services.filter(item => item.category === category && (!service || item.slug === service)).map(item => <li key={item.id} className="rounded-xl bg-[#F8FBFA] p-4"><h4 className="font-bold">{item.title[locale]}</h4><p className="mt-2 leading-7">{item.summary[locale]}</p></li>)}</ul>
            </article>;
          })}</div>
        </section>
        <section id="quote-details" className="scroll-mt-24 rounded-3xl border border-[#D8C8AA] bg-white p-6 md:p-8"><h2 className="text-2xl font-bold">{en ? 'What to send for a useful quotation' : 'ماذا ترسل للحصول على عرض سعر واضح؟'}</h2><ul className="mt-5 list-inside list-disc space-y-3">{label(content.checklist).map(item => <li key={item}>{item}</li>)}</ul><h3 className="mt-6 text-xl font-bold">{en ? 'How is the cost determined?' : 'كيف تتحدد التكلفة؟'}</h3><p className="mt-3 leading-8">{label(content.pricing)}</p>{providers.length > 0 && <a className={`${action} mt-5`} href="#companies">{en ? 'Choose a company to contact' : 'اختر شركة للتواصل'}</a>}</section>
        <section><h2 className="text-2xl font-bold">{en ? 'Before you decide' : 'قبل اتخاذ القرار'}</h2><div className="mt-4 space-y-4">{content.faq.map(item => <details className="rounded-2xl border border-[#E6DCC8] bg-white p-5" key={item.q.en}><summary className="min-h-[44px] cursor-pointer font-bold">{label(item.q)}</summary><p className="mt-3 leading-8">{label(item.a)}</p></details>)}</div></section>
        {model.relatedServices?.length > 0 && <section><h2 className="text-2xl font-bold">{en ? 'More cleaning services' : 'خدمات تنظيف أخرى'}</h2><div className="mt-4 flex flex-wrap gap-3">{model.relatedServices.map(item => <Link className={outline} href={item.path} key={item.slug}>{item.name[locale]}</Link>)}</div></section>}
        <p className="text-sm">{en ? 'Guidance reviewed: ' : 'مراجعة الدليل: '}{model.contentReviewedAt}</p>
      </main><Footer showRequestCTA={false} />
    </div>
  </>;
}
