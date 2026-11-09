import Head from 'next/head';
import { UAE_ATLAS_IMAGES } from '../data/uaeAtlasImages';
import { getSectorCardImage } from '../lib/sectorCards';

const imageByEmirate = Object.fromEntries(UAE_ATLAS_IMAGES.emirates.map((item) => [item.slug, item.image]));

export default function UaeDirectorySeo({ locale = 'ar', title, seoTitle, description, path, alternatePath, emirate, area = null, service, image }) {
  const isEn = locale === 'en';
  const canonical = `https://bietalreef.ae${path}`;
  const alternate = `https://bietalreef.ae${alternatePath}`;
  const imagePath = image || (service ? getSectorCardImage(service.slug) : imageByEmirate[emirate.slug]) || UAE_ATLAS_IMAGES.heroDesktop;
  const shareImage = `https://bietalreef.ae${imagePath}`;
  const imageWidth = image ? 1440 : service ? 1536 : 1600;
  const imageHeight = image ? 810 : service ? 864 : 1000;
  const fullTitle = seoTitle || `${title} | ${isEn ? 'Biet Al Reef' : 'بيت الريف'}`;
  const hasSectorPath = !!emirate?.slug && !!service;
  const breadcrumbData = hasSectorPath ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'UAE directory' : 'دليل الإمارات', item: 'https://bietalreef.ae' + (isEn ? '/en/uae' : '/uae') },
      { '@type': 'ListItem', position: 2, name: isEn ? emirate.nameEn : emirate.nameAr, item: 'https://bietalreef.ae' + (isEn ? '/en' : '') + '/uae/' + emirate.slug },
      ...(area ? [{ '@type': 'ListItem', position: 3, name: isEn ? area.nameEn : area.nameAr, item: 'https://bietalreef.ae' + (isEn ? '/en' : '') + '/uae/' + emirate.slug + '/' + area.slug }] : []),
      { '@type': 'ListItem', position: area ? 4 : 3, name: title, item: canonical },
    ],
  } : null;


  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar-AE" href={isEn ? alternate : canonical} />
      <link rel="alternate" hrefLang="en-AE" href={isEn ? canonical : alternate} />
      <link rel="alternate" hrefLang="x-default" href={isEn ? alternate : canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={isEn ? 'Biet Al Reef' : 'بيت الريف'} />
      <meta property="og:locale" content={isEn ? 'en_AE' : 'ar_AE'} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:secure_url" content={shareImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {breadcrumbData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} /> : null}
    </Head>
  );
}
