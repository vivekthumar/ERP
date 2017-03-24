var express = require('express')
    q = require('q'),
    router = express.Router(),
    client = require('../models/client');
console.log("cTRL")
router.post('/addClient', function(req, res) {
    console.log("<<<<<<<<<<<<<<<<<<<<< :: this is controller :: >>>>>>>>>>>>>>>>>>>>>")
	var data = req.body;
   client.addClient(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateClient', function(req, res) {
    var clientId = req.body.clientID;
	var setData = req.body.data;
   client.updateClient(clientId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteClient', function(req, res) {
	var clientId = req.body.clientID;
    client.deleteClient(clientId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getClientData', function(req, res) {
	var data = req.body;
    console.log("GET client client")
   client.getClientData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router