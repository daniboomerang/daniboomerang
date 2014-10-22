var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('menu', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/menu.html'
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
});

daniboomerangDirectives.directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/footer.html'
  };
});
