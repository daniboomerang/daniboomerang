'use strict';

describe('Daniboomerang - common scenario for all devices when on load', function() {

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
        
      // CONTENT
        expect(cover.element(by.id('cover-content')).isPresent()).toBe(true);
      
      // FOOTER
        expect(cover.element(by.id('cover-footer')).isPresent()).toBe(true); 
        var coverFooter = cover.element(by.id('cover-footer'));
        expect(coverFooter.element(by.id('scroll-down')).isPresent()).toBe(true);

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
      expect(sections.element(by.id('about')).isPresent()).toBe(true);
      expect(sections.element(by.css('.bookshell-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('loving')).isPresent()).toBe(true);
      expect(sections.element(by.css('.desk-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('work')).isPresent()).toBe(true);
      expect(sections.element(by.css('.floor-parallax-background')).isPresent()).toBe(true);
      expect(sections.element(by.id('contact')).isPresent()).toBe(true);
  });

  ////////////////  
  // The Footer //
  //////////////// 

  it("should have its elements present, but shouldn´t be revealed", function() {
      var footerWrapper = element(by.id('footer-wrapper'));
      expect(footerWrapper.isPresent()).toBe(true);
      expect(footerWrapper.element(by.css('.reveal')).isPresent()).toBe(false);
      var footer = footerWrapper.element(by.tagName('footer'));  
      expect(footer.isPresent()).toBe(true);    
      var shareButton = element(by.id('share-button'));
      expect(shareButton.isPresent()).toBe(true);
      var toTopButton = element(by.id('to-top-button'));
      expect(toTopButton.isPresent()).toBe(true);
  });
});

