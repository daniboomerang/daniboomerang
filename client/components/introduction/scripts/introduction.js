'use strict';

var introduction = angular.module('introduction', []);

// Setting up Url into constant
introduction.constant('INTRODUCTION_BASE_URL', '/components/introduction/');
introduction.config(function($stateProvider) {
	$stateProvider
    
    //////////////////////////
	// State Configurations //
	//////////////////////////
    
     .state('introduction', {
    	url: '/',
        template: '<intro></intro>'
    })
});

introduction.directive('intro', function($timeout, $state, $rootScope, $compile, $document, cancelAsynchPromiseService, socialSharingService, INTRODUCTION_BASE_URL) {
	return {
		restrict: 'EA',
		templateUrl: function(elem, attr){
	      return INTRODUCTION_BASE_URL + 'views/intro.html';
	    },
		compile: function compile(tElement, tAttrs, transclude) {
			
      		// DOM ELEMENTS

      		// Intro
      		var intro = tElement.find('#intro');
      		
			// Sharing
			var dboomShare = tElement.find('#dboom-share');
			var fbLink = tElement.find('#fb-link');
			var gPlusLink = tElement.find('#gplus-link');
			var linkedinLink = tElement.find('#linkedin-link'); 
			var twitterLink = tElement.find('#twitter-link');
			var dboomCopyright = tElement.find('#dboom-copyright');
			// Github
			var dboomGithub = tElement.find('#dboom-github');
			var githubLink = tElement.find('#github-link');
			var licenseLink = tElement.find('#license-link');
			// Central button
			var goButtonWrapper = tElement.find('#go-button-wrapper');
			var blurButtonBg = tElement.find('#blur-button-bg');
      
      		return {
        		pre: function preLink(scope, iElement, iAttrs) { 
     
	        		function addDelayForAnimation(element, delay) {
	            		var delayAnimation = '-moz-animation-delay:' + delay + 's; -webkit-animation-delay:' + delay + 's; -ms-animation-delay:' + delay + 's;'
	            		element.attr('style', delayAnimation);            
	          		}

	          		// Lets hide the elements before the view is compiled

	          		// Intro
	          		intro.attr('class', 'visibility-hidden');
					addDelayForAnimation(intro, 1);

		         	// Github
		         	dboomGithub.attr('class', 'visibility-hidden');
					githubLink.attr('class', 'visibility-hidden');
					licenseLink.attr('class', 'visibility-hidden');
					addDelayForAnimation(dboomGithub, 7);
					addDelayForAnimation(githubLink, 8);
					addDelayForAnimation(licenseLink, 7.5);

					// Share options
					dboomShare.attr('class', 'visibility-hidden');
					fbLink.attr('class', 'visibility-hidden');
					gPlusLink.attr('class', 'visibility-hidden');
					twitterLink.attr('class', 'visibility-hidden');
					linkedinLink.attr('class', 'visibility-hidden');
					dboomCopyright.attr('class', 'visibility-hidden');
					addDelayForAnimation(dboomShare, 3.5);
					addDelayForAnimation(fbLink, 4.5);
					addDelayForAnimation(gPlusLink, 5);
					addDelayForAnimation(twitterLink, 5.5);
					addDelayForAnimation(linkedinLink, 6);
					addDelayForAnimation(dboomCopyright, 6.5);
        		},
        		post: function postLink(scope, iElement, iAttrs) { 
          			
          			var isSkipActive, timeoutPromises, introIsFinished;
	    	
	    			init();

					function init() {

						// Global variables
						isSkipActive = true;
						timeoutPromises = [];
						introIsFinished = false;

						// Init Scope
						scope.socialDescription = socialSharingService.getSocialDescription();
						scope.socialUrl = socialSharingService.getSocialUrl();
						scope.socialMedia = socialSharingService.getSocialMedia();
						scope.socialType = socialSharingService.getSocialType();
						scope.socialTitle = socialSharingService.getSocialTitle();

					 	// Lets set intro background	
						intro.css('background-size', '100%');
						intro.css('background-repeat', 'no-repeat');
						var backgroundImageUrl = 'url(' + INTRODUCTION_BASE_URL + '/images/intro-space.svg)';
      					intro.css('background-image', backgroundImageUrl);

						// Init Dom elements with animations
						intro.attr('class', 'animated fadeIn');
						dboomShare.attr('class', 'animated fadeIn');
						fbLink.attr('class', 'animated bounceIn');
						gPlusLink.attr('class', 'animated bounceIn');
						twitterLink.attr('class', 'animated bounceIn');
						linkedinLink.attr('class', 'animated bounceIn');
						dboomCopyright.attr('class', 'animated bounceIn');
						dboomGithub.attr('class', 'animated fadeIn');
						githubLink.attr('class', 'animated bounceIn');
						licenseLink.attr('class', 'animated bounceIn');

						var introTitleHtml = '<div id="intro-title" class="animated flipInX text-center">A creative portfolio</div>'
						if (!introIsFinished) { 
							timeoutPromises.push($timeout(function() { 
								/*console.log('here a $timeout');*/
								intro.append(introTitleHtml);
								if (!introIsFinished) {
									timeoutPromises.push($timeout(function() { 
									    /*console.log('here a $timeout');*/
										var introTitleId = iElement.find('#intro-title');
										introTitleId.attr('class', 'animated flipOutX text-center');
										timeoutPromises.push($timeout(function() {
											/*console.log('here a $timeout');*/
											introTitleId.remove();
										}, 1000));
										intro.append('<div id="alive-svg-rocket" alive-svg-rocket></div>');
										intro.append('<comet color="blue"></comet>');
										intro.append('<comet color="red"></comet>');
										$compile(intro)(scope);
										// We make the skip option available
										intro.append("<div id='skip-wrapper' class='animated fadeIn' style='-moz-animation-delay: 2.5s; -webkit-animation-delay: 2.5s; -ms-animation-delay: 2.5s;'><div id='skip' class='animated bounceIn' style='-moz-animation-delay: 3s; -webkit-animation-delay: 3s; -ms-animation-delay: 3s;'>Press 'ENTER' to skip</div></div>");
										$document.bind("keyup", function(event) {
											introIsFinished = true;
							        		if ((event.keyCode === 13) && (isSkipActive)) { finishIntro(); }
							    		});
									}, 2000));
								}
							}, 1500));
						}
						

						/**********************************************************/
						// When the rocket finishes the projection we display button
						/**********************************************************/
						scope.$on('event:rocket-firstProjection', function($event){
							var skipWrapper = iElement.find('#skip-wrapper');
							skipWrapper.attr('style', '-moz-animation-delay: 0.5s; -webkit-animation-delay: 0.5s; -ms-animation-delay: 0.5s;'); // Here we remove the delay for the animation
							skipWrapper.attr('class', 'animated fadeOut');
							timeoutPromises.push($timeout(function() { 
								/*console.log('here a $timeout');*/
								skipWrapper.remove();
							}, 1000));
							timeoutPromises.push($timeout(function() { 
								/*console.log('here a $timeout');*/
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

						/**********************************************/
						// When the rocket ends, we go to parallax page
						/**********************************************/
						scope.$on('event:rocket-tookoff', function($event){ finishIntro(); });		
					}
	        	
	        		function finishIntro(){
						intro.attr('class', 'animated fadeOut');
						// This timeout doesn´t need to be pushed
						$timeout(function() { 
							/*console.log('here a $timeout');*/
							iElement.remove();
							intro.remove();
							cancelAsynchPromiseService.cancelTimeouts(timeoutPromises);
							$state.go('parallax');
						}, 2000);
					}
	        	}
      		}
      	}	
	}
})


introduction.directive('aliveSvgRocket', function($interval, $timeout, $q, $rootScope, cancelAsynchPromiseService, INTRODUCTION_BASE_URL) {
  	return {
	    restrict: 'EA',
	    scope: {},
	    template: function (elem, attrs) { return '<div id="orbit-rocket" class="arrival"><div id="rocket" ng-include=" \'' + INTRODUCTION_BASE_URL + '/images/rocket.svg\'"></div></div>';  },
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
	        		/*console.log('here an $interval');*/
	          		(rightEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? rightEngine.attr('class', 'animated fadeIn') : rightEngine.attr('class', 'animated fadeOut');
	          		(leftEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? leftEngine.attr('class', 'animated fadeIn') : leftEngine.attr('class', 'animated fadeOut');
	        	}, 4100))

	        	intervalPromises.push($interval(function() {
	        		/*console.log('here an $interval');*/
	          		(centerEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? centerEngine.attr('class', 'animated fadeIn') : centerEngine.attr('class', 'animated fadeOut');
	        	}, 2700))       
	      	}

	      	function turnOnLights() {
		        intervalPromises.push($interval(function() {
		        	/*console.log('here an $interval');*/
		          	(leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
		          	(rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
		        }, 3500));

		        intervalPromises.push($interval(function() {
		        	/*console.log('here an $interval');*/
		          	(centerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? centerLight.attr('class', 'animated fadeIn') : centerLight.attr('class', 'animated fadeOut');
		        }, 2700));        
		    }
	    
	      	function parkRocket(time){

		        var deferred = $q.defer();

		        rocket.attr('class', 'suspension');
		        timeoutPromises.push($timeout(function() { 
		        	/*console.log('here a $timeout');*/
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
			            	/*console.log('here a $timeout');*/
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
		        	/*console.log('here a $timeout');*/
		          	rocket.attr('class', 'turn');    
		          	deferred.resolve(0);
		        }, 2000));
		        
		        return deferred.promise;
		    }

		    function takeOff(){

		        timeoutPromises.push($timeout(function() { 
		            /*console.log('here a $timeout');*/
		          	orbitRocket.attr('class', 'takeoff');
		          	timeoutPromises.push($timeout(function() {
			          	/*console.log('here a $timeout');*/
			            leftEngineFull.attr('class', 'animated fadeIn');
			            centerEngineFull.attr('class', 'animated fadeIn');
			            rightEngineFull.attr('class', 'animated fadeIn'); 
		          	}, 1000));

			        timeoutPromises.push($timeout(function() {
			          	/*console.log('here a $timeout');*/
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
	        	    /*console.log('here an $interval');*/
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
			        	/*console.log('here a $timeout');*/
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
			        	/*console.log('here a $timeout');*/
			          	elementId.attr('class','animated fadeOut');
			          	deferred.resolve(element);
			        }, 1000));
		        }

		        return deferred.promise;
		    }    
		}
	};
});
