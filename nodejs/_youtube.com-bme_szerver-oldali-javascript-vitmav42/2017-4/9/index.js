

var box = {
	items: [],
	addItem: function(item){
		this.items.push(item);
	},
	removeItem: function(item){
		this.items.splice(this.items.indexOf(item),1);
	},
	removeItemSafe: function(amit){
		var tmp = [];
		this.items.forEach(function(item,i){
			if (amit != item){
				tmp.push(item);
			}
		});
		this.items = tmp;
	}
};
// kívülről is rá bind-olható a függvény, tagváltozó stb.
//box.remoteItem = function(item){
//};

function reinit() {
	
	console.log('\n');
	box.items = [];
	box.addItem(1);
	box.addItem(2);
	box.addItem(3);
	box.addItem(4);
	console.log(box.items);
}


setTimeout( () => {
	reinit();
	for (var i = 1; i < 3; i++){
		setTimeout(function(){
			box.removeItem(i);
			console.log('ezittbent '+i)
			console.log(box.items)
		}, 10);
	}
	console.log('ittavege');
	console.log(box.items);

}, 1000);

setTimeout( () => {
	reinit();
	for (var i = 1; i < 3; i++){
		setTimeout(function(){
			box.removeItemSafe(i);
			console.log('ezittbent '+i)
			console.log(box.items)
		}, 10);
	}
	console.log('ittavege');
	console.log(box.items);

}, 2000);

setTimeout( () => {
	reinit();
	for (var i = 1; i < 3; i++){
		(function(a) {
			setTimeout(function(){
				box.removeItem(a);
				console.log('ezittbent '+a);
				console.log(box.items);
			}, 10)
		})(i);
	}
	console.log('ittavege');
	console.log(box.items);

}, 3000);

setTimeout( () => {
	reinit();
	for (var i = 1; i < 3; i++){
		(function(a) {
			setTimeout(function(){
				box.removeItemSafe(a);
				console.log('ezittbent '+a);
				console.log(box.items);
			}, 10)
		})(i);
	}
	console.log('ittavege');
	console.log(box.items);

}, 4000);