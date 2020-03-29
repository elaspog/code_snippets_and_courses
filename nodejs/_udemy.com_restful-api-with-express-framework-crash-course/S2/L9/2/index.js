var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', function(req, res, next){
    console.log('Req Method: ', req.method);
    next();
}, function(req, res, next){
    console.log('Req Original Url', req.originalUrl);
    next();
}, function(req, res, next){
    res.send('Request Was Successful');
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
