describe('Cover', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('daniboomerangDirectives');
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
  
    it('should be listening "event:app-starts" and adds the animated classes to the DOM', function (){ 
		
		$rootScope.$broadcast('app-starts');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('app-starts');

		/* Checking that the directive adds the classes as expected */
		// List elements
		var liElements = elm.find('li.animated');
		expect(liElements.length).toBe(4);
		expect(liElements.hasClass('animated visibility-hidden zoomIn visibility-visible')).toBe(true);
		// Name
		var name = elm.find('#name');
		expect(name.length).toBe(1);
		expect(name.hasClass('animated visibility-hidden fadeIn visibility-visible')).toBe(true);
		// Skills-1
		var skills1 = elm.find('#skills-1');
		expect(skills1.length).toBe(1);
		expect(skills1.hasClass('animated visibility-hidden fadeIn visibility-visible')).toBe(true);
		// Skills-2
		var skills2 = elm.find('#skills-2');
		expect(skills2.length).toBe(1);
		expect(skills2.hasClass('animated visibility-hidden bounceIn visibility-visible')).toBe(true);
		// Scroll-down
		var scrollDownArrow = elm.find('#scroll-down');
		expect(scrollDownArrow.length).toBe(1);
		expect(scrollDownArrow.hasClass('animated visibility-hidden zoomInDown visibility-visible')).toBe(true);
    });	
});