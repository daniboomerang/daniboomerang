'use strict';

describe('Daniboomerang Scenarios', function() {

  /*
  var ptor= protractor.getInstance();
  beforeEach(function() {
          ptor.get('/');
  });
  
  browser.driver.manage().window().setSize(1280, 800);

  // The responsive sidebar menu
  it("should show the sidebar menu", function() {
      var sidebarResponsiveDiv = 'sidebar-wrapper-responsive';  
      expect(element(by.id(sidebarResponsiveDiv)).isDisplayed()).toBe(false);
  });

  // The sidebar menu
  it("should not show the sidebar menu", function() {
      var sidebarDiv = 'sidebar-wrapper';  
      expect(element(by.id(sidebarDiv)).isDisplayed()).toBe(true);
  });

  it('should have 6 sections', function() {
    var sectionsDataLength = element.all(by.repeater('section in sidebar.sectionsData'));
    expect(sectionsDataLength.count()).toEqual(6);
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

    // The sidebar menu
    it("should show correctly show section 'Who I am'", function() {
      var section = element(by.repeater('section in sidebar.sectionsData').row(0).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
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

     // The sidebar menu
    it("should show correctly show section 'What I like'", function() {
      var section = element(by.repeater('section in sidebar.sectionsData').row(1).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
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

    // The sidebar menu
    it("should show correctly show section 'What I've done'", function() {
      var section = element(by.repeater('section in sidebar.sectionsData').row(2).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
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

    // The sidebar menu
    it("should show correctly show section 'What I've learnt'", function() {
      var section = element(by.repeater('section in sidebar.sectionsData').row(3).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
    });

  });*/

});

