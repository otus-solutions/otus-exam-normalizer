(function() {

  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var browserSyncSpa = require('browser-sync-middleware-spa');
  var bump = require('gulp-bump');
  var uglify = require('gulp-uglify');
  var minify = require('gulp-minify');
  var concat = require('gulp-concat');
  var useref = require('gulp-useref');
  var gulpif = require('gulp-if');
  var sonar = require('gulp-sonar');
  var packageJson = require('./package.json');
  // var pom = require('./pom.xml');
  var replaceTask = require('gulp-replace-task');
  var baseDir = __dirname + '/app/index.html';
  var minifyCss = require('gulp-minify-css');
  var uncache = require('gulp-uncache');
  var replace = require('gulp-replace');
  var runSequence = require('run-sequence');
  var moment = require('moment-timezone');
  var shell = require('shelljs');
  var fs = require("fs");
  var xml2js = require('xml2js');

  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        open: 'external',
        baseDir: '../',
        middleware: [
          //browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'otus-exam-normalizer/app'
    });

    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.css'
    ]).on('change', browserSync.reload);
  });

  gulp.task('upgrade-version', function() {
    gulp.src('./package.json')
      .pipe(bump({
        version: process.env.npm_config_value
      }))
      .pipe(gulp.dest('./'));
  });

  // Task for add hash from version into package.json
  gulp.task('add-hash-version', function(value) {
    var now = moment().tz("America/Sao_Paulo").format('YYYYMMDD.HHmmss');
    var newVersion = packageJson.version + '.' + now;
    gulp.src('./package.json')
      .pipe(bump({
        version: newVersion
      }))
      .pipe(gulp.dest('./'));
  });

  // Task for remove hash from version into package.json
  gulp.task('remove-hash-version', function(value) {
    var pos = packageJson.version.indexOf("-SNAPSHOT");
    gulp.src('./package.json')
      .pipe(bump({
        version: packageJson.version.slice(0, pos + 9)
      }))
      .pipe(gulp.dest('./'));
  });

  // Task for copy version value into package.json from pom.xml
  gulp.task('update-version', function(value) {

    var RegExp = /^[\d]{1,}\.[\d]{1,}$/;
    var parser = new xml2js.Parser();
    fs.readFile('./pom.xml', function(err, data) {
      parser.parseString(data, function(err, result) {
        var pomVersion = result.project.version.toString();
        var pos = pomVersion.indexOf('-SNAPSHOT');
        if (pos > 0) { //When there is a snapshot
          pomVersion = pomVersion.slice(0, pos);
          if (RegExp.test(pomVersion) == true) {
            gulp.src('./package.json')
              .pipe(bump({
                version: pomVersion.concat('.0-SNAPSHOT')
              }))
              .pipe(gulp.dest('./'));
          } else {
            gulp.src('./package.json')
              .pipe(bump({
                version: pomVersion.concat('-SNAPSHOT')
              }))
              .pipe(gulp.dest('./'));
          }
        } else { //When there is no snapshot
          if (RegExp.test(pomVersion) == true) {
            gulp.src('./package.json')
              .pipe(bump({
                version: pomVersion.concat('.0')
              }))
              .pipe(gulp.dest('./'));
          } else {
            gulp.src('./package.json')
              .pipe(bump({
                version: pomVersion
              }))
              .pipe(gulp.dest('./'));
          }
        }
      });
    });
  });

  // Task for publish into nexus repository with command line paramenter --repository='type'
  gulp.task('nexus', function() {
    var parser = new xml2js.Parser();
    fs.readFile('./pom.xml', function(err, data) {
      parser.parseString(data, function(err, result) {
        shell.exec('npm run gulp update-version');
        if (result.project.version.toString().indexOf('-SNAPSHOT') == -1) {
          shell.exec('npm publish --registry=' + packageJson.distributionManagement.release);
        } else {
          shell.exec('npm run gulp add-hash-version');
          shell.exec('npm publish --registry=' + packageJson.distributionManagement.snapshot);
          shell.exec('npm run gulp remove-hash-version');
        }
      });
    });
  });


  gulp.task('compress-compress', function() {
    return gulp.src('app/*.html', {
        allowEmpty: true
      })
      .pipe(useref({
        transformPath: function(filePath) {
          return filePath.replace('otus-exam-normalizer/app', 'otus-exam-normalizer');
        }
      }))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulpif('*.css', replace('url(../../static-resource/', 'url(/otus-exam-normalizer/app/static-resource/')))
      .pipe(gulpif('index.html', replace('href="css', 'href="dist/otus-exam-normalizer/css')))
      .pipe(gulpif('index.html', replace('src="scripts', 'src="dist/otus-exam-normalizer/scripts')))
      .pipe(gulp.dest('dist/otus-exam-normalizer'));
  });

  gulp.task('compress-hash', function() {
    return gulp.src('dist/otus-exam-normalizer/index.html')
      .pipe(uncache({
        append: 'hash',
        rename: true
      }))
      .pipe(gulp.dest('dist/otus-exam-normalizer'));
  });

  gulp.task('compress', function() {
    runSequence('compress-compress', 'compress-hash');
  });


  gulp.task('sonar', function() {
    var options = {
      sonar: {
        host: {
          url: process.env.npm_config_sonarUrl,
        },
        login: process.env.npm_config_sonarDatabaseUsername,
        password: process.env.npm_config_sonarDatabasePassword,
        projectKey: 'sonar:' + packageJson.name,
        projectName: packageJson.name,
        projectVersion: packageJson.version,
        sources: 'app',
        language: 'js',
        sourceEncoding: 'UTF-8',
        exec: {
          maxBuffer: 1024 * 1024
        },
        javascript: {
          lcov: {
            reportPath: 'target/test-coverage/report-lcov/lcov.info'
          }
        }
      }
    };

    return gulp.src('thisFileDoesNotExist.js', {
        read: false
      })
      .pipe(sonar(options));
  });

}());
