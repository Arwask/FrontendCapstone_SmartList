module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "alert" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "smartApp": true}
      },
      files: ['www/js/**/*.js']
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['www/js/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
};