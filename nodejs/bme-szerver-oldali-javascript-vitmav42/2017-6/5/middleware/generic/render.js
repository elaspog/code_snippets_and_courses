
// adatbázis függőséget reprezentálta
// általában require('...'); alakú szokott lenni
//var db = {
//	getAll: function(){
//		return 'minden';
//	}
//}


module.exports = function (objectrepository, viewName) {

	// a db innentől az object repository-n keresztül érkezik le
	var db = objectrepository['db'];

	return function (req, res, next) {
		//res.render(viewName, res.tpl);
		console.log('render: ' + viewName);
		res.end('Template: ' + viewName + ' ' + db.getAll());
	};

};
