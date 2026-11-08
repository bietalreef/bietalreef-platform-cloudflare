const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const get = filename => fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');

test('every published company uses the same five tabs without a repeated name or logo', () => {
  const nav = get('components/provider/CompanyPageNav.js');
  assert.match(nav, /\['home','services','offers','service-areas','posts'\]/);
  assert.match(nav, /homeHref\+'#company-posts'/);
  assert.doesNotMatch(nav, /<img|<Image|logo_url/);
  for (const filename of [
    'components/provider/PublishedCompanyPresencePage.js',
    'components/provider/RehabPresencePage.js',
    'components/provider/KawkabPresencePage.js',
    'components/provider/AlNaeemPresencePage.js',
  ]) {
    const source = get(filename);
    assert.match(source, /<CompanyPageNav\b/);
    assert.match(source, /id="company-posts"/);
    assert.match(source, /<CompanyContactBar\b/);
  }
});

test('mobile service images occupy their card media region and both contact actions use blue', () => {
  const card = get('components/cards/DiscoveryEntityCard.js');
  assert.match(card, /object-cover object-center/);
  assert.doesNotMatch(card, /object-contain/);
  const kawkabBar = get('components/provider/KawkabMobileContactBar.js');
  assert.match(kawkabBar, /<CompanyContactBar/);
  const contacts = get('components/provider/CompanyContactBar.js');
  assert.match(contacts, /bg-\[#193b53\]/);
  assert.match(contacts, /<Phone/);
  assert.match(contacts, /<MessageCircle/);
});

test('company information is shown before service cards', () => {
  const rehab = get('components/provider/RehabPresencePage.js');
  assert.ok(rehab.indexOf('<Section title={t.about}') < rehab.indexOf('<Section title={t.officialInfo}'));
  assert.ok(rehab.indexOf('<Section title={t.officialInfo}') < rehab.indexOf('{categories.map((c)'));
  const general = get('components/provider/PublishedCompanyPresencePage.js');
  assert.ok(general.indexOf("<Section title={t.about}") < general.indexOf("<Section title={t.services}"));
  assert.ok(general.indexOf("معلومات النشاط التجاري") < general.indexOf("<Section title={t.services}"));
  const kawkab = get('components/provider/KawkabPresencePage.js');
  assert.ok(kawkab.indexOf("نبذة عن الشركة") < kawkab.indexOf("<Services contextBase={contextBase} locale={lang} short/>"));
  const naeem = get('components/provider/AlNaeemPresencePage.js');
  assert.ok(naeem.indexOf("t.aboutTitle") < naeem.indexOf('<Segment kind="services"'));
});

test('providers directory has localized titles and a visible image on mobile', () => {
  const hero = get('components/ProvidersDirectoryHero.js');
  assert.match(hero, /دليل شركات المقاولات والخدمات والمهنيين في الإمارات/);
  assert.match(hero, /UAE contractors, service providers and professionals directory/);
  assert.match(hero, /relative block h-44/);
  const ar = get('pages/providers/index.js');
  const en = get('pages/en/providers/index.js');
  assert.match(ar, /title="دليل شركات المقاولات/);
  assert.match(en, /title="UAE Contractors, Services/);
  assert.match(ar, /canonicalPath="\/providers"/);
  assert.match(en, /canonicalPath="\/en\/providers"/);
});
