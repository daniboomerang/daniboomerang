angular.module('daniboomerangApp', [
	'ngRoute',
	// VENDOR
	'720kb.socialshare',
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
	    template: '<div id="intro-wrapper" daniboomerang-intro-directive></div><div id="app-wrapper" daniboomerang-as-parallax-directive></div>'
  	}  
})