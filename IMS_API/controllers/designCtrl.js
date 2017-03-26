var express = require('express')
    q = require('q'),
    router = express.Router(),
    design = require('../models/design');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


router.post('/addDesign', function(req, res) {
	var data = req.body;
   design.addDesign(data).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/updateDesign', function(req, res) {
    var designId = req.body.designID;
	var setData = req.body.data;
   design.updateDesign(designId, setData).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/deleteDesign', function(req, res) {
	var designId = req.body.designID;
    var user = req.body.user;
    design.deleteDesign(designId).then(function (Rdata) {
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/getDesignData', function(req, res) {
	var data = req.body;
    console.log("GET design design")
   design.getDesignData(data).then(function (Rdata) {
    console.log("Rdata  ::", Rdata)
        res.send(Rdata)
    }, function (error) {
        res.send(error)
    });

});

router.post('/upload', function(req, res) {
    console.log("call img")
   var form = new formidable.IncomingForm();
console.log('form  >> ', form)
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(parentRoot+'\/IMS_ADMIN\/src\/assets\/', 'uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    // console.log("file.path >>>>> ",path)
    // console.log("form.uploadDir >>>>> ",form.uploadDir)
    // console.log("file.name >>>>> ",file.name)
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);

  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

module.exports = router