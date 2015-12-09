var parallaxDirectives = angular.module('parallaxDirectives', ['parallaxServices']);

/*******************************************************/
/****************** PARALLAX SECTIONS ******************/
/*******************************************************/

parallaxDirectives.directive('parallax', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element){ 
      scope.dynamicSectionsHeight = {} /* This is a global scope variable updated by the children directives 
                                       parallax dynamic sections, in order to dynamically determine their height in pixels */    
    }
  }
});

parallaxDirectives.directive('parallaxSubsection', function($window) {
  return {
    restrict: 'EA',
    templateUrl: function (elem, attrs) {
      var hyphenName =  attrs.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return 'views/sections/' + hyphenName + '.html';
    },
    link: function (scope, element, attrs){
      function isImageLoaded(img) {
        if (!img.complete) {return false;}
        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) { return false; }
        return true;
      }
      function setCurrentHeight (section) {
          if ((typeof scope.dynamicSectionsHeight[section] == 0)) { scope.dynamicSectionsHeight[section] = element.prop('offsetHeight'); } 
          else { scope.dynamicSectionsHeight[section] += element.prop('offsetHeight'); }
        }
      function calculateHeight (section, type) {  
        /* For those sections that contain images, we wait the image to be loaded before calculate the height */
        if (type == 'text-image') {
          var img = new Image();
          if (!isImageLoaded(img)) {
            img.onload = function () { 
              setCurrentHeight(section);
            }
          }
          img.src = element.find('img').attr('src');
        }
        else if ( type == 'text-only') { setCurrentHeight(section); }   
      }
      var window = angular.element($window);
      window.bind('resize', function () {
        scope.dynamicSectionsHeight[attrs.name] = 0;
        setCurrentHeight(attrs.name);
      });
      scope.dynamicSectionsHeight[attrs.name] = 0;
      calculateHeight(attrs.name, attrs.type);
    }
  }
});
