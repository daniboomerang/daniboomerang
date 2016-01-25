'use strict';

/*
* @ngdoc module
* @name aliveSvgsServices
* @description
* Web Component: Alive Svgs
*/

var aliveSvgs = angular.module('aliveSvgs', [
  'aliveSvgsServices',
  'aliveSvgsDirectives'
]);

// Setting up Url into constant
aliveSvgs.constant('ALIVE_SVGS_BASE_URL', '/components/parallax/components/alive-svgs/');

aliveSvgs.run(function (ALIVE_SVGS_BASE_URL, nodeConnectionsService) {
  nodeConnectionsService.init(ALIVE_SVGS_BASE_URL);
});