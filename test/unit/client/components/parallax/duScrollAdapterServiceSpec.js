'use strict';

describe('Scroll Observer', function() {

	var duScrollAdapterService;
	var $rootScope;

		// Setting up sections into contants
	var SECTIONS = {
	  COVER: 'cover',
	  CONNECTIVITY: 'connectivity',
	  CONNECTIVITY: 'connectivity',
	  CREATIVITY: 'creativity',
	  REMOTE_WORKING: 'remote-working',
	  WITHOUT_BOUNDARIES: 'without-boundaries',
	  ABOUT: 'about',
	  BACK_END: 'back-end',
	  LOVING: 'loving',
	  FRONT_END: 'front-end',
	  WORK: 'work',
	  CONTACT: 'contact'
	};

	// excuted before each "it" is run.
	beforeEach(function (){

		module('parallaxServices');

		// inject services.
		inject(function($injector, _duScrollAdapterService_) {
	 		$rootScope = $injector.get('$rootScope');	   
			duScrollAdapterService = _duScrollAdapterService_;
			spyOn($rootScope, '$broadcast').and.callThrough();
		});
	
	});
    
    // Triggering the scroll active sections
    it('should be listening when a section becomes active to broadcast ', function (){
    	duScrollAdapterService.init(SECTIONS);

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Cover' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:cover');

      	// CONNECTIVITY
		mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:connectivity');

      	// CREATIVITY
		mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:creativity');

      	// REMOTE-WORKING
		mockedElement = angular.element('<a href="#remote-working" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'remote-working' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:remote-working');

    	// ABOUT
		mockedElement = angular.element('<a href="#about" du-smooth-scroll du-scrollspy="about" duration="1000"><span>About&nbsp;&nbsp;</span><i class="fa fa-2x icon-boomerang-solid"></i></a>');
   		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
      	// expected to broadcast section 'About' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:about');

		// BACK-END
		mockedElement = angular.element('<a href="#back-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'back-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:back-end');

      	// LOVING
      	mockedElement = angular.element('<a href="#loving" du-smooth-scroll du-scrollspy="loving" duration="1500"><span>Loving&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-heart"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:loving');  

      	// FRONT-END
		mockedElement = angular.element('<a href="#front-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'front-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:front-end');

      	// WORK
      	mockedElement = angular.element('<a href="#work" du-smooth-scroll du-scrollspy="work" duration="2000"><span>Work&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-suitcase"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:work');

      	// CONTACT
      	mockedElement = angular.element('<a href="#contact" du-smooth-scroll du-scrollspy="contact" duration="2500"><span>Contact&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-weixin"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameActive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:contact');  
    });

	// Triggering the scroll inactive sections
    it('should be listening when a section becomes inactive to broadcast ', function (){ 	
    	duScrollAdapterService.init(SECTIONS);

    	// COVER
		var mockedElement = angular.element('<a class="btn active" href="#cover" du-smooth-scroll="" du-scrollspy="" duration="2500"><i class="fa fa-fw fa-chevron-up fa-lg"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Cover' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:cover');

      	// CONNECTIVITY
		mockedElement = angular.element('<a href="#connectivity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'connectivity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:connectivity');

      	// CREATIVITY
		mockedElement = angular.element('<a href="#creativity" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'creativity' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:creativity');

      	// REMOTE-WORKING
		mockedElement = angular.element('<a href="#remote-working" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'remote-working' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:remote-working');

    	// ABOUT
		mockedElement = angular.element('<a href="#about" du-smooth-scroll du-scrollspy="about" duration="1000"><span>About&nbsp;&nbsp;</span><i class="fa fa-2x icon-boomerang-solid"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'About' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:about');

		// BACK-END
		mockedElement = angular.element('<a href="#back-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'back-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:back-end');

      	// LOVING
      	mockedElement = angular.element('<a href="#loving" du-smooth-scroll du-scrollspy="loving" duration="1500"><span>Loving&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-heart"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:loving');

      	// FRONT-END
		mockedElement = angular.element('<a href="#front-end" du-scrollspy></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'front-end' as active
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:front-end');

      	 // WORK
      	mockedElement = angular.element('<a href="#work" du-smooth-scroll du-scrollspy="work" duration="2000"><span>Work&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-suitcase"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:work');

      	// CONTACT
      	mockedElement = angular.element('<a href="#contact" du-smooth-scroll du-scrollspy="contact" duration="2500"><span>Contact&nbsp;&nbsp;&nbsp;</span><i class="fa fa-2x icon-weixin"></i></a>');
		$rootScope.$broadcast('duScrollspy:becameInactive', mockedElement);
		// expected to broadcast section 'Loving' as inactive
      	expect($rootScope.$broadcast).toHaveBeenCalledWith('inactive-section:contact');  

    });
});   

