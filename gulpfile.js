var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  cssnano = require('gulp-cssnano'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
;

gulp.task('css-main', function () {
  return gulp.src('css/modulifier.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('js-main', function () {
  return gulp.src(['js/utils.js', 'js/templates.js', 'js/modulifier.js', 'js/help.js'])
    .pipe(concat('modulifier.min.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('build-css', ['css-main'], function () {
  return gulp.src(['modulifier.min.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('build-js', ['js-main'], function () {
  return gulp.src(['modulifier.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['build-css', 'build-js']);

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css-main']);
  gulp.watch('js/*.js', ['js-main']);
});

gulp.task('default', ['css-main', 'js-main']);
