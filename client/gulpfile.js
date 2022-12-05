const gulp = require('gulp');
const less = require( 'gulp-less');
//const concat = require( 'gulp-concat');

gulp.task('less',function(){
	return gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(gulp.dest('src/styles'))
});

gulp.task('default',gulp.parallel('less'));