var express = require('express');

var app = express();

app.set('port', 3000);

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Welcome home');
});

app.get('/otherhome', function(req, res) {
  res.type('text/plain');
  res.send('Welcome to the other home');
});

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server error');
});

app.listen(app.get('port'), function() {
  console.log('Express server started on http://localhost:' + app.get('port'));
});