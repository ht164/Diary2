var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* GET number of diary entries of each month. */
router.get('/', function(req, res) {
  // send get request.
  var controller = new Controller();
  controller.getMonthlyDiary(req, res);
});

module.exports = router;