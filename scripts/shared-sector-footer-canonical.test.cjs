const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('the shared footer links to canonical approved sector pages in both languages', () => {
  const source = fs.readFileSync(path.join(__dirname, '../components/SectionSmartFooter.js'), 'utf8');
  assert.match(source, /return UAE_MAIN_SECTORS\.map\(sector => \(\{/);
  assert.match(source, /\? \(locale === 'en' \? '\/en\/providers\/specialty' : '\/providers\/specialty'\)/);
  assert.match(source, /: \(locale === 'en' \? '\/en\/categories' : '\/services'\)/);
  assert.match(source, /href: \`\$\{base\}\/\$\{sector\.slug\}\`/);
  assert.match(source, /شركات تنظيف وخدمات التنظيف/);
  assert.doesNotMatch(source, /root}#sector-/);
});
