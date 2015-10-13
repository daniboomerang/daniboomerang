'use strict';

angular.module('daniboomerangIntro', [ ])
.directive('daniboomerangIntroDirective', function($timeout, $rootScope, $compile, $document, cancelAsynchPromiseService, socialSharingService) {
	return {
		restrict: 'A',
		templateUrl: 'views/daniboomerang-intro.html',
		link: function (scope, element, attrs) {
		
			var intro = element.find('#intro');
			var goButtonWrapper = element.find('#go-button-wrapper');
			var blurButtonBg = element.find('#blur-button-bg');
			var isSkipActive = true;
			var timeoutPromises = [];
			var introIsFinished = false;

			scope.socialDescription = socialSharingService.getSocialDescription();
			scope.socialUrl = socialSharingService.getSocialUrl();
			scope.socialMedia = socialSharingService.getSocialMedia();
			scope.socialType = socialSharingService.getSocialType();
			scope.socialTitle = socialSharingService.getSocialTitle();
    	
    		function startApp(){
				intro.attr('class', 'animated fadeOut');
				// This timeout doesn´t need to be pushed
				$timeout(function() { 
					console.log('here a $timeout');
					element.remove();
					intro.remove();
					$rootScope.$broadcast('app-starts');
					cancelAsynchPromiseService.cancelTimeouts(timeoutPromises);
				}, 1000);
			}

			intro.attr('style', '-moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s;');
			intro.attr('class', 'animated fadeIn');
			var introTitleHtml = '<div id="intro-title" class="animated flipInX text-center">A creative portfolio</div>'
			if (!introIsFinished) { 
				timeoutPromises.push($timeout(function() { 
					console.log('here a $timeout');
					intro.append(introTitleHtml);
					//$compile(intro)(scope);
					if (!introIsFinished) {
						timeoutPromises.push($timeout(function() { 
						    console.log('here a $timeout');
							var introTitleId = element.find('#intro-title');
							introTitleId.attr('class', 'animated flipOutX text-center');
							//introTitleId.remove();
							intro.append('<div id="alive-svg-rocket" alive-svg-rocket></div>');
							intro.append('<div id="intro-orbit-comet-blue" class="spin-right-half orbit-comet"><div id="intro-comet-blue" class="comet-blue comet-from-left"></div></div>');
							intro.append('<div id="intro-orbit-comet-red" class="spin-left-half orbit-comet"><div id="intro-comet-red" class="comet-red comet-from-right"></div></div>');
							$compile(intro)(scope);
							// We make the ESC available
							intro.append("<div id='esc' class='animated flipInX' style='-moz-animation-delay: 2s; -webkit-animation-delay: 2s; -ms-animation-delay: 2s;'><b>Press 'ESC' to skip</b> </div>");
							$document.bind("keyup", function(event) {
								introIsFinished = true;
				        		if ((event.keyCode === 27) && (isSkipActive)) { startApp(); }
				    		});
						}, 2000));
					}
				}, 1500));
			}
				

			/**********************************************************/
			// When the rocket finishes the projection we display button
			/**********************************************************/
			scope.$on('event:rocket-firstProjection', function($event){
				var esc = element.find('#esc');
				esc.attr('class', 'animated flipOutX');
				timeoutPromises.push($timeout(function() { 
					console.log('here a $timeout');
					esc.remove();
					isSkipActive = false;
					blurButtonBg.attr('class', 'animated fadeIn blurred');
					var introButtonStartAppHtml = '<div button id="go-button" class="animated fadeIn" size="md" is-toogled-button="true" content-type="text" text="GO" ng-click-function="rocketTakeOff()" spin-direction="right"></div>';
					goButtonWrapper.append(introButtonStartAppHtml);
					$compile(goButtonWrapper)(scope);
				}, 1000));
			});

			/**************************************************************************/
			// When the user clicks on the button we finish the projection of the rocket
			/**************************************************************************/
			scope.rocketTakeOff = function() {
				goButtonWrapper.attr('style', '-moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s;'); 
				goButtonWrapper.attr('class', 'animated rotateOut');
				$rootScope.$broadcast('event:rocket-takeoff'); }

			/***************************************/
			// When the rocket ends, we start the app
			/***************************************/
			scope.$on('event:rocket-tookoff', function($event){ startApp(); });			
		}
	}
})
.directive('aliveSvgRocket', function($interval, $timeout, $q, $rootScope, cancelAsynchPromiseService) {
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

	      	var intervalPromises = [];
	      	var timeoutPromises = [];
	      	var introIsFinished = false;

	      	// We set this listener even befor the rocket is loaded. (Someone could press ESC very very fast)
 			element.on('$destroy', function() {		       		
		       	introIsFinished = true; // This is to avoid creating new tiemouts that were already trigered by an active timeout or interval
		        cancelAsynchPromiseService.cancelIntervals(intervalPromises);
		        cancelAsynchPromiseService.cancelTimeouts(timeoutPromises);
		    });

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
	        	intervalPromises.push($interval(function() {
	        		console.log('here an $interval');
	          		(rightEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? rightEngine.attr('class', 'animated fadeIn') : rightEngine.attr('class', 'animated fadeOut');
	          		(leftEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? leftEngine.attr('class', 'animated fadeIn') : leftEngine.attr('class', 'animated fadeOut');
	        	}, 4100))

	        	intervalPromises.push($interval(function() {
	        		console.log('here an $interval');
	          		(centerEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? centerEngine.attr('class', 'animated fadeIn') : centerEngine.attr('class', 'animated fadeOut');
	        	}, 2700))       
	      	}

	      	function turnOnLights() {
		        intervalPromises.push($interval(function() {
		        	console.log('here an $interval');
		          	(leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
		          	(rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
		        }, 3500));

		        intervalPromises.push($interval(function() {
		        	console.log('here an $interval');
		          	(centerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? centerLight.attr('class', 'animated fadeIn') : centerLight.attr('class', 'animated fadeOut');
		        }, 2700));        
		    }
	    
	      	function parkRocket(time){

		        var deferred = $q.defer();

		        rocket.attr('class', 'suspension');
		        timeoutPromises.push($timeout(function() { 
		        	console.log('here a $timeout');
		          	deferred.resolve(0);  //Returns 0 when finished;
		        }, time * 1000));

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

		            //if (!introIsFinished) {
		            	/* We wait a second so the current projection fades out */

			            $timeout(function() {
			            	console.log('here a $timeout');
			              	projectionScreen.attr('class', 'animated fadeOut');
			              	projectionLight.attr('class', 'animated fadeOut'); 
			              	deferred.resolve(0);  //Returns 0 when finished;                         
			            }, 1500);
			        //}
		            
		        });
		       
		        return deferred.promise;
		    }

		    function turnRocket(){

		        var deferred = $q.defer();

		        timeoutPromises.push($timeout(function() { 
		        	console.log('here a $timeout');
		          	rocket.attr('class', 'turn');    
		          	deferred.resolve(0);
		        }, 2000));
		        
		        return deferred.promise;
		    }

		    function takeOff(){

		        timeoutPromises.push($timeout(function() { 
		            console.log('here a $timeout');
		          	orbitRocket.attr('class', 'takeoff');
		          	timeoutPromises.push($timeout(function() {
			          	console.log('here a $timeout');
			            leftEngineFull.attr('class', 'animated fadeIn');
			            centerEngineFull.attr('class', 'animated fadeIn');
			            rightEngineFull.attr('class', 'animated fadeIn'); 
		          	}, 1000));

			        timeoutPromises.push($timeout(function() {
			          	console.log('here a $timeout');
			            $rootScope.$broadcast('event:rocket-tookoff');
			        }, 1500));
		          
		        }, 500));
		        
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
		        var projectionIsStopped = false;

	        	var intervalPromise = $interval(function() {
	        	    console.log('here an $interval');
	        	    if (projectionIsStopped || introIsFinished) { cancelAsynchPromiseService.cancelInterval(intervalPromise); }
		          	if (onGoingProjection) {
			            onGoingProjection = false;
			            
				            projectElement(angularProjection)
				            .then(function(){
				              if (!projectionIsStopped) {
				                return projectElement(nodeProjection);
				              }
				            })
				            .then(function(){
				              	if (!projectionIsStopped) {
				                	return projectElement(protractorProjection);
				              	}
				            })
				            .then(function(){
				              	if (!projectionIsStopped) {
				                	return projectElement(responsiveProjection);
				              	}
				            })
				            .then(function(){
				              	if (!projectionIsStopped) {
				                	return projectElement(karmaProjection);
				              	}
				            })
				            .then(function(){
				              	if (!projectionIsStopped) {
				               		return projectElement(browsersProjection);
				              	}
				            })  
				            .then(function(){
				              	if (!projectionIsStopped) {
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
	
				intervalPromises.push(intervalPromise);
		        
		        scope.$on('event:rocket-stopProjection', function () {
		          projectionIsStopped = true;
		          deferred.resolve(0);
		        })

		        return deferred.promise;
		    }

		    function displayElement(elementId){

		        var deferred = $q.defer();
		        
		        if (!introIsFinished) {
			        timeoutPromises.push($timeout(function() { 
			        	console.log('here a $timeout');
			          	elementId.attr('class','animated fadeIn');
			          	deferred.resolve(element);
			        }, 1000));
				}
		        
		        return deferred.promise;
		    }

		    function hideElement(elementId){
		        
		        var deferred = $q.defer();
		        
		        if (!introIsFinished) {
			        timeoutPromises.push($timeout(function() { 
			        	console.log('here a $timeout');
			          	elementId.attr('class','animated fadeOut');
			          	deferred.resolve(element);
			        }, 1000));
		        }

		        return deferred.promise;
		    }    
		}
	};
});