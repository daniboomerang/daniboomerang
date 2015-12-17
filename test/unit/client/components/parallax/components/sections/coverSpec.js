describe('Cover', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('sectionsDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile) {

	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element('<cover></cover>');
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();

			// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	});
  
    it('should add the animated classes to the DOM', function (){ 

		/* Checking that the directive adds the classes as expected */
		// List elements
		var liElements = elm.find('li.animated');
		expect(liElements.length).toBe(4);
		expect(liElements.hasClass('animated zoomIn')).toBe(true);
		// Name
		var name = elm.find('#name');
		expect(name.length).toBe(1);
		expect(name.hasClass('animated fadeIn')).toBe(true);
		// Skills-1
		var skills1 = elm.find('#skills-1');
		expect(skills1.length).toBe(1);
		expect(skills1.hasClass('animated fadeIn')).toBe(true);
		// Skills-2
		var skills2 = elm.find('#skills-2');
		expect(skills2.length).toBe(1);
		expect(skills2.hasClass('animated bounceIn')).toBe(true);
		// Scroll-down
		var scrollDownArrow = elm.find('#scroll-down');
		expect(scrollDownArrow.length).toBe(1);
		expect(scrollDownArrow.hasClass('animated zoomInDown')).toBe(true);
    });	
});