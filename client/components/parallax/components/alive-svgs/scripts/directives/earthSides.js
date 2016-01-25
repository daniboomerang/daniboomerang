'use strict';

/**
 * @ngdoc directive
 * @name aliveSvgBeFeEarth
 * @module aliveSvgsDirectives
 *
 * @restrict EA
 *
 * @description
 * `<alive-svg-be-fe-earth>` is either the back-end or the front-end earth with its devices connected to the cloud
 *
 * @param {boolean=} [enableAnimations=false] If set to false the svg stops all its animations.
 * @param {string=} side to know which earth svg will be representing this directive
 *
 * @usage
 * <div alive-svg-be-fe-earth side="BE" id="BE-earth" enable-animations="svgsAnimatedStatus.BEEarth"></div>
 * <div alive-svg-be-fe-earth side="FE" id="FE-earth" enable-animations="svgsAnimatedStatus.FEEarth"></div>
 */

aliveSvgsDirectives.directive('aliveSvgBeFeEarth', function($interval, $timeout, cancelAsynchPromiseService, nodeConnectionsService, ALIVE_SVGS_BASE_URL) {
  return {
    restrict: 'EA',
    scope: { enableAnimations: '=' },
    template: function (elem, attrs) { var svgImg; (attrs.side ==  ('BE')) ? svgImg  = "\'" + ALIVE_SVGS_BASE_URL + "images/BE-earth.svg\'" : svgImg  = "\'" + ALIVE_SVGS_BASE_URL + "images/FE-earth.svg\'"; 
    return '<div id="earth-side" ng-include="' + svgImg + '"></div>';  },
    link: function (scope, element, attrs) {


      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* DOM Elements */
        // BE
        var sqlServerLight, sqlServerReflect, sqlPlatformLight, sqlNode, sqlShockWaveNode, mongoServerLight, mongoServerReflect, mongoPlatformLight, mongoNode, mongoShockWaveNode;
        // FE
        var nodeMaps, nodeJoystick;
       
        /* Connections */
        var connections, DOMElementConnections;
        
        if (attrs.side == 'BE') {
          
          /* BE Elements */
          sqlServerLight = element.find('#ng-sql-server-light'); 
          sqlServerReflect = element.find('#ng-sql-server-reflect'); 
          sqlPlatformLight = element.find('#ng-sql-platform-light'); 
          sqlNode = element.find('#ng-sql-node'); 
          sqlShockWaveNode = element.find('#ng-sql-shock-wave-node'); 
          mongoServerLight = element.find('#ng-mongo-server-light'); 
          mongoServerReflect = element.find('#ng-mongo-server-reflect'); 
          mongoPlatformLight = element.find('#ng-mongo-platform-light'); 
          mongoNode = element.find('#ng-mongo-node'); 
          mongoShockWaveNode = element.find('#ng-mongo-shock-wave-node'); 
        }
        else {
          
          /* FE Elements */
          nodeMaps = element.find('#ng-node-maps'); 
          nodeJoystick = element.find('#ng-node-joystick'); 
        }

        // Create DOMElementConnections and init them
        connections = nodeConnectionsService.getConnections(attrs.side);
        DOMElementConnections = nodeConnectionsService.createDOMElementConnections(element, connections);
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

        if (attrs.side == 'BE') {

          /***********************/
          /* BE EARTH ANIMATIONS */
          /***********************/

          // Interval Promises 
          var intervalPromiseMongo, intervalPromiseSQL, intervalPromiseEarthConnections;

          scope.$watch('enableAnimations', function(animationsStatus){
            if (animationsStatus) {
              if (intervalPromiseEarthConnections == undefined) { intervalPromiseEarthConnections = turnOnEarthConnections(attrs.side); }
              if (intervalPromiseSQL == undefined) { intervalPromiseSQL = turnOnSQL(); }
              if (intervalPromiseMongo == undefined) { intervalPromiseMongo = turnOnMongo(); }
            }
            else if (animationsStatus == undefined || !animationsStatus) { 
              intervalPromiseEarthConnections = cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections);
              intervalPromiseSQL = cancelAsynchPromiseService.cancelInterval(intervalPromiseSQL);
              intervalPromiseMongo = cancelAsynchPromiseService.cancelInterval(intervalPromiseMongo);
            };
          });
        }

        else {
 
          /***********************/
          /* FE EARTH ANIMATIONS */
          /***********************/

          // Interval Promises 
          var animateNodesPromise, intervalPromiseEarthConnections;

          scope.$watch('enableAnimations', function(animationsStatus){
            if (animationsStatus) {
              if (animateNodesPromise == undefined) { animateNodesPromise = turnOnMapsAndJoystick(); } 
              if (intervalPromiseEarthConnections == undefined) { intervalPromiseEarthConnections = turnOnEarthConnections(attrs.side); }
            }
            else if (animationsStatus == undefined || !animationsStatus) { 
              animateNodesPromise = cancelAsynchPromiseService.cancelInterval(animateNodesPromise);
              intervalPromiseEarthConnections = cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections);
            };
          });
        }

        /**********************************************/
                  /* AUXILIARY FUNCTIONS */
        /**********************************************/

        function turnOnEarthConnections(side){
          return $interval(function() {
            console.log(attrs.side,'- EARTH CONNECTIONS');
            turnNewConnection(side);
          }, 1500);
        }

        function turnOnMapsAndJoystick(){
          return $interval(function() {
            console.log(attrs.side,'- MAPS & JOYSTICK');
            (nodeMaps.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeMaps.attr('class', 'animated fadeIn') : nodeMaps.attr('class', 'animated fadeOut');
            (nodeJoystick.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeJoystick.attr('class', 'animated fadeIn') : nodeJoystick.attr('class', 'animated fadeOut');
          }, 2000);
        }

        function turnOnMongo(){
          return $interval(function() {  
            console.log(attrs.side,'- MONGO SERVER');
            (mongoServerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerLight.attr('class', 'animated fadeIn') : mongoServerLight.attr('class', 'animated fadeOut');
            (mongoServerReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerReflect.attr('class', 'animated fadeIn') : mongoServerReflect.attr('class', 'animated fadeOut');
            (mongoPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoPlatformLight.attr('class', 'animated fadeIn') : mongoPlatformLight.attr('class', 'animated fadeOut');
            (mongoNode.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoNode.attr('class', 'animated fadeIn') : mongoNode.attr('class', 'animated fadeOut');
            (mongoShockWaveNode.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoShockWaveNode.attr('class', 'animated fadeIn') : mongoShockWaveNode.attr('class', 'animated fadeOut');
          }, 2000);
        }

        function turnOnSQL(){
          return $interval(function() {  
            console.log(attrs.side,'- SQL SERVER');
            (sqlServerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlServerLight.attr('class', 'animated fadeIn') : sqlServerLight.attr('class', 'animated fadeOut');
            (sqlServerReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlServerReflect.attr('class', 'animated fadeIn') : sqlServerReflect.attr('class', 'animated fadeOut');
            (sqlPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlPlatformLight.attr('class', 'animated fadeIn') : sqlPlatformLight.attr('class', 'animated fadeOut');
            (sqlNode.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlNode.attr('class', 'animated fadeIn') : sqlNode.attr('class', 'animated fadeOut');
            (sqlShockWaveNode.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlShockWaveNode.attr('class', 'animated fadeIn') : sqlShockWaveNode.attr('class', 'animated fadeOut');
          }, 1500);
        }

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
      }
    } 
  };
}); 