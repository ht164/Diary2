var express = require('express');
var router = express.Router();
var consts = require('../mymodules/consts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: consts.siteTitle });
});

module.exports = router;
