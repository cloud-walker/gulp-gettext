import through from 'through2'
import {po, mo} from 'gettext-parser'
import gutil from 'gulp-util'

const PLUGIN_NAME = 'gulp-gettext'
const PluginError = gutil.PluginError

// I don't export the esnext way due to commonjs incompatibility.
module.exports = function () {
	return through.obj(function (file, enc, done) {
		if (file.isNull()) {
			return done(null, file)
		}

		if (file.isStream()) {
			return done(new PluginError(PLUGIN_NAME, 'Streaming not supported.'))
		}

		const parsed = po.parse(file.contents)
		const buffer = mo.compile(parsed)

		file.contents = buffer
		file.path = gutil.replaceExtension(file.path, '.mo')

		done(null, file)
	})
}
