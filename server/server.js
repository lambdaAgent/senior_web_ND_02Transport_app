var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
var router = express.Router();
var fs = require('fs');
var http = require('http');
var url = require('url');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../src')));

// view engine setup
app.set('views', path.join(__dirname, '../build'));
app.set('view engine', 'hbs');
var port = process.env.PORT || 8888;


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '#');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* GET home page. */

app.get("/", (req, res, next) => {
    res.render("index")
});
app.get('/getAllStationsFromServer', function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    var stations = require("./stations.js").getAllStation();
    res.json(stations);
});


app.get("/build", (req, res, next) => {
	res.send(html)
});

app.listen(port, function(){
	console.log("connected to port " + port)
})

module.exports = app;
