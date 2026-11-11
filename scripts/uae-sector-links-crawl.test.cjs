const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');

test('all eight UAE cards have crawlable canonical links before picking an emirate',()=>{
 const page=read('components/DirectoryLandingPage.js');
 const discovery=read('data/directoryDiscovery.js');
 const card=read('components/DirectoryUaeSectorCard.js');
 assert.match(page,/const hrefFor=c=>discoveryPath\(\{locale,emirate,city,sector:c\.slug\}\)/);
 assert.doesNotMatch(page,/mode==='uae'&&!emirate\)\?null/);
 assert.match(discovery,/if\(!emirate\)return sector\?/);
 assert.match(card,/<h3><Action item=\{sector\}>/);
 assert.match(card,/<Action item=\{sector\} className=\{\x60\$\{s\.textLink\}/);
 assert.match(page,/const scopedSectors=UAE_MAIN_SECTORS;/);
});
