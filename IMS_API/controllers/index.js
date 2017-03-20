var express = require('express')
  , router = express.Router()
  console.log("hiiiii")
router.use('/dashboard', require('./dashboardCtrl'));
router.use('/Vender', require('./venderCtrl'));
router.use('/client', require('./clientCtrl'));
router.use('/auth', require('./userCtrl'));

module.exports = router