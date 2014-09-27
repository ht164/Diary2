/**
 * Monthly Diary Model
 */
var storage = require('../mymodules/storage');
var consts = require('../mymodules/consts');
var util = require('../mymodules/util');
var DiaryFuncs = require('../mymodules/diarymodel').funcs;
var mongoose = require('mongoose');
var _ = require('underscore');

function MonthlyDiaryModel(){
  // properties.
  this.year = 0;
  this.month = 0;
  this.count = 0;
}

/**
 * Monthly Diary Model functions.
 */
MonthlyDiaryModel.prototype = {
};

/**
 * module functions.
 */
var funcs = {
  /**
   * get number of diary entries of each month.
   *
   * @param [cond] condition. optional.
   * @param callback callback function.
   * @param errCallback error callback.
   */
  getNumDiaryEntries: function(cond, callback, errCallback){
    var me = this;
    // cond is omitted?
    if (typeof cond == "function") {
      errCallback = callback;
      callback = cond;
    }
    errCallback = errCallback || function(){};
    callback = callback || function(){};

    var _mongoose = storage.getMongoose();
    MonthlyDiaryModel.find({}, function(err, monthlydiary){
      if (err) {
        errCallback(err);
      } else {
        callback(monthlydiary);
      }
    });
  }
};

/**
 * Mongoose Model
 */
var MonthlyDiaryModel = mongoose.model("MonthlyDiary", mongoose.Schema({
    year: Number,
    month: Number,
    count: Number
}));

module.exports = funcs;