var port        = process.env.PORT || 8000;
var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var app         = express();

var songs       = require('./routes/songs');

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Collect visitor metric
// Todo

// bootstrap routes
app.use('/api', songs); 

// static file serving
var staticFileDir = __dirname + '/app';
app.use(express.static(staticFileDir));
app.use(express.static(__dirname));

app.listen(port, function(){
  console.log('Server started listening port: ' +port); 
});