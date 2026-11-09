const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const guides = JSON.parse(read('data/abuDhabiConstructionServiceGuides.json'));
const counts = { 'general-construction': 14, 'renovation-restoration': 7, 'demolition-concrete': 7, 'garden-design': 14, 'irrigation-systems': 7, 'shades-outdoor': 7 };
assert.equal(guides.specialties.length, 6);
for (const group of guides.specialties) {
  assert.equal(group.services.length, counts[group.slug], group.slug + ' services');
  for (const item of group.services) {
    assert.ok(item.nameAr && item.nameEn && item.bodyAr.length >= 80 && item.bodyEn.length >= 80, 'bilingual explanation missing for ' + item.nameAr);
  }
}
assert.equal(guides.specialties.flatMap(x=>x.services).length, 56);
assert.equal(guides.specialties[0].services[0].nameAr, 'إنشاء الفلل');
assert.equal(guides.specialties[0].services[1].nameAr, 'إنشاء المباني السكنية');
const explorer = read('components/SectorTaxonomyExplorer.js');
const quote = read('components/DirectorySectorQuoteForm.js');
const metadata = read('data/abuDhabiSectorSeo.js');
const seoHead = read('components/UaeDirectorySeo.js');
const whatsapp = read('lib/providerWhatsapp.js');
assert.match(explorer, /<details className="mt-3" open=\{expanded\}/);
assert.match(explorer, /<h2 className="text-sm font-extrabold/);
assert.match(explorer, /directoryServiceTitle/);
assert.match(explorer, /directoryServiceCopy/);
assert.match(explorer, /reviewedServiceGuides/);
assert.match(explorer, /<DirectorySectorQuoteForm/);
assert.match(explorer, /normalized==='general-contracting'/);
assert.doesNotMatch(explorer, /abuDhabiContracting/);
assert.match(quote, /971564456337/);
assert.match(quote, /requestedService/);
assert.match(explorer, /setRequestedServices/);
assert.match(quote, /buildServiceQuoteWhatsappUrl/);
assert.match(quote, /customerName: name\.trim\(\),\s*customerPhone: phone\.trim\(\),\s*location: place/s);
assert.match(whatsapp, /detailLine\('رقم التواصل', customerPhone\)/);
assert.match(whatsapp, /detailLine\('Contact number', customerPhone\)/);
assert.match(metadata, /شركات مقاولات في أبوظبي/);
assert.match(metadata, /Construction Companies in Abu Dhabi/);
assert.match(seoHead, /BreadcrumbList/);
assert.match(seoHead, /rel="canonical"/);
assert.match(seoHead, /hrefLang="ar-AE"/);
assert.match(seoHead, /hrefLang="en-AE"/);
console.log('Abu Dhabi contracting bilingual SEO + quotation contract: PASS (56 services, 6 specialties).');

// Al Ain districts use selected reviewed text, not fabricated businesses or client-side bulk content.
const props = read('lib/alAinAreaSectorProps.js');
const areaPage = read('components/AlAinAreaSectorPage.js');
assert.match(props, /reviewedServiceGuides/);
assert.match(areaPage, /reviewedServiceGuides=\{reviewedServiceGuides\}/);
assert.doesNotMatch(areaPage, /noIndex=\{!cards\?\.length/);
for(const [file, district] of [
  ['alAinReviewedServiceGuidesHili.json','al-hili'],
  ['alAinReviewedServiceGuidesJimi.json','al-jimi'],
  ['alAinReviewedServiceGuidesMuwaiji.json','al-muwaiji'],
]) {
  const content=JSON.parse(read('data/'+file));
  assert.equal(content.district, district);
  assert.equal(Object.keys(content.services).length,8);
  for(const [sector,translations] of Object.entries(content.services)) {
    assert.ok(Object.keys(translations.ar).length>0, district+' '+sector+' missing Arabic');
    assert.ok(Object.keys(translations.en).length>0, district+' '+sector+' missing English');
  }
}
console.log('Al Ain districts: 8-sector reviewed bilingual content and HTML contract: PASS.');
const bannerCss = read('components/AlAinSectorCards.module.css');
assert.ok(bannerCss.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
assert.ok(bannerCss.includes('aspect-ratio:2/1'));
assert.ok(bannerCss.includes('object-fit:cover'));
assert.ok(!bannerCss.includes('repeat(3,minmax(0,1fr))'));
const districtRoutes=read('lib/localRouteProps.js');
assert.ok(districtRoutes.includes('alAinAreaSectorProps(locale,district.slug,CATEGORY.slug)'));
assert.ok(read('components/AlAinMaintenanceAreaPage.js').includes('reviewedServiceGuides={model.reviewedServiceGuides}'));
assert.ok(read('components/AlAinDistrictCleaningPage.js').includes('reviewedServiceGuides={model.reviewedServiceGuides}'));
console.log('Al Ain city/district banner + service form parity: PASS.');


// Al Ain uses the SAME approved 8-sector editorial sources and quotation UI as Abu Dhabi.
// Actual service membership still comes from the Supabase taxonomy in getSectorTaxonomy.
const localGuideResolver = read('lib/alAinSectorContent.js');
const localSectorProps = read('lib/alAinAreaSectorProps.js');
const localRoutesSource = read('lib/localRouteProps.js');
assert.match(localGuideResolver, /getAbuDhabiSectorContent/);
assert.match(localGuideResolver, /sectorGroups=new Map\(sectorTaxonomy/);
assert.match(localGuideResolver, /normalizeDirectoryServiceName/);
assert.match(localSectorProps, /getAlAinSectorContent\(sector.slug,locale,place,sectorTaxonomy\)/);
assert.match(localSectorProps, /normalizeDirectoryServiceName\(key\)/);
assert.match(localRoutesSource, /model\.sectorGuides=getAlAinSectorContent/);
assert.match(localRoutesSource, /model\.sectorGuides=getAlAinSectorContent\('cleaning-services'/);
assert.match(explorer, /serviceGuides\?\.sector===normalized/);
assert.doesNotMatch(explorer, /serviceGuides\?\.sector===normalized && \(place===/);

let sourceGuidesCount=0;
const guideSources=[
  ['general-contracting','data/abuDhabiConstructionServiceGuides.json'],
  ...['interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services']
    .map(slug=>[slug,'data/abuDhabiSectorContent/'+slug+'.json']),
];
for(const [sector,file] of guideSources) {
 const data=JSON.parse(read(file));
 assert.ok(data.specialties.length>0,sector);
 for(const specialty of data.specialties){
  assert.ok(specialty.slug,sector+' missing specialty');
  for(const service of specialty.services){
   assert.ok(service.nameAr&&service.nameEn,sector+' names');
   assert.ok(service.bodyAr?.length>=80&&service.bodyEn?.length>=80,sector+' bilingual text');
   sourceGuidesCount++;
  }
 }
}
assert.equal(sourceGuidesCount,434);

const pages=[
 ['components/AlAinHubPage.js',true],
 ['components/AlAinAreaSectorPage.js',true],
 ['components/AlAinCleaningPage.js',true],
 ['components/AlAinDistrictCleaningPage.js',true],
 ['components/AlAinMaintenanceAreaPage.js',true],
];
for(const [page,expected] of pages){
 const src=read(page);
 assert.ok(src.includes('quotePlacement="external"'),page+' must use the Abu Dhabi expanded service banner');
 assert.ok(src.includes('onServiceRequest={setRequestedService}'),page+' quote selection must follow service');
 assert.equal((src.match(/<DirectorySectorQuoteForm/g)||[]).length,1,page+' duplicate quote form');
 assert.ok(src.includes('serviceGuides={model.sectorGuides}')||src.includes('serviceGuides={sectorGuides}'),page+' missing editorial');
}
assert.match(read('components/AlAinAreaSectorPage.js'),/alternatePath=\{'\/en\/uae\/abu-dhabi\/al-ain\/'/);
assert.ok(!read('components/AlAinAreaSectorPage.js').includes("alternatePath={(en?'':'/en')"));
assert.ok(read('lib/districtCleaning.js').includes("getAlAinSectorContent('cleaning-services'"));
console.log('Al Ain/Abu Dhabi: bilingual 434 editorial source descriptions, one quote form, eight taxonomy-bound sectors: PASS.');
