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
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'Cover');

      	// CONNECTIVITY
		var mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'connectivity');

      	// CREATIVITY
		var mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'creativity');

      	// REMOTE-WORKING
		var mockedElement = angular.element('<a href="#remoteWorking" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'remoteWorking' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'remoteWorking');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
   		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
      	// expected to broadcast section 'About' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'About');

		// BESIDE
		var mockedElement = angular.element('<a href="#BESide" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'BESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'BESide');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'Loving');  

      	// FESIDE
		var mockedElement = angular.element('<a href="#FESide" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'FESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'FESide');    
    });

	// Triggering the scroll inactive sections
    it('should be listening when a section becomes inactive to broadcast ', function (){ 	
    	scrollObserverService.init();

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Cover' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'Cover');

      	// CONNECTIVITY
		var mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'connectivity');

      	// CREATIVITY
		var mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'creativity');

      	// REMOTE-WORKING
		var mockedElement = angular.element('<a href="#remoteWorking" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'remoteWorking' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'remoteWorking');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'About' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'About');

		// BESIDE
		var mockedElement = angular.element('<a href="#BESide" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'BESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'BESide');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'Loving');

      	// FESIDE
		var mockedElement = angular.element('<a href="#FESide" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'FESide' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'FESide');    
    });
});   

