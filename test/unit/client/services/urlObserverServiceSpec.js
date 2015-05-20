'use strict';

describe('Scroll Observer', function() {

	var urlObserverService;
	var $rootScope;
	var $location;

	beforeEach(function (){
		module('daniboomerangServices');

		// inject services.
		inject(function($injector, _urlObserverService_) {
	 		$rootScope = $injector.get('$rootScope');	   
	 		$location = $injector.get('$location');
			urlObserverService = _urlObserverService_;
			spyOn($rootScope, '$broadcast').and.callThrough();
		});	
	});
    
    // Triggering the scroll active and inactive sections
    it('should be listening when cover becomes active to broadcast ', function (){
    	urlObserverService.init();
 		$location.path('/whatever');
    	$rootScope.$digest();
    	expect($location.path()).toBe('/');
    });
});   

