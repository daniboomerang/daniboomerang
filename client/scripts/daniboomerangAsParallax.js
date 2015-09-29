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
.directive('daniboomerangAsParallaxDirective', function($compile) {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang-as-parallax.html',
		link: function (scope, element, attrs) {
			var topnavbarWrapper = element.find('#topnavbar-wrapper');
			var footWrapper = element.find('#foot-wrapper');
			scope.$on('app-starts', function($event){ topnavbarWrapper.append('<topnavbar></topnavbar>'); footWrapper.append('<foot></foot>'); $compile(topnavbarWrapper)(scope); $compile(footWrapper)(scope); }); }
	}  
})