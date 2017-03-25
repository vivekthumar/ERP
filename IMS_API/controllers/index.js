var express = require('express')
  , router = express.Router()
  console.log("hiiiii")
router.use('/dashboard', require('./dashboardCtrl'));
router.use('/Vender', require('./venderCtrl'));
router.use('/client', require('./clientCtrl'));
router.use('/suppInventory', require('./suppInventoryCtrl'));
router.use('/jobwork', require('./jobworkCtrl'));
router.use('/material', require('./materialCtrl'));
router.use('/activity', require('./activityCtrl'));
router.use('/supplier', require('./supplierCtrl'));
router.use('/design', require('./designCtrl'));
router.use('/auth', require('./userCtrl'));

module.exports = router