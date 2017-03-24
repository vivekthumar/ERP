var express = require('express')
    q = require('q'),
    router = express.Router(),
    material = require('../models/material');
console.log("cTRL")
router.post('/addMaterial', function(req, res) {
	var data = req.body;
   material.addMaterial(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateMaterial', function(req, res) {
    var materialId = req.body.materialID;
	var setData = req.body.data;
   material.updateMaterial(materialId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteMaterial', function(req, res) {
	var materialId = req.body.materialID;
    material.deleteMaterial(materialId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getMaterialData', function(req, res) {
	var data = req.body;
    console.log("GET material material")
   material.getMaterialData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router