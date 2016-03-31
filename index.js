var express = require('express');
var path = require('path');
var app = express();
app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'content.html'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'style.css'));
});

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on ', app.get('port'));
});
