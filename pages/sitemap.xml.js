import { getPublishedCompanySitemapRoutes, companyPath } from '../lib/publishedCompanyPresence';
import { KAWKAB_HERO, KAWKAB_GALLERY, KAWKAB_IMAGES, KAWKAB_SECTIONS, KAWKAB_SPECIALTIES, KAWKAB_PROFILE_ID, kawkabPath, kawkabServicePath, kawkabProjectPath, KAWKAB_PROJECT, KAWKAB_COVERAGE, kawkabEmiratePath } from '../lib/kawkabPresence';
import { fetchTaxonomyTable } from '../lib/platformDirectoryCards';
import {getGeographicPublishedServiceCards} from '../lib/platformPublishedServiceCards';
import {UAE_MAIN_SECTORS} from '../data/directoryDiscovery';
import {UAE_EMIRATES} from '../data/siteTaxonomy';
import {areaEditorialFor} from '../data/sharjahAjmanAreaEditorial';
import {UAE_SECTOR_ASSETS} from '../data/uaeDirectoryVisuals';
import { localSitemap } from '../lib/localServices';
import { getLocalProviders } from '../lib/localProviderData';
import { buildSearchIndexEntries } from '../lib/searchIndexRoutes.js';
import { getRehabSiteData, presencePath } from '../lib/rehabPresence';
import { getAlNaeemData, alNaeemPath } from '../lib/alNaeemPresence';
import { CLEANING_CONTENT_UPDATED_AT } from '../lib/cleaningLandingContent';
import { latestContentDate } from '../lib/contentDates.cjs';
import {
  getPublishedProductsForSitemap,
  getPublishedProviderCards,
} from '../lib/platformDirectoryCards';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderAlternates(alternates) {
  if (!alternates) return '';
  return [
    ['ar-AE', alternates.ar],
    ['en-AE', alternates.en],
    ['x-default', alternates.default],
  ].map(([language, href]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(href)}" />`).join('\n');
}

function renderImages(images = []) {
  return images.map((image) => [
    '    <image:image>',
    `      <image:loc>${escapeXml(image)}</image:loc>`,
    '    </image:image>',
  ].join('\n')).join('\n');
}

function buildSitemapXml(entries) {
  const uniqueEntries = Array.from(
    entries.reduce((map, entry) => {
      if (!map.has(entry.loc)) map.set(entry.loc, entry);
      else if (entry.lastmod) {
        const previous = map.get(entry.loc);
        if (!previous.lastmod || entry.lastmod > previous.lastmod) {
          map.set(entry.loc, { ...previous, lastmod: entry.lastmod });
        }
      }
      return map;
    }, new Map()).values(),
  ).sort((left, right) => left.loc.localeCompare(right.loc));

  const urls = uniqueEntries.map((entry) => {
    const optionalLines = [renderAlternates(entry.alternates), renderImages(entry.images)].filter(Boolean);
    return [
      '  <url>',
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      ...optionalLines,
      ...(entry.lastmod ? [`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`] : []),
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority.toFixed(2)}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    '</urlset>',
  ].join('\n');
}

export async function getServerSideProps({ res }) {
  const entries = [...buildSearchIndexEntries(), ...localSitemap(await getLocalProviders())];
  const [providerCards, products] = await Promise.all([
    getPublishedProviderCards('ar'),
    getPublishedProductsForSitemap('ar'),
  ]);
  const addPair = (arPath, enPath, image, options = {}) => {
    const alternates = {
      ar: `https://bietalreef.ae${arPath}`,
      en: `https://bietalreef.ae${enPath}`,
      default: `https://bietalreef.ae${arPath}`,
    };
    const shared = {
      ...(options.lastmod ? { lastmod: options.lastmod } : {}),
      changefreq: options.changefreq || 'weekly',
      priority: options.priority ?? 0.72,
      alternates,
      images: options.images ? options.images.map(img => img.startsWith('http') ? img : `https://bietalreef.ae${img}`) : image ? [image.startsWith('http') ? image : `https://bietalreef.ae${image}`] : [],
    };
    entries.push(
      { ...shared, loc: alternates.ar },
      { ...shared, loc: alternates.en }
    );
  };

  // Existing emirate-sector pages and geographic paths backed by published services.
  for (const emirate of ['abu-dhabi','dubai','sharjah','ajman','umm-al-quwain']) for (const sector of UAE_MAIN_SECTORS) {
    const path = `/uae/${emirate}/${sector.slug}`;
    addPair(path, `/en${path}`, UAE_SECTOR_ASSETS[sector.slug]?.desktop, ['sharjah','ajman'].includes(emirate) ? {lastmod:'2026-11-09'} : {});
  }

  // Approved, original bilingual regional area hubs and sector guides.
  // Never insert unlisted providers or fabricated service/company detail pages.
  for (const emirate of UAE_EMIRATES.filter(row=>['sharjah','ajman'].includes(row.slug))) {
    for (const area of emirate.areas) {
      if (!areaEditorialFor(emirate.slug,area.slug,'ar') || !areaEditorialFor(emirate.slug,area.slug,'en')) continue;
      const hub='/uae/'+emirate.slug+'/'+area.slug;
      addPair(hub,'/en'+hub,undefined,{lastmod:'2026-11-09'});
      for (const sector of UAE_MAIN_SECTORS) {
        const path=hub+'/'+sector.slug;
        addPair(path,'/en'+path,UAE_SECTOR_ASSETS[sector.slug]?.desktop,{lastmod:'2026-11-09'});
      }
    }
  }

  // Northern place guides are genuine bilingual editorial pages, not fabricated company listings.
  for (const emirate of UAE_EMIRATES.filter(item => ['ras-al-khaimah','fujairah','umm-al-quwain'].includes(item.slug))) {
    for (const area of emirate.areas) {
      const hub = '/uae/'+emirate.slug+'/'+area.slug;
      addPair(hub,'/en'+hub,undefined,{priority:0.65,lastmod:'2026-11-09'});
      for(const sector of UAE_MAIN_SECTORS) {
        const path = hub+'/'+sector.slug;
        addPair(path,'/en'+path,UAE_SECTOR_ASSETS[sector.slug]?.desktop,{priority:0.64,lastmod:'2026-11-09'});
      }
    }
  }

  // Original Al Naeem listing connected to the UAQ cleaning sector and each approved district.
  // These company paths reuse the same provider data; never create a second profile.
  const uaq='/uae/umm-al-quwain';
  const naeem='al-naeem-cleaning-services';
  const uaqAreas=UAE_EMIRATES.find(row=>row.slug==='umm-al-quwain')?.areas||[];
  for(const root of [uaq,...uaqAreas.map(area=>uaq+'/'+area.slug)]){
    const company=root+'/cleaning-services/'+naeem;
    addPair(company,'/en'+company,'/images/providers/al-naeem/home-villa-male.webp',{priority:0.7});
    for(const service of ['home-villa-cleaning','water-tank-cleaning-sanitization','steam-carpet-sofa-cleaning','curtains-upholstery-majlis-cleaning']){
      const path=company+'/services/'+service;
      addPair(path,'/en'+path,undefined,{priority:0.65});
    }
  }

  try {
    const locations = [{emirate:'abu-dhabi',city:''},{emirate:'abu-dhabi',city:'al-ain'},{emirate:'dubai',city:''}];
    const groups = await Promise.all(UAE_MAIN_SECTORS.flatMap(sector => locations.map(place =>
      getGeographicPublishedServiceCards('ar', {sector:sector.slug,...place})
    )));
    for (const item of groups.flat()) {
      const detailPath = item.href;
      const collectionPath = detailPath.slice(0, -(item.providerSlug.length + 1));
      addPair(collectionPath, `/en${collectionPath}`, item.image);
      addPair(detailPath, `/en${detailPath}`, item.image);
      if (item.city) {
        const sectorPath = `/uae/abu-dhabi/al-ain/${item.sector}`;
        addPair(sectorPath, `/en${sectorPath}`, UAE_SECTOR_ASSETS[item.sector]?.desktop);
      }
    }
  } catch (error) {
    console.error('Geographic platform service sitemap unavailable:', error?.message);
  }

  for (const path of ['/app', '/android', '/web-app']) addPair(path, `/en${path}`, '/icons/logo-512.webp', { changefreq: 'monthly', priority: 0.6 });

  addPair(
    '/press/smart-platform-launch',
    '/en/press/smart-platform-launch',
    'https://bietalreef.ae/api/press/smart-platform-launch-og',
    { changefreq: 'monthly', priority: 0.88 }
  );

  providerCards.forEach((provider) => {
    const slug = String(provider.href || '').split('/').filter(Boolean).pop();
    if (!slug || provider.id === KAWKAB_PROFILE_ID || slug === 'provider-3000485') return;
    addPair(
      `/providers/${slug}`,
      `/en/providers/${slug}`,
      provider.coverImage || provider.logoImage
    );
  });

  // Platform-channel publication is independent of Flutter app/market publication.
  // Only crawlable records actually approved for the public platform are added.
  try {
    const rehab = await getRehabSiteData();
    if (rehab) {
      const routePairs = [{ kind: 'home' }];
      for (const [kind, items] of [
        ['services', rehab.services], ['offers', rehab.offers], ['service-areas', rehab.areas],
      ]) {
        if (!items.length) continue;
        routePairs.push({ kind });
        items.forEach((item) => routePairs.push({ kind, slug: item.slug }));
      }
      routePairs.forEach((route) => {
        const records=route.kind==='services'?rehab.services:route.kind==='offers'?rehab.offers:route.kind==='service-areas'?rehab.areas:[];
        const dates=(route.slug?records.filter(item=>item.slug===route.slug):records).map(item=>item.updated_at);
        // Portfolio snapshots do not currently expose their edit timestamps.
        // Omit the home-page date instead of publishing a stale or guessed one.
        const lastmod=route.kind==='home'?null:latestContentDate(CLEANING_CONTENT_UPDATED_AT,rehab.profile.updated_at,dates,rehab.areas.map(area=>area.updated_at));
        addPair(
          presencePath('ar', route),
          presencePath('en', route),
          route.kind === 'home' ? rehab.profile.cover_image_url : undefined,
          { priority: route.kind === 'home' ? 0.8 : 0.65, lastmod },
        );
      });
      // Geographic service combinations are backed by the same published service
      // and approved coverage records, not duplicated editorial data.
      rehab.areas.forEach((area) => {
        rehab.services.forEach((service) => {
          const route = { kind: 'services', slug: service.slug, areaSlug: area.slug };
          addPair(presencePath('ar', route), presencePath('en', route), undefined, { priority: 0.61, lastmod: latestContentDate(CLEANING_CONTENT_UPDATED_AT,rehab.profile.updated_at,area.updated_at,service.updated_at) });
        });
      });
    }
  } catch (error) {
    console.error('Sitemap provider channel unavailable:', error?.message);
  }

  // Only live, verified platform-channel company pages are sitemap eligible.
  try {
    const publishedCompanies = await getPublishedCompanySitemapRoutes();
    for (const company of publishedCompanies) {
      if (company.slug === 'alrehab-home-clean' || company.slug === 'provider-3000485') continue;
      for (const route of company.routes) {
        addPair(
          companyPath(company.slug, 'ar', route.kind, route.slug),
          companyPath(company.slug, 'en', route.kind, route.slug),
          route.kind === 'home' ? company.cover : null,
          { priority: route.kind === 'home' ? 0.78 : 0.64, lastmod: route.lastmod },
        );
      }
    }
  } catch (error) {
    console.error('Published company sitemap unavailable:',error?.message);
  }


  // BR-3000485: only emit URLs after the account lifecycle actually publishes
  // the platform landing and activates the company listing. No district/service
  // permutations without approved, individually useful content.
  try {
    const liveKawkab = await fetchTaxonomyTable(
      'provider_public_profiles?select=id&' +
      'id=eq.' + KAWKAB_PROFILE_ID +
      '&verification_status=eq.verified&publication_status=eq.published&landing_page_status=eq.published&limit=1'
    );
    if (liveKawkab.length && providerCards.some(card => card.id === KAWKAB_PROFILE_ID)) {
      KAWKAB_COVERAGE.forEach(area=>addPair(
        kawkabEmiratePath('ar',area.slug),kawkabEmiratePath('en',area.slug),
        KAWKAB_HERO.url,{priority:0.64,lastmod:'2026-11-01'}));
      addPair(kawkabProjectPath('ar'),kawkabProjectPath('en'),
        KAWKAB_PROJECT.images[0]?.url,
        {priority:0.7,lastmod:'2026-11-01',images:KAWKAB_PROJECT.images.map(image=>image.url)});
      KAWKAB_SPECIALTIES.forEach(service => addPair(
        kawkabServicePath('ar',service.id), kawkabServicePath('en',service.id),
        null,{priority:0.7,lastmod:'2026-11-01'}));
      // Neighbourhood paths remain available, but are omitted until individual
      // coverage and independent page value meet the indexing requirements.
      KAWKAB_SECTIONS.forEach(section => addPair(
        kawkabPath('ar',section),kawkabPath('en',section),
        section==='home' ? KAWKAB_HERO.url : null,
        { priority: section==='home' ? 0.82 : 0.66,
          lastmod:'2026-11-01',
          ...(section==='gallery' ? {images:KAWKAB_IMAGES.map(image => image.url)} : {}) },
      ));
    }
  } catch(error) {
    console.error('Kawkab sitemap eligibility unavailable:', error?.message);
  }

  // Al Nuaim is only indexed AFTER approval of its DISTINCT identity,
  // live platform channel, service cards and local service areas.
  try {
    const alNaeem = await getAlNaeemData();
    if (alNaeem) {
      const routes = [{kind:'home'}];
      for (const [kind,items] of [['services',alNaeem.services],['offers',alNaeem.offers],['service-areas',alNaeem.areas]]) {
        if (!items.length) continue;
        routes.push({kind});
        for (const item of items) routes.push({kind,slug:item.slug});
      }
      for (const route of routes) {
        addPair(alNaeemPath('ar',route),alNaeemPath('en',route),route.kind==='home'?alNaeem.profile.cover_image_url:null,{priority:route.kind==='home'?0.78:0.65,lastmod:CLEANING_CONTENT_UPDATED_AT});
      }
      alNaeem.areas.forEach((area) => {
        alNaeem.services.forEach((service) => {
          const route = { kind: 'services', slug: service.slug, areaSlug: area.slug };
          addPair(alNaeemPath('ar', route), alNaeemPath('en', route), undefined, { priority: 0.61, lastmod: CLEANING_CONTENT_UPDATED_AT });
        });
      });
    }
  } catch (error) {
    console.error('Al Nuaim sitemap data unavailable:',error?.message);
  }

  products
    .filter((product) => product.providerSlug !== 'arkleen')
    .forEach((product) => {
      addPair(
        `/products/${product.providerSlug}/${product.slug}`,
        `/en/products/${product.providerSlug}/${product.slug}`,
        product.image
      );
    });

  // Old autogenerated directory permutations remain reachable but are no longer
  // submitted as the preferred pages. Area homepages use their reviewed content.
  for (const area of ['baniyas','khalifa-city','mohammed-bin-zayed-city','shamkha','al-wathba','al-rahba','musaffah','al-reem-island','al-raha','al-dhafra']) {
    const path = `/uae/abu-dhabi/${area}`;
    addPair(path, `/en${path}`);
  }

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildSitemapXml(entries));
  res.end();
  return { props: {} };
}

export default function SitemapXml() {
  return null;
}
