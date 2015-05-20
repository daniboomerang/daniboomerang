describe('Text Section', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<text-section name="about"></text-section>');
      scope = $rootScope;
      scope.textSectionsHeight = {};
      $compile(elm)(scope);
      scope.$digest();
    });
  });
  it('should be able to render the correct templete throught the atribute name', function() { 
    var about = elm.find('#about');
    expect(about.length).toBe(1);
  });
});
