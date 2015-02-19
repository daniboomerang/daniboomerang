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

  			element.all(by.css('.nav-cover-responsive li')).then(function(navbarList) {
				expect(navbarList.length).toBe(4);

				// Who I am <li> contains boomerang icon
				expect(navbarList[0].element(by.css('.icon-dboom')).isPresent()).toBe(true);

		        // What I like to do <li> contains heart icon
		        expect(navbarList[1].element(by.css('.fa-heart')).isPresent()).toBe(true);

		        // What I've done <li> contains github icon
				expect(navbarList[2].element(by.css('.fa-github')).isPresent()).toBe(true);

		        // What I've learnt <li> contains chat icon
		        expect(navbarList[3].element(by.css('.fa-wechat')).isPresent()).toBe(true);
  			});
			
		});

		/////////////////////////////////////////
		// If click to navbar section Who I am //
		/////////////////////////////////////////

		it('should scroll to Who I am and expand topnavbar with Who I am link active', function() {

			var whoIAmLinkCover = element.all(by.css('.nav-cover-responsive li')).get(0);
			expect(whoIAmLinkCover.isPresent()).toBe(true);
			whoIAmLinkCover.click();
			browser.sleep(4000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/who-i-am');

		});

		/////////////////////////////////////////////
		// If clicks to navbar section What I like //
		/////////////////////////////////////////////

		it('should scroll to What I like and expand topnavbar with What I like link active', function() {

			var whatILikeLinkCover = element.all(by.css('.nav-cover-responsive li')).get(1);
			expect(whatILikeLinkCover.isPresent()).toBe(true);
			whatILikeLinkCover.click();
			browser.sleep(4000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-i-like');

		});

		////////////////////////////////////////////////
		// If clicks to navbar section What I've done //
		////////////////////////////////////////////////

		it('should scroll to What I´ve done and expand topnavbar with What I´ve done link active', function() {

			var whatIveDoneLinkCover = element.all(by.css('.nav-cover-responsive li')).get(2);
			expect(whatIveDoneLinkCover.isPresent()).toBe(true);
			whatIveDoneLinkCover.click();
			browser.sleep(4000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-done');

		});

		//////////////////////////////////////////////////
		// If clicks to navbar section What I've learnt //
		//////////////////////////////////////////////////

		it('should scroll to What I´ve learnt and expand topnavbar with What I´ve learnt link active', function() {

			var whatIveLearntLinkCover = element.all(by.css('.nav-cover-responsive li')).get(3);
			expect(whatIveLearntLinkCover.isPresent()).toBe(true);
			whatIveLearntLinkCover.click();
			browser.sleep(4000);
			// it scrolls to Who I am section (check url)
			expect(browser.getCurrentUrl()).toContain('/#/what-ive-learnt');

		});
});

