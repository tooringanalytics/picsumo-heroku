/**
 * Compiles Sass files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.scss` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-sass
 * or:
 *      http://rok3.me/programming/using-sass-sails-js/
 */

module.exports = function(grunt) {

    grunt.config.set('compass', {
        prod: {
            options: {              // Target options
              sassDir: 'assets/styles',
              cssDir: '.tmp/public/styles/',
              environment: 'production'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
};
