module.exports = function (app) {
	
	var authMW = function(){
		return function (req, res, next){
			console.log("authmw");
			return next();
		};
	}
	var renderMW = require('../middleware/generic/render');
	
	var objrep = {};

	app.get('/sandwiches/add',
		authMW(objrep),
		renderMW(objrep, 'sadd'));

	app.post('/sandwiches/add',
		authMW(objrep));

	app.get('/sandwiches/del/:id',
		authMW(objrep),
		function (req, res, next){
			res.end('ok');
		});

	app.get('/sandwiches/mod/:id',
		authMW(objrep),
		renderMW(objrep, 'smod'));

	app.post('/sandwiches/mod/:id',
		authMW(objrep));

	app.get('/sandwiches/',
		authMW(objrep),
		renderMW(objrep, 'slist'));

};