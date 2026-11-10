const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname,'..',file),'utf8');

const presence = read('lib/alNaeemPresence.js');
const geo = read('lib/alNaeemLocalSeo.js');
const card = read('components/provider/AlNaeemDirectoryCard.js');
const discovery = read('components/provider/AlNaeemLocalDiscovery.js');
const landing = read('components/DirectoryLandingPage.js');
const profile = read('components/provider/AlNaeemPresencePage.js');
const fallback = read('components/UaeActivityProviders.js');
const covered=['dubai','sharjah','umm-al-quwain','ras-al-khaimah','fujairah','kalba','khorfakkan','al-ain'];

for(const c of covered) assert.ok(presence.includes("slug:'"+c+"'"),'approved coverage missing: '+c);
assert.match(geo,/export function alNaeemContextBase/);
assert.match(geo,/export function alNaeemContextPath/);
assert.match(geo,/export function getAlNaeemDirectoryContextProps/);
assert.match(geo,/getArea\(emirateSlug, areaSlug\)/);
assert.match(geo,/AL_NAEEM_EDITORIAL_DATA\.coverageAreas\.some/);
assert.match(geo,/resolveAlNaeemRoute\(parts\.slice\(companyIndex \+ 1\)\)/);
assert.match(geo,/collection\?\.some\(item => item.slug === route.slug\)/);
assert.match(geo,/contextBase,/);
assert.match(geo,/contextPlaceAr:/);
assert.match(geo,/contextPlaceEn:/);
assert.match(geo,/return \{notFound:true\}/);
assert.match(geo,/return '\/uae\/' \+ emirateSlug/);

assert.match(discovery,/alNaeemContextPath\(locale,emirate.slug,area\?\.slug\|\|null\)/);
assert.match(discovery,/if\(cardOnly\)return showServices\?publishedServices:profileCard/);
assert.match(discovery,/AL_NAEEM_EDITORIAL_DATA\.services\.map\(service/);
assert.match(discovery,/href:contextHref\+'\/services\/'\+service.slug/);
assert.match(discovery,/providerHref:companyPath/);
assert.doesNotMatch(discovery,/uaqNaeemBase\(/);
assert.match(card,/item.href=contextHref\|\|alNaeemPath/);
assert.match(card,/contextHref\+'\/services\/'\+service.slug/);
assert.match(landing,/AlNaeemLocalDiscovery emirate=\{currentEmirate\} locale=\{locale\} cardOnly/);
assert.doesNotMatch(landing,/cardOnly showServices/);

const sectorPages=[
 'pages/uae/[activity]/[emirate].js',
 'pages/en/uae/[emirate]/[area].js',
 'pages/uae/[activity]/[emirate]/[service].js',
 'pages/en/uae/[emirate]/[area]/[service].js',
];
for(const file of sectorPages){
 const s=read(file);
 assert.match(s,/service.slug==='cleaning-services'&&AL_NAEEM_EDITORIAL_DATA\.coverageAreas\.some/);
 assert.match(s,/<AlNaeemLocalDiscovery emirate=\{emirate\}/);
 assert.match(s,/cardOnly showServices\/>/);
 assert.doesNotMatch(s,/showServices=\{emirate.slug==='umm-al-quwain'\}/);
 assert.match(s,/geographicCards\?\.filter\(row=>row.providerSlug!=='al-naeem-cleaning-services'\)/);
}
for(const file of sectorPages.slice(2)){
 const s=read(file);
 assert.match(s,/AlNaeemLocalDiscovery emirate=\{emirate\} area=\{area\} locale=/);
 assert.match(s,/cardOnly\s*\/>/);
}
assert.match(fallback,/cardOnly showServices/);
assert.match(profile,/contextualNav\('services'\)/);
assert.match(profile,/contextBase=\{route.contextBase\}/);
assert.doesNotMatch(profile,/contextBase&&kind==='services'/);
assert.match(profile,/aspect-\[16\/10\] w-full/);
assert.match(profile,/href=\{contextualNav\('service-areas',area.slug\)\}/);
console.log('Al Naeem: profile on location homes, service cards on every covered cleaning sector, and contextual service links: PASS');
