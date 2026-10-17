const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { isAppExperience } = require('../lib/appExperience');
test('app shell covers reciprocal public discovery URLs without covering API or diagnostic surfaces', () => {
  for (const path of ['/', '/en', '/en/', '/services/cleaning-services?ref=search', '/en/categories/general-maintenance', '/uae/abu-dhabi/al-ain/general-contracting', '/en/providers/arkleen', '/request-quote?city=al-ain']) assert.equal(isAppExperience(path), true, path);
  for (const path of ['/api/providers', '/preview/al-ain-responsive', '/en/privacy', '/services-other']) assert.equal(isAppExperience(path), false, path);
});
test('installation keeps original identity and opens in standalone mode', () => {
  const manifest = JSON.parse(fs.readFileSync('public/manifest.webmanifest', 'utf8'));
  assert.equal(manifest.id, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.every(icon => fs.existsSync('public' + icon.src)));
  assert.ok(!JSON.stringify(manifest).includes('مزود'));
});
