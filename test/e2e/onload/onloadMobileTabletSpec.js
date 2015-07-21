'use strict';

describe('Daniboomerang - Scenario for mobile and tablet devices when on load', function() {

  /////////////////////////////
  /**** DANIBOOMERANG.COM ****/
  /////////////////////////////

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

      // RESPONSIVE NAVBAR
      
        var responsiveNavbar = coverNavbarWrapper.element(by.id('cover-responsive-navbar'));
        responsiveNavbar.getAttribute('class').then(function(attrClass) {;
          expect(attrClass).toBe('hidden-md hidden-lg');
        });

        var navbarResponsiveList = element.all(by.css('.nav-cover-responsive li'));
        // About <li> contains boomerang icon
        var about = navbarResponsiveList.get(0);
        expect(about.element(by.css('.icon-boomerang-solid')).isPresent()).toBe(true);

        // Loving to do <li> contains heart icon
        var loving = navbarResponsiveList.get(1);
        expect(loving.element(by.css('.fa-heart')).isPresent()).toBe(true);

        // Work <li> contains github icon
        var work = navbarResponsiveList.get(2);
        expect(work.element(by.css('.fa-suitcase')).isPresent()).toBe(true);

        // Contact <li> contains chat icon
        var contact = navbarResponsiveList.get(3);
        expect(contact.element(by.css('.fa-wechat')).isPresent()).toBe(true);

  });

});
