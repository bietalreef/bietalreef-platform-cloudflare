const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const slugs=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
const cards=read('components/MainSectorCards.js');
const national=read('components/NationalServiceSectorPage.js');
const ar=read('pages/services/[slug].js');
const en=read('pages/en/categories/[slug].js');
const routes=read('lib/searchIndexRoutes.js');
const legacy=read('pages/categories/[slug].js');
const seo=read('components/SEOHead.js');
const editorial=read('data/nationalSectorEditorial.js');
const match=editorial.match(/export const NATIONAL_SECTOR_EDITORIAL = ([\s\S]*?);\s*export function/);
assert.ok(match,'authored national briefs must be serialized in the reviewed content registry');
const content=JSON.parse(match[1]);
assert.deepEqual(Object.keys(content).sort(),slugs.slice().sort());
let seen=new Set();
for(const slug of slugs){
  for(const locale of ['ar','en']){
    const guide=content[slug][locale];
    assert.ok(guide?.title.length>=35 && guide?.description.length>=90 && guide?.intro.length>=135,slug+' '+locale);
    assert.equal(guide.sections.length,3);
    for(const [heading,body] of guide.sections){
      assert.ok(heading.length>10 && body.length>120,slug+' '+locale+' original section');
      assert.ok(!seen.has(body),slug+' '+locale+' duplicated local section');
      seen.add(body);
    }
  }
}
const {buildSearchIndexEntries,resolveLanguagePaths}=require('../lib/searchIndexRoutes.js');
const entries=buildSearchIndexEntries();
for(const slug of slugs){
 const arabic='https://bietalreef.ae/services/'+slug;
 const english='https://bietalreef.ae/en/categories/'+slug;
 const matchAr=entries.filter(row=>row.loc===arabic);
 const matchEn=entries.filter(row=>row.loc===english);
 assert.equal(matchAr.length,1,slug+' canonical Arabic in sitemap');
 assert.equal(matchEn.length,1,slug+' canonical English in sitemap');
 assert.equal(matchAr[0].alternates.en,english);
 assert.equal(matchEn[0].alternates.ar,arabic);
 assert.equal(resolveLanguagePaths('/en/categories/'+slug).arabicPath,'/services/'+slug);
 assert.equal(resolveLanguagePaths('/services/'+slug).englishPath,'/en/categories/'+slug);
 assert.ok(!entries.some(row=>row.loc==='https://bietalreef.ae/categories/'+slug),'legacy alias excluded from sitemap');
}
assert.match(cards,/richSectorMore=sectionKey==='services_offers'&&!locationRoot/);
assert.match(cards,/richHref=\(en\?'\/en\/categories\/':'\/services\/'\)\+sector.slug/);
assert.match(cards,/richSectorMore\?<Link href=\{richHref\}/);
assert.match(cards,/\{en\?'More':'المزيد'\}/);
assert.match(cards,/\{en\?'Explore':'استكشف'\}/);
assert.match(cards,/<details className="group\/more mt-2"/);
for(const page of [ar,en]){
 assert.match(page,/return <NationalServiceSectorPage sector=\{mainSector\}/);
 assert.match(page,/getSectorTaxonomy\(service.slug,/);
 assert.match(page,/getNationalSectorContent\(service.slug\)/);
 assert.match(page,/sectorTaxonomy, serviceGuides/);
}
const config=read('next.config.js');
assert.match(config,/NATIONAL_GUIDE_PATHS\.map\(slug => \(\{source:'\/categories\/'\+slug,destination:'\/services\/'\+slug,permanent:true\}\)\)/);
assert.doesNotMatch(legacy,/return \{ redirect:/);
assert.match(seo,/const localArabicPath = arabicPath \|\| paths.arabicPath/);
assert.match(national,/structuredData=\{schema\}/);
assert.match(national,/'@type':'CollectionPage'/);
assert.doesNotMatch(national,/'@type':'Service',\s*provider/);
assert.match(national,/sectorTaxonomy\?\.length/);
assert.match(national,/SectorTaxonomyExplorer/);
assert.match(national,/import NationalDirectoryReading from '\.\/NationalDirectoryReading'/);
assert.match(national,/<NationalDirectoryReading sector=\{sector\} locale=\{locale\}\/>/);
const directoryReading=read('components/NationalDirectoryReading.js');
assert.match(directoryReading,/UAE_SECTOR_GUIDES_AR/);
assert.match(directoryReading,/UAE_SECTOR_GUIDES_EN/);
assert.match(directoryReading,/id="directory-reading"/);
assert.match(directoryReading,/id=\{headingIds\.get\(i\)\}/);
assert.match(directoryReading,/block\.type==='heading'/);
assert.match(directoryReading,/block\.type==='subheading'/);
assert.match(directoryReading,/block\.type==='link'/);
assert.match(directoryReading,/href=\{'#'\+topic\.id\}/);
assert.doesNotMatch(directoryReading,/useEffect|fetch\(|axios\(/);
const arReading=read('data/uaeSectorGuidesAr.js');
const enReading=read('data/uaeSectorGuidesEn.js');
for(const slug of slugs){
 assert.ok(arReading.includes('"'+slug+'"')||arReading.includes("'"+slug+"'"),'Arabic directory guide: '+slug);
 assert.ok(enReading.includes("'"+slug+"'")||enReading.includes('"'+slug+'"'),'English directory guide: '+slug);
}
assert.ok(national.indexOf('<NationalDirectoryReading') < national.indexOf('<SectorTaxonomyExplorer sector='),'directory guide must precede technical service detail');

assert.match(national,/<TechnicalGuidesFallback/);
assert.match(national,/<details key=\{group.slug\}/);
assert.equal((national.match(/<DirectorySectorQuoteForm\b/g)||[]).length,1);
assert.match(national,/quotePlacement="external"/);
assert.match(national,/UAE_EMIRATES.map\(emirate=>/);
assert.match(national,/href=\{\(en\?'\/en':''\)\+'\/uae\/'.*sector.slug\}/);
assert.match(national,/Image src=\{image.desktop\} alt=\{image.alt\[locale\]\}/);
const l=read('lib/nationalSectorContent.js');
assert.match(l,/getAbuDhabiSectorContent\(sectorSlug\)/);
assert.match(l,/bodyAr:nationalize/);
assert.match(l,/bodyEn:nationalize/);
assert.match(read('pages/services.js'),/«المزيد»/);
assert.match(read('pages/en/services.js'),/Select More/);
console.log('National service guides: PASS — full bilingual HTML, reviewed taxonomy, SEO language pairs, images, 301 aliases, single quote form, crawlable More and unchanged Explore.');
