var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send(`This is a GET method.`)
});

app.post('/', (req, res) => {
    res.send(`This is a POST method.`)
});

app.put('/', (req, res) => {
    res.send(`This is a PUT method.`)
});

app.delete('/', (req, res) => {
    res.send(`This is a DELETE method.`)
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
