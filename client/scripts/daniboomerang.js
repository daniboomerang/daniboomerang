'use strict';

var daniboomerang = angular.module('daniboomerang', [
	'ngRoute',
	'ui.router',
	// VENDOR
	'720kb.socialshare',
	// DANIBOOMERANG COMPONENTS
	'introduction',
	'parallax',
		// COMMON
		'cancelAsynchPromiseService',
		'foot',
		'button',
		'comet',
		'share'
]);

daniboomerang.config(function($locationProvider) { 

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});	

});

daniboomerang.run(function ($rootScope, $window, $location) {

	var onPageReload = true;

	if (onPageReload){
		onPageReload = false;
		$location.path('/');
	}
	
});