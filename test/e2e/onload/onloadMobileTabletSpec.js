'use strict';

describe('Daniboomerang - Scenario for mobile and tablet devices when on load', function() {

  /////////////////////////////
  /**** DANIBOOMERANG.COM ****/
  /////////////////////////////

  beforeEach(function() {
     browser.get('/');
  });
  
  it('should scroll to cover section', function() {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain('/#/cover');
  }, 200000);

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
          expect(attrClass).toBe('hidden-sm hidden-md hidden-lg');
        });

        var navbarResponsiveList = element.all(by.css('.nav-cover-responsive li'));
        // Who I am <li> contains boomerang icon
        var whoIAm = navbarResponsiveList.get(0);
        expect(whoIAm.element(by.css('.icon-dboom')).isPresent()).toBe(true);

        // What I like to do <li> contains heart icon
        var whatILike = navbarResponsiveList.get(1);
        expect(whatILike.element(by.css('.fa-heart')).isPresent()).toBe(true);

        // What I've done <li> contains github icon
        var whatIveDone = navbarResponsiveList.get(2);
        expect(whatIveDone.element(by.css('.fa-github')).isPresent()).toBe(true);

        // What I've learnt <li> contains chat icon
        var whatIveLearnt = navbarResponsiveList.get(3);
        expect(whatIveLearnt.element(by.css('.fa-wechat')).isPresent()).toBe(true);

  });

});
