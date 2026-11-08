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
test('security policy permits only the supported embed origins',()=>{
 const fs=require('node:fs');const config=fs.readFileSync(require('node:path').join(__dirname,'../next.config.js'),'utf8');
 assert.match(config,/frame-src https:\/\/www\.youtube-nocookie\.com https:\/\/www\.instagram\.com https:\/\/player\.vimeo\.com/);
 assert.doesNotMatch(config,/frame-src [^;]*\*/);
});
