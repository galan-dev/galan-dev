var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Questions into DynamoDB. Please wait.");

var mod1json = JSON.parse(fs.readFileSync('../data/mod1.json', 'utf8'));
console.log(mod1json);

Object.keys(mod1json).forEach(function(key) {
    var params = {
        TableName: "modules",
        Item: {
            "module":  "interview-module",
            "timestamp": Date.now(),
            "data": {
                "type": "Gen",
                "questionID": Number(key),
                "question": mod1json[key].Question,
                "source": mod1json[key].Source,
                "tags": mod1json[key].Tags.split(",")
            }
        }
    };

    console.log(params);

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add question", mod1json[key], ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", mod1json[key]);
       }
    });
});