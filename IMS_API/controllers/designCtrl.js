var express = require('express')
    q = require('q'),
    router = express.Router(),
    design = require('../models/design');
console.log("cTRL")
router.post('/addDesign', function(req, res) {
	var data = req.body;
   design.addDesign(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateDesign', function(req, res) {
    var designId = req.body.designID;
	var setData = req.body.data;
   design.updateDesign(designId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteDesign', function(req, res) {
	var designId = req.body.designID;
    design.deleteDesign(designId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getDesignData', function(req, res) {
	var data = req.body;
    console.log("GET design design")
   design.getDesignData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router