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
    var coverSection = elm.find('#cover-parallax-section');
    expect(coverSection.length).toBe(1);
    var coverImages = elm.find('#cover-parallax-images');
    expect(coverImages.length).toBe(1);
    var aboutSection = elm.find('#about-parallax-section');
    expect(aboutSection.length).toBe(1);
    var BEImages = elm.find('#BE-parallax-images');
    expect(BEImages.length).toBe(1);
    var lovingSection = elm.find('#loving-parallax-section');
    expect(lovingSection.length).toBe(1);
    var FEImages = elm.find('#FE-parallax-images');
    expect(FEImages.length).toBe(1);
    var workSection = elm.find('#work-parallax-section');
    expect(workSection.length).toBe(1);
    var contactSection = elm.find('#contact-parallax-section');
    expect(contactSection.length).toBe(1);
  });
});