// Convert only supported public video URLs into deterministic player URLs.
// This function does not approve a video or verify that embedding is allowed.
function parseSocialVideoUrl(value) {
  if (typeof value !== 'string' || value.length > 2048 || value !== value.trim() || /[\u0000-\u0020<>"']/u.test(value)) return null;

  let url;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;

  const host = url.hostname.toLowerCase();
  let match;
  if (['facebook.com', 'www.facebook.com', 'm.facebook.com'].includes(host)) {
    let id;
    let path;
    if (/^\/watch\/?$/.test(url.pathname)) {
      const ids = url.searchParams.getAll('v');
      if (ids.length !== 1 || !/^\d{6,30}$/.test(ids[0])) return null;
      id = ids[0];
      path = `/watch/?v=${id}`;
    } else if ((match = url.pathname.match(/^\/reel\/(\d{6,30})\/?$/))) {
      id = match[1];
      path = `/reel/${id}/`;
    } else if ((match = url.pathname.match(/^\/([A-Za-z0-9._-]+)\/videos\/(\d{6,30})\/?$/))) {
      id = match[2];
      path = `/${match[1]}/videos/${id}/`;
    } else return null;
    const originalUrl = `https://www.facebook.com${path}`;
    return { sourcePlatform: 'facebook', canonicalVideoId: id, originalUrl,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(originalUrl)}&show_text=false` };
  }

  if (['instagram.com', 'www.instagram.com'].includes(host)) {
    match = url.pathname.match(/^\/(reel|p|tv)\/([A-Za-z0-9_-]{5,32})\/?$/);
    if (!match) return null;
    const originalUrl = `https://www.instagram.com/${match[1]}/${match[2]}/`;
    return { sourcePlatform: 'instagram', canonicalVideoId: match[2], originalUrl, embedUrl: `${originalUrl}embed/` };
  }

  if (['tiktok.com', 'www.tiktok.com', 'm.tiktok.com'].includes(host)) {
    match = url.pathname.match(/^\/@([A-Za-z0-9._-]{1,64})\/video\/(\d{8,30})\/?$/);
    if (!match) return null;
    return { sourcePlatform: 'tiktok', canonicalVideoId: match[2],
      originalUrl: `https://www.tiktok.com/@${match[1]}/video/${match[2]}`,
      embedUrl: `https://www.tiktok.com/player/v1/${match[2]}` };
  }
  return null;
}

module.exports = { parseSocialVideoUrl };
