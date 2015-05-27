var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify       = require('gulp-uglify'),
	jshint       = require('gulp-jshint'),
	header       = require('gulp-header'),
	rename       = require('gulp-rename'),
	minifyCSS    = require('gulp-minify-css'),
	jeet         = require('jeet'),
	gutil        = require('gulp-util'),
	sourcemaps   = require('gulp-sourcemaps'),
	package      = require('./package.json'),
	paths        = require('./paths.json'), // Project template should provide this
	concat       = require('gulp-concat'),
	livereload   = require('gulp-livereload');


var banner = [
	'/*!\n' +
	' * <%= package.name %>\n' +
	' * <%= package.title %>\n' +
	' * <%= package.url %>\n' +
	' * @author <%= package.author %>\n' +
	' * @version <%= package.version %>\n' +
	' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
	' */',
	'\n'
].join('');

gulp.task('css', function()
{
	gulp.src(paths.css.src)
		.pipe( sass() )
		.on('error', function(err)
		{
			gutil.log("Error: ", err.message);
			gutil.log("File: ", err.fileName);
			gutil.log("Line: ", err.lineNumber);
			gutil.beep();
		})
		.pipe(autoprefixer('last 4 version'))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(browserSync.reload({stream: true}))
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(header(banner, {package: package}))
		.pipe(gulp.dest(paths.css.dest))
		.pipe(livereload()) // Uncomment this if you want to use live reload
	;
});

gulp.task('js', function()
{
	gulp.src(paths.js.src)
		.pipe(concat('all.js'))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.reload({stream: true, once: true}))
		.pipe(uglify())
		.on('error', function(err)
		{
			gutil.log("Error: ", err.message);
			gutil.log("File: ", err.fileName);
			gutil.log("Line: ", err.lineNumber);
			gutil.beep();
		})
		.pipe(header(banner, {package: package}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.js.dest))
		.pipe(livereload()) // Uncomment this if you want to use live reload
	;
});

gulp.task('browser-sync', function()
{
	browserSync.init(null, {
		server: {
			baseDir: "app"
		},
		open: false
	});
});

gulp.task('bs-reload', function()
{
	browserSync.reload();
});

gulp.task('default', ['css', 'js'], function()
{
	//gulp.start('browser-sync');
	//gulp.watch("app/*.html", ['bs-reload']);

	gulp.watch(paths.css.watch, ['css']);
	gulp.watch(paths.js.watch, ['js']);
});
