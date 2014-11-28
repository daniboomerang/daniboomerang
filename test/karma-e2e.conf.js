exports.config = {

  specs: ['e2e/responsiveSpec.js','e2e/scenariosSpec.js'],

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  seleniumPort: 4444,

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

};