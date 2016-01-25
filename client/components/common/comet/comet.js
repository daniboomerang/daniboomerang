'use strict';

/*
 * @ngdoc module
 * @name comet
 * @description
 * Web component: Comet
 */

var comet = angular.module('comet', []);

// Setting up Url into constant
comet.constant('COMET_BASE_URL', '/components/common/comet/');

/**
 * @ngdoc directive
 * @name comet
 * @module comet
 *
 * @restrict E
 *
 * @description
 * `<comet>` is one of the available comets. Which one will depend on the parameters 
 *
 * @param {string=} color to know which comet svg will be representing this directive
 *
 * @usage
 * <comet color="blue"></comet>
 * <comet color="white"></comet>
 * <comet color="red"></comet>
 */
 
comet.directive('comet', function(COMET_BASE_URL) {
  return {
    restrict: 'E',
    scope: { },
    template: function(elem, attr){
        // Lets set intro background  
        var cometImageUrl = 'url(' + COMET_BASE_URL + 'images/comet-' + attr.color + '.svg)';
        var cometStyleForImg = 'background-size: 100%; background-repeat: no-repeat; background-image:' + cometImageUrl;

        if (attr.color == 'blue'){
          return '<div class="spin-right-half orbit-comet orbit-comet-blue"><div class="comet-blue comet-from-left" style="'+ cometStyleForImg + '"></div></div>';
        }
        else if (attr.color == 'red'){
          return '<div class="spin-left-half orbit-comet orbit-comet-red"><div class="comet-red comet-from-right" style="'+ cometStyleForImg + '"></div></div>'
        }
        else if (attr.color == 'white'){
          return '<div class="spin-left-half orbit-comet orbit-comet-white><div class="comet-white comet-from-right" style="'+ cometStyleForImg + '"></div></div>'
        }
      }
  };
});
