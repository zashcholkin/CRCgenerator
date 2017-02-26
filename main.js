var  express = require("express");
var fs = require("fs");
var app = express();
var getVHDLCode = require("./VHDL-generator");

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/libraries'));
app.use(express.static(__dirname + '/public'));

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

    var VHDLCodeCRC = getVHDLCode(extentsArr);

    fs.writeFile('./public/CRC.vhd', VHDLCodeCRC, function (err) {
        if(err){
            console.log("Write file error")
        }
        res.send("<pre>" + VHDLCodeCRC + "</pre>");
    });


});

app.listen(3000, function () {
    console.log("app listening");
});