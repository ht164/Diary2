/**
 * Controller
 */

var _ = require('underscore');
var DiaryModel = require('../mymodules/diarymodel').model;
var DiaryFuncs = require('../mymodules/diarymodel').funcs;
var util = require('../mymodules/util');

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
      // delete unnecessary properties.
      _.each(models, function(model){
        delete model.createDate;
        delete model.contentMarkdown;
      });
      // return json, so don't use view object.
    	  res.json(models);
    }
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

    if (query.startDate) {
    	  var startDateStr = query.startDate;
    	  cond.startDate = new Date(startDateStr.substr(0, 4) + "-" + startDateStr.substr(4, 2) + "-" + startDateStr.substr(6, 2));
    }

    if (query.date) {
    	  var dateStr = query.date;
    	  var startYearStr, startMonthStr, startDateStr;
    	  var endYearStr, endMonthStr, endDateStr;

    	  // year
    	  endYearStr = startYearStr = dateStr.substr(0, 4);
    	  // month
    	  if (dateStr.length > 4) {
    	    endMonthStr = startMonthStr = dateStr.substr(4, 2);
    	  } else {
    	    startMonthStr = "01";
    	    endMonthStr = "12";
    	  }
    	  // date
    	  if (dateStr.length > 6) {
    	    endDateStr = startDateStr = dateStr.substr(6, 2);
    	  } else {
    	    startDateStr = "01";
    	    endDateStr = util.getLastDayOfMonth(endYearStr, endMonthStr);
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
  }
};


module.exports = Controller;
