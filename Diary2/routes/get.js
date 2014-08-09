var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* GET home page. */
router.get('/', function(req, res) {
  // send get request.
  var controller = new Controller();
  controller.get(req, res);
});

module.exports = router;