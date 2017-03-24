var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


designCollection = "design"
var activityCollection = "activity";

var user = function () {
};

user.addDesign = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(designCollection, data).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = designCollection;
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

user.updateDesign = function (designId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(designId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(designCollection, keyOpt, setData).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = designCollection;
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

user.deleteDesign = function (designId, user) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(designId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(designCollection, keyOpt).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = designCollection;
        actObj["activityUser"] = user;;
        actObj["activityLog"] = {'designId': designId, 'user':user};
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

user.getDesignData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(designCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;