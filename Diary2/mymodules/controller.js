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
    var models = me.getDiaryModels();

    // return json, so don't use view object.
    res.json(models);
  },

  /**
   * get Diary model.
   *
   * @param cond condition.
   *   @param cond.startDate
   *   @param cond.endDate
   * @return Array<DiaryModel>
   */
  getDiaryModels: function(cond){
  	var models = DiaryFuncs.createModels(cond);
  	return models;
  },
};


module.exports = Controller;
