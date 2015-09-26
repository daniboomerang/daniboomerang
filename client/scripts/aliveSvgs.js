var daniboomerangAliveSvgDirectives = angular.module('daniboomerangAliveSvgDirectives', ['daniboomerangServices']);

/********************************/
/** ALIVE SVG IMAGES DIRECTIVE **/
/********************************/

daniboomerangAliveSvgDirectives.directive('aliveSvgIss', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="iss" class="spin-right-whole" ng-include="\'/images/iss.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var centerLight, lightOne, lightTwo, lightThree, lightFour;

      /***********************************/
      /* Waits the iss SVG to be loaded  */
      /***********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Iss Lights */
        issCenterLight = element.find('#ng-center-light'); 
        issLightZero = element.find('#ng-light-0'); 
        issLightOne = element.find('#ng-light-1'); 
        issLightTwo = element.find('#ng-light-2'); 
        issLightThree = element.find('#ng-light-3'); 
        
        // Interval promises 
        var intervalPromiseLights;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:creativity-fromTop', function($event){ intervalPromiseLights = turnOnLights(); });
        scope.$on('active-section:without-boundaries-fromBottom', function($event){ intervalPromiseLights = turnOnLights(); });

        // And we stop them when we exit its sections section
        scope.$on('active-section:connectivity-fromBottom', function($event){ cancelAsynchPromiseService.cancelInterval(intervalPromiseLights); });
        scope.$on('active-section:about-fromTop', function($event){ cancelAsynchPromiseService.cancelInterval(intervalPromiseLights); });
     
        function turnOnLights() {
          return $interval(function() {
            console.log('here an $interval');
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

daniboomerangAliveSvgDirectives.directive('aliveSvgEt', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="et-scene" ng-include="\'/images/et-contact-scene.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      /**********************************/
      /* Waits the et SVG to be loaded  */
      /**********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Finger Lights */
        etFingerLight = element.find('#ng-et-finger-light'); 
        
        // Interval promises 
        var intervalPromiseFinger;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:contact', function($event){ intervalPromiseFinger = lightUpFinger(); });
        scope.$on('inactive-section:contact', function($event){ intervalPromiseFinger = lightDownFinger(); });
      }

      function lightUpFinger(){ etFingerLight.attr('style', ''); etFingerLight.attr('class', 'animated fadeIn'); }
      function lightDownFinger(){ etFingerLight.attr('style', '-moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s;'); etFingerLight.attr('class', 'animated fadeOut'); }

    }
  };
});  

daniboomerangAliveSvgDirectives.directive('aliveSvgEarthConnectivity', function($interval, $timeout, cancelAsynchPromiseService, nodeConnectionsService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="earth-connectivity" ng-include="\'/images/moon-&-sun-&-earth-connections.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      /***********************************/
      /* Waits the iss SVG to be loaded  */
      /***********************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
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

        /********************/
        /* EARTH ANIMATIONS */
        /********************/

        // Interval Promises 
        var intervalPromiseEarthConnections;

        // We trigger the animations only when we are in the section
        scope.$on('active-section:creativity-fromTop', function($event){ intervalPromiseEarthConnections = turnOnEarthConnections('both'); });
        scope.$on('active-section:without-boundaries-fromBottom', function($event){ intervalPromiseEarthConnections = turnOnEarthConnections('both'); });
        /*scope.$on('active-section:remote-working', function($event){ 
          if ((intervalPromiseEarthConnections != undefined) && intervalPromiseEarthConnections.cancelled ){
            intervalPromiseEarthConnections = turnOnEarthConnections('both');
          } 
        });*/  
        /*scope.$on('active-section:creativity', function($event){ 
          if ((intervalPromiseEarthConnections != undefined) && intervalPromiseEarthConnections.cancelled ){
            intervalPromiseEarthConnections = turnOnEarthConnections('both');
          } 
        });*/ 
        // And we stop them when we exit its sections section
        scope.$on('active-section:connectivity-fromBottom', function($event){ cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections); });
        scope.$on('active-section:about-fromTop', function($event){ cancelAsynchPromiseService.cancelInterval(intervalPromiseEarthConnections); });
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
        console.log('here an $interval') ;
          turnNewConnection(side);
        }, 1500);
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
          rocket.attr('class', '');
          cancelAsynchPromiseService.cancelInterval(intervalPromiseAirStripLights);
          cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
        });
      }

      function turnOnAirStripLights() { 
        return $interval(function() {
          console.log('here an $interval');
          (airStripLightZero.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightZero.attr('class', 'animated fadeIn') : airStripLightZero.attr('class', 'animated fadeOut');
          (airStripLightOne.attr('class') ==  (undefined || 'animated fadeOut')) ? airStripLightOne.attr('class', 'animated fadeIn') : airStripLightOne.attr('class', 'animated fadeOut');
        }, 1000);
      }

      function turnOnLights() {
        return $interval(function() {
          console.log('here an $interval');
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
    template: function (elem, attrs) { 
      var svgImg;
      if (attrs.books ==  'BE') { svgImg  = "\'/images/BE-books.svg\'" }
      else if (attrs.books ==  'FE') { svgImg  = "\'/images/FE-books.svg\'" }
      else { svgImg  = "\'/images/cliff-books.svg\'" }
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
        
        var onActiveSection, onInactiveSection;
        if (attrs.books ==  'BE') {  onActiveSection = "active-section:back-end"; onInactiveSection = "inactive-section:back-end"; }
        if (attrs.books ==  'FE') {  onActiveSection = "active-section:front-end"; onInactiveSection = "inactive-section:front-end"; }
        if (attrs.books ==  'cliff') {  onActiveSection = "active-section:without-boundaries"; onInactiveSection = "inactive-section:without-boundaries"; }
      
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
          console.log('here an $interval');
          (engine.attr('class') ==  (undefined || 'animated fadeOut')) ? engine.attr('class', 'animated fadeIn') : engine.attr('class', 'animated fadeOut');
        }, 2500);
      }
      function turnOnLights() {
        return $interval(function() {
          console.log('here an $interval');
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
        console.log('here an $interval')  ;
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }
      function turnOnNodeAndLights() {
        return $interval(function() {
        console.log('here an $interval')  ;
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

        // We trigger the animations only when we are in the section
          scope.$on('active-section:front-end', function($event){ 
            animateNodesPromise = turnOnMapsAndLaptop();
            intervalPromiseEarthConnections = turnOnEarthConnections(attrs.side);
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
          console.log('here an $interval')  ;
          turnNewConnection(side);
        }, 1500);
      }

      function turnOnMapsAndLaptop(){
        return $interval(function() {
          console.log('here an $interval')  ;
          (nodeMaps.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeMaps.attr('class', 'animated fadeIn') : nodeMaps.attr('class', 'animated fadeOut');
          (nodeLaptop.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeLaptop.attr('class', 'animated fadeIn') : nodeLaptop.attr('class', 'animated fadeOut');
        }, 2000);
      }

      function turnOnSLQ(){
        return $interval(function() {  
          console.log('here an $interval');
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
        return $interval(function() {  
                    console.log('here an $interval');
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
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgIpadPro', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="gaming" ng-include="\'/images/FE-ipadPro.svg\'"></div>';  },
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
        console.log('here an $interval')  ;
          currentWire.attr('class', 'visibility-hidden');
          currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
          currentWire.attr('class', 'animated fadeIn');
        }, 2000);
      }

      function turnOnNode() { 
        return $interval(function() {
        console.log('here an $interval')  ;
          (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
        }, 2500);
      }
    } 
  };
}); 

 