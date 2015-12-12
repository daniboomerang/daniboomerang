'use strict';

var parallax = angular.module('parallax', [
	// VENDOR
	'duScroll',
	// PARALLAX
	'parallaxDirectives',
	// COMPONENTS
	'sections',
	'aliveSvgs'
]);

// Setting up Url into constant
parallax.constant('PARALLAX_BASE_URL', '/components/parallax/');
// Setting up sections into contants
parallax.constant('SECTIONS', {
	COVER: 'cover',
	CONNECTIVITY: 'connectivity',
	CONNECTIVITY: 'connectivity',
	CREATIVITY: 'creativity',
	REMOTE_WORKING: 'remote-working',
	WITHOUT_BOUNDARIES: 'without-boundaries',
	ABOUT: 'about',
	BACK_END: 'back-end',
	LOVING: 'loving',
	FRON_END: 'front-end',
	WORK: 'work',
	CONTACT: 'contact'
});
parallax.config(function($stateProvider) {

	// Example of using function rule as param
    /*$urlRouterProvider.otherwise(function($injector, $location){
       var section = $location.path().replace('/', '');
       if (!((section == SECTIONS.COVER) || (section == SECTIONS.CONNECTIVITY) || (section == SECTIONS.CREATIVITY)
        || (section == SECTIONS.REMOTE_WORKING) || (section == SECTIONS.WITHOUT_BOUNDARIES) || (section == SECTIONS.ABOUT) || (section == SECTIONS.BACK_END)
        || (section == SECTIONS.LOVING) || (section == SECTIONS.FRON_END) || (section == SECTIONS.ABOUT))) {
       	$location.path('/');
       }
    });*/

	$stateProvider

    //////////////////////////
	// State Configurations //
	//////////////////////////
    
    .state('parallax', {
    	url: '/',
        template: '<parallax></parallax><foot></foot>',
    })
});

parallax.value('duScrollEasing', function easingFunction(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t });
parallax.run(function($rootScope, $location, SECTIONS) {
    
    var previousSection = 'cover'; // This will helps us to know the direction from
								   // where we are entering to a section 
    $rootScope.$on('duScrollspy:becameActive', function($event, $element){
		var hash = $element.prop('hash');
		if(hash) {
			var section = hash.replace('#', '');
			//Automaticly update location
			$location.path(section);
			$rootScope.$apply();
			if (SECTIONS.COVER == hash.substr(1)){
				$rootScope.$broadcast('active-section:cover');
				$rootScope.$broadcast('active-section:text');
			}
			if (SECTIONS.CONNECTIVITY == hash.substr(1)){
				$rootScope.$broadcast('active-section:connectivity');
				//if (previousSection == 'creativity') { $rootScope.$broadcast('active-section:connectivity-fromBottom'); }
				$rootScope.$broadcast('active-section:text');
			}
			if (SECTIONS.CREATIVITY == hash.substr(1)){ 
				$rootScope.$broadcast('active-section:creativity');
				if (previousSection == 'connectivity') { $rootScope.$broadcast('active-section:creativity-fromTop'); }
			 }
			if (SECTIONS.REMOTE_WORKING == hash.substr(1)){ $rootScope.$broadcast('active-section:remote-working'); }
			if (SECTIONS.WITHOUT_BOUNDARIES == hash.substr(1)){
				$rootScope.$broadcast('active-section:without-boundaries');
				if (previousSection == 'about') { $rootScope.$broadcast('active-section:without-boundaries-fromBottom'); }
			}
	        if (SECTIONS.ABOUT == hash.substr(1)){
	        	$rootScope.$broadcast('active-section:about');
	        	$rootScope.$broadcast('active-section:text');
				//if (previousSection == 'without-boundaries') { $rootScope.$broadcast('active-section:about-fromTop'); }
	        }
			if (SECTIONS.BACK_END == hash.substr(1)){ $rootScope.$broadcast('active-section:back-end'); }
	        if (SECTIONS.LOVING == hash.substr(1)){ 
	        	$rootScope.$broadcast('active-section:loving');
	        	$rootScope.$broadcast('active-section:text');
	        }
			if (SECTIONS.FRON_END == hash.substr(1)){ $rootScope.$broadcast('active-section:front-end'); }
	        if (SECTIONS.WORK == hash.substr(1)){ 
	        	$rootScope.$broadcast('active-section:work');
	        	$rootScope.$broadcast('active-section:text');
	        	//if (previousSection == 'contact') { $rootScope.$broadcast('active-section:work-fromBottom'); }
	        }
	        if (SECTIONS.CONTACT == hash.substr(1)){ 
	        	$rootScope.$broadcast('active-section:contact');
	        	$rootScope.$broadcast('active-section:text');
	        }			        
		}
	});
	$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
	    var hash = $element.prop('hash');
	    if (SECTIONS.COVER == hash.substr(1)){ $rootScope.$broadcast('inactive-section:cover'); }
	    if (SECTIONS.CONNECTIVITY == hash.substr(1)){ $rootScope.$broadcast('inactive-section:connectivity'); }
	    if (SECTIONS.CREATIVITY == hash.substr(1)){ $rootScope.$broadcast('inactive-section:creativity'); }
	    if (SECTIONS.REMOTE_WORKING == hash.substr(1)){ $rootScope.$broadcast('inactive-section:remote-working'); }
	    if (SECTIONS.WITHOUT_BOUNDARIES == hash.substr(1)){ $rootScope.$broadcast('inactive-section:without-boundaries'); }
	    if (SECTIONS.ABOUT == hash.substr(1)){ $rootScope.$broadcast('inactive-section:about'); }
	    if (SECTIONS.BACK_END == hash.substr(1)){ $rootScope.$broadcast('inactive-section:back-end'); }
	    if (SECTIONS.LOVING == hash.substr(1)){ $rootScope.$broadcast('inactive-section:loving'); }
	    if (SECTIONS.FRONT_END == hash.substr(1)){ $rootScope.$broadcast('inactive-section:front-end'); }
	    if (SECTIONS.WORK == hash.substr(1)){ $rootScope.$broadcast('inactive-section:work'); }
	    if (SECTIONS.CONTACT == hash.substr(1)){ $rootScope.$broadcast('inactive-section:contact'); }

	    // And we set the new inactive section as the previous section that was active
	    previousSection = hash.substr(1);
	});
});