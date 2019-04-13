module.exports = function (objectrepository, viewName) {

	return function (req, res, next) {
		//res.render(viewName, res.tpl);
		console.log('render: ' + viewName);
		res.end('Template: ' + viewName);
	};

};
