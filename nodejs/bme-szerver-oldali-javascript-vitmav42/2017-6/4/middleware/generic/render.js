
var db = {
	getAll: function(){
		return 'minden';
	}
}


module.exports = function (objectrepositor, viewName) {

	return function (req, res, next) {
		//res.render(viewName, res.tpl);
		console.log('render: ' + viewName);
		res.end('Template: ' + viewName + ' ' + db.getAll());
	};

};
