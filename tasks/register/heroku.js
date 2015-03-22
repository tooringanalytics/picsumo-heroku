module.exports = function (grunt) {
    grunt.registerTask('heroku:production', [
        'compileAssets',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
