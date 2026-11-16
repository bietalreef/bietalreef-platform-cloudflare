import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { UAE_MAIN_SECTORS } from '../../data/directoryDiscovery';
import { UAE_SECTOR_ASSETS } from '../../data/uaeDirectoryVisuals';
import visualData from '../../data/sectorGuideVisuals.json';
import styles from './ProjectDiscovery.module.css';

// These are the same illustrations and captions used by the existing directory.
// Only the image selection lives here: sector names, descriptions and routes
// continue to come from the shared directory taxonomy.
function sectorImages(sector) {
  const asset = UAE_SECTOR_ASSETS[sector.slug];
  const overview = { desktop: asset.desktop, mobile: asset.small, alt: asset.alt, title: sector.name };
  if (sector.slug === 'furniture-decor') {
    return [overview, visualData['aluminium-glass'].items[1], visualData['interior-design'].items[5]];
  }
  if (sector.slug === 'equipment-rental') {
    return [overview, {
      desktop: '/images/sector-cards/factories-suppliers-workshops-card.webp',
      mobile: '/images/sector-cards/factories-suppliers-workshops-card.webp',
      title: { ar: 'المصانع والورش والتوريد', en: 'Factories, workshops and supply' },
      alt: { ar: 'مشهد توضيحي لمصنع وورش ومستودع مواد', en: 'Illustration of a factory, workshops and material storage' },
    }];
  }
  return [overview, ...(visualData[sector.slug]?.items || []).slice(0, 3)];
}

function SectorCard({ sector, locale }) {
  const en = locale === 'en';
  const strip = useRef(null);
  const Arrow = en ? ArrowRight : ArrowLeft;
  const images = sectorImages(sector);
  const path = `${en ? '/en/categories' : '/services'}/${sector.slug}`;
  const companyPath = `${en ? '/en' : ''}/providers/specialty/${sector.slug}`;
  const move = direction => {
    const node = strip.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({ left: (en ? direction : -direction) * node.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
  };
  return <article className={styles.sectorCard}>
    <div className={styles.sectorMedia}>
      <div ref={strip} className={styles.sectorSlides} tabIndex={0} aria-label={en ? `Images: ${sector.name.en}` : `صور: ${sector.name.ar}`}>
        {images.map((image, index) => <figure className={styles.sectorSlide} key={image.desktop}>
          <picture>
            <source media="(max-width: 700px)" srcSet={image.mobile || image.desktop}/>
            <img src={image.mobile || image.desktop} alt={image.alt[locale]} width="600" height="450" loading="lazy" decoding="async"/>
          </picture>
          <figcaption>{image.title[locale]}</figcaption>
        </figure>)}
      </div>
      <div className={styles.slideControls}>
        <button type="button" onClick={() => move(-1)} aria-label={en ? `Previous image: ${sector.name.en}` : `الصورة السابقة: ${sector.name.ar}`}><ChevronRight aria-hidden="true" className={en ? styles.flip : ''}/></button>
        <button type="button" onClick={() => move(1)} aria-label={en ? `Next image: ${sector.name.en}` : `الصورة التالية: ${sector.name.ar}`}><ChevronLeft aria-hidden="true" className={en ? styles.flip : ''}/></button>
      </div>
    </div>
    <div className={styles.sectorBody}>
      <h3>{sector.name[locale]}</h3>
      <p>{sector.description[locale]}</p>
      <div className={styles.sectorActions}>
        <Link href={path} aria-label={(en ? 'Read the service guide: ' : 'المزيد عن خدمات ') + sector.name[locale]}>{en ? 'More' : 'المزيد'}</Link>
        <Link href={companyPath} aria-label={(en ? 'Explore companies: ' : 'استكشف شركات ') + sector.name[locale]}>{en ? 'Explore' : 'استكشف'}<Arrow aria-hidden="true"/></Link>
      </div>
    </div>
  </article>;
}

export default function HomeSectorShowcase({ locale = 'ar' }) {
  const en = locale === 'en';
  const Arrow = en ? ArrowRight : ArrowLeft;
  return <section className={`${styles.section} ${styles.sectors}`} aria-labelledby="home-sectors-title">
    <div className={styles.sectionHead}>
      <div>
        <span className={styles.eyebrow}>{en ? 'SERVICES, SHOPS AND SUPPLIERS' : 'خدمات وشركات وتوريد'}</span>
        <h2 id="home-sectors-title">{en ? 'Explore sectors for your home and project' : 'استكشف قطاعات بيتك ومشروعك'}</h2>
        <p>{en ? 'Explore the directory’s sectors, their services and companies across the UAE.' : 'تعرّف على قطاعات الدليل وخدماتها، واستكشف الشركات في الإمارات.'}</p>
      </div>
      <Link href={`${en ? '/en' : ''}/uae`} className={styles.textLink}>{en ? 'UAE directory' : 'دليل الإمارات'}<Arrow aria-hidden="true"/></Link>
    </div>
    <div className={styles.sectorGrid}>{UAE_MAIN_SECTORS.map(sector => <SectorCard key={sector.slug} sector={sector} locale={locale}/>)}</div>
  </section>;
}
