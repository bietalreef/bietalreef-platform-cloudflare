import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery.js';
import { PROVIDER_SECTOR_EDITORIAL } from '../data/providerSectorEditorial.js';
import { PROVIDER_SPECIALTY_GUIDES } from '../data/providerSpecialtyGuides.js';
import { PROVIDER_SELECTION_GUIDES } from '../data/providerSelectionGuides.js';
import { providerDirectorySchema } from '../lib/providerDirectorySeo.js';
import { companyCardFromPresence } from '../lib/directoryCompanyCards.js';

test('all eight company sectors have specific bilingual reading content', () => {
  assert.equal(UAE_MAIN_SECTORS.length, 8);
  for (const sector of UAE_MAIN_SECTORS) for (const locale of ['ar', 'en']) {
    const guide = PROVIDER_SECTOR_EDITORIAL[sector.slug]?.[locale];
    assert.ok(guide && guide.intro.length > 60, `${sector.slug} ${locale}`);
    assert.equal(guide.sections.length, 4, `${sector.slug} ${locale}`);
    assert.equal(new Set(guide.sections.map(([heading]) => heading)).size, 4);
    for (const [heading, paragraph] of guide.sections) assert.ok(heading.length > 8 && paragraph.length > 80, `${sector.slug} ${locale}`);
  }
});

test('specialty guidance covers every unique destination linked by the eight cards', () => {
  const slugs = ['general-contracting','engineering-consultants','interior-design','general-maintenance','finishing-works','building-materials','workshops','aluminium-glass','carpentry','furniture-decor','equipment-rental','cleaning-services'];
  for (const slug of slugs) for (const locale of ['ar','en']) {
    const paragraphs = PROVIDER_SPECIALTY_GUIDES[slug]?.[locale];
    assert.equal(paragraphs?.length, 3, `${slug} ${locale}`);
    for (const paragraph of paragraphs) assert.ok(paragraph.length > 70, `${slug} ${locale}`);
  }
});

test('selection guides keep complete bilingual content and official sources', () => {
  assert.equal(PROVIDER_SELECTION_GUIDES.length, 3);
  for (const guide of PROVIDER_SELECTION_GUIDES) {
    for (const locale of ['ar','en']) {
      assert.equal(guide[locale].paragraphs.length, 3);
      assert.ok(guide[locale].alt && guide[locale].summary);
    }
    for (const [, , href] of guide.sources) assert.match(href, /^https:\/\/(?:u\.ae|pages\.dmt\.gov\.ae)\//);
    for (const size of ['small','medium','large']) assert.ok(fs.existsSync(new URL(`../public/images/emirate-guide-2026/${guide.image}-${size}.webp`,import.meta.url)));
  }
});

test('structured data lists only rendered local provider profiles', () => {
  const cards = [{name:'Example',href:'/en/providers/example'},{name:'',href:'/en/providers/missing'},{name:'External',href:'https://elsewhere.test'}];
  const schema = providerDirectorySchema(cards,'en');
  assert.equal(schema.url,'https://bietalreef.ae/en/providers');
  assert.equal(schema.mainEntity.numberOfItems,1);
  assert.equal(schema.mainEntity.itemListElement[0].item.url,'https://bietalreef.ae/en/providers/example');
  assert.equal(schema.mainEntity.itemListElement[0].item.name,'Example');
  assert.ok(!('address' in schema.mainEntity.itemListElement[0].item));
  assert.ok(!('aggregateRating' in schema.mainEntity.itemListElement[0].item));
});

test('Al Rehab cards do not assert unconfirmed nationwide coverage', () => {
  const data = {profile:{id:'1',slug:'alrehab-home-clean',name_ar:'الرحاب',short_description_ar:'تنظيف شامل في جميع أنحاء الإمارات.',name_en:'Al Rehab',short_description_en:'Cleaning across the UAE.',verification_status:'verified'}};
  assert.equal(companyCardFromPresence(data,'ar').summary,'تنظيف شامل.');
  assert.equal(companyCardFromPresence(data,'en').summary,'Cleaning.');
  assert.equal(companyCardFromPresence(data,'ar').verified,true);
});

test('the repeated universal promotional card is removed from the footer', () => {
  assert.ok(!fs.existsSync(new URL('../components/UniversalRequestCTA.js',import.meta.url)));
  assert.doesNotMatch(fs.readFileSync(new URL('../components/Footer.js',import.meta.url),'utf8'),/UniversalRequestCTA/);
});
