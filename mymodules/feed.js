/**
 * create feed (RSS1.0, RSS2.0, Atom)
 */

var _ = require('underscore');
var RSS = require('rss');
var Atom = require('../mymodules/atom');
var Diary = require('../mymodules/diarymodel');
var consts = require('../mymodules/consts');
var util = require('../mymodules/util');

/**
 * consts.
 */
var FEED_SUMMARY_LENGTH = 100;

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
    Diary.createModels(cond, callback, errCallback);
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
      author: consts.siteAuthor
    };
    if (kind == "atom"){
      feedOptions.id = consts.feedIdScope + consts.feedUrlAtom;
      feedOptions.updated = new Date();
    }

    if (kind == "atom"){
      feed = new Atom(feedOptions);
    } else {
      feed = new RSS(feedOptions);
    }

    _.each(diaries, function(diary){
      feed.item({
        title: diary.title,
        description: diary.content,
        summary: me._generateSummary(diary.content),
        url: consts.siteUrlWithScheme + util.generateDiaryUrl(diary.date),
        id: consts.feedIdScope + util.generateDiaryUrl(diary.date),
        author: consts.siteAuthor,
        date: diary.createDate
      });
    });

    return feed.xml();
  },

  /**
   * generate summary from html content.
   *
   * remove all tag and trim by 100 characters.
   */
  _generateSummary: function(content) {
    var summary = content.replace(/<[^>]*>/g, "");
    if (summary.length > FEED_SUMMARY_LENGTH) {
      summary = summary.substr(0, FEED_SUMMARY_LENGTH) + "...";
    }
    return summary;
  }
};


module.exports = Feed;

