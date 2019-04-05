
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


## 3. Előadás - Javascript nyelvi elemek (2017)

https://www.youtube.com/watch?v=FAc3RsSYF40

www.destroyallsoftware.com/talks/wat

### Alapok

```
var valtozo = 'ertek'; // ez egy comment
var valtozo = 'ertek2';

/*
Tobbsoros comment
*/

function egyfv (parameter1, parameter2)
	return 'visszateresi ertek';
}
```

Operátorok:
* `==`: érték szerint egyenlő
* `===`: típus és érték szerint egyenlő
* `!=`, `!==`, `>`, `<`, `>=`, `<=`

Gyengén típusos nyelv. Mindent mindenné próbál a JS konvertálni.

__Typescript__ = Javascript + típusok

__if__:

```
var a = '2';
var b = 2;

if (a == b) {}	//true
if (a === b) {}	//false

console.log('3' > 2)	//true

// if + else
if (valami) {
} else if (valami2){
}
```

típusosan kisebb/nagyobb nem nagyon léteznek a nyelvben bár vannak rá megoldások.

__switch__: típusosan switch-elget

```
var b = '0';

switch (b){
  case 0:
    console.log('oh');
	break;
  case '0':
    console.log('hopp');
	break;
  default:
    console.log('meh');
	break;
}
```

__while__:

```
var b = 1;
while (b!==3){
    console.log(b);	//1,2,3
	b+=1;
}
```

### Típusok

C++:

```
int szam = 2;
szam = 'valami';	// Error

string szoveg = new std::string('boo');

void valami = szoveg + szam;	// Error
```

Javascript:

```
var szam = 2;
szam = 'valami';

var szoveg = 'boo';
var valami = szoveg + szam;	//'boovalami' vagy
//ha nincs a 2. sor, akkor 'boo2'
```

a function is értékként kezelhető

automatikus típus konvertálás  
nincs memória kezelés (foglalás / felszabadítás)
nincs referencia kezelés

nem jelzi fordítás időben a hibákat, a működés nem mindig az, mint aminek kellene lennie
default error kezelés: leáll a node process

```
var a = 2;
var b = '2';

console.log(a+b);	// 22 (string)
console.log(a/b);	// 1  (number)
console.log(a*b);	// 4  (number)
```

```
var a = 2;
var b = 'valami';
var c;

console.log(typeof a); // number
console.log(typeof b); // string
console.log(typeof c); // object
```

Alaptípusok:

* Undefined
* Null
* Boolean
* String
* Number
* Object
* Reference
* List
* Completion

__Undefined__

```
console.log(typeof a);	// undefined
console.log(typeof undefined);	// undefined

var a = 2;
console.log(typeof a);	// number (hiszen az előbb definiáltuk)
```

globális változó (vagy bármi, ami definiált de a típusa undefined) részt fehet a műveletekben

```
console.log(undefined + 'alma');	// 'undefinedalma'
console.log(undefined + 3);	// NaN (ez egy number);

var myun = undefined;
if (myun === undefined) {}	// true

// ReferenceError: nemletezo isundefined
if (nemletezo === undefined){}
```

változó létezésének ellenőrzése

```
if (typeof myun !== 'undefined'){
...
}
```

__Null__

globális változónév és típus is
`typeof` értéke `object`

```
var e = null;

console.log(e == 0);		// false
console.log(e == false);	// false
console.log(e == true);		// false
console.log(e);				// null
console.log(!e);			// true
```

__Boolean__

```
var e = true;
var f = false;

console.log(e == 1);			// true
console.log(e == 0);			// false
console.log(f == 0);			// true
console.log(e == undefined);	// false
console.log(f == undefined);	// false
console.log(e == null);			// false
console.log(f == null);			// false
console.log(f == '');			// true
console.log(f == 'aa');			// false
console.log(f == []);			// true
console.log(f == [3]);			// false
console.log(e == {});			// false
console.log(f == {});			// false
```

__String__

Primitív típus, de osztályként viselkedik, mikor műveleteket végzünk rajta. A`+` concatenál és ha kell, konvertál is.

```
var s = 'Lorem ipsum';
var g = 'ipsum';

console.log(s);		// Lorem ipsum
console.log(s+g);		// Lorem ipsumipsum
console.log(s+42+g);		// Lorem ipsum42ipsum
```

`.indexOf(string)`  
`.substr(from,count)`

```
var s = 'Lorem ipsum';
var g = 'ipsum';

console.log(s.indexOf(g));		// 6
console.log(s.indexOf('boo'));	// -1
console.log(s.substr(1,3));		// ore
```

__Number__

Lényegében float-nak felel meg, de int-et is tárolhat. A műveletek a Number "terén" belül maradnak általában.


```
var i = 2;
var j = 5.222;

console.log(i);		// 2
console.log(j);		// 5.222
console.log(i+j);	// 7.222
console.log(i/3);	// 0.66666666666
console.log(i/0);	// Infinity, de nem dob hibát
console.log(i/'2');	// 1
console.log(i/'2a');// Nan (Not-a-Number)

// number, tehát typeof NaN == number ...
console.log(typeof(i));

console.log(typeof(i));	// number
console.log(typeof(i));	// number
```

Reprezentáció határába könnyen bele lehet futni.
0-val osztás Node verziónként eltérhet (nyelvi szabvány nem rögzíti).
NaN egy szám típus.
Nem definiáltak az osztály típusú műveletek, ehelyett a `Math` segédosztályt kell használni.

```
var e = 5.6;

console.log(Math.round(e));	// 6
console.log(Math.floor(e));	// 5
console.log(Math.random());	// 0.80029169973799
```

```
//parseInt(string,radix)
parseInt("10")	// 10
parseInt("10.00")	// 10
parseInt("10.33")	// 10
parseInt("35 45 66")	// 34
parseInt(" 60 ")	// 60
parseInt("40 years")	// 40
parseInt("He was 40")	// NaN

//parseFloat(string)
parseFloat("10")	// 10
parseFloat("10.00")	// 10
parseFloat("10.33")	// 10.33
parseFloat("34 45 66")	// 34
parseFloat(" 60 ")	// 60
parseFloat("40 years")	// 40
parseFloat("He was 40")	// NaN
```

Pontos számításokhoz vannak külső library-k, amelyek C++os függvényre, amely pontosabb.

__List__

`typeof` szerint nincs külön ilyen típus. FIFO és FILO módban is jól tud működni.

```
var lista = [];		// üres lista

lista.push(1);		// lista: [1]
lista.push(2,3);		// lista: [1,2,3]

console.log(lista[1]);		// 2

var elem = lista.pop();		// elem:3, lista: [1,2]
elem = lista.shift();		// elem:1, lista: [2]

console.log(typeof lista);	// object
```

Az `indexOf` típusos ellenőrzést használ.

```
var lista = [1,2,3,'4pista'];
var ret = [];

//foreach(callback,thisObject)
lista.foreach(function(e){
	ret.push(parseInt(e)*2);
});

console.log(ret);		// [2,4,6,8]
console.log(ret.indexOf(4));	// 1
console.log(ret.indexOf('4'));	// -1
```

__Object__

Az Object itt nem Class, definíció szerint: rendezetlen gyűjteménye a kulcs-érték pároknak. Bizonyos nyelvekben ez map. JS-ben keveredik az Object az OOP dolgokkal.

```
var emptyObj = {};		// tagváltozó nélküli objektum

var kutya = {
	lab: 4,
	fej: 1,
	ugat: function(){
		console.log('Nyauuu');
	}
};

console.log(kutya.lab);	// 4
console.log(kutya.fej + 3);	// 4
kutya.ugat();		// Nyauuu

console.log(kutya['lab']);	// 4: így is elérhető
```

Újradefiniálható bármi egy objecten. Bármikor bármi felülírható.

```
kutya.fej = 3;
console.log(kutya.fej);	// 3

kutya.ugat = function(){ console.log('Wuf'); }
kutya.ugat();	// Wuf

// törölhetők is a tagáltozók
delete kutya.lab;
console.log(kutya.lab);	// undefined

console.log(typeof(kutya));	// object
```

Magukra `this`-el tudnak hivatkozni.

```
var kutya = {
	say: 'Wuf',
	ugat: function(){
		console.log(this.say);
	}
};

kutya.ugat();	// Wuf
```

### Osztályok

Minden object-nek van egy `.prototype` tagváltozója, aminek segítségével nem az objektumon, hanem annak ősén, annak osztályán tudunk definiálni. A `new` kulcsszó itt is létezik.

```
function Kutya(mitugat){
	this.say = mitugat;
}

Kutya.prototype.ugat = function(){
	console.log(this.say);
}

var k = new Kutya("Wuf");
k.ugat();

console.log(typeof k);	// object
console.log(k instanceof Kutya);	// true
```

Létrehozva egy változó, amely osztályból kellene származzon, de valóságban function-ből származik, ami egy object nyelvi szinten.
Gyakorlatban kevésszer használva a `new` kulcsszó, helyette inkább __Factory Method__.

Öröklődés:

Jelentősen bonyolultabb, de az ECMAScript 6 ezen javít.
Klasszikus öröklődés:

```
function Kutya(mitugat){ this.say = mitugat; }
Kutya.prototype.ugat = function(){
	console.log(this.say);
}

NagyKutya.prototype = new Kutya();
function NagyKutya(mitugat){
	Kutya.call(this,mitugat);	// konstruktor
}

NagyKutya.prototype.sokatUgat = function(){
	for (var i=0; i<4; i++) { this.ugat(); }
}

var k = new NagyKutya('Wuf');
k.ugat();	// Wuf
k.sokatUgat();	// 4x Wuf
```

NodeJS esetében van egy util modul, abban egy inherits funkció.

```
function Kutya(mitugat){ this.say = mitugat; }
Kutya.prototype.ugat = function(){
	console.log(this.say);
}

function NagyKutya(mitugat){
	Kutya.call(this,mitugat);	// konstruktor
}
util.inerits(NagyKutya, Kutya);

NagyKutya.prototype.sokatUgat = function(){
	for (var i=0; i<4; i++) { this.ugat(); }
}

var k = new NagyKutya('Wuf');
k.ugat();	// Wuf
k.sokatUgat();	// 4x Wuf
```

JS nem annyira használ osztályokat, mert:

* az osztály a Model rétegben hasznos
* az osztály rendezőelvét kiváltja a névtér vagy az object
	* külső lib-ek Factory Method-okat használnak
* osztály állapot tárolásra jó, JS-ben viszont kevés az perzisztens állapotárolás
* ECMAScript 6 előtt nagy a káosz e téren

Factory Method: egy függvény visszaad valamit, ami JS-ben object-nek tűnik, nem kell new object-et hívni.

// JSX és Babel cross compile


### Függvények

```
function osszead(a,b){
	return a+b;
}

osszead(1,3);	// 4
```

Figyelni: változó értelmezésének terére (scope). Vannal lokális és globális változók, mindkettő var-ral definiált, viszont var nélkül is definiálódnak automatikusan a változók. A nem var-ral definiáltak a globális térben kerülnek létrehozásra.

```
function osszead(a,b){
	c = a + b;
	return c;
}

osszead(1,3);	// 4
console.log(c);	// 4 !!!
```

__&lt;none&gt;, var, let, const__

Függvények elmenthetők változókba, egy függvény így átadható egy másiknak paraméterként. Ez a callback alapja.

```
var osszead = function (a,b){
	return a + b;
}

osszead(1,3);	// 4
```

```
function muvelet(a,b,amit){
	console.log("a: " + a + " b: " + b);
	console.log("eredmeny: " + amit(a,b));
}

var osszead = function (a,b){
	return a+b;
}

var kivon = function (a,b){
	return a-b;
}

muvelet(1,3,osszead);	// a: 1, b: 3, eredmeny: 4
muvelet(1,3,kivon);		// a: 1, b: 3, eredmeny: -2
```

Függvényeket visszaadó függvények:

```
function ugat(mit){
	return function(){
		console.log(mit);
	};
}

var valami = 'wuf';
var wuf = ugat(valami);
wuf();	// wuf
```

Nincs referencia / érték alapú átadás, csak paraméter átadás.

### Closure

Függvények, amelyek szabad/független változókra hivatkoznak. A closure-ban definiált függvény emlékszik a környezetre, amelyben létre lett hozva.

A `setTimeout(fv,ms)` egy __async__ függvény, amely az átadott callback függvényt az átadott idő elteltével hívja meg.

```
var a=0;	// 1.

setTimeout(function(){
	a+=10;	// 5.
	console.log('Hopp: ' + a);	// 6.
},1000);	// 2. setTimeout hívása, nem a belső függvényé

a+=1;	// 3.
console.log('Kopp: ' + a);	//4.

// eredmény:
// Kopp: 1
// Hopp: 11
```

```
function belso(a){	// 'a' szerencsétlen elnevezés, de nincs kihatása, mert érték alapon adódik át
	return function (){	// 3.
		a+=10;	// 6.
		console.log('Hopp: ' + a);	// 7.
	};
}

var a=0;	// 1.
setTimeout(belso(a),1000);	// 2. a belső fv is lefut, egy fv-t ad vissza

a+=1;	// 4.
console.log('Kopp: ' + a);	// 5.

// eredmény:
// Kopp: 1
// Hopp: 11
```

Működésben (átrendezve):

```
//function belso(a){	// 'a' szerencsétlen elnevezés, de nincs kihatása, mert érték alapon adódik át
//	var b=a;
//	return function(){	// 3.
//		b+=10;	// 6.
//		console.log('Hopp: ' + b);	// 7.
//	};
//}
```

```
function belso(a){
	return function (){
		a.ertek+=10;
		console.log('Hopp: ' + a.ertek);
	};
}

var a={ertek:0};	// ugy viselkedik mint egy pointer/referencia
setTimeout(belso(a),1000);

a.ertek += 1;
a = {ertek:2};	// ez a lényeg
console.log('Kopp: ' + a.ertek);

// eredmény:
// Kopp: 2
// Hopp: 11
```

Closure-ök: a belső függvények olyan külső (akár globális akár lokális) változókra hivatkoznak, amikkel a függvény létrehozása és meghívása során bármi történhet. Így a javascript engine a változókat "megpróbálja megtartani" referenciaként.
Objectek esetében ha az őket tartalmazó változó módosul, akkor lényegében új objektum jön létre és nem az eredeti referencia szerintei érték módusul.
Egyszerű típusok (string, number) esetében ezzel nincs gond, mivel nem jön létre új objektum, hanem a meglevő érték módosul.

Teljes objecteket klónozni nem szokás a nyelvben.

```
for (var i=0; i<4;i++){
	setTimeout(function(){
		console.log(i);
	},100);
}

// 4 db 4-est ír ki, mert az i változik, a függvény később fut le
```

__Async library__, vagy __Promise__-ok: megoldható, hogy az iteráció csak akkor lépjen a következő elemre, ha a megelőző elem futása már befejeződött.

```
for (var i=0; i<4; i++){
	setTimeout((function(szam){return function(){	// *
		console.log(szam);
	}})(i),100);
}

// itt már 0,1,2,3 íródik ki, mert létrejön egy szam nevű lokális válotzó (ami lehetne i is)
// * direktbe ráhív i értékével, nem menti el változóba
```

