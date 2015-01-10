exports.config = {

  /*specs: ['e2e/indexSpec.js', 'e2e/scrollingSpec.js'],*/
  /*specs: ['e2e/*.js'],

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },*/

	multiCapabilities: [
  {
  	   'browserName': 'chrome',
  	   'chromeOptions' : {
  	    args: ['--window-size=500,800']
  	   },

  	   specs: ['e2e/indexSpec.js', 'e2e/scrollingSpec.js']
  	}, 
    {
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=1280,800']
       },

       specs: ['e2e/indexSpec.js', 'e2e/scrollingSpec.js']
    },
    {
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=3500,800']
       },

       specs: ['e2e/indexSpec.js', 'e2e/scrollingSpec.js']
    }
  ],

  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

};