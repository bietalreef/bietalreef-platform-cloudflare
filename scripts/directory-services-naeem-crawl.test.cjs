const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const main=read('components/MainSectorCards.js');
const group=read('components/UaeDirectorySectorCards.js');
const explorer=read('components/SectorTaxonomyExplorer.js');
const naeem=read('lib/alNaeemPresence.js');
const discover=read('components/provider/AlNaeemLocalDiscovery.js');
const redirect=read('lib/alNaeemLocalSeo.js');
const presence=read('components/provider/AlNaeemPresencePage.js');
const directory=read('data/directoryDiscovery.js');
const sitemap=read('pages/sitemap.xml.js');
const sectorSource=directory.slice(directory.indexOf('export const UAE_MAIN_SECTORS'),directory.indexOf('export const ABU_DHABI_DESTINATIONS'));
const imagePaths=[...sectorSource.matchAll(/image:'([^']+)'/g)].map(m=>m[1]);
assert.equal(imagePaths.length,8,'all sectors have a real image');
assert.equal(new Set(imagePaths).size,8,'use individual visual for each sector');
for(const image of imagePaths){
 assert.match(image,/\.webp$/);
 assert.ok(fs.existsSync(path.join(root,'public'+image)),'sector image missing: '+image);
}
for(const slug of ['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services']){
 assert.ok(sectorSource.includes("slug:'"+slug+"'"),'missing canonical sector '+slug);
}
assert.match(main,/<details className="group\/more mt-2"/);
assert.match(main,/<summary className=/);
assert.match(main, /sector\.description\[locale\]/);
assert.match(main, /guidance\[sector\.slug\]/);
assert.match(main, /href=\{primary\.href\}/);
assert.match(main, /locationMode === 'emirate-area'/);
assert.match(main, /locationMode === 'al-ain'/);
assert.doesNotMatch(main,/fetch\(/);
assert.doesNotMatch(main,/\$\{.*?\.length\}/);
assert.match(group,/locationMode=\{locationMode\}/);
assert.doesNotMatch(group,/TrustStrip|verifiedLabel|moreLabel|UAE_SECTION_META|LegacyUaeDirectorySectorCards/);
assert.match(explorer,/aria-expanded=\{expanded\}/);
assert.match(explorer,/id=\{'service-'/);
assert.match(explorer,/hidden=\{!expanded\}/);
assert.match(explorer,/directoryServiceCopy\(/);
assert.match(naeem,/NAEEM_DIRECTORY_EMIRATES=\['dubai','sharjah','umm-al-quwain','ras-al-khaimah','fujairah','abu-dhabi'\]/);
assert.match(naeem,/areaSlug==='al-ain'\?'al-ain':null/);
assert.match(naeem,/data\.coverageAreas\.some/);
assert.match(discover,/const listingMode = mode \|\|/);
assert.match(discover,/listingMode==='services'&&contextHref/);
assert.match(discover,/if\(cardOnly\)return listingMode==='services'\?publishedServices:profileCard/);
assert.match(discover,/AL_NAEEM_EDITORIAL_DATA\.services\.map/);
assert.match(discover,/href:contextHref\+'\/services\/'\+service\.slug/);
assert.match(discover,/providerHref:companyPath/);
assert.match(presence,/route\.contextBase\?root:alNaeemPath/);
assert.match(presence,/contextBase=\{route\.contextBase\}/);
assert.match(redirect,/naeemGeographicBase\(locale,emirate,area\)/);
assert.match(sitemap,/NAEEM_DIRECTORY_EMIRATES\.includes\(row\.slug\)/);
assert.match(sitemap,/alNaeemCoverageFor\(emirate\.slug,areaSlug\)/);
const regionPages=[
 'pages/uae/[activity]/[emirate].js',
 'pages/en/uae/[emirate]/[area].js',
 'pages/uae/[activity]/[emirate]/[service].js',
 'pages/en/uae/[emirate]/[area]/[service].js'
];
for(const file of regionPages){
 const page=read(file);
 assert.match(page,/<AlNaeemLocalDiscovery emirate=\{emirate\}/,file);
 assert.match(page,/cardOnly mode="services"/,file+' must show services inside cleaning');
 assert.doesNotMatch(page,/showServices=\{\[/,file+' must not conditionally fall back to profile in cleaning');
 if(!file.endsWith('[service].js'))assert.match(page,/cardOnly mode="profile"/,file+' must show profile on parent hub');
}
for(const locale of ['ar','en']){
 const prefix=locale==='en'?'pages/en/':'pages/';
 for(const suffix of ['[district]/[category].js','[district]/[category]/[service].js','[district]/[category]/[service]/[provider].js']){
  const f=prefix+'uae/abu-dhabi/al-ain/'+suffix;
  const src=read(f);
  assert.match(src,/params\.district==='cleaning-services'/,f);
  assert.match(src,/params\.category===AL_NAEEM_SLUG/,f);
  assert.match(src,/getGeographicNaeemContextProps/,f);
  assert.match(src,/props\.alNaeemContext/,f);
 }
}
console.log('Sector discovery and Al Naeem geographic cards: PASS — optimized WebP, HTML-first More, valid contextual company/services, and bilingual Al Ain routing.');
