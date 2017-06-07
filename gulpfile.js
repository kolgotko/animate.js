const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat-sourcemap');
const jsmin = require('gulp-jsmin');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build-js']);

gulp.task('build-js', () => {

    gulp.src('./src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(jsmin())
        .pipe(concat('animate.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./public/'));

});
