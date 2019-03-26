const routes = (app) => {

    app.route('/')

        .get((req, res) => {
            res.send(`This is a GET method.`)
        })
        
        .post((req, res) => {
            res.send(`This is a POST method.`)
        })
        
        .put((req, res) => {
            res.send(`This is a PUT method.`)
        })
        
        .delete((req, res) => {
            res.send(`This is a DELETE method.`)
        });
}

module.exports = routes;