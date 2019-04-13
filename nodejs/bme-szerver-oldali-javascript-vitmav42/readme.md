
# Tutorial

https://www.youtube.com/channel/UCG6cDGNzf63pH-x74HGKXNw/videos

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

## 4. Gyakorlat - Javascript nyelvi elemek gyakorlat (2017)

https://www.youtube.com/watch?v=Nbt7Qm5onKQ

Chrome -> developer mode
inspect, console, sources, breakpoint, minified JS

in console:

```
> var a = "33";
> a
> typeof a
> a + 2
> a + 3
> parseInt(a) + a
> function b(){console.log("asd");}
> b()
```

__Debug:__

(példa 1) index.js

Chrome debuggeren keresztül:

```
node --inspect --debug-brk index.js
```

(példa 2)

`--debug-brk` az első soron egy breakpoint-ot rak le, ahol meg is áll a kód. Express alkalmazásnál, amely eleve várakozó módban fut, nincs szükség erre.

TCP kapcslatobn keresztül:

```
node debug index.js
```

(példa 3)

* modul
	* függvény kiajánlása
	* getter
* függvények felülírása

(példa 4)

__Fontos__: Amikor a require meghívódik, abban a pillanatban kezdi csak el a kódját értelmezni. Addig sem a szintaktikai, sem a szemantikai hibák nem derülnek ki. Ez probléma tud lenni (pl. Express alkalmazásnál).

(példa 5)

Ugyanazzal a szignatúrával hívható minden függvény, függetlenül attól, hogy szinkron, vagy aszinkron függvény volt.
A callback függvény az összeadásnál hamarabb fog lefutni, mint a művelet végének kiírása. Kivonásnál ez fordítiva van.

(példa 6)

__Fontos__: Mindig odafigyelni, hogy mi szinkron és mi anszinkron művelet. Ami aszinkron, az általában callback paramétert vár.
NodeJS manual

```
// lambda függvény ugyanaz mint a sima függvény (ES6)
(err) => {
}

// sima függvény
function(err){
}
```

Javascript class-ek helyett object használata előnyösebb. Object-re kívülről is rá bind-olhatók a tagváltozói, tagfüggvényei.

(példa 7)
(példa 8)

A listából való törlések a referencia miatt problematikusak lehetnek.

(példa 9)
(példa 10)

Function-nek nincs önmagában this értéke, de `bind` függvénnyel értékül adható neki kontextus.

(példa 11)

```
var removeValamit = function(){
	box.removeItemSafe(valami);
}
removeValamit();
// helyett
var valahova = [box.removeItemSafe.bind(box),valami];
valahova[0](valahova[1]);
// vagy
var valahova = {0: box.removeItemSafe.bind(box), 1: valami};
valahova[0](valahova[1]);
// vagy
var magic = box.removeItemSafe.bind(box,valami);
magic();
```

Nemcsak a this-t lehet bindolni, hanem a paramétereket.
A lista típus is egy object, csak speciális.

Szemantikailag:

```
//function bind(fv,kontextus){
//	this = kontextus;
//	fv();
//}
```

__Fontos__: Az adatbázis műveletek aszinkronok.

A függvényt stringgé lehet castolni:

```
function fgv(){
	return [1,2,3]
}

console.log(fgv + "");		// kód
console.log(fgv() + "");	// meghívás
```

`eval`-al a string-gé cast-olt kód újra lefuttatható.

```
var a = 2;
eval("a = 4")
console.log(a);

console.log(process.argv);
eval(process.argv);
```

__process.argv__ a kapott paraméterek tömbje

```
node index.js alma "szokozos szoveg"
```

(példa 12)

```
console.log(eval(process.argv[2]));
```

```
node index.js "3 + 4 * ( 3 + 3)"
node index.js "setTimeout(function(){console.log('ezt ne');},200); "3" "
```

(példa 13)

Az szöveges input azonnal értelmezhető.

## 5. Előadás - Express keretrendszer (2017)

https://www.youtube.com/watch?v=lkrOcH27jvE

### Routing

```
var experss = require('epress');
var app = express();

app.get('/', function(req, res, next){
	res.send('Hello World!');
});

var server = app.listen(3000, function(){
	console.log('Running on: 3000');
});
```

A __routing__ az alkalmazás feldarabolására jó, bár vannak olyan rendszerek, ahol loginolni kell, vagy az URL-ek idővel megszűnnek.
FronEnd-heavy oldalak tipikusan nem töltik újra az egész oldalt, de ők is módosítják az URL-t. A modern böngészők anélkül módosítják a címsor tartalmát, hogy tényleges navigáció történjen.

```
app.use('/tasks',function(req, res, next){
	console.log('hello /tasks');
});
app.get('/',function(req, res, next){
	console.log('hello / with GET');
});
app.post('/',function(req, res, next){
	console.log('hello / with POST');
});
```

__SEO__ szempontjából is fontosak a fenti routingok.

Az `app.param` megadásnál kikényszeríthető egy előfeldolgozás (pl. ellenőrzés, konvertálás), mielőtt a paraméter tényleges használata megtörténhetne.

```
app.param('userid', function(req, res, next, id){
	console.log('Userid: ' + id);
	next();
});
app.get('/user/:userid', function(req, res, next){
	console.log('Elvileg mar validalt a userid.');
	res.end();
});
```

Egy route-ra egy lépésben több __middleware__-t is fel lehet iratkoztatni.

```
app.get('/user/:userid', function(req, res, next){
	console.log('Itt is csinalunk valamit');
	next();
}, function(req, res, next){
	console.log('Meg itt is.');
	res.end();
})
```

Mindenre történő feliratkozás. A /* elhagyható, de a route nélküli meghívás esetén az összes lekérdezésre megtörténik a feliratkozás:

```
app.use('/*', function(req, res, next){
	console.log('Mindenhol');
	next();
});
```

Több route-ra való feliratkozás:

```
app.use(['/users/:valami', '/tasks/*'], function(req, res, next){
	console.log('Tobbhelyen');
	next();
});
```

Regexp-el történő feliratkozás (helyette paraméter ellenőrzéssel olvashatóbb):

```
app.use(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res, next){
	console.log('Lol regexp');
	next();
});
```

### Middleware

A __Middleware__ egy egyszerű függvény. Hozzáfér a `request` és `response` objektumokhoz és hatással van az őt meghívó végrehajtási láncra is. Mivel minden _async_, a végrehajtási lánc `next()` hatására lép tovább (a `return` nem működik, csak egyszerűsítő hatása van).

```
function (req, res, next){
	...
	next();
}
```

A lentiek közül igy mindkettő meghívódik a `GET: /user/12` hívásra.

```
app.get('/user/*', function (req, res, next){
	console.log('Valami tortenik.');
	next();
});
app.get('/user/:userid', function (req, res, next){
	console.log('Meg itt is.');
	res.end();
});
```

Middleware újrafelhasználás:

```
var authMW = function(req, res, next){
	// ellenorizzuk, hogy be van-e jelentkezve a user
	// ha nincs atiranyitjuk a bejelentkezo oldalra
	// ha be van akkor next-et hívunk
	next();
}

app.get('/user/:userid', 
	authMW,
	function (req, res, next){
		console.log('Mar biztosan be van lepve a user.');
	}
);
app.get('/tasks', 
	authMW,
	function (req, res, next){
		console.log('Mar biztosan be van lepve a user.');
	}
);
```

A __Controller__ funkcionalitása széttöredezhető middleware-ekre. Ha nincs `next()` hívás egy middleware-ben, az őt követő middleware sosem fog lefutni.

```
app.use('/tasks/mew',
	authMW(objectRepository),
	updateTaskMW(objectRepository),
	renderMW(objectRepository, 'newTask')
);

app.use('/tasks/:taskid/delete',
	authMW(objectRepository),
	getTaskMW(objectRepository),
	deleteTaskMW(objectRepository),
	function(req, res, next){
		return res.redirect('/tasks');
	}
);
```

ahol a middleware-ek közötti sorrendfüggőség erős:

* `authMW` elleőrzi, hogy be van-e lépve a user (paraméter feloldás, adatbázis művelet)
* `updateTaskMW` frissíti a modell-t (adatbázis művelet)
* `rederMW` előállítja a HTML-t (megjelenítés)
* `getTaskMW` adatbázisból az entitás kivétele (aszinkron), de ha nincs ilyen entitás, a user másik oldalra történő átirányítása megtörténik
* `deleteTaskMW` törlés (aszinkron), nem kell ellenőrizni az entitás meglétét, mert a sorrend garantálja


```
app.use('/login',
	inverseAuthMW(objectRepository),
	checkUserLoginMW(objectRepository),
	renderMW(objectRepository, 'login')
);

app.use('/logout',
	logoutMW(objectRepository),
	function(req, res, next){
		res.redirect('/');
	}
);
```

* `inverseAuthMW` ha user be van lépve, nem engedi tovább
* `checkUserLoginMW` megnézi, hogy a user a megadott adatok alapján tud-e authentikálni, ha igen, akkor átirányít
* `renderMW` csak akkor jeleníti meg a login formot, ha a megelőző lépésben nem sikerült az authentikáció
* `function()` inline middleware

```
app.use('/comment/:taskid/:commentid/edit',
	authMW(objectRepository),
	getTaskMW(objectRepository),
	getCommentMW(objectRepository),
	onlyMyCommentMW(objectRepository),
	updatekMW(objectRepository),
	renderMW(objectRepository, 'commentmod')
);
```

Csak a felhasználó által lérehozott tartalom módosítása:

* `authMW` be van-e lépve a user
* `getTaskMW` taszk betöltése
* `getCommentMW` comment betöltése ami az adott taszkhoz tatozik
* `onlyMyCommentMW` egy darab _if_, mely ellenőrzi, hogy a bejelentkezett user volt-e a szerzője az adott entitásnak
* `updatekMW` app.use() miatt _GET_ esetében csak `next()`-et hív, mivel nem kell semmit csinálni, ha csak az új adatok megadásához kell csak form-ot rajzolni, _POST_ esetében viszont frissíti az adott entitást, utána átirányítja a usert
* `renderMW`

```
var requireOption = require('../common').requireOption;

/**
* Get comment for the command param
*  - if there is no such task, redirect to /task/:taskid
*  - if there is one, put it on res.tpl.comment
*/
module.exports = function (objectrepository) {

	var commentModel = requireOption(objectrepository, 'commentModel');

	return function (req, res, next) {
		commentModel.findOne({
			_id: req.param('commentid')
		}, function (err, result) {
			if ((err) || (!result)) {
				return res.redirect('/task/' + req.param('taskid'));
			}
			res.tpl.comment = result;
			return next();
		});
	};
};
```

* aszinkron modell keresés
* ha nincs meg az adott komment, akkor átirányítás
* ha megtalálta a kommentet, akkor egy belső változóra fűzi fel
	* így ha egy MW ezt esetleg később törölni akarná, az ugyanezen a belső változón egy remove metódust meghívva megtehetné ezt: `res.tpl.comment.remove`

```
var requireOption = require('../common').requireOption;

/**
 * Delete comment
 */
module.exports = function (objectrepository) {

	return function (req, res, next) {
		if (typeof res.tpl.comment === 'undefined') {
			return next();
		}
		res.tpl.comment.remove(function (err) {
			if (err) {
				return next(err);
			}
			return next();
		});
	};
};
```

A két aszinkron kívás így lett szétszedve és két különböző helyen újra felhasználva.

Minden MiddleWare 3 paramétert kap: __reqquest__, __response__, __next__.
Kivéve a default error handler, melynek van egy negyedik: __error__.

### RequestObject

* __req.body.<valtozo>__
* __req.params.<valzozo>__
* __req.query.<valtozo>__
* __req.param('valtozo')__ univerzális a params, body, query kiváltója, de deprecated

A __RequestObject__ tartalmazza a böngészőtől a szerver irányába jövő kérés főbb paramétereit.

```
<form method="POST">
	<input type="text" name="username" />
</form>
```

Egy form-tól érkező információt mindig validálni kell, mivel kliens oldalról bármilyen információ küldhető. Nem kell encoding-gal foglalkozni, változóként jelen lesz az érték.

```
app.post('/login', function(req, res, next){
	if (typeof req.body.username != 'undefined'){
		console.log('Username: ' + req.body.username);
	}
	next();
});
```

POST parse-olásához külső modul: __body-parser__

```
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/', function(req, res, next){
	console.log(req.body.username);
});

var server = app.listen(3000, function () {});
```

Az `bodyParser.<fuggveny>()` visszaad egy callback-et és egy route-ra feliratkozást, első middleware-ként feliratkozva a route-ra. 
Ezáltal a __req.body.<valtozo>__ tartalma elérhető, amennyiben POST metóduson keresztül értelmezésre kerül kliens oldalról.

```
app.get('/user/:userid', function(req, res, next){
	console.log('ez a userid: ' + req.params.userid);
	res.end();
});
```

GET esetében __req.params.<valzozo>__-ban érhetők el az értékek. 

```
/shoes?order=desc&shoe[type]=converse
```

```
app.get('/shoes', function(req, res, next){
	console.log('Order: ' + req.query.order);
	console.log('Order: ' + req.query.shoe.type);
	res.end();
});
```

GET paraméter esetében (? utáni rész az URL-ben) a __req.query.<valtozo>__ object-ben érhetők el az értékek.

```
app.get('/user/:userid', function(req, res, next){
	console.log('ez a userid: ' + req.param('userid');
	res.end();
});
```
A __req.param('valtozo')__ használata kerülendő. Csak akkor használandó, ha mindhárom irányból érkező kérés értelmezhető. __Fontos:__ egy támadó által egyszerűen megváltoztatható a jelszó egy URL-en keresztül, ha ez a függvény kezeli.

### ResponseObject

* __res.send()__ defaultból HTML-t küld
* __res.set()__
* __res.end()__
* __res.status().end()__
* __res.redirect()__
* __res.json()__
* __res.render()__

A __ResponseObject__ tartalmazza a szervertől a böngésző irányába menő választ.

```
app.get('/user/:userid', function(req, res, next){
	res.status(404).end();
});
```

HTTP status kódok megadhatók a `status()` segítségével. Láncolható fügvény.

```
app.get('/user/:userid', function(req, res, next){
	res.redirect('/login');
});
```

Átirányítás `redirect()` függvénnyel a HTTP header-ön keresztül. Véget ér a middleware lánc (kivéve ha `next()` hívás történik, ami nem szerencsés) és jön egy az átirányított oldalra történő hívás. A `redirect()` bárhova képes átirányítani ha nem `/`-el kezdődő aloldal van megadva.

```
app.get('/user/:userid', function(req, res, next){
	res.json({
		key: 'value'
	});
});
```

A `res.send(json.stringify())` kiváltására szolgáló, JSON-t visszaküldő megoldás. Helyette bármilyen object-et beírva a függvény törzsébe, JSON-né alakítja, még a header-t is beállítja.

```
app.get('/user/:userid', function(req, res, next){
	res.send('Lorem ipsum');
});
```

Default-ból HTML, de ha content típust is kell állítani: `res.set('Content-Type', 'text/html');`. Minden adattípust támogat, pl. `'text/plain'`, `'image/png'` etc. A `send()` buffert is elfogad, bináris adatot is le tud küldeni, de erre van egyszerűbb megoldás is.

```
app.get('/user/:userid', function(req, res, next){
	res.end('Üzenet - őűáéüóöí', 'utf8');
});
```

Egy lépésben küld üzenetet és zárja a kapcsolatot. Két paramétere a data és az encoding.

```
app.get('/user/:userid', function(req, res, next){
	res.render('userpate', {
		username: 'the name',
		newparameter: ['boo', 'boo2'] 
	});
});
```

Express-ben nincs __templating engine__, de lehetőséget ajánl ki bármilyen templating engine-nek a csatlakozáshoz a `render()`-en keresztül. Első paraméter a template neve. Templating engine dolga, hogy tudja, milyen könyvtárban vannak a template-ek, `.tpl`, vagy `.ejs` fűzendő a megadott névhez. Második paraméter a template-ekbe leküldött változók object-je.

### Templating

Az EJS egy HTML alapú templating nyelv, pár egyszerű művelettel.

```
npm install ejs --save
```

```
app.set('view engine', 'ejs');
```

### Static modul

Könyvtár kiajánlása adott route-on statikus tartalomként. Express modul része. Képek, CSS, kliens oldali JS kiszolgálására érdemes használni.

```
app.use(express.static('static'));
```

vagy

```
app.use('/static', express.static('static'));
```

Az előbbi változat esetében ha nincs olyan fájl, megpróbálja dinamikusan értelmezni, ha van, akkor azt visszaküldi. Az utóbbi esetében nem keveredik össze a statikus és dinamikus tartalom. 

### Session modul

A session egy böngéső session szintű szerver oldali oldalbetöltések közötti perzisztens tároló. A weboldal első látogatásánál egy cookie-t tárol le, mely tartalmaz egy egyedi azonosítót, melyet szervernek küldött kéréshez csatolva az tud a kliensről adatot tárolni. A user nem fér hozzá a sesion adataihoz, csak az azonosítójához. A modul neve: __express-session__

```
var session = require('express-session');
app.use(session({
	secret: 'keyboard cat',
	resave: 'false',
	saveUninitialized: true
}));
```

A __req.session__ objektum a session szinten megtartja a tartalmát. Alapbeállítás szerint a memóriában tárolódik, így a NodeJS újraindulásakor elveszlik a tartalma. Alternatívák: redis, memcached, fájl alapú tárolás. 

### Biztonság

Biztonsági modul, mely segít az express alkalmazások biztonságosabbá tételéhez. A modul neve: __helmet__

```
var express = require('express');
var helmet = require('helmet');

var app = express();

app.use(helmet());
```

### Implementációs részletek

```
app.use(session({
	secret: 'keyboard cat',
	cookie: {
		maxAge: 60000
	},
	resave: 'false',
	saveUninitialized: false
}));
```

```
app.use(bodyParser.urlEncoded({
	extended: true
}));
```

Általános, mindegyik middleware-re feliratkoztatott függvény:

```
app.use(function (req, res, next){
	res.tpl = {};
	res.tpl.error = [];
	return next();
});
```

A mesterségesen létrehozott __res.tpl.<valtozo>__ a middleware-ek közötti adatcserére szolgál. A middleware-ek erre az objektumra fűzik fel az adataikat.

A response és request object kiterjesztésére, melyek csak egy HTTP hívás kiszolgálása alatt él csak. HTTP hívások között nem őrződnek meg a request és repsonse objectek. A hívások közötti tárolásra session-ök használandók. A `return next();` miatt miután a middleware lánc lefut, a `return` miatt nem folytatódik a futás az aszinkron `next()` utáni sorban. A `return` elvágja a futást, így a régen lefuttatott middleware nem fut újra.

```
require('./routes/abc')(app);
// vs. 
var obj = require('./routes/abc');
obj(app);

// ha a modulban:
modul.exports = function(app){
	...
	app.get(...);
	app.use(...);
}
```

Nem szerepel kétszer egyik route sem (bár lehetne), de tisztább a kód, ha egy adott route-ra egy helyen iratkozik fel az összes middleware. A middleware-eket külön fájlba érdemes kiszervezni.

```
var authMW = require('../middleware/generic/auth');
```

Egy middleware visszaad egy function-t, ami nem fut le, csak visszaadásra kerül:

```
module.exports = function(...) {

	...
	return function(req, res, next){

		if (conditions){
			return next();
		}
	}
};
```

Ha a feltétel teljesül (pl. adat/paraméter undefined), akkor a teljes middleware nem csinál semmit, csak meghívja a `return next()`-et. Ez akkor fontos, hogy ha pl. egy GET-et és egy POST-ot egy middleware-el akarunk egyszerre kezelni egy update taszkkal, akkor 3 lépésben 3 middlewarrel megtehető: betöltő MW, update-elő MW, renderelő MW. Az update pedig üresesen kell lefusson, ha a user csak megtekinti a formot és nem volt módosítás. Ha nincsenek POST paraméterek, a `next()`-el a következő MW kirendereli a formot. Ha léteznek, végrehajtódik a logika és csak hiba esetén hívódik a next(), egyébként egy redirect történik (pl. middleware/task/updateTask.js és middleware/task/changeState.js).

```
app.use('/tasks',
	authMW(objectRepository),
	getTaskListMW(objectRepository),
	renderMW(objectRepository, 'tasks')
);
```

A `renderMW` feladata, hogy a templating engine-nek átadja a többi middleware által beállított értékeket.

```
module.exports = function (objectRepository, viewName){
	return function (req, res){
		res.render(viewName, res.tpl);
	};
};
```

A scoping és closure miatt a `viewName` egy előre definiált konstans lesz, így az legyártott függvénybe bele lesz égetve a template neve, mely a fenti példában a második paramétereként kerül átadásra, mely a template file nevét határozza meg.

A fenti példában a templating engine az átadott adatokból és a template nevéből generálja a HTML kódot. Nincs HTML string összeállítás, konvertálás, template-be illesztés stb.
Ha a taszklistázást egy REST-es API-ba szeretnénk kiajánlani, akkor elég a `renderMW(...)` middleware-t kivenni és helyébe egy olyat tenni, amely a `response.json()`-ra ráhívva a `res.tpl`-t átadja neki (nem jár kód módosítással).

### Projekt felépítése:

* model
* route-ok (controller)
	* middleware lista
* view (REST-es API esetén hiányzik)
	* templating engine
	* változók
* middleware-k
* statikus fájlok

### Object Repository

JS-ben a legtöbb hiba csak akkor derül ki, ha a kód ráfut a sorra. 
Az __Object Repository__ egy kulcs-értékeket tároló, melyre általánosan használt modeleket rárakva a middleware-ek az általuk definiált  függvény kiajánlása előtt ellenőrzik, hogy az object repository-ban létezik-e az adott elem.


Routing:

```
var userModel = require('../models/user');
...
module.exports = function(app){
	var objectRepository = {
		userModel: userModel
	};
	...
	app.use('/login',
		inverseAuthMW(objectRepository),
		checkUserLoginMW(objectRepository),
		renderMW(objectRepository, 'login')
	);
}
```

Middleware:

```
var requireOption = require('../common').requireOption;

module.exports = function(objectRepository){

	// ellenőrzi a 'userModel' kulcs meglétét az objektumon, exception-t dobva ha nincs
	var userModel = requireOption(objectRepository, 'userModel');
	...
	return function (req, res, next) {
		...
		userModel.findOne({...}, function(err, result){...});
	}
};
```

A függvény létrehozása előtt megbizonyosodik arról, hogy rendelkezésre álljon az érték, ha egyszer rá akar majd hívni a kód. Teszteléshez ugyanúgy hasznos,  ugyanis ha a függveny előtt történne a require (nem pedig benne), akkor az adatbázis annyira be lenne égetve a fájlba, hogy adatbázis nélkül nem lenne tesztelhető a működés. Object repository esetében mock adatokat/függvényt lehet az object-re fűzni, amivel a `findOne()` metódus működése mockolható.

Teszt:

```
var fakeUserModel = {
	findOne: function (some, cb){
		nehivd = true;
		cb();
	}
};
...
getUserRegistrationMW({
	userModel: fakeUserModel
})({}, {}, function (err) {
	expect(nehivd).to.be.eql(false);
	expect(err).to.be.eql(undefined);
	done();
} );
```

A mockolt függvények (pl. `findOne`) szintaktikaliag úgy néznek ki mint az eredeti, de az eredetivel ellentétben nem csinálnak semmit (pl. nem hívnak adatbázist), viszont cserébe hívhatók a teszt által (és előre beállított visszatérési értéket adhatnak).

A MW (pl. `getUserRegistrationMW`) létrehozható úgy, hogy az object repository-t kívülről adható egy mockolt object-tel, hogy az már nem fog adatbázist hívni.


## 6. Gyakorlat - Express gyakorlat (2017)

https://www.youtube.com/watch?v=3ZMtr4tNEEQ

A routing sorrend számít. Ha `/sandwiches/:id` a részletes nézet, akkor a lenti sorrend szerint betölthető a sandwich részletes nézete úgy, hogy `id=add` vagy `id=delete` lesz:

```
/sandwiches/:id
/sandwiches/add
/sandwiches/delete
```

__Megoldás 1:__ `add` vagy `delete` id-val rendelkező sandwich nem lehet, mivel a sorrend miatt ezek az értékek az id-ba sosem fognak leérkezni:

```
/sandwiches/add
/sandwiches/delete
/sandwiches/:id
```

__Megoldás 2:__ előtagok eltérjenek egymástól, külön route bevezetése, pl. `details`

```
/sandwiches/details/:id
/sandwiches/add
/sandwiches/delete
```

__Megjegyzés:__ GET futhat be a hozzáadásnál (mivel egy form kerül megtekintésre) és a már meglevők részletes nézeténél is.

__Fontos:__ oda kell figyelni, hogy az express-es routing táblába, milyen sorrendben kerülnek felvételre a route-ok (ugyanis mindegyik route végén van egy mindenre illeszkedő __/*__, __/sandwiches*__ etc.)

Egy helyes sorrend:

```
/sandwiches/add*
/sandwiches/del/:id*
/sandwiches/mod/:id*
/sandwiches*
/*
```

__Fontos:__ a screen-ek száma nem feltétlenül egyezim meg az endpoint-ok számával.

Egy REST API:

```
GET + POST: /sandwiches/add       - szendvics hozzaad
GET       : /sandwiches/del/:id   - szendvics torol (!!!nem biztonságos!!!)
GET + POST: /sandwiches/mod/:id   - szendvics modosit/reszletez
GET       : /sandwiches           - lista
GET + POST: /ingre/add            - hozzavalo hozzaad
GET       : /ingre/del/:id        - szendvics modosit/reszletez
GET       : /ingre                - lista
POST      : /calc/result          - hozzavalo
GET       : /calc
GET + POST: /login
GET       : /logout
GET       : /                     - fooldal
```

__Fontos__: A `GET : /sandwiches/del/:id` nem biztonságos: __CSRF__.


Ha a `next()`-nek bárhol hiba kerül átadásra, kihagyja a middleware összes többi lépését, és átugrik a hibakezelőre:

```
next(err);
```

```
app.use(function(err, req, res, next){
	res.status(500).send('Houston, we have a problem!');
	console.error(err.stack);
});
```

Hibakezeléshez használatos middleware-t nem szabad middleware láncra fűzni. Pontosan egyet szabad létrehozni.

(példa 1)

__Megjegyzés:__ Express JS dokumentációból érdemes tudni:

* hogyan érdemes a routingokat megcsinálni
* static-ot beállítani
* a 404-es hibát elkapni
* hibát kezelni
* etc.

routes könyvtár:

* létrehozni a middleware-eket
	* nem inline, hanem különböző function-ökbe kiszervezés
* object repository készítése
	* ez lényegében dependency injection
* model-ek létrehozása
* route-okra feliratkozás és definíció

(példa 2) - alkalmazás felbontása logikailag különböző route-okra

`renderMW`:

- middleware-ek kaphassanak kívülről is paramétert
- a closure scoping miatt nem változik meg az átadott paraméter a lefutás során

__Fontos__: hogy ne csak futás időben derüljenek ki a problémák (hiszen require esetén nem futnak le, csak egy function-re mutató pointer jön vissza), ezért a middleware-eket célszerű az elején létrehozni

(példa 3) - tesztelhető endpointok

```
localhost:3000/sandwiches
localhost:3000/sandwiches/add
localhost:3000/sandwiches/del/234
```

__Megjegyzés:__ a jelenlegi verzióban a route-ok úgy tűnik, hogy az egyes route-ok sorrendfüggősége nem számít.

A megfelelő teszthez érdemes ki__mock__olni a megfelelő tagfüggvényeket és tagváltozókat, hogy a modulok/függvények stb. tesztje adatbázistól, böngészőtől stb. független legyen. Csak azt érdemes mockolni, amire a kód rá is hív.

(példa 4) - mockolt `end()` függvény a `res` objecten, a `render.js`-ben levő `db` reprezentálja az adatbázis kapcsolatot.

__Kérdés:__ hogyan lehet kimockolni a `db` által visszaadott adatokat (pl. ez esetben: `minden`)?

__Válasz:__ az __object repository__ mint köztes objektum, amelynek `db` kulcsa az adatbázis objektumot tárolja, amivel a műveleteket végre lehet hajtani.

(példa 5) - a middleware leválasztva az alkalmazás többi részéről

Az __objectRepository__ból kiszedhetők a működéshez szükséges dolgok, teszteléshez pedig tetszés szerint mockolhatók ezek, így nincs szükség tényleges adatbázisra, külső API-ra stb. Ez __Dependency Injection__ jellegű megoldás, itt nem annotációval történik, de vannak erre library-k, kiegészítések, Babel is össze tud require-elni, WebPack-el kliens oldalon stb.

__Fontos:__ az a kódrészlet, amely a routinghoz a middleware láncokat és útvonalakat fűzi, az alkalmazás indulásakor fut le. Ezért a middleware-ekben érdemes ellenőrizni, hogy az objectRepository-ban megérkezik-e a szükséges adat. Ezért már az alkalmazás indításakor kiderül, hogy sikerült-e jól összedrótozni a middlware-eket az objectRepository-val.

```
function requireOption(objectRepository, propertyName){
	if (objectRepository && objectRepository[propertyName]){
		return objectRepository[propertyName];
	}
	throw new TypeError(propertyName + ' required');
}

module.exports.requireOption = requireOption;
```

(példa 6) - a nem jól felépített struktúra már indulás időben kiderül.

```
node test.js
node index.js
```

__Fontos:__ érdemes okosan megtervezni a middleware-eket úgy, hogy újra felhasználják a megelőző middleware-ek által előállított információt. Amire a middleware épít, azokat vagy akkor ellenőrzi mikor betölti őket, vagy futás időben. Nem feltétlenül kell megakaszani egy middleware-t, mert olyan funkcionalitás fut rajta végig, ami őt nem érinti.

(példa 7)

__Fontos:__ a hibát nem feltétlenül a keletkezés helyen érdemes kezelni, sokszor elég hagyni, de miután a vezérlés végigfolyt a middleware lánc egy részén, a hivatkozott objektumok megléte/hiánya aszerint befolyásolja a vezérlést.

```
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
```

helyett, lehetne akár nem külön GET+POST-ra szétbontva:

```
app.use('/sandwiches/mod/:id',
	authMW(objrep),
	loadSandwich(objrep),
	checkSandwichDataMW(objrep),
	saveSandwich(objrep),
	renderMW(objrep, 'smod'));
```

feltéve, ha `checkSandwichDataMW` és `saveSandwich` ellenőrzi azt, hogy POST-ban érkezett-e adat, de ha nem, akkor módosítás nélkül keresztül engedi magán.

__Megjegyzés:__ az átirányítások általában a MW lánc utolsó lépése szokott lenni.

Tipikus middleware felépítés:

* adat ellenőrzés
	* vagy hiba: next(err)
	* vagy továbbenged: next()
* művelet
	* ha hiba: next(err)
* next / átirányítás

