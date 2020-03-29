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
		authMW(objrep),
		// megnezi h letezik-e, ha nem létrehozza res.tpl.sw = {}
		// ellenőrzések
		checkSandwichDataMW(objrep),
		saveSandwich(objrep));

	app.get('/sandwiches/del/:id',
		authMW(objrep),
		loadSandwich(objrep),
		deleteSandwich(objrep)));

	app.get('/sandwiches/mod/:id',
		authMW(objrep),
		loadSandwich(objrep),
		renderMW(objrep, 'smod'));

	app.post('/sandwiches/mod/:id',
		authMW(objrep),
		// res.tpl.sw = ...
		loadSandwich(objrep),
		// megnezi h letezik-e, ha nem létrehozza res.tpl.sw = {}
		// ellenőrzések
		checkSandwichDataMW(objrep),
		// res.tpl.sw.save()
		saveSandwich(objrep));

	app.get('/sandwiches/',
		authMW(objrep),
		loadSandwiches(objrep),
		renderMW(objrep, 'slist'));

};