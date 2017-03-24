var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


suppInventoryCollection = "suppInventory"

var user = function () {
};

user.addSuppInventory = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(suppInventoryCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.updateSuppInventory = function (suppInventoryId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(suppInventoryId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(suppInventoryCollection, keyOpt, setData).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteSuppInventory = function (suppInventoryId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(suppInventoryId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(suppInventoryCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.getSuppInventoryData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(suppInventoryCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;