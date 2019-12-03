const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const path = require('path')
const cors = require('cors')

var AWS = require("aws-sdk");
var router = express.Router();

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/reference.html')))


router.use("/interview/:tags", function(req, res, next){
    if(req.params.tags.json() == '{}'){
        res.json("Empty request, questions need filter");
    }else{
        next()
    }
})

router.get("/interview/:tags", function(req, res){
    
})

app.use('/galan-modules', router)

console.log(path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))