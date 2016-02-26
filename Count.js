/* Express and Middleware */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');

/* Handlebars Setup */
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* Body Parser Setup */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Session Setup */
app.use(session({secret:'dVXP6auHRCmQaetw'}));  /* Password Generated: www.passwordsgenerator.net */

/* CSS Setup */
app.use(express.static(__dirname + '/public'));

/* Application Port */
app.set('port', 3080);

/* Home Catcher */
app.get('/', function(req,res){
	res.render('home');
});

/* Count on GET */
app.get('/count', function(req,res){
	var context = {};
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter', context);
});

/* Reset on POST, if correct */
app.post('/count', function(req,res){
  	var context = {};
	console.log(req.body);
	if (req.body.command === "resetCount"){
		req.session.count = 0;
		context.err = false;
	}
	else {
		context.err = true;
	}
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter', context);
});

/* ERROR Handler */
app.use(function(req,res){
	res.status(404);
	res.render('404_-_Not_Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500_-_Internal_Server_Error');
});

/* Start Application */
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate.');
});