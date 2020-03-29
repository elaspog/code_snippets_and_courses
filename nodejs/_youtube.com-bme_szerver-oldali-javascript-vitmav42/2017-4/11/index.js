

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

var valami = {type: 'zokni'};
console.log('\n');
box.items = [];
box.addItem(1);
box.addItem(2);
box.addItem(3);
box.addItem(valami);
console.log(box.items);



//var removeValamit = function(){
//	box.removeItemSafe(valami);
//}
//removeValamit();

// helyett

//var valahova = [box.removeItemSafe.bind(box),valami];
//valahova[0](valahova[1]);

// vagy

//var valahova = {0: box.removeItemSafe.bind(box), 1: valami};
//valahova[0](valahova[1]);

// vagy

var magic = box.removeItemSafe.bind(box,valami);
magic();

console.log(box.items);
