module.exports = function (grunt) {
    grunt.registerTask('heroku:production', [
        'clean:dev',
        'bower:dev',
        'jst:dev',
        'compass:prod',
        'copy:dev',
        'coffee:dev',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
