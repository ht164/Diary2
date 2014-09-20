var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* get recent diary list */
router.get('/diary', function(req, res) {
  // send get request.
  var controller = new Controller();
  controller.getRecentDiaryList(req, res);
});

module.exports = router;