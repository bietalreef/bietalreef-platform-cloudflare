const ORIGIN = 'https://bietalreef.ae';

// Describe only profiles actually rendered by the published-data pipeline.
export function providerDirectorySchema(cards, locale = 'ar') {
  const en = locale === 'en';
  const profiles = cards.filter(card => card?.name && typeof card.href === 'string' && /^\/(?:en\/)?providers\//.test(card.href));
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: en ? 'UAE business and professional directory' : 'دليل الشركات والمهنيين في الإمارات',
    url: `${ORIGIN}${en ? '/en' : ''}/providers`,
    inLanguage: en ? 'en-AE' : 'ar-AE',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: profiles.length,
      itemListElement: profiles.map((card, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: { '@type': 'Organization', name: card.name, url: `${ORIGIN}${card.href}` },
      })),
    },
  };
}
