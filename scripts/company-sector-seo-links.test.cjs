const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

test('national and UAE directory expose crawlable canonical company discovery links', () => {
 const main=read('components/DirectoryLandingPage.js');
 const national=read('components/NationalServiceSectorPage.js');
 const directory=read('components/ProviderSpecialtyView.js');
 assert.ok(main.includes("/providers/specialty/\${item.slug}"), 'eight sector routes appear in server-rendered HTML');
 assert.ok(main.includes("شركات تنظيف"), 'search intent names actual cleaning company directory');
 assert.ok(national.includes("/providers/specialty/\${sector.slug}"), 'national sector guides link to published company directories');
 assert.ok(directory.includes("approvedSector&&<Link"), 'company directories link to national service guide');
});

test('geographic company pages link to canonical company profile without changing provider approval', () => {
 const provider=read('components/provider/PublishedCompanyPresencePage.js');
 const naeem=read('components/provider/AlNaeemPresencePage.js');
 assert.ok(provider.includes("route.contextBase&&<p"), 'approved company geographic pages provide a direct profile link');
 assert.ok(provider.includes("href={companyPath(slug,locale)}"));
 assert.ok(naeem.includes("href={alNaeemPath(locale,{kind:'home'})}"));
 assert.ok(provider.includes("const canonical=origin+relative;"), 'canonical remains source of truth');
 assert.ok(naeem.includes('content="index,follow"'), 'editorial page keeps its existing index rule');
});
