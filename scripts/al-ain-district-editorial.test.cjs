const { test } = require('node:test');
const assert = require('node:assert/strict');
const editorial = require('../data/alAinDistrictEditorial.json');
const { AREAS } = require('../data/localServices');

test('district introductions use existing area slugs and keep the approved Al Aamerah name', () => {
  const slugs = new Set(AREAS.map(area => area.slug));
  assert.equal(Object.keys(editorial.areas).length, 18);
  assert.match(editorial.areas['al-yahar'].ar, /العامرة/);
  for (const [slug, value] of Object.entries(editorial.areas)) {
    assert.ok(slugs.has(slug), `${slug} must be an existing area`);
    assert.ok(value.ar && value.en, `${slug} requires both languages`);
  }
  assert.equal(new Set(Object.values(editorial.areas).map(area => area.ar)).size, 18);
  assert.equal(new Set(Object.values(editorial.areas).map(area => area.en)).size, 18);
});

test('Al Hili has eight bilingual topic indexes with no duplicate titles', () => {
  assert.equal(Object.keys(editorial.hiliSectors).length, 8);
  for (const [slug, sector] of Object.entries(editorial.hiliSectors)) {
    assert.ok(sector.ar && sector.en, `${slug} requires an introduction in both languages`);
    assert.equal(sector.topics.length, 17, slug);
    for (const language of ['ar', 'en']) {
      const titles = sector.topics.map(topic => topic[`title_${language}`]);
      assert.ok(titles.every(Boolean), `${slug}: missing ${language} title`);
      assert.equal(new Set(titles).size, 17, `${slug}: duplicate ${language} title`);
    }
  }
});

test('Every other existing Al Ain area has eight independently written bilingual sector contexts', async () => {
  const { AL_AIN_DISTRICT_SECTOR_CONTEXTS: contexts } = await import('../data/alAinDistrictSectorContexts.js');
  const expected = AREAS.filter(area => area.slug !== 'al-hili').map(area => area.slug);
  assert.deepEqual(new Set(Object.keys(contexts)), new Set(expected));
  const sentences = { ar: [], en: [] };
  for (const slug of expected) {
    assert.equal(Object.keys(contexts[slug]).length, 8, slug);
    for (const value of Object.values(contexts[slug])) for (const lang of ['ar', 'en']) {
      assert.ok(value[lang].length > 45, `${slug} missing ${lang} guidance`);
      sentences[lang].push(value[lang]);
    }
  }
  for (const lang of ['ar', 'en']) assert.equal(new Set(sentences[lang]).size, 136);
});

test('only the two supplied Arabic drafts are marked complete and have substantial text', () => {
  const complete = Object.entries(editorial.hiliSectors).flatMap(([slug, sector]) => sector.topics.filter(topic => topic.status === 'complete_ar_draft').map(topic => [slug, topic.number]));
  assert.deepEqual(complete, [['general-contracting', 1], ['general-contracting', 12]]);
  for (const article of Object.values(editorial.articlesAr)) assert.ok(article.trim().split(/\s+/).length >= 500);
});
