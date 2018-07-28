var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/EdrakDB';

// Connect Mongoose to Mlab URL if exist or to our local MongoDB 
mongoose.connect(process.env.MONGOURI || mongoUri, { useMongoClient: true });
var db = mongoose.connection;
// handle error on connections
db.on('error', console.error.bind(console,'connection to database not working'));
// if connection open print a connection message
db.once('open', function() {
	console.log('connected to database work');
});

module.exports = db;