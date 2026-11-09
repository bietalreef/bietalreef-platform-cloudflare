const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const inventory = {
  'interior-design': {'architectural-design':14,'structural-design':7,'engineering-supervision':7,'residential-interior-design':21},
  'general-maintenance': {'villa-building-maintenance':14,'integrated-finishing':7,'gypsum-decor':7,'flooring-cladding':7,'electrical-installations':14,'sanitary-installations':14,'ac-installation':14,'smart-homes':14,'interior-exterior-painting':7,'water-thermal-insulation':7},
  'building-materials': {'basic-building-materials':21,'wood-boards':7,'natural-marble-granite':7,'kitchen-countertops-sinks':7,'ceramic-porcelain':7},
  'aluminium-glass': {'custom-kitchens-wardrobes':14,'furniture-wood-decor':14,'aluminium-doors-windows':14,'glass-facades':7,'blacksmith-metal-workshops':7},
  'furniture-decor': {'furniture-factories-workshops':7,'furniture-decor-stores':7,'furniture-upholstery-majlis':5,'curtains-carpets-furnishings':5},
  'equipment-rental': {'construction-lifting-equipment':7,'light-equipment-tools':7,'aluminium-glass-factories':7,'marble-stone-factories':7,'tools-equipment-stores':7,'furniture-property-moving':7,'project-materials-equipment-transport':7,'concrete-block-cement-factories':4},
  'cleaning-services': {'homes-buildings-cleaning':7,'steam-upholstery-cleaning':7,'facades-sites-cleaning':4,'water-tank-pool-cleaning':3,'pest-rodent-control':5,'sanitisation-disinfection':2,'building-operations-maintenance':7,'labor-operations':7}
};
let services=0,specialties=0;
for(const [sector,groups] of Object.entries(inventory)){
  const data=JSON.parse(read('data/abuDhabiSectorContent/'+sector+'.json'));
  assert.equal(data.sector,sector);
  assert.equal(data.specialties.length,Object.keys(groups).length,sector+' specialty count');
  for(const group of data.specialties){
    assert.equal(group.services.length,groups[group.slug],sector+'/'+group.slug+' service count');
    specialties++;
    for(const service of group.services){
      assert.ok(service.nameAr && service.nameEn,sector+' service title missing');
      assert.ok(service.bodyAr.length>=130 && service.bodyEn.length>=150,sector+' service explanation missing');
      assert.doesNotMatch(service.bodyAr,/مدينة خليفة|بني ياس/);
      assert.doesNotMatch(service.bodyEn,/Khalifa City|Baniyas/);
      services++;
    }
  }
}
assert.equal(services,378);
assert.equal(specialties,44);
assert.equal(services+56,434);
const ar=read('pages/uae/[activity]/[emirate].js');
const en=read('pages/en/uae/[emirate]/[area].js');
const explorer=read('components/SectorTaxonomyExplorer.js');
const quote=read('components/DirectorySectorQuoteForm.js');
const metadata=read('data/abuDhabiSectorSeo.js');
const helper=read('lib/abuDhabiSectorContent.js');
const schema=read('components/UaeDirectorySeo.js');
for (const route of [ar,en]){
  assert.match(route,/getAbuDhabiSectorContent\(service.slug\)/);
  assert.match(route,/serviceGuides=\{sectorGuides\}/);
  assert.match(route,/sectorGuides,/);
  assert.match(route,/getSectorTaxonomy\(service.slug/);
}
for(const sector of Object.keys(inventory))assert.ok(helper.includes("'"+sector+"'"), 'missing server-only content import '+sector);
assert.match(explorer, /<details className="mt-3" open=\{expanded\}/);
assert.match(explorer, /<h2 className="text-sm font-extrabold/);
assert.match(explorer, /serviceGuides\.specialties\.find/);
assert.match(explorer, /<DirectorySectorQuoteForm locale=\{locale\}/);
assert.match(explorer, /normalizeServiceName/);
assert.match(explorer, /reviewedServiceGuides/);
assert.match(explorer, /directoryServiceTitle/);
assert.match(explorer, /directoryServiceCopy/);
assert.match(explorer, /'@type':'ItemList'/);
assert.match(quote, /pagePath: pagePath \|\| window\.location\.pathname/);
assert.match(quote, /971564456337/);
assert.match(quote, /customerPhone: phone\.trim\(\)/);
assert.match(schema, /BreadcrumbList/);
assert.match(schema, /hrefLang="ar-AE"/);
assert.match(schema, /hrefLang="en-AE"/);
assert.match(schema, /rel="canonical"/);
for(const sector of Object.keys(inventory))assert.ok(metadata.includes("'"+sector+"':"),'missing metadata for '+sector);
console.log('Abu Dhabi all eight sectors: PASS — 44 further specialties, 378 additional bilingual service guides, contextual WhatsApp RFQs, SSR HTML and SEO contracts.');
