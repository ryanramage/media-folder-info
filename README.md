media-folder-info
=================

This is mainly for when a file, or folder is created from a torrent download to determine what 'type' it is.

The currently the types are 'movie', 'audio'. More can be added.

usage
------

    var info = require('media-folder-info');
    info('/home/you/downloads/folder', function(err, data){
      if (err) return console.log(err);
      console.log(data.type); // 'video', 'audio',
      console.log(data.files); // the main file(s), eg '/home/you/downloads/folder/movie-1999.avi'
    })

see the tests folder for more info