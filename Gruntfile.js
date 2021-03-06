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
      target: {
        files: [{
          src: 'public/css/style.css',
          dest: 'release/public/css/<%= pkg.version %>/style.css'
        }, {
          src: 'public/css/editstyle.css',
          dest: 'release/public/css/<%= pkg.version %>/editstyle.css'
        }]
      }
    },
    htmlmin: {
      target: {
        files: [{
          src: 'public/html/post.html',
          dest: 'release/public/html/post.html'
        }]
      },
      options: {
        minifyJS: true
      }
    },
    copy: {
      frontend: {
        files: [{
          expand: true,
          src: [
            'public/img/images.png',
            'public/img/*.gif'],
          dest: 'release/'
        }, {
          expand: true,
          src: ['public/components/bootstrap/dist/css/**',
                'public/components/bootstrap/dist/fonts/**',
                'public/components/requirejs/*.js'],
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
    },
    requirejs: {
      compile_app: {
        options: {
          name: "app",
          baseUrl: "public/js",
          out: "release/public/js/<%= pkg.version %>/app.js",
          paths: {
            jquery: "../components/jquery/dist/jquery.min",
            bootstrap: "../components/bootstrap/dist/js/bootstrap",
            underscore: "../components/underscore/underscore",
            jquery_inview: "../components/jquery.inview/jquery.inview.min",
            moment: "../components/momentjs/min/moment.min"
          }
        }
      },
      compile_edit: {
        options: {
          name: "edit",
          baseUrl: "public/js",
          out: "release/public/js/<%= pkg.version %>/edit.js",
          paths: {
            jquery: "../components/jquery/dist/jquery.min",
            marked: "../components/marked/lib/marked"
          }
        }
      }
    },
    replace: {
      layout_jade: {
        src: ["release/views/layout.jade"],
        overwrite: true,
        replacements: [{
          from: "/css/style.css",
          to: "/css/<%= pkg.version %>/style.css"
        }, {
          from: "/js/app",
          to: "/js/<%= pkg.version %>/app"
        }, {
          from: "      script(src='http://localhost:35729/livereload.js')\n",
          to: ""
        }]
      },
      post_html: {
        src: ["release/public/html/post.html"],
        overwrite: true,
        replacements: [{
          from: "/css/editstyle.css",
          to: "/css/<%= pkg.version %>/editstyle.css"
        }, {
          from: /<script type=\"text\/javascript\" src=\"\/components.*\"><\/script>/g,
          to: ""
        }, {
          from: "/js/edit",
          to: "/js/<%= pkg.version %>/edit"
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

  grunt.registerTask('deploy', 'Deploy web application, compress CSS, JavaScript...', ['cssmin', 'htmlmin', 'requirejs', 'copy', 'replace']);

  grunt.registerTask('default', ['develop', 'watch']);
};
