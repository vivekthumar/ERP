var express = require('express')
  , router = express.Router()
  , vender = require('../models/vender')

router.post('/venderList', function(req, res) {
	console.log("vender controller call");
  vender.get(function (err, cData) {
  	console.log("vender model response",cData);
  	res.send(cData)
  })
})

module.exports = router