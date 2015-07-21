'use strict';

describe('Daniboomerang - scrolling scenario', function() {

	beforeEach(function() {
		browser.get('/');
		browser.ignoreSynchronization = true;
		browser.sleep(5000);
	});

	it('should scroll to cover section', function() {
		expect(browser.getCurrentUrl()).toContain('/#/cover');
	});

	////////////////
	/// ON COVER ///
	////////////////

		it('should contain a bar with the 4 link sections', function() {

	 		var cover = element(by.id('cover'));
	      	expect(cover.isPresent()).toBe(true);

  			element.all(by.css('.nav-cover-responsive li')).then(function(navbarList) {
				expect(navbarList.length).toBe(4);

				// About <li> contains boomerang icon
				expect(navbarList[0].element(by.css('.icon-boomerang-solid')).isPresent()).toBe(true);

		        // Loving to do <li> contains heart icon
		        expect(navbarList[1].element(by.css('.fa-heart')).isPresent()).toBe(true);

		        // Work <li> contains github icon
				expect(navbarList[2].element(by.css('.fa-suitcase')).isPresent()).toBe(true);

		        // Contact <li> contains chat icon
		        expect(navbarList[3].element(by.css('.fa-wechat')).isPresent()).toBe(true);
  			});
			
		});

		//////////////////////////////////////
		// If click to navbar section About //
		//////////////////////////////////////

		it('should scroll to About and expand topnavbar with About link active', function() {

			var aboutLinkCover = element.all(by.css('.nav-cover-responsive li')).get(0);
			expect(aboutLinkCover.isPresent()).toBe(true);
			aboutLinkCover.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/about');

		});

		////////////////////////////////////////
		// If clicks to navbar section Loving //
		////////////////////////////////////////

		it('should scroll to Loving and expand topnavbar with Loving link active', function() {

			var lovingLinkCover = element.all(by.css('.nav-cover-responsive li')).get(1);
			expect(lovingLinkCover.isPresent()).toBe(true);
			lovingLinkCover.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/loving');

		});

		//////////////////////////////////////
		// If clicks to navbar section Work //
		//////////////////////////////////////

		it('should scroll to Work and expand topnavbar with Work link active', function() {

			var workLinkCover = element.all(by.css('.nav-cover-responsive li')).get(2);
			expect(workLinkCover.isPresent()).toBe(true);
			workLinkCover.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/work');

		});

		/////////////////////////////////////////
		// If clicks to navbar section Contact //
		/////////////////////////////////////////

		it('should scroll to Contact and expand topnavbar with Contact link active', function() {

			var contactLinkCover = element.all(by.css('.nav-cover-responsive li')).get(3);
			expect(contactLinkCover.isPresent()).toBe(true);
			contactLinkCover.click();
			browser.sleep(4000);
			// it scrolls to About section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/contact');

		});
});

