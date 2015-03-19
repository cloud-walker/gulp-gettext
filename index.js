var gp, gutil, through;

through = require('through2');

gutil = require('gulp-util');

gp = require('gettext-parser');

module.exports = function() {
  var stream;
  return stream = through.obj(function(file, enc, cb) {
    var moBuffer, parsedPo;
    parsedPo = gp.po.parse(file.contents);
    moBuffer = gp.mo.compile(parsedPo);
    file.contents = moBuffer;
    file.path = gutil.replaceExtension(file.path, '.mo');
    this.push(file);
    return cb();
  });
};
