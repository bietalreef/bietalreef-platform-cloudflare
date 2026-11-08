// Only approved snapshots from get_public_provider_profile reach the page.
// Construct embeds from a validated social URL; never embed arbitrary HTML.
function portfolioMedia(raw) {
  if (!raw || typeof raw.url !== 'string') return null;
  let url;
  try { url = new URL(raw.url); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();
  const cleanHost = host.replace(/^www\./, '');
  if (raw.type !== 'video') return {kind:'image', url:url.href};
  let embed = null;
  const path = url.pathname.split('/').filter(Boolean);
  if (cleanHost === 'instagram.com') {
    // Both /reel/<code>/ and /<account>/reel/<code>/ are public links.
    const position = path.findIndex(part => ['reel','p','tv'].includes(part));
    const code = position >= 0 ? path[position + 1] : '';
    if (code && /^[A-Za-z0-9_-]{5,30}$/.test(code)) {
      url = new URL(`https://www.instagram.com/${path[position]}/${code}/`);
      embed = `https://www.instagram.com/${path[position]}/${code}/embed/`;
    } else return null;
  } else if (cleanHost === 'youtube.com' || cleanHost === 'm.youtube.com' || cleanHost === 'youtu.be') {
    const id = cleanHost === 'youtu.be' ? path[0] : path[0] === 'shorts' ? path[1] : url.searchParams.get('v');
    if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
    embed = `https://www.youtube-nocookie.com/embed/${id}`;
  } else if (cleanHost === 'vimeo.com') {
    const id = path.find(part => /^\d+$/.test(part));
    if (!id) return null;
    embed = `https://player.vimeo.com/video/${id}`;
  } else if (!['tiktok.com','facebook.com','fb.watch','drive.google.com'].some(domain => cleanHost === domain || cleanHost.endsWith('.'+domain))) {
    return null;
  }
  // Video structured data is emitted only when the reviewed record contains
  // a real upload date and an image hosted on the platform itself.
  let thumbnail = null;
  if (typeof raw.thumbnail_url === 'string') {
    try {
      const candidate = new URL(raw.thumbnail_url, 'https://bietalreef.ae');
      if (candidate.protocol === 'https:' && candidate.hostname === 'bietalreef.ae' &&
          !candidate.username && !candidate.password && /^\/images\//.test(candidate.pathname)) {
        thumbnail = candidate.href;
      }
    } catch {}
  }
  const uploadDate = typeof raw.upload_date === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(raw.upload_date) &&
    !Number.isNaN(Date.parse(raw.upload_date)) ? raw.upload_date : null;
  return {kind:'video',url:url.href,embed,thumbnail,uploadDate};
}
module.exports = {portfolioMedia};
