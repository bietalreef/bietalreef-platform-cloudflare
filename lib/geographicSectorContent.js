import { getAbuDhabiSectorContent } from './abuDhabiSectorContent';

// This is the existing reviewed technical corpus, not a second taxonomy.
// Geographic references are localised for emirate-level service guides;
// individual service facts and service membership remain unchanged.
const names = {
  'sharjah': { ar: 'الشارقة', en: 'Sharjah' },
  'ajman': { ar: 'عجمان', en: 'Ajman' },
};

function adaptServiceText(text, place, locale) {
  const value = String(text || '');
  if (locale === 'en') {
    return value
      .replace(/a Abu Dhabi/g, place === 'Ajman' ? 'an Ajman' : 'a Sharjah')
      .replace(/Abu Dhabi/g, place);
  }
  return value.replace(/أبوظبي/g, place);
}

export function getGeographicSectorContent(sectorSlug, emirateSlug, area=null) {
  const guide = getAbuDhabiSectorContent(sectorSlug);
  if (!guide) return null;
  if (emirateSlug === 'abu-dhabi') return guide;
  const location = names[emirateSlug];
  if (!location) return null;
  const areaAr = area?.nameAr ? area.nameAr + '، ' + location.ar : location.ar;
  const areaEn = area?.nameEn ? area.nameEn + ', ' + location.en : location.en;
  return {
    sector: sectorSlug,
    specialties: guide.specialties.map(group => ({
      ...group,
      services: group.services.map(service => ({
        ...service,
        bodyAr: adaptServiceText(service.bodyAr, areaAr, 'ar'),
        bodyEn: adaptServiceText(service.bodyEn, areaEn, 'en'),
      })),
    })),
  };
}
