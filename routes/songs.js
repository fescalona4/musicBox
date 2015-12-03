

var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: ''
});
AWS.config.region = 'us-east-1';

//setting proxy
var proxy = require('proxy-agent');
AWS.config.update({httpOptions: { agent: proxy('http://tpaproxy.verizon.com:80') } });


var dynamodb = new AWS.DynamoDB();
var unmarshalJson = require('dynamodb-marshaler').unmarshalJson;


router.get('/song/:id', function(req, res, next) {

    var params = {
        TableName: 'music',
        Key: {
            "id": {
                "N": req.params.id
            }
        }
    };


    //console.log(params);

    dynamodb.getItem(params, function(err, data) {

        if (err) {
            console.log(err);
            return res.send(err);
        } // an error occurred
        else {
            // successful response
            console.log(unmarshalJson(data.Item));
            res.send(unmarshalJson(data.Item));
        }
    });


});


module.exports = router;
