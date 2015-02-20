exports.config = {

  /*specs: ['e2e/*.js'],

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },*/

	multiCapabilities: [
    /* TINY DEVICES */
    {   
  	   'browserName': 'chrome',
  	   'chromeOptions' : {
  	    args: ['--window-size=320,800']
  	   },

  	   specs: ['e2e/scrolling/scrollingMobileTabletSpec.js']
  	},
    /* SMALL DEVICES */
    {
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=768,800']
       },

       specs: ['e2e/scrolling/scrollingMobileTabletSpec.js']
    },
    /* MEDIUM DEVICES */
    {
       'browserName': 'chrome',
       'chromeOptions' : {
        args: ['--window-size=1280,800']
       },

       specs: ['e2e/scrolling/scrollingCommonSpec.js', 'e2e/scrolling/scrollingDesktopSpec.js']
    }
  ],

  chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

};