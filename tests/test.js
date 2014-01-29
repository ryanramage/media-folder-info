var test = require('tape'),
    path = require('path'),
    info = require('../index'),
    fixturesDir = path.join(__dirname, 'assets');

test('a movie in a subdir', function(t){
  var folder = path.join(fixturesDir, 'movie1')
  info(folder, function(err, result){
    t.equal(result.type, 'video', 'correct type as video' );
    t.equal(result.files.length, 1, 'one found');
    t.end()
  });

})

test('path is a movie', function(t){
  var file = path.join(fixturesDir, 'movie.avi');
  info(file, function(err, result){
    t.equal(result.type, 'video', 'correct type as video' );
    t.equal(result.files.length, 1, 'one found');
    t.end()
  })
})

test('subdir is an album', function(t){
  var folder = path.join(fixturesDir, 'music1')
  info(folder, function(err, result){
    t.equal(result.type, 'audio', 'correct type as audio' );
    t.equal(result.files.length, 4, 'one found');
    t.end()
  });
})



test('mime to type', function(t){
  var type = info.mimeToType('video/x-msvideo');
  t.equal('video', type, 'correct mime type as video');
  t.end();
})