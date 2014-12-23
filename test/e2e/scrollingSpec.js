'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	var ptor= protractor.getInstance();
	beforeEach(function() {
		ptor.get('/');
	});

	it('should scroll to cover section', function() {
		ptor.waitForAngular();
		expect(ptor.getCurrentUrl()).toContain('/#/cover');
	}, 200000);

	////////////////
	/// ON COVER ///
	////////////////

		it('should contain a bar with the 4 link sections', function() {

	 		var cover = element(by.id('cover'));
	      	expect(cover.isPresent()).toBe(true);

  			element.all(by.css('.masthead-nav li')).then(function(navbarList) {
				expect(navbarList.length).toBe(4);
				// Who I am <li> contains the correct text 
	        	expect(navbarList[0].getText()).toBe('Who I am   ');

		        // What I like to do <li> contains the correct text 
		        expect(navbarList[1].getText()).toBe('What I like to do   ');

		        // What I've done <li> contains the correct text 
		        expect(navbarList[2].getText()).toBe('What I´ve done / Github   ');

		        // What I've learnt <li> contains the correct text 
		        expect(navbarList[3].getText()).toBe('What I´ve learnt / CV   ');
  			});
			
		});

		/////////////////////////////////////////
		// If click to navbar section Who I am //
		/////////////////////////////////////////

		it('should scroll to Who I am and expand topnavbar with Who I am link active', function() {

			ptor.sleep(2000);

			var whoIAmLinkCover = element.all(by.css('.masthead-nav li')).get(0);

			expect(whoIAmLinkCover.isPresent()).toBe(true);
			whoIAmLinkCover.click();

			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/who-i-am');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			var navResponsive = headerElement.element(by.id('responsive-navbar'));
			expect(navResponsive.isDisplayed()).toBe(false);

			// navbar section gets 'active'
			var whoIAmLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(0);
			expect(whoIAmLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		/////////////////////////////////////////////
		// If clicks to navbar section What I like //
		/////////////////////////////////////////////

		it('should scroll to What I like and expand topnavbar with What I like link active', function() {

			ptor.sleep(2000);

			var whatILikeLinkCover = element.all(by.css('.masthead-nav li')).get(1);

			expect(whatILikeLinkCover.isPresent()).toBe(true);
			whatILikeLinkCover.click();

			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-i-like');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			var navResponsive = headerElement.element(by.id('responsive-navbar'));
			expect(navResponsive.isDisplayed()).toBe(false);

			// navbar section gets 'active'
			var whatILkeLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(1);
			expect(whatILkeLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		////////////////////////////////////////////////
		// If clicks to navbar section What I've done //
		////////////////////////////////////////////////

		it('should scroll to What I´ve done and expand topnavbar with What I´ve done link active', function() {

			ptor.sleep(2000);

			var whatIveDoneLinkCover = element.all(by.css('.masthead-nav li')).get(2);

			expect(whatIveDoneLinkCover.isPresent()).toBe(true);
			whatIveDoneLinkCover.click();

			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-ive-done');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			var navResponsive = headerElement.element(by.id('responsive-navbar'));
			expect(navResponsive.isDisplayed()).toBe(false);

			// navbar section gets 'active'
			var whatIveDoneLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(2);
			expect(whatIveDoneLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

		//////////////////////////////////////////////////
		// If clicks to navbar section What I've learnt //
		//////////////////////////////////////////////////

		it('should scroll to What I´ve learnt and expand topnavbar with What I´ve learnt link active', function() {

			ptor.sleep(2000);

			var whatIveLearntLinkCover = element.all(by.css('.masthead-nav li')).get(3);

			expect(whatIveLearntLinkCover.isPresent()).toBe(true);
			whatIveLearntLinkCover.click();

			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-ive-learnt');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			var navResponsive = headerElement.element(by.id('responsive-navbar'));
			expect(navResponsive.isDisplayed()).toBe(false);

			// navbar section gets 'active'
			var whatIveLearntLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(3);
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

		});

	////////////////
	// ON CONTENT //
	////////////////

		it('should scroll from section to section when clicking at the fixed topnavbar ', function() {

			ptor.sleep(2000);

			var whatIveLearntLinkCover = element.all(by.css('.masthead-nav li')).get(3);
			whatIveLearntLinkCover.click();
			
			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-ive-learnt');

			// header is expanded 
			var headerElement = element(by.tagName('header'));
			expect(headerElement.isDisplayed()).toBe(true);
			var nav = headerElement.element(by.id('navbar'));
			expect(nav.isDisplayed()).toBe(true);
			var navResponsive = headerElement.element(by.id('responsive-navbar'));
			expect(navResponsive.isDisplayed()).toBe(false);

			// navbar section gets 'active'
			var whatIveLearntLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(3);
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);


			///////////// CLICK TO Who I am  ///////////
			
			var whoIAmLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(0);
			whoIAmLinkTopnavbar.click();
			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/who-i-am');
			// navbar section gets 'active'
			expect(whoIAmLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I like  ///////////
			
			var whatILkeLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(1);
			whatILkeLinkTopnavbar.click();
			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-i-like');
			// navbar section gets 'active'
			expect(whatILkeLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I´ve done  ///////////
			
			var whatIveDoneLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(2);
			whatIveDoneLinkTopnavbar.click();
			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-ive-done');
			// navbar section gets 'active'
			expect(whatIveDoneLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

			///////////// CLICK TO What I´ve learnt  ///////////
			
			var whatIveLearntLinkTopnavbar = element.all(by.css('.navbar-collapse li')).get(3);
			whatIveLearntLinkTopnavbar.click();
			ptor.sleep(3000);
			// it scrolls to Who I am section (check url)
			expect(ptor.getCurrentUrl()).toContain('/#/what-ive-learnt');
			// navbar section gets 'active'
			expect(whatIveLearntLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);
		});

});

