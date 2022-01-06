'use strict';

//Import modules
const path = require('path');

const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');


//Initialize variables
const publicDirectory = path.resolve("public/");
const publicCssDirectory = path.join(publicDirectory, "css/");
const publicCssFiles = path.join(publicCssDirectory, "**/*.css");
const concatenatedCssFile = path.join(publicCssDirectory, "all.css");
const concatenatedMinifiedCssFile = path.join(publicCssDirectory, "all.min.css");

const sassDirectory = path.resolve("src/static/scss/");
const sassViewsDirectory = path.resolve("src/views/");
const sassStaticDirectory = path.resolve("src/static/scss/");
const concatenatedSassFile = path.join(sassDirectory, "all.scss");


//Create private functions

//Task to wipe the concatenated stylesheet, if exists (and fail silently if not)
gulp.task('clean-css', ()=>{
  return gulp.src(concatenatedCssFile, {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

gulp.task('concatenate-css', ()=>{
  return gulp.src(publicCssFiles)
    .pipe(concatCss(concatenatedCssFile))
    .pipe(gulp.dest(publicCssDirectory));
});


gulp.task('clean-concatenated-sass', ()=>{
  return gulp.src(concatenatedSassFile, {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});


//Create public functions

//Task that will first clear the concatenated stylesheet,
// if exists, then re-concatenate it
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

gulp.task('minify-css', ()=>{
  return gulp.src(concatenatedCssFile)
    .pipe(minify({debug: true}, (details) => {
      const convertBytesToStringWithUnit = (bytes)=>{
        if(Number.isNaN(Number(bytes))) return null;

        //Initialize the possible units and the default unit
        const units = {
          KB: 1024,
          MB: 1024**2,
          GB: 1024**3,
          TB: 1024**4,
        };

        const defaultUnit = "KB";

        //Starting from largest unit decreasing,
        // find the most appropriately-sized unit
        // (i.e. final value is greater than 1)
        const [unit, divisor] = Object.entries(units).reverse().find(([unit,amount])=>bytes / amount > 1) || [defaultUnit, units[defaultUnit]];

        return `${(bytes/divisor).toFixed(1)} ${unit}`;
      };

      console.log(` >${details.name}: ${convertBytesToStringWithUnit(details.stats.originalSize)}`);
      console.log(` >${details.name}: ${convertBytesToStringWithUnit(details.stats.minifiedSize)}`);
    }))
    .pipe(rename(concatenatedMinifiedCssFile))
    .pipe(gulp.dest(publicCssDirectory));
});
