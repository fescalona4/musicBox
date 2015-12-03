
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var AWS = require('aws-sdk');
var app = express();



//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var songs = require('./routes/songs');
app.use('/api', songs); //This is our route for calling

module.exports = app;



// This is also a better approach for providing port
// It says to use the port specified in the environment var of the process
// if not provided default to 800
var port = process.env.PORT || 8000;

// the /app path is relative to whatever the __dirname variable resolves to
var staticFileDir = __dirname + '/app';
app.use(express.static(staticFileDir));
app.use(express.static(__dirname));


app.listen(port);
console.log('Listening on port: ' + port);
