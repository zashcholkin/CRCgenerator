var  express = require("express");
var app = express();
var getVHDLCode = require("./VHDL-generator");

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/libraries'));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.get("/generateVHDL", function(req, res){
    var extentsArr = [];
    for(var extent in req.query){
        if(req.query[extent] == "use"){
            extentsArr.push(parseInt(extent));
        }
    }
    res.send("<pre>" + getVHDLCode(extentsArr) + "</pre>");

});

app.listen(3000, function () {
    console.log("app listening");
});