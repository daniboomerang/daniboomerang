'use strict';

angular.module('daniboomerangApp', [
	'ngRoute',
	// DANIBOOMERANG
	'daniboomerangIntro',
	'daniboomerangAsParallax'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
})
.directive('daniboomerangContent', function() {
	return {
	    restrict: 'E',
	    template: '<div id="intro-wrapper" daniboomerang-intro-directive></div><div id="app-wrapper" class="visibility-hidden" daniboomerang-as-parallax-directive></div>'
  	}  
})