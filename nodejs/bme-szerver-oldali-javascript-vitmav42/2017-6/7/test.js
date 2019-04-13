
var renderMW = require('./middleware/generic/render');

/*
// adatbázis tartalma: 'minden'
var db = {
	getAll: function(){
		return 'minden';
	}
}
*/

// teszteset szimulálása: 'semmi'
var objrep = {
	db: {		
		getAll: function(){
			return 'semmi';
		}
	}
};

var mw = renderMW(objrep, 'test');


// mw(req, res, next)

mw({
	
},{
	end: function (str){
		console.log('EZ A TEST: ' + str);
	}
},function(){
	
});
