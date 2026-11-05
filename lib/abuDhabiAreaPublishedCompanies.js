import {getUaeDirectoryEntities} from './platformDirectoryCards';

// One classification union, then the existing publication + actual-coverage filter.
// Never list a company based only on its city name or a hardcoded slug.
export async function getPublishedAbuDhabiAreaCompanies(directoryCards,locale,areaSlug){
  const providerCards=(directoryCards||[]).filter(card=>card.sectionKey==='providers'&&card.activity);
  if(!providerCards.length)return [];
  const unique=(rows)=>[...new Map(rows.filter(item=>item?.id).map(item=>[item.id,item])).values()];
  const card={sectionKey:'providers',activity:{
    categories:unique(providerCards.flatMap(c=>c.activity.categories||[])),
    specialties:unique(providerCards.flatMap(c=>c.activity.specialties||[])),
    services:unique(providerCards.flatMap(c=>c.activity.services||[])),
  }};
  const entities=await getUaeDirectoryEntities(card,locale,'abu-dhabi',areaSlug);
  return entities.filter(item=>item?.entityType==='provider'&&item?.href);
}
