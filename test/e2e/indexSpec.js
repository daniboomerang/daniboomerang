'use strict';

describe('Daniboomerang - index scenario', function() {

  /////////////////////////////////////
  /**** DANIBOOMERANG.COM - /#/cover */
  /////////////////////////////////////

  var ptor= protractor.getInstance();
  beforeEach(function() {
    ptor.get('/');
  });
  
  it('should scroll to cover section', function() {
    ptor.waitForAngular();
    expect(ptor.getCurrentUrl()).toContain('/#/cover');
  }, 200000);

  /////////////  
  // Heading //
  /////////////  
  
  // The heading must be hidden
  it("should not show the header, nor the navbar", function() {
      var headerElement = element(by.tagName('header'));
      expect(headerElement.isDisplayed()).toBe(false);
      var nav = headerElement.element(by.id('navbar'));
      expect(nav.isDisplayed()).toBe(false);
      var navResponsive = headerElement.element(by.id('responsive-navbar'));
      expect(navResponsive.isDisplayed()).toBe(false);
  });

  ///////////////  
  // The Cover //
  ///////////////  

  it("should show the cover with its elements", function() {
      var cover = element(by.id('cover'));
      expect(cover.isPresent()).toBe(true);
      
      // PARALLAX
      expect(cover.element(by.css('.stars-parallax-background')).isPresent()).toBe(true);

      // NAVBAR
        expect(cover.element(by.id('cover-navbar')).isPresent()).toBe(true);
        var navbarList = element.all(by.css('.masthead-nav li'));

        // Who I am <li> contains the correct text 
        var whoIAm = navbarList.get(0);
        expect(whoIAm.getText()).toBe('Who I am   ');

        // What I like to do <li> contains the correct text 
        var whatILike = navbarList.get(1);
        expect(whatILike.getText()).toBe('What I like to do   ');

        // What I've done <li> contains the correct text 
        var whatIveDone = navbarList.get(2);
        expect(whatIveDone.getText()).toBe('What I´ve done / Github   ');

        // What I've learnt <li> contains the correct text 
        var whatIveLearnt = navbarList.get(3);
        expect(whatIveLearnt.getText()).toBe('What I´ve learnt / CV   ');
        
      // CONTENT
        expect(cover.element(by.id('cover-content')).isPresent()).toBe(true);

      // FOOT
        expect(cover.element(by.id('cover-footer')).isPresent()).toBe(true);
  });

  /////////////////  
  // The Content //
  /////////////////  

  it('should have 4 sections', function() {
    var content = element(by.id('content'));
    expect(content.isPresent()).toBe(true);

    // CONTENT
      expect(content.element(by.id('who-i-am')).isPresent()).toBe(true);
      expect(content.element(by.css('.book-shell-background')).isPresent()).toBe(true);
      expect(content.element(by.id('what-i-like')).isPresent()).toBe(true);
      expect(content.element(by.css('.desk-parallax-background')).isPresent()).toBe(true);
      expect(content.element(by.id('what-ive-done')).isPresent()).toBe(true);
      expect(content.element(by.css('.flat-parallax-background')).isPresent()).toBe(true);
      expect(content.element(by.id('what-ive-learnt')).isPresent()).toBe(true);
  });


});

