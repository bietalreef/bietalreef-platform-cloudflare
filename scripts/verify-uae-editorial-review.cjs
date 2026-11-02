// Review-only quality checks for collected UAE directory editorial files.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../content/editorial-review-2026-11-02');
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);
for(const [name,count] of Object.entries({emirates:16,areas:50,gsc:44})){
 const files=walk(path.join(root,name)).filter(x=>x.endsWith('.md'));
 assert.equal(files.length,count,name+' source documents');
 for(const file of files){
  const s=fs.readFileSync(file,'utf8');
  if(name!=='gsc')assert.equal((s.match(/^# /gm)||[]).length,1,file+' H1');
  if(name==='gsc')assert.match(s,/NOT APPROVED/,file+' GSC publication gate');
  if(name==='areas')assert.match(s,/publication_gate:/,file+' area review gate');
  if(name==='emirates')assert.match(s,/existing_path:/,file+' original URL');
 }
}
const landing=fs.readFileSync(path.resolve(__dirname,'../components/DirectoryLandingPage.js'),'utf8');
assert.doesNotMatch(landing,/noIndex=\{!otherEmirate\}/,'accidental noindex');
assert.doesNotMatch(landing,/href="#find"/,'finder should not mutate URL fragments');
assert.match(landing,/DirectoryExpertEditorial/,'editorial component mounted');
const editorial=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/uaeExpertEditorial.json'),'utf8'));
for(const slug of ['uae','abu-dhabi','dubai','sharjah','ajman','umm-al-quwain','ras-al-khaimah','fujairah']){
 assert.ok(editorial[slug]?.ar?.length,'Arabic content '+slug);
 assert.ok(editorial[slug]?.en?.length,'English content '+slug);
}
console.log('PASS: 110 editorial source files, publication gates, 8 bilingual pages, direct directory SEO checks');
