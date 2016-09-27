var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var request = require("request")
var unzip = require("unzip")
var router = express.Router();
	
var request = require('request');
var fs = require('fs');
var AdmZip = require('adm-zip');
var http = require('http');
var url = require('url');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* GET home page. */

router.get('/', function(req, response, next) {
	var file_url = "http://www.caltrain.com/Assets/GTFS/caltrain/Caltrain-GTFS.zip"


	var options = {
	    host: url.parse(file_url).host,
	    port: 80,
	    path: url.parse(file_url).pathname
	};

http.get(options, function(res) {
    var data = [], dataLen = 0; 

    res.on('data', function(chunk) {

            data.push(chunk);
            dataLen += chunk.length;

        }).on('end', function() {
            var buf = new Buffer(dataLen);

            for (var i=0, len = data.length, pos = 0; i < len; i++) { 
                data[i].copy(buf, pos); 
                pos += data[i].length; 
            } 

            var zip = new AdmZip(buf);
            var zipEntries = zip.getEntries();
            console.log(zipEntries.length)
            console.log(zip)
            for (var i = 0; i < zipEntries.length; i++)
                console.log(zip.readAsText(zipEntries[i])); 
        });
});
   
});
app.use('/', router);


app.listen(8888, function(){
	console.log("connected to port 8888")
})

module.exports = app;
