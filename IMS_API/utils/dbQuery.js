require( './db' ); //connection for mongodb

var util = require('util');
var _ = require('lodash');
var q = require('q');
var uuid = require('node-uuid');

function insertIntoDB(Collection, option){
    var deffered = q.defer();
    console.log("TEST ::: ", Collection,  option)
    db.collection(Collection, {safe: true}, function(err, collection){
        if(err){
            console.log(err);
            deffered.reject(err);
        }else{
            collection.insert(option, {safe:true, multi:true}, function(err, result) {
                if(err || !result){
                    console.log(err);
                    deffered.reject(err);
                }else{
                    console.log('Result :', result);
                    deffered.resolve(true);
                }
            });
        }
    });
    return deffered.promise;
};

var updateIntoDB = function(Collection, opt, setOpt){
    var deffered = q.defer();
    console.log("UPDATE  :: ", opt, setOpt)
    db.collection(Collection, function(err, collection){
            if(err){
                    console.log(err);
            }else{              
                collection.update(opt,{$set:setOpt}, function(err, DOC){                        
                    if(err){                            
                        deffered.reject(err);                          
                    }else{                                          
                        deffered.resolve(true);
                    }
                });
            }
    });
    return deffered.promise;
};

var findIntoDB = function(Collection,option){
    console.log('collection  :: ', Collection, option)
    var deffered = q.defer();
    db.collection(Collection, {safe:true}, function(err, collection) {
        if(err){
            console.log("Find DB Collection Error:", err);
            deffered.reject(err);
        }else{
            collection.find(option).toArray(function(err, results){
                console.log("err, results  :: ", err, results)
                if(err || !results){
                    console.log("Find Query Error:", err);
                    deffered.reject(err);
                }else{
                    if (results) {
                        deffered.resolve(results);
                    }else{
                        deffered.reject([]);
                    }
                }
            });
        }
    });
    return deffered.promise;
};

function removeFromDB(Collection,opt){
    var deffered = q.defer();
    db.collection(Collection, {safe: true}, function(err, collection){
        collection.remove(opt,function(err, result){
            if(err){
                deffered.reject(err);
            }else{
                deffered.resolve(true);
            }
        });
    });
    return deffered.promise;
};

function getCollectionCount(Collection){
    var deffered = q.defer();
    db.collection(Collection, {safe: true}, function(err, collection){
        deffered.resolve(collection.find().count());
    });
    return deffered.promise;
};

module.exports = {
    insertIntoDB : insertIntoDB,
    findIntoDB : findIntoDB,
    removeFromDB : removeFromDB,
    getCollectionCount : getCollectionCount,
    updateIntoDB : updateIntoDB
};