import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { UAE_MAIN_SECTORS } from '../data/directoryDiscovery.js';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals.js';

const data = JSON.parse(readFileSync(new URL('../data/abuDhabiSectorEditorial.json', import.meta.url), 'utf8'));

test('each Abu Dhabi sector retains complete bilingual editorial and its own approved image', () => {
  assert.equal(UAE_MAIN_SECTORS.length, 8);
  const images = new Set();
  for (const sector of UAE_MAIN_SECTORS) {
    const image = UAE_SECTOR_ASSETS[sector.slug];
    assert.ok(image?.desktop && image.alt.ar && image.alt.en, sector.slug);
    assert.ok(!images.has(image.desktop), `repeated sector image: ${sector.slug}`);
    images.add(image.desktop);
    for (const locale of ['ar', 'en']) {
      const item = data[locale][sector.slug];
      assert.ok(item?.title && item.html.length > 500, `${locale} ${sector.slug}`);
      const blocks = [...item.html.matchAll(/<(p|h3)>([\s\S]*?)<\/\1>/g)];
      assert.ok(blocks.length >= 3, `${locale} ${sector.slug}`);
      assert.equal(blocks.map(match => match[0]).join('').replace(/\s/g, ''), item.html.replace(/\s/g, ''), `unsupported block in ${locale} ${sector.slug}`);
      assert.ok(!item.html.replace(/<\/?(?:p|h3|strong)>/g, '').includes('<'), `unsupported inline markup in ${locale} ${sector.slug}`);
    }
  }
});
