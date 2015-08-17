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
		
			var intro = element.find('#intro');
			var goButton = element.find('#go-button');
			var esc = element.find('#esc');
			var isSkipActive = true;

			$document.bind("keyup", function(event) {
        		if ((event.keyCode === 27) && (isSkipActive)) { startApp(); }
    		});
    	
    		function startApp(){
				intro.attr('class', 'animated fadeOut');
				$timeout(function() { 
					element.remove();
					$rootScope.$broadcast('app-starts');
				}, 1000);
			}

			scope.$on('active-section:cover', function($event){
				intro.attr('style', '-moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s;');
				intro.attr('class', 'animated fadeIn');
				intro.append('<div svg-alive-rocket></div>');
				$compile(intro)(scope);
				
			});

			/**********************************************************/
			// When the rocket finishes the projection we display button
			/**********************************************************/
			scope.$on('event:rocket-firstProjection', function($event){
				esc.addClass('rubberBand');
				$timeout(function() { 
					esc.remove();
					isSkipActive = false;
					var introButtonStartAppHtml = '<div button id="start-button" class="animated fadeIn" size="md" content-type="text" text="GO" ng-click-function="rocketTakeOff()" spin-direction="right"></div>';
					goButton.append(introButtonStartAppHtml);
					var introButtonStartApp = element.find('#start-button');
					$compile(goButton)(scope);
				}, 500);
			});

			/***********************************************************************/
			// When the user clicks on the button we finish the projection the rocket
			/***********************************************************************/
			scope.rocketTakeOff = function() { $rootScope.$broadcast('event:rocket-takeoff'); }

			/**************************************/
			// When the rocket ends, westart the app
			/**************************************/
			scope.$on('event:rocket-tookoff', function($event){ startApp(); });
			
		}
	}
})