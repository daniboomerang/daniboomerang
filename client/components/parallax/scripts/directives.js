'use strict';

var parallaxDirectives = angular.module('parallaxDirectives', []);

// Setting up Url into constant
parallaxDirectives.constant('SVGS_ANIMATED_STATUS', {
  iss: false,
  earthConnectivity: false
});

// Setting up Url into constant
parallaxDirectives.constant('PARALLAX_BASE_URL', '/components/parallax/');
parallaxDirectives.directive('parallax', function(PARALLAX_BASE_URL, SVGS_ANIMATED_STATUS) {
  return {
    restrict: 'E',
    templateUrl: PARALLAX_BASE_URL + 'views/parallax.html',
    controller: function($scope){

      init()

      function init(){
        initSVGsAnimationsStatus();
        listenScrollingChanges();
      }

      function initSVGsAnimationsStatus(){ $scope.svgsAnimatedStatus = SVGS_ANIMATED_STATUS; }
      function listenScrollingChanges(){

        /* THE ISS */
        $scope.$on('active-section:creativity-fromTop', function($event){  $scope.svgsAnimatedStatus.iss = true; });
        $scope.$on('active-section:without-boundaries-fromBottom', function($event){  $scope.svgsAnimatedStatus.iss = true; });
        
        /* THE EARTH CONNECTIVITY */
        $scope.$on('active-section:creativity-fromTop', function($event){ $scope.svgsAnimatedStatus.earthConnectivity = true; });
        $scope.$on('active-section:without-boundaries-fromBottom', function($event){ $scope.svgsAnimatedStatus.earthConnectivity = true; });
        
        /* THE CLIFF */
        $scope.$on('active-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliff = true; });
        $scope.$on('inactive-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliff = true; });
        
        /* ALL ANIMATIONS STOPPED ON TEXT SECTION  */
        $scope.$on('active-section:text', function($event){ 
          $scope.svgsAnimatedStatus.iss = false;
          $scope.svgsAnimatedStatus.earthConnectivity = false; 
          $scope.svgsAnimatedStatus.cliff = false;
        });


      }
    }
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