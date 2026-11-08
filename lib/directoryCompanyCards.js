const nameFor = (row, locale, key = 'name') => row?.[`${key}_${locale}`] || row?.[`${key}_ar`] || '';

export function companyCardFromPresence(data, locale = 'ar') {
  if (!data?.profile) return null;
  const profile = data.profile;
  const slug = profile.slug || 'alrehab-home-clean';
  const href = `${locale === 'en' ? '/en' : ''}/providers/${slug}`;
  let summary = nameFor(profile, locale, 'short_description');
  // Coverage must be confirmed for the requested address; an old profile
  // description made a blanket claim for all seven emirates.
  if (slug === 'alrehab-home-clean') {
    summary = summary.replace(/\s*في جميع أنحاء الإمارات/g, '')
      .replace(/\s+(?:across|throughout) (?:the )?(?:UAE|United Arab Emirates)\b/gi, '');
  }
  return {
    id: profile.id || slug, href, name: nameFor(profile, locale), providerCode: profile.public_provider_code || null,
    summary,
    coverImage: data.media?.cover || profile.cover_image_url,
    logoImage: data.media?.avatar || profile.logo_url,
    verified: profile.verification_status === 'verified',
    city: nameFor(profile, locale, 'address') || (slug === 'alrehab-home-clean' ? (locale === 'ar' ? 'العين، أبوظبي' : 'Al Ain, Abu Dhabi') : ''),
    phone: profile.phone, whatsapp: profile.whatsapp,
    serviceLinks: (data.services || []).slice(0, 4).map(service => ({ name: nameFor(service, locale), href: `${href}/services/${service.slug}` })),
  };
}

export function canonicalCompanyPath(item) {
  const path = (item?.href || (item?.slug ? `/providers/${item.slug}` : '')).split(/[?#]/)[0].replace(/^\/en(?=\/)/, '').replace(/\/$/, '');
  return path.replace('/providers/alrehab-cleaning-sanitizing', '/providers/alrehab-home-clean')
    .replace('/providers/provider-3000485', '/providers/kawkab-al-saeed');
}

export function uniqueCompanyCards(items) {
  const seen = new Set();
  return items.filter(Boolean).filter(item => {
    const key = canonicalCompanyPath(item) || item.id;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function directoryCompanyCards(providers, rehab, alNaeem, locale = 'ar') {
  return uniqueCompanyCards([companyCardFromPresence(rehab, locale), companyCardFromPresence(alNaeem, locale), ...providers]);
}
