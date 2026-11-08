import {fetchTaxonomyTable} from './platformDirectoryCards';
import {buildSectorTaxonomy} from './sectorTaxonomyModel.cjs';

export async function getSectorTaxonomy(sector, locale='ar', cards=[]) {
  const [categories,categoryMap,specialties,services]=await Promise.all([
    fetchTaxonomyTable('platform_categories?select=id,slug,is_active&is_active=eq.true'),
    fetchTaxonomyTable('platform_category_activity_map?select=activity_id,category_id'),
    fetchTaxonomyTable('platform_specialties?select=id,slug,name_ar,name_en,description_ar,description_en,activity_id,audience_type,is_selectable,is_active,display_order&is_active=eq.true&is_selectable=eq.true&audience_type=eq.company&order=display_order.asc'),
    fetchTaxonomyTable('platform_services?select=id,slug,name_ar,name_en,short_description_ar,short_description_en,specialty_id,is_active,display_order&is_active=eq.true&order=display_order.asc'),
  ]);
  return buildSectorTaxonomy({categories,categoryMap,specialties,services},{sector,locale,cards});
}
