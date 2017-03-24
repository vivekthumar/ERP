var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


var clientCollection = "client";
var activityCollection = "activity";

var user = function () {
};

user.addClient = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(clientCollection, data).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = clientCollection;
        actObj["activityUser"] = data.user;
        actObj["activityLog"] = data;
        actObj["activityTimestamp"] = new Date();
        actObj["activityStatus"] = "Add";
        dbQuery.insertIntoDB(activityCollection, actObj).then(function (Auser) {
            deffered.resolve(auser);
        });
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.updateClient = function (clientId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(clientId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(clientCollection, keyOpt, setData).then(function (auser) {
        // deffered.resolve(auser);
        var actObj = {};
        actObj["activityType"] = clientCollection;
        actObj["activityUser"] = setData.user;;
        actObj["activityLog"] = setData;
        actObj["activityStatus"] = "Update";
        actObj["activityTimestamp"] = new Date();
        dbQuery.insertIntoDB(activityCollection, actObj).then(function (Auser) {
            deffered.resolve(auser);
        });
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteClient = function (clientId, user) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(clientId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(clientCollection, keyOpt).then(function (auser) {
        // deffered.resolve(auser);
        var actObj = {};
        actObj["activityType"] = clientCollection;
        actObj["activityUser"] = user;;
        actObj["activityLog"] = {'clientId': clientId, 'user':user};
        actObj["activityStatus"] = "Delete";
        actObj["activityTimestamp"] = new Date();
        dbQuery.insertIntoDB(activityCollection, actObj).then(function (Auser) {
            deffered.resolve(auser);
        });
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.getClientData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(clientCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;