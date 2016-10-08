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
    var numFiles = files.length * 2; // main and thumbnail.
    var numError = 0;

    for (var i = 0; i < files.length; i++) {
      // save file.
      var buf = files[i].buffer;
      // if image file.
      var bufs = me.resizeImage(buf);
      var ext = me.getExtension(files[i].originalname);
      var fname = me.createSha1(buf) + (ext !== '' ? '.' + ext : '');
      var t_fname = 'thumb_' + fname;

      var cb = function(err) {
        if (err) numError++;
        numFinished++;
        if (numFinished === numFiles) {
          if (numError === 0) {
            callback("/files/" + fname, "/files/" + t_fname);
          } else {
            errCallback();
          }
        }
      };

      fs.writeFile(consts.uploadFileStore + '/' + fname, bufs.data, cb);
      fs.writeFile(consts.uploadFileStore + '/' + t_fname, bufs.thumbnail, cb);
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
    var w, h, t_w, t_h;
    if (img_info.width < img_info.height) { 
      h = 1024;
      w = 1024 * (img_info.width / img_info.height);
      t_h = 96;
      t_w = 96 * (img_info.width / img_info.height);
    } else {
      w = 1024;
      h = 1024 * (img_info.height / img_info.width);
      t_w = 96;
      t_h = 96 * (img_info.height / img_info.width);
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

    return {
      data: imagemagick.convert({
        srcData: buffer,
        width: w,
        height: h,
        rotate: rotate,
        strip: true
      }),
      thumbnail: imagemagick.convert({
        srcData: buffer,
        width: t_w,
        height: t_h,
        rotate: rotate,
        strip: true
      })
    };
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
  },

  /**
   * get thumbnail list.
   * return value is an array of object(thumbnail url, and real object url).
   */
  getThumbnailList: function(callback, errCallback) {
    var ar = [];
    var cnt = 0;
    var maxCount = 100;
    // get files named with "thumb_".
    var dn = consts.uploadFileStore;
    var files = fs.readdirSync(dn);
    // filter "thumb_", and sort.
    files = files.filter(function(a) {
      return fs.statSync(dn + '/' + a).isFile() && !(/^thumb_.*/.test(a));
    }).sort(function(a, b) {
      return fs.statSync(dn + '/' + b).mtime.getTime() - 
             fs.statSync(dn + '/' + a).mtime.getTime();
    }).forEach(function(a) {
      if (cnt < maxCount) {
        ar.push({
          thumbnailUrl: consts.fileStoreSiteUri + '/files/thumb_' + a,
          url: consts.fileStoreSiteUri + '/files/' + a
        });
      cnt++;
      }
    });

    callback(ar);
  }
};

module.exports = FileStorage;
