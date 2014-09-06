'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.js',
          'mymodules/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    cssmin: {
      minify: {
        src: ['public/css/*.css'],
        dest: 'release/public/css/style.css'
      }
    },
    uglify: {
      minify: {
        files: [{
          expand: true,
          cwd: 'public/js',
          src: '**/*.js',
          dest: 'release/public/js'
        }]
      }
    },
    copy: {
      frontend: {
        files: [{
          expand: true,
          src: ['public/img/**', 'public/html/**'],
          dest: 'release/'
        }, {
          expand: true,
          src: ['public/components/bootstrap/dist/**', 
                'public/components/jquery/dist/**',
                'public/components/jquery.inview/*.js', 
                'public/components/requirejs/*.js', 
                'public/components/underscore/*.js'],
          dest: 'release/'
        }]
      },
      server: {
        files: [{
          expand: true,
          src: ['app.js', 'processes.json', 'bin/**', 'config/**', 'log/', 'mymodules/**', 'node_modules/**', 'routes/**', 'views/**'],
          dest: 'release/'
        }]
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('deploy', 'Deploy web application, compress CSS, JavaScript...', ['cssmin', 'uglify', 'copy']);

  grunt.registerTask('default', ['develop', 'watch']);
};
