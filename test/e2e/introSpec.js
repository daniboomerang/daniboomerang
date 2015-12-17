'use strict';

describe('Daniboomerang - common scenario for all devices at the introduction state', function() {

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
  it("should appear the rocket and start the projections)", function() {
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

});

