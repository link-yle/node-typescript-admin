// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
// const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli',
    //  'pact'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-scss-preprocessor'),
      // require('@pact-foundation/karma-pact')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    files: [
      // { pattern: './src/test.ts', watched: false },
      { pattern: './src/styles/main.scss', watched: true,  included: true, served: true }
    ],
    preprocessors: {
      // './src/test.ts': ['@angular/cli'],
      './src/styles/main.scss': ['scss']
    },



    // pact: [{
    //   port: 1234,
    //   consumer: 'KarmaJasmineConsumer',
    //   provider: 'KarmaJasmineProvider',
    //   logLevel: 'DEBUG',
    //   log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    //   dir: path.resolve(process.cwd(), 'pacts')
    // }],

  });
};
