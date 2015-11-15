var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function(){
  gulp.src(['src/*.js', 'src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', function(){
  gulp.watch('./src/*.js', ['babel']);
});

gulp.task('default',['babel', 'watch']);