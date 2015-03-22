module.exports = function (grunt) {
    grunt.registerTask('compileAssetsProd', [
        //'clean:dev',
        //'bower:dev',
        'less:dev',
        'copy:dev',
        'coffee:dev',
    ]);
};
