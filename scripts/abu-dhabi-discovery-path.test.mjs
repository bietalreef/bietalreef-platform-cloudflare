import test from 'node:test';
import assert from 'node:assert/strict';
import { discoveryPath, ABU_DHABI_AREAS, ABU_DHABI_DESTINATIONS } from '../data/directoryDiscovery.js';
import { UAE_EMIRATES } from '../data/siteTaxonomy.js';

test('new Abu Dhabi City discovery links use the emirate entry in both languages', () => {
  for (const [locale, prefix] of [['ar', ''], ['en', '/en']]) {
    assert.equal(discoveryPath({ locale, emirate: 'abu-dhabi', city: 'abu-dhabi-city' }), `${prefix}/uae/abu-dhabi`);
    assert.equal(discoveryPath({ locale, emirate: 'abu-dhabi', city: 'abu-dhabi-city', sector: 'general-maintenance' }), `${prefix}/uae/abu-dhabi/general-maintenance`);
    assert.equal(discoveryPath({ locale, emirate: 'abu-dhabi', city: 'al-ain', sector: 'aluminium-glass' }), `${prefix}/uae/abu-dhabi/al-ain/aluminium-wood-glass`);
    assert.equal(discoveryPath({ locale, emirate: 'abu-dhabi', city: 'al-dhafra' }), `${prefix}/uae/abu-dhabi/al-dhafra`);
    assert.equal(discoveryPath({ locale, emirate: 'abu-dhabi', city: 'al-ain', sector: 'general-maintenance' }), `${prefix}/uae/abu-dhabi/al-ain/general-maintenance`);
  }
});

test('Abu Dhabi area links are backed by taxonomy and exclude Al Ain districts', () => {
  const abu = UAE_EMIRATES.find(item => item.slug === 'abu-dhabi');
  const known = new Set(abu.areas.map(area => area.slug));
  assert.equal(ABU_DHABI_AREAS.length, 9);
  for (const area of ABU_DHABI_AREAS) assert.ok(known.has(area), area);
  for (const ainArea of ['al-hili', 'al-jimi', 'al-muwaiji']) assert.ok(!ABU_DHABI_AREAS.includes(ainArea));
  assert.ok(known.has('abu-dhabi-city'), 'keep the legacy indexed route in the taxonomy');
  assert.ok(ABU_DHABI_DESTINATIONS.some(item => item.slug === 'al-dhafra'));
});
