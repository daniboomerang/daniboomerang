exports.config = {
  specs: ['e2e/introSpec.js', 'e2e/parallaxSpec.js'], capabilities: { browserName: 'chrome', shardTestFiles: true, maxInstances: 2 },
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine2'
};