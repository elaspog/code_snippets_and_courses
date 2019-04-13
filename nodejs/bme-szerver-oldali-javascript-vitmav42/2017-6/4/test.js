
var renderMW = require('./middleware/generic/render');

var mw = renderMW({}, 'test');


// mw(req, res, next)

mw({
	
},{
	end: function (str){
		console.log('EZ A TEST: ' + str);
	}
},function(){
	
});
