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
			var intro = element.find('#intro');
			var introElements = element.find('.intro-element');
			var introCircleWrapper = element.find('#intro-circles-wrapper');
			var center = element.find('#center');
			scope.$on('active-section:cover', function($event){ 
				intro.addClass('visibility-visible');
        		intro.addClass('fadeIn');
        		introElements.addClass('visibility-visible');
        		introElements.addClass('fadeIn');
        		introCircleWrapper.addClass('visibility-visible');
        		introCircleWrapper.addClass('rotateIn');

			});
			$timeout(function() {
				introCircleWrapper.addClass('rotateOut');
				$timeout(function() { introCircleWrapper.remove();}, 2000);
			}, 10000);

			scope.startApp = function(){
				element.remove();
				$rootScope.$broadcast('app-starts');
			}
		}
  }  
})