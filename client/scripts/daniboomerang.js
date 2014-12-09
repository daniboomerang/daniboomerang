'use strict';

angular.module('daniboomerangApp', [
	'ngRoute',
	// VENDOR
	'duScroll',
	'duParallax',
	'angular-parallax',
	// DANIBOOMERANG
	'daniboomerangDirectives',
	'daniboomerangControllers',
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
})
.run(function ($rootScope, $location) {
	var onPageReload = true;
	$rootScope.$on("$locationChangeSuccess", function (event, current, previous, rejection) {
		if (onPageReload){
			onPageReload = false;
			$location.path('/');
		}
	});
	$rootScope.$on('duScrollspy:becameActive', function($event, $element){
		//Automaticly update location
		var hash = $element.prop('hash');
		if(hash) {
			var section = hash.replace('#', '');
			$location.path('/' + section);
			$rootScope.$apply();
		}
	});
})