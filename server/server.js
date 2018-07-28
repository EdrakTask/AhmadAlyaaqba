var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var path = require('path');

var UsersRouter = require('./resources/Users/UsersRouter');
var CategorysRouter = require('./resources/Categorys/CategorysRouter');

var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();
app.use(session({
  secret: 'OurAppSessionSecrets',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/api/user', UsersRouter);
app.use('/api/category', CategorysRouter);

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
})

module.exports = app;
