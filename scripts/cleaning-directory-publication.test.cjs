const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = file => fs.readFileSync(require('node:path').join(__dirname,'..',file),'utf8');

test('Local city guide reads the same platform-approved service relations as public company landing pages',()=>{
 const src=read('lib/localProviderData.js');
 assert.match(src,/platform_content_cards\?select=/);
 assert.match(src,/card_type=eq\.service&status=eq\.published/);
 assert.match(src,/landing_page_status=eq\.published/);
 assert.match(src,/activeAccount\[row\.id\]/);
 assert.match(src,/platform_content_cards'/);
 assert.doesNotMatch(src,/provider_services\?select=/);
});
test('No phantom specialized providers when a cleaning service has zero verified matches',()=>{
 const model=read('lib/alAinCleaningModel.js'), page=read('components/AlAinCleaningPage.js');
 assert.match(model,/relatedProviders = service && !selected\.length/);
 assert.match(model,/indexable:selected\.length>0/);
 assert.match(page,/لا توجد حاليًا بطاقة خدمة منشورة/);
});
test('Local villa guide is not branded as one individual provider',()=>{
 const s=read('data/alAinCleaningGuide.js');
 assert.doesNotMatch(s,/slug:'home-villa-cleaning'[^\n]*image:'\/images\/providers\/alrehab\/account-cover\.webp'/);
});
test('Public company detail uses bilingual approved SEO data, not synthetic fixed copy',()=>{
 const loader=read('lib/publishedCompanyPresence.js'), p=read('components/provider/PublishedCompanyPresencePage.js');
 assert.match(loader,/seo:row\.content\?\.seo/);
 assert.match(p,/detailSeo\.checklist/);
 assert.match(p,/detailSeo\.faqs/);
 assert.match(p,/rel="canonical"/);
});
