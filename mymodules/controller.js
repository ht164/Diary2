/**
 * Controller
 */

var _ = require('underscore');
var DiaryModel = require('../mymodules/diarymodel').model;
var DiaryFuncs = require('../mymodules/diarymodel').funcs;
var Comment = require('../mymodules/commentmodel');
var MonthlyDiary = require('../mymodules/monthlydiarymodel');
var util = require('../mymodules/util');
var consts = require('../mymodules/consts');
var feed = require('../mymodules/feed');

function Controller() {
}

Controller.prototype = {
  /**
   * call when client requests "get".
   * 
   * @param req
   * @param res
   */
  get: function(req, res){
    var me = this;
    var onGetDiaryModels = function(models){
      var loadedComment = 0;
      var afterLoadingComments = function(){
        loadedComment++;
        if (loadedComment == models.length){
          // all diary models' comment loaded.
          // return json, so don't use view object.
          res.json(models);
        }
      };

      _.each(models, function(model){
        // delete unnecessary properties.
        delete model.createDate;
        delete model.contentMarkdown;
        // get comments and add property.
        me.getCommentModels({
          date: model.date
        }, function(comments){
          model.comments = comments;
          afterLoadingComments();
        }, function(err){
          afterLoadingComments();
        });
      });
    };

    me.getDiaryModels(me.createCondition(req.query), onGetDiaryModels);
  },

  /**
   * create condition object.
   *
   * @param query
   * @return condition object.
   */
  createCondition: function(query) {
    var cond = {};

    if (query.num && !isNaN(query.num)) {
      var num = parseInt(query.num, 10);
      if (num < consts.condMaxNum) {
        cond.num = num;
      }
    }
    cond.num = cond.num || consts.condDefaultNum;

    if (query.startDate) {
    	  var startDateStr = query.startDate;
    	  cond.startDate = new Date(startDateStr.substr(0, 4) + "-" + startDateStr.substr(4, 2) + "-" + startDateStr.substr(6, 2));
    }

    if (query.date) {
    	  var dateStr = query.date;
    	  var startYearStr, startMonthStr, startDateStr;
    	  var endYearStr, endMonthStr, endDateStr;

    	  // year
    	  startYearStr = endYearStr = dateStr.substr(0, 4);
    	  // month
    	  if (dateStr.length > 4) {
    	    startMonthStr = endMonthStr = dateStr.substr(4, 2);
    	  } else {
    	    startMonthStr = "12";
    	    endMonthStr = "01";
    	  }
    	  // date
    	  if (dateStr.length > 6) {
    	    startDateStr = endDateStr = dateStr.substr(6, 2);
    	  } else {
         startDateStr = util.getLastDayOfMonth(endYearStr, endMonthStr);
         endDateStr = "01";
    	  }

    	  cond.startDate = cond.startDate || new Date(startYearStr + "-" + startMonthStr + "-" + startDateStr);
    	  cond.endDate = new Date(endYearStr + "-" + endMonthStr + "-" + endDateStr);
    }

    return cond;
  },

  /**
   * get Diary model.
   *
   * @param cond condition.
   *   @param cond.startDate
   *   @param cond.endDate
   * @param callback callback function. function(Array<DiaryModel>)
   */
  getDiaryModels: function(cond, callback){
    	DiaryFuncs.createModels(cond, callback);
  },

  /**
   * get Comment model.
   * @param cond condition
   *   @param cond.date
   * @param callback
   * @param errCallback
   */
  getCommentModels: function(cond, callback, errCallback){
    Comment.createModels(cond, callback, errCallback);
  },

  /**
   * call when client requests "post".
   */
  post: function(req, res){
    // create diary model
    var diary = new DiaryModel();
    diary.title = req.param("title");
    diary.contentMarkdown = req.param("contents");
    diary.date = new Date(req.param("date"));

    // create callback
    var onSuccess = function(){
      // update monthly diary.
      MonthlyDiary.update(diary.date.getFullYear(), diary.date.getMonth() + 1);
      // created response
      res.status(201);
      res.send();
    };
    var onFailure = function(){
      // error response
      res.status(500);
      res.send();
    };

    // save it.
    diary.save(onSuccess, onFailure);
  },

  /**
   * call when client requests "/recent/diary".
   */
  getRecentDiaryList: function(req, res){
    var me = this;
    DiaryFuncs.getRecentDiaryList(function(diaryList){
      res.json(diaryList);
    });
  },

  /**
   * call when client requests "/get/dateonly/yyyy/mm".
   */
  getDiaryHavingDateList: function(req, res){
    var me = this;
    var ret = req.path.match(/\/([0-9]{4})($|\/([0-9]{2}))/);
    var year = ret[1];
    var month = ret[3];

    DiaryFuncs.getDiaryHavingDateList({
      year: year,
      month: month
    }, function(dateList) {
      res.json(dateList);
    });
  },

  /**
   * call when client requests RSS1.0
   */
  getRss10: function(req, res) {
    var me = this;
    // return RSS 2.0.
    me.getRss20(req, res);
  },

  /**
   * call when client request RSS2.0
   */
  getRss20: function(req, res) {
    var onSuccess = function(xml) {
      res.set("Content-type", "application/rss+xml");
      res.send(xml);
    };
    feed.getRss20(onSuccess);
  },

  /**
   * call when client request Atom
   */
  getAtom: function(req, res) {
    var onSuccess = function(xml) {
      res.set("Content-type", "application/atom+xml");
      res.send(xml);
    };
    feed.getAtom(onSuccess);
  },

  /**
   * call when client post comment.
   */
  postComment: function(req, res){
    // create comment model
    var comment = new Comment.CommentModel();
    comment.speaker = req.param("speaker");
    comment.comment = req.param("comment");
    comment.date = new Date(req.param("date"));

    // create callback
    var onSuccess = function(){
      // created response
      res.status(201);
      res.send();
    };
    var onFailure = function(){
      // error response
      res.status(500);
      res.send();
    };

    // save it.
    comment.save(onSuccess, onFailure);
  },

  /**
   * call when client request number of diary entries of each month.
   * if error occurred, response empty data.
   */
  getMonthlyDiary: function(req, res){
    var me = this;
    MonthlyDiary.getNumDiaryEntries(function(d){
      res.json(d);
    }, function(err){
      res.send([]);
    });
  }
};


module.exports = Controller;
