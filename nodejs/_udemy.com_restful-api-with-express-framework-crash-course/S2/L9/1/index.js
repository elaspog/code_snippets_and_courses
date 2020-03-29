var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(function(req, res, next){
    console.log('Time', Date.now());
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
