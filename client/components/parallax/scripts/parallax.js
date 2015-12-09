var parallax = angular.module('parallax', [
	// VENDOR
	'duScroll',
	// PARALLAX
	'parallaxDirectives',
	'parallaxServices',
	'aliveSvgs'

])
.run(function (scrollObserverService, urlObserverService, nodeConnectionsService) {
	urlObserverService.init();
	scrollObserverService.init();
	nodeConnectionsService.init();
})
.value('duScrollEasing', function easingFunction(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t })
.directive('parallax', function($compile) {
	return {
		restrict: 'A',
		templateUrl: 'views/parallax.html'
	}  
})