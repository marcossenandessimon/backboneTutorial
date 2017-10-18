var express = require('express');
var mongoose = require('mongoose');
var bodyParser =  require('body-parser')

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
});

mongoose.model('Blog', BlogSchema);

var Blog = mongoose.model('Blog');

var blog = new Blog({
    author: 'marcos',
    title: 'marcos\' blog',
    url: 'marcosblog.com'
})

blog.save();



var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//ROUTES

app.get('/api/blogs', function(req, res){
    Blog.find(function(err, docs){
        docs.forEach(function(item){
            console.log('Received a get request for _id: ' + item._id);
        });
        res.send(docs);
    });
});

app.post('/api/blogs', function(req, res){
    console.log('received a post request')    
    var addedBlog = new Blog(req.body);
    addedBlog.save(function(err, doc){
        res.send(doc)
    })
});

app.put('/api/blogs/:id', function(req, res){
    console.log('received a put request')
    Blog.update({_id: req.params.id}, req.body, function(err){
        res.send({_id: req.params.id});
    })
});

app.delete('/api/blogs/:id', function(req, res){
    console.log('received a delete request')
    Blog.remove({_id: req.params.id}, function(err){
        res.send({_id: req.params.id});
    });
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);