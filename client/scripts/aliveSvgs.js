
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
        // ISS LIGHTS 
        $interval(function() { scope.issLight = '#' + Math.floor(Math.random()*16777215).toString(16); }, 1000);
        // ET SCENE
        scope.$on('active-section:contact', function($event){ $timeout(function() { scope.showEtFingerLight = true; }, 2500); })
        scope.$on('inactive-section:contact', function($event) { $timeout(function() { scope.showEtFingerLight = false; }, 2000); })
    }
  };
});  

daniboomerangAliveSvgDirectives.directive('aliveSvgCliff', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="cliff-rocket" ng-include="\'/images/cliff-rocket.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var rocket, leftLight, rightLight, landReactorZero, landReactorOne, landReactorTwo;

      /*************************************/
      /* Waits the cliff SVG to be loaded  */
      /*************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /* Rocket */
        rocket = element.find('#ng-rocket'); 

        /* Rocket Lights */
        leftLight = element.find('#ng-left-light'); 
        rightLight = element.find('#ng-right-light');

        /* Land Reactors */
        landReactorZero = element.find('#ng-land-reactor-0'); 
        landReactorOne = element.find('#ng-land-reactor-1'); 
        landReactorTwo = element.find('#ng-land-reactor-2'); 

        scope.$on('active-section:without-boundaries', function($event){ 

          //rocket.attr('class', 'soft-suspension');

          // We trigger the animatiions only when we are in the creativity section
          var intervalPromiseLandReactors = turnOnLandReactors();
          var intervalPromiseLights = turnOnLights();

          // And we stop them when we exit that section
          scope.$on('inactive-section:without-boundaries', function($event){ 
            //rocket.attr('class', '');
            cancelAsynchPromiseService.cancelInterval(intervalPromiseLandReactors);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
          });
        });
      }

      function turnOnLandReactors() { 
        return $interval(function() {
          (landReactorZero.attr('class') ==  (undefined || 'animated fadeOut')) ? landReactorZero.attr('class', 'animated fadeIn') : landReactorZero.attr('class', 'animated fadeOut');
          (landReactorOne.attr('class') ==  (undefined || 'animated fadeOut')) ? landReactorOne.attr('class', 'animated fadeIn') : landReactorOne.attr('class', 'animated fadeOut');
          (landReactorTwo.attr('class') ==  (undefined || 'animated fadeOut')) ? landReactorTwo.attr('class', 'animated fadeIn') : landReactorTwo.attr('class', 'animated fadeOut');
        }, 1750);
      }

      function turnOnLights() {
        $timeout(function() {
          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
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

          scope.$on(onActiveSection, function($event){ 
            // We trigger the animatiions only when we are in the Back-end section
            var intervalPromiseEngines = turnOnEngines();
            var intervalPromiseLights = turnOnLights();

            // And we stop them when we exit that section
            scope.$on(onInactiveSection, function($event){ 
              cancelAsynchPromiseService.cancelInterval(intervalPromiseEngines);
              cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
            });
          });
      }

      function turnOnEngines() { 
        //$timeout(function() { bookCase.attr('class', 'suspension'); }, 3600);
        (engine.attr('class') ==  (undefined || 'animated fadeOut')) ? engine.attr('class', 'animated fadeIn') : engine.attr('class', 'animated fadeOut');
      }

      function turnOnLights() {
        $timeout(function() {
          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
        }, 2000);
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

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /*********/
        // WIRES //
        /*********/
        var currentWireId;
        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        var currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');
        var currentWireNumber;

        /******************/
        /* SERVER AND NODE*/
        /******************/
        var rubyPlatformLight = element.find('#ng-ruby-platform-light'); 
        var serverLight = element.find('#ng-server-light'); 
        var serverReflect = element.find('#ng-server-reflect'); 
        var node = element.find('#ng-node'); 

        scope.$on('active-section:back-end', function($event){ 

          // We trigger the animatiions only when we are in the back-end section
          var intervalPromiseWires = $interval(function() {  
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
          }, 1000);

          var intervalPromiseLights = $interval(function() {  
            (rubyPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rubyPlatformLight.attr('class', 'animated fadeIn') : rubyPlatformLight.attr('class', 'animated fadeOut');
            (serverLight.attr('class') ==  (undefined || 'animated fadeOut')) ? serverLight.attr('class', 'animated fadeIn') : serverLight.attr('class', 'animated fadeOut');
            (serverReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? serverReflect.attr('class', 'animated fadeIn') : serverReflect.attr('class', 'animated fadeOut');
            (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
          }, 2100);

          // And we stop them when we exit that section
          scope.$on('inactive-section:back-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseLights);
          });
        });
      }
    } 
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgBeEarth', function($interval, $timeout, cancelAsynchPromiseService, nodeConnexionsService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="earth-right" ng-include="\'/images/BE-earth-test.svg\'"></div>';  },
    link: function (scope, element, attrs) {


      scope.$on('$includeContentLoaded', function () { init(); });
        
      function turnNode(node, newStatus) {
        // TURNING IT OFF
        if (!newStatus) {
          nodeConnexionsService.decreaseNodeRemainingConnections(node.name);
          if (nodeConnexionsService.getNodeRemainingConnections(node.name) == 0){
            element.find(node.elements[0]).attr('class', 'animated fadeOut');
            //$timeout(function() {
              element.find(node.elements[1]).attr('class', 'animated fadeOut')
            //}, 500);
          }
        }
        // TURNING IT ON
        else { 
          nodeConnexionsService.increaseNodeRemainingConnections(node.name);
          if (nodeConnexionsService.getNodeRemainingConnections(node.name) == 1){
            element.find(node.elements[0]).attr('class', 'animated fadeIn');
            //$timeout(function() {
              element.find(node.elements[1]).attr('class', 'animated fadeIn')
            //}, 500);
          }
        }
      }

      function turnRandomConnection(connections){   
        
        var randomIndex = Math.round(Math.random() * 2);
        var randomConnection = connections[randomIndex];

        // Dealing with the connections
        var newStatus = !randomConnection.isActive;
        $timeout(function() {
          turnNode(randomConnection.nodeA, newStatus);
        }, 500);
        $timeout(function() {
          (element.find(randomConnection.connectionAB.name).attr('class') ==  (undefined || 'animated fadeOut')) ? element.find(randomConnection.connectionAB.name).attr('class', 'animated fadeIn') : element.find(randomConnection.connectionAB.name).attr('class', 'animated fadeOut');
        }, 1500);  
        $timeout(function() {
          turnNode(randomConnection.nodeB, newStatus);
        }, 2000);
        randomConnection.isActive = newStatus;

        // Updating Connections
        connections[randomIndex] = randomConnection;
        nodeConnexionsService.updateConnections(connections);
      }

      function init() {
        
        /*********************/
        /* SERVERS AND NODES */
        /*********************/
        var sqlServerLight = element.find('#ng-sql-server-light'); 
        var sqlServerReflect = element.find('#ng-sql-server-reflect'); 
        var sqlPlatformLight = element.find('#ng-sql-platform-light'); 
        var sqlNode = element.find('#ng-sql-node'); 
        var mongoServerLight = element.find('#ng-mongo-server-light'); 
        var mongoServerReflect = element.find('#ng-mongo-server-reflect'); 
        var mongoPlatformLight = element.find('#ng-mongo-platform-light'); 
        var mongoNode = element.find('#ng-mongo-node'); 

        /**************************/
        /* EARTH CITY CONNECTIONS */
        /**************************/
        
        scope.$on('active-section:back-end', function($event){ 

          var intervalPromiseMongo = $interval(function() {  
            (mongoServerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerLight.attr('class', 'animated fadeIn') : mongoServerLight.attr('class', 'animated fadeOut');
            (mongoServerReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoServerReflect.attr('class', 'animated fadeIn') : mongoServerReflect.attr('class', 'animated fadeOut');
            (mongoPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoPlatformLight.attr('class', 'animated fadeIn') : mongoPlatformLight.attr('class', 'animated fadeOut');
            (mongoNode.attr('class') ==  (undefined || 'animated fadeOut')) ? mongoNode.attr('class', 'animated fadeIn') : mongoNode.attr('class', 'animated fadeOut');
          }, 1200);

          var intervalPromiseSQL = $interval(function() {  
            (sqlServerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlServerLight.attr('class', 'animated fadeIn') : sqlServerLight.attr('class', 'animated fadeOut');
            (sqlServerReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlServerReflect.attr('class', 'animated fadeIn') : sqlServerReflect.attr('class', 'animated fadeOut');
            (sqlPlatformLight.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlPlatformLight.attr('class', 'animated fadeIn') : sqlPlatformLight.attr('class', 'animated fadeOut');
            (sqlNode.attr('class') ==  (undefined || 'animated fadeOut')) ? sqlNode.attr('class', 'animated fadeIn') : sqlNode.attr('class', 'animated fadeOut');
            turnRandomConnection(nodeConnexionsService.getConnections());
          }, 2500);

          // And we stop them when we exit that section
          scope.$on('inactive-section:back-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseMongo);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseSQL);
          }); 
        });
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

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {
          
        /*********/
        // WIRES //
        /*********/
        var currentWireId;
        for (var i=0; i<7; i++){
          currentWireId = '#ng-wire-' + i.toString();
          element.find(currentWireId).attr('class', 'visibility-hidden');
        } 

        var currentWire = element.find('#ng-wire-0');
        currentWire.attr('class', 'animated fadeIn');
        var currentWireNumber;

        /******************/
        /* SERVER AND NODE*/
        /******************/
        
        var node = element.find('#ng-node'); 

        scope.$on('active-section:front-end', function($event){ 

          // We trigger the animatiions only when we are in the front-end section
          var intervalPromiseWires = $interval(function() {  
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
          }, 1000);

          var intervalPromiseServerNode = $interval(function() {  
            (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
          }, 2500);

          // And we stop them when we exit that section
          scope.$on('inactive-section:front-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseServerNode);
          });
        });
      }
    } 
  };
}); 

daniboomerangAliveSvgDirectives.directive('aliveSvgFeEarth', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="earth-left" ng-include="\'/images/FE-earth.svg\'"></div>';  },
    link: function (scope, element, attrs) {


      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

        /******************/
        /* SERVER AND NODE*/
        /******************/
        var nodeMaps = element.find('#ng-node-maps'); 
        var nodeLaptop = element.find('#ng-node-laptop'); 
        
        scope.$on('active-section:front-end', function($event){ 

          var intervalPromiseNodes = $interval(function() {  
            (nodeMaps.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeMaps.attr('class', 'animated fadeIn') : nodeMaps.attr('class', 'animated fadeOut');
            (nodeLaptop.attr('class') ==  (undefined || 'animated fadeOut')) ? nodeLaptop.attr('class', 'animated fadeIn') : nodeLaptop.attr('class', 'animated fadeOut');
          }, 1200);

          // And we stop them when we exit that section
          scope.$on('inactive-section:front-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseNodes);
          });
        });
      }
    } 
  };
}); 
