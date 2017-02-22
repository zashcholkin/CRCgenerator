var  express = require("express");
var app = express();

app.get("/", function (req, res) {
   //res.type("text/plain");
   res.sendFile(__dirname + "/index.html");
});

var extentArr = [];
app.get("/generateVHDL", function(req, res){
    var extentArr = [];
    for(var extent in req.query){
        if(req.query[extent] == "use"){
            extentArr.push(extent);
        }
    }

    res.send(`You need VHDL code for polinom size = ${req.query["polynom-size"]}
              and polynom extents ${extentArr}
             `);
});

app.listen(3000, function () {
    console.log("app listening");
});