/**
 * DiaryModel
 */
var storage = require('../mymodules/storage');

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
   * create DiaryModel array.
   *
   * @param cond condition.
   *   @param cond.startDate
   *   @param cond.endDate
   * @return Array<DiaryModel>
   */
   createModels: function(cond){
  	// TODO:
  	// temporarily, use default DiaryModel.
  	var model = new DiaryModel();
  	model.date = new Date("2014-08-01");
  	model.createDate = new Date("2014-08-01 12:34:56");
  	var res = [
  	  model
  	];
  	return res;
  },

  /**
   * create DiaryModel instance.
   *
   * @param cond
   *   @param cond.date
   * @return DiaryModel
   */
  createModel: function(cond){
    
  }
  
};

/**
 * Mongoose Schema
 */
var DiarySchema = {
  title: String,
  content: String,
  date: Date,
  createDate: Date
};

module.exports = {
  model: DiaryModel,
  funcs: funcs,
  schema: DiarySchema
};