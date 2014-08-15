/**
 * DiaryModel
 */
var storage = require('../mymodules/storage');
var mongoose = require('mongoose');
var marked = require('marked');

function DiaryModel(){
  // properties.
  this.title = "",
  this.content = "",
  this.date = null,
  this.createDate = null
}

/**
 * Diary Model functions.
 */
DiaryModel.prototype = {
};

/**
 * other functions.
 */
var funcs = {
  /**
   * create DiaryModel array asynchronously.
   *
   * @param cond condition.
   *   @param cond.startDate
   *   @param cond.endDate
   * @param callback callback function. function(Array<DiaryModel>)
   */
  createModels: function(cond, callback){
    var me = this;
    var onGetModel = function(diaries) {
    	  var diaryModels = [];
    	  for (var i = 0; i < diaries.length; i++) {
    	  	diaryModels.push(me.createModel(diaries[i]));
    	  }
    	  callback(diaryModels);
    };

    me.getModelFromStorage(cond, onGetModel);
  },

  /**
   * get DiaryModels from storage asynchronously.
   *
   * @param cond condition
   * @param callback callback function. function(Array<DiaryMongooseModel>)
   */
  getModelFromStorage: function(cond, callback){
    var _mongoose = storage.getMongoose();
    // create criteria object.
    var condition = {};
    if (cond.startDate || cond.endDate) {
      var condition_date = {};
      if (cond.startDate) condition_date["$gte"] = cond.startDate;
      if (cond.endDate) condition_date["$lte"] = cond.endDate;
      condition.date = condition_date;
    }
    console.log(condition);
    DiaryMongooseModel.find(condition, function(err, diaries){
    	  if (err) {
    	  	return console.error(err);
    	  }
    	  callback(diaries);
    });
  },

  /**
   * create DiaryModel instance.
   *
   * @param diary DiaryMongooseModel instance.
   * @return DiaryModel
   */
  createModel: function(diary){
    var _diary = new DiaryModel();
    _diary.title = diary.title;
    _diary.date = diary.date;
    _diary.createDate = diary.createDate;
    _diary.content = diary.content;

    return _diary;
  }
  
};

/**
 * Mongoose Model
 */
var DiaryMongooseModel = mongoose.model("Diary", mongoose.Schema({
	title: String,
	content: String,
	contentMarkdown: String,
	date: Date,
	createDate: Date
}));

module.exports = {
  model: DiaryModel,
  funcs: funcs
};