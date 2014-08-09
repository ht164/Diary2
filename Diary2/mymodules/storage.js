/**
 * Storage
 */

// use mongoDB(mongoose) as storage.
var mongoose = require('mongoose');
var host = "localhost";
var db = "diary2";

/**
 * functions.
 */
var funcs = {
  /**
   * get connected mongoose object.
   */
  getMongoose: function(){
    mongoose.connect("mongoosedb:" + host + "/" + db);
    return mongoose;
  }
};

module.exports = funcs;
