var app = require('./server.js');
var port = 3000;

app.listen(process.env.PORT || port, function () {
  console.log('listening on port ' + port);
});
