/**
 * CommentModel
 */
var storage = require('../mymodules/storage');
var consts = require('../mymodules/consts');
var util = require('../mymodules/util');
var mongoose = require('mongoose');
var _ = require('underscore');

function CommentModel(){
  // properties.
  this.speaker = "",
  this.comment = "",
  this.date = null
  this.postDate = null;
}

/**
 * Comment Model functions.
 */
CommentModel.prototype = {
  /**
   * save to storage.
   */
  save: function(callback, errCallback) {
    var me = this;

    me.postDate = new Date();
    // save as new comment data.
    var comment = new CommentMongooseModel(me);
    console.log(comment);
    comment.save(function(err){
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