/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
**/

var gulp          = require('gulp');
var cp            = require('child_process');
var plumber       = require('gulp-plumber');
var gutil         = require('gulp-util');
var cheerio       = require('gulp-cheerio');
var cache         = require('gulp-cache');
var ghPages       = require('gulp-gh-pages');


// stylesheet & javascript plugins
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var eyeglass    = require("eyeglass");
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// image plugins
var imagemin      = require('gulp-imagemin');
var pngquant      = require('imagemin-pngquant');
var svgmin        = require('gulp-svgmin');
var svgstore      = require('gulp-svgstore');



var sassOptions = {
  // put node-sass options you need here.
  eyeglass: {
    // put eyeglass options you need here.
  }
};


/**
 * project paths declared here
 */
var paths = {
  stylesheets: './_stylesheets/**/*.{sass,scss}',
  svgIcons: './_icons/*',
  images: './_images/**/*.+(png|jpg|gif|svg)',
  includes: './_includes',
  assets: './assets'
};


/**
 * successful build message used by browserSync
 */
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Error handling
 */
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(paths.stylesheets)
        .pipe(sass({
            includePaths: [
              'scss',
              'node_modules/bulma'
            ],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets')) // for live injecting
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(paths.assets)); // for subsequent jekyll builds

});

/**
 * Concatenate the vendor and project javascripts into one file
 * Then uglify
 */
gulp.task('javascripts', function(){
    return gulp.src([
    './_javascripts/application.js'])
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assets))
});


/**
 * SVGs
 * svgmin minifies our SVG files and strips out unnecessary code
 * svgstore binds them together in one giant SVG container
 * cheerio gives us the ability to interact with the DOM components in this file in a jQuery-like way
 */
gulp.task('icons', function () {
  return gulp.src(paths.svgIcons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg').attr('style',  'display:none');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    // .pipe(gulp.dest(paths.assets))
    .pipe(gulp.dest(paths.includes))
    .pipe(browserSync.reload({stream:true}));
});


/**
* Images
* - Compress them and output to assets folder
**/
gulp.task('images', () =>
	gulp.src(paths.images)
    // Caching images that ran through imagemin
    .pipe(cache(imagemin([
    	imagemin.jpegtran({
        progressive: true,
        optimizationLevel: 7 // Select an optimization level between 0 and 7.
      }),
    	imagemin.optipng({optimizationLevel: 5}),
    	imagemin.svgo({
    		plugins: [
    			{removeViewBox: true},
    			{cleanupIDs: false}
    		]
    	})
    ])))
    .pipe(gulp.dest('_site/assets')) // for live injecting
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(paths.assets)) // for subsequent jekyll builds
);





/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(paths.stylesheets, ['sass']);
    gulp.watch(paths.javascripts, ['javascripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.svgIcons, ['icons']);
    gulp.watch(['*.html',
        '*.md',
        '_layouts/*.html',
        '_includes/*',
        '_posts/*'],
        ['jekyll-rebuild']);
});


/**
 * Builds the project into _site
 * then deploy the master branch of https://github.com/sealevelresearch/sealevelresearch.github.io
 */
gulp.task('deploy', ['build'], function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages( {
      branch: "master"
    }));
});



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

/*
 * Build task
 */
gulp.task('build',['sass','javascripts','images','icons','jekyll-rebuild']);
