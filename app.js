"use strict"
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8081
const path = require('path')
const cors = require('cors')

var AWS = require("aws-sdk");
var router = express.Router();

AWS.config.update({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"// "https://dynamodb.us-east-2.amazonaws.com" "http://localhost:8000"
});

var table = "galanData";

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', router)
router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/reference.html')))

router.get("/interview", function(req, res){
    res.json("Welcome to the Galan Interview API")
})

router.use("/interview/:tags", function(req, res, next){
    if(req.params.tags == '{}'){
        res.set(
            {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        );
        res.status(404);
        res.json("Empty request, questions need filter");
    }else{
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: table,
        Item: {
            "galanMods":  "interview-module",
            "timestamp": Date.now(),
            "relData": {
                "dataType": "User",
                "dataSource": "User Access: interview-module",
                "interviewMod": 1,
            }
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
        next()
    }
})

router.get("/interview/:tags", function(req, res){
    var data = JSON.parse(req.params.tags);
    console.log(data);
    res.set(
        {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    );

    var tags = data.tags.split(",");
    console.log(tags);
    res.status(200);
    console.log("building request");
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: table,
        KeyConditionExpression: "galanMods = :moduleName",
        FilterExpression: "contains (relData.questionTags, :tag1) OR contains (relData.questionTags, :tag2) AND relData.dataType = :type",
        ExpressionAttributeValues: {
            ":moduleName": "interview-module",
            ":type": "Gen",
            ":tag1": "Behavioral",
            ":tag2": "Test",
        }
    };

    function getQuestions(d){
        var questionsList= {};
        d.forEach(element => {
            questionsList[element.relData.questionID] = element.relData.question;
        });
        return questionsList;
    }
    docClient.query(params, function(err, data) {
            if (err) {
                console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.send({
                    success: false,
                    message: 'Error: Server error',
                    error: JSON.stringify(err, null, 2),
                  });
            } else {
                console.log("Get Interview questions successful");
                res.send({
                    success: true,
                    message: "Get Interview questions successful",
                    data: JSON.stringify(getQuestions(data.Items))
                });
                //res.json(getQuestions(data.Items));
            }
    });
})

router.use("/interview/user/feedback", function(req, res, next){
    res.set(
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    );
    if (req.header('Module') != 'interview-module'){
        res.status(400);
        res.json('message: bad requests not made from Galan app');
    } else{
        next()
    }
        // res.json("Empty request, questions need filter");
})

router.post("/interview/user/feedback", function(req, res){
    var data  = req.body;
    console.log(data.data);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: table,
        Item: {
            "galanMods":  "interview-module",
            "timestamp": Date.now(),
            "relData": {
                "dataType": "User",
                "dataSource": "interview module feedback form",
                "formData": data.data,
            }
        }
    };

    console.log("Adding a new item: Feedback");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    
    res.status(200);
    res.json('<div class="modal-body"><div class="container" id="thankYouContainer"><div class="row"><i class="fa fa-check-circle fa-3x" style="color:chartreuse; text-align: center; width: 100%;"></i><h3 style="text-align: center; width: 100%;">Thank You</h3></div><div class="row"><h6 style="text-align: justify;">We appreciate the time you spent to give feedback. We thoroughly consider all inputs.</h6></div></div></div>');
});
// Question Suggestion

router.use("/interview/user/suggestion", function(req, res, next){
    res.set(
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    );
    if (req.header('Module') != 'interview-module'){
        res.status(400);
        res.json('message: bad requests not made from Galan app');
    } else{
        next()
    }
        // res.json("Empty request, questions need filter");
})

router.post("/interview/user/suggestion", function(req, res){
    var data  = req.body;
    console.log(data.data);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: table,
        Item: {
            "galanMods":  "interview-module",
            "timestamp": Date.now(),
            "relData": {
                "dataType": "User",
                "dataSource": "suggest a question form",
                "formData": data.data,
            }
        }
    };

    console.log("Adding a new item: Question");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    
    res.status(200);
    res.json('Question Suggestion Added: Thank You');
});

app.use('/galan-modules', router)

console.log(path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
