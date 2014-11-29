'use strict';

/*https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('Daniboomerang Responsive Scenarios', function() {

  var ptor= protractor.getInstance();
  beforeEach(function() {
          ptor.get('/');
  });
  
  browser.driver.manage().window().setSize(676, 800);

  // The responsive sidebar menu
  it("should show the sidebar menu", function() {
      var sidebarRespDiv = 'sidebar-wrapper-responsive';  
      expect(element(by.id(sidebarRespDiv)).isDisplayed()).toBe(true);
  });

  // The  sidebar menu
  it("should not show the sidebar menu", function() {
      var sidebarDiv = 'sidebar-wrapper';  
      expect(element(by.id(sidebarDiv)).isDisplayed()).toBe(false);
  });

  it('should have 6 sections', function() {
    var sectionsDataLength = element.all(by.repeater('section in sidebarResp.sectionsData'));
    expect(sectionsDataLength.count()).toEqual(6);
  });

  it('should to correctly toggle the sidebar menu when responsive button on navbar is clicked', function(){
    var sidebarRespDiv = 'sidebar-wrapper-responsive';  
    element( by.css('[ng-click="toggleSidebarMenu()"]') ).click();
    expect(element(by.id(sidebarRespDiv)).getAttribute('class')).toMatch('ng-hide');
    element( by.css('[ng-click="toggleSidebarMenu()"]') ).click();
    expect(element(by.id(sidebarRespDiv)).getAttribute('class')).not.toMatch('ng-hide');
  });

  // TOPNAVBAR GLOBAL DIVS
  var currentSectionBind = 'currentSection';
  var currentSectionDiv = 'current-section';  

  describe('whoIAm', function() {

    // Topnavbar
    var currentSectionName = 'Who I am';

    // Content
    var whoIAmDiv ='who-i-am';

    beforeEach(function() {
      browser.get('/whoIAm');
    });

    // The navbar top
    it('should render the current section at navbar top when user navigates to /whoIAm', function() {
      expect(element(by.id(currentSectionDiv)).isPresent()).toBe(true);
      var currentSection = element(by.binding(currentSectionBind));
      expect(currentSection.getText()).toEqual(currentSectionName);
    });

    // The main content
    it('should render whoIAm at the content when user navigates to /whoIAm', function() {
      expect(element(by.id(whoIAmDiv)).isPresent()).toBe(true);
    });

  });

  describe('whatILike', function() {

    // Topnavbar
    var currentSectionName  = 'What I like';

    // Content
    var whatILikeDiv ='what-i-like';

    beforeEach(function() {
      browser.get('/whatILike');
    });

    // The navbar top
    it('should render the current section at navbar top when user navigates to /whatILike', function() {
      expect(element(by.id(currentSectionDiv)).isPresent()).toBe(true);
      var currentSection = element(by.binding(currentSectionBind));
      expect(currentSection.getText()).toEqual(currentSectionName);
    });

    // The main content
    it('should render whatILike at page content when user navigates to /whatILike', function() {
      expect(element(by.id(whatILikeDiv)).isPresent()).toBe(true);
    });

  });

  describe('whatIveDone', function() {

    // Topnavbar
    var currentSectionName  = "What I've done";

    // Content
    var whatIveDoneDiv ='what-ive-done';

    beforeEach(function() {
      browser.get('/whatIveDone');
    });

    // The navbar top
    it('should render the current section at the navbar top when user navigates to /whatIveDone', function() {
      expect(element(by.id(currentSectionDiv)).isPresent()).toBe(true);
      var currentSection = element(by.binding(currentSectionBind));
      expect(currentSection.getText()).toEqual(currentSectionName);
    });

    // The main content
    it('should render whatIveDone at page content when user navigates to /whatIveDone', function() {
      expect(element(by.id(whatIveDoneDiv)).isPresent()).toBe(true);
    });

  });

  describe('whatIveLearnt', function() {
    
    // Topnavbar
    var currentSectionName  = "What I've learnt";

    // Content
    var whatIveLearntDiv ='what-ive-learnt';

    beforeEach(function() {
      browser.get('/whatIveLearnt');
    });

    // The navbar top
    it('should render the current section at the navbar top when user navigates to /whatIveDone', function() {
      expect(element(by.id(currentSectionDiv)).isPresent()).toBe(true);
      var currentSection = element(by.binding(currentSectionBind));
      expect(currentSection.getText()).toEqual(currentSectionName);
    });

    it('should render whatIveLearnt when user navigates to /whatIveLearnt', function() {
      expect(element(by.id(whatIveLearntDiv)).isPresent()).toBe(true);
    });

  });
 
});
