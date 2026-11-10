const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const source=read('lib/alNaeemPresence.js');
for(const slug of ['fujairah','kalba','khorfakkan','ras-al-khaimah','dubai','sharjah','umm-al-quwain','al-ain']) {
  assert.ok(source.includes("slug:'"+slug+"'"),'missing approved coverage '+slug);
}
assert.ok(source.includes("route.kind==='service-areas'?(data.coverageAreas||data.areas):null"),'area route must validate entire published coverage');
assert.ok(source.includes("data.coverageAreas||data.areas).some(x=>x.slug===route.areaSlug)"),'nested service route must respect approved coverage');
const card=read('components/provider/AlNaeemDirectoryCard.js');
assert.ok(card.includes("alNaeemPath(locale,{kind:'service-areas',slug:coverageSlug})"),'card must open contextual area profile');
assert.ok(card.includes("alNaeemPath(locale,{kind:'services',slug:service.slug,areaSlug:coverageSlug})"),'service links must resolve inside area profile');
const placement=read('components/provider/AlNaeemLocalDiscovery.js');
assert.ok(placement.includes('coverageSlug={coverageSlug}'),'area card must be passed validated coverage slug');
assert.ok(placement.includes('location={cityName}'),'local place label retained');
const company=read('components/provider/AlNaeemPresencePage.js');
assert.ok(company.includes('items.map(x=><Link href={alNaeemPath(locale,{kind,slug:x.slug})}'),'area links stay inside the company profile');
const directory=read('components/DirectoryLandingPage.js');
assert.ok(directory.includes('alNaeemCoverageFor(mode)'),'emirate company display must use shared coverage resolver');
assert.ok(directory.includes('AL_NAEEM_EDITORIAL_DATA.coverageAreas.some'),'no company card for unlisted emirates');
for(const lang of ['ar','en']){
 const prefix=lang==='en'?'/en':'';
 const root=prefix+'/providers/al-naeem-cleaning-services';
 for(const slug of ['fujairah','kalba','khorfakkan','ras-al-khaimah']){
  const area=root+'/service-areas/'+slug;
  const nested=area+'/services/home-villa-cleaning';
  assert.ok(area.startsWith(root+'/service-areas/'));
  assert.ok(nested.startsWith(area+'/services/'));
 }
}

const resolver=read('lib/alNaeemLocalSeo.js');
assert.match(resolver,/export function alNaeemDirectoryRedirect\(parts,locale='ar'\)/);
assert.match(resolver,/AL_NAEEM_EDITORIAL_DATA.coverageAreas.some/);
assert.match(resolver,/parts\[2\]==='cleaning-services'/);
assert.match(resolver,/alNaeemCoverageFor\(emirate,area\)/);
for(const [lang,p] of [['ar','pages/uae/[...parts].js'],['en','pages/en/uae/[...parts].js']]){
 const route=read(p);
 assert.match(route,/alNaeemDirectoryRedirect\(parts,'(?:ar|en)'\)/);
 assert.match(route,/destination:naeemDestination,permanent:true/);
}
for(const page of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js',
 'pages/uae/[activity]/[emirate]/[service].js','pages/en/uae/[emirate]/[area]/[service].js']){
 const src=read(page);
 assert.match(src,/service.slug==='cleaning-services'&&AL_NAEEM_EDITORIAL_DATA.coverageAreas.some/);
 assert.match(src,/!geographicCards\?\.some\(row=>row.providerSlug==='al-naeem-cleaning-services'\)/);
 assert.match(src,/<AlNaeemLocalDiscovery emirate=\{emirate\}/);
 assert.match(src,/cardOnly/);
}
assert.match(placement,/if \(cardOnly\) return <AlNaeemDirectoryCard/);

console.log('Al Naeem location-aware directory card, full approved coverage and nested service links: PASS');
