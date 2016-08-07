var parseBuildPlatforms = function (argumentPlatform) {
    // this will make it build no platform when the platform option is specified
    // without a value which makes argumentPlatform into a boolean
    var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

    // Do some scrubbing to make it easier to match in the regexes bellow
    inputPlatforms = inputPlatforms.replace("darwin", "mac");
    inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

    var buildAll = /^all$/.test(inputPlatforms);

    var buildPlatforms = {
        mac: /mac/.test(inputPlatforms) || buildAll,
        win: /win/.test(inputPlatforms) || buildAll,
        linux32: /linux32/.test(inputPlatforms) || buildAll,
        linux64: /linux64/.test(inputPlatforms) || buildAll
    };

    return buildPlatforms;
};


module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

      exec: {
        win: {
          cmd: '"node_modules/.bin/electron app/main.js'
        },
        mac: {
          cmd: 'node_modules/.bin/electron --enable-logging app/main.js'
        },
        linux32: {
          cmd: '"node_modules/.bin/electron app/main.js --enable-transparent-visuals --disable-gpu'
        },
        linux64: {
          cmd: '"node_modules/.bin/electron app/main.js --enable-transparent-visuals --disable-gpu'
        },
        package_mac35: {
          cmd: 'node_modules/.bin/electron-packager app/ Test0.35.4 --platform=darwin --arch=x64 --version=0.35.4 --cache=.electron --out=build35/'
        },
        package_mac36: {
          cmd: 'node_modules/.bin/electron-packager app/ Test0.36.0 --platform=darwin --arch=x64 --version=0.36.0 --cache=.electron --out=build36/'
        },
        package_mac132: {
          cmd: 'node_modules/.bin/electron-packager app/ Test1.3.2 --platform=darwin --arch=x64 --version=1.3.2 --cache=.electron --out=build132/'
        },
        package_win: {
          cmd: 'node_modules/.bin/electron-packager app/ Test --platform=win32 --arch=ia32 --version=0.33.4 --cache=.electron --out=build/ --icon=static/icon.ico'
        },
        package_linux64: {
          cmd: 'node_modules/.bin/electron-packager app/ Test --platform=linux --arch=x64 --version=0.33.4 --cache=.electron --out=build/ && cp linux/launcher.sh build/Motivator-linux-x64/launcher.sh && cp linux/Motivator.desktop build/Motivator-linux-x64/Motivator.desktop'
        },
        package_linux32: {
          cmd: 'node_modules/.bin/electron-packager app/ Test --platform=linux --arch=ia32 --version=0.33.4 --cache=.electron --out=build/ && cp linux/launcher.sh build/Motivator-linux-x64/launcher.sh && cp linux/Motivator.desktop build/Motivator-linux-x64/Motivator.desktop'
        }
      }
    });

    grunt.registerTask('start', function () {
      var start = parseBuildPlatforms();
      if (start.win) {
          grunt.task.run('exec:win');
      } else if (start.mac) {
          grunt.task.run('exec:mac');
      } else if (start.linux32) {
          grunt.task.run('exec:linux32');
      } else if (start.linux64) {
          grunt.task.run('exec:linux64');
      } else {
          grunt.log.writeln('OS not supported.');
      }
    });
};
