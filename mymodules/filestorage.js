/**
 * File Storage
 */
var fs = require('fs');
var consts = require('../mymodules/consts');
var imagemagick = require('imagemagick-native');

/**
 * functions.
 */
var FileStorage = {
  /**
   * save file.
   */
  saveFiles: function(files, callback, errCallback) {
    var me = this;
    var numFinished = 0;
    var numFiles = files.length;
    var numError = 0;

    for (var i = 0; i < files.length; i++) {
      // save file.
      var buf = files[i].buffer;
      // if image file.
      buf = me.resizeImage(buf);
      fs.writeFile(consts.uploadFileStore + '/' + i + '.dat', buf, function(err) {
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
  },

  /**
   * resize image.
   */
  resizeImage: function(buffer) {
    return imagemagick.convert({
      srcData: buffer,
      width: 1024,
      height: 768
    });
  }
};

module.exports = FileStorage;
