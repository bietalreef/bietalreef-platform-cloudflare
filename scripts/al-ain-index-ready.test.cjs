const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const district = require('../data/alAinDistrictEditorial.json');
const {AREAS,CATEGORY} = require('../data/localServices');
const {pageModel,localSitemap,isIndexableAreaPage,localPath} = require('../lib/localServices');
const read = p => fs.readFileSync(path.join(__dirname,'..',p),'utf8');

assert.equal(AREAS.length,18,'Keep the existing Al Ain district taxonomy; do not add new places');
const ar = new Set(), en = new Set();
for(const place of AREAS){
  const content = district.areas[place.slug];
  assert.ok(content, 'missing authored district context: '+place.slug);
  assert.ok(content.ar.length>=300 && content.en.length>=150,'missing distinct bilingual content: '+place.slug);
  assert.ok(!ar.has(content.ar)&&!en.has(content.en),'duplicate district body: '+place.slug);
  ar.add(content.ar);en.add(content.en);
  for(const locale of ['ar','en']){
    const model=pageModel({locale,area:place.slug,providers:[]});
    assert.equal(model.indexable,true,'unlisted but useful district hub should be indexable: '+locale+'/'+place.slug);
    assert.equal(model.canonical,'https://bietalreef.ae'+localPath({locale,area:place.slug}));
    assert.equal(model.schema['@type'],'CollectionPage');
    assert.equal(model.schema.mainEntity.itemListElement.length,0,'do not fabricate providers');
  }
  assert.equal(pageModel({area:place.slug,category:CATEGORY.slug,providers:[]}).indexable,true,'reviewed district category is useful without companies');
}
const sitemap=localSitemap([]);
assert.equal(sitemap.length,AREAS.length*4,'district hubs and cleaning categories appear in both languages');
assert.ok(sitemap.filter(x=>!/\/cleaning-services$/.test(x.loc)).every(x=>x.lastmod==='2026-11-09'),'district hubs carry honest revision dates');
assert.equal(sitemap.filter(x=>/\/cleaning-services$/.test(x.loc)).length,AREAS.length*2);
assert.equal(new Set(sitemap.map(x=>x.loc)).size,sitemap.length);
const districtPage=read('components/LocalServicesPage.js');
assert.match(districtPage,/import DirectorySectorQuoteForm/);
assert.match(districtPage,/UAE_MAIN_SECTORS\.map\(sector/);
assert.match(districtPage,/districtIntro && <DirectorySectorQuoteForm/);
assert.match(districtPage,/pagePath=\{localPath\(\{locale, area:area.slug\}\)\}/);
assert.match(districtPage,/AlAinDistrictSectorCards/);
assert.match(districtPage,/districtEditorial\.areas\[area\.slug\]/);
const middleware=read('middleware.js');
assert.match(middleware,/\.endsWith\('\.workers\.dev'\)/);
assert.doesNotMatch(middleware,/request\.nextUrl\.hostname\.includes\('bietalreef\.ae'\).*noindex/);
const robots=read('public/robots.txt');
assert.match(robots,/Allow: \/uae\//);
assert.match(robots,/Sitemap: https:\/\/bietalreef\.ae\/sitemap\.xml/);
const sitemapSource=read('pages/sitemap.xml.js');
assert.match(sitemapSource,/localSitemap\(await getLocalProviders\(\)\)/);
console.log('Al Ain district index readiness: PASS — unique bilingual editorial, original taxonomy, single RFQ, canonical and sitemap for eligible district hubs.');
