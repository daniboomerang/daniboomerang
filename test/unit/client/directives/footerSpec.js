describe('foot', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<foot></foot>');
      scope = $rootScope.$new();
      $compile(elm)(scope);
      scope.$digest();
    });
  });

  it('should contain the left side wrapper and its components', function() {  
    var leftSideWrapper = elm.find('#buttons-left-side-wrapper');
    expect(leftSideWrapper.length).toBe(1);
    expect(leftSideWrapper.attr('class')).toEqual('visibility-hidden');
    
    var cvButton = leftSideWrapper.find('#cv-button');
    expect(cvButton.length).toBe(1);
      expect(cvButton.attr('size')).toEqual('xs');
      
    var shareButton = leftSideWrapper.find('#share-button');
    expect(shareButton.length).toBe(1);
      expect(shareButton.attr('size')).toEqual('xs');
      expect(shareButton.attr('icon-class')).toEqual('fa fa-fw fa-share-alt fa-lg');
  });

  it('should contain the right side wrapper and its components', function() {  
    var rightSideWrapper = elm.find('#buttons-right-side-wrapper');
    expect(rightSideWrapper.length).toBe(1);
    expect(rightSideWrapper.attr('class')).toEqual('visibility-hidden');
    var nextUpButton = rightSideWrapper.find('#next-up-button');
    
    expect(nextUpButton.length).toBe(1);
      expect(nextUpButton.attr('size')).toEqual('xs');
      expect(nextUpButton.attr('icon-class')).toEqual('fa fa-fw fa-chevron-up');
    
    var currentSectionWrapper = elm.find('#current-section-wrapper')

    var nextDownButton = rightSideWrapper.find('#next-down-button');
    expect(nextDownButton.length).toBe(1);
      expect(nextDownButton.attr('size')).toEqual('xs');
      expect(nextDownButton.attr('icon-class')).toEqual('fa fa-fw fa-chevron-down');
  });

  it('should contain the share menu wrapper and its components', function(){
    var shareMenuWrapper = elm.find('#share-menu-wrapper');
    expect(shareMenuWrapper.length).toBe(1);
    expect(shareMenuWrapper.attr('class')).toEqual('visibility-hidden');
  });

  it('should show the right side wrapper and its components when we enter to about', function() {  
    
    // Spying on the broadcasting to test if we listen the events correctly
    spyOn(scope, '$broadcast').and.callThrough();
    scope.$broadcast('active-section:about');
    expect(scope.$broadcast).toHaveBeenCalledWith('active-section:about');

    // LEFT SIDE
    var rightSideWrapper = elm.find('#buttons-right-side-wrapper');
    expect(rightSideWrapper.length).toBe(1);
    expect(rightSideWrapper.attr('class')).toEqual('animated bounceInUp');

      var nextUpButtonWrapper = rightSideWrapper.find('#to-next-up-button-wrapper');
      expect(nextUpButtonWrapper.length).toBe(1);
      expect(nextUpButtonWrapper.attr('class')).toEqual('animated bounceInRight');
    
      var currentSectionWrapper = elm.find('#current-section-wrapper');
      expect(currentSectionWrapper.length).toBe(1);
      expect(currentSectionWrapper.attr('class')).toEqual('animated fadeIn');
      expect(currentSectionWrapper.text().trim()).toEqual('ABOUT');

      var nextDownButtonWrapper = rightSideWrapper.find('#to-next-down-button-wrapper');
      expect(nextDownButtonWrapper.length).toBe(1);
      expect(nextDownButtonWrapper.attr('class')).toEqual('animated bounceInUp');

    // RIGHT SIDE
    var leftSideWrapper = elm.find('#buttons-left-side-wrapper');
    expect(leftSideWrapper.length).toBe(1);
    expect(leftSideWrapper.attr('class')).toEqual('animated bounceInUp');

      var cvButtonWrapper = leftSideWrapper.find('#cv-button-wrapper');
      expect(cvButtonWrapper.length).toBe(1);
      expect(cvButtonWrapper.attr('class')).toEqual('animated bounceInLeft');

      var shareButtonWrapper = leftSideWrapper.find('#share-button-wrapper');
      expect(shareButtonWrapper.length).toBe(1);
      expect(shareButtonWrapper.attr('class')).toEqual('animated bounceInUp');

    // SHARE MENU
    var shareMenuWrapper = elm.find('#share-menu-wrapper');
    expect(shareMenuWrapper.length).toBe(1);
    expect(shareMenuWrapper.attr('class')).toEqual('visibility-hidden');

  });

  it('should show the share menu and its components when we click the share button', function() {  

    var shareMenuWrapper = elm.find('#share-menu-wrapper');
    expect(shareMenuWrapper.length).toBe(1);
    expect(shareMenuWrapper.attr('class')).toEqual('visibility-hidden');

    // Getting the isolated scope
    var isolateScope = elm.isolateScope();
    
    // Toogling the share menu shows it
    isolateScope.toogleShareMenu();
    expect(shareMenuWrapper.attr('class')).toEqual('animated fadeInUp');

    // Toogling the share menu hides it
    isolateScope.toogleShareMenu();
    expect(shareMenuWrapper.attr('class')).toEqual('animated fadeOutDown');
  });

});