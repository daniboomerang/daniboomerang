'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgIpadPro
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-ipad-pro>`is the iPad Pro
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 *
 * @usage
 * <div alive-svg-ipad-pro id="FE-ipad" enable-animations="svgsAnimatedStatus.ipadPro"></div>
 */

aliveSvgsDirectives.directive('aliveSvgIpadPro', function($interval, cancelAsynchPromiseService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { return '<div id="gaming" ng-include="\' ' + ALIVE_SVGS_BASE_URL + 'images/FE-ipadPro.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      /* Aux Variables */
      var currentWireId, currentWire, currentWireNumber;
      /* DOM Elements */
      var node, shockWaveNodeRuby;

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /* Wires and node */
        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');
        node = element.find('#ng-node'); 

        /* Interval Promises */
        var intervalPromiseWires, intervalPromiseServerNode;

        scope.$watch('enableAnimations', function(animationsStatus){
          if (animationsStatus) {
            if (intervalPromiseWires == undefined) { intervalPromiseWires = turnOnWires(); }
            if (intervalPromiseServerNode == undefined) { intervalPromiseServerNode = turnOnNode(); }
          }
          else if (animationsStatus == undefined || !animationsStatus) { 
            intervalPromiseWires = cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
            intervalPromiseServerNode = cancelAsynchPromiseService.cancelInterval(intervalPromiseServerNode);
          };
        });
      }

      /**********************************************/
      /**********************************************/
                /* AUXILIARY FUNCTIONS */
      /**********************************************/
      /**********************************************/

      function turnOnWires() { 
        return $interval(function() {
          console.log('IPADPRO Wires');
          currentWire.attr('class', 'visibility-hidden');
          currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
          currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }

      function turnOnNode() { 
        return $interval(function() {
          console.log('IPADPRO Node');
          (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
        }, 2500);
      }
    } 
  };
}); 