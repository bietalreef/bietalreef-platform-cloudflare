import { fetchTaxonomyTable } from './platformDirectoryCards';

// Existing public projection enforces publication, company ownership and review.
export async function getPublishedPortfolio(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) return [];
  try {
    const profile = await fetchTaxonomyTable('rpc/get_public_provider_profile?p_slug='+encodeURIComponent(slug));
    return Array.isArray(profile?.portfolioProjects) ? profile.portfolioProjects : [];
  } catch (error) {
    console.error('Approved portfolio temporarily unavailable:',error?.message);
    return [];
  }
}
