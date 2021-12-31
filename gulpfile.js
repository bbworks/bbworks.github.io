'use strict';

//Import modules
const path = require('path');

const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const clean = require('gulp-clean');


//Initialize variables
const publicDirectory = path.resolve("public/");
const publicCssDirectory = path.join(publicDirectory, "css/");
const publicCssFiles = path.join(publicCssDirectory, "**/*.css");
const concatenatedCssFile = path.join(publicCssDirectory, "all.css");

const sassDirectory = path.resolve("src/static/scss/");
const sassViewsDirectory = path.resolve("src/views/");
const sassStaticDirectory = path.resolve("src/static/scss/");
const concatenatedSassFile = path.join(sassDirectory, "all.scss");


//Create private functions

//Export "clean-css" task to wipe the concatenated stylesheet,
// if exists (and fail silently if not)
gulp.task('clean-css', ()=>{
  return gulp.src(concatenatedCssFile, {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

gulp.task('clean-concatenated-sass', ()=>{
  return gulp.src(concatenatedSassFile, {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});


//Create public functions

//Export "concatenate-css" task that will first
// clear the concatenated stylesheet, if exists,
// then re-concatenate it
gulp.task('concatenate-css',
  gulp.series('clean-css', ()=>{
    return gulp.src(publicCssFiles)
      .pipe(concatCss(concatenatedCssFile))
      .pipe(gulp.dest(publicCssDirectory));
  })
);

gulp.task('concatenate-sass',
  gulp.series('clean-concatenated-sass', ()=>{
    return gulp.src([
        //Concatenate the Sass files in a specific order:
        path.join(sassStaticDirectory, "_variables.scss"),
        path.join(sassStaticDirectory, "_mixins.scss"),
        path.join(sassStaticDirectory, "_breakpoints.scss"),
        path.join(sassStaticDirectory, "_reset.scss"),
        path.join(sassStaticDirectory, "_utilities.scss"),
        path.join(sassStaticDirectory, "main.scss"),
        // and everything else
        path.join(sassStaticDirectory, "/**/*.scss"),
        path.join(sassViewsDirectory, "/**/*.scss"),
      ])
      .pipe(concat(concatenatedSassFile))
      .pipe(gulp.dest(sassDirectory));
  })
);
