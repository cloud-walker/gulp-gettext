# gulp-gettext
> Compile .po files to .mo

## Usage
### Install
	npm i -S @cl0udw4lk3r/gulp-gettext

## Quick example
```javascript
import gulp    from 'gulp'
import gettext from 'gulp-gettext'

gulp.task('gettext', () => {
	gulp.src('src/**/*.po')
		.pipe(gettext())
		.pipe(gulp.dest('dist'))
})
```
