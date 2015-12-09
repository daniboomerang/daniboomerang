'use strict';

var share = angular.module('share', []);

// Setting up Url into constant
share.constant('DANIBOOMERANG_URL', 'http://www.daniboomerang.com');
share.constant('SHARE_BASE_URL', '/components/common/share/');

share.factory('socialSharingService', function (DANIBOOMERANG_URL, SHARE_BASE_URL){
  
  var socialDescription = 'An amazing parallax universe aimed to show who I am and my job as web developer';
  var socialUrl = DANIBOOMERANG_URL;
  var socialMedia = DANIBOOMERANG_URL + SHARE_BASE_URL + 'images/dboom-universe.png';
  var socialType = 'website';
  var socialTitle = 'Daniel Estevez - A creative portfolio';

  return {
    getSocialDescription: function (){ return socialDescription; },
    getSocialUrl: function (){ return socialUrl; },
    getSocialMedia: function (){ return socialMedia; },
    getSocialType: function (){ return socialType; },
    getSocialTitle: function (){ return socialTitle; }
  } 
});

share.directive('socialSharingMetadata', function($compile, SHARE_BASE_URL, socialSharingService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var metadata = '<meta property="og:title" content="' + socialSharingService.getSocialTitle() + '"/>' +
             '<meta property="og:type" content="' + socialSharingService.getSocialType() + '"/>' + 
             '<meta property="og:image" content="' + socialSharingService.getSocialMedia() + '"/>' +
             '<meta property="og:url" content="' + socialSharingService.getSocialUrl() + '"/>' +
             '<meta property="og:description" content="' + socialSharingService.getSocialDescription() + '"/>' +
             '<meta name="twitter:card" content="summary"/>' +
             '<meta name="twitter:title" content="' + socialSharingService.getSocialTitle() + '"/>' +
             '<meta name="twitter:description" content="' + socialSharingService.getSocialDescription() + '"/>' +
             '<meta name="twitter:image" content="' + socialSharingService.getSocialMedia() + '"/>';
      element.append(metadata);
    }
  }
});