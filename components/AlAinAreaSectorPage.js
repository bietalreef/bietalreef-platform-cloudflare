import Link from 'next/link';
import {useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import UaeDirectoryHero from './UaeDirectoryHero';
import GeographicServiceCards from './GeographicServiceCards';
import GeographicOfferCards from './GeographicOfferCards';
import SectorVisualGuide from './SectorVisualGuide';
import SectorTaxonomyExplorer from './SectorTaxonomyExplorer';
import DirectorySectorQuoteForm from './DirectorySectorQuoteForm';
import {getEmirate,getServiceCategory} from '../data/siteTaxonomy';
import {UAE_SECTOR_ASSETS} from '../data/uaeDirectoryVisuals';

export default function AlAinAreaSectorPage({model}){
 const {locale,area,sector,sectorSlug,localText,cards,offers,seo,sectorTaxonomy,reviewedServiceGuides,sectorGuides}=model;
 const [requestedService,setRequestedService]=useState('');
 const en=locale==='en',prefix=en?'/en':'',place=en?area.nameEn:area.nameAr;
 const servicePlace=en?place+', Al Ain':place+'، العين';
 const root=`${prefix}/uae/abu-dhabi/al-ain/${area.slug}`;
 const path=`${root}/${sectorSlug}`;
 const image=UAE_SECTOR_ASSETS[sector.slug]?.desktop;
 const crumbs=[{name:en?'UAE directory':'دليل الإمارات',href:`${prefix}/uae`},{name:en?'Abu Dhabi':'أبوظبي',href:`${prefix}/uae/abu-dhabi`},{name:en?'Al Ain':'العين',href:`${prefix}/uae/abu-dhabi/al-ain`},{name:place,href:root},{name:sector.name[locale],href:path}];
 const schema={'@context':'https://schema.org','@type':'CollectionPage',name:seo.heading,url:'https://bietalreef.ae'+path,description:seo.description,inLanguage:en?'en-AE':'ar-AE'};
 return <><SEOHead title={seo.title} description={seo.description} canonicalPath={path} alternatePath={'/en/uae/abu-dhabi/al-ain/'+area.slug+'/'+sectorSlug} noIndex={!localText && !sectorTaxonomy?.length} noIndexFollow ogImage={image?`https://bietalreef.ae${image}`:undefined} structuredData={schema} breadcrumbs={crumbs}/>
  <div lang={locale} dir={en?'ltr':'rtl'} className="min-h-screen bg-[#fdfbf7]"><Navbar locale={locale}/><main>
   <nav className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-600" aria-label={en?'Breadcrumb':'مسار التصفح'}><Link href={`${prefix}/uae`}>{en?'UAE directory':'دليل الإمارات'}</Link>{' / '}<Link href={`${prefix}/uae/abu-dhabi/al-ain`}>{en?'Al Ain':'العين'}</Link>{' / '}<Link href={root}>{place}</Link>{' / '}<span>{sector.name[locale]}</span></nav>
   <UaeDirectoryHero locale={locale} title={seo.heading} description={seo.description} image={image} emirate={getEmirate('abu-dhabi')} area={area} service={getServiceCategory(sector.slug)} cleanNavigation/>
   {localText&&<section className="mx-auto max-w-6xl px-4 py-6"><h2 className="text-xl font-bold text-[#193b53]">{en?`Before requesting ${sector.name.en} in ${place}`:`ما الذي يهم مشروع ${sector.name.ar} في ${place}؟`}</h2><p className="mt-3 leading-8 text-slate-700">{localText}</p></section>}
   <GeographicServiceCards items={cards} locale={locale} place={place}/>
   <SectorTaxonomyExplorer sector={sector.slug} items={sectorTaxonomy} locale={locale} place={servicePlace} pagePath={path} reviewedServiceGuides={reviewedServiceGuides} serviceGuides={sectorGuides} quotePlacement="external" onServiceRequest={setRequestedService}/>
   <GeographicOfferCards items={offers} locale={locale} place={place}/>
   <SectorVisualGuide sector={sector.slug} locale={locale} excludeSpecialties={sectorTaxonomy}/>
   <DirectorySectorQuoteForm locale={locale} place={servicePlace} groups={sectorTaxonomy||[]} requestedService={requestedService} pagePath={path}/>
  </main><Footer locale={locale} showRequestCTA={false}/></div></>;
}
