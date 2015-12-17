var env = process.env.NODE_ENV;

var port        = process.env.PORT || 8000;
var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var app         = express();

var songs       = require('./routes/songs');

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



// bootstrap routes
app.use('/api', songs); 

// static file serving
var staticFileDir = __dirname + '/app';
app.use(express.static(staticFileDir));
app.use(express.static(__dirname));


app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: staticFileDir });
});




app.listen(port, function(){
  console.log('Server started listening port: ' +port); 
});


if (env == 'dev') {
	//Livereload code for development auto refresh
	var livereload = require('livereload');
	var server = livereload.createServer();
	server.watch(__dirname + "/app");
	console.log('livereload is running'); 
}