var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main_random'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

function getRandom(){
	var rStuff = {};
	rStuff.min = 1;
	rStuff.max = 100;
	rStuff.random = (Math.floor(Math.random() * (rStuff.max - rStuff.min + 1)) + rStuff.min);
	return rStuff;
}

app.get('/', function(req, res){
	res.render('random', getRandom());
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(req,res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-c to terminate.');
});