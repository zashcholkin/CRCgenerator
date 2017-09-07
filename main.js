var  express = require("express");
var fs = require("fs");
var app = express();
var getVHDLCode = require("./server/VHDL-generator");

app.use("/public", express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/result"));
app.use(express.static(__dirname + "/static-VHDL"));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/client/index.html");
});

app.get("/generateVHDL", function(req, res){
    var extentsArr = [];
    for(var extent in req.query){
        if(req.query[extent] == "use"){
            extentsArr.push(parseInt(extent));
        }
    }

    var VHDLCodeCRC = getVHDLCode(extentsArr);
    var filename = `CRC${Date.now()}.vhd`;

    fs.writeFile(`./result/${filename}`, VHDLCodeCRC, function (err) {
        if(err){
            console.log("Write file error")
        }
        var sendObj = {
            vhdlCode: `<pre>${VHDLCodeCRC}</pre>`,
            vhdlFile: filename
        };
        res.send(sendObj);
    });

});

app.listen(3000, function () {
    console.log("app listening");
});