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

	    	$urlRouterProvider.otherwise('/');

			$stateProvider
		      
		    	/*.state('404', {
		        	url: '/{path:.*}',
		          	template: '<page-not-found></page-not-found>'
		      	})*/

		    $locationProvider.html5Mode(true); 
	    }
  	]
);


