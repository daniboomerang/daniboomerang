'use strict';

var button = angular.module('button', []);

button.directive('button', function() {
  return {
    restrict: 'EA',
    scope: {
      ngClickFunction: '&',
      isActive: '=',
      scrollSection: '@'
    },
    template: function (elem, attrs) {
      function getLinkInfo(attrs){
        var linkInfo = {}
        linkInfo.href = '';
        linkInfo.target = '';
        if (attrs.href != undefined) { 
          linkInfo.href = attrs.href; linkInfo.target = "target='_blank_'"; }
        if (attrs.scrollSection != undefined) { linkInfo.href = '#' + '{{scrollSection}}' }
        if (attrs.scrollDuration == undefined) { linkInfo.scrollDuration = ''; } else { linkInfo.scrollDuration = attrs.scrollDuration; }
        return linkInfo;
      }
      var linkContent;
      if (attrs.contentType == 'text') { linkContent = attrs.text; }
      else if (attrs.contentType == 'icon') { linkContent = '<i class="' + attrs.iconClass + '"></i>'; }
      var link;
      var linkInfo = getLinkInfo(attrs);
      link = '<a class="dboom-button-link ' + attrs.size + '" href="' + linkInfo.href + '"' + linkInfo.target + 'du-smooth-scroll duration="' + linkInfo.scrollDuration + '" ng-click="onClick()">' + linkContent + '</a>';
      var spinClass = '';
      if (attrs.spinDirection == 'left') { spinClass = 'spin-left'; }
      else if (attrs.spinDirection == 'right') { spinClass = 'spin-right'; }
      return '<div class="dboom-button-wrapper"><div class="dboom-button ' + attrs.size + ' ' + spinClass + '">' + link + '</div></div>';
    },
    link: function(scope, elem, attrs) {
      var button = elem.find('.dboom-button');
      var buttonLink = elem.find('.dboom-button-link');
      var buttonToogled = false;
      scope.onClick = function(){ 
        scope.ngClickFunction();
        if ((attrs.isToogledButton == 'true')) {
          if (buttonToogled == false) { button.addClass('active'); buttonLink.addClass('active'); }
          else { button.removeClass('active'); buttonLink.removeClass('active');}
          buttonToogled = !buttonToogled;
        };      
      }
      scope.$watch("isActive", function() {
        if (scope.isActive == true) { button.addClass('active'); buttonLink.addClass('active'); }
        else { button.removeClass('active'); buttonLink.removeClass('active');}
      })
    }
  };
});  

