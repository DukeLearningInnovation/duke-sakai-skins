'use strict';

// Load Grunt
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    vendor: {
        bootstrap: 'src/morpheus-master/bootstrap-sass-3.3.7/assets',
        fontawesome: 'src/morpheus-master/font-awesome-sass-4.7.0/assets'
    },

    // Tasks
    clean: { // Empties folders to start fresh
      build: {
        files: [{
          dot: true,
          src: [
            '/dev/tmp/{,*/}*',
            '/dev/.sass-cache/{,*/}*',
          ]
        }]
      }
    },

    sass: { // Begin Sass Plugin
      skin: {
        options: {
          sourcemap: 'none',
          loadPath: [ "<%= vendor.bootstrap %>/stylesheets", "<%= vendor.fontawesome %>/stylesheets"],
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: '/dev/tmp',
          ext: '.css'
        }]
      }
    },

    postcss: { // Begin Post CSS Plugin
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: '/dev/tmp/' // ...to the specified directory
        },
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: '/dev/tmp/*.css'
      }
    },

    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: '/dev/tmp',
          src: ['*.css', '!*.min.css'],
          dest: '/dev/tmp',
          ext: '.min.css'
        }]
      }
    },

    watch: { // Compile everything into one task with Watch Plugin
      sass: {
        files: '**/*.scss',
        tasks: [
            'sass',
            'postcss',
            //'cssmin',
            'if'],
        options: {
          livereload: true,
        },
      },
    },

    copy: { // Copy files from src folder to appropriate dest
      dist: {
        files: [
          {expand: true, cwd: "<%= vendor.bootstrap %>/fonts/", src: ['**'], dest: '/dev/tmp/fonts'},
          {expand: true, cwd: "<%= vendor.fontawesome %>/fonts/", src: ['**'], dest: '/dev/tmp/fonts'},
          {expand: true, cwd: 'fonts/', src: ['**'], dest: '/dev/tmp/fonts'},
          {expand: true, cwd: 'js/', src: ['ie/*','lib/*'], dest: '/dev/tmp/js'},
          {expand: true, src: ['images/**'], dest: '/dev/tmp/'},
        ]
      },
      'sakai.duke.edu': {
        files: [
          {expand: true, cwd: "<%= vendor.bootstrap %>/fonts/", src: ['**'], dest: '/dev/sakai.duke.edu/library/skin//fonts'},
          {expand: true, cwd: "<%= vendor.fontawesome %>/fonts/", src: ['**'], dest: '/dev/tmp/fonts'},
          {expand: true, cwd: 'fonts/', src: ['**'], dest: '/dev/tmp/fonts'},
          {expand: true, cwd: 'js/', src: ['ie/*','lib/*'], dest: '/dev/tmp/js'},
          {expand: true, src: ['images/**'], dest: '/dev/tmp/'},
        ]
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          '/dev/tmp/js/morpheus.plugins.min.js': ['js/plugins/*.js'],
          '/dev/tmp/js/morpheus.scripts.min.js': ['js/src/*.js']
        }
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-if');

  // Register Grunt tasks
  grunt.registerTask('build', [
    'clean:build'
    ,'sass'
    ,'postcss'
    //,'cssmin'
    ,'uglify'
    // ,'copy:dist'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('deploy', ['build', 'if']);
};
