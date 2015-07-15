'use strict';

angular.module('daniboomerangApp', [
	'ngRoute',
	// VENDOR
	'duScroll',
	'socialLinks',
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
.value('duScrollEasing', function easingFunction(t) { return t*(2-t) })
.directive('daniboomerangContent', function($timeout) {
	return {
	    restrict: 'E',
	    template: '<ng-include src="currentTemplate"></ng-include>',
	    link: function (scope, element, attrs) {
	    	scope.currentTemplate = 'views/intro.html';
            $timeout(function() { 
	    		scope.currentTemplate = 'views/daniboomerang.html'; scope.$apply();
	    	}, 2500);
	    } 
  	}  
})