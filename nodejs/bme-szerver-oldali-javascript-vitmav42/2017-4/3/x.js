var PI = 3.13;
function osszead(a, b){
	return a + b;
};

function morepi(){
	PI++;
}

module.exports.PI3 = PI;	// getterrel kéne kiajánlani
module.exports.getPI3 = function(){	// függvény direktben történő kiajánlása
	return PI;
}
module.exports.osszead = osszead;
module.exports.morepi = morepi;		// függvény indirekt kiajánlása
