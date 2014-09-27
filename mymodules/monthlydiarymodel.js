/**
 * Monthly Diary Model
 */
var storage = require('../mymodules/storage');
var consts = require('../mymodules/consts');
var util = require('../mymodules/util');
var DiaryFuncs = require('../mymodules/diarymodel').funcs;
var mongoose = require('mongoose');
var _ = require('underscore');

function MonthlyDiaryModel(_initialData){
  // properties.
  this.year = 0;
  this.month = 0;
  this.count = 0;

  function _constructor(_initialData) {
    var me = this;
    _initialData = _initialData || {};

    me.year = _initialData.year || 0;
    me.month = _initialData.month || 0;
    me.count = _initialData.count || 0;
  }

  _constructor(_initialData);
}

/**
 * Monthly Diary Model functions.
 */
MonthlyDiaryModel.prototype = {
  /**
   * save my properties to storage.
   *
   * @param callback callback function if success.
   * @param errCallback callback function if failed.
   */
  save: function(callback, errCallback) {
    var me = this;
    callback = callback || function(){};
    errCallback = errCallback || function(){};

    // find entry that have same year and month.
    // if diary entry doesn't exist, create new.
    MonthlyDiaryMongooseModel.findOneAndUpdate({
      year: me.year,
      month: me.month
    }, me, { upsert: true }, function(err) {
      if (err) {
        errCallback();
      } else {
        callback();
      }
    });
  }
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
    MonthlyDiaryMongooseModel.find({}, function(err, monthlydiaries){
      if (err) {
        errCallback(err);
      } else {
        var ret = [];
        _.each(monthlydiaries, function(monthlydiary){
          ret.push(new MonthlyDiaryModel(monthlydiary));
        });
        callback(ret);
      }
    });
  },

  /**
   * update count data using diary entry data in mongodb asynchronously.
   *
   * @param year
   * @param month
   */
  update: function(year, month){
    // function when getting diary entries is success.
    var onGetDiaryEntries = function(diaries){
      var newCount = diaries.length;
      var monthlydiary = new MonthlyDiaryModel({
        year: year,
        month: month,
        count: newCount
      });
      monthlydiary.save();
    };

    // TODO: generating condition has to be moved to util function.
    var strYear = "" + year;
    var strMonth = "" + month;
    var cond = {
      startDate: new Date(strYear + "-" + strMonth + "-" + util.getLastDayOfMonth(strYear, strMonth)),
      endDate: new Date(strYear + "-" + strMonth + "-01")
    };
    DiaryFuncs.createModels(cond, onGetDiaryEntries);
  }
};

/**
 * Mongoose Model
 */
var MonthlyDiaryMongooseModel = mongoose.model("MonthlyDiary", mongoose.Schema({
    year: Number,
    month: Number,
    count: Number
}));

module.exports = funcs;