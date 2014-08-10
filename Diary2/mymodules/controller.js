/**
 * Controller
 */

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
      // return json, so don't use view object.
    	  res.json(models);
    }
    me.getDiaryModels({}, onGetDiaryModels);
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
    	  if (dateStr > 4) {
    	    endMonthStr = startMonthStr = dateStr.substr(4, 2);
    	  } else {
    	    endMonthStr = "12";
    	  }
    	  // date
    	  if (dateStr > 6) {
    	    endDateStr = startDateStr = dateStr.substr(6, 2);
    	  } else {
    	    endDateStr = util.getLastDayOfMonth(endYearStr, endMonthStr);
    	  }

    	  cond.startDate = cond.startDate || new Date(startYearStr + "-" + startMonthStr + "-" + startDateStr);
    	  cond.endDate = new Date(endYearStr + "-" + endMonthStr + "-" + endDateStr);
    }
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
};


module.exports = Controller;
