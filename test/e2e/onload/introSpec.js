'use strict';

describe('Daniboomerang - common scenario for all devices when on load', function() {

  /////////////////////////////
  /**** DANIBOOMERANG.COM ****/
  /////////////////////////////

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
  });
  

  //////////////////
  // INTRODUCTION //
  //////////////////

  // scope.$on('active-section:cover') 
  it("should append the rocket $on(active-section:cover)", function() {
    browser.sleep(10000);
    var rocket = element(by.id('alive-svg-rocket'));
    expect(rocket.isPresent()).toBe(true);
  });

  // scope.$on('event:rocket-firstProjection')
  it("should display the button $on(event:rocket-firstProjection)", function() {
    browser.sleep(23000);
    var goButton = element(by.id('go-button'));
    expect(goButton.isPresent()).toBe(true);
    expect(goButton.getAttribute('class')).toMatch('animated fadeIn');
  });
  
  // scope.$on('event:rocket-tookoff')
  it("should start the app $on(event:rocket-tookoff)", function() {
    browser.sleep(26000);
    var goButton = element(by.id('go-button'));
    expect(goButton.isPresent()).toBe(true);
    expect(goButton.getAttribute('class')).toMatch('animated fadeIn');
    var dboomButtonLink = element.all(by.css('.dboom-button-link')).get(0);
    dboomButtonLink.click();
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

