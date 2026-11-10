const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const lib=read('lib/alNaeemPresence.js');
const discovery=read('components/provider/AlNaeemLocalDiscovery.js');
const profile=read('components/provider/AlNaeemPresencePage.js');
const sitemap=read('pages/sitemap.xml.js');
const expected=['umm-al-quwain','sharjah','ras-al-khaimah','fujairah'];
for(const region of expected){
 assert.ok(lib.includes("'"+region+"'"),'approved directory emirate missing '+region);
 assert.ok(lib.includes("emirateSlug"),'geographic route source missing');
 assert.ok(discovery.includes('NAEEM_DIRECTORY_EMIRATES.includes(emirate.slug)'),'missing geo cards');
 assert.ok(sitemap.includes('NAEEM_DIRECTORY_EMIRATES.includes(row.slug)'),'missing geo sitemap');
}
for(const locality of ['kalba','khorfakkan']){
 assert.ok(lib.includes("'"+locality+"'"),locality+' coverage missing');
}
assert.ok(lib.includes("getArea(parts[0],parts[1])"),'reject unknown districts');
assert.ok(lib.includes("data.coverageAreas.some(item=>item.slug===coverageSlug)"),'validate provider coverage');
assert.ok(lib.includes("!collection.some(item=>item.slug===slug)"),'validate published service before 200');
for(const lang of ['ar','en']){
 const three=read(lang==='ar'?'pages/uae/[activity]/[emirate]/[service].js':'pages/en/uae/[emirate]/[area]/[service].js');
 const deep=read(lang==='ar'?'pages/uae/[...parts].js':'pages/en/uae/[...parts].js');
 assert.ok(three.includes("NAEEM_DIRECTORY_EMIRATES.includes("),'emirate company path missing');
 assert.ok(three.includes("getGeographicNaeemContextProps('"+lang+"'"),'emirate context missing');
 assert.ok(deep.includes('resolveGeographicNaeemParts(parts)'),'nested geo service routing missing');
 assert.ok(deep.includes("getGeographicNaeemContextProps('"+lang+"'"),'nested geo context missing');
 for(const page of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js','pages/uae/[activity]/[emirate]/[service].js','pages/en/uae/[emirate]/[area]/[service].js']){
  const code=read(page);
  assert.ok(code.includes("cardOnly mode=\"services\""),page+' requires service-only listings');
 }
}
assert.ok(profile.includes("alNaeemPath('ar',{kind:'home'})+'#company'"),'stable brand identity absent');
assert.ok(profile.includes('geoCrumbs'),'geographic breadcrumb schema missing');
assert.ok(profile.includes('contextEmirateSlug'),'emirate context not in breadcrumbs');
assert.ok(discovery.includes('if(cardOnly)return listingMode==='services'&&contextHref?publishedServices:profileCard'),'cleaning should not duplicate profile');
assert.ok(discovery.includes('href:contextHref+\'/services/\'+service.slug'),'service href must preserve hierarchy');
console.log('Sharjah, Ras Al Khaimah, Fujairah, UAQ: profile in directory; real services in cleaning; nested bilingual route and schema PASS');
