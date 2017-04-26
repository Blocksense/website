var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');
 
gulp.task('clean-js', function () {
	return del([
		'dist/js/*.js'
	]);
});
 
gulp.task('clean-css', function () {
	return del([
		'dist/css/*.css'
	]);
});
 
gulp.task('pack-js', ['clean-js'], function () {	
    return gulp.src(['src/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});
 
gulp.task('pack-css', ['clean-css'], function () {
    return gulp.src(['src/css/*.css'])
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(rev())
            .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
		gulp.watch('src/js/*.js', ['pack-js']);
		gulp.watch('src/css/*.css', ['pack-css']);
});
 
gulp.task('dev', ['watch']);


gulp.task('default', ['pack-js', 'pack-css']);