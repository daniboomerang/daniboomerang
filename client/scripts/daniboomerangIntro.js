'use strict';

angular.module('daniboomerangIntro', [ ])
.directive('daniboomerangIntroDirective', function($timeout, $rootScope, $compile, $document) {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang-intro.html',
		link: function (scope, element, attrs) {
		
			var intro = element.find('#intro');
			var goButtonWrapper = element.find('#go-button-wrapper');
			var blurButtonBg = element.find('#blur-button-bg');
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
				var introTitleHtml = '<div id="intro-title" class="animated flipInX text-center">"A creative portfolio"</div>'
				$timeout(function() { 
					intro.append(introTitleHtml);
					//$compile(intro)(scope);
					$timeout(function() { 
						var introTitleId = element.find('#intro-title');
						introTitleId.attr('class', 'animated flipOutX text-center');
						//introTitleId.remove();
						intro.append('<div id="svg-alive-rocket" svg-alive-rocket></div>');
						intro.append('<div id="intro-orbit-comet-blue" class="spin-right-half orbit-comet"><div id="intro-comet-blue" class="comet-blue comet-from-left"></div></div>');
						intro.append('<div id="intro-orbit-comet-red" class="spin-left-half orbit-comet"><div id="intro-comet-red" class="comet-red comet-from-right"></div></div>');
						$compile(intro)(scope);
					}, 2000);
				}, 1500);
				
			});

			/**********************************************************/
			// When the rocket finishes the projection we display button
			/**********************************************************/
			scope.$on('event:rocket-firstProjection', function($event){
				esc.addClass('rubberBand');
				$timeout(function() { 
					esc.remove();
					isSkipActive = false;
					blurButtonBg.attr('class', 'animated fadeIn blurred');
					var introButtonStartAppHtml = '<div button id="go-button" class="animated fadeIn" size="md" is-toogled-button="true" content-type="text" text="GO" ng-click-function="rocketTakeOff()" spin-direction="right"></div>';
					goButtonWrapper.append(introButtonStartAppHtml);
					$compile(goButtonWrapper)(scope);
				}, 1000);
			});

			/***********************************************************************/
			// When the user clicks on the button we finish the projection the rocket
			/***********************************************************************/
			scope.rocketTakeOff = function() {
				goButtonWrapper.attr('style', '-moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s;'); 
				goButtonWrapper.attr('class', 'animated rotateOut');
				$rootScope.$broadcast('event:rocket-takeoff'); }

			/**************************************/
			// When the rocket ends, westart the app
			/**************************************/
			scope.$on('event:rocket-tookoff', function($event){ startApp(); });
			
		}
	}
})
.directive('svgAliveRocket', function($interval, $timeout, $q, $rootScope) {
  	return {
	    restrict: 'EA',
	    scope: {},
	    template: function (elem, attrs) { return '<div id="orbit-rocket" class="arrival"><div id="rocket" ng-include="\'/images/rocket.svg\'"></div></div>';  },
	    link: function (scope, element, attrs) {

			var orbitRocket, rocket, rightEngineFull, rightEngine, centerEngineFull,
	      		centerEngine, leftEngine, leftEngineFull, projectionScreen, projectionScreen,
	      		leftLight, centerLight, rightLight, projectionLight, projectionLight,
	      		angularProjection, angularProjection, nodeProjection, nodeProjection, protractorProjection, protractorProjection,
	      		responsiveProjection, responsiveProjection, karmaProjection, karmaProjection, browsersProjection,
	      		browsersProjection, parallaxProjection, parallaxProjection;

	      	function init() {

		        /* Rocket */
		        orbitRocket = element.find('#orbit-rocket');
		        rocket = element.find('#rocket');

		        /* Engines */
		        rightEngineFull = element.find('#ng-right-engine-full'); 
		        rightEngineFull.attr('class', 'visibility-hidden');
		        rightEngine = element.find('#ng-right-engine'); 
		        centerEngineFull = element.find('#ng-center-engine-full'); 
		        centerEngineFull.attr('class', 'visibility-hidden');
		        centerEngine = element.find('#ng-center-engine'); 
		        leftEngine = element.find('#ng-left-engine'); 
		        leftEngineFull = element.find('#ng-left-engine-full'); 
		        leftEngineFull.attr('class', 'visibility-hidden');
		        
		        /* Lights */
		        leftLight = element.find('#ng-left-light'); 
		        centerLight = element.find('#ng-center-light'); 
		        rightLight = element.find('#ng-right-light');
		        
		        /* Projection */
		        projectionScreen = element.find('#ng-projection-screen');
		        projectionScreen.attr('class', 'visibility-hidden');
		        projectionLight = element.find('#ng-projection-light');
		        projectionLight.attr('class', 'visibility-hidden');
		        angularProjection = element.find('#ng-angular');
		        angularProjection.attr('class', 'visibility-hidden');
		        nodeProjection = element.find('#ng-node');
		        nodeProjection.attr('class', 'visibility-hidden');
		        protractorProjection = element.find('#ng-protractor');
		        protractorProjection.attr('class', 'visibility-hidden');
		        responsiveProjection = element.find('#ng-responsive');
		        responsiveProjection.attr('class', 'visibility-hidden');
		        karmaProjection = element.find('#ng-karma');
		        karmaProjection.attr('class', 'visibility-hidden');
		        browsersProjection = element.find('#ng-browsers');
		        browsersProjection.attr('class', 'visibility-hidden');
		        parallaxProjection = element.find('#ng-parallax');
		        parallaxProjection.attr('class', 'visibility-hidden');
		    }

	      	function turnOnEngines() {
	        	$interval(function() {
	          		(rightEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? rightEngine.attr('class', 'animated fadeIn') : rightEngine.attr('class', 'animated fadeOut');
	          		(leftEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? leftEngine.attr('class', 'animated fadeIn') : leftEngine.attr('class', 'animated fadeOut');
	        	}, 2100);        
	        	$interval(function() {
	          		(centerEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? centerEngine.attr('class', 'animated fadeIn') : centerEngine.attr('class', 'animated fadeOut');
	        	}, 1700);        
	      	}

	      	function turnOnLights() {
		        $interval(function() {
		          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
		          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
		        }, 2500);
		        $interval(function() {
		          (centerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? centerLight.attr('class', 'animated fadeIn') : centerLight.attr('class', 'animated fadeOut');
		        }, 700);        
		    }
	    
	      	function parkRocket(time){

		        var deferred = $q.defer();

		        rocket.attr('class', 'suspension');
		        $timeout(function() { 
		          deferred.resolve(0);  //Returns 0 when finished;
		        }, time * 1000);

		        return deferred.promise;
	      	}

		    function projection() {

		        var deferred = $q.defer();
		        
		        /* Prepare Screen */
		        projectionScreen.attr('class', 'animated fadeIn');
		        projectionLight.attr('class', 'animated fadeIn'); 

		        /* Project Elements */
		        var afterProjection = projectElements();
		        afterProjection.then(function() {

		            /* We wait a second so the current projection fades out */
		            $timeout(function() {
		              projectionScreen.attr('class', 'animated fadeOut');
		              projectionLight.attr('class', 'animated fadeOut'); 
		              deferred.resolve(0);  //Returns 0 when finished;                         
		              
		            }, 1500);
		            
		        });
		       
		        return deferred.promise;
		    }

		    function turnRocket(){

		        var deferred = $q.defer();

		        $timeout(function() {
		          rocket.attr('class', 'turn');    
		          deferred.resolve(0);
		        }, 2000);
		        
		        return deferred.promise;
		    }

		    function takeOff(){

		        $timeout(function() {
		          
		          orbitRocket.attr('class', 'takeoff');
		          $timeout(function() {
		            leftEngineFull.attr('class', 'animated fadeIn');
		            centerEngineFull.attr('class', 'animated fadeIn');
		            rightEngineFull.attr('class', 'animated fadeIn'); 
		          }, 1000);
		          $timeout(function() {
		            $rootScope.$broadcast('event:rocket-tookoff');
		          }, 1500);
		          
		        }, 500);
		        
		    }

		    var executeProjection = function(){ return projection(); }  
		    var takeOffRocket = function(){ return takeOff(); }  

		    /**********************************/
		    /* Waits the rocket to be loaded  */
		    /**********************************/
		    scope.$on('$includeContentLoaded', function () {
		        init();
		        turnOnEngines();
		        turnOnLights();
		        parkRocket(1.5)
		        .then(executeProjection)
		        .then(function(){ });    
		    });

		    /****************************/
		    /* Listens command take off */
		    /****************************/
		    scope.$on('event:rocket-takeoff', function () {
		        scope.$broadcast('event:rocket-stopProjection');
		        turnRocket()
		        .then(takeOff)
		    });


		      /***********************************************/ 
		      /***********************************************/
		      /* AUXILIARY FUNCTIONS FOR ELEMENTS PROJECTION */
		      /***********************************************/
		      /***********************************************/

		    function projectElement(elementId) {
		        
		        var deferred = $q.defer();

		        displayElement(elementId)
		        .then(function() {
		          return hideElement(elementId);
		        })
		        .then(function(){
		          deferred.resolve(0);
		        });

		        return deferred.promise;   
		    }

		    function projectElements(){    
		        
		        var deferred = $q.defer();

		        var onGoingProjection = true;
		        var firstIteration = true;

		        var intervalPromise = $interval(function() {  
		          
		          if (onGoingProjection) {
		            onGoingProjection = false;
		            projectElement(angularProjection)
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(nodeProjection);
		              }
		            })
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(protractorProjection);
		              }
		              
		            })
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(responsiveProjection);
		              }
		              
		            })
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(karmaProjection);
		              }
		            })
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(browsersProjection);
		              }
		            })  
		            .then(function(){
		              if (angular.isDefined(intervalPromise)) {
		                return projectElement(parallaxProjection);
		              }
		            })
		            .then(function(){
		              onGoingProjection = true;
		              if (firstIteration){
		                $rootScope.$broadcast('event:rocket-firstProjection');
		                firstIteration = false;
		              }
		            });
		          }
		        }, 500);

		        scope.$on('event:rocket-stopProjection', function () {
		          $interval.cancel(intervalPromise);
		          intervalPromise = undefined;
		          deferred.resolve(0);
		        })

		        element.on('$destroy', function() {
		          if (angular.isDefined(intervalPromise)) {
		            $interval.cancel(intervalPromise);
		            intervalPromise = undefined;
		          }
		        });

		        return deferred.promise;
		    }

		    function displayElement(elementId){
		        
		        var deferred = $q.defer();
		        
		        $timeout(function() { 
		          elementId.attr('class','animated fadeIn');
		          deferred.resolve(element);
		        }, 1000);
		        
		        return deferred.promise;
		    }

		    function hideElement(elementId){
		        
		        var deferred = $q.defer();
		        
		        $timeout(function() { 
		          elementId.attr('class','animated fadeOut');
		          deferred.resolve(element);
		        }, 1000);
		        
		        return deferred.promise;
		    }    
		}
	};
});