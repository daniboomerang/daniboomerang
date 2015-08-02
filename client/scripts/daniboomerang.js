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
.directive('daniboomerangIntro', function($timeout, $rootScope, $compile, $document) {
	return {
		restrict: 'A',
		templateUrl: 'views/intro.html',
		link: function (scope, element, attrs) {
			function startApp(){
				intro.addClass('fadeOut');
				$timeout(function() { element.remove();
				$rootScope.$broadcast('app-starts'); }, 1000);	
			}
			var intro = element.find('#intro');
			var introElements = element.find('.intro-element');
			var introCenter = element.find('#intro-center');
			var introBoomerangWrapper = element.find('#intro-boomerang-wrapper');
			var introBoomerang = element.find('#intro-boomerang');
			var esc = element.find('#esc');

			$document.bind("keyup", function(event) {
        		if (event.keyCode === 27) { startApp(); }
    		});
			scope.$on('active-section:cover', function($event){
				intro.addClass('visibility-visible');
        		intro.addClass('fadeIn');
        		introElements.addClass('visibility-visible');
        		introElements.addClass('fadeIn');
        		introBoomerangWrapper.addClass('visibility-visible');
        		introBoomerangWrapper.addClass('pulse');
			});
			$timeout(function() {
				introBoomerangWrapper.addClass('rotateOut');
				esc.addClass('rubberBand');
				$timeout(function() { 
					introBoomerangWrapper.remove();
					esc.remove();
					var introButtonStartAppHtml = '<div button id="start-button" size="md" content-type="text" text="GO" ng-click-function="startApp()" spin-direction="right"></div>';
					introCenter.append(introButtonStartAppHtml);
					var introButtonStartApp = element.find('#start-button');
					introButtonStartApp.addClass('animated pulse');
					$compile(introCenter)(scope);
				}, 500);
			}, 10000);
			scope.startApp = function(){ startApp(); }
		}
	}
})