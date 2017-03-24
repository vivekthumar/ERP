var express = require('express')
    q = require('q'),
    router = express.Router(),
    supplier = require('../models/supplier');
console.log("cTRL")
router.post('/addSupplier', function(req, res) {
	var data = req.body;
   supplier.addSupplier(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateSupplier', function(req, res) {
    var supplierId = req.body.supplierID;
	var setData = req.body.data;
   supplier.updateSupplier(supplierId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteSupplier', function(req, res) {
	var supplierId = req.body.supplierID;
    var user = req.body.user;
    supplier.deleteSupplier(supplierId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getSupplierData', function(req, res) {
	var data = req.body;
    console.log("GET supplier supplier")
   supplier.getSupplierData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router