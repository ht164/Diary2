/**
 * Storage
 */

// use mongoDB(mongoose) as storage.
var mongoose = require('mongoose');
var host = "localhost";
var db = "diary2";

// mongoose is opened?
var isOpened = false;

/**
 * functions.
 */
var funcs = {
  /**
   * get connected mongoose object.
   */
  getMongoose: function(){
    if (!isOpened) {
      mongoose.connect("mongodb://" + host + "/" + db);
      isOpened = true;
    }
    return mongoose;
  }
};

module.exports = funcs;
