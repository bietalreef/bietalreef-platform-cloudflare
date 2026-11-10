import { resolveLanguagePaths } from '../lib/searchIndexRoutes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UAE_SECTOR_ASSETS } from '../data/uaeDirectoryVisuals';

const SITE_DOMAIN = 'https://bietalreef.ae';
const SITE_NAME = 'بيت الريف';
const DEFAULT_OG_IMAGE = 'https://bietalreef.ae/images/seo/home/biet-al-reef-directory-og.webp';
const SECTOR_ALIASES = {'aluminium-wood-glass':'aluminium-glass','factories-suppliers':'equipment-rental','hourly-cleaning':'cleaning-services'};
function contextualImage(path) {
  const parts = path.split('/').filter(Boolean);
  const sector = parts.map(part => SECTOR_ALIASES[part] || part).find(part => UAE_SECTOR_ASSETS[part]);
  if (sector) return `${SITE_DOMAIN}${UAE_SECTOR_ASSETS[sector].desktop}`;
  if (parts.includes('uae') && parts.includes('al-ain')) return `${SITE_DOMAIN}/images/uae/places/al-ain-oasis-1440.webp`;
  return DEFAULT_OG_IMAGE;
}
export default function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogType = 'website',
  noIndex = false,
  noIndexFollow = false,
  structuredData = null,
  breadcrumbs = null,
  canonicalPath,
  alternatePath,
  arabicPath,
}) {
  const router = useRouter();
  const cleanPath = String(canonicalPath || router.asPath).replace(SITE_DOMAIN, '').split(/[?#]/)[0] || '/';
  const canonicalUrl = cleanPath === '/' || cleanPath === '' ? SITE_DOMAIN : `${SITE_DOMAIN}${cleanPath}`;
  const selectedImage = ogImage || contextualImage(cleanPath);
  const shareImage = selectedImage.startsWith('/') ? `${SITE_DOMAIN}${selectedImage}` : selectedImage;
  const width = ogImageWidth ?? (shareImage === DEFAULT_OG_IMAGE ? 1200 : undefined);
  const height = ogImageHeight ?? (shareImage === DEFAULT_OG_IMAGE ? 630 : undefined);
  const extension = shareImage.toLowerCase().split(/[?#]/)[0];
  const paths = resolveLanguagePaths(cleanPath);
  const enPath = alternatePath || paths.englishPath;
  const localArabicPath = arabicPath || paths.arabicPath;
  const arabicUrl = localArabicPath === '/' ? SITE_DOMAIN : `${SITE_DOMAIN}${localArabicPath}`;
  const englishUrl = enPath ? `${SITE_DOMAIN}${enPath}` : null;
  const pageLanguage = paths.isEnglish ? 'en-AE' : 'ar-AE';

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: paths.isEnglish ? 'Home' : 'الرئيسية', item: SITE_DOMAIN },
          ...breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: crumb.item || `${SITE_DOMAIN}${crumb.href || ''}`,
          })),
        ],
      }
    : null;

  const schemas = [];
  if (structuredData) {
    if (Array.isArray(structuredData)) schemas.push(...structuredData);
    else schemas.push(structuredData);
  }
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? (noIndexFollow ? 'noindex, follow' : 'noindex, nofollow') : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content={SITE_NAME} />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content={paths.isEnglish ? 'United Arab Emirates' : 'الإمارات العربية المتحدة'} />
      <meta httpEquiv="content-language" content={pageLanguage} />
      {/* React hrefLang renders the standard HTML hreflang attribute. */}
      <link rel="alternate" hrefLang="ar-AE" href={arabicUrl} />
      {englishUrl ? <link rel="alternate" hrefLang="en-AE" href={englishUrl} /> : null}
      <link rel="alternate" hrefLang="x-default" href={arabicUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:type" content={extension.endsWith('.webp') ? 'image/webp' : extension.endsWith('.png') ? 'image/png' : 'image/jpeg'} />
      <meta property="og:image:secure_url" content={shareImage} />
      {Number.isFinite(width) ? <meta property="og:image:width" content={String(width)} /> : null}
      {Number.isFinite(height) ? <meta property="og:image:height" content={String(height)} /> : null}
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={paths.isEnglish ? 'en_AE' : 'ar_AE'} />
      <meta property="og:locale:alternate" content={paths.isEnglish ? 'ar_AE' : 'en_AE'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bietalreef" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="theme-color" content="#0F3F1A" />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      ))}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
