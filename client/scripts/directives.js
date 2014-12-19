var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('cover', function($document, $rootScope) {
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

daniboomerangDirectives.directive('heading', function($document) {
  return {
    restrict: 'E',  
    templateUrl: 'views/heading.html',
    scope: {},
    link: function (scope, element) {
      var headerId = angular.element(document.querySelector('#header'));
      headerId.addClass('hideIt');
      var header = angular.element(document.querySelector('header'));

      scope.$on('event:show-header', function($event, $element){  
        if (headerId.hasClass('hideIt')){
          headerId.removeClass('hideIt');
          headerId.addClass('showIt');
        }
        header.addClass('expand');
      });  

      scope.$on('event:hide-header', function($event, $element){
        header.removeClass('expand');
        headerId.addClass('hideIt');
        headerId.removeClass('showIt');
      });
    }
  };
});
 
daniboomerangDirectives.directive('content', function($document) {
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
