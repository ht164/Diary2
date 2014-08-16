var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* POST diary entry. */
router.post('/', function(req, res) {
  // send POST request.
  var controller = new Controller();
  controller.post(req, res);
});

module.exports = router;