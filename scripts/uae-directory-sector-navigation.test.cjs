const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('UAE discovery footer links all approved sectors from the single taxonomy', () => {
  const source = fs.readFileSync(path.join(__dirname, '../components/UaeDirectoryHomeContent.js'), 'utf8');
  assert.match(source, /import \{ UAE_MAIN_SECTORS \} from '\.\.\/data\/directoryDiscovery'/);
  assert.match(source, /links: UAE_MAIN_SECTORS\.map\(\(sector\) =>/);
  assert.match(source, /sectorGroup,\s*\.\.\.directoryGroups/);
  assert.match(source, /'\/en\/categories' : '\/services'/);
  assert.match(source, /شركات تنظيف وخدمات تعقيم/);
  assert.doesNotMatch(source, /SERVICE_CATEGORIES\.slice\(0, 7\)/);
});
