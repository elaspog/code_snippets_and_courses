

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


console.log('\n');
box.items = [];
box.addItem(1);
box.addItem(2);
box.addItem(3);
box.addItem(4);
console.log(box.items);

function uberRemoveFunction(a) {	// érték paraméter fogadásnál OK, objectnél nem
	setTimeout(function(){
		box.removeItemSafe(a);
		console.log('ezittbent '+a);
		console.log(box.items);
	}, 10)
}

for (var i = 1; i < 3; i++){
	uberRemoveFunction(i);
}
console.log('ittavege');
console.log(box.items);

