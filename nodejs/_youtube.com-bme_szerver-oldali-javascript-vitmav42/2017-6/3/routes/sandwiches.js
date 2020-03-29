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
		authMW(),
		renderMW(objrep, 'sadd'));

	app.post('/sandwiches/add',
		authMW());

	app.get('/sandwiches/del/:id',
		authMW(),
		function (req, res, next){
			res.end('ok');
		});

	app.get('/sandwiches/mod/:id',
		authMW(),
		renderMW(objrep, 'smod'));

	app.post('/sandwiches/mod/:id',
		authMW());

	app.get('/sandwiches/',
		authMW(),
		renderMW(objrep, 'slist'));

};