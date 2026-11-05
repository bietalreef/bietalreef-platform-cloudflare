// The requested district-level pilot is limited to these two companies.
// Location eligibility still requires a real matching coverage record.
const districtProviders = new Set(['alrehab-home-clean', 'kawkab-al-saeed']);
function allowsDistrictListing(slug) { return districtProviders.has(slug); }
module.exports = { allowsDistrictListing };
