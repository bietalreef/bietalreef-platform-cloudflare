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
assert.match(explorer, /<details className="mt-3">/);
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
assert.match(quote, /name,\s*customerPhone: phone,\s*location: place/s);
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
