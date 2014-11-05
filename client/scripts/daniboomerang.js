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
.config(function($routeProvider, $locationProvider) {
  
  $routeProvider.
    when('/whatILike', {templateUrl: 'views/content/what-i-like.html'}).
    when('/whoIAm', {templateUrl: 'views/content/who-i-am.html'}).
    when('/whatIveDone', {templateUrl: 'views/content/what-ive-done.html'}).
    when('/whatIveLearnt', {templateUrl: 'views/content/what-ive-learnt.html'}).
    otherwise({redirectTo: '/whoIAm'});
  $locationProvider.html5Mode(true);

})
.run(function (locationService, responsivityService, dataServices) {
  locationService.init();
  responsivityService.init();
  dataServices.init();
});