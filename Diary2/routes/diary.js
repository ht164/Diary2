var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

var handler = function(req, res) {
  //.
  res.send("hoge");
};

/**
 * if url is /diary/yyyy/mm/dd, then respond diary data.
 * otherwise respond 404 errror.
 */
router.get(/[0-9]{4}/, handler);
router.get(/[0-9]{4}\/[0-9]{2}/, handler);
router.get(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/, handler);

module.exports = router;