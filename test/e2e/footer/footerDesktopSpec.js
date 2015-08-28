'use strict';

describe('Daniboomerang - footer scenario for desktop devices', function() {

  /////////////////////////////////////
  /**** DANIBOOMERANG.COM - /#/cover */
  /////////////////////////////////////

  beforeEach(function() {
    browser.get('/');
    browser.ignoreSynchronization = true;
    browser.sleep(3000);
    browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    browser.sleep(2000);
  });

  it('should scroll to cover section', function() {
    expect(browser.getCurrentUrl()).toContain('/#/cover');
  });

  ////////////////  
  // The Footer //
  //////////////// 

  it("should not be revealed until we are in a setion that is not the Cover", function() {

      // There is the footer directive correctly rendered
      var footer = element(by.tagName('footer'));
      expect(footer.isPresent()).toBe(true);
      var footerWrapper = element(by.id('footer-wrapper'));
      expect(footerWrapper.isPresent()).toBe(true);

      // It is not revealed (cover section)
      expect(footer.element(by.css('.expand-small')).isPresent()).toBe(false);
        
      // It is revealed when whe scroll down to any section
        // Go to the last section
        var lastSection = element(by.id('contact'));
        browser.driver.executeScript("arguments[0].scrollIntoView(true);", lastSection.getWebElement());
        browser.sleep(1000);
        expect(footer.element(by.css('.expand-big')).isPresent()).toBe(false);

        // Footer Menus are correctly displayed
        var currentSectionMenu = footer.element(by.id('current-section-menu'));
        expect(currentSectionMenu.isDisplayed()).toBe(false);
        expect(footer.element(by.id('share-menu')).isDisplayed()).toBe(false);

  });

  it("should behave properly: Shows and hides the sharing footer when the sharing button is clicked", function() {
      var footerWrapper = element(by.id('footer-wrapper'));
      var footer = footerWrapper.element(by.tagName('footer'));

      // Go to the last section
      var lastSection = element(by.id('contact'));
      browser.driver.executeScript("arguments[0].scrollIntoView(true);", lastSection.getWebElement());
      browser.sleep(1000);

      // Footer Menus are correctly displayed
      var currentSectionMenu = footer.element(by.id('current-section-menu'));
      expect(currentSectionMenu.isDisplayed()).toBe(false);
      var shareMenu = footer.element(by.id('share-menu'));
      expect(shareMenu.isDisplayed()).toBe(false);

      // Lets click on share button
      var shareButton = footerWrapper.element(by.id('share-button'));
      expect(shareButton.isPresent()).toBe(true);
      var shareButtonLink = shareButton.element(by.css('.dboom-button-link'));
      expect(shareButtonLink.isPresent()).toBe(true);
      shareButtonLink.click();
      browser.sleep(1000);
      expect(currentSectionMenu.isDisplayed()).toBe(false);
      expect(shareMenu.isDisplayed()).toBe(true);
      shareButtonLink.click();
      browser.sleep(1000);
      expect(currentSectionMenu.isDisplayed()).toBe(false);
      expect(shareMenu.isDisplayed()).toBe(false);

      // Lets click on 'to top button'
      var toTopButton = footerWrapper.element(by.id('to-top-button'));
      expect(toTopButton.isPresent()).toBe(true);
      var toTopButtonLink = toTopButton.element(by.css('.dboom-button-link'));
      expect(toTopButtonLink.isPresent()).toBe(true);
      toTopButtonLink.click();
      browser.sleep(4000);
      // it scrolls to the Cover (check url)
      expect(browser.getCurrentUrl()).toContain('/#/cover');

  });

});

