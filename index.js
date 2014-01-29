var fs = require('fs'),
    async = require('async'),
    readDirFiles = require('read-dir-files'),
    mime = require('mime');

module.exports = function(root, callback) {
  handleRoot(root, function(err, found){
    if (err) return callback(err);

    if (found.video.length===1) return callback(null, { type: 'video', files: found.video });
    if (found.audio.length > 1) return callback(null, { type: 'audio', files: found.audio });

    callback('could not determine type');
  })
}

function handleRoot(root, callback) {
  fs.stat(root, function(err, stats){
    if(err) return callback(err);
    if (stats.isDirectory()) return scan(root, callback);

    var mime_type = mime.lookup(root),
        type = module.exports.mimeToType(mime_type),
        found = {};
    found[type] = [{ path: root, mime: mime_type, size: stats.size }]

    callback(null, found);
  });
}



function scan(directory, callback) {
  var found = {
    video: [],
    music: []
  };

  readDirFiles.list(directory, {recursive: true, normalize: true }, function (err, filenames) {
      if (err) return callback(err);

      async.forEach(filenames, function(file, cb){
        var mime_type = mime.lookup(file),
            type = module.exports.mimeToType(mime_type),
            arr  = found[type];

        if (!arr) {
          arr = [];
          found[type] = arr;
        }

        fs.stat(file, function(err, stats){
          if(err) return cb(err);

          if (stats.isDirectory()) return cb();
          arr.push({path: file, mime: mime_type, size: stats.size})
          cb(err);
        });
      }, function(err){
        callback(null, found);
      })
  });
}


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};
module.exports.mimeToType = function(mime) {
  if (!mime) return null;
  var parts = mime.split('/');
  if (parts.length !== 2) return null;

  return parts[0];

}