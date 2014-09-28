/**
 * CommentModel
 */
var storage = require('../mymodules/storage');
var consts = require('../mymodules/consts');
var util = require('../mymodules/util');
var Diary = require('../mymodules/diarymodel');
var mongoose = require('mongoose');
var _ = require('underscore');

function CommentModel(){
  // properties.
  // speaker must be less than 51.
  this.speaker = "",
  // comment must be less than 501.
  this.comment = "",
  this.date = null
  this.postDate = null;
}

/**
 * Comment Model functions.
 */
CommentModel.prototype = {
  /**
   * consts.
   */
  MAX_SPEAKER_LENGTH: 50,
  MAX_COMMENT_LENGTH: 500,

  /**
   * save to storage.
   * if validation is failed, error.
   */
  save: function(callback, errCallback) {
    var me = this;

    me._validation(function(){
      // validation is success.
      me.postDate = new Date();
      // save as new comment data.
      var comment = new CommentMongooseModel(me);
      comment.save(function(err){
        if (err) {
          errCallback();
        } else {
          callback();
        }
      });
    }, function(){
      // validation is failure.
      errCallback();
    });
 },

  /**
   * validation asynchronously.
   * if validation succeeds, call callback.
   * if validation fails, call errCallback.
   *
   * @param callback
   * @param errCallback
   */
  _validation: function(callback, errCallback) {
    var me = this;
    // is date invalid?
    if (isNaN(me.date.getTime())) {
      setTimeout(errCallback, 0);
      return;
    }
    // is speaker string length less than MAX_SPEAKER_LENGTH?
    if (me.speaker.length > me.MAX_SPEAKER_LENGTH) {
      setTimeout(errCallback, 0);
      return;
    }
    // is comment string empty or length less than MAX_COMMENT_LENGTH?
    if (me.comment.length == 0 || me.comment.length > me.MAX_COMMENT_LENGTH) {
      setTimeout(errCallback, 0);
      return;
    }
    // the last, does date diary entry exist?
    var diary = Diary.getModelFromStorage({
      date: me.date
    }, function(){
      // validation succeeded.
      callback();
    }, function(){
      // validation failed.
      errCallback();
    });
  }

};

/**
 * module functions.
 */
var funcs = {
  /**
   * create Comment models.
   */
  createModels: function(cond, callback, errCallback){
    var me = this;
    me.getModelFromStorage(cond, callback, errCallback);
  },
  
  /**
   * get CommentModels from storage asynchronously.
   *
   * @param cond condition
   * @param callback callback function. function(Array<DiaryMongooseModel>)
   * @param errCallback callback function if error occurred.
   */
  getModelFromStorage: function(cond, callback, errCallback){
    var _mongoose = storage.getMongoose();
    CommentMongooseModel
    .find(cond)
    .sort({ postDate: "asc" })
    .exec(function(err, comments){
      if(err) {
        if (errCallback) errCallback(err);
      } else {
        if (callback) callback(comments);
      }
    });
  },

  /**
   * get recent comment list asynchronously.
   *
   * @param callback call when getting diary list is success.
   * @param errCallback call when getting is failed.
   */
  getRecentCommentList: function(callback, errCallback) {
    // TODO:
  },

  /**
   * class
   */
  CommentModel: CommentModel
};

/**
 * Mongoose Model
 */
var CommentMongooseModel = mongoose.model("Comment", mongoose.Schema({
    speaker: String,
    comment: String,
    date: Date,
    postDate: Date
}));

module.exports = funcs;