var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
var fs = require('fs');

module.exports = {

  // Find all songs in db
  findAllSongs: function(callback){
    // format
    var params = {
      TableName: 'Songs'
    };

    console.log('Finding all songs...');


    dynamodbDoc.scan(params, function(err, data) {
      // Retrieve the json data in dynamo db
      var songs = [];
      if (err) {
          // An error occurred
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          songs = err;
      } 
      else {
          // Successful response
          console.log("api/get-all-songs");
          songs = data.Items;
      }
      callback(songs);
    });
  },

  findSongById: function(id, callback){

    var params = {
      TableName: 'Songs',
      Key: {
          "id":  parseInt(id)
      }
    };

    return dynamodbDoc.get(params, function(err, data) {
      var song = {};
      if (err) {// an error occurred
          song = err;
      } 
      else {
          // successful response
          song = data.Item;
      }
      console.log(song);
      callback(song);
    });
  },

  increasePlayCount: function(id, callback){

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
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            signal = err;
        }
        callback(signal);
    });
  },

  increaseDownloadCount: function(id, callback){

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
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          signal= err;
      }
      callback(signal);
    });
  },

  // POST service to load all songs from json to db
  loadAllFromJson: function(callback){
    fs.readFile('app/myDataJson.json', 'utf8', function(){
      
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
          var output = {};
          if (err) {
              console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
              output = err;
          } else {
              console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
              output = data;
          }
          callback(output);
       }); //ends dynamodb

      }); //ends foreach

    }); // ends fsReadFile
    
  }//ends loadAllFromJson

}; //ends module