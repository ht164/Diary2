var express = require('express');
var router = express.Router();
var consts = require('../mymodules/consts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: consts.siteTitle,
    siteIntroductionTitle: consts.siteIntroductionTitle,
    siteIntroduction: consts.siteIntroduction
  });
});

module.exports = router;
