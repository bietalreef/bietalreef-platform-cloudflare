import Link from 'next/link';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import ServiceQuoteForm from './ServiceQuoteForm';
import GeographicServiceCards from './GeographicServiceCards';
import GeographicOfferCards from './GeographicOfferCards';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import { PROVIDER_SECTOR_EDITORIAL } from '../data/providerSectorEditorial';
import { cleaningContent } from '../lib/cleaningLandingContent';

export default function GeographicServicePage({ item }) {
  const en = item.locale === 'en';
  const sector = UAE_MAIN_SECTORS.find(row => row.slug === item.sector)
    || UAE_MAIN_SECTORS.find(row => row.slug === 'aluminium-glass' && item.sector === 'aluminium-wood-glass')
    || UAE_MAIN_SECTORS.find(row => row.slug === 'equipment-rental' && item.sector === 'factories-suppliers');
  const prefix = en ? '/en' : '';
  const emirateSlug = item.emirate || 'abu-dhabi';
  const emirateName = emirateSlug === 'dubai' ? (en?'Dubai':'دبي') : (en?'Abu Dhabi':'أبوظبي');
  const place = item.placeName || (item.city ? (en ? 'Al Ain' : 'العين') : emirateName);
  const sectorName = sector?.name?.[item.locale] || (en ? 'Services' : 'الخدمات');
  const placePath = `${prefix}/uae/${emirateSlug}${item.city ? '/al-ain' : ''}${item.area ? `/${item.area}` : ''}`;
  const sectorPath = `${placePath}/${item.sector}`;
  const title = en ? `${item.name} in ${place} | ${item.providerName} | Biet Alreef` : `${item.name} في ${place} | ${item.providerName} | بيت الريف`;
  const description = (en ? `${item.name} in ${place} from ${item.providerName}. ${item.description}` : `${item.name} في ${place} من ${item.providerName}. ${item.description}`).slice(0, 165);
  const guide = item.sector === 'cleaning-services' ? cleaningContent(item.serviceSlug, item.locale) : null;
  const editorial = PROVIDER_SECTOR_EDITORIAL[sector?.slug]?.[item.locale];
  const crumbs = [
    { name:en?'UAE directory':'دليل الإمارات', href:`${prefix}/uae` },
    { name:emirateName, href:`${prefix}/uae/${emirateSlug}` },
    ...(item.city || item.area ? [{name:place,href:placePath}] : []),
    { name:sectorName, href:sectorPath },
    { name:item.name, href:`${sectorPath}/${item.serviceSlug}` },
    { name:item.providerName, href:item.href },
  ];
  const sectorImage = UAE_SECTOR_ASSETS[sector?.slug]?.desktop;
  const imagePath = item.image || sectorImage;
  const image = imagePath?.startsWith('/') ? `https://bietalreef.ae${imagePath}` : imagePath;
  const faq = [
    ...(guide?.faq || []),
    ...(en ? [
      ['How is the quotation calculated?', 'The quotation depends on the actual work, location, condition and access. Send the details and ask the company what is included before agreeing.'],
      [`Does ${item.providerName} serve my area?`, 'The listed locations reflect the company’s recorded service coverage. Confirm the exact address, service and appointment directly with the company.'],
      ['Can I send photos with my request?', 'Yes. Open the company’s WhatsApp from the form and attach relevant photos before sending your message.'],
      ['What should I confirm before booking?', 'Confirm the work included, materials or equipment, timing, access and final quotation. Ask about any exclusions or additional work.'],
    ] : [
      ['كيف يُحدد عرض السعر؟', 'يعتمد العرض على تفاصيل العمل وحالة الموقع والمنطقة وسهولة الوصول. أرسل التفاصيل واسأل الشركة عمّا يشمله العرض قبل الاتفاق.'],
      [`هل تخدم ${item.providerName} منطقتي؟`, 'المناطق المعروضة مبنية على تغطية الشركة المسجلة. تأكد من العنوان الدقيق والخدمة والموعد مباشرة مع الشركة.'],
      ['هل أستطيع إرسال صور مع الطلب؟', 'نعم. بعد فتح واتساب الشركة من النموذج، أرفق الصور المناسبة وراجع الرسالة قبل إرسالها.'],
      ['ماذا أتأكد منه قبل الحجز؟', 'راجع الأعمال المشمولة والمواد أو المعدات والموعد وترتيبات الدخول والسعر النهائي، واسأل عن أي أعمال مستثناة أو إضافية.'],
    ]),
  ];
  const schema = [
    {'@context':'https://schema.org','@type':'Service',name:item.name,description:item.description,areaServed:{'@type':'AdministrativeArea',name:place},provider:{'@type':'LocalBusiness',name:item.providerName,url:`https://bietalreef.ae${item.providerHref}`}},
    {'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))},
  ];
  return <>
    <SEOHead title={title} description={description} canonicalPath={item.href} ogImage={image || undefined} structuredData={schema} breadcrumbs={crumbs}/>
    <div dir={en?'ltr':'rtl'} lang={item.locale} className="min-h-screen bg-[#f7f9fc] text-[#193b53]">
      <Navbar locale={item.locale}/>
      <main className="mx-auto max-w-6xl px-4 py-5 md:py-10">
        <nav className="mb-5 flex flex-wrap gap-2 text-xs text-slate-600" aria-label={en?'Breadcrumbs':'مسار التصفح'}>{crumbs.slice(0,-1).map((crumb,i)=><span key={`${crumb.href}-${i}`}><Link href={crumb.href} className="underline-offset-4 hover:underline">{crumb.name}</Link><span aria-hidden="true"> / </span></span>)}<span aria-current="page">{item.providerName}</span></nav>
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          {imagePath ? <picture className="block min-h-48 bg-slate-50 md:min-h-80">{item.imageMobile&&<source media="(max-width:700px)" srcSet={item.imageMobile}/>}<img src={imagePath} alt={item.name} width="1200" height="900" className="h-full max-h-[420px] w-full object-cover"/></picture> : <div className="flex min-h-48 items-center justify-center bg-slate-50 text-slate-400"><MapPin size={42}/></div>}
          <div className="flex flex-col items-start gap-3 p-5 md:p-8"><p className="text-sm font-bold text-[#185b87]">{sectorName} · {place}</p><h1 className="text-2xl font-black leading-snug md:text-4xl">{item.name} {en?'in':'في'} {place}</h1><Link href={item.providerHref} className="text-sm font-bold text-[#185b87] underline">{item.providerName}</Link><p className="text-sm leading-7 text-slate-600 md:text-base">{item.description}</p>{(item.imageIllustrative || !item.image)&&<small className="text-slate-500">{en?'Illustrative image':'صورة توضيحية'}</small>}
            <div className="mt-auto flex flex-wrap gap-2">{item.providerWhatsapp&&<a href="#request-quote" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#185b87] px-4 text-sm font-bold text-white">{en?'Request a quotation':'اطلب عرض سعر'}</a>}{item.providerPhone&&<a className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#a8c8dd] px-4 text-sm font-bold text-[#185b87]" href={`tel:${item.providerPhone.replace(/[^0-9+]/g,'')}`}><Phone size={16}/>{en?'Call':'اتصل الآن'}</a>}{item.providerWhatsapp&&<a className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#a8c8dd] px-4 text-sm font-bold text-[#185b87]" href={item.providerWhatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>{en?'WhatsApp':'واتساب'}</a>}</div>
          </div>
        </div>
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 md:p-8"><h2 className="text-xl font-bold">{en?'About this service':'عن الخدمة'}</h2><p className="mt-3 leading-8 text-slate-700">{guide?.intro || item.description}</p>
          {guide?.scope?.length>0&&<><h2 className="mt-6 text-xl font-bold">{en?'Discuss the scope':'نطاق العمل'}</h2><ul className="mt-3 list-inside list-disc space-y-2 leading-7 text-slate-700">{guide.scope.map(line=><li key={line}>{line}</li>)}</ul></>}
          {guide?.prepare?.length>0&&<><h2 className="mt-6 text-xl font-bold">{en?'What to prepare for your quotation':'ما الذي تجهزه لطلب السعر؟'}</h2><ul className="mt-3 list-inside list-disc space-y-2 leading-7 text-slate-700">{guide.prepare.map(line=><li key={line}>{line}</li>)}</ul></>}
          {!guide&&editorial?.sections?.slice(0,2).map(([heading,body])=><div key={heading}><h3 className="mt-6 text-lg font-bold">{heading}</h3><p className="mt-2 leading-8 text-slate-700">{body}</p></div>)}
          <p className="mt-5 text-sm leading-7 text-slate-600">{en?'The company confirms availability, work scope and the final quotation after reviewing your request.':'تؤكد الشركة التوفر ونطاق العمل وعرض السعر النهائي بعد مراجعة طلبك.'}</p>
        </section>
        <ServiceQuoteForm item={item}/>
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 md:p-8" aria-labelledby="service-faq"><h2 id="service-faq" className="text-xl font-extrabold">{en?'Frequently asked questions':'الأسئلة الشائعة'}</h2><div className="mt-4 divide-y divide-slate-200">{faq.map(([question,answer])=><details key={question} className="py-4"><summary className="cursor-pointer font-bold leading-7">{question}</summary><p className="mt-2 leading-7 text-slate-700">{answer}</p></details>)}</div></section>
        {!!item.relatedServices?.length&&<GeographicServiceCards id="related-services" items={item.relatedServices} locale={item.locale} place={place} title={en?`More services from ${item.providerName}`:`خدمات أخرى من ${item.providerName}`}/>}
        {!!item.otherProviders?.length&&<GeographicServiceCards id="other-providers" items={item.otherProviders} locale={item.locale} place={place} title={en?'Other companies offering this service':'شركات أخرى تقدم الخدمة'}/>}
        <GeographicOfferCards id="other-company-offers" items={item.otherOffers} locale={item.locale} place={place} title={en?'Offers from other companies':'عروض من شركات أخرى'}/>
        {!!item.coverage?.length&&<nav className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 md:p-8" aria-label={en?'Service locations':'مناطق الخدمة'}><h2 className="text-xl font-extrabold">{en?'Explore this service by area':'استكشف الخدمة حسب المنطقة'}</h2><p className="mt-2 text-sm leading-7 text-slate-600">{en?'Based on the company’s registered coverage. Confirm availability for your address.':'بحسب نطاق تغطية الشركة المسجل؛ يرجى تأكيد التوفر لعنوانك.'}</p><div className="mt-4 flex flex-wrap gap-2">{item.coverage.map(location=><Link key={location.href} href={location.href} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#185b87]">{location.name}</Link>)}</div></nav>}
        <nav className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-[#185b87]" aria-label={en?'Related directory links':'روابط الدليل'}><Link href={sectorPath}>{en?'All services in this sector':'كل خدمات القطاع'}</Link><Link href={placePath}>{en?'Explore this area':'دليل المنطقة'}</Link><Link href={item.providerHref}>{en?'Company profile':'ملف الشركة'}</Link></nav>
      </main><Footer locale={item.locale} showRequestCTA={false} hideEmirateContext={!!item.coverage?.length}/>
    </div>
  </>;
}
