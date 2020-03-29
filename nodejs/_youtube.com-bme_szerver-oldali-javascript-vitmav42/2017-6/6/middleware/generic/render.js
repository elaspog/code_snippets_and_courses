
var requireOption = require('../common').requireOption;


module.exports = function (objectrepository, viewName) {

	// a db innentől az object repository-n keresztül érkezik le
	var db = requireOption(objectrepository, 'db');

	return function (req, res, next) {
		//res.render(viewName, res.tpl);
		console.log('render: ' + viewName);
		res.end('Template: ' + viewName + ' ' + db.getAll());
	};

};
