'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgCliff
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-cliff>` is the cliff
 *
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 *
 * @usage
 * <div alive-svg-cliff id="cliff" enable-animations="svgsAnimatedStatus.cliff"></div>
 */

aliveSvgsDirectives.directive('aliveSvgCliff', function($interval, cancelAsynchPromiseService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { return '<div id="cliff-rocket" ng-include="\' ' + ALIVE_SVGS_BASE_URL + 'images/cliff-rocket.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var rocket, centerLight, airStripLightZero, airStripLightOne;

      /************************************/
      /* Waits the cliff SVG to be loaded */
      /************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Rocket */
        var rocket = element.find('#ng-rocket'); 

        /* Rocket Lights */
        var rocketCenterLight = element.find('#ng-center-light'); 

        /* Land Reactors */
        var airStripLightZero = element.find('#ng-airstrip-light-0'); 
        var airStripLightOne = element.find('#ng-airstrip-light-1'); 

        /********************/
        /* CLIFF ANIMATIONS */
        /********************/

        // Interval promises 
        var intervalPromiseAirStripLights, intervalPromiseLights;

        scope.$watch('enableAnimations', function(animationsStatus){
          if (animationsStatus) {
            if (intervalPromiseAirStripLights == undefined) { intervalPromiseAirStripLights = turnOnAirStripLights(); }
            if (intervalPromiseLights == undefined) { intervalPromiseLights = turnOnLights(); }
          }
          else if (animationsStatus == undefined || !animationsStatus) { 
            intervalPromiseAirStripLights = cancelAsynchPromiseService.cancelInterval(intervalPromiseAirStripLights);
            intervalPromiseLights = cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
          };
        });

        /**************************************************/
                     /* AUXILIARY FUNCTIONS */
        /**************************************************/

        function turnOnAirStripLights() { 
          return $interval(function() {
            console.log('CLIFF Airstrips');
            (airStripLightZero.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightZero.attr('class', 'animated fadeIn') : airStripLightZero.attr('class', 'animated fadeOut');
            (airStripLightOne.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightOne.attr('class', 'animated fadeIn') : airStripLightOne.attr('class', 'animated fadeOut');
          }, 1000);
        }

        function turnOnLights() {
          return $interval(function() {
            console.log('CLIFF Rocket light');
            (rocketCenterLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rocketCenterLight.attr('class', 'animated fadeIn') : rocketCenterLight.attr('class', 'animated fadeOut');
          }, 2000);
        }
      }
    } 
  };
}); 
