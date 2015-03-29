# gulp-gettext
Compile .po files into .mo

## Install
Install with [npm](https://www.npmjs.com/)

	npm i --save-dev gulp-gettext

## Quick example

```javascript
var gulp    = require('gulp');
var gettext = require('gulp-gettext');

gulp.task('gettext', function() {
	gulp.src('src/**/*.po')
		.pipe(gettext())
		.pipe(gulp.dest('dist'))
	;
});
```