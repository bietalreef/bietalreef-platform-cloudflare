import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { EMIRATE_LABELS, EMIRATE_SECTOR_CONTEXTS, EMIRATE_SECTOR_ORDER } from '../data/emirateSectorContexts.js';
import { EMIRATE_TOPIC_ANSWERS } from '../data/emirateTopicAnswers.js';
import { EMIRATE_LANDING_CONTENT } from '../data/emirateLandingContent.js';
import { emirateTopicTitle } from '../lib/emirateTopicTitle.js';
const index=JSON.parse(fs.readFileSync(new URL('../data/abuDhabiChapterIndex.json',import.meta.url),'utf8'));
const modes=['dubai','sharjah','ajman','ras-al-khaimah','umm-al-quwain','fujairah'];

test('six emirates have eight original bilingual contexts and local FAQs',()=>{
 const ar=[],en=[];
 for(const mode of modes){
  assert.equal(EMIRATE_SECTOR_CONTEXTS[mode].length,8,mode);
  assert.ok(EMIRATE_LANDING_CONTENT[mode].description.ar.length>80);
  assert.ok(EMIRATE_LANDING_CONTENT[mode].description.en.length>80);
  assert.equal(EMIRATE_LANDING_CONTENT[mode].faq.length,3);
  for(const pair of EMIRATE_SECTOR_CONTEXTS[mode]){assert.ok(pair[0].length>100&&pair[1].length>100,mode);ar.push(pair[0]);en.push(pair[1])}
 }
 assert.equal(new Set(ar).size,48);assert.equal(new Set(en).size,48);
});

test('all eight specialties contain 17 bilingual, substantive practical answers',()=>{
 for(const slug of EMIRATE_SECTOR_ORDER){
  const topics=index.items[slug], answers=EMIRATE_TOPIC_ANSWERS[slug];
  assert.equal(topics.length,17,slug);assert.equal(answers.length,17,slug);
  assert.equal(new Set(topics.map(t=>t.arTitle)).size,17,slug+' Arabic titles');
  for(const [ar,en] of answers){assert.ok(ar.length>60,slug+' Arabic');assert.ok(en.length>60,slug+' English');}
 }
});

test('all five illustrative guide scenes have their three responsive WebP sizes',()=>{
 for(const scene of ['consultation','site-review','compare-quotes','handover','digital-workflow'])for(const size of ['small','medium','large']){
  const path=new URL(`../public/images/emirate-guide-2026/${scene}-${size}.webp`,import.meta.url);
  assert.ok(fs.existsSync(path),path.pathname);assert.ok(fs.statSync(path).size<160000,path.pathname);
 }
});

test('emirate landing changes preserve existing knowledge entries and use the same paths',()=>{
 const component=fs.readFileSync(new URL('../components/DirectoryLandingPage.js',import.meta.url),'utf8');
 const knowledge=fs.readFileSync(new URL('../components/EmirateKnowledge.js',import.meta.url),'utf8');
 assert.match(component,/DirectoryEmirateSectorCard/);
 assert.match(component,/destinations\.map\(area=>/);
 assert.match(knowledge,/section\.blocks\.map/);
 assert.match(knowledge,/references\[mode\]/);
});

test('topic titles do not leak Abu Dhabi or its cities into other emirates',()=>{
 for(const mode of modes)for(const sector of EMIRATE_SECTOR_ORDER)for(const topic of index.items[sector]){
  const ar=emirateTopicTitle(topic.arTitle,mode,'ar');const en=emirateTopicTitle(topic.enTitle,mode,'en');
  assert.doesNotMatch(ar,/أبوظبي|والعين والظفرة/,`${mode} ${topic.id}`);
  assert.doesNotMatch(en,/Abu Dhabi|Al Ain|Al Dhafra|three emirate regions/i,`${mode} ${topic.id}`);
 }
});
