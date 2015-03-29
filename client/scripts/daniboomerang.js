'use strict';


angular.module('daniboomerangApp', [
	'ngRoute',
	// VENDOR
	'duScroll',
	'ngFx',
	// DANIBOOMERANG
	'daniboomerangDirectives',
	'daniboomerangServices'
])
.config(function($locationProvider) {
    $locationProvider.html5Mode(false);
})
.run(function (scrollObserverService, urlObserverService) {
	urlObserverService.init();
	scrollObserverService.init();
})
.value('duScrollEasing', function easingFunction(t) { return t*(2-t) });
