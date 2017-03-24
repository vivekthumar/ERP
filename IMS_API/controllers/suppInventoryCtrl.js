var express = require('express')
    q = require('q'),
    router = express.Router(),
    suppInventory = require('../models/suppInventory');
console.log("cTRL")
router.post('/addSuppInventory', function(req, res) {
	var data = req.body;
   suppInventory.addSuppInventory(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateSuppInventory', function(req, res) {
    var suppInventoryId = req.body.suppInventoryID;
	var setData = req.body.data;
   suppInventory.updateSuppInventory(suppInventoryId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteSuppInventory', function(req, res) {
	var suppInventoryId = req.body.suppInventoryID;
    suppInventory.deleteSuppInventory(suppInventoryId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getSuppInventoryData', function(req, res) {
	var data = req.body;
    console.log("GET suppInventory suppInventory")
   suppInventory.getSuppInventoryData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router