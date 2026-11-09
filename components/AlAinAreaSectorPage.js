import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import UaeDirectoryHero from './UaeDirectoryHero';
import GeographicServiceCards from './GeographicServiceCards';
import GeographicOfferCards from './GeographicOfferCards';
import SectorVisualGuide from './SectorVisualGuide';
import SectorTaxonomyExplorer from './SectorTaxonomyExplorer';
import {getEmirate,getServiceCategory} from '../data/siteTaxonomy';
import {UAE_SECTOR_ASSETS} from '../data/uaeDirectoryVisuals';

export default function AlAinAreaSectorPage({model}){
 const {locale,area,sector,sectorSlug,localText,cards,offers,seo,sectorTaxonomy}=model;
 const en=locale==='en',prefix=en?'/en':'',place=en?area.nameEn:area.nameAr;
 const root=`${prefix}/uae/abu-dhabi/al-ain/${area.slug}`;
 const path=`${root}/${sectorSlug}`;
 const image=UAE_SECTOR_ASSETS[sector.slug]?.desktop;
 return <><SEOHead title={seo.title} description={seo.description} canonicalPath={path} noIndex={!localText && !sectorTaxonomy?.length} noIndexFollow ogImage={image?`https://bietalreef.ae${image}`:undefined}/>
  <div lang={locale} dir={en?'ltr':'rtl'} className="min-h-screen bg-[#fdfbf7]"><Navbar locale={locale}/><main>
   <nav className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-600" aria-label={en?'Breadcrumb':'مسار التصفح'}><Link href={`${prefix}/uae`}>{en?'UAE directory':'دليل الإمارات'}</Link>{' / '}<Link href={`${prefix}/uae/abu-dhabi/al-ain`}>{en?'Al Ain':'العين'}</Link>{' / '}<Link href={root}>{place}</Link>{' / '}<span>{sector.name[locale]}</span></nav>
   <UaeDirectoryHero locale={locale} title={seo.heading} description={seo.description} image={image} emirate={getEmirate('abu-dhabi')} area={area} service={getServiceCategory(sector.slug)} cleanNavigation/>
   <GeographicServiceCards items={cards} locale={locale} place={place}/>
   <SectorTaxonomyExplorer sector={sector.slug} items={sectorTaxonomy} locale={locale} place={place} pagePath={path}/>
   <GeographicOfferCards items={offers} locale={locale} place={place}/>
   <SectorVisualGuide sector={sector.slug} locale={locale} excludeSpecialties={sectorTaxonomy}/>
   {localText&&<section className="mx-auto max-w-6xl px-4 py-8"><h2 className="text-xl font-bold text-[#193b53]">{en?`Planning your request in ${place}`:`جهّز طلبك في ${place}`}</h2><p className="mt-3 leading-8 text-slate-700">{localText}</p></section>}
  </main><Footer locale={locale} showRequestCTA={false}/></div></>;
}
