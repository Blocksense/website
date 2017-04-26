var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync'], function(){
  gulp.watch('app/css/*.css', ['en_css']); 
  gulp.watch('app/js/*.js', ['en_js']);
  gulp.watch('app/*.html', ['en_html']);
  gulp.watch('app/fr/css/*.css', ['fr_css']); 
  gulp.watch('app/fr/js/*.js', ['fr_js']);
  gulp.watch('app/fr/*.html', ['fr_html']);
 })

