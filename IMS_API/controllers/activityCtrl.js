var express = require('express')
    q = require('q'),
    router = express.Router(),
    activity = require('../models/activity');
console.log("cTRL")

// router.post('/addActivity', function(req, res) {
// 	var data = req.body;
//    activity.addActivity(data).then(function (Rdata) {
//         res.send(Rdata)
//     }, function (error) {
//         res.send(error)
//     });
// });

// router.post('/updateActivity', function(req, res) {
//     var activityId = req.body.activityID;
// 	var setData = req.body.data;
//    activity.updateActivity(activityId, setData).then(function (Rdata) {
//         res.send(Rdata)
//     }, function (error) {
//         res.send(error)
//     });
// });

router.post('/deleteActivity', function(req, res) {
	var activityId = req.body.activityID;
    activity.deleteActivity(activityId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });
});

router.post('/getActivityData', function(req, res) {
	var data = req.body;
    console.log("GET activity activity")
   activity.getActivityData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });
});



module.exports = router