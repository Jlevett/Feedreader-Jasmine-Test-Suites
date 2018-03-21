/* eslint-disable */
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

//Live editing intialization
gulp.task('browserSync', function() {
	browserSync.init({
		server: './'//Base directory for css, jss folder and index.html
	})
})

//Lint the js files
gulp.task('lint', function () {
		return gulp.src('./jasmine/spec/feedreader.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('default', ['browserSync'], function(){
	gulp.watch('js/**/*.js', ['lint']);//js files
	gulp.watch('./jasmine/spec/feedreader.js', ['lint']);//feedreader.js
	gulp.watch('js/**/*.js').on('change', browserSync.reload);//js files
	gulp.watch('./jasmine/spec/feedreader.js').on('change', browserSync.reload);//feedreader.js
})