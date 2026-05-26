var wc = require('hexo-wordcount');
var fs = require('fs');
var c = fs.readFileSync('source/_posts/futurism-theme-guide.md', 'utf8');
console.log('wordcount:', wc(c));
console.log('min2read:', wc.min2read(c));

// Count Chinese characters manually
var chinese = c.match(/[\u4e00-\u9fff]/g);
console.log('Chinese chars:', chinese ? chinese.length : 0);
console.log('Total chars:', c.length);
