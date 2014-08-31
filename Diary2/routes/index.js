var express = require('express');
var router = express.Router();
var consts = require('../mymodules/consts');

/**
 * handler
 */
var handler = function(req, res) {
  res.render('index', {
    title: consts.siteTitle,
    subTitle: consts.siteSubTitle,
    siteUrl: consts.siteUrl,
    siteIntroductionTitle: consts.siteIntroductionTitle,
    siteIntroduction: consts.siteIntroduction,
    recentEntryTitle: consts.recentEntryTitle,
    appVer: consts.appVer
  });
};

router.get('/', handler);
router.get(/diary\/[0-9]{4}/, handler);
router.get(/diary\/[0-9]{4}\/[0-9]{2}/, handler);
router.get(/diary\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/, handler);

module.exports = router;
