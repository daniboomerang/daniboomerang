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
.directive('daniboomerangContent', function() {
	return {
	    restrict: 'E',
	    template: '<div id="intro-wrapper" daniboomerang-intro></div><div id="app-wrapper" class="visibility-hidden" daniboomerang-app></div>'
  	}  
})
.directive('daniboomerangApp', function() {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang.html',
		link: function (scope, element, attrs) { scope.$on('app-starts', function($event){ element.removeClass('visibility-hidden'); }); }
	}  
})
.directive('daniboomerangIntro', function($timeout, $rootScope) {
	return {
		restrict: 'A',
		templateUrl: 'views/intro.html',
		link: function (scope, element, attrs) {
			var spinningCircles = element.find('#spinning-circles');
			$timeout(function() {
				element.remove();
				$rootScope.$broadcast('app-starts');
			}, 1000);
		}
  }  
})