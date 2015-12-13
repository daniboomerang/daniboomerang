'use strict';

var daniboomerang = angular.module('daniboomerang', [
	'ngRoute',
	'ui.router',
	// VENDOR
	'720kb.socialshare',
	// DANIBOOMERANG COMPONENTS
	//'introduction',
	'parallax',
		// COMMON
		'cancelAsynchPromiseService',
		'foot',
		'button',
		'comet',
		'share'
]);

daniboomerang.config(function($locationProvider) { $locationProvider.html5Mode(false); });

daniboomerang.run(function ($rootScope, $location) {
	
	var onPageReload = true;

	$rootScope.$on("$locationChangeSuccess", function (event, current, previous, rejection) {
		if (onPageReload){
			onPageReload = false;
			$location.path('/');
		}
	});	
	
});
