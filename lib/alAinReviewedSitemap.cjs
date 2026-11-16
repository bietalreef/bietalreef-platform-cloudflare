// Generate only the existing Al Ain sector routes whose page models and
// reviewed editorial support a bilingual pair. No provider data is invented.
function alAinReviewedSitemapPairs({ sectors, cityModel, districts, districtEditorial, districtGuides, maintenanceTaxonomy }) {
  const pairs = [];
  for (const sector of sectors) {
    if (sector.slug === 'cleaning-services') continue; // Owned by the cleaning sitemap.
    const slug = sector.slug === 'aluminium-glass' ? 'aluminium-wood-glass' : sector.slug;
    const ar = cityModel({ locale: 'ar', category: slug, providers: [] });
    const en = cityModel({ locale: 'en', category: slug, providers: [] });
    if (ar?.indexable && en?.indexable) pairs.push({ ar: ar.canonicalPath, en: en.canonicalPath, sector: sector.slug });
  }
  for (const district of districts) {
    for (const sector of sectors) {
      if (sector.slug === 'cleaning-services') continue;
      if (!['ar', 'en'].every(locale =>
        String(districtEditorial(district, sector.slug, locale) || '').trim() &&
        Object.keys(districtGuides(district, sector.slug, locale) || {}).length >= 3
      )) continue;
      if (sector.slug === 'general-maintenance' && (maintenanceTaxonomy?.length !== 2 || !maintenanceTaxonomy.every(items => items?.length))) continue;
      const ar = `/uae/abu-dhabi/al-ain/${district}/${sector.slug}`;
      pairs.push({ ar, en: `/en${ar}`, sector: sector.slug });
    }
  }
  return pairs;
}
module.exports = { alAinReviewedSitemapPairs };
