var express = require('express')
  , router = express.Router()
  , dashboard = require('../models/dashboard')

router.post('/getClientCount', function(req, res) {
   dashboard.getClientCount().then(function (Rdata) {
   	console.log('Rdata  :: ', Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

module.exports = router