var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


materialCollection = "material"

var user = function () {
};

user.addMaterial = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(materialCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.updateMaterial = function (materialId, setData) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(materialId) }
    console.log("keyOpt  :: ", keyOpt)

    dbQuery.updateIntoDB(materialCollection, keyOpt, setData).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteMaterial = function (materialId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(materialId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(materialCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.getMaterialData = function (data) {
    var deffered = q.defer();
    dbQuery.findIntoDB(materialCollection, data).then(function (auser) {
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;