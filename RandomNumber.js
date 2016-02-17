var express = require('express');
var app = express();
app.set('port',3000);

/* Random Number Generator Page */
app.get('/',function(req,res){
	var min = 1;
	var max = 100;
	var random = Math.floor(Math.random() * (max - min + 1)) + min;  //Min to Max (inclusive)
	res.type('text/plain');
	res.send('Random Number (' + min + ' to ' + max + 'inclusive): ' + randomNumber);
});

/* Error Handler Pages */
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

/* Start Application */
app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});