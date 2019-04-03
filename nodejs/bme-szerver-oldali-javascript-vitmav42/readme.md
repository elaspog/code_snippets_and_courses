
# Tutorial

## 1. Előadás - Bevezetés (2019)

https://www.youtube.com/watch?v=x6a5ZpbZufw

https://portal.vik.bme.hu/kepzes/targyak/vitmav42
https://malna.tmit.bme.hu/vitmav42
https://tinyurl.com/nodeyoutube
https://github.com/VITMAV42

* CSS, HTML, JS
* SASS, LESS, Stylus, Bootstrap, Foundation, JS (ES6, ES2016), jQuery, Babel, Gulp, Webpack, React, Angular, Vue, ...

https://code.google.com/p/v8

V8 motor = JIT

JS: single process, single thread

npm - package manager
https://www.npmjs.com

```
var https = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.write('<p>Hello world!</p>');
	res.end();
});

var port = 3000;
server.listen(port, function() {
	console.log('server listening on port ' + port);
});
```

npm colors:

```
npm install colors
```

node_modules
package.json

```
npm install
```

```
var https = require('http');
var colors = require('colors');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	console.log('URL: ' + colors.red(req.url));
	res.write('<p>Hello world!</p>');
	res.end();
});

var port = 3000;
server.listen(port, function() {
	console.log('server listening on port ' + port);
});
```

## 1. Előadás - Bevezetés (2017) (TODO)

https://www.youtube.com/watch?v=tKIn8nAAvRI

http://www.ustream.tv/recorded/61492206


## 2. Gyakorlat - Fejlesztőkörnyezet összerakása (2017)

https://www.youtube.com/watch?v=7V2Na_2encY

* programok telepítése
	* mongodb
	* robomongo
	* nodejs
	* webstorm

https://www.jetbrains.com/webstorm
https://robomongo.org/download

```
node -v
npm -v
mongod
mkdir c:/data/db
```

* package-k telepítése és (példa 1)

```
npm init
npm install // npm i
npm i colors
npm i colors --save // package.json-ba verziószám
npm i express ejs --save
node index.js
```

* modulok publikálása:

```
// module.exports = ... ;	// az importált modulban
```

* static könyvtár által kiszolgált `index.html` (példa 2)

* nodemon
	* telepítés
		* lokális telepítés: `package.json`-be kerül
		* globális telepítés (`-g`): mindenki számára elérhető
	* kód változásra újraindítja az alkalmazást
		* pl. Express-es middleware-ben változik valami, érdemes újraindítatatni vele
		* pl. legtöbb templating engine mindig fájlrendszerről felolvas, nincs benne cache, így újraindítani sem kell

```
npm i nodemon -g
nodemon
// nodemon index.js
```

* HTML (példa 3)

* Boostrap (példa 4,5,6,7)

https://getbootstrap.com

minify: Gulp, Webpack  
grid: Boodstrap, Foundation  
szöveg generálás: Lorem Ipsum szöveg

https://getbootstrap.com/getting-started  
https://getbootstrap.com/css



