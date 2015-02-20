'use strict';

describe('Daniboomerang - Scenario for desktop devices when on load', function() {

  /////////////////////////////////////
  /**** DANIBOOMERANG.COM - /#/cover */
  /////////////////////////////////////

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

      // NAVBAR

        var coverNavbar = coverNavbarWrapper.element(by.id('cover-navbar'));
        coverNavbar.getAttribute('class').then(function(attrClass) {;
          expect(attrClass).toBe('navbar navbar-custom-cover hidden-xs hidden-xxs hidden-tn');
        });
        var navbarList = element.all(by.css('.nav-cover li'));
        
        // Who I am <li> contains boomerang icon
        var whoIAm = navbarList.get(0);
        expect(whoIAm.element(by.css('.icon-dboom')).isPresent()).toBe(true);

        // What I like to do <li> contains heart icon
        var whatILike = navbarList.get(1);
        expect(whatILike.element(by.css('.fa-heart')).isPresent()).toBe(true);

        // What I've done <li> contains github icon
        var whatIveDone = navbarList.get(2);
        expect(whatIveDone.element(by.css('.fa-github')).isPresent()).toBe(true);

        // What I've learnt <li> contains chat icon
        var whatIveLearnt = navbarList.get(3);
        expect(whatIveLearnt.element(by.css('.fa-wechat')).isPresent()).toBe(true);

  });

});

