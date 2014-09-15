/**
 * create feed (RSS1.0, RSS2.0, Atom)
 */

var _ = require('underscore');
var RSS = require('rss');
var Atom = require('../mymodules/atom');
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
   * create Atom feed.
   */
  getAtom: function(callback, errCallback){
    var me = this;
    // get recent diaries.
    var onSuccess = function(diaries) {
        callback(me._generateAtom(diaries));
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
    return me._generateFeed("rss20", diaries);
  },

  /**
   * generate Atom xml.
   */
  _generateAtom: function(diaries) {
    var me = this;
    return me._generateFeed("atom", diaries);
  },

  /**
   * generate feed.
   */
  _generateFeed: function(kind, diaries){
    var me = this;
    var feed;
    var feedOptions = {
      title: consts.siteTitle,
      description: consts.siteSubTitle,
      feed_url: (kind == "atom") ? consts.feedUrlAtom : consts.feedUrlRss20,
      site_url: consts.siteUrlWithScheme,
      id: (kind == "atom") ? consts.feedUrlAtomFull : consts.feedUrlRss20,
      author: consts.siteAuthor
    };

    if (kind == "atom"){
      feed = new Atom(feedOptions);
    } else {
      feed = new RSS(feedOptions);
    }

    _.each(diaries, function(diary){
      feed.item({
        title: diary.title,
        description: diary.content,
        url: me._generateDiaryUri(diary),
        id: me._generateDiaryUri(diary),
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

