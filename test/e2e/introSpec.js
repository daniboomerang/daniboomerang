'use strict';

describe('Daniboomerang - Intro scenario for all devices', function() {

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
  });
  

  //////////////////
  // INTRODUCTION //
  //////////////////

  it("should appear the rocket and start the projections)", function() {
    browser.sleep(10000);
    var rocket = element(by.id('alive-svg-rocket'));
    expect(rocket.isPresent()).toBe(true);
  });

  it("should display the button $on(event:rocket-firstProjection)", function() {
    browser.sleep(23000);
    var goButton = element(by.id('go-button'));
    expect(goButton.isPresent()).toBe(true);
    expect(goButton.getAttribute('class')).toMatch('animated fadeIn');
  });
  
  it("should start the app $on(event:rocket-tookoff)", function() {

    browser.sleep(26000);
    var goButton = element(by.id('go-button'));
    expect(goButton.isPresent()).toBe(true);
    expect(goButton.getAttribute('class')).toMatch('animated fadeIn');
    var dboomButtonLink = element.all(by.css('.dboom-button-link')).get(0);
    dboomButtonLink.click();
    browser.sleep(12000);
    var cover = element(by.id('cover'));
    expect(cover.isPresent()).toBe(true);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});

