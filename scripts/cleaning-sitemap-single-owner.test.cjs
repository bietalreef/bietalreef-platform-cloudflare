// Enforced by prebuild: prevent old provider-gated cleaning pages from
// reclaiming an editorial URL or entering the sitemap through a second owner.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

test('the Al Ain cleaning hub has one route owner, not the legacy provider gate', () => {
  const local = read('lib/localServices.js');
  const guide = read('lib/alAinCleaningModel.js');
  const route = read('lib/localRouteProps.js');
  assert.match(local, /if \(!areaSlug && category === CATEGORY\.slug && !service\) return null/);
  assert.doesNotMatch(local, /const contexts = \[\{\}, \{ category: CATEGORY\.slug \}/);
  assert.match(route, /alAinCleaningModel\(\{ locale, service: segments\[1\]/);
  assert.match(guide, /indexable:reviewedEditorial/);
  assert.match(guide, /function hasReviewedCleaningGuide\(guide\)/);
});

test('sitemap excludes every guide-owned URL from the provider-backed registry', () => {
  const guide = read('lib/alAinCleaningModel.js');
  const sitemap = read('pages/sitemap.xml.js');
  assert.match(guide, /export function cleaningGuidePaths\(\)/);
  assert.match(guide, /CLEANING_SERVICES\.map\(item => item\.slug\)/);
  assert.match(guide, /\['ar', 'en'\]/);
  assert.match(sitemap, /new Set\(cleaningGuidePaths\(\)\)/);
  assert.match(sitemap, /localSitemap\(await getLocalProviders\(\)\)\.filter\(entry => !guidePaths\.has\(entry\.loc\)\)/);
  assert.match(sitemap, /\.\.\.cleaningGuideSitemap\(\)/);
});

test('public cleaning guides keep unique bilingual canonicals and robots metadata', () => {
  const page = read('components/AlAinCleaningPage.js');
  const head = read('components/SEOHead.js');
  const guide = read('lib/alAinCleaningModel.js');
  assert.match(guide, /const paths = alternates\(\{category,service\}\)/);
  assert.match(page, /noIndex=\{!model\.indexable\}/);
  assert.match(page, /canonicalPath=\{model\.canonical\.replace/);
  assert.match(head, /<link rel="canonical" href=\{canonicalUrl\}/);
  assert.match(head, /hrefLang="ar-AE"/);
  assert.match(head, /hrefLang="en-AE"/);
});
