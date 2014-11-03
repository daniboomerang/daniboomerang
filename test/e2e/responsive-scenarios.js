'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md 

describe('Daniboomerang Responsive Scenarios', function() {

  browser.get('index.html');

  it('should automatically redirect to /whoIAm when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/whoIAm");
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
      var section = element(by.repeater('section in sidebar.sections').row(0).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
    });

    // The responsive sidebar menu
    it("should show correctly show image for 'Who I am: The boomerang", function() {
      var section = element(by.repeater('section in sidebar.sections').row(0).column('sectionImg'));
      var sectionImgPath = '/images/boomerang-white-24.svg '
      expect(section.getText()).toEqual(sectionImgPath);
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
      var section = element(by.repeater('section in sidebar.sections').row(1).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
    });

    // The responsive sidebar menu
    it("should show correctly show image for 'What I like': The Heart", function() {
      var section = element(by.repeater('section in sidebar.sections').row(1).column('sectionImg'));
      var sectionImgPath = '/images/heart-24.png'
      expect(section.getText()).toEqual(sectionImgPath);
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
      var section = element(by.repeater('section in sidebar.sections').row(2).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
    });

    // The responsive sidebar menu
    it("should show correctly show image for 'What I've done': Github", function() {
      var section = element(by.repeater('section in sidebar.sections').row(2).column('sectionImg'));
      var sectionImgPath = '/images/github-24.png'
      expect(section.getText()).toEqual(sectionImgPath);
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
      var section = element(by.repeater('section in sidebar.sections').row(3).column('section'));
      var sectionWith4spaces = currentSectionName + '    ';
      expect(section.getText()).toEqual(sectionWith4spaces);
    });

    // The responsive sidebar menu
    it("should show correctly show image for 'What I've learnt': The CV", function() {
      var section = element(by.repeater('section in sidebar.sections').row(3).column('sectionImg'));
      var sectionImgPath = '/images/cv-24.png'
      expect(section.getText()).toEqual(sectionImgPath);
    });

  });

}); */
