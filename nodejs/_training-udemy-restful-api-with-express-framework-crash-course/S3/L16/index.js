var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test', { 
    useNewUrlParser: true 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const BlogSchema = require('./src/models/crmModel');
const blogModel = mongoose.model('blog', BlogSchema);

app.post('/newBlog', (req, res) => {
    let blog = new blogModel(req.body);
    blog.save((err, blogModel) => {
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
})

let getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if (err) {
            res.send(err);
        } else {
            res.json(blogs);
        }
    });
}

app.get('/getBlogs', getAllBlogs);

let getBlogByID = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) => {
        if (err){
            res.send(err);
        }
        res.json(blog);
    })
}

app.get('/blog/:blogId', getBlogByID);


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
