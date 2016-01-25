'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgIss
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-iss>`is the International Space Station
 *
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 *
 * @usage
 * <div alive-svg-iss enable-animations="svgsAnimatedStatus.iss" id="orbit-iss"></div> 
 */

aliveSvgsDirectives.directive('aliveSvgIss', function($interval, cancelAsynchPromiseService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { return '<div id="iss" class="spin-right-whole" ng-include="\' ' + ALIVE_SVGS_BASE_URL + 'images/iss.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var centerLight, lightOne, lightTwo, lightThree, lightFour;

      /**********************************/
      /* Waits the iss SVG to be loaded */
      /**********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Iss Lights */
        var issCenterLight = element.find('#ng-center-light'); 
        var issLightZero = element.find('#ng-light-0'); 
        var issLightOne = element.find('#ng-light-1'); 
        var issLightTwo = element.find('#ng-light-2'); 
        var issLightThree = element.find('#ng-light-3'); 
        
        /******************/
        /* ISS ANIMATIONS */
        /******************/

        // Interval promises 
        var intervalPromiseLights;

        scope.$watch('enableAnimations', function(animationsStatus){
          if ((animationsStatus) && (intervalPromiseLights == undefined)) { intervalPromiseLights = turnOnLights(); }
          else if (animationsStatus == undefined || !animationsStatus) { intervalPromiseLights = cancelAsynchPromiseService.cancelInterval(intervalPromiseLights) };
        });

        /**************************************************/
                     /* AUXILIARY FUNCTIONS */
        /**************************************************/

        function turnOnLights() {
          return $interval(function() {
            console.log('ISS lights');
            (issCenterLight.attr('class') ==  (undefined || 'animated fadeOut')) ? issCenterLight.attr('class', 'animated fadeIn') : issCenterLight.attr('class', 'animated fadeOut');
            (issLightZero.attr('class') ==  (undefined || 'animated fadeOut')) ? issLightZero.attr('class', 'animated fadeIn') : issLightZero.attr('class', 'animated fadeOut');
            (issLightOne.attr('class') ==  (undefined || 'animated fadeOut')) ? issLightOne.attr('class', 'animated fadeIn') : issLightOne.attr('class', 'animated fadeOut');
            (issLightTwo.attr('class') ==  (undefined || 'animated fadeOut')) ? issLightTwo.attr('class', 'animated fadeIn') : issLightTwo.attr('class', 'animated fadeOut');
            (issLightThree.attr('class') ==  (undefined || 'animated fadeOut')) ? issLightThree.attr('class', 'animated fadeIn') : issLightThree.attr('class', 'animated fadeOut');
          }, 1000);
        }  
      }
    } 
  };
}); 