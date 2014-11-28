exports.config = {

  specs: ['e2e/responsiveSpec.js','e2e/scenariosSpec.js'],

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },

	onPrepare: function() {	
		// implicit and page load timeouts
		browser.manage().timeouts().pageLoadTimeout(40000);
		browser.manage().timeouts().implicitlyWait(25000);
 	},

  	chromeDriver: '../node_modules/protractor/selenium/chromedriver',

  	baseUrl: 'http://localhost:8080/',

  	framework: 'jasmine',

};