'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	beforeEach(function() {
		browser.get('/');
	});
	
	////////////////
	// ON CONTENT //
	////////////////

		it('should scroll from section to section when clicking at the topnavbar links ', function() {

			// Go to the the last section
        	var lastSection = element(by.id('contact'));
	        browser.driver.executeScript("arguments[0].scrollIntoView(true);", lastSection.getWebElement());
	        browser.sleep(1000);

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			
			// navbar section gets 'active'
			var whatIveLearntLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(3);
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO About  ///////////
			var whoIAmLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(0);
			whoIAmLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/about');
			// navbar section gets 'active'
			expect(whoIAmLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Loving  ///////////
			var whatILkeLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(1);
			whatILkeLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/loving');
			// navbar section gets 'active'
			expect(whatILkeLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Work  ///////////
			var whatIveDoneLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(2);
			whatIveDoneLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/work');
			// navbar section gets 'active'
			expect(whatIveDoneLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO Contact  ///////////
			var whatIveLearntLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(3);
			whatIveLearntLinkTopnavbar.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/contact');
			// navbar section gets 'active'
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);
		});

});

