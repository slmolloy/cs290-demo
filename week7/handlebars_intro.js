var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res) {
  res.render('home', {
    time: new Date(Date.now()).toLocaleTimeString('en-US'),
    randomNumber: Math.random()
  });
});

app.get('/otherhome', function(req, res) {
  res.render('otherhome');
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