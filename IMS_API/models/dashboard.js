var dbQuery = require('../utils/dbQuery');
var ObjectId = require('mongodb').ObjectID;


clientCollection = "client"

var dashboard = function () {
};

dashboard.getClientCount = function () {
    var deffered = q.defer();
    dbQuery.getCollectionCount(clientCollection).then(function (auser) {
        deffered.resolve({'count':auser});
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = dashboard;