const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const source = readFileSync('components/ConsentAwareGoogleTag.js', 'utf8');
const preferences = readFileSync('components/PrivacyConsentCenter.js', 'utf8');
const match = source.match(/\/\/ Apply an existing affirmative choice before the first page-view hit\.([\s\S]*?)gtag\('js', new Date\(\)\);/);

assert.ok(match, 'stored-consent startup logic must be present before gtag config');

function runStartup(stored) {
  const calls = [];
  const gtag = (...args) => calls.push(args);
  vm.runInNewContext(match[1], {
    window: { localStorage: { getItem: () => stored } }, JSON, gtag,
  });
  return calls.map((entry) => JSON.parse(JSON.stringify(entry)));
}

test('saved affirmative consent is applied before first GA4 config', () => {
  assert.deepEqual(runStartup(JSON.stringify({ analytics: 'accepted', version: 1 })), [
    ['consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    }],
  ]);
});

test('no consent, rejected consent, and corrupted settings never grant consent', () => {
  for (const stored of [null, 'rejected', '{"analytics":"rejected"}', '{invalid']) {
    assert.deepEqual(runStartup(stored), [], 'unexpected affirmative consent for ' + stored);
  }
});

test('saved consent is replayed after tag is ready and consent preferences remain changeable', () => {
  assert.match(source, /addEventListener\('bietalreef:google-ready', syncConsent\)/);
  assert.match(source, /removeEventListener\('bietalreef:google-ready', syncConsent\)/);
  assert.match(source, /analytics_storage: 'denied'/);
  assert.match(preferences, /choice !== null \? \(/);
  assert.match(preferences, /setOpen\(true\)/);
});
