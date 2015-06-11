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
			elm = angular.element('<div animated-section id="BESide" animated="true" triggeredby="BESide" triggeredon="active" animatedin="zoomIn" animatedout="zoomOut"> <div class="animated-section animated visibility-hidden"></div><div animated-section id="FESide" animated="true" triggeredby="FESide" triggeredon="inactive" animatedin="zoomIn" animatedout="zoomOut"> <div class="animated-section animated visibility-hidden"></div>');
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();
		});
	
	});
    
    //  BESide Active triggeredon active
    it('should be animated when the section becomes active', function (){

		// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('event:activeArea', 'BESide');
		// expected to broadcast section 'BESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'BESide');

		// The section to animate becomes visible
		expect(animatedSection.hasClass('visibility-visible')).toBe(true);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomIn')).toBe(true);
    });

	// BESide inactive triggeredon active
    it('should be listening when a section becomes inactive', function (){ 	

    	// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('event:inactiveArea', 'BESide');
		// expected to broadcast section 'BESide' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'BESide');

      	// The section to animate becomes invisible
		expect(animatedSection.hasClass('visibility-visible')).toBe(false);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomOut')).toBe(true);
    });

    // FESide active triggeredon inactive
    it('should be animated when the section becomes inactive', function (){

		// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('event:inactiveArea', 'FESide');
		// expected to broadcast section 'FESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'FESide');

		// The section to animate becomes visible
		expect(animatedSection.hasClass('visibility-visible')).toBe(true);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomIn')).toBe(true);
    });

	// FESide inactive triggeredon inactive
    it('should be listening when a section becomes inactive', function (){ 	

    	// Check that there is a section to animate
		var animatedSection = elm.find('.animated-section');
		
      	// FESide
		$rootScope.$broadcast('event:activeArea', 'FESide');
		// expected to broadcast section 'FESide' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'FESide');

      	// The section to animate becomes invisible
		expect(animatedSection.hasClass('visibility-visible')).toBe(false);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomOut')).toBe(true);
    });
});   

