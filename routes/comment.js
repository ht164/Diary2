var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* POST comment. */
router.post('/', function(req, res) {
  // send POST request.
  var controller = new Controller();
  controller.postComment(req, res);
});

module.exports = router;