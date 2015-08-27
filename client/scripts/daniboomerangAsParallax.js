'use strict';

angular.module('daniboomerangAsParallax', [
	// VENDOR
	'duScroll',
	// DANIBOOMERANG
	'daniboomerangDirectives',
	'daniboomerangServices'
])
.run(function (scrollObserverService, urlObserverService) {
	urlObserverService.init();
	scrollObserverService.init();
})
.value('duScrollEasing', function easingFunction(t) { return t*(2-t) })
.directive('daniboomerangAsParallaxDirective', function() {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang-as-parallax.html',
		link: function (scope, element, attrs) { scope.$on('app-starts', function($event){ element.removeClass('visibility-hidden'); }); }
	}  
})