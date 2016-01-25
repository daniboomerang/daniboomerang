'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgEarthConnectivity
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-earth-connectivity>` is the whole earth that represents connectivity
 *
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 *
 * @usage
 * <div alive-svg-earth-connectivity enable-animations="svgsAnimatedStatus.earthConnectivity" id="orbit-earth-connectivity">
 */

aliveSvgsDirectives.directive('aliveSvgEarthConnectivity', function($interval, $timeout, cancelAsynchPromiseService, nodeConnectionsService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { return '<div id="earth-connectivity" ng-include="\'' + ALIVE_SVGS_BASE_URL + 'images/moon-&-sun-&-earth-connections.svg\'"></div>'; },
    link: function (scope, element, attrs) {

      /***********************************/
      /* Waits the iss SVG to be loaded  */
      /***********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Connections */
        var connections, DOMElementConnections;

        // Create DOMElementConnections and init them
        var connections = nodeConnectionsService.getConnections();
        var DOMElementConnections = nodeConnectionsService.createDOMElementConnections(element, connections);
        for (var i=0; i<connections.length; i++){
          if (connections[i].isActive){
            // NODE CONNECTION IS VISSIBLE
            DOMElementConnections[i].nodeA.elementConnection.attr('class', 'animated fadeIn'); DOMElementConnections[i].nodeB.elementConnection.attr('class', 'animated fadeIn');
            // NODE SHOW WAVE IS NOT VISSIBLE
            DOMElementConnections[i].nodeA.elementShockWave.attr('class', 'animated fadeOut'); DOMElementConnections[i].nodeB.elementShockWave.attr('class', 'animated fadeOut');
            // NODE CENTER IS VISSIBLE
            DOMElementConnections[i].nodeA.elementCenter.attr('class', 'animated fadeIn'); DOMElementConnections[i].nodeB.elementCenter.attr('class', 'animated fadeIn');
            // THE CONNECTION IS VISSIBLE
            DOMElementConnections[i].connectionAB.elementConnection.attr('class', 'animated fadeIn');
          }
          else{
            // NODE CONNECTION IS VISSIBLE
            DOMElementConnections[i].nodeA.elementConnection.attr('class', 'animated fadeOut'); DOMElementConnections[i].nodeB.elementConnection.attr('class', 'animated fadeOut');
            // NODE SHOW WAVE IS NOT VISSIBLE
            DOMElementConnections[i].nodeA.elementShockWave.attr('class', 'animated fadeOut'); DOMElementConnections[i].nodeB.elementShockWave.attr('class', 'animated fadeOut');
            // NODE CENTER IS VISSIBLE
            DOMElementConnections[i].nodeA.elementCenter.attr('class', 'animated fadeOut'); DOMElementConnections[i].nodeB.elementCenter.attr('class', 'animated fadeOut');
            // THE CONNECTION IS VISSIBLE
            DOMElementConnections[i].connectionAB.elementConnection.attr('class', 'animated fadeOut');
          }
        }

        /********************/
        /* EARTH ANIMATIONS */
        /********************/

        // Interval Promises 
        var intervalPromiseEarthConnections;

        scope.$watch('enableAnimations', function(animationsStatus){
          if ((animationsStatus) && (intervalPromiseEarthConnections == undefined)) { intervalPromiseEarthConnections = turnOnEarthConnections(null); }
          else if (animationsStatus == undefined || !animationsStatus) { intervalPromiseEarthConnections = cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections); };
        });

        /**************************************************/
                     /* AUXILIARY FUNCTIONS */
        /**************************************************/
        
        function turnNode(side, node, elementConnection, elementCenter, elementShockWave, newStatus) {
          // TURNING IT OFF
          if (!newStatus) {
            nodeConnectionsService.decreaseNodeRemainingConnections(side, node.name);
            if (nodeConnectionsService.getNodeRemainingConnections(side, node.name) == 0){
              elementConnection.attr('class', 'animated fadeOut');
              elementCenter.attr('class', 'animated fadeOut');
            }
          }
          // TURNING IT ON
          else { 
            nodeConnectionsService.increaseNodeRemainingConnections(side, node.name);
            elementShockWave.attr('class', 'animated flash');
            if (nodeConnectionsService.getNodeRemainingConnections(side, node.name) == 1) {
              elementConnection.attr('class', 'animated fadeIn')
              elementCenter.attr('class', 'animated fadeIn');
            }
            $timeout(function() {
              elementShockWave.attr('class', 'animated fadeOut');
            }, 500);
          }
        }

        function turnNewConnection(side){   

          var availableConnectionIndexes, randomFreeIndex, connectionToTurn, currentConnectionAB, newStatus;
          
          availableConnectionIndexes = nodeConnectionsService.getAvailableConnectionIndexes(side);
          if (availableConnectionIndexes.length > 0) {
            randomFreeIndex = Math.round(Math.random() * (availableConnectionIndexes.length -1));
            // Getting the connection it gets locked
            connectionToTurn = nodeConnectionsService.getConnection(side, randomFreeIndex);
            currentConnectionAB = DOMElementConnections[randomFreeIndex].connectionAB.elementConnection;  
            newStatus = !connectionToTurn.isActive;
            turnNode(side, connectionToTurn.nodeA, DOMElementConnections[randomFreeIndex].nodeA.elementConnection, DOMElementConnections[randomFreeIndex].nodeA.elementCenter, DOMElementConnections[randomFreeIndex].nodeA.elementShockWave, newStatus);
            (currentConnectionAB.attr('class') ==  (undefined || 'animated fadeOut')) ? currentConnectionAB.attr('class', 'animated fadeIn') : currentConnectionAB.attr('class', 'animated fadeOut');
            turnNode(side, connectionToTurn.nodeB, DOMElementConnections[randomFreeIndex].nodeB.elementConnection, DOMElementConnections[randomFreeIndex].nodeB.elementCenter, DOMElementConnections[randomFreeIndex].nodeB.elementShockWave, newStatus);
            // Updating Connection gets it unlocked
            connectionToTurn.isActive = newStatus;
            nodeConnectionsService.updateConnection(side, randomFreeIndex, connectionToTurn);
          }
        }

        function turnOnEarthConnections(side){
          return $interval(function() {
          console.log('EARTH CONNECTIVITY new connection');
            turnNewConnection(side);
          }, 1500);
        }
      }
    } 
  };
}); 