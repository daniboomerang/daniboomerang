'use strict';

var aliveSvgs = angular.module('aliveSvgs', [
  'aliveSvgsServices',
  'aliveSvgsDirectives'
]);

// Setting up Url into constant
aliveSvgs.constant('ALIVE_SVGS_BASE_URL', '/components/parallax/components/aliveSvgs/');

parallax.run(function (ALIVE_SVGS_BASE_URL, nodeConnectionsService) {
  nodeConnectionsService.init(ALIVE_SVGS_BASE_URL);
});