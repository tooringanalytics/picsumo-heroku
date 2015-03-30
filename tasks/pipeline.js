/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  //'dist/css/*.css',
  'styles/**/*.css',
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  //'js/dependencies/**/*.js',
  'js/dist/jquery.js',
  'js/dist/js/bootstrap.js',
  'js/angular.js',
  'js/release/angular-ui-router.js',
  'js/dist/angular-input-match.min.js',
  'js/angular-file-upload.js',
  'js/angular-file-upload-shim.js',
  'js/angular-mocks.js',
  'js/validator.js',
  'js/webcam.js',
  'js/exif.js',
  'js/s3upload.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  //'js/**/*.js'
  'js/app.js',
  'js/controller.js',
  'js/services.js'
];

var jsFilesToConcat = [
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dist/jquery.js',
  'js/dist/js/bootstrap.js',
  'js/angular.js',
  'js/release/angular-ui-router.js',
  'js/dist/angular-input-match.min.js',
  'js/angular-file-upload.js',
  'js/angular-file-upload-shim.js',
  'js/angular-mocks.js',
  'js/validator.js',
  'js/webcam.js',
  'js/exif.js',
  'js/s3upload.js',

  // Other client-side js files
  'js/app.js',
  'js/controller.js',
  'js/services.js'
];

var jsFilesToInjectProd = [
  // Load sails.io before everything else
  //'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  //'js/angular.js',
  //'js/release/angular-ui-router.js',
  //'js/angular-file-upload.js',
  //'js/angular-file-upload-shim.js',
  //'js/angular-mocks.js',
  //'js/validator.js',
  //'js/webcam.js',

  'min/production.min.js'
];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToConcat = jsFilesToConcat.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectProd = jsFilesToInjectProd.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
