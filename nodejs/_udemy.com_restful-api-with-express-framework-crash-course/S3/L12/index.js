var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { 
    useNewUrlParser: true 
});

const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({name: 'mimi'});

kitty.save().then((res)=>{
    console.log(res);
    console.log("Meow");
})


app.get('/', function(req, res){
    console.log('Req Method: ', req.method);
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
