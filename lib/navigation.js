export function getLocalizedPath(asPath = '/', targetLocale = 'en') {
  const hashIndex = asPath.indexOf('#');
  const hash = hashIndex >= 0 ? asPath.slice(hashIndex) : '';
  const pathAndQuery = hashIndex >= 0 ? asPath.slice(0, hashIndex) : asPath;
  const queryIndex = pathAndQuery.indexOf('?');
  const query = queryIndex >= 0 ? pathAndQuery.slice(queryIndex) : '';
  const rawPathname = queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;
  const pathname = rawPathname.startsWith('/') ? rawPathname : `/${rawPathname}`;
  const arabicPath = pathname === '/en'
    ? '/'
    : pathname.startsWith('/en/')
      ? pathname.slice(3)
      : pathname;

  let localizedPath;
  if (targetLocale === 'ar') {
    localizedPath = arabicPath;
    if (localizedPath.startsWith('/categories/')) localizedPath = localizedPath.replace('/categories/', '/services/');
  } else {
    const englishSource = arabicPath.startsWith('/services/') && arabicPath.split('/').length === 3
      ? arabicPath.replace('/services/', '/categories/')
      : arabicPath;
    localizedPath = englishSource === '/' ? '/en' : `/en${englishSource}`;
  }

  return `${localizedPath}${query}${hash}`;
}

