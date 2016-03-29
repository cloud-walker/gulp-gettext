import gulp from 'gulp'
import gettext from './lib'

gulp.task('default', () =>
	gulp.src('test/fixtures/@(empty|normal).po')
		.pipe(gettext())
		.pipe(gulp.dest('test/expected'))
)
