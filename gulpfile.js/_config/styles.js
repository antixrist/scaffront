var bowerConfig     = require('./bower'),
    path            = require('path'),
    sassCssImporter = require('node-sass-css-importer'),
    assetFunctions  = require('node-sass-asset-functions')
  ;


module.exports = (function () {
  var config = {};

  /**
   * @param {string} [directory]
   * @returns String
   */
  var getPackagePath = function (directory) {
    return path.join('node_modules', directory || '');
  };

  /**
   * @param {string} [directory]
   * @returns String
   */
  var getBowerPath = function (directory) {
    return path.join(bowerConfig.dirRelative, directory || '');
  };

  config.src = 'app/styles';

  var importPathes = [
    getPackagePath(),
    getBowerPath(),
    getBowerPath('compass-mixins/lib'),
    getBowerPath('sass-toolkit/stylesheets'),
    getBowerPath('sassy-buttons'),
    getBowerPath('sassy-maps/sass'),
    getBowerPath('SassyLists/dist'),
    getBowerPath('singularity/stylesheets'),
    getBowerPath('singularity-quick-spanner/stylesheets'),
    getBowerPath('breakpoint-sass/stylesheets'),
    getBowerPath('breakpoint-slicer/stylesheets'),
  ];

  config.sass = {
    src: config.src,
    nodeSass: {
      precision: 10,
      functions: assetFunctions({
        images_path: (global.isProduction) ? 'dist/i' : 'app/images/inline',
        images_dir:  (global.isProduction) ? 'dist/i' : 'app/images/inline',
        http_images_path: '/i',
        http_generated_images_path: '/i',
      }),
      //importer: [sassCssImporter({
      //  import_paths: importPathes
      //})],
      includePaths: importPathes
    }
  };

  return config;
})();