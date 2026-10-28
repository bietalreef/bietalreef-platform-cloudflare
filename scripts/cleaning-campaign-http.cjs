// Check the HTML response before any browser JavaScript executes.
const assert = require('node:assert/strict');
const origin = process.env.CLEANING_TEST_ORIGIN || 'http://localhost:3099';
const companies = ['alrehab-home-clean', 'al-naeem-cleaning-services'];
const read = (html, pattern) => html.match(pattern)?.[1] || '';
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

async function main() {
  let count = 0;
  const titles = new Set();
  const descriptions = new Set();
  const images = new Set();
  for (const company of companies) {
    for (const prefix of ['', '/en']) {
      const base = `${prefix}/providers/${company}`;
      const pending = [base];
      const visited = new Set();
      while (pending.length) {
        const path = pending.shift();
        if (visited.has(path)) continue;
        visited.add(path);
        const response = await fetch(origin + path);
        assert.equal(response.status, 200, path);
        const html = await response.text();
        assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `one primary heading: ${path}`);
        assert.equal((html.match(/<main(?:\s|>)/g) || []).length, 1, `one main: ${path}`);
        assert.match(html, new RegExp(`<html[^>]*lang="${prefix ? 'en' : 'ar'}(?:-AE)?"`), path);
        const title = read(html, /<title[^>]*>([^<]+)<\/title>/);
        const description = read(html, /<meta name="description" content="([^"]+)"/);
        assert.ok(title && !titles.has(title), `unique title: ${path}`);
        assert.ok(description && !descriptions.has(description), `unique description: ${path}`);
        titles.add(title); descriptions.add(description);
        assert.equal(decode(read(html, /<link rel="canonical" href="([^"]+)"/)), 'https://bietalreef.ae' + path, path);
        assert.ok(!/<meta name="robots" content="[^\"]*noindex/.test(html), `indexable content: ${path}`);
        assert.ok(html.includes('hrefLang="ar-AE"') || html.includes('hreflang="ar-AE"'), path);
        assert.ok(html.includes('hrefLang="en-AE"') || html.includes('hreflang="en-AE"'), path);
        const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => {
          const value = JSON.parse(match[1]);
          return Array.isArray(value) ? value : [value];
        });
        assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'), `breadcrumbs: ${path}`);
        if (path.includes('/services/')) {
          assert.ok(schemas.some(schema => schema['@type'] === 'Service'), `service schema: ${path}`);
          assert.ok(html.includes(prefix ? 'Prepare your request' : 'جهّز طلبك بسهولة'), `service guidance: ${path}`);
        }
        const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => decode(match[1]));
        const wa = links.find(link => link.startsWith('https://wa.me/') && decodeURIComponent(link).includes('https://bietalreef.ae' + path));
        assert.ok(wa, `contact carries exact page context: ${path}`);
        if (company === 'al-naeem-cleaning-services') assert.ok(wa.startsWith('https://wa.me/971522837071?'), path);
        if (path === base && company === 'alrehab-home-clean') assert.ok(!links.includes(base + '/offers'), 'empty offers absent from homepage');
        for (const href of links) if (href.startsWith(base + '/') && !visited.has(href)) pending.push(href);
        for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
          const src = decode(match[1]);
          if (src.startsWith('/images/providers/')) images.add(src);
          assert.ok(!src.startsWith('https://drive.google.com/uc?'), `no Drive view images: ${path}`);
        }
        count++;
      }
    }
  }
  for (const src of images) assert.equal((await fetch(origin + src)).status, 200, src);
  for (const company of companies) assert.equal((await fetch(origin + '/providers/' + company + '/services/not-a-published-service')).status, 404, 'unknown service must be a real 404');
  const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
  for (const company of companies) assert.ok(sitemap.includes('https://bietalreef.ae/providers/' + company), 'company in sitemap');
  assert.ok(!sitemap.includes('https://bietalreef.ae/providers/alrehab-home-clean/offers<'), 'empty collection excluded');
  const local = await (await fetch(origin + '/uae/abu-dhabi/al-ain/cleaning-services/sofa-cleaning')).text();
  assert.ok(local.includes('/providers/alrehab-home-clean/services/sofa-cleaning'), 'local intent links directly to Rehab service');
  assert.ok(local.includes('/providers/al-naeem-cleaning-services/services/steam-carpet-sofa-cleaning'), 'local intent links directly to Al Nuaim service');
  console.log(`PASS: ${count} bilingual company responses, unique metadata, server HTML, contact context, structured data, ${images.size} media files, sitemap and local service links.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
