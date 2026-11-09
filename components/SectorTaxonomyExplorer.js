import { useState } from 'react';
import Head from 'next/head';
import {directoryServiceTitle,directoryServiceCopy} from '../lib/directoryServiceEditorial';
import Link from 'next/link';
import {Layers3} from 'lucide-react';
import visualData from '../data/sectorGuideVisuals.json';
import constructionGuides from '../data/abuDhabiConstructionServiceGuides.json';
import hiliGuides from '../data/alAinReviewedServiceGuidesHili.json';
import jimiGuides from '../data/alAinReviewedServiceGuidesJimi.json';
import muwaijiGuides from '../data/alAinReviewedServiceGuidesMuwaiji.json';
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
const districtEditorial={'al-hili':hiliGuides,'al-jimi':jimiGuides,'al-muwaiji':muwaijiGuides};

function normalizeServiceName(value) {
  return String(value || '').normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/[.،؟!?]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

export default function SectorTaxonomyExplorer({sector,items,locale='ar',place='',pagePath=''}) {
  const en=locale==='en',normalized={'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental'}[sector]||sector;
  const assets=visualData[normalized]?.items||[];
  const alAinParts=pagePath.split('/').filter(Boolean);
  const districtSlug=alAinParts[alAinParts.indexOf('al-ain')+1];
  const reviewedDistrict=alAinParts.includes('al-ain')?districtEditorial[districtSlug]:null;
  const [requestedServices, setRequestedServices] = useState({});
  if(items===undefined)return null;
  const serviceList=(items||[]).flatMap(group=>group.services.map(service=>({name:directoryServiceTitle(normalized,service.name,place,locale),url:'https://bietalreef.ae'+pagePath+'#service-'+group.slug+'-'+service.slug})));
  const serviceSchema=pagePath && serviceList.length ? {'@context':'https://schema.org','@type':'ItemList',itemListElement:serviceList.map((service,index)=>({'@type':'ListItem',position:index+1,...service}))}:null;
  return <><Head>{serviceSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema).replace(/</g,'\\u003c')}}/>}</Head><section id="sector-specialties" className="mx-auto w-full max-w-6xl scroll-mt-40 px-3 py-8 md:px-4 md:py-10" aria-labelledby="sector-specialties-title">
    <h2 id="sector-specialties-title" className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en?`Specialties and services in ${place}`:`التخصصات والخدمات في ${place}`}</h2>
    <p className="mb-5 mt-2 text-sm leading-7 text-slate-600">{en?'Explore the directory’s specialties and their services. Availability and coverage are confirmed with each listed business. Images are illustrative.':'تعرّف على تخصصات القطاع وخدماتها في الدليل، وتأكد من التوفر وتغطية منطقتك مع الشركة المنشورة. الصور توضيحية.'}</p>
    {items===null?<p role="status">{en?'The specialty list is temporarily unavailable.':'تعذر تحميل التخصصات مؤقتًا.'}</p>:!items.length?<p>{en?'No selectable specialties are available for this sector yet.':'لا توجد تخصصات متاحة للاختيار في هذا القطاع حاليًا.'}</p>:<div className="grid grid-cols-2 gap-2 sm:gap-4">
      {items.map(item=>{const image=assets.find(asset=>asset.desktop.endsWith('/'+images[item.slug]+'.webp'));
        const editorial=normalized==='general-contracting'?constructionGuides.specialties.find(group=>group.slug===item.slug):null;
        const intro=item.description|| (en?`Services include ${item.services.slice(0,3).map(service=>service.name).join(', ')}.`:`من خدمات هذا التخصص: ${item.services.slice(0,3).map(service=>service.name).join('، ')}.`);
        return <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {image?<picture className="block aspect-[2/1] overflow-hidden bg-slate-100">{image.mobile&&<source media="(max-width:700px)" srcSet={image.mobile}/>}<img src={image.desktop} alt={image.alt[locale]} loading="lazy" decoding="async" width="1200" height="600" className="h-full w-full object-cover"/></picture>:<div className="flex h-16 items-center bg-slate-50 px-4 text-[#193b53]"><Layers3 aria-hidden="true"/></div>}
          <div className="p-3 sm:p-4"><p className="text-sm font-bold leading-6 text-[#193b53] sm:text-lg">{item.name}</p><p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-600 sm:line-clamp-none sm:text-sm sm:leading-7">{intro}</p>
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-bold text-[#185b87] sm:text-sm">{en?`View ${item.services.length} services`:`عرض الخدمات (${item.services.length})`}</summary>
              <ol className="mt-3 space-y-4" aria-label={en ? 'Services in '+place : 'الخدمات في '+place}>
                {item.services.map((service,index)=>{
                  const guide=editorial?.services.find(entry=>normalizeServiceName(entry[en?'nameEn':'nameAr'])===normalizeServiceName(service.name));
                  const localGuide=reviewedDistrict?.services?.[normalized]?.[locale]?.[normalizeServiceName(service.name)];
                  const serviceTitle=directoryServiceTitle(normalized,service.name,place,locale);
                  return <li key={service.id||service.slug} id={'service-'+item.slug+'-'+service.slug} className="scroll-mt-32 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                    <h2 className="text-sm font-extrabold leading-7 text-[#193b53] sm:text-base">{serviceTitle}</h2>
                    <p className="mt-2 text-xs leading-6 text-slate-700 sm:text-sm sm:leading-7">{directoryServiceCopy({sector:normalized,name:service.name,place,locale,guide:localGuide||(en?guide?.bodyEn:guide?.bodyAr),description:service.description})}</p>
                    {service.href?<p className="mt-2"><Link className="text-xs font-semibold text-[#185b87] underline underline-offset-2" href={service.href}>{en?'View published companies for this service':'استعرض الشركات المنشورة لهذه الخدمة'}</Link></p>:null}
                    <a href={'#quote-'+item.slug} onClick={()=>setRequestedServices(previous=>({...previous,[item.slug]:service.name}))} className="mt-2 inline-block text-xs font-bold text-[#185b87] underline underline-offset-2">{en?'Request a quotation for '+service.name:'اطلب عرض سعر لخدمة '+service.name}</a>
                  </li>;
                })}
              </ol>
            </details>
            <DirectorySectorQuoteForm locale={locale} place={place} specialty={item} services={item.services} requestedService={requestedServices[item.slug]} pagePath={pagePath}/>
          </div>
        </article>})}
    </div>}
  </section></>;
}
