var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* GET home page. */
router.get('/', function(req, res) {
  // send get request.
  var controller = new Controller();
  controller.get(req, res);
});

var handlerDateOnly = function(req, res) {
    var controller = new Controller();
    controller.getDiaryHavingDateList(req, res);
}

router.get(/dateonly\/[0-9]{4}/, handlerDateOnly);
router.get(/dateonly\/[0-9]{4}\/[0-9]{2}/, handlerDateOnly);

module.exports = router;