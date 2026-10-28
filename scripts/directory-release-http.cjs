const assert=require('node:assert/strict');
const origin=process.env.DIRECTORY_TEST_ORIGIN||'http://127.0.0.1:3103';
async function main(){
 for(const prefix of ['', '/en']){
  const r=await fetch(origin+prefix+'/providers');assert.equal(r.status,200);const html=await r.text();
  const cards=[...html.matchAll(/data-directory-company="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(cards.length,new Set(cards).size);for(const slug of ['alrehab-home-clean','al-naeem-cleaning-services','adwaa-makkah-cleaning'])assert.equal(cards.filter(x=>x==='/providers/'+slug).length,1,slug);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('https://bietalreef.ae'+prefix+'/providers'));console.log('Unique company cards and primary heading:',prefix||'ar',cards.length);
  for(const [old,target] of Object.entries({'cleaning-uae':'cleaning-services','maintenance-uae':'general-maintenance','furniture-uae':'furniture-decor','electrical-contractors-uae':'electrical','equipment-rental-uae':'equipment-rental','villa-renovation-uae':'finishing-works','providers/provider-2000029':'../providers/alrehab-home-clean'})){
   const expected=target.startsWith('..')?prefix+'/providers/alrehab-home-clean':prefix+'/categories/'+target;
   const redirect=await fetch(origin+prefix+'/'+old,{redirect:'manual'});assert.equal(redirect.status,308,old);assert.equal(new URL(redirect.headers.get('location'),origin).pathname,expected);
   const dest=await fetch(origin+expected);assert.equal(dest.status,200,expected);const body=await dest.text();assert.equal((body.match(/<h1[ >]/g)||[]).length,1,expected);
  }
 }
 const community=await fetch(origin+'/en/community');assert.equal(community.status,200);
 const sitemap=await (await fetch(origin+'/sitemap.xml')).text();const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.equal(locs.length,new Set(locs).size);assert.ok(!locs.some(x=>/\/(cleaning-uae|maintenance-uae|furniture-uae)$/.test(x)));console.log('Retired URLs redirect to working destinations; sitemap contains unique canonical URLs',locs.length);
}
main().catch(e=>{console.error(e);process.exitCode=1});
