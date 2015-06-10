'use strict';

describe('Animated Section', function() {

	var elm, scope, $rootScope;

	// excuted before each "it" is run.
	beforeEach(function (){

		module('daniboomerangDirectives');
		module('htmlTemplates');

		// inject services.
		inject(function($injector, $compile) {
	 		$rootScope = $injector.get('$rootScope');	   
			spyOn($rootScope, '$broadcast').and.callThrough();
			elm = angular.element('<div animated-section id="BESide" animated="true" triggeredby="BESide" animatedin="zoomIn" animatedout="zoomOut"> <div class="animated-section animated visibility-hidden"></div>');
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();
		});
	
	});
    
    // Triggering the scroll active sections
    it('should be animated when the section becomes active to broadcast ', function (){

    	// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		expect(animatedSection.length).toBe(1);
		
		// BESide
		$rootScope.$broadcast('event:activeArea', 'BESide');
		// expected to broadcast section 'BESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'BESide');

		// The section to animate becomes visible
		expect(animatedSection.hasClass('visibility-visible')).toBe(true);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomIn')).toBe(true);
    });

	// Triggering the scroll inactive sections
    it('should be listening when a section becomes inactive to broadcast ', function (){ 	

    	// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		expect(animatedSection.length).toBe(1);
		
      	// BESide
		$rootScope.$broadcast('event:inactiveArea', 'BESide');
		// expected to broadcast section 'BESide' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'BESide');

      	// The section to animate becomes invisible
		expect(animatedSection.hasClass('visibility-visible')).toBe(false);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomOut')).toBe(true);
    });
});   

