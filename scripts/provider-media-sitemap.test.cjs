const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const cards=read('lib/platformDirectoryCards.js');
const sitemap=read('pages/sitemap.xml.js');
const rehabCover='/images/providers/alrehab/account-cover.webp';
const rehabAvatar='/images/providers/alrehab/account-avatar.webp';
for(const image of [rehabCover,rehabAvatar]){
  assert.ok(fs.existsSync(path.join(__dirname,'../public',image)),'missing approved local image '+image);
  assert.ok(cards.split(image).length-1>=2,'published provider cards need both local mappings '+image);
}
assert.ok(cards.split("profile.slug === 'alrehab-home-clean'").length-1>=4,'all provider card variants need local rehab media');
assert.ok(sitemap.includes('provider.coverImage || provider.logoImage'),'sitemap must emit approved provider cover');
assert.ok(sitemap.includes("slug === 'alrehab-home-clean'") || sitemap.includes("company.slug === 'alrehab-home-clean'"),'do not duplicate legacy Al Rehab sitemap records');
assert.ok(sitemap.includes("escapeXml(image)"),'sitemap XML image URLs must be escaped');
console.log('SEO images: local approved Al Rehab cover/avatar mapped into provider directory and image sitemap: PASS.');
