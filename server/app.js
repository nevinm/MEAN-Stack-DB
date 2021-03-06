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
    Book.find({
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

//Adding a book
app.post('/book', function(req, res) {
    var newBook = new Book();

    newBook.author = req.query.author;
    newBook.title = req.query.title;
    newBook.category = req.query.category;

    newBook.save(function(err, book) {
        if (err) {
            res.send("Error saving book");
        } else {
            res.send(book);
        }
    });
});

//Another way of adding a book.
app.post('/book2', function(req, res) {
    Book.create(req.body, function(err, book) {
        if (err) {
            res.send('error saving book');
        } else {
            console.log(book);
            res.send(book);
        }
    });
});

//Updating
app.put('/book/:id', function(req, res) {
    Book.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: { title: req.body.title }
    }, { upsert: true }, function(err, newBook) {
        if (err) {
            res.send('error updating ');
        } else {
            console.log(newBook);
            res.send(newBook);
        }
    });
});

//Deleting
app.delete('/book/:id', function(req, res) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function(err, book) {
        if (err) {
            res.send('error removing')
        } else {
            console.log(book);
            res.status(204);
        }
    });
});

app.listen(port);
