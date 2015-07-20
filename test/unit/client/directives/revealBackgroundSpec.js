describe('Reveal background', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('daniboomerangDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile) {

	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element('<reveal-background triggeredby="app-starts" delay="1" height="150%" img="cover-space"></reveal-background>');
			// template: <div class="animated visibility-hidden" style="height:{{height}};
			//			 width: 100%; background-size: 100%; background-repeat: no-repeat;
			//  		 background-image: url({{imgUrl}}); -moz-animation-delay: {{delay}}s;
			//			 -webkit-animation-delay: {{delay}}s; -ms-animation-delay: {{delay}}s;"></div>',
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();

			// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	});
  
    it('should be listening "event:app-starts" and add the animated classes and update the scope with the attrs values', function (){ 
		
		$rootScope.$broadcast('app-starts');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('app-starts');

		/* Checking that the directive adds the expected classes */
		var divClasses = elm.find('.animated.visibility-hidden.fadeIn');
		expect(divClasses.length).toBe(1);
		
		/* Checking that the directive sets the scope correctly */
		expect(elm.isolateScope().delay).toBe('1');
		expect(elm.isolateScope().height).toBe('150%');
		expect(elm.isolateScope().imgUrl).toBe('/images/cover-space.svg');
    });	
});