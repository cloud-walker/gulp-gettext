gulp   = require 'gulp'
coffee = require 'gulp-coffee'

gulp.task 'compile', ->
	gulp.src 'src/index.coffee'
		.pipe coffee(bare: true)
		.pipe gulp.dest('')

gulp.task 'default', ['compile'], ->
	gulp.watch 'src/index.coffee', ['compile']
