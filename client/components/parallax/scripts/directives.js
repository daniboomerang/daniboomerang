'use strict';

var parallaxDirectives = angular.module('parallaxDirectives', []);

// Setting up Url into constant
parallaxDirectives.constant('PARALLAX_BASE_URL', '/components/parallax/');
parallaxDirectives.directive('parallax', function(PARALLAX_BASE_URL) {
  return {
    restrict: 'E',
    templateUrl: PARALLAX_BASE_URL + 'views/parallax.html'
  }  
})

parallaxDirectives.directive('background', function(PARALLAX_BASE_URL) {
  return {
    restrict: 'AE',
    scope: { image: '@'},
    link: function (scope, element, attrs){
      element.addClass('visibility-hidden');
      function revealBackground(height, imgUrl, el) {  
        var backgroundStyle = 'height:'+ height + '%; width: 100%; background-size: 100%; background-repeat: no-repeat; background-image: url(\' ' + imgUrl + '\')';
        el.attr('style', backgroundStyle);
        el.removeClass('visibility-hidden');
        el.removeAttr('height');
        el.addClass('animated');
        el.addClass('fadeIn');
      }
      var img = new Image();
      img.onload = function () { revealBackground(attrs.height, img.src, element); }
      img.src = PARALLAX_BASE_URL + 'images/'+ scope.image +'.svg';
    }
  }
});