const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const explorer = read('components/SectorTaxonomyExplorer.js');
const quote = read('components/DirectorySectorQuoteForm.js');
const editorial = read('lib/directoryServiceEditorial.js');
const card = read('components/cards/DiscoveryEntityCard.js');
const floating = read('components/FloatingWhatsAppSupport.js');
const routes = [
  read('pages/uae/[activity]/[emirate].js'),
  read('pages/en/uae/[emirate]/[area].js'),
];
assert.equal((explorer.match(/<DirectorySectorQuoteForm\b/g) || []).length, 1, 'sector explorer must render one form, not one per specialty');
assert.match(explorer, /quotePlacement!=='external'/);
assert.match(explorer, /onServiceRequest\?\.\(key\)/);
assert.match(explorer, /href="#directory-quote"/);
assert.match(explorer, /setExpandedSpecialty/);
assert.match(explorer, /col-span-2/);
assert.match(explorer, /<details className="mt-3" open=\{expanded\}/);
assert.match(explorer, /Explore services/);
assert.match(explorer, /استعرض الخدمات/);
assert.doesNotMatch(explorer, /item\.services\.length/);
assert.doesNotMatch(explorer, /View \$\{item\.services\.length\}/);
assert.doesNotMatch(explorer, /عرض الخدمات \(/);
assert.doesNotMatch(explorer, /من خدمات هذا التخصص:/);
assert.match(quote, /id="directory-quote"/);
assert.equal((quote.match(/<form\b/g) || []).length, 1);
assert.match(quote, /sourceGroups\.map\(group => <optgroup/);
assert.match(quote, /chosen\.label/);
assert.match(quote, /customerPhone: phone\.trim\(\)/);
assert.match(quote, /buildServiceQuoteWhatsappUrl/);
assert.doesNotMatch(quote, /quote-' \+ specialty\.slug/);
assert.doesNotMatch(editorial, /return \[lead,prompt/);
assert.match(editorial, /if \(lead\) return lead/);
for (const route of routes) {
  assert.equal((route.match(/<DirectorySectorQuoteForm\b/g) || []).length, 1, 'one form at page bottom per locale');
  assert.match(route, /quotePlacement="external"/);
  assert.match(route, /onServiceRequest=\{setRequestedService\}/);
  assert.match(route, /requestedService=\{requestedService\}/);
  assert.match(route, /groups=\{sectorTaxonomy\|\|\[\]\}/);
  assert.ok(route.indexOf('<DirectorySectorQuoteForm') > route.indexOf('<UaeSmartFooter'), 'customer form must follow footer-style directory content');
}
assert.match(card, /aspect-\[16\/10\]/);
assert.match(card, /object-cover object-center/);
assert.match(card, /grid-cols-2 gap-2/);
assert.doesNotMatch(card, /mt-auto flex/);
assert.match(floating, /isSectorDirectory/);
assert.match(floating, /bottom-3 right-3 h-11 w-11 bg-\[#193b53\]/);
console.log('Directory compact mobile cards, zero displayed service counts and single end-of-page WhatsApp quotation form: PASS.');
