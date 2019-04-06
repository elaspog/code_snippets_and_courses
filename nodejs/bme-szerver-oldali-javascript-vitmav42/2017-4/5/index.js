var a = "asd";

function osszead(a,b,cb){
	console.log("o start");
	setTimeout(function(){
		cb(a+b)
	}, 1000);
	console.log("o end");
}

console.log("full start");
osszead(1,2,function(eredmeny){
	console.log(eredmeny);
});
console.log("full end");