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

share.directive('metafb', function(socialSharingService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.og == "title") { element.attr('content', socialSharingService.getSocialTitle())}
      if (attrs.og == "type") { element.attr('content', socialSharingService.getSocialType())}
      if (attrs.og == "image") { element.attr('content', socialSharingService.getSocialMedia())}
      if (attrs.og == "url") { element.attr('content', socialSharingService.getSocialUrl())}
      if (attrs.og == "description") { element.attr('content', socialSharingService.getSocialDescription())}
    }
  }
});

share.directive('metatw', function(socialSharingService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.tw == "card") { element.attr('content', 'summary')}
      if (attrs.tw == "title") { element.attr('content', socialSharingService.getSocialTitle())}
      if (attrs.tw == "image") { element.attr('content', socialSharingService.getSocialMedia())}
      if (attrs.tw == "description") { element.attr('content', socialSharingService.getSocialDescription())}
    }
  }
});

share.directive('socialSharingMetadata', function($compile, SHARE_BASE_URL, socialSharingService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var sharingMetadata = '<meta name="description" content="Daniboomerang is a creative portfolio. An amazing parallax universe aimed to show who I am and my job as web developer">' + 
             '<meta name="keywords" content="fullstack web developer, web developer, software engineer, portfolio, developer, parallax, angularjs, angular, creative portfolio, front end developer, back end developer, svg, svg animation, animated">' + 
             '<meta name="author" content="Daniboomerang">' + 
             '<link rel="author" href="https://es.linkedin.com/in/estevezdani"/>' + 
             '<meta property="og:title" content="' + socialSharingService.getSocialTitle() + '"/>' +
             '<meta property="og:type" content="' + socialSharingService.getSocialType() + '"/>' + 
             '<meta property="og:image" content="' + socialSharingService.getSocialMedia() + '"/>' +
             '<meta property="og:url" content="' + socialSharingService.getSocialUrl() + '"/>' +
             '<meta property="og:description" content="' + socialSharingService.getSocialDescription() + '"/>' +
             '<meta name="twitter:card" content="summary"/>' +
             '<meta name="twitter:title" content="' + socialSharingService.getSocialTitle() + '"/>' +
             '<meta name="twitter:description" content="' + socialSharingService.getSocialDescription() + '"/>' +
             '<meta name="twitter:image" content="' + socialSharingService.getSocialMedia() + '"/>';
      element.find('title').after(sharingMetadata);
    }
  }
});