var express = require('express');
var app = express();
var path = require('path');

// This is also a better approach for providing port
// It says to use the port specified in the environment var of the process
// if not provided default to 800
var port = process.env.PORT || 8000;

// This will not work on all users
//app.use(express.static(path.join(__dirname, 'C:/Users/fescalona/Documents/2 MusicBox/musicBox/app')));

// Use this approach instead
// the /app path is relative to whatever the __dirname variable resolves to
var staticFileDir = __dirname + '/app';
app.use(express.static(staticFileDir));
app.use(express.static(__dirname));

require('routes.js')(app);


app.listen(port);
console.log('Listening on port: '+port);
