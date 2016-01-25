'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgBooks
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-books>` is one of the book cases. Which one will depend on the parameters 
 *
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 * @param {string=} books to know which book-case svg will be representing this directive
 *
 * @usage
 * <div alive-svg-books books="cliff" id="cliff-books" enable-animations="svgsAnimatedStatus.cliffBooks"></div>
 * <div alive-svg-books books="BE" id="BE-books" enable-animations="svgsAnimatedStatus.BEBooks"></div>
 * <div alive-svg-books books="FE" id="FE-books" enable-animations="svgsAnimatedStatus.FEBooks"></div>
 */

aliveSvgsDirectives.directive('aliveSvgBooks', function($interval, cancelAsynchPromiseService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { 
      var svgImg;
      if (attrs.books ==  'BE') { svgImg  = "\'" + ALIVE_SVGS_BASE_URL + "images/BE-books.svg\'" }
      else if (attrs.books ==  'FE') { svgImg  = "\'" + ALIVE_SVGS_BASE_URL + "images/FE-books.svg\'" }
      else { svgImg  = "\'" + ALIVE_SVGS_BASE_URL + "images/cliff-books.svg\'" }
      return '<div id="book-case" ng-include="' + svgImg + '"></div>';
    },
    link: function (scope, element, attrs) {

      var bookCase, engine, leftLight, rightLight;

      /****************************************/
      /* Waits the bookCase SVG to be loaded  */
      /****************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        bookCase = element.find('#book-case');
        /* Engines */
        engine = element.find('#ng-engine'); 
        /* Lights */
        leftLight = element.find('#ng-left-light'); 
        rightLight = element.find('#ng-right-light');


        /********************/
        /* BOOKS ANIMATIONS */
        /********************/
        
        // Interval promises 
        var intervalPromiseEngines, intervalPromiseLights;

        scope.$watch('enableAnimations', function(animationsStatus){
          if (animationsStatus) {
            if (intervalPromiseEngines == undefined) { intervalPromiseEngines = turnOnEngines(); } 
            if (intervalPromiseLights == undefined) { intervalPromiseLights = turnOnLights(); } 
          }
          else if (animationsStatus == undefined || !animationsStatus) { 
            intervalPromiseEngines = cancelAsynchPromiseService.cancelInterval(intervalPromiseEngines);
            intervalPromiseLights = cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
          };
        });
        
      }

      /**************************************************/
                   /* AUXILIARY FUNCTIONS */
      /**************************************************/

      function turnOnEngines() { 
        return $interval(function() {
          console.log(attrs.books, '- BOOKCASE Engine');
          (engine.attr('class') ==  (undefined || 'animated fadeOut')) ? engine.attr('class', 'animated fadeIn') : engine.attr('class', 'animated fadeOut');
        }, 2500);
      }
      function turnOnLights() {
        return $interval(function() {
          console.log(attrs.books, '- BOOKCASE Lights');
          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
        }, 2300);
      }
    }
  };
}); 
