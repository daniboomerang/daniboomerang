'use strict';

describe('Daniboomerang - Scenario for desktop devices when on load', function() {

  /////////////////////////////////////
  /**** DANIBOOMERANG.COM - /#/cover */
  /////////////////////////////////////

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
    browser.sleep(5000);
  });
  
  it('should scroll to cover section', function() {
    expect(browser.getCurrentUrl()).toContain('/#/cover');
  });

  ///////////////  
  // The Cover //
  ///////////////  

  it("should show the cover elements correctly", function() {

      var cover = element(by.id('cover'));
      var coverNavbarWrapper = cover.element(by.id('cover-navbar-wrapper'));
      expect(coverNavbarWrapper.isPresent()).toBe(true);

      // NAVBAR

        var coverNavbar = coverNavbarWrapper.element(by.id('cover-navbar'));
        coverNavbar.getAttribute('class').then(function(attrClass) {;
          expect(attrClass).toBe('navbar navbar-custom-cover hidden-sm hidden-xs hidden-xxs hidden-tn');
        });
        var navbarList = element.all(by.css('.nav-cover li'));
        
        // About <li> contains boomerang icon
        var about = navbarList.get(0);
        expect(about.element(by.css('.icon-dboom')).isPresent()).toBe(true);

        // Loving to do <li> contains heart icon
        var loving = navbarList.get(1);
        expect(loving.element(by.css('.fa-heart')).isPresent()).toBe(true);

        // Work <li> contains github icon
        var work = navbarList.get(2);
        expect(work.element(by.css('.fa-github')).isPresent()).toBe(true);

        // Contact <li> contains chat icon
        var contact = navbarList.get(3);
        expect(contact.element(by.css('.fa-wechat')).isPresent()).toBe(true);

  });

});

