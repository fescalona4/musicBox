var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';




//setting proxy
//var proxy = require('proxy-agent');
//AWS.config.update({httpOptions: { agent: proxy('http://tpaproxy.verizon.com:80') } });


var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();



var fs = require('fs');
var count = 0;

module.exports = {



    // Find all songs in db
    findAllSongs: function(callback) {
        // format
        var params = {
            TableName: 'Songs'
        };

        dynamodbDoc.scan(params, function(err, data) {
            // Retrieve the json data in dynamo db
            var songs = [];
            if (err) {
                // An error occurred
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                songs = err;
            } else {
                // Successful response
                console.log("api/get-all-songs: " + count++);
                songs = data.Items;
            }
            callback(songs);
        });
    },



    findSongById: function(id, callback) {

        var params = {
            TableName: 'Songs',
            Key: {
                "id": parseInt(id)
            }
        };

        dynamodbDoc.get(params, function(err, data) {
            var song = {};
            if (err) { // an error occurred
                song = err;
            } else {
                // successful response
                song = data.Item;
            }
            //console.log(song);
            callback(song);
        });
    },



    increasePlayCount: function(id, callback) {

        var params = {
            TableName: 'Songs',
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set playCount = playCount + :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        };

        dynamodbDoc.update(params, function(err, data) {
            var signal = {};
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                signal = err;
            } else {
                //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                signal = err;
            }
            callback(signal);
        });
    },



    increaseDownloadCount: function(id, callback) {

        var params = {
            TableName: 'Songs',
            Key: {
                "id": parseInt(id)
            },
            UpdateExpression: "set downloadCount = downloadCount + :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        };

        dynamodbDoc.update(params, function(err, data) {
            // 
            var signal = {};
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                signal = err;
            } else {
                //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                signal = err;
            }
            callback(signal);
        });
    },


    increaseVisitCount: function(callback) {

        var params = {
            TableName: 'Helper',
            Key: {
                "id": "visitCount"
            },
            UpdateExpression: "set Counts = Counts + :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        };

        dynamodbDoc.update(params, function(err, data) {
            var signal = {};
            var newCount = null;
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                signal = err;
            } else {
                //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                newCount = data.Attributes;
            }
            callback(newCount);
        });
    },





    getNewId: function(song, callback) {

        var params = {
            TableName: 'Helper',
            Key: {
                "id": "IdCount"
            },
            UpdateExpression: "set Counts = Counts + :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        };

        dynamodbDoc.update(params, function(err, data) {
            var signal = {};
            var newId = null;
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                signal = err;
            } else {
                //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                newId = data.Attributes;
                //console.log(newId);
            }
            callback(song, newId);
        });
    },



    // POST service to load all songs from json to db
    insertNewSong: function(id, song, callback) {

        console.log(song);
        var params = {
            TableName: "Songs",
            Item: {
                "id": parseInt(id.Counts),
                "title": song.title,
                "image": song.image,
                "artist": song.artist,
                "filter": song.filter,
                "filename": song.filename,
                "url": song.url,
                "comments": song.comments,
                "downloadCount": song.downloadCount,
                "playCount": song.playCount,
                "rating": song.rating,
                "dateAdded": song.dateAdded
            }
        };

        dynamodbDoc.put(params, function(err, data) {
            var output = {};
            if (err) {
                console.error("Unable to create item. Error JSON:", JSON.stringify(err, null, 2));
                output = err;
            } else {
                console.log("Created new song:", JSON.stringify(data, null, 2));
                output = "INSERT SUCCESS";
            }
            callback(output);
        }); //ends dynamodb   
    },




    // POST service to update existing song
    updateSong: function(song, callback) {
        console.log("HERE");
        console.log(song);
        var params = {
            TableName: "Songs",
            Key: {
                "id": parseInt(song.id),
            },

            ExpressionAttributeNames: {
                "#U": "url"
            },
            UpdateExpression: "set title=:title,image=:image,artist=:artist,filename=:filename,#U=:streamUrl, dateAdded=:dateAdded",

            ExpressionAttributeValues: {
                ":title": song.title,
                ":image": song.image,
                ":artist": song.artist,
                ":filename": song.filename,
                ":streamUrl": song.url,
                ":dateAdded": song.dateAdded
            },
            ReturnValues: "UPDATED_NEW"
        };

        dynamodbDoc.update(params, function(err, data) {
            var output = {};
            if (err) {
                console.error("Unable to Update song. Error JSON:", JSON.stringify(err, null, 2));
                output = err;
            } else {
                console.log("Update song:", JSON.stringify(data, null, 2));
                output = "Update SUCCESS";
            }
            callback(output);
        }); //ends dynamodb   
    }




}; //ends module
