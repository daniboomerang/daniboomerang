var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('sidebarMenu', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/sidebar-menu.html'
  };
})

daniboomerangDirectives.directive('sidebarMenuResponsive', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/sidebar-menu-responsive.html'
  };
})


daniboomerangDirectives.directive('content', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/content.html'
  };
})

daniboomerangDirectives.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/navbar.html'
  };
})
