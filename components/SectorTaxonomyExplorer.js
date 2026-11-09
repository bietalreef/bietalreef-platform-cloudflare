import { useEffect, useState } from 'react';
import Head from 'next/head';
import {directoryServiceTitle,directoryServiceCopy} from '../lib/directoryServiceEditorial';
import Link from 'next/link';
import {Layers3,ChevronDown} from 'lucide-react';
import visualData from '../data/sectorGuideVisuals.json';
import constructionGuides from '../data/abuDhabiConstructionServiceGuides.json';
import DirectorySectorQuoteForm from './DirectorySectorQuoteForm';

// Visual associations only: names and service membership remain in Taxonomy.
const images={
  'general-construction':'uae-villa-construction','renovation-restoration':'uae-building-renovation','demolition-concrete':'uae-concrete-works','garden-design':'uae-villa-landscaping','irrigation-systems':'uae-drip-irrigation','shades-outdoor':'uae-carports-pergolas',
  'architectural-design':'uae-architectural-design','structural-design':'uae-structural-engineering','engineering-supervision':'uae-engineering-supervision','residential-interior-design':'uae-interior-design-materials',
  'villa-building-maintenance':'uae-home-general-maintenance','integrated-finishing':'uae-integrated-finishing','gypsum-decor':'uae-gypsum-ceiling-finishing','flooring-cladding':'uae-flooring-tiling','electrical-installations':'uae-electrical-maintenance','sanitary-installations':'uae-water-leak-detection','ac-installation':'uae-ac-maintenance','smart-homes':'uae-smart-home-systems','interior-exterior-painting':'uae-villa-wall-painting','water-thermal-insulation':'uae-waterproofing-insulation',
  'basic-building-materials':'uae-building-finishing-materials-supply','wood-boards':'uae-timber-mdf-plywood-supply','natural-marble-granite':'uae-marble-granite-slabs','kitchen-countertops-sinks':'uae-kitchen-countertop-fabrication','ceramic-porcelain':'uae-ceramic-porcelain-tiles',
  'custom-kitchens-wardrobes':'uae-custom-kitchens-wardrobes','furniture-wood-decor':'uae-custom-wood-furniture-cnc','aluminium-doors-windows':'uae-aluminium-doors-windows','glass-facades':'uae-architectural-glass-facades','blacksmith-metal-workshops':'uae-metal-fabrication-workshop',
  'homes-buildings-cleaning':'uae-villa-deep-cleaning','steam-upholstery-cleaning':'uae-majlis-upholstery-cleaning','facades-sites-cleaning':'uae-building-facade-cleaning','water-tank-pool-cleaning':'uae-pool-cleaning-service','pest-rodent-control':'uae-pest-control-inspection','sanitisation-disinfection':'uae-office-surface-disinfection','building-operations-maintenance':'uae-building-facilities-inspection','labor-operations':'uae-service-team-briefing',
};
export function sectorSpecialtyImageName(slug){return images[slug]||null;}

function normalizeServiceName(value) {
  return String(value || '').normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/[.،؟!?]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

export default function SectorTaxonomyExplorer({sector,items,locale='ar',place='',pagePath='',reviewedServiceGuides={},serviceGuides=null,quotePlacement='inline',onServiceRequest=null}) {
  const en=locale==='en',normalized={'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental'}[sector]||sector;
  const assets=visualData[normalized]?.items||[];
  const [requestedServices, setRequestedServices] = useState('');
  const [expandedSpecialty, setExpandedSpecialty] = useState(null);
  // SEO deep links to a service also open its parent specialty on hydration.
  useEffect(()=>{
    const hash=window.location.hash.slice(1);
    if(!hash.startsWith('service-')||!Array.isArray(items))return;
    const group=items.find(entry=>(entry.services||[]).some(service=>'service-'+entry.slug+'-'+service.slug===hash));
    if(group)setExpandedSpecialty(group.slug);
  },[items]);
  // Move the viewport to the full-width reading panel once it has opened.
  useEffect(()=>{
    if(!expandedSpecialty)return;
    const frame=requestAnimationFrame(()=>{
      document.getElementById('specialty-services-'+expandedSpecialty)?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    return ()=>cancelAnimationFrame(frame);
  },[expandedSpecialty]);
  if(items===undefined)return null;
  const serviceList=(items||[]).flatMap(group=>group.services.map(service=>({name:directoryServiceTitle(normalized,service.name,place,locale),url:'https://bietalreef.ae'+pagePath+'#service-'+group.slug+'-'+service.slug})));
  const serviceSchema=pagePath && serviceList.length ? {'@context':'https://schema.org','@type':'ItemList',itemListElement:serviceList.map((service,index)=>({'@type':'ListItem',position:index+1,...service}))}:null;
  // Each pair remains visually compact; its detail panel is a full-width sibling below the row.
  const specialtyRows=Array.isArray(items)?Array.from({length:Math.ceil(items.length/2)},(_,index)=>items.slice(index*2,index*2+2)):[];
  return <><Head>{serviceSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema).replace(/</g,'\\u003c')}}/>}</Head><section id="sector-specialties" className="mx-auto w-full max-w-6xl scroll-mt-40 px-3 py-8 md:px-4 md:py-10" aria-labelledby="sector-specialties-title">
    <h2 id="sector-specialties-title" className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en?`Specialties and services in ${place}`:`التخصصات والخدمات في ${place}`}</h2>
    <p className="mb-5 mt-2 text-sm leading-7 text-slate-600">{en?'Review each service scope and prepare a quotation enquiry with Biet Al Reef customer support, even where no company is listed. Images are illustrative.':'تعرّف على نطاق كل خدمة وتفاصيلها، وجهّز طلب عرض سعر لخدمة عملاء بيت الريف حتى إن لم تُنشر شركة في المنطقة. الصور توضيحية.'}</p>
    {items===null?<p role="status">{en?'The specialty list is temporarily unavailable.':'تعذر تحميل التخصصات مؤقتًا.'}</p>:!items.length?<p>{en?'No selectable specialties are available for this sector yet.':'لا توجد تخصصات متاحة للاختيار في هذا القطاع حاليًا.'}</p>:<div className="space-y-4">
      {specialtyRows.map((row,rowIndex)=><div key={'row-'+rowIndex}>
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
          {row.map(item=>{
            const image=assets.find(asset=>asset.desktop.endsWith('/'+images[item.slug]+'.webp'));
            const intro=(item.description||'').trim();
            const expanded=expandedSpecialty===item.slug;
            return <article key={item.id} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {image?<picture className="block aspect-[3/2] overflow-hidden bg-slate-100 sm:aspect-[2/1]">{image.mobile&&<source media="(max-width:700px)" srcSet={image.mobile}/>}<img src={image.desktop} alt={image.alt[locale]+' — '+item.name+(en?' in ':' في ')+place} loading="lazy" decoding="async" width="1200" height="600" className="h-full w-full object-cover"/></picture>:<div className="flex h-16 items-center bg-slate-50 px-4 text-[#193b53]"><Layers3 aria-hidden="true"/></div>}
              <div className="min-w-0 p-3 sm:p-4">
                <h3 className="text-sm font-extrabold leading-6 text-[#193b53] sm:text-lg">{item.name}</h3>
                {intro?<p className="mt-1.5 line-clamp-2 text-xs leading-6 text-slate-600 sm:text-sm">{intro}</p>:null}
                <button type="button" aria-expanded={expanded} aria-controls={'specialty-services-'+item.slug} onClick={()=>setExpandedSpecialty(current=>current===item.slug?null:item.slug)} className="mt-3 flex min-h-10 w-full cursor-pointer items-center justify-between gap-1 rounded-lg border border-[#d8e4ed] bg-[#f6fafd] px-2 py-1.5 text-xs font-bold text-[#185b87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 sm:text-sm">
                  <span>{en?'Explore services':'استعرض الخدمات'}</span>
                  <ChevronDown className={'h-4 w-4 shrink-0 transition-transform '+(expanded?'rotate-180':'')} aria-hidden="true"/>
                </button>
              </div>
            </article>;
          })}
        </div>
        {row.map(item=>{
          // Render every approved service in the original server HTML, including closed
          // panels. Only its visibility changes on interaction, so Google gets the text.
          const editorial=serviceGuides?.sector===normalized
            ? serviceGuides.specialties.find(group=>group.slug===item.slug)
            : normalized==='general-contracting'?constructionGuides.specialties.find(group=>group.slug===item.slug):null;
          const expanded=expandedSpecialty===item.slug;
          return <section key={'services-'+item.slug} id={'specialty-services-'+item.slug} hidden={!expanded} aria-label={(en?'Services: ':'خدمات: ')+item.name} className="mt-3 w-full scroll-mt-36 rounded-2xl border border-[#d8e4ed] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold leading-7 text-[#193b53] sm:text-2xl">{item.name} — {en?'Services':'الخدمات'}</h3>
              <button type="button" onClick={()=>setExpandedSpecialty(null)} className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#185b87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500">{en?'Close':'إغلاق'}</button>
            </div>
            <ol className="space-y-4" aria-label={en?'Services in '+place:'الخدمات في '+place}>
              {item.services.map(service=>{
                const guide=editorial?.services.find(entry=>normalizeServiceName(entry[en?'nameEn':'nameAr'])===normalizeServiceName(service.name));
                const localGuide=reviewedServiceGuides[normalizeServiceName(service.name)];
                const serviceTitle=directoryServiceTitle(normalized,service.name,place,locale);
                return <li key={service.id||service.slug} id={'service-'+item.slug+'-'+service.slug} className="scroll-mt-32 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h2 className="text-base font-extrabold leading-7 text-[#193b53] sm:text-xl">{serviceTitle}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-700 sm:leading-8">{directoryServiceCopy({sector:normalized,name:service.name,place,locale,guide:localGuide||(en?guide?.bodyEn:guide?.bodyAr),description:service.description})}</p>
                  {service.href?<p className="mt-2"><Link className="text-sm font-semibold text-[#185b87] underline underline-offset-2" href={service.href}>{en?'View published companies for this service':'استعرض الشركات المنشورة لهذه الخدمة'}</Link></p>:null}
                  <a href="#directory-quote" onClick={()=>{const key=item.slug+':'+(service.slug||service.id||service.name);setRequestedServices(key);onServiceRequest?.(key);}} className="mt-2 inline-flex min-h-9 items-center text-sm font-bold text-[#185b87] underline underline-offset-2">{en?'Request a quotation for '+service.name:'اطلب عرض سعر لخدمة '+service.name}</a>
                </li>;
              })}
            </ol>
          </section>;
        })}
      </div>)}
    </div>}
    {quotePlacement!=='external' && items?.length ? <DirectorySectorQuoteForm locale={locale} place={place} groups={items} requestedService={requestedServices} pagePath={pagePath}/> : null}
  </section></>;
}
