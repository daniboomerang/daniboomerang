'use strict';

/*
 * @ngdoc module
 * @name button
 * @description
 * Web Component: button
 */

var button = angular.module('button', []);

/**
 * @ngdoc directive
 * @name button
 * @module button
 *
 * @restrict E
 *
 * @description
 * `<button>` is one of the available buttons. Which one will be constructed from the parameters 
 *
 * @param {string=} size button it can be [xs, sm, md]
 * @param {string=} content-type to know if there is text or an icon inside the button
 * @param {string=} text the text to display inside the button
 * @param {string=} icon-class the classes inside the <i> element of the button to display the icon
 * @param {boolean=} is-toogled-button to know if the button toggles on click
 * @param {string=} spin-direction [left,right]
 * @param {expression=} ng-click-function Expression to evaluate after click. 
 * @param {string=} scroll-section to know if the button must scroll to an specific section #section
 * @param {string=} scroll-duration if the button scrolls to a specific section, this is the t parameter of the ease function
 * @param {boolean=} is-active to set button as active asynchronously to the click
 *
 * @usage
 * <div button id="next-up-button" size="xs" content-type="icon" icon-class="fa fa-fw fa-chevron-up" scroll-section="{{nextUpSection}}" scroll-duration="2500" spin-direction='left'></div>
 * <div button id="cv-button" size="xs" content-type="text" text="CV" href="/CV-EN.pdf" spin-direction='left'></div>
 * <div button id="share-button" size="xs" content-type="icon" icon-class="fa fa-fw fa-share-alt fa-lg" is-toogled-button="true" ng-click-function="toogleShareMenu()" spin-direction='right'></div>
 * <div button id="next-down-button" size="xs" content-type="icon" icon-class="fa fa-fw fa-chevron-down" scroll-section="{{nextDownSection}}" scroll-duration="2500" spin-direction='right'></div>
 * <div button id="phone-button" size="sm" content-type="icon" icon-class="fa fa-fw fa-phone fa-lg" is-active="isPhoneButtonActive" is-toogled-button="true" ng-click-function="toggleSocialButton('phoneNumber')" spin-direction='left'></div>
 * <div button id="go-button" class="animated fadeIn" size="md" is-toogled-button="true" content-type="text" text="GO" ng-click-function="rocketTakeOff()" spin-direction="right"></div>
 */

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

