var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


supplierCollection = "supplier"
var activityCollection = "activity";

var user = function () {
};

user.addSupplier = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(supplierCollection, data).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = supplierCollection;
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

user.updateSupplier = function (supplierId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(supplierId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(supplierCollection, keyOpt, setData).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = supplierCollection;
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

user.deleteSupplier = function (supplierId, user) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(supplierId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(supplierCollection, keyOpt).then(function (auser) {
        var actObj = {};
        actObj["activityType"] = supplierCollection;
        actObj["activityUser"] = user;;
        actObj["activityLog"] = {'supplierId': supplierId, 'user':user};
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

user.getSupplierData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(supplierCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;