var express = require('express');
// var bodyParser = require('body-parser');
var db = require('./db');
var path = require('path');
var bb = require('express-busboy');

var UsersRouter = require('./resources/Users/UsersRouter');
var CategorysRouter = require('./resources/Categorys/CategorysRouter');
var CoursesRouter = require('./resources/Courses/CoursesRouter');
var YoutubeRouter = require('./resources/Youtube/YoutubeRouter');

var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();
app.use(session({
  secret: 'OurAppSessionSecrets',
  resave: false,
  saveUninitialized: true,
}));
bb.extend(app, {
  upload: true,
  allowedPath: /./
});
// app.use(bodyParser.json({limit: '100mb', extended: true}));
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/api/user', UsersRouter);
app.use('/api/category', CategorysRouter);
app.use('/api/course', CoursesRouter);
app.use('/api/youtube', YoutubeRouter);

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
})

module.exports = app;
