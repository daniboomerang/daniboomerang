'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgRuby
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-ruby>`is the Ruby node with the sinatra server 
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 *
 * @usage
 * <div alive-svg-ruby id="BE-ruby" enable-animations="svgsAnimatedStatus.ruby"></div>
 */

aliveSvgsDirectives.directive('aliveSvgRuby', function($interval, cancelAsynchPromiseService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { return '<div id="ruby" ng-include="\' ' + ALIVE_SVGS_BASE_URL + 'images/BE-ruby.svg\'"></div>';  },
    link: function (scope, element, attrs) {

       /* DOM Elements */
      var rubyPlatformLight, serverLight, serverReflect, node, shockWaveNodeRuby;
      /* Aux Variables */
      var currentWireId, currentWire, currentWireNumber;

      /************************************/
      /* Waits the ruby SVG to be loaded  */
      /************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /* Wires */  
        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');

        /* Server and node */
        rubyPlatformLight = element.find('#ng-ruby-platform-light'); 
        serverLight = element.find('#ng-server-light'); 
        serverReflect = element.find('#ng-server-reflect'); 
        node = element.find('#ng-node'); 
        shockWaveNodeRuby = element.find('#ng-ruby-shock-wave-node'); 

        /*******************/
        /* RUBY ANIMATIONS */
        /*******************/
        
        /* Interval Promises */
        var intervalPromiseWires, intervalPromiseLights;

        scope.$watch('enableAnimations', function(animationsStatus){
          if (animationsStatus) {
            if (intervalPromiseWires == undefined) { intervalPromiseWires = turnOnWires(); }
            if (intervalPromiseLights == undefined) { intervalPromiseLights = turnOnNodeAndLights(); }
          }
          else if (animationsStatus == undefined || !animationsStatus) { 
            intervalPromiseWires = cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
            intervalPromiseLights = cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
          };
        });
      }

      /**************************************************/
                   /* AUXILIARY FUNCTIONS */
      /**************************************************/

      function turnOnWires() { 
        return $interval(function() {
        console.log('RUBY Wires');
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }
      function turnOnNodeAndLights() {
        return $interval(function() {
        console.log('RUBY Node and Lights');
          (rubyPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rubyPlatformLight.attr('class', 'animated fadeIn') : rubyPlatformLight.attr('class', 'animated fadeOut');
          (serverLight.attr('class') ==  (undefined || 'animated fadeOut')) ? serverLight.attr('class', 'animated fadeIn') : serverLight.attr('class', 'animated fadeOut');
          (serverReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? serverReflect.attr('class', 'animated fadeIn') : serverReflect.attr('class', 'animated fadeOut');
          (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
          (shockWaveNodeRuby.attr('class') ==  (undefined || 'animated fadeOut')) ? shockWaveNodeRuby.attr('class', 'animated fadeIn') : shockWaveNodeRuby.attr('class', 'animated fadeOut');
        }, 2500);
      }
    } 
  }
}); 
