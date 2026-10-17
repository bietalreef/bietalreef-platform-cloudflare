const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const source = fs.readFileSync('lib/navigation.js','utf8');
const { getLocalizedPath } = new Function(source.replace('export function','function') + ';return {getLocalizedPath};')();
test('language switch preserves filters and fragment on dynamic profiles', () => {
  const path='/providers/alrehab-home-clean?city=al-ain&search=cleaning#services';
  const en=getLocalizedPath(path,'en');
  assert.equal(en,'/en'+path);
  assert.equal(getLocalizedPath(en,'ar'),path);
});
test('existing service category aliases are reciprocal', () => {
  assert.equal(getLocalizedPath('/services/cleaning?city=al-ain','en'),'/en/categories/cleaning?city=al-ain');
  assert.equal(getLocalizedPath('/en/categories/cleaning?city=al-ain','ar'),'/services/cleaning?city=al-ain');
  assert.equal(getLocalizedPath('/en','ar'),'/');
  assert.equal(getLocalizedPath('/','en'),'/en');
});
test('city service routes retain their existing structure', () => {
  const path='/al-ain/cleaning-services/home-villa-cleaning?source=directory';
  assert.equal(getLocalizedPath(getLocalizedPath(path,'en'),'ar'),path);
});
