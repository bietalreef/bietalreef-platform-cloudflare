const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = (path) => fs.readFileSync(require('node:path').join(__dirname, '..', path), 'utf8');

test('Cloudflare platform is sole active source; legacy repository excluded', () => {
  const readme = read('README.md');
  assert.match(readme, /bietalreef-platform-cloudflare/);
  assert.match(readme, /landing-new.*READ-ONLY|READ-ONLY.*landing-new/i);
  assert.match(readme, /bietalreef-platform-staging/);
  assert.match(readme, /Deployment freeze/);
});

test('Homepage image URLs use existing responsive Cloudflare image resizing with originals untouched', () => {
  const component = read('components/home/ProjectDiscovery.js');
  const css = read('components/home/ProjectDiscovery.module.css');
  assert.match(component, /cdn-cgi\/image\/width=660/);
  assert.match(component, /cdn-cgi\/image\/width=1100/);
  assert.match(component, /cdn-cgi\/image\/width=440/);
  assert.match(component, /loading="lazy"/);
  assert.match(component, /fetchPriority="high"/);
  assert.match(css, /\.heroVisual>picture>img/);
  assert.match(css, /\.eyebrow\{color:#6e592b\}/);
});

test('Consent gate blocks third-party analytics script before explicit approval', () => {
  const tag = read('components/ConsentAwareGoogleTag.js');
  assert.match(tag, /analyticsConsent\(\) === 'accepted'/);
  assert.match(tag, /!productionHost \|\| !hasConsent/);
  assert.match(tag, /ad_storage: 'denied'/);
  assert.match(tag, /Google tag/);
});

test('Existing CSP stays restrictive while permitting the known consented Google endpoint', () => {
  const cfg = read('next.config.js');
  for (const token of ['frame-ancestors \'none\'', "base-uri 'self'", "object-src 'none'", 'https://pagead2.googlesyndication.com']) {
    assert.ok(cfg.includes(token), 'missing security control: ' + token);
  }
  assert.doesNotMatch(cfg, /script-src[^;]*\*/);
});
