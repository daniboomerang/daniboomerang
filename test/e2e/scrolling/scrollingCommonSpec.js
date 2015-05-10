'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	/////////////////
	// ON SECTIONS //
	/////////////////

		it('should scroll from section to section when clicking at the topnavbar links ', function() {

			// Go to the the last section
        	var workSection = element(by.id('work'));
	        browser.driver.executeScript("arguments[0].scrollIntoView(true);", workSection.getWebElement());
	        browser.sleep(4000);

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			
			// navbar section gets 'active'
			var workLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(2);
			expect(workLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO About ///////////
			var aboutLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(0);
			aboutLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/about');
			// navbar section gets 'active'
			expect(aboutLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Loving ///////////
			var lovingLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(1);
			lovingLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/loving');
			// navbar section gets 'active'
			expect(lovingLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Contact ///////////
			var contactLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(3);
			contactLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/contact');
			// navbar section gets 'active'
			expect(contactLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Work ///////////
			var workLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(2);
			workLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/work');
			// navbar section gets 'active'
			expect(workLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);
		});

});

