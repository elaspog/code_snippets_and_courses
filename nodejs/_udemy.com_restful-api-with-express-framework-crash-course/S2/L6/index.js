var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Node and Express server is running for port: ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
