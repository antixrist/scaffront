var _                = require('lodash'),
    __               = require('../helpers'),
    extend           = require('extend'),
    path             = require('path'),
    gulp             = require('gulp'),
    gulpUtil         = require('gulp-util'),
    gulpTap          = require('gulp-tap'),
    mergeStreams     = require('event-stream').merge,
    del              = require('del'),
    gulpIf           = require('gulp-if'),
    getObject        = require('getobject'),
    gulpChanged      = require('gulp-changed'),
    runSequence      = require('run-sequence').use(gulp),
    gulpPlumber      = require('gulp-plumber'),
    gulpRename       = require('gulp-rename'),
    gulpFile         = require('gulp-file'),
    gulpData         = require('gulp-data'),
    lazypipe         = require('lazypipe'),
    gulpSwig         = require('gulp-swig-compiler-renderer'),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    gulpSass         = require('gulp-sass'),
    gulpSourcemaps   = require('gulp-sourcemaps'),
    FileInclude      = require('gulp-file-include'),
    gulpMinifyCss    = require('gulp-minify-css'),
    bowerDirectory   = require('bower-directory'),
    assetFunctions   = require('node-sass-asset-functions')
;

var Config       = require('../_config').styles,
    ServerConfig = require('../_config').server;



gulp.task('sass:test', function (cb) {
  var _Src = Config.sass.src;
  if (!__.isGulpSrc(_Src)) {
    _Src = gulp.src(__.getGlobPaths(Config.sass.src, ['sass', 'scss']));
  }

  return _Src
    .pipe(gulpSourcemaps.init())
    .pipe(
      gulpSass(Config.sass.nodeSass)
        .on('error', __.plumberErrorHandler.errorHandler)
    )
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
});



//// Provide `once: true` to restrict reloading to once per stream
//gulp.task('templates', function () {
//  return gulp.src('*.jade')
//    .pipe(jade())
//    .pipe(gulp.dest('app'))
//    .pipe(bs.stream({once: true}));
//});
//
//// Provide a filter to stop unwanted files from being reloaded
//gulp.task('less', function () {
//  return gulp.src('*.less')
//    .pipe(less())
//    .pipe(gulp.dest('css'))
//    .pipe(bs.stream({match: "**/*.css"}));
//});

return;

//gulpSass({
//  precision: 10,
//  includePaths: [
//    'node_modules',
//    path.relative(process.cwd(), bowerDirectory.sync())
//  ]
//});


//Gulp.task('sass:build', function () {
//  return Sass(paths.src.sass, {
//    //style: 'expanded',
//    //debugInfo: true,
//    sourcemap: true,
//    compass: true,
//    loadPath: [
//      paths.src.sass,
//      config.bower.src
//    ]
//  }).on('error', function (err) {
//    console.error(err);
//    //throw new Error (err);
//  })
//    .pipe(Sourcemaps.write('maps', {
//      includeContent: true,
//      sourceRoot: paths.src.sass
//    }))
//    .pipe(Gulp.dest(paths.dist.css))
//    .pipe(BrowserSync.reload({stream: true}));
//  // http://www.browsersync.io/docs/gulp/
//  //pipe(browserSync.stream({match: '**/*.css'}));
//});
//Gulp.task('css:build', function () {
//  return Gulp.src(paths.src.css)
//    .pipe(Plumber(Helpers.plumberErrorHandler))
//    //.pipe(Changed(paths.dist.css))
//    //.pipe(sourcemaps.init())
//    .pipe(Filter(function (file) {
//      var is = Is(file);
//      return !is.underscored;
//    }))
//    //.pipe(sourcemaps.write({
//    //  includeContent: false,
//    //  sourceRoot: paths.src.css
//    //}))
//    .pipe(FileInclude(config.FileInclude))
//    //.pipe(base64({
//    //  extensions: ['jpg', 'png'],
//    //  maxImageSize: 32*1024 // размер указывается в байтах, тут он 32кб потому, что больше уже плохо для IE8
//    //}))
//    .pipe(Gulp.dest(paths.dist.css))
//    .pipe(BrowserSync.reload({stream: true}));
//});
//
//Gulp.task('styles:min', function () {
//  return Gulp.src(paths.dist.css +'/**/*.css')
//    .pipe(Plumber(Helpers.plumberErrorHandler))
//    .pipe(Filter(function (file) {
//      var is = Is(file);
//      return is.css && !is.minified;
//    }))
//    .pipe(Autoprefixer(config.Autoprefixer))
//    .pipe(Csso())
//    .pipe(Rename(function (path) {
//      if (!path.basename.match(/\.min$/)) {
//        path.basename += '.min';
//      }
//    }))
//    .pipe(Gulp.dest(paths.dist.css));
//});
//Gulp.task('styles:build', function (cb) {
//  return RunSequence(
//    ['sass:build', 'css:build'],
//    cb
//  );
//});
//Gulp.task('styles:dist', function(cb) {
//  return RunSequence(
//    'styles:build',
//    //'styles:critical',
//    //'styles:min',
//    'styles:min',
//    //'styles:critical',
//    cb
//  );
//});