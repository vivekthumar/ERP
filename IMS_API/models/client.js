var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


clientCollection = "client"

var user = function () {
};

user.addClient = function (data) {
    var deffered = q.defer();
    dbQuery.insertIntoDB(clientCollection, data).then(function (auser) {
        deffered.resolve(auser);
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
        deffered.resolve(auser);
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

user.deleteClient = function (clientId) {
    var deffered = q.defer();
    var keyOpt ={ "_id" : ObjectId(clientId) }
    console.log("keyOpt  :: ", keyOpt)
    
    dbQuery.removeFromDB(clientCollection, keyOpt).then(function (auser) {
        deffered.resolve(auser);
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