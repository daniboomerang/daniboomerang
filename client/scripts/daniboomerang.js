'use strict';

angular.module('daniboomerangApp', [
  'ngRoute',
  'ngAnimate',
  // VENDOR
  'ngResize',
  // DANIBOOMERANG
  'daniboomerangDirectives',
  'daniboomerangControllers',
  'daniboomerangServices'
])
.config(function($locationProvider) {
  
  $locationProvider.html5Mode(true);

})
