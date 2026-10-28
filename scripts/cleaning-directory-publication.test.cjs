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

test('Local sitemap requires platform-channel source evidence, not unpublished Flutter service flag',()=>{
 const gate=read('lib/localServices.js');
 assert.match(gate,/item\.provenance === 'platform_content_cards'/);
 assert.doesNotMatch(gate,/item\.provenance === 'provider_services'/);
});

test('Discount offers stay in the platform publication channel and carry bilingual navigation',()=>{
 const loader=read('lib/platformPublishedServiceCards.js');
 const card=read('components/provider/PublishedCompanyPresencePage.js');
 const grid=read('components/PublishedOfferGrid.js');
 const directory=read('pages/services.js');
 const enDirectory=read('pages/en/services.js');
 assert.match(loader,/getPlatformChannelOfferCards/);
 assert.match(loader,/cardType==='offer'\?'offers':'services'/);
 assert.match(loader,/c\.content\.channel!=='platform'/);
 assert.match(card,/item\.discount_percent===10/);
 assert.match(card,/detail\.linked_service_slug/);
 assert.match(grid,/discountPercent===10/);
 assert.match(directory,/PublishedOfferGrid/);
 assert.match(enDirectory,/PublishedOfferGrid/);
});

test('Platform image isolation: publication-only cover and original account avatar',()=>{
 const loader=read('lib/publishedCompanyPresence.js');
 const site=read('components/provider/PublishedCompanyPresencePage.js');
 const cards=read('lib/platformPublishedServiceCards.js');
 const offers=read('components/PublishedOfferGrid.js');
 assert.match(loader,/platformCoverCard/);
 assert.match(loader,/row\.content\?\.media_attribution/);
 assert.match(loader,/profile:platformProfile/);
 assert.match(site,/cover_media_is_illustrative/);
 assert.match(site,/صورة توضيحية/);
 assert.match(site,/image_attribution/);
 assert.match(cards,/imageIllustrative/);
 assert.match(offers,/Illustrative photo/);
});
