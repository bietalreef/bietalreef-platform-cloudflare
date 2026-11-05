const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseSocialVideoUrl } = require('../lib/socialVideoUrl');

test('supported video links yield platform-owned player URLs', () => {
  const facebook = parseSocialVideoUrl('https://www.facebook.com/watch/?v=123456789&ref=share');
  assert.equal(facebook.canonicalVideoId, '123456789');
  assert.equal(new URL(facebook.embedUrl).searchParams.get('href'), 'https://www.facebook.com/watch/?v=123456789');
  const instagram = parseSocialVideoUrl('https://www.instagram.com/reel/ABC_123/?igsh=tracking');
  assert.equal(instagram.embedUrl, 'https://www.instagram.com/reel/ABC_123/embed/');
  const tiktok = parseSocialVideoUrl('https://www.tiktok.com/@example/video/6718335390845095173?share=1');
  assert.equal(tiktok.embedUrl, 'https://www.tiktok.com/player/v1/6718335390845095173');
});

test('unsafe hosts, protocols, ambiguous IDs and embedded markup are rejected', () => {
  for (const value of [
    'http://www.tiktok.com/@example/video/6718335390845095173',
    'https://www.tiktok.com.evil.example/@example/video/6718335390845095173',
    'https://www.tiktok.com@evil.example/@example/video/6718335390845095173',
    'https://evil.example/?url=https://www.instagram.com/reel/ABC_123/',
    'https://www.instagram.com/reel/ABC_123/<script>',
    'https://www.facebook.com/watch/?v=123456789&v=987654321',
    'https://vm.tiktok.com/short-link',
    'javascript:alert(1)',
    '', null,
  ]) assert.equal(parseSocialVideoUrl(value), null, String(value));
});
