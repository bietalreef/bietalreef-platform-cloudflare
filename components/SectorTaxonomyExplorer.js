import Link from 'next/link';
import {Layers3} from 'lucide-react';
import visualData from '../data/sectorGuideVisuals.json';

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

export default function SectorTaxonomyExplorer({sector,items,locale='ar',place=''}) {
  const en=locale==='en',normalized={'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental'}[sector]||sector;
  const assets=visualData[normalized]?.items||[];
  if(items===undefined)return null;
  return <section id="sector-specialties" className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10" aria-labelledby="sector-specialties-title">
    <h2 id="sector-specialties-title" className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en?`Specialties and services in ${place}`:`التخصصات والخدمات في ${place}`}</h2>
    <p className="mb-5 mt-2 text-sm leading-7 text-slate-600">{en?'Explore the directory’s specialties and their services. Availability and coverage are confirmed with each listed business. Images are illustrative.':'تعرّف على تخصصات القطاع وخدماتها في الدليل، وتأكد من التوفر وتغطية منطقتك مع الشركة المنشورة. الصور توضيحية.'}</p>
    {items===null?<p role="status">{en?'The specialty list is temporarily unavailable.':'تعذر تحميل التخصصات مؤقتًا.'}</p>:!items.length?<p>{en?'No selectable specialties are available for this sector yet.':'لا توجد تخصصات متاحة للاختيار في هذا القطاع حاليًا.'}</p>:<div className="grid gap-4 md:grid-cols-2">
      {items.map(item=>{const image=assets.find(asset=>asset.desktop.endsWith('/'+images[item.slug]+'.webp'));
        const intro=item.description|| (en?`Services include ${item.services.slice(0,3).map(service=>service.name).join(', ')}.`:`من خدمات هذا التخصص: ${item.services.slice(0,3).map(service=>service.name).join('، ')}.`);
        return <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {image?<picture className="block aspect-[2/1] overflow-hidden bg-slate-100">{image.mobile&&<source media="(max-width:700px)" srcSet={image.mobile}/>}<img src={image.desktop} alt={image.alt[locale]} loading="lazy" decoding="async" width="1200" height="600" className="h-full w-full object-cover"/></picture>:<div className="flex h-16 items-center bg-slate-50 px-4 text-[#193b53]"><Layers3 aria-hidden="true"/></div>}
          <div className="p-4"><h3 className="text-lg font-bold text-[#193b53]">{item.name}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{intro}</p>
            <details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-[#185b87]">{en?`View ${item.services.length} services`:`عرض ${item.services.length} خدمات`}</summary><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">{item.services.map(service=><li key={service.id}>{service.href?<Link className="font-semibold text-[#185b87] underline underline-offset-2" href={service.href}>{service.name}</Link>:service.name}{service.description?<p className="text-xs text-slate-500">{service.description}</p>:null}</li>)}</ul></details>
          </div>
        </article>})}
    </div>}
  </section>;
}
