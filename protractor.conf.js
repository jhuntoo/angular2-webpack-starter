// @AngularClass

exports.config = {
  baseUrl: 'http://localhost:8080/',

  specs: [
    'test/**/*.e2e.js'
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: true}));
    var jasmineReporters = require('jasmine-reporters');

    var savePath = '';

    if(process.env.CIRCLE_TEST_REPORTS) {
      savePath = process.env.CIRCLE_TEST_REPORTS;
    } else {
      savePath = 'test_results';
    }

    jasmine.getEnv().addReporter(new jasmineReporters.
      JUnitXmlReporter({
      consolidateAll: true,
      savePath: savePath,
      filePrefix: 'xmloutput'
    }));
  },


  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
   useAllAngular2AppRoots: true
};
