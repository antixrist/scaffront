'use strict';

const $        = require('gulp-load-plugins')();
const _        = require('lodash');
const __       = require('../helpers');
const sass     = require('node-sass');
const path     = require('path');
const gutil    = require('gulp-util');
const config   = require('../../scaffront.config.js');
const postcss  = require('postcss');
const resolve  = require('resolve');
const combiner = require('stream-combiner2').obj;
const through2 = require('through2').obj;

var streams = {};

var rebaseAssets = function () {

};

streams._css = function (options) {
  options = (_.isPlainObject(options)) ? options : {};

  var assets = {};

  var stream = combiner(
    $.sourcemaps.init({
      loadMaps: true
    }),
    $.postcss([
      require('postcss-import')({
        //root: path.join(process.cwd(), config.tasks.root),
        resolve: function (module, basedir, importOptions) {
          return __.nodeResolve(module, basedir);
        },
        transform: function(css, filepath, options) {
          console.log('filepath', filepath);
          console.log('options', options);

          return postcss([
            require('postcss-url')({
              url: function (url, decl, from, dirname, to, options, result) {
                console.log('url', url);
                console.log('from', from);
                console.log('dirname', dirname);
                console.log('to', to);
                console.log('options', options);

                url = __.nodeResolve(url, path.dirname(filepath));

                //url = path.relative(process.cwd(), url);
                //file = path.join(path.dirname(file), path.basename(file, path.extname(file)));
                //
                //assets[file] = assets[file] || [];
                //assets[file].push(url);

                return url;
              }
            })
          ])
            .process(css)
            .then(function(result) {
              return result.css;
            });
        }
      })
    ])
  );

  return stream;
};


function handleError (cb) {
  return function (error) {
    var errorOptions = { fileName: file.path };
    if (error.name === 'CssSyntaxError') {
      error = error.message + error.showSourceCode();
      errorOptions.showStack = false
    }
    // Prevent stream’s unhandled exception from
    // being suppressed by Promise
    cb && setImmediate(function () {
      cb(new gutil.PluginError('gulp-postcss', error))
    })
  };
}

streams.css = function (options) {
  options = (_.isPlainObject(options)) ? options : {};

  var assets = {};

  var stream = combiner(
    $.sourcemaps.init({
      loadMaps: true
    }),
    through2(
      function(file, enc, callback) {
        if (file.isNull()) {
          return cb(null, file)
        }

        if (file.isStream()) {
          return handleError(callback)('Streams are not supported!');
        }

        var entryFilepath = path.join(file.base, file.stem);
        //console.log('entryFilepath', entryFilepath);

        postcss([
          require('postcss-import')({
            //root: path.join(process.cwd(), config.tasks.root),
            resolve: function (module, basedir, importOptions) {
              return __.nodeResolve(module, basedir);
            },
            transform: function(css, filepath, options) {
              //console.log('options', options);

              return postcss([
                require('postcss-url')({
                  url: function (url, decl, from, dirname, to, options, result) {
                    //console.log('url', url);
                    //console.log('from', from);
                    //console.log('dirname', dirname);
                    //console.log('to', to);
                    //console.log('options', options);

                    url = __.nodeResolve(url, path.dirname(filepath));
                    url = path.relative(process.cwd(), url);

                    assets[entryFilepath] = assets[entryFilepath] || [];
                    assets[entryFilepath].push(url);

                    return url;
                  }
                })
              ])
                .process(css)
                .then(function(result) {
                  return result.css;
                });
            }
          })
        ])
          .process(file.contents, {
            from: file.path,
            to:   file.path
          })
          .then(function postcssHandleResult (result) {
            var map;
            var warnings = result.warnings().join('\n');

            file.contents = new Buffer(result.css);

            if (warnings) {
              gutil.log('gulp-postcss:', file.relative + '\n' + warnings)
            }

            setImmediate(function () {
              callback(null, file)
            })
          }, handleError(callback));
      },
      function(callback) {
        //let manifest = new File({
        //  // cwd base path contents
        //  contents: new Buffer(JSON.stringify(mtimes)),
        //  base: process.cwd(),
        //  path: process.cwd() + '/manifest.json'
        //});
        //this.push(manifest);
        console.log('assets', assets);
        callback();
      }
    )
    //$.postcss([
      //require('postcss-import')({
      //  //root: path.join(process.cwd(), config.tasks.root),
      //  resolve: function (module, basedir, importOptions) {
      //    return __.nodeResolve(module, basedir);
      //  },
      //  transform: function(css, filepath, options) {
      //    console.log('filepath', filepath);
      //    console.log('options', options);
      //
      //    return postcss([
      //      require('postcss-url')({
      //        url: function (url, decl, from, dirname, to, options, result) {
      //          console.log('url', url);
      //          console.log('from', from);
      //          console.log('dirname', dirname);
      //          console.log('to', to);
      //          console.log('options', options);
      //
      //          url = __.nodeResolve(url, path.dirname(filepath));
      //
      //          //url = path.relative(process.cwd(), url);
      //          //file = path.join(path.dirname(file), path.basename(file, path.extname(file)));
      //          //
      //          //assets[file] = assets[file] || [];
      //          //assets[file].push(url);
      //
      //          return url;
      //        }
      //      })
      //    ])
      //      .process(css)
      //      .then(function(result) {
      //        return result.css;
      //      });
      //  }
      //})
    //])
  );

  return stream;
};

streams.scss = function (options) {
  options = (_.isPlainObject(options)) ? options : {};

  var assets = {};

  return combiner(
    $.sourcemaps.init({
      loadMaps: true
    }),
    $.sass({
      precision: 10,
      importer: require('node-sass-import-once'),
      importOnce: {
        index: true,
        css: true,
        bower: false,
        /**
         * @param {string} filename
         * @param {string} contents
         * @returns {string}
         */
        transformContent: function (filename, contents) {
          return [
            '$__filepath: unquote("'+ filename +'");',
            '@function url($url: null) {',
            '  @return __url($__filepath, $url);',
            '}',
            contents
          ].join('\n');
        }
      },
      functions: {
        '__url($filepath, $url)': function(filepath, url, done) {
          url = url.getValue();
          filepath = filepath.getValue();

          if (!url) {
            url = '""';
          } else {
            url = __.nodeResolve(url, path.dirname(filepath));

            let file = this.options.file;

            file = path.join(path.dirname(file), path.basename(file, path.extname(file)));

            assets[file] = assets[file] || [];
            assets[file].push(url);

            url = path.relative(process.cwd(), url);
          }

          done(new sass.types.String('url('+ url +')'));
        }
      }
    }),
    through2(
      function(file, enc, callback) {
        var filepath = path.join(file.base, file.stem);

        file.assets = assets[filepath];
        callback(null, file);
      },
      function(callback) {
        //let manifest = new File({
        //  // cwd base path contents
        //  contents: new Buffer(JSON.stringify(mtimes)),
        //  base: process.cwd(),
        //  path: process.cwd() + '/manifest.json'
        //});
        //this.push(manifest);
        console.log('assets', assets);
        callback();
      }
    )
  );
};

module.exports = streams;
