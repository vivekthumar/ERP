var express = require('express')
    q = require('q'),
    router = express.Router(),
    jobwork = require('../models/jobwork');
console.log("cTRL")
router.post('/addJobwork', function(req, res) {
	var data = req.body;
   jobwork.addJobwork(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateJobwork', function(req, res) {
    var jobworkId = req.body.jobworkID;
	var setData = req.body.data;
   jobwork.updateJobwork(jobworkId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteJobwork', function(req, res) {
	var jobworkId = req.body.jobworkID;
    jobwork.deleteJobwork(jobworkId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getJobworkData', function(req, res) {
	var data = req.body;
    console.log("GET jobwork jobwork")
   jobwork.getJobworkData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});



module.exports = router