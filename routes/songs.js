

var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

AWS.config.update({
    accessKeyId: 'AKIAIWPOGAA4SGIPOR2A',
    secretAccessKey: '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'
});
AWS.config.region = 'us-east-1';


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
