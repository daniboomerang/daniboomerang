var daniboomerangAliveSvgDirectives = angular.module('daniboomerangAliveSvgDirectives', ['daniboomerangServices']);

/********************************/
/** ALIVE SVG IMAGES DIRECTIVE **/
/********************************/

daniboomerangAliveSvgDirectives.directive('aliveSvg', function($interval, $timeout) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: function (elem, attrs) { return '/images/' + attrs.name + '.svg'; },
    link: function (scope, element, attrs) {
       
        // ET SCENE
        scope.$on('active-section:contact', function($event){ $timeout(function() { scope.showEtFingerLight = true; }, 2500); })
        scope.$on('inactive-section:contact', function($event) { $timeout(function() { scope.showEtFingerLight = false; }, 2000); })
    }
  };
});  

daniboomerangAliveSvgDirectives.directive('aliveSvgIss', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="iss" class="spin-right-whole" ng-include="\'/images/iss.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var centerLight;

      /***********************************/
      /* Waits the iss SVG to be loaded  */
      /***********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Iss Lights */
        issCenterLight = element.find('#ng-center-light'); 

        // Interval promises 
        var intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:remote-working', function($event){ 
          intervalPromiseLights = turnOnLights();
        });

        // And we stop them when we exit the section
        scope.$on('inactive-section:remote-working', function($event){ 
          cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
        });
     
        function turnOnLights() {
          return $interval(function() {
            (issCenterLight.attr('class') ==  (undefined || 'animated fadeOut')) ? issCenterLight.attr('class', 'animated fadeIn') : issCenterLight.attr('class', 'animated fadeOut');
          }, 2000);
        }  
      }
    } 
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgCliff', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="cliff-rocket" ng-include="\'/images/cliff-rocket.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var rocket, centerLight, airStripLightZero, airStripLightOne;

      /************************************/
      /* Waits the cliff SVG to be loaded */
      /************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Rocket */
        rocket = element.find('#ng-rocket'); 

        /* Rocket Lights */
        rocketCenterLight = element.find('#ng-center-light'); 

        /* Land Reactors */
        airStripLightZero = element.find('#ng-airstrip-light-0'); 
        airStripLightOne = element.find('#ng-airstrip-light-1'); 

        // Interval promises 
        var intervalPromiseAirStripLights, intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:without-boundaries', function($event){ 
          //rocket.attr('class', 'soft-suspension');
          intervalPromiseAirStripLights = turnOnAirStripLights();
          intervalPromiseLights = turnOnLights();
        });

        // And we stop them when we exit the section
        scope.$on('inactive-section:without-boundaries', function($event){ 
          //rocket.attr('class', '');
          cancelAsynchPromiseService.cancelInterval(intervalPromiseAirStripLights);
          cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
        });
      }

      function turnOnAirStripLights() { 
        return $interval(function() {
          (airStripLightZero.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightZero.attr('class', 'animated fadeIn') : airStripLightZero.attr('class', 'animated fadeOut');
          (airStripLightOne.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightOne.attr('class', 'animated fadeIn') : airStripLightOne.attr('class', 'animated fadeOut');
        }, 1000);
      }

      function turnOnLights() {
        return $interval(function() {
          (rocketCenterLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rocketCenterLight.attr('class', 'animated fadeIn') : rocketCenterLight.attr('class', 'animated fadeOut');
        }, 2000);
      }
    } 
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgBooks', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { var svgImg; (attrs.books ==  ('BE')) ? svgImg  = "\'/images/BE-books.svg\'" : svgImg  = "\'/images/FE-books.svg\'"; return '<div id="book-case" ng-include="' + svgImg + '"></div>';  },
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
        
        var onActiveSection, onInactiveSection;
        (attrs.books ==  ('BE')) ? onActiveSection = "active-section:back-end" : onActiveSection = "active-section:front-end";
        (attrs.books ==  ('BE')) ? onInactiveSection = "inactive-section:back-end" : onInactiveSection = "active-section:front-end";

        // Interval promises 
        var intervalPromiseEngines, intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on(onActiveSection, function($event){ 
          intervalPromiseEngines = turnOnEngines();
          intervalPromiseLights = turnOnLights();
        });

        // And we stop them when we exit the section
        scope.$on(onInactiveSection, function($event){ 
          cancelAsynchPromiseService.cancelInterval(intervalPromiseEngines);
          cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
        });
      }

      function turnOnEngines() { 
        return $interval(function() {
          (engine.attr('class') ==  (undefined || 'animated fadeOut')) ? engine.attr('class', 'animated fadeIn') : engine.attr('class', 'animated fadeOut');
        }, 2500);
      }
      function turnOnLights() {
        return $interval(function() {
          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
        }, 2300);
      }
    }
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgRuby', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="ruby" ng-include="\'/images/BE-ruby.svg\'"></div>';  },
    link: function (scope, element, attrs) {

       /* DOM Elements */
      var rubyPlatformLight, serverLight, serverReflect, node, shockWaveNodeRuby;
      /* Aux Variables */
      var currentWireId, currentWire, currentWireNumber;

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /*********/
        // WIRES //
        /*********/
        
        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');

        /*******************/
        /* SERVER AND NODE */
        /*******************/

        rubyPlatformLight = element.find('#ng-ruby-platform-light'); 
        serverLight = element.find('#ng-server-light'); 
        serverReflect = element.find('#ng-server-reflect'); 
        node = element.find('#ng-node'); 
        shockWaveNodeRuby = element.find('#ng-ruby-shock-wave-node'); 

        /* Interval Promises */
        var intervalPromiseWires, intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:back-end', function($event){ 
          intervalPromiseWires = turnOnWires();
          intervalPromiseLights = turnOnNodeAndLights();
        });
        
        // And we stop them when we exit the section
        scope.$on('inactive-section:back-end', function($event){ 
          cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
          cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
        });
      }

      function turnOnWires() { 
        return $interval(function() {  
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }
      function turnOnNodeAndLights() {
        return $interval(function() {  
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

daniboomerangAliveSvgDirectives.directive('aliveSvgBeFeEarth', function($interval, $timeout, cancelAsynchPromiseService, nodeConnectionsService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { var svgImg; (attrs.side ==  ('BE')) ? svgImg  = "\'/images/BE-earth.svg\'" : svgImg  = "\'/images/FE-earth.svg\'"; return '<div id="earth-side" ng-include="' + svgImg + '"></div>';  },
    link: function (scope, element, attrs) {

      /* DOM Elements */
      // BE
      var sqlServerLight, sqlServerReflect, sqlPlatformLight, sqlNode, sqlShockWaveNode, mongoServerLight, mongoServerReflect, mongoPlatformLight, mongoNode, mongoShockWaveNode;
      // FE
      var nodeMap, nodeLaptop;
      /* Aux Variables */
      var availableConnectionIndexes, randomFreeIndex, connectionToTurn, newStatus;
      /* Connections */
      var connections, DOMElementConnections;

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
        
        if (attrs.side == 'BE') {
          /***************/
          /* BE ELEMENTS */
          /***************/
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
          /***************/
          /* FE ELEMENTS */
          /***************/
          nodeMaps = element.find('#ng-node-maps'); 
          nodeLaptop = element.find('#ng-node-laptop'); 
        }

        // Create DOMElementConnections and init them
        connections = nodeConnectionsService.getConnections(attrs.side);
        DOMElementConnections = createDOMElementConnections(connections);
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

          scope.$on('active-section:back-end', function($event){ 
            intervalPromiseEarthConnections = turnOnEarthConnections(attrs.side);
            intervalPromiseSQL = turnOnSLQ();
            intervalPromiseMongo = turnOnMongo();
          });

          // And we stop them when we exit that section
          scope.$on('inactive-section:back-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseMongo);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseSQL);
          });
        }

        else {
 
          /***********************/
          /* FE EARTH ANIMATIONS */
          /***********************/

          // Interval Promises 
          var animateNodesPromise, intervalPromiseEarthConnections;

          scope.$on('active-section:front-end', function($event){ 
            animateNodesPromise = turnOnMapsAndLaptop();
            intervalPromiseEarthConnections = turnOnEarthConnections();
          });

          // And we stop them when we exit that section
          scope.$on('inactive-section:front-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(animateNodesPromise);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections);
          });
        }
      }

      function turnOnEarthConnections(side){
        return $interval(function() {  
          turnNewConnection(side);
        }, 2500);
      }

      function turnOnMapsAndLaptop(){
        return $interval(function() {  
          (nodeMaps.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeMaps.attr('class', 'animated fadeIn') : nodeMaps.attr('class', 'animated fadeOut');
          (nodeLaptop.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeLaptop.attr('class', 'animated fadeIn') : nodeLaptop.attr('class', 'animated fadeOut');
        }, 2000);
      }

      function turnOnSLQ(){
        return intervalPromise = $interval(function() {  
          // SQL Server
          (mongoServerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerLight.attr('class', 'animated fadeIn') : mongoServerLight.attr('class', 'animated fadeOut');
          (mongoServerReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerReflect.attr('class', 'animated fadeIn') : mongoServerReflect.attr('class', 'animated fadeOut');
          (mongoPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoPlatformLight.attr('class', 'animated fadeIn') : mongoPlatformLight.attr('class', 'animated fadeOut');
          (mongoNode.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoNode.attr('class', 'animated fadeIn') : mongoNode.attr('class', 'animated fadeOut');
          (mongoShockWaveNode.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoShockWaveNode.attr('class', 'animated fadeIn') : mongoShockWaveNode.attr('class', 'animated fadeOut');
        }, 2000);
      }

      function turnOnMongo(){
        // Mongo Server
        return intervalPromiseSQL = $interval(function() {  
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
          elementShockWave.attr('class', 'animated fadeIn');
          if (nodeConnectionsService.getNodeRemainingConnections(side, node.name) == 1) {
            elementConnection.attr('class', 'animated fadeIn')
            elementCenter.attr('class', 'animated fadeIn');
          }
          $timeout(function() {
            elementShockWave.attr('class', 'animated fadeOut');
          }, 500);        }
      }

      function turnNewConnection(side){   
        
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

      function createDOMElementConnections(connections){
        var DOMElementConnections = [];
        var currentElement;
        for (var i=0; i<connections.length; i++){
          currentElement = { nodeA: {}, connectionAB: {}, nodeB: {} };
          currentElement.nodeA = { elementConnection: element.find(connections[i].nodeA.connection),
                                   elementShockWave: element.find(connections[i].nodeA.shockWave),
                                   elementCenter: element.find(connections[i].nodeA.center) }
          currentElement.connectionAB = { elementConnection: element.find(connections[i].connectionAB.name) }                                   
          currentElement.nodeB = { elementConnection: element.find(connections[i].nodeB.connection),
                                   elementShockWave: element.find(connections[i].nodeB.shockWave),
                                   elementCenter: element.find(connections[i].nodeB.center) }
          DOMElementConnections.push(currentElement);
        }
        return DOMElementConnections;
      }
    } 
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgGaming', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="gaming" ng-include="\'/images/FE-gaming.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      /* Aux Variables */
      var currentWireId, currentWire, currentWireNumber;
      /* DOM Elements */
      var node, shockWaveNodeRuby;

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /*****************/
        // WIRES AND NODE//
        /*****************/

        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');
        node = element.find('#ng-node'); 

        /* Interval Promises */
        var intervalPromiseWires, intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:front-end', function($event){ 
          intervalPromiseWires = turnOnWires();
          intervalPromiseServerNode = turnOnNode();
        });

        // And we stop them when we exit the section
        scope.$on('inactive-section:front-end', function($event){ 
          cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
          cancelAsynchPromiseService.cancelInterval(intervalPromiseServerNode);
        });
      }

      function turnOnWires() { 
        return $interval(function() {  
          currentWire.attr('class', 'visibility-hidden');
          currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
          currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }

      function turnOnNode() { 
        return $interval(function() {  
          (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
        }, 2500);
      }
    } 
  };
}); 