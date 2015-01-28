'use strict';

angular.module('daniboomerangApp', [
	'ngRoute',
	// VENDOR
	'duScroll',
	'angular-parallax',
	'ngFx',
	// DANIBOOMERANG
	'daniboomerangDirectives',
	'daniboomerangControllers',
	'daniboomerangServices'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
})
.run(function (scrollObserverService, urlObserverService) {
	urlObserverService.init();
	scrollObserverService.init();
})