var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('requesttesting', {
    action: 'GET',
    qParams: getQueryParamsArray(req)
  });
});

app.post('/', function(req, res) {
  res.render('requesttesting', {
    action: 'POST',
    qParams: getQueryParamsArray(req),
    bParams: getBodyParamsArray(req)
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

function getQueryParamsArray(req) {
  var qParams = [];
  if (req.query != undefined) {
    for (var p in req.query) {
      qParams.push({'name': p, 'value': req.query[p]})
    }
  }
  return qParams;
}

function getBodyParamsArray(req) {
  var bParams = [];
  for (var p in req.body) {
    bParams.push({ 'name': p, 'value': req.body[p] })
  }
  return bParams;
}