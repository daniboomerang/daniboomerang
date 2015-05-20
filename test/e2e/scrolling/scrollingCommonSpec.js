'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	beforeEach(function() {
	    browser.get('/');
	    browser.ignoreSynchronization = true;
	    browser.sleep(5000);
	});
	
	/////////////////
	// ON SECTIONS //
	/////////////////

		it('should scroll from section to section when clicking at the topnavbar links ', function() {

			// Go to the the last section
        	var contactSection = element(by.id('contact'));
	        browser.driver.executeScript("arguments[0].scrollIntoView(true);", contactSection.getWebElement());
	        browser.sleep(4000);

			// header is not expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(false);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(false);
			
			///////////// CLICK ARROW TO PREVIOUS SECTION (WORK) ///////////			   
			var scrollUpButton = element(by.id('scroll-up'));
			expect(scrollUpButton.isPresent()).toBe(true);
			var scrollUpButtonLink = scrollUpButton.element(by.css('.arrow'));
      		expect(scrollUpButtonLink.isPresent()).toBe(true);
      		scrollUpButtonLink.click();
      		browser.sleep(4000);

			// header expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);

			///////////// CLICK TO Loving ///////////
			var lovingLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(1);
			lovingLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/loving');
			// navbar section gets 'active'
			expect(lovingLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO About ///////////
			var aboutLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(0);
			aboutLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/about');
			// navbar section gets 'active'
			expect(aboutLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Work ///////////
			var workLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(2);
			workLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/work');
			// navbar section gets 'active'
			expect(workLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Contact ///////////
			var contactLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(3);
			contactLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/contact');
		});

});

