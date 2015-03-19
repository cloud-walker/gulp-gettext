through = require 'through2'
gutil   = require 'gulp-util'
gp      = require 'gettext-parser'

module.exports = ->
	stream = through.obj (file, enc, cb) ->
		parsedPo = gp.po.parse file.contents
		moBuffer = gp.mo.compile parsedPo

		file.contents = moBuffer
		file.path     = gutil.replaceExtension file.path, '.mo'

		this.push file

		cb()
