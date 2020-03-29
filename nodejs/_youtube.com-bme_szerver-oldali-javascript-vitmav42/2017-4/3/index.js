var osszead = require('./x');

console.log(osszead.osszead);

console.log(osszead.getPI3());
console.log(osszead.PI3);
osszead.morepi();
console.log(osszead.getPI3());
console.log(osszead.PI3);
osszead.PI3++;
console.log(osszead.getPI3());
console.log(osszead.PI3);	// sajnos működik, pedig nem kéne tudni felülírni



console.log = function(){}	// nem jó felülírni
