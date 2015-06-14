'use strict';

describe('Scroll Observer', function() {

	var scrollObserverService;
	var $rootScope;

	// excuted before each "it" is run.
	beforeEach(function (){

		module('daniboomerangServices');

		// inject services.
		inject(function($injector, _scrollObserverService_) {
	 		$rootScope = $injector.get('$rootScope');	   
			scrollObserverService = _scrollObserverService_;
			spyOn($rootScope, '$broadcast').and.callThrough();
		});
	
	});
    
    // Triggering the scroll active sections
    it('should be listening when a section becomes active to broadcast ', function (){
    	scrollObserverService.init();

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Cover' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:cover');

      	// CONNECTIVITY
		var mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:connectivity');

      	// CREATIVITY
		var mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:creativity');

      	// REMOTE-WORKING
		var mockedElement = angular.element('<a href="#remote-working" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'remote-working' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:remote-working');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
   		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
      	// expected to broadcast section 'About' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:about');

		// BACK-END
		var mockedElement = angular.element('<a href="#back-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'back-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:back-end');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:loving');  

      	// FRONT-END
		var mockedElement = angular.element('<a href="#front-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'front-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:front-end');    
    });

	// Triggering the scroll inactive sections
    it('should be listening when a section becomes inactive to broadcast ', function (){ 	
    	scrollObserverService.init();

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Cover' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:cover');

      	// CONNECTIVITY
		var mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:connectivity');

      	// CREATIVITY
		var mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:creativity');

      	// REMOTE-WORKING
		var mockedElement = angular.element('<a href="#remote-working" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'remote-working' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:remote-working');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'About' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:about');

		// BACK-END
		var mockedElement = angular.element('<a href="#back-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'back-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:back-end');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:loving');

      	// FRONT-END
		var mockedElement = angular.element('<a href="#front-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'front-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:front-end');  
    });
});   

