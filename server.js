var env = process.env.NODE_ENV;

var port        = process.env.PORT || 8000;
var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var methodOverride = require('method-override');
var app         = express();

var songs       = require('./routes/songs');

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



// bootstrap routes
app.use('/api', songs); 

// static file serving
/*var staticdir = __dirname + '/app';
app.use(express.static(staticdir));
app.use(express.static(__dirname));*/

var staticdir = env === 'production' ? 'dist.prod' : 'dist.dev'; // get static files dir
app.use(require('prerender-node').set('prerenderToken', '8ESwxcLKzl0COL7btzHW')); //prerender.io token
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/' + staticdir)); // set the static files location /public/img will be /img for users




app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: staticdir });
});




app.listen(port, function(){
  console.log('Server started listening port: ' +port); 
});


if (env == 'dev') {
	//Livereload code for development auto refresh
	var livereload = require('livereload');
	var server = livereload.createServer();
	server.watch(staticdir);
	console.log('livereload is running'); 
}