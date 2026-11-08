const {test} = require('node:test');
const assert = require('node:assert/strict');
const {portfolioMedia} = require('../lib/portfolioMedia.cjs');
test('published Instagram reels use a constrained embed and canonical original link',()=>{
 const m=portfolioMedia({type:'video',url:'https://www.instagram.com/alrehab_home_cleaning/reel/DfSPnTeOAbB/?utm_source=share'});
 assert.equal(m.url,'https://www.instagram.com/reel/DfSPnTeOAbB/');
 assert.equal(m.embed,'https://www.instagram.com/reel/DfSPnTeOAbB/embed/');
});
test('social embeds reject spoofed hosts and invalid paths',()=>{
 assert.equal(portfolioMedia({type:'video',url:'https://instagram.com.evil.example/reel/DfSPnTeOAbB/'}),null);
 assert.equal(portfolioMedia({type:'video',url:'javascript:alert(1)'}),null);
 assert.equal(portfolioMedia({type:'video',url:'https://www.instagram.com/reel/not%2Fvalid/'}),null);
});
test('video links without a safe embed still link to their real origin',()=>{
 const m=portfolioMedia({type:'video',url:'https://www.tiktok.com/@example/video/12345'});
 assert.equal(m.embed,null);assert.equal(m.url,'https://www.tiktok.com/@example/video/12345');
});
test('video metadata accepts a real first-publication date and a platform-hosted thumbnail',()=>{
 const m=portfolioMedia({type:'video',url:'https://www.instagram.com/reel/Dd8659zOf_j/',thumbnail_url:'https://bietalreef.ae/images/providers/alrehab/videos/sofa.webp',upload_date:'2026-10-01T12:48:18.000Z'});
 assert.equal(m.thumbnail,'https://bietalreef.ae/images/providers/alrehab/videos/sofa.webp');
 assert.equal(m.uploadDate,'2026-10-01T12:48:18.000Z');
});
test('untrusted thumbnail hosts and malformed publication dates do not become structured data',()=>{
 const m=portfolioMedia({type:'video',url:'https://www.instagram.com/reel/Dd8659zOf_j/',thumbnail_url:'https://bietalreef.ae.evil.example/images/a.webp',upload_date:'not-a-date'});
 assert.equal(m.thumbnail,null);assert.equal(m.uploadDate,null);
});
test('security policy permits only the supported embed origins',()=>{
 const fs=require('node:fs');const config=fs.readFileSync(require('node:path').join(__dirname,'../next.config.js'),'utf8');
 assert.match(config,/frame-src https:\/\/www\.youtube-nocookie\.com https:\/\/www\.instagram\.com https:\/\/player\.vimeo\.com/);
 assert.doesNotMatch(config,/frame-src [^;]*\*/);
});
