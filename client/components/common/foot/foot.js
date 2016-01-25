'use strict';

/*
 * @ngdoc module
 * @name foot
 * @description
 * Web Component: Foot
 */

var foot = angular.module('foot', []);

// Setting up Url into constant
foot.constant('FOOT_BASE_URL', '/components/common/foot/');

/**
 * @ngdoc directive
 * @name foot
 * @module foot
 *
 * @restrict E
 *
 * @description
 * `<foot>` the footer
 *
 * @usage
 * <foot></foot>
 */

foot.directive('foot', function(socialSharingService, FOOT_BASE_URL) {
  return {
    restrict: 'E',
    templateUrl: FOOT_BASE_URL + 'foot.html',
    scope: {},
    compile: function compile(tElement, tAttrs, transclude) {

      // DOM ELEMENTS
      var buttonsLeftSideWrapper = tElement.find('#buttons-left-side-wrapper');
      var shareMenuWrapper = tElement.find('#share-menu-wrapper');
      var buttonsRightSideWrapper = tElement.find('#buttons-right-side-wrapper');
      var currentSectionWrapper = tElement.find('#current-section-wrapper'); 
      var toNextUpButtonWrapper = tElement.find('#to-next-up-button-wrapper');
      var toNextDownButtonWrapper = tElement.find('#to-next-down-button-wrapper');
      var cvButtonWrapper = tElement.find('#cv-button-wrapper');
      var shareButtonWrapper = tElement.find('#share-button-wrapper');
      
      return {

        /*  The prelink function executes before the compilation stage.
            At this point we manipulate the DOM before the view is created */

        pre: function preLink(scope, iElement, iAttrs) { 
     
          function addDelayForAnimation(element, delay) {
            var delayAnimation = '-moz-animation-delay:' + delay + 's; -webkit-animation-delay:' + delay + 's; -ms-animation-delay:' + delay + 's;'
            element.attr('style', delayAnimation);            
          }

          function addDurationForAnimation(element, duration) {
            var durationAnimation = '-moz-animation-duration:' + duration + 's; -webkit-animation-duration:' + duration + 's; -ms-animation-duration:' + duration + 's;'
            element.attr('style', durationAnimation);            
          }

          // Lets hide the elements before the view is compiled

          // Left side buttons
          buttonsLeftSideWrapper.attr('class', 'visibility-hidden');
          cvButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(cvButtonWrapper, 0.3);

          // Share Menu
          shareMenuWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(shareMenuWrapper, 0.3);
          shareButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(shareButtonWrapper, 0.5);

          // Left side buttons
          buttonsRightSideWrapper.attr('class', 'visibility-hidden');
          currentSectionWrapper.attr('class', 'visibility-hidden');
          addDurationForAnimation(currentSectionWrapper, 0.3);
          toNextUpButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(toNextUpButtonWrapper, 0.3);
          toNextDownButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(toNextDownButtonWrapper, 0.5);
          
        },

        /*  The postLink function executes after the compilation stage.
            At this point we can init elements, set listeners and so on */
        post: function postLink(scope, iElement, iAttrs) { 
          
          var COVER, ABOUT, LOVING, WORK, CONTACT;
          scope.currentSection, scope.toNextUpSection, scope.toNextDownSection, scope.isToogledShareMenu, scope.socialDescription, scope.socialUrl, scope.socialMedia, scope.socialType, scope.socialTitle;

          function showShareMenu (){ shareMenuWrapper.attr('class', 'animated fadeInUp'); } 
          function hideShareMenu(){ shareMenuWrapper.attr('class', 'animated fadeOutDown'); }

          scope.toogleShareMenu = function (){ 
            scope.isToogledShareMenu = !scope.isToogledShareMenu; 
            if (scope.isToogledShareMenu) { showShareMenu(); }
            else { hideShareMenu(); }
          }

          init();

          function init(){
            
            /* CONSTANTS */
            COVER = 'cover'; ABOUT = 'about'; LOVING = 'loving'; WORK = 'work';  CONTACT = 'contact'

            /* SECTIONS */
            scope.currentSection = undefined;
            scope.nextDownSection = ABOUT;
            scope.nextUpSection = undefined;

            /* SOCIAL SHARING */
            scope.socialDescription = socialSharingService.getSocialDescription();
            scope.socialUrl = socialSharingService.getSocialUrl();
            scope.socialMedia = socialSharingService.getSocialMedia();
            scope.socialType = socialSharingService.getSocialType();
            scope.socialTitle = socialSharingService.getSocialTitle();

            function hideFooterElements(){          
              buttonsLeftSideWrapper.attr('class','animated bounceOutLeft'); buttonsRightSideWrapper.attr('class','animated bounceOutRight'); currentSectionWrapper.attr('class','animated bounceOutRight'); toNextUpButtonWrapper.attr('class','animated bounceOutRight'); toNextDownButtonWrapper.attr('class','animated bounceOutRight'); cvButtonWrapper.attr('class','animated bounceOutLeft'); shareButtonWrapper.attr('class','animated bounceOutLeft');
              if (scope.isToogledShareMenu) { hideShareMenu(); }
            }       
            function showFooterElements(){
              buttonsLeftSideWrapper.attr('class','animated bounceInUp');  buttonsRightSideWrapper.attr('class','animated bounceInUp'); currentSectionWrapper.attr('class','animated bounceInRight');  toNextUpButtonWrapper.attr('class','animated bounceInRight');  toNextDownButtonWrapper.attr('class','animated bounceInUp'); cvButtonWrapper.attr('class','animated bounceInLeft'); shareButtonWrapper.attr('class','animated bounceInUp'); 
              if (scope.isToogledShareMenu) { showShareMenu(); }
            }

            scope.$on('active-section:cover', function($event){ if (scope.nextUpSection) { hideFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); } });
            scope.$on('active-section:connectivity', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); });
            scope.$on('active-section:creativity', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); });
            scope.$on('active-section:remote-working', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); });
            scope.$on('active-section:without-boundaries', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); });
            scope.$on('active-section:about', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeIn'); scope.currentSection = ABOUT; scope.nextUpSection = COVER; scope.nextDownSection = LOVING; scope.$apply(); });
            scope.$on('active-section:back-end', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = ABOUT; scope.nextDownSection = LOVING; scope.$apply(); });
            scope.$on('active-section:loving', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeIn'); scope.currentSection = LOVING; scope.nextUpSection = ABOUT; scope.nextDownSection = WORK; scope.$apply(); });
            scope.$on('active-section:front-end', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = LOVING; scope.nextDownSection = WORK; scope.$apply(); });
            scope.$on('active-section:work', function($event){ showFooterElements(); currentSectionWrapper.attr('class','animated fadeIn'); scope.currentSection = WORK; scope.nextUpSection = LOVING; scope.nextDownSection = CONTACT; scope.$apply(); });
            scope.$on('active-section:contact', function($event){ hideFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = WORK; scope.nextDownSection = CONTACT; scope.$apply(); }); 
          }
        }
      }
    }
  };
});
