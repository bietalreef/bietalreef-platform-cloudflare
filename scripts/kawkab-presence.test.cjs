const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(base,p),'utf8');
const component=read('components/provider/KawkabPresencePage.js');
const model=read('lib/kawkabPresence.js');
const media=JSON.parse(fs.readFileSync(path.resolve(base,'data/provider-media/provider-3000485.json'),'utf8'));
test('canonical profile and area records do not fabricate a district',()=>{
 assert.match(model,/BR-3000485/); assert.match(model,/c93b1b94-4d2e-4736-b1de-37e5bc93afa2/);
 for (const emirate of ['abu-dhabi','dubai','sharjah'])assert.ok(model.includes(`slug:'${emirate}'`));
 for (const area of ['al-jimi','al-hili','al-muwaiji','al-markhaniya'])assert.ok(model.includes(area));
 assert.match(model,/KAWKAB_AL_AIN_AREAS/);
});
test('all 12 provider images have crawlable src, unique webp alt and captions',()=>{
 assert.equal(media.assets.length,12);
 assert.equal(new Set(media.assets.map(a=>a.url)).size,12);
 for(const item of media.assets){assert.match(item.url,/\.webp$/);assert.ok(item.alt_ar && item.alt_en && item.caption_ar && item.caption_en && item.width && item.height);}
 assert.match(component,/<img src=\{image.url\}/);
 assert.match(component,/loading=\{prefetch\?'eager':'lazy'\}/);
});
test('SEO: self canonical, hreflang pairs, JSON-LD and no doorway area pages',()=>{
 assert.match(component,/rel="canonical" href=\{currentUrl\}/);
 assert.match(component,/hrefLang="ar-AE"/);assert.match(component,/hrefLang="en-AE"/);
 assert.match(component,/application\/ld\+json/);
 assert.ok(!model.includes('areaSlug'));
});
test('mobile-first density and direct quote actions',()=>{
 assert.match(component,/grid-cols-2/);
 assert.match(model,/wa\.me\/971556485364/,'whatsapp URL should exist in source model');
});

test('company original identity replaces generated hero and logo in live components',()=>{
 assert.match(model,/kawkab-al-saeed-hero-cover\.webp/);
 assert.match(model,/kawkab-al-saeed-hero-cover-mobile\.webp/);
 assert.match(model,/kawkab-al-saeed-brand-logo\.webp/);
 assert.doesNotMatch(component,/KAWKAB_BRAND_GALLERY\.map/);
});
test('existing directory integrates partner, service and 15 Al Ain district links',()=>{
 const routes=read('lib/localRouteProps.js');
 const data=read('lib/localProviderData.js');
 const hub=read('components/AlAinHubPage.js');
 assert.match(routes,/maintenanceArea:true/);
 assert.match(routes,/segments\[1\]===\x27general-maintenance\x27/);
 assert.match(data,/kawkabServiceGroup/);
 assert.match(hub,/general-maintenance/);
 assert.match(read('pages/partners.js'),/featuredPartner/);
 assert.match(read('pages\/en\/partners.js'),/featuredPartner/);
 assert.match(read('pages\/sitemap.xml.js'),/KAWKAB_AL_AIN_AREAS\.forEach/);
});
test('mobile summary and full desktop text rendered within SSR HTML',()=>{
 assert.match(component,/md:hidden/);
 assert.match(component,/hidden max-w-xl/);
 const service=read('components/KawkabServicePage.js');
 assert.match(service,/md:hidden/);assert.match(service,/hidden text-base/);
});

test('every listed district preserves selected service in Arabic and English',()=>{
 const district=read('components/AlAinMaintenanceAreaPage.js');
 const service=read('components/KawkabServicePage.js');
 const routes=read('lib/localRouteProps.js');
 const areaRows=model.split('export const KAWKAB_AL_AIN_AREAS')[1].split(']);')[0];
 assert.equal((areaRows.match(/\{slug:'/g)||[]).length,15);
 assert.match(model,/export function kawkabAreaServicePath/);
 assert.match(model,/\$\{locale==='en'\?'\/en':''\}\/uae\/abu-dhabi\/al-ain\/\$\{district\}\/general-maintenance\/\$\{service\}/);
 assert.match(routes,/segments\.length===3/);
 assert.match(routes,/KAWKAB_SPECIALTIES\.find/);
 assert.match(district,/kawkabAreaServicePath\(locale,area\.slug,service\.id\)/);
 assert.match(district,/kawkabAreaServicePath\(locale,a\.slug,selectedService\.id\)/);
 assert.match(service,/kawkabAreaServicePath\(d,area\.slug,serviceId\)/);
 assert.match(district,/const canon=KAWKAB_ORIGIN\+path/);
});

test('hero has full-width block picture and intrinsic image height on mobile and desktop',()=>{
 assert.match(component,/<picture className="block w-full">/);
 assert.match(component,/style=\{\{display:"block",width:"100%",height:"auto"/);
 assert.match(component,/KAWKAB_HERO\.mobile_url/);
});
test('general-maintenance services page links to published Kawkab profile and all trades',()=>{
 const page=read('pages/services/[slug].js');
 assert.match(page,/function KawkabMaintenanceSection/);
 assert.match(page,/KAWKAB_SPECIALTIES\.map/);
 assert.match(page,/kawkabServicePath\('ar',specialty\.id\)/);
 assert.match(page,/isGeneralMaintenance \? <KawkabMaintenanceSection\/>/);
 assert.match(page,/!isGeneralMaintenance/);
});
test('desktop exposes detailed content and mobile offers compact disclosure',()=>{
 assert.match(component,/WORK_NOTES/);
 assert.match(component,/function DetailedCompanyGuide/);
 assert.match(component,/<details className="mt-2/);
 const page=read('pages/services/[slug].js');
 assert.match(page,/className="mt-6 hidden md:block"/);
 assert.match(page,/<details className="mt-3/);
 assert.match(read('components/SectionCategoryHero.js'),/compactMobile/);
});

test('the live sitemap contains all 15 districts times six specialty routes in both languages',()=>{
 const sitemap=read('pages/sitemap.xml.js');
 assert.match(sitemap,/kawkabAreaServicePath/);
 assert.match(sitemap,/KAWKAB_AL_AIN_AREAS\.forEach\(area =>/);
 assert.match(sitemap,/KAWKAB_SPECIALTIES\.forEach\(service => addPair/);
 assert.match(sitemap,/kawkabAreaServicePath\('ar',area\.slug,service\.id\)/);
 assert.match(sitemap,/kawkabAreaServicePath\('en',area\.slug,service\.id\)/);
 const hub=read('pages/services/[slug].js');
 assert.match(hub,/دليل الصيانة حسب مناطق العين/);
 assert.match(hub,/KAWKAB_AL_AIN_AREAS\.map/);
});
