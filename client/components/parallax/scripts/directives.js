'use strict';

/*
 * @ngdoc module
 * @name parallaxDirectives
 * @description
 * It groups all parallax directives. Defines relative base url
 */

var parallaxDirectives = angular.module('parallaxDirectives', []);

// Setting up Url into constant
parallaxDirectives.constant('SVGS_ANIMATED_STATUS', {
  iss: false,
  earthConnectivity: false,
  cliff: false,
  cliffBooks: false,
  BEEarth: false,
  BEBooks: false,
  ruby: false,
  FEEarth: false,
  FEBooks: false,
  ipadPro: false
});

// Setting up Url into constant
parallaxDirectives.constant('PARALLAX_BASE_URL', '/components/parallax/');

/**
 * @ngdoc directive
 * @name parallax
 * @module parallaxDirectives
 *
 * @restrict E
 *
 * @description
 * `<parallax>` is the pure css parallax structute that contains all the alive svgs and sections of daniboomerang
 * It is listening on scroll changes. It knows when any section is reached or left and executes the needed logic
 * like manipulate svgs or another sections
 *
 * @usage
 * <parallax></parallax>
 */

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
        $scope.$on('active-section:creativity-fromTop', function($event){ $scope.svgsAnimatedStatus.iss = true; });
        $scope.$on('active-section:without-boundaries-fromBottom', function($event){ $scope.svgsAnimatedStatus.iss = true; });
        
        /* THE EARTH CONNECTIVITY */
        $scope.$on('active-section:creativity-fromTop', function($event){ $scope.svgsAnimatedStatus.earthConnectivity = true; });
        $scope.$on('active-section:without-boundaries-fromBottom', function($event){ $scope.svgsAnimatedStatus.earthConnectivity = true; });
        
        /* THE CLIFF */
        $scope.$on('active-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliff = true; });
        $scope.$on('inactive-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliff = true; });
        
        /* THE BOOKS OF THE CLIFF */
        $scope.$on('active-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliffBooks = true; });
        $scope.$on('inactive-section:without-boundaries', function($event){ $scope.svgsAnimatedStatus.cliffBooks = false; });
        
        /* THE BE */  
          $scope.$on('active-section:back-end', function($event){ 
            /* THE EARTH , THE BOOKS, THE RUBY */
            $scope.svgsAnimatedStatus.BEEarth = true; 
            $scope.svgsAnimatedStatus.BEBooks = true;
            $scope.svgsAnimatedStatus.ruby = true;
          });
          $scope.$on('inactive-section:back-end', function($event){ 
            /* THE EARTH , THE BOOKS, THE RUBY */
            $scope.svgsAnimatedStatus.BEEarth = false; 
            $scope.svgsAnimatedStatus.BEBooks = false;
            $scope.svgsAnimatedStatus.ruby = false;
          });

        /* THE FE */
          $scope.$on('active-section:front-end', function($event){ 
            /* THE EARTH , THE BOOKS, THE IPADPRO */
            $scope.svgsAnimatedStatus.FEEarth = true; 
            $scope.svgsAnimatedStatus.FEBooks = true;
            $scope.svgsAnimatedStatus.ipadPro = true;
          });
          $scope.$on('inactive-section:front-end', function($event){ 
            /* THE EARTH , THE BOOKS, THE IPADPRO */
            $scope.svgsAnimatedStatus.FEEarth = false; 
            $scope.svgsAnimatedStatus.FEBooks = false;
            $scope.svgsAnimatedStatus.ipadPro = false;
          });

        /* ALL ANIMATIONS STOPPED ON TEXT SECTION  */
        $scope.$on('active-section:text', function($event){ 
          $scope.svgsAnimatedStatus.iss = false;
          $scope.svgsAnimatedStatus.earthConnectivity = false; 
          $scope.svgsAnimatedStatus.cliff = false;
          $scope.svgsAnimatedStatus.cliffBooks = false;
          $scope.svgsAnimatedStatus.BEEarth = false; 
          $scope.svgsAnimatedStatus.BEBooks = false;
          $scope.svgsAnimatedStatus.ruby = false;
          $scope.svgsAnimatedStatus.FEEarth = false;
          $scope.svgsAnimatedStatus.FEBooks = false;
          $scope.svgsAnimatedStatus.ipadPro = false;
        });
      }
    }
  }  
})

/**
 * @ngdoc directive
 * @name background
 * @module parallaxDirectives
 *
 * @restrict AE
 *
 * @description
 * `<background>` fills with an svg image the 100% of a div 
 * It uses the properties background-size: 100%; background-repeat: no-repeat
 * It waits until the image is loaded to set it up
 *
 * @param {string=} height of the div
 * @param {string=} image that will be in the background
 *
 * @usage
 * <div class="parallax__layer parallax__layer--deep" background height="150" image="BE-space">
 */

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