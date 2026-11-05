import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AL_AIN_SECTOR_TOPICS } from '../data/alAinSectorTopicIndex.js';
import { AL_AIN_SECTOR_INTRODUCTIONS } from '../data/alAinSectorIntroductions.js';
import { AL_AIN_SECTOR_DETAILS } from '../data/alAinSectorDetails.js';
import { AL_AIN_CITY_EDITORIAL } from '../data/alAinCityEditorial.js';
import { AL_AIN_KNOWLEDGE } from '../data/alAinKnowledge.js';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery.js';
import { UAE_KNOWLEDGE_ASSETS, UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals.js';

test('Al Ain has seventeen distinct planned topics and introductions per sector in each language', () => {
  assert.equal(UAE_MAIN_SECTORS.length, 8);
  for (const sector of UAE_MAIN_SECTORS) {
    const topics = AL_AIN_SECTOR_TOPICS[sector.slug];
    const intro = AL_AIN_SECTOR_INTRODUCTIONS[sector.slug];
    assert.ok(UAE_SECTOR_ASSETS[sector.slug], `missing image for ${sector.slug}`);
    for (const locale of ['ar', 'en']) {
      assert.equal(topics?.[locale]?.length, 17, `${sector.slug} ${locale}`);
      assert.equal(new Set(topics[locale]).size, 17, `${sector.slug} ${locale}`);
      assert.ok(intro?.[locale]?.length >= 3, `${sector.slug} ${locale}`);
      assert.ok(intro[locale].every(text => text.length > 100), `${sector.slug} ${locale}`);
      assert.equal(AL_AIN_SECTOR_DETAILS[sector.slug]?.[locale]?.length, 3, `${sector.slug} ${locale} details`);
    }
  }
});

test('Al Ain has original city guidance and eight bilingual illustrated reading topics', () => {
  for (const locale of ['ar', 'en']) {
    const city = AL_AIN_CITY_EDITORIAL[locale];
    assert.ok(city.sections.length >= 6);
    assert.ok(city.sections.flatMap(section => section.paragraphs).join(' ').trim().split(/\s+/).length >= 500);
    assert.equal(AL_AIN_KNOWLEDGE.length, 8);
    for (const topic of AL_AIN_KNOWLEDGE) {
      assert.ok(UAE_KNOWLEDGE_ASSETS[topic.id], topic.id);
      assert.ok(topic[locale].title && topic[locale].summary && topic[locale].paragraphs.length >= 3, `${topic.id} ${locale}`);
      assert.match(topic.href, /^\/(?:uae\/abu-dhabi\/al-ain|request-quote)/);
    }
  }
});
