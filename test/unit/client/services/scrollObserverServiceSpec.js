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
    
    // Triggering the scroll active and inactive sections
    it('should be listening when about becomes active to broadcast ', function (){
    	scrollObserverService.init();

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Cover' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'Cover');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
   		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
      	// expected to broadcast section 'About' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'About');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', 'Loving');      
    });

	// Triggering the scroll inactive sections
    it('should be listening when about becomes inactive to broadcast ', function (){ 	
    	scrollObserverService.init();

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Cover' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'Cover');

    	// ABOUT
		var mockedElement = angular.element('<a id="about-link" href="#about" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="about-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'About' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'About');

      	// LOVING
      	mockedElement = angular.element('<a id="loving-link" href="#loving" du-smooth-scroll="" du-scrollspy="" duration="2500" class="active"><span class="hidden-sm hidden-xs hidden-xxs hidden-tn">About&nbsp;&nbsp;</span><i id="loving-icon" class="fa fa-fw fa-2x icon-dboom"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', 'Loving');
    });
});   

