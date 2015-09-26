'use strict';

angular.module('daniboomerangAsParallax', [
	// VENDOR
	'duScroll',
	// DANIBOOMERANG
	'daniboomerangDirectives',
	'daniboomerangAliveSvgDirectives',
	'daniboomerangServices'
])
.run(function (scrollObserverService, urlObserverService, nodeConnectionsService) {
	urlObserverService.init();
	scrollObserverService.init();
	nodeConnectionsService.init();
})
.value('duScrollEasing', function easingFunction(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t })
.directive('daniboomerangAsParallaxDirective', function() {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang-as-parallax.html',
		link: function (scope, element, attrs) { scope.$on('app-starts', function($event){ element.removeClass('visibility-hidden'); }); }
	}  
})