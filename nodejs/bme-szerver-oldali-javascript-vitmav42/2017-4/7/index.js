

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

var valami = {type: 'asdas'}

box.addItem('jozsi');
box.addItem(3);
box.addItem({});
box.addItem({type:'zokni',meret:'42'});
box.addItem(valami);

console.log(box.items);
box.removeItem(3);
console.log(box.items);
box.removeItem({type:'zokni',meret:'41'});
console.log(box.items);
box.removeItem({type:'zokni',meret:'42'});
console.log(box.items);
box.removeItem({type: 'asdas'});
console.log(box.items);
box.removeItem(valami);
console.log(box.items);
