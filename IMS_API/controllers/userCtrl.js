var express = require('express')
    q = require('q'),
    router = express.Router(),
    user = require('../models/user');

router.post('/signin', function(req, res) {
	var data = req.body;
	console.log("signin controller call", req.body);

   user.signin(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

})

router.post('/register', function(req, res) {
	console.log("signin controller call");
	var data = req.body.data;
  user.register(data, function (cData) {
  	console.log("signin model response",cData);
  	res.send(cData)
  })
})

module.exports = router