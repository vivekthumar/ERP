    GLOBAL.approot = __dirname; 
var path = require('path'); 
GLOBAL.parentRoot = path.join(__dirname, '../'); //for code

var express = require('express'), 
	app = express(),
	bodyParser = require('body-parser'),
  	config = require('./config/config.js');


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var server = app.listen(config.port, function () {
    console.log('Listening on port %d', server.address().port); 
});
