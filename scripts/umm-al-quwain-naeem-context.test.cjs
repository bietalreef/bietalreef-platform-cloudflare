const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const p=read('lib/alNaeemPresence.js'),card=read('components/provider/AlNaeemDirectoryCard.js');
const page=read('components/provider/AlNaeemPresencePage.js'),discovery=read('components/provider/AlNaeemLocalDiscovery.js');
const area=JSON.parse(read('data/northernDirectoryContent.js').match(/^export const NORTHERN_LOCALITIES=(.+);$/m)[1])['umm-al-quwain'];
assert.ok(area.length>=15,'Umm Al Quwain locality descriptions in both languages required');
assert.ok(new Set(area.map(row=>row[0])).size===area.length,'district slugs must remain unique');
const districts=read('data/siteTaxonomy.js');
for(const row of area)assert.ok(districts.includes("slug: '"+row[0]+"'"),'district not in master taxonomy '+row[0]);
assert.ok(p.includes("UAQ_NAEEM_EMIRATE='umm-al-quwain'"));
assert.ok(p.includes("route.contextBase?route.contextBase+'/'+AL_NAEEM_SLUG"));
assert.ok(p.includes("return base+'/services/'+route.slug"));
assert.ok(p.includes("getArea(emirateSlug,areaSlug)"));
assert.ok(p.includes('data.coverageAreas.some'),'must validate company coverage');
assert.ok(p.includes("collection.some(item=>item.slug===slug)"),'must validate actual service availability');
for(const lang of ['ar','en']){
 const root=(lang==='en'?'/en':'')+'/uae/umm-al-quwain/cleaning-services/al-naeem-cleaning-services';
 for(const district of area.map(x=>x[0])){
  const local=(lang==='en'?'/en':'')+'/uae/umm-al-quwain/'+district+'/cleaning-services/al-naeem-cleaning-services';
  assert.ok(local.endsWith('/cleaning-services/al-naeem-cleaning-services'));
  assert.ok(local+'/services/home-villa-cleaning');
 }
 assert.ok(root.includes('/cleaning-services/'));
}
for(const locale of ['ar','en']){
 const src=read(locale==='ar'?'pages/uae/[activity]/[emirate]/[service].js':'pages/en/uae/[emirate]/[area]/[service].js');
 const catchall=read(locale==='ar'?'pages/uae/[...parts].js':'pages/en/uae/[...parts].js');
 assert.ok(src.includes('getGeographicNaeemContextProps('),'emirate/company route missing '+locale);
 assert.ok(catchall.includes('getGeographicNaeemContextProps('),'district/company route missing '+locale);
 assert.ok(catchall.includes("resolveGeographicNaeemParts(parts)"));
 assert.ok(p.includes("parts[2]==='cleaning-services'"));
 assert.ok(p.includes("parts[3]===AL_NAEEM_SLUG"));
}
assert.ok(card.includes("item.href=contextHref||alNaeemPath"),'company card must preserve regional route');
assert.ok(card.includes("contextHref+'/services/'+service.slug"),'service paths must preserve regional route');
assert.ok(discovery.includes("listingMode==='services'&&contextHref?"),'service tiles missing in cleaning sector');
assert.ok(discovery.includes('AL_NAEEM_EDITORIAL_DATA.services.map'),'actual services only');
assert.ok(discovery.includes('naeemGeographicBase(locale,emirate.slug,area?.slug)'));
assert.ok(page.includes('contextualNav('),'provider profile must preserve context navigation');
assert.ok(page.includes('const root=alNaeemPath(locale,'),'same provider profile reused');
assert.ok(page.includes('contextBase={route.contextBase}'));
for(const f of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js','pages/uae/[activity]/[emirate]/[service].js','pages/en/uae/[emirate]/[area]/[service].js']){
 assert.ok(read(f).includes("cardOnly mode=\"services\""),'UAQ cleaning service listing absent '+f);
}
const sitemap=read('pages/sitemap.xml.js');
assert.ok(sitemap.includes("NAEEM_DIRECTORY_EMIRATES.includes(row.slug)"),'area URLs absent from sitemap');
assert.ok(sitemap.includes("const root=naeemGeographicBase('ar',emirate.slug,areaSlug)"),'regional company URLs absent from sitemap');
console.log('Umm Al Quwain districts, bilateral provider context, live provider cards and service links: PASS');
