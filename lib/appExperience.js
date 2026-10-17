// Reuse existing public routes. Presentation must never create alternate SEO URLs.
function isAppExperience(path = '/') {
  const clean = path.split(/[?#]/)[0].replace(/^\/en(?=\/|$)/, '') || '/';
  return clean === '/' || /^\/(uae|services|categories|providers|request-quote)(\/|$)/.test(clean);
}
module.exports = { isAppExperience };
