'use strict';

var share = angular.module('share', []);

// Setting up Url into constant
share.constant('DANIBOOMERANG_URL', 'http://www.daniboomerang.com');
share.constant('SHARE_BASE_URL', '/components/common/share/');

share.factory('socialSharingService', function (DANIBOOMERANG_URL, SHARE_BASE_URL){
  
  var socialDescription = 'An amazing parallax universe aimed to show who I am and my job as web developer';
  var socialUrl = DANIBOOMERANG_URL;
  var socialMedia = DANIBOOMERANG_URL + SHARE_BASE_URL + 'dboom-universe.png';
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