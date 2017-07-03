'use strict';

const loadGruntTasks = require('load-grunt-tasks'); // eslint-disable-line import/no-extraneous-dependencies

const paths = {
  serverJs: ['*.js', 'app/**/*.js'],
  testJs: ['test/**/*.js'],
};

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      target: paths.serverJs.concat(paths.testJs),
    },
    nodemon: {
      api: {
        script: 'index.js',
        options: {
          args: [],
          ignore: [
            '.*/**',
            'node_modules/**',
            'test/**',
          ],
          ext: 'js,html',
          nodeArgs: ['--debug=5858'],
          delayTime: 1,
          cwd: __dirname,
        },
      },
    },
    mocha_istanbul: {
      coverage: {
        src: paths.testJs,
        options: {
          mochaOptions: ['--reporter', 'spec', '--timeout', '5000'],
          istanbulOptions: ['--root', './app', '--include-all-sources', 'true'],
          coverageFolder: './.coverage',
        },
      },
    },
  });
  // Load NPM grunt tasks
  loadGruntTasks(grunt);

  // tests
  grunt.registerTask('test', ['eslint', 'unit-test']);
  grunt.registerTask('unit-test', ['mocha_istanbul:coverage']);
};
