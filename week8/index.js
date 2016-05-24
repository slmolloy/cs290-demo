// Copied from week 7, need to modify for week 8 assignment


var express = require('express');
var app = express();

var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 3000));

app.use(session({secret: 'SuperSecret'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  var context = {};

  if (!req.session.name) {
    res.render('newuser', context);
    return;
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);

  res.render('todo', context);
});

app.post('/', function(req, res) {
  var context = {};

  if (req.body['Logout']) {
    req.session.destroy();
    res.render('newuser', context);
    return;
  }

  if (req.body['New List']) {
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  if (!req.session.name) {
    res.render('newuser', context);
    return;
  }

  if (req.body['Add Item']) {
    req.session.toDo.push({"name": req.body.name, "id": req.session.curId});
    req.session.curId++;
  }

  if (req.body['Done']) {
    req.session.toDo = req.session.toDo.filter(function(e) {
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);

  res.render('todo', context);
});

app.get('/count', function(req, res) {
  var context = {};
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
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
