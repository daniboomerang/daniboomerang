'use strict';

/*
 * @ngdoc module
 * @name parallax
 *
 * @description
 *
 * Web Component that wrappes other components into the pure css parallax
 * It has its own state into the application. 
    .state('parallax', {
      url: '/',
        template: '<parallax></parallax><foot></foot>',
    })
 * It uses 3rd party module duScroll for getting onScroll events
 */

var parallax = angular.module('parallax', [
	// VENDOR
	'duScroll',
	// PARALLAX
	'parallaxDirectives',
	'parallaxServices',
	// COMPONENTS
	'sections',
	'aliveSvgs'
]);
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
  FRONT_END: 'front-end',
  WORK: 'work',
  CONTACT: 'contact'
});
parallax.config(function($stateProvider) {

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
parallax.run(function(SECTIONS, duScrollAdapterService) { duScrollAdapterService.init(SECTIONS); });