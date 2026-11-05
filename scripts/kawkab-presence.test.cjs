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
 const { AREAS } = require('../data/localServices');
 for (const area of ['al-jimi','al-hili','al-muwaiji','al-markhaniya'])assert.ok(AREAS.some(item=>item.slug===area));
 assert.match(model,/KAWKAB_AL_AIN_AREAS = Object\.freeze\(AREAS\.map/);
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
test('existing directory integrates partner, service and Al Ain district links',()=>{
 const routes=read('lib/localRouteProps.js');
 const data=read('lib/localProviderData.js');
 const hub=read('components/AlAinHubPage.js');
 assert.match(routes,/maintenanceArea:true/);
 assert.match(routes,/segments\[1\]===\x27general-maintenance\x27/);
 assert.match(data,/kawkabServiceGroup/);
 assert.match(hub,/general-maintenance/);
 assert.match(read('pages/partners.js'),/featuredPartner/);
 assert.match(read('pages\/en\/partners.js'),/featuredPartner/);
 assert.match(read('pages\/sitemap.xml.js'),/providerCards\.some\(card => card\.id === KAWKAB_PROFILE_ID\)/);
});
test('mobile summary and full desktop text rendered within SSR HTML',()=>{
 assert.match(component,/md:hidden/);
 assert.match(component,/hidden max-w-4xl[^"\n]*md:block/);
 const service=read('components/KawkabServicePage.js');
 assert.match(service,/md:hidden/);assert.match(service,/hidden text-base/);
});

test('every listed district preserves selected service in Arabic and English',()=>{
 const district=read('components/AlAinMaintenanceAreaPage.js');
 const service=read('components/KawkabServicePage.js');
 const routes=read('lib/localRouteProps.js');
 const { AREAS } = require('../data/localServices');
 assert.ok(AREAS.length >= 15);
 assert.equal(new Set(AREAS.map(area=>area.slug)).size, AREAS.length);
 assert.match(model,/KAWKAB_AL_AIN_AREAS = Object\.freeze\(AREAS\.map/);
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
 assert.match(component,/<picture className="block w-full[^\"]*">/);
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

test('sitemap includes eligible company services and excludes unreviewed district permutations',()=>{
 const sitemap=read('pages/sitemap.xml.js');
 assert.match(sitemap,/verification_status=eq\.verified&publication_status=eq\.published&landing_page_status=eq\.published/);
 assert.match(sitemap,/providerCards\.some\(card => card\.id === KAWKAB_PROFILE_ID\)/);
 assert.match(sitemap,/KAWKAB_SPECIALTIES\.forEach\(service => addPair/);
 assert.match(sitemap,/kawkabServicePath\('ar',service\.id\), kawkabServicePath\('en',service\.id\)/);
 assert.doesNotMatch(sitemap,/KAWKAB_AL_AIN_AREAS\.forEach/);
 const hub=read('pages/services/[slug].js');
 assert.match(hub,/دليل الصيانة حسب مناطق العين/);
 assert.match(hub,/KAWKAB_AL_AIN_AREAS\.map/);
});

test('company-owned mobile contact actions replace platform support on Kawkab landing routes',()=>{
 const app=read('pages/_app.js');
 const profile=read('components/provider/KawkabPresencePage.js');
 const service=read('components/KawkabServicePage.js');
 const district=read('components/AlAinMaintenanceAreaPage.js');
 const bar=read('components/provider/KawkabMobileContactBar.js');
 assert.match(app,/!isCompanyLanding && !isKawkabDistrictLanding/);
 assert.match(app,/isProviderProfile && !/);
 assert.match(bar,/className="fixed inset-x-0 bottom-0/);
 assert.match(bar,/kawkabWhatsapp\(locale, service\)/);
 assert.match(bar,/tel:/);
 assert.match(profile,/<KawkabMobileContactBar locale=\{lang\}/);
 assert.match(service,/<KawkabMobileContactBar locale=\{d\} service=\{service\[d\]\}/);
 assert.match(district,/<KawkabMobileContactBar locale=\{locale\}/);
});
test('provider hero is cover first, right-side RTL avatar second, then compact mobile title and desktop description',()=>{
 const page=read('components/provider/KawkabPresencePage.js');
 const hero=page.split('<header className="bg-[#fbfaf7]">')[1]?.split('</header>')[0] || '';
 assert.ok(hero.indexOf('<picture') < hero.indexOf('src={KAWKAB_LOGO.url}'));
 assert.ok(hero.indexOf('src={KAWKAB_LOGO.url}') < hero.indexOf('<h1'));
 assert.match(hero,/flex items-start gap-3/);
 assert.match(hero,/md:block/);
 assert.match(hero,/md:hidden/);
});
test('Kawkab service photos use verified relevant portfolio media and do not invent plumbing or AC works',()=>{
 const visual=read('components/provider/KawkabServiceVisual.js');
 const presence=read('components/provider/KawkabPresencePage.js');
 assert.match(visual,/KAWKAB_SERVICE_MEDIA\[serviceId\]/);
 assert.match(visual,/KAWKAB_LOGO.url/);
 assert.match(presence,/KawkabServiceCoverGallery/);
 assert.match(presence,/function Faq\(\{locale\}\)/);
 assert.match(read('components/KawkabServicePage.js'),/id="service-faq"/);
});

test('Kawkab cover enforces full image width even if utility style is unavailable',()=>{
 const page=read('components/provider/KawkabPresencePage.js');
 assert.match(page,/width:"100%",height:"auto",minHeight:"160px"/);
 assert.match(page,/src=\{KAWKAB_HERO.url\}/);
});
test('global PWA install prompt never covers company-owned mobile contact bar',()=>{
 const page=read('pages/_app.js');
 assert.match(page,/!isCompanyLanding && !isKawkabDistrictLanding && <PwaInstallPrompt/);
});

test('emirate links keep visitor on Kawkab profile, not generic directories',()=>{
 const page=read('components/provider/KawkabPresencePage.js');
 const model=read('lib/kawkabPresence.js');
 const section=page.split('function Areas(')[1].split('function Gallery(')[0];
 assert.match(section,/kawkabPath\(locale,'home','\/uae\/abu-dhabi'\)/);
 assert.match(section,/kawkabEmiratePath\(locale,area.slug\)/);
 assert.doesNotMatch(section,/area.directory/);
 assert.match(model,/export function kawkabEmiratePath/);
 const ar=read('pages/providers/kawkab-al-saeed/service-areas/[emirate].js');
 const en=read('pages/en/providers/kawkab-al-saeed/service-areas/[emirate].js');
 assert.match(ar,/getStaticPaths/);assert.match(en,/getStaticPaths/);
 assert.match(ar,/getStaticProps/);assert.match(en,/getStaticProps/);
 assert.match(read('components/provider/KawkabEmiratePage.js'),/KawkabMobileContactBar/);
 assert.match(read('components/provider/KawkabEmiratePage.js'),/hrefLang="en-AE"/);
});
test('three related interior images form one project, nine others become service covers',()=>{
 const model=read('lib/kawkabPresence.js');
 const page=read('components/provider/KawkabPresencePage.js');
 const project=read('components/provider/KawkabProjectPage.js');
 const sections=read('components/provider/KawkabPortfolioSections.js');
 assert.match(model,/\['project-01','project-02','project-03'\]/);
 assert.match(model,/image.id === 'project-04'/);
 assert.match(model,/export const KAWKAB_PROJECT/);
 assert.match(model,/export const KAWKAB_SERVICE_COVERS/);
 assert.match(sections,/function KawkabProjectShowcase/);
 assert.match(sections,/function KawkabServiceCoverGallery/);
 assert.match(project,/project.images.map/);
 assert.match(page,/KawkabProjectShowcase/);
 assert.match(page,/KawkabServiceCoverGallery/);
 const xml=read('public/sitemaps/kawkab-al-saeed.xml');
 assert.equal((xml.match(/<loc>/g)||[]).length,30);
 assert.match(xml,/projects\/living-dining-interior/);
 for(const emirate of ['abu-dhabi','dubai','sharjah']){
   assert.match(xml,new RegExp('service-areas/'+emirate));
 }
});
test('Al Aamerah display name is corrected while old URL slug is preserved until authenticated admin database change',()=>{
 const model=read('lib/kawkabPresence.js');
 const data=read('data/localServices.js');
 assert.match(model,/KAWKAB_AL_AIN_AREAS = Object\.freeze\(AREAS\.map/);
 assert.match(data,/\['al-yahar', 'العامرة', 'Al Aamerah'\]/);
 assert.equal(require('../data/localServices').AREAS.find(area=>area.slug==='al-yahar').nameAr,'العامرة');
});
