const gulp = require('gulp');
const imagewebp = require('gulp-webp');
const optimage = require('gulp-image');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const {src, series, parallel, dest, watch}= require('gulp');

function copyHtml(){
return src('src/*.html').pipe(gulp.dest('dist'));
}
exports.copyHtml = copyHtml;
exports.default = copyHtml;

function cssTask() {
  return src('css/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(), cssnano()])) 
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}


function minhtml() {
  return src('src/*.html')
  .pipe(htmlmin({ collapseWhitespace: true}))
  .pipe(dest('dist'));
}

function watchTask() {
  watch(['src/*.css'], { interval: 1000 }, parallel(cssTask));
}


function optimizeimage() {
  return src('images/*.{jpg,png}')
  .pipe(optimage())
  .pipe(dest('dist/images'))
}

function webpImage() {
  return src('images/*.{jpg,png}')
  .pipe(imagewebp())
  .pipe(dest('dist/images'))
}

exports.cssTask = cssTask;
//  exports. =imgTask;
exports.copyHtml = copyHtml;
exports.default = series(
parallel(copyHtml, minhtml, cssTask, optimizeimage,
  webpImage),
  watchTask
);