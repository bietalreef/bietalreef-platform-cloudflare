import { AREAS } from '../data/localServices';

export function uaeAreaHref(locale = 'ar', emirateSlug, areaSlug) {
  const prefix = locale === 'en' ? '/en' : '';
  const inAlAin = emirateSlug === 'abu-dhabi' && AREAS.some(area => area.slug === areaSlug);
  return `${prefix}/uae/${emirateSlug}${inAlAin ? '/al-ain' : ''}/${areaSlug}`;
}

export function parentNavigationPath(path = '/') {
  const clean = String(path).split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const english = clean === '/en' || clean.startsWith('/en/');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length <= (english ? 1 : 0)) return english ? '/en' : '/';
  parts.pop();
  return parts.length ? `/${parts.join('/')}` : '/';
}

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

