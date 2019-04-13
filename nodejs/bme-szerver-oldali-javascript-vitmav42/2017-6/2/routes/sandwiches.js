module.exports = function (app) {
	app.use('/', function(req, res, next){
		res.end('itt');
	});
};