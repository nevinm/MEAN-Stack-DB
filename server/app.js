var express = require('express');
// var routes = require('routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var Book = require('./Book.model');
var db = mongoose.connection;
var port = 3000;

console.log("Hello there fellow human, please check http://localhost:" + port + "/");

app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));

mongoose.connect("mongodb://localhost/books");

//Checking the database connectivity.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Houston, we have lift off for database!");
});

//Basic home page routing
app.get('/', function(req, res) {
    res.send("Happy to be here");
});

//Getting the books
app.get('/books', function(req, res) {
    console.log("Getting all books")
    Book.find({})
        .exec(function(err, books) {
            if (err) {
                res.send("Error has occured");
            } else {
                console.log(books)
                res.json(books);
            }
        })
});

//Getting the books based on id
app.get('/books/:id', function(req, res) {
    console.log("Getting one book");
    Book.findOne({
            _id: req.params.id
        })
        .exec(function(err, book) {
            if (err) {
                res.send("Error has occured");
            } else {
                console.log(book);
                res.json(book);
            }

        })
});


app.listen(port);
