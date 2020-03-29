
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

## 2. Gyakorlat - Fejlesztőkörnyezet összerakása (2019) (TODO)

https://www.youtube.com/watch?v=GXpgVmTsM1A

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

Minden MiddleWare 3 paramétert kap: __request__, __response__, __next__.
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

## 7. Előadás - promise, async, error first callback, gulp (2017)

https://www.youtube.com/watch?v=_xOGnt6iVpw

Callback hell könnyen ki tud alakulni, pl.:

* fájl megnyitás
* fájlba írás
* fájl bezárás

mivel mindet aszinkron módon kellene végrehajtani.
Ehhez kellhet hibakezelés, rollback stb.

```
// Hibás kód
mudule.exports = function (objectrepository) {
	return function (req, res, next) {
		userMode.findOne({}, function (err, results){
			res.tpl.users = results;
			return next();
		});
		return next();
	};
};
```

Sokszor nem tudható, hogy a meghívot függvény / API szinkron vagy aszinkron. Nem tudható, hogy a fenti példában a callback fut-e le előbb, vagy az aszinkron kód utáni rész. Előfordulhat, hogy a callback egyáltalán nem fut le, mert hibásan lett implementálva. Ráadásul exception kezelés még nincs megvalósítva. __Hiba:__ a `next();` kétszer kerül meghívásra.

__Fájl beolvasás:__

```
fs.readFile('config.json',
	function (error, text){
		if (error) {
			console.error('Error while reading config file');
		} else {
			try {
				var obj = JSON.parse(text);
				console.log(JSON.stringify(obj, null, 4));
			} catch (e) {
				console.error('Invalid JSON in file.');
			}
		}
	});
```

Fájl megnyitás -> írás -> lezárás:

* 3 error ág
* 3 egymásba ágyazott sikerességi ág

Nehéz tesztelni.

```
readFilePromisified('config.json')
	.then(JSON.parse)
	.then(function (obj){
		console.log(JSON.stringify(obj, null, 4));
	})
	.catch(function (reason) {
		console.error('An error occured', reason);
	});
```

### Promise

ES6-ban natív nyelvi elem, bár vannak külső Promise library-k is. Osztályba furkolt függvény, ami az állapotváltását láncolható módon tájékoztatja a rá feliratkozókat.

```
var promise = new Promise(
	function (resolve, reject){
		...
		if (...){
			resolve(value);
		} else {
			reject(reason);
		}
	});
promise
.then(
	function(a){console.log("Resolve:" + a);},
	function(b){console.log("Reject :" + b);})
.catch(function(e){console.error(e);});
```

Minden promise egy `resolve` és `reject` callback-et vár. Ha egyik sincs meghívva, akkor a végtelenségig vár. A `then` egy láncolható objektumot ad vissza. A dobott kivételek lekezelhetők, melyek a `reject` ágra kerülnek. Ha nincs `reject` ág a `then`-ben, akkor a `catch`-ig jut el a hibakezelés.

```
function promiseFV(item){
	return new Promise(function (resolve, reject){
		resolve(item+'p');
	});}
```

Ha egy függvény promise-t ad vissza, vagy szinkron akkor láncolhatók. Ha bármelyik reject-et hív, megtörik a lánc. Sok then után egyetlen `catch` írása a legvégén letisztultá teszi a hibakezelést (minden egy helyen).

```
function promiseFV(item){
	return new Promise(function (resolve, reject){
		resolve(item+'p');
	});}
function normalFV(item) { return item + 'n'; }

promiseFV('1')
	.then(normalFV)
	.then(promiseFV)
	.then(function (item) {return item + '2';})
	.then(console.log)
	.catch(function (e){
		console.log('error' + e);
	});

// ezt írja ki: 1pnp2
```

Ha létrejön egy Promise, utána arra szinkron függvények is felfűzhetők.
Ha egy láncban bárhol hiba dobódik, akkor az az első `catch`-ig fog elérni, így elég egy `catch` is a legvégén, így kevesebb a hibakezelési ág szükséges.

#### Promise.all

Több promise egy várakozásban összefogva - vagy megvárja mindegyik sikerét, vagy az első kudarcot.

```
var p1 = Promise.resolve(3);	// automatikusan resolve-olt 3
var p2 = 1337;
var p3 = new Promise(function(resolve, reject){
	setTimeout(resolve, 100, "foo");
});

Promise.all([p1, p2, p3]).then(function(values){
	console.log(values);	// [3, 1337, "foo"]
});
```

Listában megadott promise-ok: konstans, szinkron függvény, aszinkron függvény, resolve(), reject()

Promise library nélkül három aszinkron függvény bevárására módszer: egy tömb adott elemét az aszinkron függvények egyenként állítják, melyek egyben ellenőrzik, hogy a többi elem be van-e állítva. Ha már az összes elem be van állítva, akkor visszahív egy callback-re.

-_Fontos:__ a promise.all()-ban a `catch` ágra futás az első kudarc után történik, a többi nem kerül bevárásra, de futásuk nem is szakad meg. Nem feltételezhető, hogy már az összes lefutott vagy hibára futott, csak az, hogy legalább egy hibára futott.

#### Promise.race

NodeJS erőssége: hogy kevés időt tölt tényleges javascript kód futtatásával az aszinkron hívások miatt. Legtöbb esetben várni kell operációs rendszer szintű hívásokra: adatbázisra, fájlrendszerre, klienstől érkező TCP package-re, kimenő TCP package-re.

Több promise, amelyik gyorsabban befejeződik, az adódik át a then-ben (többi is fut / lefut, nem szakítódik meg)

```
var p1 = new Promise(function(resolve, reject){
	setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function(resolve, reject){
	setTimeout(resolve, 500, "two");
});
Promise.race([p1, p2]).then(function(values){
	console.log(value);	// "two"
	// Both resolve, but p2 is faster
});
```

Pl. adatbázis mellett redis-es cache és nem érdekel, hogy melyik adja vissza az adatot.

A Promise.race() sem állítja le az elindított promise-ok futását. Nincsenek szálak, mivel single thread, így nincs mit leállítani, addig fut, míg véget nem ér a függvény és nincs hova visszamenni a callstack-ben.

#### Promise.resolve, Promise.reject

Szinkron function / érték becsomagolása promiseba.

```
function foo(){
	return Promise.resolve('alma');
}
function bar(){
	return Promise.reject('alma');
}
foo.then(bar).catch(console.log);
```

Általában promise-ok tesztelésére használatos.

### Async.js

```
npm i async
```

#### Async - Each, EachSeries, EachLimit

```
async.each(arr, iterator, [callback])
async.eachSeries(arr, iterator, [callback])
async.eachLimit(arr, limit, iterator, [callback])
```

Listákon végrehajtott tömeges műveletek, control flow műveletek, általános async műveletek stb.

```
var lista = [1,2,3];
async.each(lista, function(item, callback){
	console.log('Processing: ' + item);
	setTimeout( function(){
			console.log('Processing done:' + item);
			callback(null);
		}, Match.random() * 1000);
}, function(err){ console.log('All done'); });	// hiba lekezelés nem elégséges
// Eredmény:
//Processing:1
//Processing:2
//Processing:3
//Processing done:3
//Processing done:1
//Processing done:2
//All done
```

Egyszerre elindítja több példányban a függvényt. Az __iterator függvény__ kap egy item-et a tömbből és egy callback-et, mely utóbbi jelzi a sikerességet vagy a sikertelenséget az async library-nek. Az __error first callback__ első paramétere mindig null vagy undefined ha nem történt hiba és bármi más (string, number stb.) ha hiba történt.

each - párhuzamosan hajt végre
eachSeries - egymás után hajtja végre
eachLimit - párhuzamosan, de egy időben maximált számossággal

#### Async - Map, MapSeries, MapLimit

```
async.map(arr, iterator, [callback])
```

Végrehajtás után visszatér értékekkel.

```
var lista = [1,2,3];
async.map(lista, function (item, callback){
	callback(null, item * item);	// lehet aszinkron hívás
}, function(err, results){
	console.log(results);
});
// [1, 4, 9]
```

Az __iterator függvény__ callback-jében vissza lehet adni értéket.

#### Async - Series

```
async.series(tasks, [callback])
```

Különböző műveletek lefuttatása egymás után.

```
async.series([
	function(callback){
		callback(null, 'one');
	},
	function(callback){
		callback(null, 'two');
	}
],
function(err, results){
	console.log(results);
});
// Eredmény:
// ['one', 'two']
```

Függvény lista megadása után, a callback-ként átadott függvény lefut a listán megadott függvényeken belül.

#### Async - Parallel

```
async.parallel(tasks, [callback])
```

Különböző műveletek lefuttatása egyszerre.

```
async.parallel([
	function(callback){
		setTimeout(function(){
			callback(null, 'one');
		}, 200);
	},
	function(callback){
		setTimeout(function(){
			callback(null, 'two');
		}, 100);
	}
],
function(err, results){
	console.log(results);
});
// Eredmény:
// ['one', 'two']
```

Az eredmény összegyűjtve miután mind lefutott.

#### Async - Waterfall

```
async.waterfall(tasks, [callback])
```

Olyan series függvény, amely egymás után futtatja le az egyes függvényeket, viszont a callback-ben megadhatók a paraméterek.

```
async.waterfall([
	function(callback){
		callback(null, 'one', 'two');
	},
	function(arg1, arg2, callback){
		// arg1: one, arg2: two
		callback(null, 'three');
	},
	function(arg1, callback){
		// arg1: three
		callback(null, 'done', 'done2');
	}
],
function(err, result, result2){
	console.log(result, result2);
});
// Eredmény:
//done done2
```

Hibalehetőség: ha elcsúszik a paraméterezés, vagy ha nem `null` a legelső paraméter.
__Fontos:__ a paraméterek a következők:
* listában átadott függvényeknél: (argument..., result)
* végső callback (error first): (error, result...)

### Egyéb

https://github.com/caolan/async

https://caolan.github.io/async

Minden feladatfüggő:

* async
* promise (promisify)
* callback
* sima függvények
* aszinkron fv

A probléma bonyolultsága határozza meg, mit érdemes használni.

### Error First Callback

Első paramétere a hiba.

```
function callback(error, result){
	...
}
```

A legtöbb esetben a node-os core modulok ezt használják hibajelzésre async esetben. Ha az `error` értéke `undefined` vagy `null` akkor nincs hiba jelzés, ha pedig bool-lá tud konvertálódni úgy, hogy akkor igaz, ha hiba keletkezett, akkor az egy hiba jelzés.

```
fs.readFile('/etc/passwd', function(err, data){
	if (err) throw err;
	console.log(data);
});
```

A __try-catch__ vagy a __throw__ használata ritka, mivel nehéz ránézésre megmondani a kódról, hogy melyik try-catch-be érkezik a kivétel (hacsak nem szinkron függvényen belül van lekezelve). A try-catch-ek felül tudják bírálni egymást, az aszinkronitás miatt máshol tarthat a kód, vagy a scope-ból módosítva lett. A __try-catch__ nyelvi szinten nem létezik, ezért egy __throwable object__ képviseli a kivételt. Emiatt függvényen belül eltéríthető a catch ág egy általunk definiált függvényre.

Az error first callback-et könnyű mockolni/tesztelni is.

### Gulp

Régen az előadásban Grunt volt ehelyett. Webpack-hoz hasonló.

NodeJS-ben nincs build folyamat. Deployment előtt használandó. Sok modulja van. Pl.

* több CSS fájl minify-olva a release-ben, de fejlesztési időben nincs minify-olva
* képeket feltöltés előtt optimalizálni
* könyvtárakat kiüríteni, ideiglenes fájlokat törölni
* stb.

2 része van:

```
npm i gulp-cli -g	// parancssoron 'gulp' parancs
npm i gulp --save-dev	// nem szokás a release-be beletenni
```

`--save-dev`: éles rendszer által nem használt célokra: build, debug, unit test framework stb.

A __gulpfile.js__ fájlban kerülnek a folyamatok leírásra. A folyamatok külön npm modulokban lehetnek.

```
var gulp = require('gulp');
var csso = require('gulp-csso');
gulp.task('default', function(){
	return gulp.src('./main.css')
		.pipe(csso())
		.pipe(gulp.dest('./out'));
});
```

A gulp fájl taszkokra bomlik. Pl. `css` taszk indítható a `gulp css` paranccsal. A folyamatok egymás után is írhatók. Egy taszk hivatkozhat más taszkokra. A build folyamat több különálló részből áll.

```
gulp
```

Minden modul más és másképp konfigurálandó, paraméterezendő stb.
Alternatíva: Grunt

#### Gulp-uglify

https://github.com/terinjokes/gulp-uglify

Összefűzi és minify-olja a js-eket

```
npm install --save-dev gulp-uglify
```

```
var uglify = require('gulp-uglify');
gulp.task('compress', function(){
	return gulp.src('lib/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
```

#### Gulp-csso

https://github.com/ben-eb/gulp-csso

Összefűzi és minify-olja a js-eket

```
npm install --save-dev gulp-csso
```

```
var gulp = require('gulp');
var csso = require('gulp-csso');
gulp.task('default', function(){
	return gulp.src('./main.css')
		.pipe(csso())
		.pipe(gulp.dest('./out'));
});
```

#### Gulp-concat

https://github.com/contra/gulp-concat

Egymás után fűzi a bejövő fájlokban levő adatokat.

```
var concat = require('gulp-concat');

gulp.task('scripts', function(){
	return gulp.src('./lib/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/'));
});
```

#### Egyebek

Feladathoz kell eszközt keresni, nem eszközhöz feladatot.

Tobábbi példák:

* __Gulp watch__ - figyeli a CSS könyvtárat és bármelyik fájl megváltozása után lefuttatja a CSS minify-oló taszkot.
* Eltérő böngésző gyártók által támogatott feature-öket (--webkit, --o) feloldja a régebbi böngészők számára.
* A font méretet a képernyő méret függvényében helyezze el a CSS fájlban.
* S3-ra, vagy CDN-re pusholhat adato
* statikus asset-eket lehet egyedi fájlnévvel ellátni
* notification-öket lehet küldeni a gulp-os fordításról
* typescript-et át lehet írni

Sok csillagot kapott, friss modulokat érdemes használni, mivel vannak szerény minőségűek is.

## 8. Gyakorlat - Express templating, Webpack (2017)

https://www.youtube.com/watch?v=wybDQM0nc5Q

### EJS

https://www.npmjs.com/package/ejs

View rész elkészítése, HTML sablon definiálása, HTML generálása változók értékei alapján. Sok templating motor létezik, itt `ejs`. Van kliens oldali, szerver oldali.

#### Templating

```
npm i ejs --save
```

EJS rendering engine: egy HTML stringből és bejövő paraméterekből készít egy másik HTML stringet.

#### Express nélkül

```
var ejs = require('ejs');
var fs = require('fs');
var html = ejs.render(fs.readFileSync('valami.ejs','utf8'), {
	nev:'Lorem ipsum',
	ertek: 2
});
console.log(html);
```

valami.ejs:

```
<% if (ertek >= 2) { %>
	<h2><%= nev %></h2>
<% } %>
```

kimenet:

```
<h2>Lorem ipsum</h2>
```

#### Express-el

```
app.set('view engine', 'ejs'); //se require, se semmi
```

Nem kell require.

```
function (req, res, next) {
res.render('valami',{ // nem kell .ejs
	nev:'Lorem ipsum',
	ertek: 2
});
```

A `response` objecten egy render függvény válik elérhetővé. Leküldi az adatot, beállítja a header-t stb.

#### Tag-ek

Kevés tag van. A tag-ek közé teljes értékű JS kód írható, de itt

* ne legyen komoly logika
* ne definiáljunk változókat
* ne hívjunk aszinkron függvényeket

Csakis adatott transzformáljunk adattá, legfeljebb control parancsok (if, for, foreach stb.) kerüljenek ide.

```
<% valami.javascript.code(); %>
	ez is htm
<% if (valami) { %>
	ez html
<% } %>
<% for (key in array) { var item = array[key]; %>
	<h2><%= item.valami %></h2>
<% } %>
```

Az ide írt `console.log()` a NodeJS processébe ír, nem a felhasználónak. Ehelyett változó behelyesítési tag-ek:

```
Escapelt html (<> karakterek, stb)
<%= valtozo %>
Escape nélküli érték
<%- valtozo %>
Comment
<%# ide barmi johet nem csak kod %>
```

__Fontos__: ha nincs escape-elve a JS kódban a változó, akkor bármilyen JS kódot be lehet injektálni másnak a böngészőjébe. Lehetőleg mindent escape-elve írjunk ki.

#### Include

Másik template beillesztése:

```
<ul>
	<% users.forEach(function(user){ %>
		<%- include('user/show', {user: user}) %>
	<% }); %>
</ul>
```

A `user/show.ejs`-ben csak a `user` változóra limitál a második paraméter. Csak azokat a változókat küldi le így a template-be amelyeket kontrollálunk, azzal a névvel amit választunk. Ha az elhagyásra kerül, akkor mindent megkap a template.

#### Struktúra

Két módszer:

* belülről kifele include-olgatni, a tartalmat hozzá kitölteni
* nagy layout-ban különböző blokkok létrehozása (külön modullal támogatja), a definiálandó layoutban pedig kitölteni a blokkokba tartalmát

```
<%- include('header') -%>
<h1>
	Title
</h1>
<p>
	My page
</p>
<%- include('footer') -%>
```

#### Egyéb

https://github.com/mde/ejs/blob/master/docs/syntax.md

* browserify, webpack
* options
* tag-ek
* include-ok
* custom delimiter
* stb.

Az EJS fájlokat alapértelmezésként minden alkalommal felolvassa a Node (feltéve, ha nincs cache paraméter állítva), így nem kell a Node process-t újraindítani fejlesztési időben a módosítások után.

(példa 1) - statikus HTML kódot tartalmazó template fájl felolvasása, melybeolvas más templaet fájlokat

```
<table border="1">
	<tr><td>név</td><td>cirmose</td><td></td><td></td></tr>
	<%_ valami.foreach(function(item){ _%>
		<tr>
			<td><%=item._id%></td>
			<td><% if (typeof item._gazdi !== 'undefined') {%>
				<%=item._gazdi.name%>
			<% } %></td>
			<td><a href="/items/view?id=<%=item._id%>">nez</a></td>
			<td><a class="del" href="/items/del?id=<%=item._id%>">Torold</a></td>
		</tr>
	<% }) %>
</table>
```

(példa 2) - dinamikus adat megjelenítés

__Fontos:__ A fenti példában escapelve van az adat megjelenítése (pl. `<td><%=macska.nev%></td>`), de ha `<%-macska.nev%>` és az input:

```
var macskak = [
	{id:1, nev: 'macska', cirmose: true},
	{id:2, nev: '<script>alert("macska")</script>', cirmose: false}
];
```

akkor a code injection megtörténik, ami veszélyforrás.

(példa 3) - code injection példa

* szerver oldali kód (nodejs, express, middleware-ek stb.)
* kliens oldali kód (alap HTML-be ágyazva)
* ejs-be tett kód:
	* include: szerver oldalon értelmeződik
	* JS script: kliens oldalon fut __(!)__

```
<script>
	var macskak=<%- JSON.stringify(macskak)%>;
	$(function () {
		$("del").click(function (e) {
			if(!confirm('Biztos-e')){
				e.preventDefault();
			}
		})
	});
</script>
```

A lenti változó átadás helyett bonyolultabb esetben inkább egy endpoint-ot kellene definiálni, amely az értékeket egy AJAX-os lekérdezéssel JSON-ben visszaadja.

(példa 4) - értékek átadása sablonban

```
//var macskak1=<%= JSON.stringify(macskak)%>;
var macskak2=<%- JSON.stringify(macskak)%>;
//var macskak3=JSON.parse("<%= JSON.stringify(macskak)%>");
//var macskak4=JSON.parse("<%- JSON.stringify(macskak)%>");
```

Értékek átadása alsóbbszintű template file-oknak:

```
<%- include('header', {valtozonev: ertek}) -%>
```

__Minta:__ vezérlési szerkezetek tabulálása:

```
if (cond1 != cond2){
	// kod, pl. callback függvény 
} else {
	return;
}
```

helyett a feltétel megfordítása:

```
if (cond1 == cond2){
	return;
}
// kod, pl. callback függvény 
```

és akkor nem kell tabulálni.

(példa 5) - értékek alapján betöltés, törlés

```
app.use('/items/del', loadMW, function(req, res, next){
	res.tpl.macska.delete(function(){
		next();
	});
//	var newmacskak = [];
//	macskak.forEach(function(item){
//		if (item.id == req.query.id){
//			return;
//		}
//		newmacskak.push(item);
//	});
//	macskak = newmacskak;
	next();
}, function(req,res,next){
	return res.redirect('/');
});
```

A fenti példában a kommentezett rész inkább `controller`, a nem kommentezett rész pedig inkább `middleware`, amely kihasználja, hogy a `loadMW` előtte már betöltötte az adatot és ennek eredményére építi a törlést.

(példa 6) - értékek alapján betöltés, törlés, navigálás a részletezőre

```
// alapértelmezés szerint minden értéket átad
<%- include row -%>
```

```
// csak a felvett értékeket adja át
<%- include('row',{macska:macska}) -%>
```

(példa 7) - al template-ekre bontás

Értelemszerűen érdemes bontani a template-eket, nem érdemes a közös elemeket a végtelenségig kiemelgetni.

### WebPack

https://webpack.js.org/

Sok függőséget (akár NPM által telepített library-k) összerak egybe. A Webpack megtartja ugyanazt a mudul struktúrát amit a NodeJS is.

Fontos: a video nem tért ki a webpack telepítésre, konfigurálására, így a fenti példákat nem sikerült , a hivatkozott beszélgetés nincs a videok között.

```
webpack browser.js app.js
```

(példa 8) - egy függőség, nem kell külső modulokat is becsomagolni
(példa 9) - több függőség, egymás után fűzi a hivatkozott modulokat

Az `x.html` fájl konzol logján kiérkezik az üzenet. A `marked` és `semver` függvények megtekinthetők. Tapasztalható, hogy hordozhaó a szerver és a kliens között a teljes kód struktúra.

Vannak olyan library-k, amelyeket nem lehet átfordítani, pl. 

* express a file system betöltés miatt
* ejs az fs modul miatt (de van a weboldalon így használható verzió is)

A `browserify` is képes a teljes express alkalmazást javascript-té alakítani. A `chrome` képes egy socketet publikálni, mellyel így webserver nélkül egy HTML oldalt megtekintve egy `express`-es alkalmazást lehet üzemeltetni. Kifelé már korábban is működött, tehát egy MongoDB szerverhez képes csatlakozni egy szerver oldalról kliens oldalra leforgatott bömgészőben futó JS kód.

## 9. Előadás - MongoDB, séma tervezés, performancia kérdések (2017)

https://www.youtube.com/watch?v=UkaYwDqoVX4

MVC - Model-View-Controller  
ORM - Object Relational Mapping  
CRUD - Create, Read, Update, Delete  
NoSQL - Not Only SQL

* Dokumentum adatbázisok (JSON, YAML, XML)
	* MongoDB
* Oszlopos (vagy tabulált) adatbázisok
	* Cassandra
	* keresési, indexelési, cachelési, elosztott tárolási problémákra megoldás
* Gráf adatbázisok
	* Neo4J - nincs online backup
* Kulcs-érték adatbázisok (vagy Tuple, quad store)
	* Redis, MemchacheD
	* tipikusan memória adatbázisok
* Objektum adatbázisok
	* OrientDB
	* ORM típusú működés adatbázis irányába eltolva
	* modell típusú korlátok, összefüggések objektum szinten kezelhetők

### MongoDB

Dokumentum adatbázis. C++ alapú. A V8-as JS engine-re épül. JSON-t tárol BSON formában. Mongo shellel érkezik, melybe JS kód írandó, mely egy stringet (pl. megírt funtion) képes lefuttatni az adatbázison. Képes szólni az alkalmazásnak, ha az adatbázisban módosult az érték. Pl. a Meteor feliratkozási struktúra az adatbázis eseményekre. 

#### Telepítés

https.//www.mongodb.org/downloads
https://robomongo.org

__Fontos:__ telepítés után konfigurálandó, mivel alapból nincs benne sem authentikáció, sem egyéb korlátozás, így bárki csatlakozhat.

#### Adatstruktúra

Félis strukturált adatok:

* __adatbázis:__ a hozzáférés és tárolás legmagasabb szintje
* __collection:__ hasonlít a táblához (inkább egy zsák), azonos típusú dokumentumokat fogja össze, nincs strukturális azonosság megkövetelve, nincs validáció
* __dokumentum:__ hasonlít egy rekordoz (inkább egy cetli), maga az adat
	* **BSON**
	* **_id** a dokumentum azonosítója

#### Műveletek

MongoDB Shell:

##### Beszúrás

`db.collection.insert(document or array of documents, optional_options);`

Object-ben bármi lehet, akár function-ök, object-ek, listák és ezek kombinációja is.

```
db.inventory.insert(
	{
		item: "ABC1",
		details: {
			model: "14Q3",
			manufacturer: "XYZ Company"
		},
		stock: [ { size: "S", qty: 25 }, { size: "M", qty: 50 } ],
		category: "clothing"
	}
)
```

Egy collection-ben különböző kinézetű item-ek tárolhatók.

##### Törlés

`db.collection.remove(query,justOne)`

Mintázat alapján töröl:

```
db.inventory.remove( { category : "clothing" } )
```

Az összes collection-ben levő elem törlésre kerül, ahol a feltételkielégül.
A `justOne` csak egyetlen rekordot töröl.

##### Módosítás

`collection.update(query,update,optional_options);`

Mintázat alapján update-el:

```
db.inventory.update({ item: "ABC1" },{category: "Food"})
```

##### Keresés

https://docs.mongodb.com/manual/reference/operator/

`db.collection.find(query, projection)` vagy `db.collection.findOne(query, projection`

```
db.inventory.find(
	{
		type: 'food',
		$or: [ { qty: { $gt: 100 } }, { price: { $lt: 9.95 } } ]
	}
)
```

__Megjegyzés__: ha nincs kiírva a legfelsőbb szinten, akkor a query-ben **'és'**-ként kell a műveletet értelmezni.

Képes egy query alapján egy item egy listájába elemet beilleszteni is.

#### Collection

Struktúra hasznos lehet:

1. Collectionök közötti kapcsolatok (pl. kutyák és gazdáik)
2. Típusok / kötöttségek ellenőrzése (lehetséges típusokat rögzíteni)
3. Indexek létrehozása a gyors keresés miatt

__Fontos:__ ha egy mező nincs kitöltve, azt MongoDB-be ne küldjük le, hogy ne legyen null.

##### Collection közötti kapcsolatok

Az **_id** egy manuális referencia egy másik objektumra, a tagváltozó randomgenerált (timestamp + számjegy), de nem garantáltan future proof, így nem érdemes sorrendezni vele. (Sorrendezéshez: `created` mezőbe `date.now()` pusholása). Bár a MongoDB uniqe-ot generál, de az értéknek nem kötelező egyedinek lennie.

Kézzel létrehozott **_id**:

```
original_id = ObjectId()
db.places.insert({
	"_id": original_id,
	"name": "Broadway Center",
	"url": "bc.example.net"
})
db.people.insert({
	"name": "Erin",
	"places_id": original_id,
	"url": "bc.example.net/Erin"
})
```

A fenti példában az _id mint string hivatkozik a másikra. A driver a saját szintjén oldja fel az **_id**-t (ha a felhasználó vagy a kód ezt kéri), nem pedig a MongoDB. Ha nincs kérve a feloldás, akkor csak egy ID-t kapunk vissza.

A **DBRef** egy explicit kapcsolat két objektum között

```
db.places.insert({
"_id" : ObjectId("5126bbf64aed4daf9e2ab771"),
"name": "Broadway Center",
"url": "bc.example.net"
"creator" : {
	"$ref" : "creators",
	"$id" : ObjectId("5126bc054aed4daf9e2ab772"),
	"$db" : "users"
}
})
```

A feloldás itt már MongoDB szinten történik.

__Megjegyzés:__ nem kell listákat vagy objecteket külön helyen tárolni, nem kellenek kapcsoló táblák, join-ok, performancia problémák, mert bár a struktúra nem szép, de cserébe egy helyen vannak.

#### Típusok

Nem erőlteti őket, de ismeri és képes használni. BSON típusain alapul:
__Double, String, Object, Array, Binary data, Object id, Boolean, Date, Null, Regular Expression, JavaScript, Symbol, JavaScript (with scope), 32-bit integer, Timestamp, 64-bit integer__

A típusok jól jönnek az alábbi műveletek során:

* összehasonlítás
* sorrendezés
* aggregáció
* sharding

__Sharding:__ logikailag egyként látva, fizikailag külön tárolva, driver oldja meg, osztja szét a kéréseket.

__Fontos:__ 

* pl. string-et és int-et besorrendez a mongodb egy `sortby`-ra.
* típus szintű limitációk a driverek feladata, a MongoDB-t nem érdeklik, bármit bármivé tud konvertálni

#### Index-ek

A collection-ökön belül jönnek létre. A query-k gyorsabbak lesznek. Sharding alapja tud lenni, ez alapján osztható szét az adata egy clusterben.

```
db.records.createIndex( { userid: 1 } )
db.products.createIndex( { item: 1, category: 1, price: 1 } )
db.accounts.createIndex( { "tax-id": 1 }, { unique: true } )
```

__Fontos:__ a __unique__ csak indexeknél fontos, de valójában bármennyi instance beilleszthető.

### Mongoose

Egy adatbázis driver.

https://www.npmjs.com/package/mongoose

```
npm install mongoose --save
```

Adatbázishoz kapcsolódás:

```
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
```

Modell létrehozása és adatbázisba mentése:

```
var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
	console.log('meow');
});
```

__Fontos:__ az adatbázis és collection automatikusan létrejön akár egy query-re is (ami math.random()-ra veszélyes lehet). A modell módosítására az adatbázis tartalma nem változik (nincs default érték, mint klasszikus adatbázisnál).

A mongoose az __ODB__ (majdnem ORM) funkciók miatt megköveteli, hogy sémát definiáljunk, hogy le tudja képezni a lekérdezéseket / válaszokat.

__Megjegyzés:__ MongoDB-s adatok kezelésénél sok az `if`-et használó vezérlési szerkezet.

#### Schema

Felelős a validációért, vagy a kiterjesztett műveletekért. Komplex dolgokhoz használandó.

```
var schema = kittySchema = new Schema({ name: String }));
schema.method('meow', function () {
	console.log('meeeeeoooooooooooow');
})
var Kitty = mongoose.model('Kitty', schema);
var fizz = new Kitty;
fizz.meow();
```

Lehet `Pre` és `Post` műveleteket definiálni MongoDB-ből kijövő/bemenő adatokkal, transzformációkat megadni.

```
var schema = new Schema({
	name: String,
	binary: Buffer,
	living: Boolean,
	updated: { type: Date, default: Date.now },
	age: { type: Number, min: 18, max: 65 },
	mixed: Schema.Types.Mixed,
	_someId: Schema.Types.ObjectId,
	array: [],
	ofString: [String],
	ofNumber: [Number],
	ofDates: [Date],
	ofBuffer: [Buffer],
	ofBoolean: [Boolean],
	ofMixed: [Schema.Types.Mixed],
	ofObjectId: [Schema.Types.ObjectId],
	nested: {
	stuff: { type: String, lowercase: true, trim: true }
})
```

A sémát a driver ellenőrzi.

* Schema.Types.Mixed = bármi
* Schema.Types.ObjectId = feloldások miatt megkülönböztetve
* [<type>]: konverzió történik a driver által
* nested: inline séma definíció
* ajánlás: külső kulcs típusokat '**_**'-al kezdeni

```
var Task = db.model('Task', {
	name: String,
	state: Number,
	_assignedTo: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	likes: [ {ki: String} ]
});
```

__Fontos:__ régi mongoose-nál a string összehasonlítása ObjectId-val mindig false.

```
var Cat = mongoose.model('Cat',
{
	name: String
	_owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Owner'
	}
});
```

A séma előre vagy utólag is definiálható. A `mongoose.Schema.Types.ObjectId` a mongoose npm package-n belül létezik `var Schema = require('mongoose').Schema;`.

##### Létrehozás, módosítás

 Mentéskor a definiált attribútumok kerülnek a MongoDB-ben tárolásra:

```
var fizz = new Kitty();
fizz.name = 'Cica';
fizz.save(function(err){
	//console.log
});
```

A modell alapján létrehozott példány objektumként viselkedik.

##### Törlés

Collection-t definiálja a séma, ezen a `remove(query, callback)` függvénnyel. A törlés aszinkron módon fut le.

```
Comment.remove({ title: 'baby born from alien father' }, function (err) {
});
Comment.remove({ _id: id }).exec();
```

##### Keresés

http://mongoosejs.com/docs/queries.html

Aszinkron módon fut le.
Callback helyett Promise-okkal is megvalósítható (`.then()`).

```
Kitten.find({name : 'Cica'},function (err, cicak) {
});
Kitten.findOne({name : 'Cica'},function (err, egycica) {
});
```

A `findOne()` csak uniqe dolgok kereséséhez használandó, mert bár mindig ugyanazt találja meg, de nem biztos, hogy az első, utolsó megtalált elemet adja vissza. A keresések más parancsokkal láncolhatók, `where()`, `limit()`, `sort()`, `select()`, `exec()`. Az `exec()` hozza létre a MongoDB-s kérést és a választ parse-olja.

##### Performancia

* Adatstruktura
	* arra legyen kitalálva, amit az alkalmazás csinál
	* ne egy collection-be mindent
	* változatos adatokat lehetőleg külön collection-be
	* pl. gps-nek 3 fajta kinézte lehet: lehet 2 long, 1 string vagy lokáció neve
		* legközelebb ha a user belép, bekérni/átkonvertálni az új értéket
		* ha a legújabb verzió, nincs módosítás
	* MongoDB jó arra, hogy ne kelljen régi adatokhoz hozzányúlni.
	* Az adatstruktura váltás nagyon fájdalmas tud lenni.
* Indexek
	* ha sok az adat érdemes rátenni
	* nem annyira fájdalmas módosítani, de tudni kell mi lassú
* Cache
	* pl. ha sok kiszámítani valamit
	* redis, memcached, file stb.
	* csak kicsit fájdalmas, kevés kódot kell írni
* Skálázhatóság
	* pl. memória növelés
	* egyszerű módosítani
* Architektura
	* ne egy docker container vagy virtuális szerver, hanem szétbontva
	* alkalmazás szerver és adatbázis szerver külön
	* előre tervezendő
* Ténylegesen használt eszköz
	* pl. új fizikai gép
	* nagyon egyszerű módosítani

#### Profilozás

https://docs.mongodb.org/manual/tutorial/analyze-query-plan/

SQL-es explain-hez hasonló.

```
db.setProfilingLevel(1)
query.explain("executionStats")
```

## 10. Gyakorlat - MongoDB és Express, kliens és szerver oldali kód hordozás (2017) (TODO)

https://www.youtube.com/watch?v=Im0QkTshUGQ

## 11. Előadás - core modulok: http, https, os, fs, events (2017) (TODO)

https://www.youtube.com/watch?v=x3VHEp9r5Ts

## 12. Gyakorlat - core modulok a gyakorlatban (2017) (TODO)

https://www.youtube.com/watch?v=ZCUvghcWGhk

## 13. Előadás - Unit és integrációs tesztek, mocha, assert struktúrák (2017) (TODO)

https://www.youtube.com/watch?v=jbSA5Y9lzkY

## 14. Gyakorlat Tesztelés (2017) (TODO)

https://www.youtube.com/watch?v=NXCqlcz-Gf0

## 12. Gyakorlat - core modulok a gyakorlatban (2016) (TODO)

https://www.youtube.com/watch?v=bxUg6HmYmxI

