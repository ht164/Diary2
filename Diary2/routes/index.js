var express = require('express');
var router = express.Router();
var consts = require('../mymodules/consts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: consts.siteTitle,
    subTitle: consts.siteSubTitle,
    siteUrl: consts.siteUrl,
    siteIntroductionTitle: consts.siteIntroductionTitle,
    siteIntroduction: consts.siteIntroduction,
    recentEntryTitle: consts.recentEntryTitle,
    appVer: consts.appVer
  });
});

module.exports = router;
