const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const src=fs.readFileSync(path.join(root,'lib/platformPublishedServiceCards.js'),'utf8');
const approved=fs.readFileSync(path.join(root,'lib/rehabServiceImages.js'),'utf8');
assert.match(src,/provider\.slug === 'alrehab-home-clean'/);
assert.match(src,/rehabServiceImage\(cardType === 'offer'/);
assert.match(src,/image:cardImage,/);
assert.match(src,/imageMobile:cardImageMobile,/);
assert.match(src,/providerLogo:isRehab \? REHAB_ACCOUNT_AVATAR/);
assert.match(src,/REHAB_ACCOUNT_COVER/);
for(const slug of [
'sofa-cleaning','home-villa-cleaning','facade-glass-cleaning','sanitization-pest-control',
'deep-cleaning','post-construction-cleaning','pre-move-in-cleaning','carpet-rug-cleaning',
'majlis-cleaning','courtyard-parking-cleaning'
]){
 assert.ok(approved.includes("'"+slug+"'"),'approved service slug '+slug);
 for(const mode of ['desktop','mobile']){
  assert.ok(fs.existsSync(path.join(root,'public/images/providers/alrehab/services/alrehab-home-clean-'+slug+'-'+mode+'.webp')),'missing approved '+slug+' '+mode);
 }
}
for(const part of ['account-avatar.webp','account-cover.webp'])
 assert.ok(fs.existsSync(path.join(root,'public/images/providers/alrehab',part)),'missing approved company artwork '+part);
console.log('Al Rehab platform-channel service-card images: PASS — legacy Drive URLs replaced with existing approved WebP per service.');
