describe('parallax', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<parallax></parallax>');
      scope = $rootScope;
      $compile(elm)(scope);
      scope.$digest();
    });
  });

  it('should containt its sections', function() {   
    var parallax = elm.find('parallax');
    var about = elm.find('about');
    expect(about.length).toBe(1);
    var loving = elm.find('loving');
    expect(loving.length).toBe(1);
    var work = elm.find('work');
    expect(work.length).toBe(1);
    var contact = elm.find('contact');
    expect(contact.length).toBe(1);
  });
});