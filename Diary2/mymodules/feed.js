/**
 * create feed (RSS1.0, RSS2.0, Atom)
 */

var _ = require('underscore');
var RSS = require('rss');
var DiaryFuncs = require('../mymodules/diarymodel').funcs;
var consts = require('../mymodules/consts');

var Feed = {
  /**
   * create RSS2.0 feed.
   */
  getRss20: function(callback, errCallback){
    var me = this;
    // get recent diaries.
    var onSuccess = function(diaries) {
        callback(me._generateRss20(diaries));
    };
    var onFailure = function(err) {
        errCallback(err);
    };

    me._getRecentDiaries(onSuccess, onFailure);
  },

  /**
   * get recent diary data.
   */
  _getRecentDiaries: function(callback, errCallback) {
    var cond = {
      num: consts.feedItemNum
    };
    DiaryFuncs.createModels(cond, callback, errCallback);
  },

  /**
   * generate RSS2.0 xml.
   */
  _generateRss20: function(diaries) {
    var me = this;

    var feed = new RSS({
      title: consts.siteTitle,
      description: consts.siteSubTitle,
      feed_url: consts.feedUrlRss20,
      site_url: consts.siteUrlWithScheme,
      author: consts.siteAuthor
    });

    _.each(diaries, function(diary){
      feed.item({
        title: diary.title,
        description: diary.content,
        url: me._generateDiaryUri(diary),
        author: consts.siteAuthor,
        date: diary.date
      });
    });

    return feed.xml();
  },

  // TODO move to util module.
  /**
   * generate diary uri.
   */
  _generateDiaryUri: function(diary) {
    var year = diary.date.getFullYear();
    var month = diary.date.getMonth() + 1;
    month = (month < 10 ) ? "0" + month : month;
    var date = diary.date.getDate();
    date = (date < 10) ? "0" + date : date;

    return "/diary/" + year + "/" + month + "/" + date;
  }

};


module.exports = Feed;

