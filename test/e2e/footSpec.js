'use strict';

describe('Daniboomerang - Foot scenario for all devices', function() {

	var foot, footer;
	var buttonsLeftSideWrapper, shareMenuWrapper, buttonsRightSideWrapper, currentSectionWrapper, toNextUpButtonWrapper, toNextDownButtonWrapper, cvButtonWrapper, shareButtonWrapper; 

	/////////////////////////////////////
	/**** DANIBOOMERANG.COM - /#/cover */
	/////////////////////////////////////

	beforeEach(function() {
		browser.get('/');
		browser.ignoreSynchronization = true;
		browser.sleep(4000);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
		browser.sleep(3000);
		buttonsLeftSideWrapper = element(by.id('buttons-left-side-wrapper'));
		shareMenuWrapper = element(by.id('share-menu-wrapper'));
		buttonsRightSideWrapper = element(by.id('buttons-right-side-wrapper'));
		currentSectionWrapper = element(by.id('current-section-wrapper'));
		toNextUpButtonWrapper = element(by.id('to-next-up-button-wrapper'));
		toNextDownButtonWrapper = element(by.id('to-next-down-button-wrapper'));
		cvButtonWrapper = element(by.id('cv-button-wrapper'));
		shareButtonWrapper = element(by.id('share-button-wrapper'));
		browser.sleep(3000);
	});

	////////////////  
	// The Footer //
	//////////////// 

	it("should contain its main elements", function() {	
		foot = element(by.tagName('foot'));
	    expect(foot.isPresent()).toBe(true);
	    footer = element(by.id('footer'));
	    expect(footer.isPresent()).toBe(true);	
      	expect(buttonsLeftSideWrapper.isPresent()).toBe(true);
      	expect(shareMenuWrapper.isPresent()).toBe(true);
      	expect(buttonsRightSideWrapper.isPresent()).toBe(true);
      	expect(currentSectionWrapper.isPresent()).toBe(true);
      	expect(toNextUpButtonWrapper.isPresent()).toBe(true);
     	expect(toNextDownButtonWrapper.isPresent()).toBe(true);
		expect(cvButtonWrapper.isPresent()).toBe(true);
		expect(shareButtonWrapper.isPresent()).toBe(true);
  	});

  	it("should not be revealed until we are in a setion that is not the Cover", function() {

   
      	// It's elements are hidden (cover section)
      	expect(buttonsLeftSideWrapper.getAttribute('class')).toMatch('visibility-hidden');
      	expect(shareMenuWrapper.getAttribute('class')).toMatch('visibility-hidden');
      	expect(buttonsRightSideWrapper.getAttribute('class')).toMatch('visibility-hidden');
      	expect(currentSectionWrapper.getAttribute('class')).toMatch('visibility-hidden');
      	expect(toNextUpButtonWrapper.getAttribute('class')).toMatch('visibility-hidden');
     	expect(toNextDownButtonWrapper.getAttribute('class')).toMatch('visibility-hidden');
		expect(cvButtonWrapper.getAttribute('class')).toMatch('visibility-hidden');
		expect(shareButtonWrapper.getAttribute('class')).toMatch('visibility-hidden');

     	// It is revealed when whe scroll down to any section different to contact and cover
        // Go to the work section
        var workSection = element(by.id('work'));
        browser.driver.executeScript("arguments[0].scrollIntoView(true);", workSection.getWebElement());
        browser.sleep(3000);
        
        // Footer Menus are correctly displayed
        expect(buttonsLeftSideWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
      	expect(shareMenuWrapper.getAttribute('class')).toMatch('visibility-hidden');
      	expect(buttonsRightSideWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
      	expect(currentSectionWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
      	expect(toNextUpButtonWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
     	expect(toNextDownButtonWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
		expect(cvButtonWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
		expect(shareButtonWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
        
	});

	it("Shows and hides the sharing footer when the sharing button is clicked", function() {
	  
	  	// Go to the work section
	    var workSection = element(by.id('work'));
	    browser.driver.executeScript("arguments[0].scrollIntoView(true);", workSection.getWebElement());
	   	browser.sleep(3000);

		// Lets click on share button
		var shareButton = element(by.id('share-button'));
		expect(shareButton.isPresent()).toBe(true);
		var shareButtonLink = shareButton.element(by.css('.dboom-button-link'));
		expect(shareButtonLink.isPresent()).toBe(true);
		shareButtonLink.click();
		browser.sleep(1000);
		expect(shareMenuWrapper.getAttribute('class')).not.toMatch('visibility-hidden');
		shareButtonLink.click();
		browser.sleep(1000);
		expect(shareMenuWrapper.getAttribute('class')).toMatch('animated fadeOutDown');

	});

	it("Shows the current section", function() {
	  
	  	// Go to the work section
	    var workSection = element(by.id('work'));
	    browser.driver.executeScript("arguments[0].scrollIntoView(true);", workSection.getWebElement());
	   	browser.sleep(3000);
	   	expect(currentSectionWrapper.getText("text")).toEqual('WORK');
		
	});

});

