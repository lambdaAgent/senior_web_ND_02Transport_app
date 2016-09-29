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
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'src')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/* GET home page. */

app.get("/", (req, res, next) => {
	console.log("asdfasfd")
	res.render("index.html")
});

app.get('/getAllStationsFromServer', function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    var stations = require("./STATIONS.js").getAllStation();
    res.json(stations);
});


app.get("/build", (req, res, next) => {
	res.send(html)
});

app.listen(8888, function(){
	console.log("connected to port 8888")
})

module.exports = app;
