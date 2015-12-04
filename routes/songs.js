var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.region = 'us-east-1';

//setting proxy
//var proxy = require('proxy-agent');
//AWS.config.update({httpOptions: { agent: proxy('http://tpaproxy.verizon.com:80') } });


var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
var fs = require('fs');



router.get('/get-all-songs', function(req, res, next) {

    var params = {
        TableName: 'Songs'
    };

    dynamodbDoc.scan(params, function(err, data) {

        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            return res.send(err);
        } // an error occurred
        else {
            // successful response
            console.log(data.Items);
            res.send(data.Items);
        }
    });
});














router.get('/song/:id', function(req, res, next) {

    var params = {
        TableName: 'Songs',
        Key: {
            "id":  parseInt(req.params.id)
        }
    };

    dynamodbDoc.get(params, function(err, data) {
        if (err) {// an error occurred
            console.log(err);
            return res.send(err);
        } 
        else {
            // successful response
            //console.log(data.Item);
            res.send(data.Item);
        }
    });


});



router.put('/song/play-count/:id', function(req, res, next) {

    var params = {
        TableName: 'Songs',
        Key: {
            "id": parseInt(req.params.id)
        },
        UpdateExpression: "set playCount = playCount + :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    };

    dynamodbDoc.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.send(err);
        }
    });
});


router.put('/song/download-count/:id', function(req, res, next) {

    var params = {
        TableName: 'Songs',
        Key: {
            "id": parseInt(req.params.id)
        },
        UpdateExpression: "set downloadCount = downloadCount + :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    };

    dynamodbDoc.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.send(err);
        }
    });
});



router.post('/song/:id', function(req, res, next) {

var allMovies = JSON.parse(fs.readFileSync('app/myDataJson.json', 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Songs",
        Item: {
            "id":  movie.id,
            "title": movie.title,
            "image":  movie.image,
            "artist":  movie.artist,
            "filter": movie.filter,
            "filename":  movie.filename,
            "url":  movie.url,
            "comments": movie.comments,
            "downloadCount":  movie.downloadCount,
            "playCount":  movie.playCount,
            "rating":  movie.rating
        }
    };


    dynamodbDoc.put(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err);
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            res.send(data);
        }
    });
    });

});


module.exports = router;
