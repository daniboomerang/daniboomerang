'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	beforeEach(function() {
		browser.get('/');
	});

	it('should scroll to cover section', function() {
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toContain('/#/cover');
	}, 200000);

	////////////////
	/// ON COVER ///
	////////////////

		it('should contain a bar with the 4 link sections', function() {

	 		var cover = element(by.id('cover'));
	      	expect(cover.isPresent()).toBe(true);

  			element.all(by.css('.nav-cover li')).then(function(navbarList) {
				expect(navbarList.length).toBe(4);

				// Who I am <li> contains boomerang icon
				expect(navbarList[0].element(by.css('.icon-dboom')).isPresent()).toBe(true);

		        // What I like to do <li> contains heart icon
		        expect(navbarList[1].element(by.css('.fa-heart')).isPresent()).toBe(true);

		        // What I've done <li> contains github icon
				expect(navbarList[2].element(by.css('.fa-github')).isPresent()).toBe(true);

		        // What I've learnt <li> contains newspaper icon
		        expect(navbarList[3].element(by.css('.fa-newspaper-o')).isPresent()).toBe(true);
  			});
			
		});

		/////////////////////////////////////////
		// If click to navbar section Who I am //
		/////////////////////////////////////////

		it('should scroll to Who I am and expand topnavbar with Who I am link active', function() {

			browser.sleep(2000);

			var whoIAmLinkCover = element.all(by.css('.nav-cover li')).get(0);

			expect(whoIAmLinkCover.isPresent()).toBe(true);
			whoIAmLinkCover.click();

			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/who-i-am');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);

			// navbar section gets 'active'
			var whoIAmLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(0);
			expect(whoIAmLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		/////////////////////////////////////////////
		// If clicks to navbar section What I like //
		/////////////////////////////////////////////

		it('should scroll to What I like and expand topnavbar with What I like link active', function() {

			browser.sleep(2000);

			var whatILikeLinkCover = element.all(by.css('.nav-cover li')).get(1);

			expect(whatILikeLinkCover.isPresent()).toBe(true);
			whatILikeLinkCover.click();

			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-i-like');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			
			// navbar section gets 'active'
			var whatILkeLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(1);
			expect(whatILkeLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		////////////////////////////////////////////////
		// If clicks to navbar section What I've done //
		////////////////////////////////////////////////

		it('should scroll to What I´ve done and expand topnavbar with What I´ve done link active', function() {

			browser.sleep(2000);

			var whatIveDoneLinkCover = element.all(by.css('.nav-cover li')).get(2);

			expect(whatIveDoneLinkCover.isPresent()).toBe(true);
			whatIveDoneLinkCover.click();

			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-done');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);

			// navbar section gets 'active'
			var whatIveDoneLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(2);
			expect(whatIveDoneLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		//////////////////////////////////////////////////
		// If clicks to navbar section What I've learnt //
		//////////////////////////////////////////////////

		it('should scroll to What I´ve learnt and expand topnavbar with What I´ve learnt link active', function() {

			browser.sleep(2000);

			var whatIveLearntLinkCover = element.all(by.css('.nav-cover li')).get(3);

			expect(whatIveLearntLinkCover.isPresent()).toBe(true);
			whatIveLearntLinkCover.click();

			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-learnt');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);

			// navbar section gets 'active'
			var whatIveLearntLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(3);
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

	////////////////
	// ON CONTENT //
	////////////////

		it('should scroll from section to section when clicking at the fixed topnavbar ', function() {

			browser.sleep(2000);

			var whatIveLearntLinkCover = element.all(by.css('.nav-cover li')).get(3);
			whatIveLearntLinkCover.click();
			
			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-learnt');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			
			// navbar section gets 'active'
			var whatIveLearntLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(3);
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);


			///////////// CLICK TO Who I am  ///////////
			
			var whoIAmLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(0);
			whoIAmLinkTopnavbar.click();
			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/who-i-am');
			// navbar section gets 'active'
			expect(whoIAmLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I like  ///////////
			
			var whatILkeLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(1);
			whatILkeLinkTopnavbar.click();
			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-i-like');
			// navbar section gets 'active'
			expect(whatILkeLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I´ve done  ///////////
			
			var whatIveDoneLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(2);
			whatIveDoneLinkTopnavbar.click();
			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-done');
			// navbar section gets 'active'
			expect(whatIveDoneLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I´ve learnt  ///////////
			
			var whatIveLearntLinkTopnavbar = element.all(by.css('.nav-custom-width li')).get(3);
			whatIveLearntLinkTopnavbar.click();
			browser.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-learnt');
			// navbar section gets 'active'
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);
		});

});

