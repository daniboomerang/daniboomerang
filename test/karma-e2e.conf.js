exports.config = {

  specs: ['e2e/indexSpec.js', 'e2e/scrollingSpec.js'],

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },

  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

};