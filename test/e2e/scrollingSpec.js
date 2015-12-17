// describe('Daniboomerang - scrolling scenario', function() {

//  beforeEach(function() {
//    browser.get('/');
//    browser.ignoreSynchronization = true;
//    browser.sleep(3000);
//    browser.actions().sendKeys(protractor.Key.ENTER).perform();
//    browser.sleep(2000);
//  });

//  it('should scroll to cover section', function() {
//    expect(browser.getCurrentUrl()).toContain('/#/cover');
//  });
  
//  /////////////////
//  // ON SECTIONS //
//  /////////////////

//    it('should scroll from section to section when clicking at the topnavbar links ', function() {

//      // Go to the the last section
//          var contactSection = element(by.id('contact'));
//          browser.driver.executeScript("arguments[0].scrollIntoView(true);", contactSection.getWebElement());
//          browser.sleep(4000);

//      // header is not expanded 
//      var headerElement = element(by.tagName('header'));
//        expect(headerElement.isPresent()).toBe(true);
//        expect(headerElement.element(by.css('.expand')).isPresent()).toBe(false);
      
//      ///////////// CLICK ARROW TO PREVIOUS SECTION (WORK) ///////////         
//      var scrollUpButton = element(by.id('scroll-up'));
//      expect(scrollUpButton.isPresent()).toBe(true);
//      var scrollUpButtonLink = scrollUpButton.element(by.css('.arrow'));
//          expect(scrollUpButtonLink.isPresent()).toBe(true);
//          scrollUpButtonLink.click();
//          browser.sleep(4000);
//           header expanded  
//        var headerElement = element(by.tagName('header'));
//        expect(headerElement.isPresent()).toBe(true);
//        expect(headerElement.element(by.css('expand navbar-fixed-top box-shadow-down')).isPresent()).toBe(true);
      
//      ///////////// CLICK TO Loving ///////////
//      var lovingLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(1);
//      lovingLinkTopnavbar.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/loving');
//      // navbar section gets 'active'
//      expect(lovingLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

//      ///////////// CLICK TO About ///////////
//      var aboutLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(0);
//      aboutLinkTopnavbar.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/about');
//      // navbar section gets 'active'
//      expect(aboutLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);

//      ///////////// CLICK TO Work ///////////
//      var workLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(2);
//      workLinkTopnavbar.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/work');
//      // navbar section gets 'active'
//      expect(workLinkTopnavbar.element(by.css('.active')).isPresent()).toBe(true);
      
//      ///////////// CLICK TO Contact ///////////
//      var contactLinkTopnavbar = element.all(by.css('.navbar-custom li')).get(3);
//      contactLinkTopnavbar.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/contact');
//    });

// });

// 'use strict';

// describe('Daniboomerang - scrolling scenario', function() {

//  beforeEach(function() {
//    browser.get('/');
//    browser.ignoreSynchronization = true;
//    browser.sleep(3000);
//    browser.actions().sendKeys(protractor.Key.ENTER).perform();
//    browser.sleep(2000);
//  });

//  ////////////////
//  /// ON COVER ///
//  ////////////////

//    it('should contain a bar with the 4 link sections', function() {

//      var cover = element(by.id('cover'));
//          expect(cover.isPresent()).toBe(true);

//        element.all(by.css('.nav-cover li')).then(function(navbarList) {
//        expect(navbarList.length).toBe(4);

//        // About <li> contains boomerang icon
//        expect(navbarList[0].element(by.css('.icon-boomerang-solid')).isPresent()).toBe(true);

//            // Loving to do <li> contains heart icon
//            expect(navbarList[1].element(by.css('.fa-heart')).isPresent()).toBe(true);

//            // Work <li> contains github icon
//        expect(navbarList[2].element(by.css('.fa-suitcase')).isPresent()).toBe(true);

//            // Contact <li> contains chat icon
//            expect(navbarList[3].element(by.css('.fa-wechat')).isPresent()).toBe(true);
//        });
      
//    });

//    //////////////////////////////////////
//    // If click to navbar section About //
//    //////////////////////////////////////

//    it('should scroll to About and expand topnavbar with About link active', function() {

//      var aboutLinkCover = element.all(by.css('.nav-cover li')).get(0);
//      expect(aboutLinkCover.isPresent()).toBe(true);
//      aboutLinkCover.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/about');

//    });

//    ////////////////////////////////////////
//    // If clicks to navbar section Loving //
//    ////////////////////////////////////////

//    it('should scroll to Loving and expand topnavbar with Loving link active', function() {

//      var lovingLinkCover = element.all(by.css('.nav-cover li')).get(1);
//      expect(lovingLinkCover.isPresent()).toBe(true);
//      lovingLinkCover.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/loving');

//    });

//    //////////////////////////////////////
//    // If clicks to navbar section Work //
//    //////////////////////////////////////

//    it('should scroll to Work and expand topnavbar with Work link active', function() {

//      var workLinkCover = element.all(by.css('.nav-cover li')).get(2);
//      expect(workLinkCover.isPresent()).toBe(true);
//      workLinkCover.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/work');

//    });

//    /////////////////////////////////////////
//    // If clicks to navbar section Contact //
//    /////////////////////////////////////////

//    it('should scroll to Contact and expand topnavbar with Contact link active', function() {

//      var contactLinkCover = element.all(by.css('.nav-cover li')).get(3);
//      expect(contactLinkCover.isPresent()).toBe(true);
//      contactLinkCover.click();
//      browser.sleep(4000);
//      // it scrolls to About section (check url)
//      expect(browser.getCurrentUrl()).toContain('/#/contact');

//    });

// });

  // Lets click on 'to top button'
	  // var toTopButton = footerWrapper.element(by.id('to-top-button'));
	  // expect(toTopButton.isPresent()).toBe(true);
	  // var toTopButtonLink = toTopButton.element(by.css('.dboom-button-link'));
	  // expect(toTopButtonLink.isPresent()).toBe(true);
	  // toTopButtonLink.click();
	  // browser.sleep(4000);
	  // // it scrolls to the Cover (check url)
	  // expect(browser.getCurrentUrl()).toContain('/#/cover');