var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


jobworkCollection = "jobwork"

var user = function () {
};

user.addJobwork = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(jobworkCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.updateJobwork = function (jobworkId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(jobworkId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(jobworkCollection, keyOpt, setData).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteJobwork = function (jobworkId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(jobworkId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(jobworkCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.getJobworkData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(jobworkCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;