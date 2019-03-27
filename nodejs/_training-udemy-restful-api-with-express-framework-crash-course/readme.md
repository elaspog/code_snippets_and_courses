# Tutorial

https://www.udemy.com/restful-api-with-express/

* NodeJS
* nodemon
* ExpressJS
* BabelJS
* MongoDB
* RoboMongo
* mongoose
* Postman
* VS Code

## S1/L3 Install NodeJS and ExpressJS

* https://nodejs.org

in local shell:

```
$ npm init
$ npm install express --save
```

## S2/L6 Install Server Setup

* nodemon
* string interpolation with backticks

in local shell:

```
$ npm install --save-dev nodemon
```

in package.json:

```
...
"scripts" : {
	...
	"start": "nodemon ./index.js"
}
...
```

in local shell:

```
$ npm run start
```

in web browser:

```
http://localhost:3000
```

## S2/L8 Basics of Routing

in local shell:

```
$ node index.js
```

OR

```
$ npm run start
```

in web browser and postman:

```
GET/POST/PUT/DELETE: http://localhost:3000
```

## S2/L9 Using Middlewares

in local shell:

```
$ node index.js
```

OR

```
$ npm run start
```

## S3/L11 Setting Up Database

* execute `mongod`
	* default port: 27017

in command prompt (as Administrator):

```
$ mongo.exe --dbpath="c:\data\db"
```

* install and run Robo 3T
	* https://robomongo.org

## S3/L12 Database Connection with Mongoose

in local shell:

```
$ npm install --save mongoose
```

## S3/L14 Creating Post Request

in local shell:

```
$ npm install body-parser --save
$ nodemon index.js
```

in Postman:

```
POST
localhost:3000/newBlog
Body:
	x-www-form-urlencoded
		title	"My Title"  
		author	"My Author"  
		body	"My Body"
```

## S3/L15 Getting All Object From Database

in Postman:

```
GET
localhost:3000/getBlogs
```

## S3/L16 Get Object by ID From Database

in Postman:

```
GET
localhost:3000/blog/<:blogId>
```

## S3/L17 Updating Data in Database

in Postman:

```
PUT
localhost:3000/blog/<:blogId>
Body:
	x-www-form-urlencoded
		title	"My Title Update"  
		author	"My Author Update"  
		body	"My Body Update"
```

in Postman:

```
GET
localhost:3000/blog/<:blogId>
```

## S3/L18 Delete Data in Database

in Postman:

```
DELETE
localhost:3000/blog/<:blogId>
```

in Postman:

```
GET
localhost:3000/getBlogs
```

## S3/L19 Serving Static files

in browser:

```
http://localhost:3000/static_test_file.txt
```
