'use strict';

describe('Daniboomerang - index scenario', function() {

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
      expect(cover.isPresent()).toBe(true);

      // PARALLAX
      expect(element(by.css('.stars-parallax-background')).isPresent()).toBe(true);

      // NAVBAR
        expect(cover.element(by.id('cover-navbar')).isPresent()).toBe(true);
        var navbarList = element.all(by.css('.masthead-nav li'));

        // Who I am <li> contains the correct text 
        var whoIAm = navbarList.get(0);
        expect(whoIAm.getText()).toBe('Who I am   ');

        // What I like to do <li> contains the correct text 
        var whatILike = navbarList.get(1);
        expect(whatILike.getText()).toBe('What I like   ');

        // What I've done <li> contains the correct text 
        var whatIveDone = navbarList.get(2);
        expect(whatIveDone.getText()).toBe('What I´ve done   ');

        // What I've learnt <li> contains the correct text 
        var whatIveLearnt = navbarList.get(3);
        expect(whatIveLearnt.getText()).toBe('What I´ve learnt   ');
        
      // CONTENT
        expect(cover.element(by.id('cover-content')).isPresent()).toBe(true);

      // FOOT
        expect(cover.element(by.id('cover-footer')).isPresent()).toBe(true);
  });

  ////////////  
  // Header //
  ////////////  
  
  // The heading must be hidden
  it("should not show the header, nor the navbar", function() {
      var headerElement = element(by.tagName('header'));
      expect(headerElement.isDisplayed()).toBe(false);
      var nav = headerElement.element(by.id('navbar'));
      expect(nav.isDisplayed()).toBe(false);
  });

  /////////////////  
  // The Content //
  /////////////////  

  it('should have 4 sections', function() {
    var sections = element(by.id('sections'));
    expect(sections.isPresent()).toBe(true);

    // CONTENT
      expect(sections.element(by.id('who-i-am')).isPresent()).toBe(true);
      expect(sections.element(by.css('.bookshell-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('what-i-like')).isPresent()).toBe(true);
      expect(sections.element(by.css('.desk-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('what-ive-done')).isPresent()).toBe(true);
      expect(sections.element(by.css('.floor-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('what-ive-learnt')).isPresent()).toBe(true);
  });


});

