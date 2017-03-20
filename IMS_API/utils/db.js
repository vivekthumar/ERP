var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// ----------------------  LOCAL DB CONNECTIONS-----------------------------

// var server_ip = 'localhost',
//     server_db = 'IMS',
//     server_port = 27017;


// function openDB1(ip, port, callback){
//     var server = new Server(ip, port, {auto_reconnect: true });
//     db = new Db(server_db, server);
//     db.open(function(err, db) {
//         if(!err && db){
//             console.log("DB", db.databaseName, db.serverConfig.host, db.serverConfig.port);
//             callback(true);
//         }else{
//             console.log(err, db);
//             callback(false);
//         }
//     });
// };

// openDB1(server_ip, server_port, function(flag){
//     if(flag == false){
//         console.log("Cant mongodb connection with DB Farm");
//     }
// });





// ----------------------  LIVE DB CONNECTIONS-----------------------------


// var mUrl = "mongodb://admin:admin_1234@ds135680.mlab.com:35680/ims"

function openDB(ip, port, callback){
    var server = new Server(ip, port, {auto_reconnect: true });
    db = new Db('ims', server);
    db.open(function(err, db) {
        if(!err && db){            
            db.authenticate('admin', 'admin_1234', function(error, res) {
                if(!error){
                    console.log("DB", db.databaseName, db.serverConfig.host, db.serverConfig.port);
                    callback(true); 
                }else{
                    console.log(error, db);
                    callback(false);
                }                
            });            
        }else{
            console.log(err, db);
            callback(false);
        }
    });
};

openDB('ds135680.mlab.com', 35680, function(flag){
    if(flag == false){
        console.log("Cant mongodb connection with DB Farm");
    }
});