'use strict';

describe('Daniboomerang - Parallax for all devices', function() {

  /////////////////////////////
  /**** DANIBOOMERANG.COM ****/
  /////////////////////////////

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
    browser.sleep(4000);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.sleep(3000);
  });
  
  //////////////
  // PARALLAX //
  //////////////  

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
   // BE-PARALLAX-IMAGES
    expect(element(by.id('BE-parallax-images')).isPresent()).toBe(true);
    // LOVING-PARALLAX-SECTION
    expect(element(by.id('loving-parallax-section')).isPresent()).toBe(true);
    expect(element(by.id('loving')).isPresent()).toBe(true);
    // FE-PARALLAX-IMAGES
    expect(element(by.id('FE-parallax-images')).isPresent()).toBe(true);
    // WORK-PARALLAX-SECTION
    expect(element(by.id('work-parallax-section')).isPresent()).toBe(true);      
    expect(element(by.id('work')).isPresent()).toBe(true);
    // CONTACT-PARALLAX-SECTION
    expect(element(by.id('contact-parallax-section')).isPresent()).toBe(true);
    expect(element(by.id('contact')).isPresent()).toBe(true);
  });
});

