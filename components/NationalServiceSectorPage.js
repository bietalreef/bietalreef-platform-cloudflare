import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, FileText, MapPin, MessageCircle } from 'lucide-react';
import SEOHead from './SEOHead';
import Navbar from './Navbar';
import Footer from './Footer';
import EnglishLayout from './EnglishLayout';
import ServicesSmartFooter from './ServicesSmartFooter';
import SectorTaxonomyExplorer from './SectorTaxonomyExplorer';
import NationalDirectoryReading from './NationalDirectoryReading';
import DirectorySectorQuoteForm from './DirectorySectorQuoteForm';
import PublishedEntityGrid from './PublishedEntityGrid';
import PublishedOfferGrid from './PublishedOfferGrid';
import {UAE_EMIRATES} from '../data/siteTaxonomy';
import {UAE_SECTOR_ASSETS} from '../data/uaeDirectoryVisuals';
import {nationalSectorEditorial} from '../data/nationalSectorEditorial';

function TechnicalGuidesFallback({content,locale}) {
  const en=locale==='en';
  if(!content?.specialties?.length)return null;
  return <section id="sector-specialties" className="mx-auto max-w-6xl px-3 py-8 sm:px-4" aria-labelledby="fallback-specialties-title">
    <h2 id="fallback-specialties-title" className="mb-4 text-xl font-extrabold text-[#193b53] sm:text-2xl">{en?'Technical scope of the services':'النطاق الفني للخدمات'}</h2>
    <p className="mb-4 text-sm leading-7 text-slate-600">{en?'These are technical preparation notes, not claims that a company is currently available.':'هذه إرشادات فنية لتجهيز طلبك، وليست إعلانًا عن توفر شركة منشورة.'}</p>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {content.specialties.map(group=><details key={group.slug} className="self-start rounded-2xl border border-slate-200 bg-white p-4">
        <summary className="min-h-11 cursor-pointer text-base font-bold leading-7 text-[#193b53]">{group.services[0]?.[en?'nameEn':'nameAr'] || group.slug} — {en?'Explore related work':'استكشف الأعمال المرتبطة'}</summary>
        <div className="mt-3 space-y-4 border-t border-slate-100 pt-3">
          {group.services.map(service=><article key={service.nameEn} className="border-b border-slate-100 pb-3 last:border-0">
            <h3 className="font-bold leading-7 text-[#193b53]">{en?service.nameEn:service.nameAr}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-700">{en?service.bodyEn:service.bodyAr}</p>
          </article>)}
        </div>
      </details>)}
    </div>
  </section>;
}

// One national overview for each approved sector. The individual emirate pages
// retain their own local intent, canonical URLs and actual provider/service cards.
export default function NationalServiceSectorPage({
  sector,
  locale='ar',
  sectorTaxonomy=null,
  serviceGuides=null,
  publishedServices=[],
  publishedOffers=[],
  directoryCards=[],
}) {
  const [requestedService,setRequestedService]=useState('');
  const en=locale==='en';
  const editorial=nationalSectorEditorial(sector.slug,locale);
  if(!editorial)return null;
  const image=UAE_SECTOR_ASSETS[sector.slug];
  const pagePath=en?'/en/categories/'+sector.slug:'/services/'+sector.slug;
  const translationPath=en?'/services/'+sector.slug:'/en/categories/'+sector.slug;
  const fallbackGroup={slug:sector.slug,name:sector.name[locale],services:[{slug:sector.slug,name:sector.name[locale]}]};
  const localQuoteGroups=sectorTaxonomy?.length?sectorTaxonomy:[fallbackGroup];
  const schema={
    '@context':'https://schema.org',
    '@type':'CollectionPage',
    name:editorial.title,
    description:editorial.description,
    url:'https://bietalreef.ae'+pagePath,
    inLanguage:en?'en-AE':'ar-AE',
    about:{'@type':'Thing',name:sector.name[locale]},
  };

  const page=<main dir={en?'ltr':'rtl'} className="min-h-screen bg-[#faf9f6] pb-4 text-[#193b53]">
    <nav className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 text-xs text-slate-600 sm:px-4" aria-label={en?'Breadcrumb':'مسار التصفح'}>
      <Link href={en?'/en/services':'/services'} className="font-bold text-[#185b87] underline underline-offset-2">{en?'Services and offers':'الخدمات والعروض'}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="line-clamp-1">{sector.name[locale]}</span>
    </nav>

    <header className="mx-auto max-w-6xl px-3 sm:px-4">
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2 md:rounded-3xl">
        <div className="relative aspect-[16/10] min-h-52 bg-slate-100 md:order-2 md:aspect-auto md:min-h-80">
          {image?.desktop&&<Image src={image.desktop} alt={image.alt[locale]} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/>}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-3 p-5 sm:p-8 md:order-1">
          <p className="text-xs font-bold tracking-wide text-[#185b87]">{en?'UAE services and project guidance':'دليل الخدمات والمشاريع في الإمارات'}</p>
          <h1 className="text-2xl font-extrabold leading-tight text-[#193b53] sm:text-4xl">{editorial.title.split(' | ')[0]}</h1>
          <p className="text-sm leading-8 text-slate-700 sm:text-base">{editorial.intro}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <a href="#sector-specialties" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#185b87] px-4 py-2 text-sm font-bold text-white">
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true"/>{en?'Read service details':'اقرأ تفاصيل الخدمات'}
            </a>
            <a href="#directory-quote" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#185b87] px-4 py-2 text-sm font-bold text-[#185b87]">
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true"/>{en?'Request a quotation':'اطلب عرض سعر'}
            </a>
          </div>
        </div>
      </div>
    </header>

    <section className="mx-auto max-w-6xl px-3 py-7 sm:px-4" aria-labelledby="project-planning-heading">
      <h2 id="project-planning-heading" className="text-xl font-extrabold sm:text-2xl">{en?'Prepare a better project request':'جهّز طلب مشروعك بطريقة صحيحة'}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {editorial.sections.map(([heading,body])=><article key={heading} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="text-base font-extrabold leading-7 text-[#193b53]">{heading}</h3>
          <p className="mt-2 text-sm leading-8 text-slate-700">{body}</p>
        </article>)}
      </div>
    </section>

    <NationalDirectoryReading sector={sector} locale={locale}/>

    {sectorTaxonomy?.length
      ? <SectorTaxonomyExplorer sector={sector.slug} items={sectorTaxonomy} locale={locale} place={en?'the UAE':'الإمارات'} pagePath={pagePath} serviceGuides={serviceGuides} quotePlacement="external" onServiceRequest={setRequestedService}/>
      : <TechnicalGuidesFallback content={serviceGuides} locale={locale}/>}

    <PublishedEntityGrid items={publishedServices} locale={locale} type="service" />
    {sector.slug==='cleaning-services'&&<PublishedOfferGrid items={publishedOffers} locale={locale}/>}

    <section id="service-locations" className="mx-auto max-w-6xl px-3 py-8 sm:px-4" aria-labelledby="emirates-directory-heading">
      <h2 id="emirates-directory-heading" className="text-xl font-extrabold sm:text-2xl">{en?'Browse this service by emirate':'استكشف هذه الخدمات حسب الإمارة'}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{en?'Choose the actual project location to read its specific requirements and available company services.':'اختر موقع المشروع الفعلي لتقرأ متطلباته المحلية والخدمات المنشورة للشركات في تلك الإمارة.'}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {UAE_EMIRATES.map(emirate=><Link key={emirate.slug} href={(en?'/en':'')+'/uae/'+emirate.slug+'/'+sector.slug} className="group flex min-h-24 min-w-0 flex-col justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#185b87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#185b87]"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true"/>{en?'Service directory':'دليل الخدمات'}</span>
          <span className="flex items-center justify-between gap-1 text-sm font-extrabold leading-6 text-[#193b53]"><span>{en?emirate.nameEn:emirate.nameAr}</span>{en?<ArrowUpRight className="h-4 w-4 shrink-0"/>:<ArrowUpLeft className="h-4 w-4 shrink-0"/>}</span>
        </Link>)}
      </div>
    </section>

    <DirectorySectorQuoteForm locale={locale} place={en?'United Arab Emirates':'الإمارات العربية المتحدة'} groups={localQuoteGroups} requestedService={requestedService} pagePath={pagePath}/>
    <ServicesSmartFooter locale={locale} directoryCards={directoryCards}/>
  </main>;

  return <>
    <SEOHead
      title={editorial.title+(en?' | Biet Al Reef':' | بيت الريف')}
      description={editorial.description}
      canonicalPath={pagePath}
      alternatePath={en?undefined:translationPath}
      arabicPath={en?translationPath:undefined}
      ogImage={image?.desktop ? 'https://bietalreef.ae'+image.desktop : undefined}
      structuredData={schema}
      breadcrumbs={[
        {name:en?'Services and offers':'الخدمات والعروض',href:en?'/en/services':'/services'},
        {name:sector.name[locale],href:pagePath},
      ]}
    />
    {en ? <EnglishLayout>{page}</EnglishLayout> : <div dir="rtl" className="min-h-screen bg-[#faf9f6]"><Navbar pageTitle={sector.name.ar}/>{page}<Footer showRequestCTA={false}/></div>}
  </>;
}
