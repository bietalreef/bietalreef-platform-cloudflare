const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const landing=read('components/DirectoryLandingPage.js');
const component=read('components/provider/AlNaeemLocalDiscovery.js');
assert.match(landing,/profileOnly=\{mode==='umm-al-quwain'\}/);
assert.match(component,/if\(cardOnly\)return showServices&&contextHref\?publishedServices:profileCard/);
assert.match(component,/coverageSlug=\{profileOnly\?null:coverageSlug\}/);
assert.match(component,/const contextHref=emirate.slug==='umm-al-quwain'\?uaqNaeemBase\(locale,area\?\.slug\):null/);
assert.match(component,/href:contextHref\+'\/services\/'\+service.slug/);
assert.match(read('pages/uae/[activity]/[emirate].js'),/profileOnly=\{emirate.slug==='umm-al-quwain'\}/);
assert.match(read('pages/en/uae/[emirate]/[area].js'),/profileOnly=\{emirate.slug==='umm-al-quwain'\}/);
for(const p of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js','pages/uae/[activity]/[emirate]/[service].js','pages/en/uae/[emirate]/[area]/[service].js']){
 const s=read(p);
 assert.ok(s.includes('showServices={emirate.slug===\'umm-al-quwain\'}'),p+' requires service-only cards');
}
const lib=read('lib/alNaeemPresence.js');
assert.match(lib,/export const uaqNaeemBase/);
assert.match(lib,/export async function getUaqNaeemContextProps/);
const geo=read('data/northernDirectoryContent.js');
assert.match(geo,/umm-al-quwain/);
console.log('UAQ Al Naeem home=company profile, cleaning=service cards, bilingual geographic route: PASS');
