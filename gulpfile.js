var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
 
gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

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
        .pipe(uncss({
            html: 
                ['src/index.html'],
            ignore: [
                    /\w\.in/,
                    ".fade",
                    ".collapse",
                    ".collapsing",
                    /(#|\.)navbar(\-[a-zA-Z]+)?/,
                    /(#|\.)dropdown(\-[a-zA-Z]+)?/,
                    /(#|\.)(open)/,
                    ".modal",
                    ".modal.fade.in",
                    ".modal-dialog",
                    ".modal-document",
                    ".modal-scrollbar-measure",
                    ".modal-backdrop.fade",
                    ".modal-backdrop.in",
                    ".modal.fade.modal-dialog",
                    ".modal.in.modal-dialog",
                    ".modal-open",
                    ".in",
                    ".modal-backdrop"
                    ]
        }))
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(rev())
            .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('watch', ['browserSync'], function () {
		gulp.watch('src/js/*.js', ['pack-js']);
		gulp.watch('src/css/*.css', ['pack-css']);
        gulp.watch('src/*.html');
        gulp.watch('src/fr/js/*.js');
        gulp.watch('src/fr/css/*.css');
});
 
gulp.task('dev', ['watch']);


gulp.task('default', ['pack-js', 'pack-css']);