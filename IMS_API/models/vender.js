// var db = require("../config/db.js");

// Create new comment in your database and return its id
exports.create = function(user, text, cb) {
  cb('12345')
}

// Get a particular comment
exports.get = function(cb) {
	console.log("comment model call");
  cb(null, {text: 'Response from vender'})
}

// Get all comments
exports.all = function(cb) {
  cb(null, [])
}

// Get all comments by a particular user
exports.allByUser = function(user, cb) {
  cb(null, [])
}