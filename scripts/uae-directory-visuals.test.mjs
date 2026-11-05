import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { UAE_SECTOR_ASSETS, UAE_KNOWLEDGE_ASSETS } from '../data/uaeDirectoryVisuals.js';
import { UAE_SECTOR_GUIDES_AR } from '../data/uaeSectorGuidesAr.js';
import { UAE_SECTOR_GUIDES_EN } from '../data/uaeSectorGuidesEn.js';
import { UAE_EMIRATE_GUIDES_AR } from '../data/uaeEmirateGuidesAr.js';
import { UAE_EMIRATE_GUIDES_EN } from '../data/uaeEmirateGuidesEn.js';

test('every directory topic has distinct bilingual image descriptions and responsive assets', () => {
  assert.equal(Object.keys(UAE_SECTOR_ASSETS).length, 8);
  assert.equal(Object.keys(UAE_KNOWLEDGE_ASSETS).length, 8);
  for (const group of [UAE_SECTOR_ASSETS, UAE_KNOWLEDGE_ASSETS]) {
    assert.equal(new Set(Object.values(group).map(item => item.alt.ar)).size, 8);
    assert.equal(new Set(Object.values(group).map(item => item.alt.en)).size, 8);
    const hashes = new Set();
    for (const item of Object.values(group)) {
      for (const size of ['small', 'tablet', 'desktop']) {
        const file = path.join(process.cwd(), 'public', item[size]);
        assert.ok(fs.existsSync(file), file);
        assert.ok(fs.statSync(file).size > 1000 && fs.statSync(file).size < 250000, file);
      }
      hashes.add(crypto.createHash('sha256').update(fs.readFileSync(path.join(process.cwd(), 'public', item.desktop))).digest('hex'));
    }
    assert.equal(hashes.size, 8);
  }
});

test('sector reading content exists in both languages and retains official references', () => {
  for (const slug of Object.keys(UAE_SECTOR_ASSETS)) {
    assert.ok(UAE_SECTOR_GUIDES_AR[slug]?.length >= 10, slug);
    assert.ok(UAE_SECTOR_GUIDES_EN[slug]?.length >= 8, slug);
    assert.ok(UAE_SECTOR_GUIDES_AR[slug].some(block => block.type === 'link'), slug);
  }
});

test('all seven emirate cards retain full Arabic guides, bilingual copy and official sources', () => {
  const slugs = ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain'];
  assert.deepEqual(Object.keys(UAE_EMIRATE_GUIDES_AR).sort(), slugs.slice().sort());
  assert.deepEqual(Object.keys(UAE_EMIRATE_GUIDES_EN).sort(), slugs.slice().sort());
  for (const slug of slugs) {
    const ar = UAE_EMIRATE_GUIDES_AR[slug];
    const en = UAE_EMIRATE_GUIDES_EN[slug];
    assert.ok(ar.summary.length > 70 && en.summary.length > 70, slug);
    assert.ok(ar.blocks.length >= 25 && en.blocks.length >= 15, slug);
    assert.ok(ar.blocks.filter(block => block.type === 'link').length >= 2, slug);
    assert.equal(ar.blocks.filter(block => block.type === 'subheading').length, 3, slug);
    assert.equal(en.blocks.filter(block => block.type === 'subheading').length, 3, slug);
    for (const source of ar.blocks.filter(block => block.type === 'link')) {
      assert.equal(new URL(source.href).protocol, 'https:', slug);
    }
  }
});
