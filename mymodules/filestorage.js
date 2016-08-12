/**
 * File Storage
 */
var fs = require('fs');
var crypto = require('crypto');
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
      var ext = me.getExtension(files[i].originalname);
      var fname = me.createSha1(buf) + (ext !== '' ? '.' + ext : '');

      fs.writeFile(consts.uploadFileStore + '/' + fname, buf, function(err) {
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
    // get image info.
    var img_info = imagemagick.identify({
      srcData: buffer
    });
    // size.
    var w, h;
    if (img_info.width < img_info.height) { 
      h = 1024;
      w = 1024 * (img_info.width / img_info.height);
    } else {
      w = 1024;
      h = 1024 * (img_info.height / img_info.width);
    }
    // orientation.
    var rotate = 0;
    switch (img_info.exif.orientation) {
      case 1:
        rotate = 0;
        break;
      case 3:
        rotate = 180;
        break;
      case 6:
        rotate = 90;
        break;
      case 8:
        rotate = 270;
        break;
    }

    return imagemagick.convert({
      srcData: buffer,
      width: w,
      height: h,
      rotate: rotate,
      strip: true
    });
  },

  /**
   * create sha-1 hash.
   */
  createSha1: function(buffer) {
    var hash = crypto.createHash('sha1');
    hash.update(buffer);
    return hash.digest('hex');
  },

  /**
   * get file extension.
   */
  getExtension: function(filename) {
    var p = filename.lastIndexOf('.');
    if (p == -1) {
      return "";
    } else {
      return filename.substr(p + 1).toLowerCase();
    }
  }
};

module.exports = FileStorage;
