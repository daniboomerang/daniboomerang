var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('topnavbar', function() {
  return {
    restrict: 'E',  
    templateUrl: 'views/topnavbar.html',
    link: function (scope, element) {
      var head = element.find('#head');
      head.addClass('hide-it');
      var header = element.find('header');

      scope.$on('event:expand-navbar', function($event, $element){  
        if (head.hasClass('hide-it')){
          head.removeClass('hide-it');
          head.addClass('show-it');
        }
        header.addClass('expand');
        head.addClass('fixed');
      });  

      scope.$on('event:hide-navbar', function($event, $element){
        header.removeClass('expand');
        head.addClass('hide-it');
        head.removeClass('show-it');
      });
    }
  };
});
 
daniboomerangDirectives.directive('cover', function($document) {
  return {
    restrict: 'E',
    templateUrl: 'views/cover.html',
    scope: {},
    link: function (scope, element) {
      $document.scrollTop(300, 1000).then(function() {
        console && console.log('Showing Cover, scrolled to top');
      });  
    }
  };
});


daniboomerangDirectives.directive('content', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content/content.html'
  };
});

daniboomerangDirectives.directive('whoIAm', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content/who-i-am.html'
  };
});

daniboomerangDirectives.directive('whatILike', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content/what-i-like.html'
  };
});

daniboomerangDirectives.directive('whatIveDone', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content/what-ive-done.html'
  };
});

daniboomerangDirectives.directive('whatIveLearnt', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content/what-ive-learnt.html'
  };
});

daniboomerangDirectives.directive('parallaxImage', ['$compile', function ($compile) {
  return {
      restrict: 'AE', 
      replace: 'true',
      scope: {},
      template: '', // template is assigned in the 'link' function
      link: function ($scope, element, attrs) {
          $scope.parallaxBackground = attrs.parallaxCss;
          var templateHtml = '<div parallax-background parallax-ratio="0.3" class="parallax-image-section {{parallaxBackground}}"></div>';
          element.html(templateHtml).show();
          $compile(element.contents())($scope);
      }
  };
}]);
