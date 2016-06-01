var express = require('express');
var app = express();

var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

var db = require('./db');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 3000));

app.use(session({secret: 'SuperSecret'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  var context = {};

  db.pool.query('SELECT * FROM todo', function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    context.results = rows;
    console.log("Rows: " + rows);
    console.log("Fields: " + fields);
    res.render('home', context);
  });
});

app.get('/insert', function(req, res, next) {
  var context = {};
  db.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    context.results = "Inserted name " + req.query.c + " with id " + result.insertId;
    res.render('inserted', context);
    console.log(result);
  });
});

app.get('/reset-table', function(req, res, next) {
  var context = {};
  db.pool.query("DROP TABLE IF EXISTS todo", function(err) {
    context.results = "Table dropped";

    var queryString = "CREATE TABLE todo(" +
        "id INT PRIMARY KEY AUTO_INCREMENT," +
        "name VARCHAR(255) NOT NULL," +
        "done BOOLEAN," +
        "due DATE)";
    db.pool.query(queryString, function(err) {
      context.results += " - Table created";
      res.render('reset-table', context);
    });
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
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