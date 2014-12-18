var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('heading', function($document) {
  return {
    restrict: 'E',  
    templateUrl: 'views/heading.html',
    scope: {},
    link: function (scope, element) {

      var headerId = angular.element(document.querySelector('#header'));
      headerId.addClass('hideIt');
      $document.scrollToElementAnimated(headerId);

      var header = angular.element(document.querySelector('header'));

      scope.$on('duScrollspy:becameInactive', function($event, $element){  
        var hash = $element.prop('hash');
        if ('cover' == hash.substr(1)){
          console.log('Leaving ', hash.substr(1), ' area');
            if (headerId.hasClass('hideIt')){
              headerId.removeClass('hideIt');
              headerId.addClass('showIt');
            }
            header.addClass('expand');
        }
        

      });  
      scope.$on('duScrollspy:becameActive', function($event, $element){
        var hash = $element.prop('hash');
      
        if ('cover' == hash.substr(1)){
          console.log('Entering ', hash.substr(1), ' area');
          header.removeClass('expand')
          headerId.addClass('hideIt');
          headerId.removeClass('showIt');
        }
      });

    }
  };
});

daniboomerangDirectives.directive('content', function($document) {
  return {
    restrict: 'E',
    templateUrl: 'views/content/content.html',
    scope: {},
    rootScope: {},
    link: function (rootScope, scope, element) {
      var content = angular.element(document.querySelector('#content'));
      $document.scrollTop(300, 2000).then(function() {
        console && console.log('Showing Cover, scrolled to top');
      });
    }
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

daniboomerangDirectives.directive('cover', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/cover.html'
  };
});


