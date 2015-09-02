
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

daniboomerangAliveSvgDirectives.directive('aliveSvgBooks', function($interval, $timeout, cancelAsynchPromiseService) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { var svgImg; (attrs.books ==  ('BE')) ? svgImg  = "\'/images/BE-books.svg\'" : svgImg  = "\'/images/FE-books.svg\'"; return '<div id="book-case" ng-include="' + svgImg + '"></div>';  },
    link: function (scope, element, attrs) {

      var bookCase, rightEngine, centerEngine, leftEngine, leftLight, rightLight;

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
        $timeout(function() { bookCase.attr('class', 'suspension'); }, 3600);
        return $interval(function() { console.log("books engines eats CPU!");(engine.attr('class') ==  (undefined || 'animated fadeOut')) ? engine.attr('class', 'animated fadeIn') : engine.attr('class', 'animated fadeOut'); }, 1750);  ;
      }

      function turnOnLights() {
        return $interval(function() {console.log("books lights eats CPU!");
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
        var serverLight = element.find('#ng-server-light'); 
        var serverReflect = element.find('#ng-server-reflect'); 
        var node = element.find('#ng-node'); 

        scope.$on('active-section:back-end', function($event){ 

          // We trigger the animatiions only when we are in the back-end section
          var intervalPromiseWires = $interval(function() {  
            console.log('I´m eating CPU');
            currentWire.attr('class', 'visibility-hidden');
            currentWire = element.find('#ng-wire-' + Math.floor((Math.random() * 7)).toString()); 
            currentWire.attr('class', 'animated fadeIn');
          }, 500);

          var intervalPromiseServerAndNode = $interval(function() {  
            console.log('I´m eating CPU too!!');
            (serverLight.attr('class') ==  (undefined || 'animated fadeOut')) ? serverLight.attr('class', 'animated fadeIn') : serverLight.attr('class', 'animated fadeOut');
            (serverReflect.attr('class') ==  (undefined || 'animated fadeOut')) ? serverReflect.attr('class', 'animated fadeIn') : serverReflect.attr('class', 'animated fadeOut');
            (node.attr('class') ==  (undefined || 'animated fadeOut')) ? node.attr('class', 'animated fadeIn') : node.attr('class', 'animated fadeOut');
          }, 2500);

          // And we stop them when we exit that section
          scope.$on('inactive-section:back-end', function($event){ 
            cancelAsynchPromiseService.cancelInterval(intervalPromiseWires);
            cancelAsynchPromiseService.cancelInterval(intervalPromiseServerAndNode);
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
          }, 500);

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