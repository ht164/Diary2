/**
 * File Storage
 */
var fs = require('fs');

/**
 * functions.
 */
var FileStorage = {
  /**
   * save file.
   */
  saveFiles: function(files, callback, errCallback) {
    var numFinished = 0;
    var numFiles = files.length;
    var numError = 0;

    for (var i = 0; i < files.length; i++) {
      // save file.
      fs.writeFile(i + '.dat', files[i].buffer, function(err) {
        if (err) numError++;
        numFinished++;
        if (numFinished === numFiles) {
          if (numError === 0) {
            callback();
          } else {
            errCallback();
          }
        }
      });
    }
  }
};

module.exports = FileStorage;
