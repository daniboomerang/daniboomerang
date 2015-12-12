'use strict';

var parallaxDirectives = angular.module('parallaxDirectives', []);

// Setting up Url into constant
parallax.constant('PARALLAX_DIRECTIVES_BASE_URL', '/components/parallax/');
parallax.directive('parallax', function(PARALLAX_DIRECTIVES_BASE_URL) {
  return {
    restrict: 'E',
    templateUrl: PARALLAX_DIRECTIVES_BASE_URL + 'views/parallax.html'
  }  
})


parallax.directive('background', function(PARALLAX_DIRECTIVES_BASE_URL) {
  return {
    restrict: 'E',
    scope: {
      image: '@'
    },
    template: '<div class="animated visibility-hidden" style="height:{{height}}%; width: 100%; background-size: 100%; background-repeat: no-repeat; background-image: url({{imgUrl}});"</div>',
    link: function (scope, element, attrs){

      function isImageLoaded(img) {
        if (!img.complete) {return false;}
        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) { return false; }
        return true;
      }

      function revealBackground(height, imgUrl, el) {
        scope.height = height;
        scope.imgUrl = imgUrl;
        scope.$apply();
        el.removeClass('visibility-visible');
        el.addClass('fadeIn');
      }
      var img = new Image();
      if (!isImageLoaded(img)) {
        img.onload = function () { 
         revealBackground(attrs.height, img.src, element.find('.animated')); 
        }
      }
      img.src = PARALLAX_DIRECTIVES_BASE_URL + 'images/'+ scope.image +'.svg';
    }
  }
});