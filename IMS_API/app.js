    GLOBAL.approot = __dirname; 
var path = require('path'); 
GLOBAL.parentRoot = path.join(__dirname, '../'); //for code

var express = require('express'), 
	app = express(),
	bodyParser = require('body-parser');
  	// config = require('./config/config.js');
var middlewares = require('./middlewares/index');

app.set('trust proxy', true);
console.log("T!")
middlewares(app, express, __dirname);
console.log("T2")


// app.use(express.static(__dirname + '/public'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))
console.log("T3")
// app.all('/*', function (req, res, next) {

// 	 var responseSettings = {
//         "AccessControlAllowOrigin": req.headers.origin,
//         "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
//         "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
//         "AccessControlAllowCredentials": true
//     };

//     /**
//      * Headers
//      */
//     res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
//     res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
//     res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
//     res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

//     if ('OPTIONS' == req.method) {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// 	// console.log("hiiiii")
//  //    res.header("Access-Control-Allow-Origin", "*");
//  //    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  //    next();
// });

var server = app.listen(4000, function () {
    console.log('Listening on port %d', server.address().port); 
});
