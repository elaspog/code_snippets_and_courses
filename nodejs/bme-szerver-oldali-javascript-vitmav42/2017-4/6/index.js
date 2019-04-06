var a = "asd";


function calc(a,b,muvelet,cb){
	muvelet(a,b,cb);	//szignatúra
}

function osszead(a,b,cb){
	cb(a+b);
	console.log("osszeadas muvelet vege");
}

function kivonas(a,b,cb){
	setTimeout(function(){
		cb(a-b);
	},1000);
	console.log("kivonas muvelet vege");
}

calc(1,2,osszead,function(eredmeny){
	console.log(eredmeny);
});

calc(1,2,kivonas,function(eredmeny){
	console.log(eredmeny);
});
