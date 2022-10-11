module.exports = function(config) {
  var APP_ROOT_PATH = 'app/';
  var NODE_MODULES_ROOT_PATH = 'node_modules/';

  config.set({
    basePath: '',
    frameworks: ['browserify','jasmine'],

    files: [
      /* External dependencies */
      NODE_MODULES_ROOT_PATH + 'babel-polyfill/dist/polyfill.js',
      NODE_MODULES_ROOT_PATH + 'jquery/dist/jquery.min.js',
      NODE_MODULES_ROOT_PATH + 'angular/angular.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-animate/angular-animate.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-aria/angular-aria.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-material/angular-material.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-messages/angular-messages.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-mocks/angular-mocks.js',
      NODE_MODULES_ROOT_PATH + 'angular-resource/angular-resource.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-ui-router/release/angular-ui-router.min.js',
      NODE_MODULES_ROOT_PATH + 'js-base64/base64.min.js',
      NODE_MODULES_ROOT_PATH + 'lokijs/build/lokijs.min.js',
      NODE_MODULES_ROOT_PATH + 'lokijs/src/loki-angular.js',
      NODE_MODULES_ROOT_PATH + 'moment/min/moment.min.js',
      /* Static resources files */
      // APP_ROOT_PATH + 'definitions/**/*.js',
      'tests/utils/data/**/*.js',
      APP_ROOT_PATH + 'static-resource/**/*.js',
      /* Static resources files */
      APP_ROOT_PATH + 'static-resource/**/*.js',
      /* Application files */
      APP_ROOT_PATH + 'app.js',
      /* Applicatoin Module files */
      APP_ROOT_PATH + '**/**/*module.js',
      APP_ROOT_PATH + '**/**/*.js',
      /* Test files */
      'tests/unit/**/example.js',
      'tests/unit/**/*-spec.js'
    ],

    exclude: [
      APP_ROOT_PATH + 'static-resource/force-refresh-page.js'
    ],

    preprocessors: {
      './app/**/*.js': ['babel','coverage'],
      'node_modules/otus*/**/*.js': 'babel',
      './tests/unit/**/*-spec.js': 'babel'
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        plugins: [
          "syntax-class-properties",
          "transform-class-properties"
        ]
      }
    },

    browserify: {
      debug: true,
      transform: ['babelify', 'stringify']
    },

    reporters: ['dots'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
    singleRun: false,

    client: {
      captureConsole: false
    },

    concurrency: Infinity,

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-translate', '--disable-setuid-sandbox']
      }
    }
  });

};
