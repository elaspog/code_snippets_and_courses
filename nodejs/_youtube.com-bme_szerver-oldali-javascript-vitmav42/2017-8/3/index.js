var express = require('express');
var app = express();

app.set('view engine', 'ejs');

function renderMW(viewName) {
	return function (req, res) {
		res.render(viewName, res.tpl);
	};	
}

app.use('/', function (req, res, next){
	res.tpl = {};
	return next();
});

var loadMW = function (req, res, next) {

};

app.use('/items/view', loadMW, renderMW('view'));

app.use('/items/del', loadMW, function(req, res, next){
	next();
}, function(req,res,next){
	return res.redirect('/');
});

app.use('/', function(req, res, next){
	var macskak = [
		{id:1, nev: 'macska', cirmose: true},
		{id:2, nev: 'pista', cirmose: false},
		{id:3, nev: '<script>alert("macska")</script>', cirmose: false}
	];
	res.tpl.macskak = macskak;
	next();
}, renderMW('index'));

app.use(function(err, req, res, next){
	res.status(500).send('Huston, we have a problem!');
	
	//Flush out the stack to console
	console.error(err.stack);
});

var server = app.listen(3000, function () {
	console.log('Hello: 3000');
});
