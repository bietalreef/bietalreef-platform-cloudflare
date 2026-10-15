const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const [locale,file]of [['ar','index'],['en','en']])test(`project discovery ${locale}: real navigation, one H1 and canonical language contracts`,()=>{
  const html=fs.readFileSync(`.next/server/pages/${file}.html`,'utf8');
  const prefix=locale==='en'?'/en':'';
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.ok(html.includes('id="service-discovery"'));
  assert.ok(html.includes(`href="${prefix}/uae/abu-dhabi/al-ain"`));
  assert.ok(html.includes(`href="${prefix}/providers"`));
  assert.ok(html.includes('https://providers.bietalreef.ae/'));
  assert.ok(html.includes('https://app.bietalreef.ae/'));
  assert.ok(html.includes(`href="https://bietalreef.ae${prefix}"`));
  for(const language of ['ar-AE','en-AE','x-default'])assert.ok(html.toLowerCase().includes(`hreflang="${language.toLowerCase()}"`));
  assert.ok(html.includes(locale==='ar'?'يتبع صلاحية ومراجعة كل قناة':'each channel’s permissions and review'));
  assert.ok(!html.includes('بيت الريف لا يضعك في قائمة أسماء فقط'));
});
