describe('content', function() {
  
  var elm, scope;

  beforeEach(function (){

    module('daniboomerangDirectives');
    module('duScroll');
    module('htmlTemplates');
  
    inject(function($rootScope, $compile) {
      elm = angular.element('<content></content>');
      scope = $rootScope;
      $compile(elm)(scope);
      scope.$digest();
    });
  });

  it('should containt its sections', function() {   
    var content = elm.find('content');
    var whoIAm = elm.find('who-i-am');
    expect(whoIAm.length).toBe(1);
    var whatILike = elm.find('what-i-like');
    expect(whatILike.length).toBe(1);
    var whatIveDone = elm.find('what-ive-done');
    expect(whatIveDone.length).toBe(1);
    var whatIveLearnt = elm.find('what-ive-learnt');
    expect(whatIveLearnt.length).toBe(1);
  });
});