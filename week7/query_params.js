var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  var qParams = [];
  for (var p in req.query) {
    qParams.push({ 'name': p, 'value': req.query[p] })
  }
  res.render('queryparams', {
    action: 'GET',
    param: qParams
  });
});

app.post('/', function(req, res) {
  var qParams = [];
  for (var p in req.body) {
    qParams.push({ 'name': p, 'value': req.body[p] })
  }
  res.render('queryparams', {
    action: 'POST',
    param: qParams
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render(404);
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