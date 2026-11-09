import contractingGuides from '../data/abuDhabiConstructionServiceGuides.json';
import interiorGuides from '../data/abuDhabiSectorContent/interior-design.json';
import maintenanceGuides from '../data/abuDhabiSectorContent/general-maintenance.json';
import materialsGuides from '../data/abuDhabiSectorContent/building-materials.json';
import workshopsGuides from '../data/abuDhabiSectorContent/aluminium-glass.json';
import furnitureGuides from '../data/abuDhabiSectorContent/furniture-decor.json';
import equipmentGuides from '../data/abuDhabiSectorContent/equipment-rental.json';
import cleaningGuides from '../data/abuDhabiSectorContent/cleaning-services.json';

// Server-only editorial retrieval for the eight existing Abu Dhabi sector routes.
// The Supabase taxonomy still decides which specialties and services can be displayed.
const guidesBySector = {
  'general-contracting': contractingGuides,
  'interior-design': interiorGuides,
  'general-maintenance': maintenanceGuides,
  'building-materials': materialsGuides,
  'aluminium-glass': workshopsGuides,
  'furniture-decor': furnitureGuides,
  'equipment-rental': equipmentGuides,
  'cleaning-services': cleaningGuides,
};

export function getAbuDhabiSectorContent(sectorSlug) {
  const entry = guidesBySector[sectorSlug];
  return entry ? { sector: sectorSlug, specialties: entry.specialties } : null;
}
