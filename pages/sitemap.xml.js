import { getPublishedCompanySitemapRoutes, companyPath } from '../lib/publishedCompanyPresence';
import { localSitemap } from '../lib/localServices';
import { getLocalProviders } from '../lib/localProviderData';
import { AREAS } from '../data/localServices';
import { buildSearchIndexEntries } from '../lib/searchIndexRoutes.js';
import { UAE_EMIRATES } from '../data/siteTaxonomy';
import { getRehabSiteData, presencePath } from '../lib/rehabPresence';
import { getAlNaeemData, alNaeemPath } from '../lib/alNaeemPresence';
import { CLEANING_CONTENT_UPDATED_AT } from '../lib/cleaningLandingContent';
import {
  UAE_DIRECTORY_SECTION_SLUGS,
  getArabicUaeDirectoryCards,
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
  const [cards, providerCards, products] = await Promise.all([
    getArabicUaeDirectoryCards(),
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
      images: image ? [image.startsWith('http') ? image : `https://bietalreef.ae${image}`] : [],
    };
    entries.push(
      { ...shared, loc: alternates.ar },
      { ...shared, loc: alternates.en }
    );
  };

  for (const path of ['/app', '/android', '/web-app']) addPair(path, `/en${path}`, '/icons/logo-512.webp', { changefreq: 'monthly', priority: 0.6 });

  addPair(
    '/press/smart-platform-launch',
    '/en/press/smart-platform-launch',
    'https://bietalreef.ae/api/press/smart-platform-launch-og',
    { changefreq: 'monthly', priority: 0.88 }
  );

  providerCards.forEach((provider) => {
    const slug = String(provider.href || '').split('/').filter(Boolean).pop();
    if (!slug) return;
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
        addPair(
          presencePath('ar', route),
          presencePath('en', route),
          route.kind === 'home' ? rehab.profile.cover_image_url : undefined,
          { priority: route.kind === 'home' ? 0.8 : 0.65, lastmod: CLEANING_CONTENT_UPDATED_AT },
        );
      });
    }
  } catch (error) {
    console.error('Sitemap provider channel unavailable:', error?.message);
  }

  // Only live, verified platform-channel company pages are sitemap eligible.
  try {
    const publishedCompanies = await getPublishedCompanySitemapRoutes();
    for (const company of publishedCompanies) {
      if (company.slug === 'alrehab-home-clean') continue;
      for (const route of company.routes) {
        addPair(
          companyPath(company.slug, 'ar', route.kind, route.slug),
          companyPath(company.slug, 'en', route.kind, route.slug),
          route.kind === 'home' ? company.cover : null,
          { priority: route.kind === 'home' ? 0.78 : 0.64 },
        );
      }
    }
  } catch (error) {
    console.error('Published company sitemap unavailable:',error?.message);
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

  UAE_EMIRATES.forEach((emirate) => {
    cards.forEach((card) => {
      const section = UAE_DIRECTORY_SECTION_SLUGS[card.sectionKey];
      const suffix = `/directory/${section}/${card.activity.slug}`;
      addPair(`/uae/${emirate.slug}${suffix}`, `/en/uae/${emirate.slug}${suffix}`, card.image);
      emirate.areas.filter(area => !(emirate.slug === 'abu-dhabi' && (area.slug === 'al-ain' || AREAS.some(item => item.slug === area.slug)))).forEach((area) => {
        const areaSuffix = `/${area.slug}${suffix}`;
        addPair(`/uae/${emirate.slug}${areaSuffix}`, `/en/uae/${emirate.slug}${areaSuffix}`, card.image);
      });
    });
  });

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(buildSitemapXml(entries));
  res.end();
  return { props: {} };
}

export default function SitemapXml() {
  return null;
}
