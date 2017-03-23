var dbQuery = require('../utils/dbQuery');

userCollection = "user"

var user = function () {
};

user.signin = function (data) {
    var deffered = q.defer();
    console.log("HHHHHH   :: ",data)
    
    var query = {'email': data.email}
    dbQuery.findIntoDB(userCollection, query).then(function (auser) {
        console.log("-------",auser)
        auser = auser[0]

        console.log("auser   :: ",auser)

        if(data.password == auser.password){
        	deffered.resolve(auser);
        }else{
        	deffered.reject("wrong password...");	
        }


        // auser.updatedDate = moment().utc().format();
        // auser.updatedBy = key;
        // auser.lastLoginDate = moment().utc().format();
        // if (_.isUndefined(auser.sessionId) || !_.isArray(auser.sessionId)) {
        //     auser.sessionId = [];
        // }
        // auser.sessionId.push(sessionId);
        // auser.ip = ip;
        // logger.info(util.format('User %s logged in from %s', email, ip));
        // console.log("auserauserauserauserauserauser   >>> ", auser)

        // var UpQuery = {'email': email}

        // dbQuery.updateIntoDB(userCollection, UpQuery, auser).then(function (status) {
        //     console.log("status : ", status)
        //     // user.addHistory(email, history).then(function () {
        //         deffered.resolve(status);
        //     // }, function (error) {
        //     //     deffered.reject(error);
        //     // });
        // }, function (error) {
        //     deffered.reject(error);
        // });
    }, function (error) {
        deffered.reject(error);
    });
    return deffered.promise;
};

module.exports = user;