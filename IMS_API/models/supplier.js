var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


supplierCollection = "supplier"

var user = function () {
};

user.addSupplier = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(supplierCollection, data).then(function (auser) {
        deffered.resolve(auser);
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
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteSupplier = function (supplierId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(supplierId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(supplierCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
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