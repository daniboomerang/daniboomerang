exports.config = {
  /*specs: [], capabilities: { browserName: 'chrome', shardTestFiles: true, maxInstances: 2 },*/
  multiCapabilities: [  
    /*{ 
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=320,800']
       },
       specs: ['e2e/introSpec.js', 'e2e/parallaxSpec.js']
    },
    { 
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=680,800']
       },
       specs: ['e2e/introSpec.js', 'e2e/parallaxSpec.js']
    },*/
    { 
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=1280,800']
       },
       specs: ['e2e/introSpec.js', 'e2e/parallaxSpec.js']
    }
  ],
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine2'
};