import through from 'through2'
import {po, mo} from 'gettext-parser'
import gutil from 'gulp-util'

export default function () {
	return through.obj(function (file, enc, done) {
		const parsed = po.parse(file.contents)
		const buffer = mo.compile(parsed)

		file.contents = buffer
		file.path = gutil.replaceExtension(file.path, '.mo')

		done(null, file)
	})
}
