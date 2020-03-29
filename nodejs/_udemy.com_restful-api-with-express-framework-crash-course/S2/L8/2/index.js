var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');

routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
