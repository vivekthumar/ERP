var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


activityCollection = "activity"

var user = function () {
};

// user.addActivity = function (data) {
//     var deffered = q.defer();
//     dbQuery.insertIntoDB(activityCollection, data).then(function (auser) {
//         deffered.resolve(auser);
//     }, function (error) {
//         deffered.reject(error);
//     });
//     return deffered.promise;
// };

// user.updateActivity = function (activityId, setData) {
//     var deffered = q.defer();
//     var keyOpt ={ "_id" : ObjectId(activityId) }
//     console.log("keyOpt  :: ", keyOpt)

//     dbQuery.updateIntoDB(activityCollection, keyOpt, setData).then(function (auser) {
//         deffered.resolve(auser);
//     }, function (error) {
//         deffered.reject(error);
//     });
//     return deffered.promise;
// };

user.deleteActivity = function (activityId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(activityId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(activityCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.getActivityData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(activityCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;