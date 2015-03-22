module.exports = function (grunt) {
    grunt.registerTask('heroku:production', [
        'clean',
        'bower:dev'
        'compass:prod',
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
