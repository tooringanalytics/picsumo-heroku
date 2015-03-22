module.exports = function (grunt) {
    grunt.registerTask('heroku:production', [
        'compileAssetsProd',
        'copy:dev',
        'coffee:dev',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
