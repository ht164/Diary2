/**
 * Controller
 */

var DiaryModel = require('../mymodules/diarymodel').model;
var DiaryFuncs = require('../mymodules/diarymodel').funcs;

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
   * get Diary model.
   *
   * @param cond condition.
   *   @param cond.startDate
   *   @param cond.endDate
   * @param callback callback function. function(Array<DiaryModel>)
   */
  getDiaryModels: function(cond, callback){
  	var models = DiaryFuncs.createModels(cond);
  	callback(models);
  },
};


module.exports = Controller;
