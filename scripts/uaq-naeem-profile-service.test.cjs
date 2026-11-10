const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const landing=read('components/DirectoryLandingPage.js');
const component=read('components/provider/AlNaeemLocalDiscovery.js');
assert.ok(landing.includes("profileOnly={['umm-al-quwain','sharjah','ras-al-khaimah','fujairah'].includes(mode)}"));
assert.match(component,/if\(cardOnly\)return showServices&&contextHref\?publishedServices:profileCard/);
assert.match(component,/coverageSlug=\{profileOnly\?null:coverageSlug\}/);
assert.ok(component.includes("naeemGeographicBase(locale,emirate.slug,area?.slug)"));
assert.match(component,/href:contextHref\+'\/services\/'\+service.slug/);
assert.ok(read('pages/uae/[activity]/[emirate].js').includes("profileOnly={['umm-al-quwain','sharjah','ras-al-khaimah','fujairah'].includes(emirate.slug)}"));
assert.ok(read('pages/en/uae/[emirate]/[area].js').includes("profileOnly={['umm-al-quwain','sharjah','ras-al-khaimah','fujairah'].includes(emirate.slug)}"));
for(const p of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js','pages/uae/[activity]/[emirate]/[service].js','pages/en/uae/[emirate]/[area]/[service].js']){
 const s=read(p);
 assert.ok(s.includes("showServices={['umm-al-quwain','sharjah','ras-al-khaimah','fujairah'].includes(emirate.slug)}"),p+' requires service-only cards');
}
const lib=read('lib/alNaeemPresence.js');
assert.match(lib,/export const uaqNaeemBase/);
assert.match(lib,/export async function getUaqNaeemContextProps/);
const geo=read('data/northernDirectoryContent.js');
assert.match(geo,/umm-al-quwain/);
console.log('UAQ Al Naeem home=company profile, cleaning=service cards, bilingual geographic route: PASS');
