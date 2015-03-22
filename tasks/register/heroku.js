module.exports = function (grunt) {
    grunt.registerTask('heroku:production', [
        /**
         * Heroku does not have sass, so we have to use compass instead.
         * Also, the buildpack we use expects a 'heroku:production'
         * task to execute compass (and all steps rpeceding compass
         * execution).
         * The 'prod' task then picks up from where this task leaves off
         * and finishes up application initialization.
         */
        'clean',
        'bower:dev',
        'jst:dev',
        'compass:prod'
        //'compileAssetsProd',
        //'concat',
        //'uglify',
        //'cssmin',
        //'sails-linker:devJs',
        //'sails-linker:devStyles',
        //'sails-linker:devTpl',
        //'sails-linker:devJsJade',
        //'sails-linker:devStylesJade',
        //'sails-linker:devTplJade'
    ]);
};
