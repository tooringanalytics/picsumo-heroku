module.exports = function (grunt) {
    grunt.registerTask('compileAssetsProd', [
        'clean:dev',
        'bower:dev',
        'jst:dev',
        'less:dev',
        'compass:prod',
        'copy:dev',
        'coffee:dev',
    ]);
};
