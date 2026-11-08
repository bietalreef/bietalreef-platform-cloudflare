import visualData from '../data/sectorGuideVisuals.json';
import { PROVIDER_SECTOR_EDITORIAL } from '../data/providerSectorEditorial';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';
import {sectorSpecialtyImageName} from './SectorTaxonomyExplorer';

function VisualGrid({ items, locale }) {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{items.map(image => <figure key={image.desktop} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <picture className="block aspect-[4/3] overflow-hidden bg-slate-100">{image.mobile&&<source media="(max-width: 700px)" srcSet={image.mobile}/>}<img src={image.desktop} alt={image.alt[locale]} loading="lazy" decoding="async" width="1200" height="900" className="h-full w-full object-cover"/></picture>
    <figcaption className="px-3 py-3 text-sm font-bold leading-6 text-[#193b53]">{image.title[locale]}</figcaption>
  </figure>)}</div>;
}

export default function SectorVisualGuide({sector,locale='ar',showEditorial=false,excludeSpecialties=[]}) {
  const normalized = {'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental'}[sector] || sector;
  const en=locale==='en', guide=showEditorial?PROVIDER_SECTOR_EDITORIAL[normalized]?.[locale]:null;
  const fallback=UAE_SECTOR_ASSETS[normalized];
  const excluded=new Set((excludeSpecialties||[]).map(item=>sectorSpecialtyImageName(item.slug)).filter(Boolean));
  const images=(visualData[normalized]?.items || (fallback ? [{desktop:fallback.desktop,mobile:fallback.small,title:{ar:'صورة القطاع',en:'Sector illustration'},alt:fallback.alt}] : [])).filter(image=>!excluded.has(image.desktop.split('/').pop().replace(/\.webp$/,'')));
  if (!images.length && !guide) return null;
  return <section id="sector-guide" className="mx-auto w-full max-w-6xl px-4 py-8" aria-labelledby="sector-visual-guide-title">
    <h2 id="sector-visual-guide-title" className="text-xl font-extrabold text-[#193b53] md:text-3xl">{en?'Explore the sector':'تعرّف على مجالات القطاع'}</h2>
    {images.length>0&&<p className="mb-5 mt-2 text-sm leading-7 text-slate-600">{en?'Illustrative scenes help explain the work; they are not photos of a listed company or a specific local project.':'صور توضيحية لمجالات العمل، وليست صورًا لشركة منشورة أو مشروع في موقع محدد.'}</p>}
    {images.length>0&&<VisualGrid items={images.slice(0,4)} locale={locale}/>}
    {images.length>4&&<details className="mt-4"><summary className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#185b87]">{en?'See more sector topics':'عرض مزيد من مجالات القطاع'}</summary><div className="mt-4"><VisualGrid items={images.slice(4)} locale={locale}/></div></details>}
    {showEditorial&&guide&&<details className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer text-lg font-bold text-[#193b53]">{en?'How to prepare and compare a request':'دليل اختيار الخدمة ومقارنة العروض'}</summary><p className="mt-4 leading-8 text-slate-700">{guide.intro}</p>{guide.sections.map(([heading,body])=><div key={heading}><h3 className="mt-5 font-extrabold text-[#193b53]">{heading}</h3><p className="mt-2 leading-8 text-slate-700">{body}</p></div>)}</details>}
  </section>;
}
