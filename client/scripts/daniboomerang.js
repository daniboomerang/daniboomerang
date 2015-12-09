'use strict';

var daniboomerang = angular.module('daniboomerang', [
	'ngRoute',
	'ui.router',
	// VENDOR
	'720kb.socialshare',
	// DANIBOOMERANG COMPONENTS
	'introduction',
	/*'parallax'*/
		// COMMON
		'commonServices',
		'foot',
		'button',
		'comet',
		'share'
]);

daniboomerang.config(
  	[ '$stateProvider', '$urlRouterProvider', '$locationProvider',
	    function ($stateProvider, $urlRouterProvider, $locationProvider) {

		    /////////////////////////////
		    // Redirects and Otherwise //
		    /////////////////////////////

			// if the path doesn't match any of the urls you configured
	    	// otherwise will take care of routing the user to the specified url
	    	$urlRouterProvider.otherwise('/');

			$stateProvider
		      
		    //////////////////////////
		    // State Configurations //
		    //////////////////////////
		      
		    	/*.state('404', {
		        	url: '/{path:.*}',
		          	template: '<page-not-found></page-not-found>'
		      	})*/

		    $locationProvider.html5Mode(true); 
	    }
  	]
);


