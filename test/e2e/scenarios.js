'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('daniboomerangApp', function() {

  browser.get('index.html');

  it('should automatically redirect to /whoIAm when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/whoIAm");
  });


  describe('whoIAm', function() {

    beforeEach(function() {
      browser.get('/whoIAm');
    });

    it('should render whoIAm when user navigates to /whoIAm', function() {
      expect(element(by.id('who-i-am')).isPresent()).toBe(true);
    });

  });

  describe('whatILike', function() {

    beforeEach(function() {
      browser.get('/whatILike');
    });

    it('should render whatILike when user navigates to /whatILike', function() {
      expect(element(by.id('what-i-like')).isPresent()).toBe(true);
    });

  });

  describe('whatIveDone', function() {

    beforeEach(function() {
      browser.get('/whatIveDone');
    });

    it('should render whatIveDone when user navigates to /whatIveDone', function() {
      expect(element(by.id('what-ive-done')).isPresent()).toBe(true);
    });

  });

  describe('whatIveLearnt', function() {

    beforeEach(function() {
      browser.get('/whatIveLearnt');
    });

    it('should render whatIveLearnt when user navigates to /whatIveLearnt', function() {
      expect(element(by.id('what-ive-learnt')).isPresent()).toBe(true);
    });

  });

});
