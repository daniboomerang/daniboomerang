var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

daniboomerangDirectives.directive('topnavbar', function($timeout, $document) {
  return {
    restrict: 'E',  
    templateUrl: 'views/topnavbar.html',
    link: function (scope, element) {

      init();

      function init(){

        var header = element.find('header');

        var whoIAmLink = element.find('#who-i-am-link');
        var whoIAmIcon = element.find('#who-i-am-icon');
        var whatILikeLink = element.find('#what-i-like-link');
        var whatILikeIcon = element.find('#what-i-like-icon');
        var whatIveDoneLink = element.find('#what-ive-done-link');
        var whatIveDoneIcon = element.find('#what-ive-done-icon');
        var whatIveLearntLink = element.find('#what-ive-learnt-link');
        var whatIveLearntIcon = element.find('#what-ive-learnt-icon');

        scope.$on('event:activeArea', function($event, area){ 
          if (area == 'Cover'){
            header.removeClass('expand');
          }
          else if (area == 'Who I am'){
            whoIAmLink.addClass('active');
            whoIAmIcon.addClass('faa-pulse animated fa-3x');
          }
          else if (area == 'What I like'){
            whatILikeLink.addClass('active');
            whatILikeIcon.addClass('faa-pulse animated fa-3x');            
          }
          else if (area == 'What I´ve done'){
            whatIveDoneLink.addClass('active');
            whatIveDoneIcon.addClass('faa-pulse animated fa-3x');
          }
          else if (area == 'What I´ve learnt'){
            whatIveLearntLink.addClass('active');
            whatIveLearntIcon.addClass('faa-pulse animated fa-3x');
          }

        });  

        scope.$on('event:inactiveArea', function($event, area){

          if (area == 'Cover'){
            header.addClass('expand');
            header.addClass('fixed');
          }
          else if (area == 'Who I am'){
            whoIAmLink.removeClass('active')
            whoIAmIcon.removeClass('faa-pulse animated fa-3x')
          }
          else if (area == 'What I like'){          
            whatILikeLink.removeClass('active')
            whatILikeIcon.removeClass('faa-pulse animated fa-3x')
          }
          else if (area == 'What I´ve done'){
            whatIveDoneLink.removeClass('active')
            whatIveDoneIcon.removeClass('faa-pulse animated fa-3x')
          }
          else if (area == 'What I´ve learnt'){
            whatIveLearntLink.removeClass('active')
            whatIveLearntIcon.removeClass('faa-pulse animated fa-3x')
          }

        });
      }
    }
  };
});
 
daniboomerangDirectives.directive('cover', function($document, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/cover.html',
    scope: {},
    link: function (scope, element) {
      scope.sections = [
        {hash: '#who-i-am', text:'Who I am', awesomeIcon: 'fa-chevron-circle-down  fa-rotate-90', animation:'fx-zoom-left'},
        {hash: '#what-i-like', text:'What I Like', awesomeIcon: 'fa-heart', animation:'fx-zoom-left'},
        {hash: '#what-ive-done', text:'What I´ve done', awesomeIcon: 'fa-github', animation:'fx-zoom-right'},
        {hash: '#what-ive-learnt', text:'Who I´ve learnt', awesomeIcon: 'fa-newspaper-o', animation:'fx-zoom-right'}
      ];
      scope.share = [
        {awesomeIcon: 'fa-fw fa-facebook', animation:'fx-zoom-left'},
        {awesomeIcon: 'fa-fw fa-google-plus', animation:'fx-zoom-left'},
        {awesomeIcon: 'fa-fw fa-twitter', animation:'fx-zoom-right'},
        {awesomeIcon: 'fa-fw fa-linkedin', animation:'fx-zoom-right'}
      ];
    }
  }  
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
