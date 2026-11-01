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
 for (const localePath of ['al-jimi','al-hili','al-muwaiji','al-markhaniah'])assert.ok(!model.includes(localePath));
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
