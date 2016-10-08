var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* GET thumbnail file url list. */
router.get('/', function(req, res) {
  // send get request.
  var controller = new Controller();
  controller.getThumbnailList(req, res);
});

module.exports = router;
