var express = require('express');
var app = express();

app.use(express.static('static'));

//app.use('/', function(req, res, next){...}
app.use(function(req, res, next){
	res.tpl = {};
	return next();	
});

//require('./routes/outside')(app);

// hibakezelés
// - ha a next(err) hívás történik
// - csak egy ilyen lehet
app.use(function(err, req, res, next){
	res.status(500).send('Houston, we have a problem!');
	console.error(err.stack);
});


//app.use('/', function(req, res, next){
//	next();
//});

var server = app.listen(3000, function() {
	console.log('Hello: 3000');
});
