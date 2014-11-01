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

daniboomerangDirectives.directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/footer.html'
  };
})

daniboomerangDirectives.directive('sizeObserver', ['resize', function(resize){
  return{
    restrict:'A',
    controller: function($scope){
      $scope.$on('resize', function(data, $event){
        $scope.size = $event;
        $scope.size.smallDevice = $scope.size.width < 768;
      });
    }
  };
}]);
