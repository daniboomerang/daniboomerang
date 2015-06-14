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
			elm = angular.element('<div animated-section id="back-end" animated="true" triggeredby="back-end" triggeredon="active" animatedin="zoomIn" animatedout="zoomOut"> <div class="animated-section animated visibility-hidden"></div><div animated-section id="front-end" animated="true" triggeredby="front-end" triggeredon="inactive" animatedin="zoomIn" animatedout="zoomOut"> <div class="animated-section animated visibility-hidden"></div>');
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();
		});
	
	});
    
    //  back-end Active triggeredon active
    it('should be animated when the section becomes active', function (){

		// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('active-section:back-end');
		// expected to broadcast section 'back-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:back-end');

		// The section to animate becomes visible
		expect(animatedSection.hasClass('visibility-visible')).toBe(true);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomIn')).toBe(true);
    });

	// back-end inactive triggeredon active
    it('should be listening when a section becomes inactive', function (){ 	

    	// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('inactive-section:back-end');
		// expected to broadcast section 'back-end' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:back-end');

      	// The section to animate becomes invisible
		expect(animatedSection.hasClass('visibility-visible')).toBe(false);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomOut')).toBe(true);
    });

    // front-end active triggeredon inactive
    it('should be animated when the section becomes inactive', function (){

		// Check that there is a section to animate
    	var animatedSection = elm.find('.animated-section');
		
		$rootScope.$broadcast('inactive-section:front-end');
		// expected to broadcast section 'front-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:front-end');

		// The section to animate becomes visible
		expect(animatedSection.hasClass('visibility-visible')).toBe(true);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomIn')).toBe(true);
    });

	// front-end inactive triggeredon inactive
    it('should be listening when a section becomes inactive', function (){ 	

    	// Check that there is a section to animate
		var animatedSection = elm.find('.animated-section');
		
      	// front-end
		$rootScope.$broadcast('active-section:front-end');
		// expected to broadcast section 'front-end' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:front-end');

      	// The section to animate becomes invisible
		expect(animatedSection.hasClass('visibility-visible')).toBe(false);
		// And has the class that animates it
      	expect(animatedSection.hasClass('zoomOut')).toBe(true);
    });
});   

