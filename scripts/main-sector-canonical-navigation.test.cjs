const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../components/MainSectorCards.js'),'utf8');
const knowledge = fs.readFileSync(path.join(__dirname,'../components/DirectoryKnowledge.js'),'utf8');

test('main sector cards always use the approved eight sector slugs',()=>{
  assert.match(source,/CATEGORY_SLUGS = Object\.fromEntries\(/);
  assert.match(source,/UAE_MAIN_SECTORS\.map\(sector => \[sector\.slug, \[sector\.slug\]\]\)/);
  assert.doesNotMatch(source,/\['engineering-consultants', 'interior-design'\]/);
  assert.doesNotMatch(source,/\['aluminium-glass', 'workshops', 'carpentry'\]/);
  assert.match(source,/const richHref=\(en\?'\/en\/categories\/':'\/services\/'\)\+sector\.slug/);
  assert.match(knowledge,/href: '\/providers\/specialty\/interior-design'/);
  assert.match(knowledge,/href: '\/en\/providers\/specialty\/interior-design'/);
  assert.doesNotMatch(knowledge,/href: '\/(en\/)?providers\/specialty\/engineering-consultants'/);
});
