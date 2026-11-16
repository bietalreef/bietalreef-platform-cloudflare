// Contextual copies of a provider's collection contain the same list as the
// main profile. Individual geographic services and the local profile itself
// retain their own route and are not collapsed into the collection.
function alNaeemCanonicalRoute(route = {}) {
  if (route.contextBase && !route.slug && ['services', 'offers', 'service-areas'].includes(route.kind)) {
    return { kind: route.kind };
  }
  return route;
}
module.exports = { alNaeemCanonicalRoute };
