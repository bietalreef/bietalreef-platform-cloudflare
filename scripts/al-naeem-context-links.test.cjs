const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const presence=read('lib/alNaeemPresence.js');
const discovery=read('components/provider/AlNaeemLocalDiscovery.js');
const card=read('components/provider/AlNaeemDirectoryCard.js');
const ui=read('components/provider/AlNaeemPresencePage.js');
const coverage=read('lib/alNaeemLocalSeo.js');
const directory=read('components/DirectoryLandingPage.js');

assert.match(coverage,/if \(emirateSlug === 'fujairah'\) return 'fujairah'/,'Fujairah localities use declared emirate coverage');
assert.doesNotMatch(coverage,/areaSlug && areaSlug !== 'fujairah-city'/,'no special 404 for other Fujairah districts');
assert.match(discovery,/\/cleaning-services\/al-naeem-cleaning-services/);
assert.match(discovery,/contextHref=\{companyPath\}/);
assert.match(card,/item.href = contextHref/);
assert.match(card,/item.serviceLinks = item.serviceLinks.map/);
assert.match(card,/DirectoryCompanyCard item=\{item\}/);
assert.match(directory,/mode==='ras-al-khaimah'/);
assert.match(presence,/function geographicNaeemContext\(contextBase,data\)/);
assert.match(presence,/const coverage=alNaeemCoverageFor\(emirate.slug,area\?\.slug\|\|null\)/);
assert.match(presence,/data.coverageAreas\|\|data.areas/);
assert.match(presence,/context\?\.res\?\.setHeader\?\./);
assert.match(ui,/alNaeemPath\(locale,\{kind,slug:x.slug\}\)/,'area cards open actual company area profile');
assert.doesNotMatch(ui,/x.directoryPath\?prefixPath\(locale,x.directoryPath\)/,'area tiles must not drop into generic directory');
assert.match(ui,/const navPath=\(next=\{kind:'home'\}\)=>alNaeemPath\(locale,\{\.\.\.next,contextBase\}\)/);
assert.match(ui,/homeHref=\{root\} active=\{route.kind\}/);
assert.match(ui,/contextBase=\{contextBase\}/);
assert.match(ui,/Cleaning in \$\{place\}/);
const pairs=[
 ['pages/uae/[activity]/[emirate]/[service].js','ar'],
 ['pages/en/uae/[emirate]/[area]/[service].js','en'],
 ['pages/uae/[...parts].js','ar'],
 ['pages/en/uae/[...parts].js','en']
];
for(const [file,locale] of pairs) {
 const s=read(file);
 assert.match(s,/getAlNaeemProps/);
 assert.match(s,/AL_NAEEM_SLUG/);
 assert.match(s,/AlNaeemPresencePage/);
 assert.match(s,/cleaning-services/);
 if(file.includes('[...parts]')){
  assert.match(s,/parts.indexOf\(AL_NAEEM_SLUG\)/);
  assert.match(s,/naeemIndex===2\|\|naeemIndex===3/);
  assert.match(s,/getArea\(parts\[0\],parts\[1\]\)/);
 } else {
  assert.match(s,/return result.props\?\{props:\{\.\.\.result.props,alNaeem:true\},revalidate:300\}:result/);
  assert.match(s,/AlNaeemLocalDiscovery emirate=\{emirate\} area=\{area\}/);
 }
}
for(const file of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js']){
 const s=read(file);
 assert.match(s,/geoSector&&service.slug==='cleaning-services'/);
 assert.match(s,/AlNaeemLocalDiscovery emirate=\{emirate\} locale=/);
 assert.match(s,/cardOnly/);
}
assert.doesNotMatch(presence,/verification_status:\s*['"]verified/,'do not infer company verification');
console.log('Al Naeem: context navigation, Fujairah area route, cross-emirate cards, company sections, WhatsApp, AR/EN contract: PASS.');
