'use strict';

describe('Daniboomerang - Scrolling scenario far all devices', function() {

	var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

	beforeEach(function() {
		browser.get('/');
		browser.sleep(4000);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
		browser.sleep(3000);
	});

 	//////////////////////////////
 	// FROM UP AND DOWN BUTTONS //
 	//////////////////////////////

   	it('should scroll from top to bottom and bottom to top', function() {

   		// Perparing Up, Down and Current section of the footer

   		var toNextDownButtonWrapper = element(by.id('to-next-down-button-wrapper'));
		expect(toNextDownButtonWrapper.isPresent()).toBe(true);
		var toNextDownButtonLink = toNextDownButtonWrapper.element(by.css('.dboom-button-link'));
		expect(toNextDownButtonLink.isPresent()).toBe(true); 
		var toNextUpButtonWrapper = element(by.id('to-next-up-button-wrapper'));
       	expect(toNextUpButtonWrapper.isPresent()).toBe(true);
		var toNextUpButtonLink = toNextUpButtonWrapper.element(by.css('.dboom-button-link'));
		expect(toNextUpButtonLink.isPresent()).toBe(true); 
		var currentSectionWrapper = element(by.id('current-section-wrapper'));

   		// LETS GO DOWN!!!!

     	///////////// Click down: Connectivity ///////////
    	var cover = element(by.id('cover'));
      	expect(cover.isPresent()).toBe(true);
      	expect(cover.element(by.id('cover-content')).isPresent()).toBe(true);
      	expect(cover.element(by.id('cover-footer')).isPresent()).toBe(true); 
      	var coverFooter = cover.element(by.id('cover-footer'));
      	var scrollDownButton = cover.element(by.id('scroll-down'));
      	expect(scrollDownButton.isPresent()).toBe(true);
      	var scrollDownButtonLink = scrollDownButton.element(by.id('scroll-down-link'));
      	expect(scrollDownButtonLink.isPresent()).toBe(true);
    	scrollDownButtonLink.click();
    	browser.sleep(3500);

     	///////////// click to next: About ///////////
		toNextDownButtonLink.click();
		browser.sleep(3500);
		expect(currentSectionWrapper.getText("text")).toEqual('ABOUT');

     	///////////// Click to next: Loving ///////////
		toNextDownButtonLink.click();
		browser.sleep(3500);
		expect(currentSectionWrapper.getText("text")).toEqual('LOVING');

     	///////////// Click to next: work ///////////
    	toNextDownButtonLink.click();
    	browser.sleep(3500);
    	expect(currentSectionWrapper.getText("text")).toEqual('WORK');
      
	    ///////////// Click to next: contact ///////////
	    toNextDownButtonLink.click();
	    browser.sleep(5000);

	    // LETS GO UP!!!!!
		///////////// Click up: Work ///////////
	    var contact = element(by.id('contact'));
	    expect(contact.isPresent()).toBe(true);
      	var scrollUpButton = contact.element(by.id('scroll-up'));
      	expect(scrollUpButton.isPresent()).toBe(true);
      	var scrollUpButtonLink = scrollUpButton.element(by.id('scroll-up-link'));
      	expect(scrollUpButtonLink.isPresent()).toBe(true);
    	scrollUpButtonLink.click();
    	browser.sleep(3500);
    	expect(currentSectionWrapper.getText("text")).toEqual('WORK');

    	///////////// Click to next: Loving ///////////
		toNextUpButtonLink.click();
		browser.sleep(3500);
		expect(currentSectionWrapper.getText("text")).toEqual('LOVING');

		///////////// Click to next: About ///////////
		toNextUpButtonLink.click();
		browser.sleep(3500);
		expect(currentSectionWrapper.getText("text")).toEqual('ABOUT');

		///////////// Click to next: Connectivity ///////////
		toNextUpButtonLink.click();
		browser.sleep(3500);
		
    });

	//////////////////
	/// FROM COVER ///
	//////////////////

   	it('should scroll to the right sections from the cover navbar', function() {

   		browser.sleep(5000);

		var cover = element(by.id('cover'));
      	expect(cover.isPresent()).toBe(true);
      	var currentSectionWrapper = element(by.id('current-section-wrapper'));

      	// Click About
      	var aboutLink = cover.element(by.id('about-li'));
      	expect(aboutLink.isPresent()).toBe(true);

		aboutLink.element(by.css('.icon-boomerang-solid')).click();
		browser.sleep(3000);
		expect(currentSectionWrapper.getText("text")).toEqual('ABOUT');

		// Click Loving
		var lovingLink = cover.element(by.id('loving-li'));
      	expect(lovingLink.isPresent()).toBe(true);

		lovingLink.element(by.css('.icon-heart')).click();
		browser.sleep(3000);
		expect(currentSectionWrapper.getText("text")).toEqual('LOVING');

		// Click Work
		var workLink = cover.element(by.id('work-li'));
      	expect(workLink.isPresent()).toBe(true);

		workLink.element(by.css('.icon-suitcase')).click();
		browser.sleep(3500);
		expect(currentSectionWrapper.getText("text")).toEqual('WORK');

		// Click Contact
		var contactLink = cover.element(by.id('contact-li'));
      	expect(contactLink.isPresent()).toBe(true);

		contactLink.element(by.css('.icon-weixin')).click();
		browser.sleep(3500);
      
   	});

   	afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
