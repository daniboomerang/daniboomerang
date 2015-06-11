'use strict';

describe('Daniboomerang - common scenario for all devices when on load', function() {

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

  ///////////////////////
  // Parallax sections //
  ///////////////////////  

    it('should have 5 sections', function() {
      var parallax = element(by.id('parallax-wrapper'));
      expect(parallax.isPresent()).toBe(true);
      // COVER-PARALLAX-SECTION
      expect(element(by.id('cover-parallax-section')).isPresent()).toBe(true);
        // Cover
        var cover = element(by.id('cover'));
        expect(cover.isPresent()).toBe(true);
        expect(cover.element(by.id('cover-content')).isPresent()).toBe(true);
        expect(cover.element(by.id('cover-footer')).isPresent()).toBe(true); 
        var coverFooter = cover.element(by.id('cover-footer'));
        expect(coverFooter.element(by.id('scroll-down')).isPresent()).toBe(true);
      // CONNECTIVITY-PARALLAX-IMAGES
      expect(element(by.id('connectivity-parallax-section')).isPresent()).toBe(true);
      // CREATIVITY-PARALLAX-IMAGES
      expect(element(by.id('creativity-parallax-section')).isPresent()).toBe(true);
      // REMOTE-WORKING-PARALLAX-SECTION
      expect(element(by.id('remote-working-parallax-section')).isPresent()).toBe(true);
      // REMOTE-WORKING-PARALLAX-IMAGES
      expect(element(by.id('remote-working-parallax-images')).isPresent()).toBe(true);
      // ABOUT-PARALLAX-SECTION
      expect(element(by.id('about-parallax-section')).isPresent()).toBe(true);
      expect(element(by.id('about')).isPresent()).toBe(true);
      // BE-PARALLAX-SECTION
      expect(element(by.id('BE-parallax-section')).isPresent()).toBe(true);
      // BE-PARALLAX-IMAGES
      expect(element(by.id('BE-parallax-images')).isPresent()).toBe(true);
      // LOVING-PARALLAX-SECTION
      expect(element(by.id('loving-parallax-section')).isPresent()).toBe(true);
      expect(element(by.id('loving')).isPresent()).toBe(true);
      // FE-PARALLAX-SECTION
      expect(element(by.id('FE-parallax-section')).isPresent()).toBe(true);
      // FE-PARALLAX-IMAGES
      expect(element(by.id('FE-parallax-images')).isPresent()).toBe(true);
      // WORK-PARALLAX-SECTION
      expect(element(by.id('work-parallax-section')).isPresent()).toBe(true);      
      expect(element(by.id('work')).isPresent()).toBe(true);
      // CONTACT-PARALLAX-SECTION
      expect(element(by.id('contact-parallax-section')).isPresent()).toBe(true);
      expect(element(by.id('contact')).isPresent()).toBe(true);
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

