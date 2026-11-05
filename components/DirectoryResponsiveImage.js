// A single responsive request is chosen by the browser from these WebP variants.
export default function DirectoryResponsiveImage({ asset, locale = 'ar', kind = 'sector', className = '' }) {
  if (!asset) return null;
  const knowledge = kind === 'knowledge';
  const wide = asset.aspect === 'wide';
  const widths = knowledge ? [600, 840, wide ? 1199 : 1200] : [480, 960, 1440];
  return <img
    className={className}
    src={asset.desktop}
    srcSet={`${asset.small} ${widths[0]}w, ${asset.tablet} ${widths[1]}w, ${asset.desktop} ${widths[2]}w`}
    sizes={knowledge ? '(max-width: 700px) 95vw, (max-width: 1024px) 47vw, 31vw' : '(max-width: 1024px) 46vw, 31vw'}
    width={knowledge ? (wide ? 1199 : 1200) : 1440}
    height={knowledge ? (wide ? 675 : 1000) : 810}
    alt={asset.alt[locale]}
    loading="lazy"
    decoding="async"
  />;
}
