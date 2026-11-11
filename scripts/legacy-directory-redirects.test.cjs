const test = require('node:test');
const assert = require('node:assert/strict');
const { redirects } = require('../next.config.js');
const { AREAS } = require('../data/localServices');

function matches(route, path) {
  const source = route.source;
  let rx = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match Next.js named params and constraints as part of a path segment.
  rx = source.replace(/:([a-z]+)\(([^)]+)\)/g, (_, name, values) => '@REGEX_'+name+'_'+values.replaceAll('|','_OR_')+'@');
  rx = rx.replace(/:([a-z]+)/g, '@SINGLE_$1@');
  rx = rx.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  rx = rx.replace(/@REGEX_([a-z]+)_([a-z0-9_-]+)@/g, (_, name, values) => '(?<' + name + '>' + values.replaceAll('_OR_','|') + ')');
  rx = rx.replace(/@SINGLE_([a-z]+)@/g, (_, name) => '(?<' + name + '>[^/]+)');
  return new RegExp('^'+rx+'/?$').exec(path);
}
function destination(routes, path) {
  const rule = routes.find(route=>matches(route,path));
  if (!rule) return null;
  const groups = matches(rule,path).groups || {};
  return rule.destination.replace(/:([a-z]+)/g, (_, key) => groups[key] || '');
}
test('migrate old reviewed UAE provider/service routes to current eight-sector guides (AR/EN)', async () => {
 const routes = await redirects();
 const samples = [
  ['/en/uae/abu-dhabi/al-ain/directory/services-offers/cleaning-operations-equipment','/en/uae/abu-dhabi/al-ain/cleaning-services'],
  ['/en/uae/ajman/ajman-city/directory/providers/engineering-design','/en/uae/ajman/ajman-city/interior-design'],
  ['/en/uae/abu-dhabi/musaffah/directory/providers/building-materials-supply','/en/uae/abu-dhabi/musaffah/building-materials'],
  ['/en/uae/dubai/international-city/directory/providers/cleaning-operations-equipment','/en/uae/dubai/international-city/cleaning-services'],
  ['/uae/abu-dhabi/al-yahar/directory/providers/maintenance-finishing','/uae/abu-dhabi/al-ain/al-yahar/general-maintenance'],
  ['/uae/sharjah/al-dhaid/directory/services-offers/aluminium-glass-wood','/uae/sharjah/al-dhaid/aluminium-glass'],
  ['/uae/abu-dhabi/directory/providers/construction-contracting','/uae/abu-dhabi/general-contracting'],
  ['/en/uae/sharjah/directory/services-offers/cleaning-operations-equipment','/en/uae/sharjah/cleaning-services'],
 ];
 for (const [from,to] of samples) assert.equal(destination(routes,from),to,from);
 assert.equal(AREAS.some(a=>a.slug==='al-yahar'),true);
 assert.equal(routes.filter(r=>r.source.includes('/directory/')).every(r=>r.permanent),true);
});
