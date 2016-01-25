'use strict';

/*
 * @ngdoc module
 * @name daniboomerang
 *
 * @description
 *
 * App Web Component. It defines its dependecies
 */

var daniboomerang = angular.module('daniboomerang', [
	'ui.router',
	// VENDOR
	'720kb.socialshare',
	// DANIBOOMERANG COMPONENTS
	'introduction',
	'parallax',
	// COMMON
	'cancelAsynchPromiseService',
	'foot',
	'button',
	'comet',
	'share'
]);

daniboomerang.config(function($locationProvider) { 
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});