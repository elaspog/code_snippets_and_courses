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

var macskak = [
	{id:1, nev: 'macska', cirmose: true},
	{id:2, nev: 'pista2', cirmose: true},
	{id:3, nev: 'pista', cirmose: false}
];

var loadMW = function (req, res, next) {
	
	return next();
};

app.use('/items/view', loadMW, renderMW('view'));

app.use('/items/del', loadMW, function(req, res, next){
	var newmacskak = [];
	macskak.forEach(function(item){
		if (item.id == req.query.id){
			return;
		}
		newmacskak.push(item);
	});
	macskak = newmacskak;
	next();
}, function(req,res,next){
	return res.redirect('/');
});

app.use('/', function(req, res, next){
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
