describe('foot', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<foot></foot>');
      scope = $rootScope;
      $compile(elm)(scope);
      scope.$digest();
    });
  });

  it('should contain the wrapper,the buttons and the footers', function() {  
    var footerWrapper = elm.find('#footer-wrapper');
    expect(footerWrapper.length).toBe(1);
    var shareButton = elm.find('#share-button');
    expect(shareButton.length).toBe(1);
      expect(shareButton.attr('size')).toEqual('md');
      expect(shareButton.attr('icon-class')).toEqual('fa fa-fw fa-share-alt fa-2x');
    var toTopButton = elm.find('#to-top-button');
    expect(toTopButton.length).toBe(1);
      expect(toTopButton.attr('size')).toEqual('md');
      expect(toTopButton.attr('icon-class')).toEqual('fa fa-fw fa-chevron-up fa-2x');
    // The footer 
    var footer = elm.find('footer');
    expect(footer.length).toBe(1);
    // Should contain the 2 footers
    var currentSectionMenu = footer.find('#current-section-menu');
    expect(currentSectionMenu.length).toBe(1);
    expect(currentSectionMenu.hasClass('hidden-md hidden-lg')).toBe(true);
    var shareMenu = footer.find('#share-menu');
    expect(shareMenu.length).toBe(1);
  });

});