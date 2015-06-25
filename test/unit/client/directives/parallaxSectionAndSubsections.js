describe('Parallax section and subsection', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<div parallax ng-style="{\'height\': dynamicSectionsHeight.about}"><parallax-subsection name="about" type="text-only"></parallax-subsection></div>');
      scope = $rootScope;
      $compile(elm)(scope);
      scope.$digest();
    });
  });
  it('should be able to render the correct templete throught the atribute name', function() { 
    var about = elm.find('#about');
    expect(about.length).toBe(1);
    /* CANT`T test that the dynamicSectionsHeight.about is actually updated. */
    /* First the Unit Test, the expresion element.find('#' + section); returns an array, so the moment we use sectionId.prop('offsetHeight'); to calculate the height
    /* doesn´t work */
    /* Second even debugging the test and playing with variables I can´t manage to retreive the height */
  });
});