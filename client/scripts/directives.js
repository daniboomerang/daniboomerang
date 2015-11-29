var daniboomerangDirectives = angular.module('daniboomerangDirectives', ['daniboomerangServices']);

/*******************************************************/
/****************** PARALLAX SECTIONS ******************/
/*******************************************************/

daniboomerangDirectives.directive('parallax', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element){ 
      scope.dynamicSectionsHeight = {} /* This is a global scope variable updated by the children directives 
                                       parallax dynamic sections, in order to dynamically determine their height in pixels */    
    }
  }
});

daniboomerangDirectives.directive('parallaxSubsection', function($window) {
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
})

/*******************************************************/
/****************** ANIMATED SECTIONS ******************/
/*******************************************************/

daniboomerangDirectives.directive('animatedSection', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs){

      function animateSectionIn() {
        if (attrs.animatedin != ""){
          animatedSection.removeClass(attrs.animatedout);
          animatedSection.addClass(attrs.animatedin);
          animatedSection.addClass('visibility-visible');
        }
      }

      function animateSectionOut() {
        if (attrs.animatedout != ""){
          animatedSection.removeClass(attrs.animatedin);
          animatedSection.addClass(attrs.animatedout);
          animatedSection.removeClass('visibility-visible');
        }
      }
      var animatedSection = element.find('.animated-section');
      animatedSection.addClass('animated');
      /*On active section*/
      var activeSectionEvent = 'active-section:' + attrs.triggeredby;
      scope.$on(activeSectionEvent, function($event){ if ('active' == attrs.triggeredon){ animateSectionIn(); } else { animateSectionOut(); } }); 
      /*On inactive section*/
      var inactiveSectionEvent = 'inactive-section:' + attrs.triggeredby;
      scope.$on(inactiveSectionEvent, function($event){ if ('inactive' == attrs.triggeredon){ animateSectionIn(); } else { animateSectionOut(); } }); 
      
    }
  }
});

daniboomerangDirectives.directive('revealBackground', function() {
  return {
    restrict: 'E',
    scope: {},
    template: ' <div class="animated visibility-hidden" style="height:{{height}}; width: 100%; background-size: 100%; background-repeat: no-repeat; background-image: url({{imgUrl}}); -moz-animation-delay: {{delay}}s; -webkit-animation-delay: {{delay}}s; -ms-animation-delay: {{delay}}s;"></div>',
    link: function (scope, element, attrs){
      function revealBackground(img, delay, height, el) {
        scope.imgUrl = '/images/'+ img +'.svg';
        scope.delay = delay;
        scope.height = height;
        el.addClass(attrs.animatedin);
        el.addClass('visibility-visible');
        el.addClass('fadeIn');
      }
      scope.$on(attrs.triggeredby, function($event){
        revealBackground(attrs.img, attrs.delay, attrs.height, element.find('.animated'));
      })
    }
  }
});

/****************************************/
/***************** COVER ****************/
/****************************************/

daniboomerangDirectives.directive('cover', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/cover.html',
    link: function (scope, element, attrs) {
      var liElements = element.find('li.visibility-hidden');
      var name = element.find('#name');
      var skills1 = element.find('#skills-1');
      var skills2 = element.find('#skills-2');
      var scrolDownArrowId = element.find('#scroll-down');      
      scope.$on('app-starts', function($event){
        liElements.attr('class', 'animated zoomIn');
        name.removeClass('visibility-hidden');
        name.addClass('animated fadeIn');
        skills1.removeClass('visibility-hidden');
        skills1.addClass('animated fadeIn');
        skills2.removeClass('visibility-hidden');
        skills2.addClass('animated bounceIn');
        scrolDownArrowId.removeClass('visibility-hidden');
        scrolDownArrowId.addClass('animated zoomInDown');
      }); 
    }
  }  
});

/******************************************/
/***************** CONTACT ****************/
/******************************************/

daniboomerangDirectives.directive('contact', function($document, $timeout) {
  return {
    restrict: 'AE',
    templateUrl: 'views/sections/contact.html',
    scope: {},
     compile: function compile(tElement, tAttrs, transclude) {

      // DOM ELEMENTS
      var contactDboomShareId = tElement.find('#contact-dboom-share');
      var contactDboomGithubId = tElement.find('#contact-dboom-github');
      var contactInfoId = tElement.find('#contact-info');
      
      return {
        pre: function preLink(scope, iElement, iAttrs) { 
     
          function addDelayForAnimation(element, delay) {
            var delayAnimation = '-moz-animation-delay:' + delay + 's; -webkit-animation-delay:' + delay + 's; -ms-animation-delay:' + delay + 's;'
            element.attr('style', delayAnimation);            
          }

          // Lets hide the elements before the view is compiled
          contactDboomShareId.attr('class', 'visibility-hidden');
          addDelayForAnimation(contactDboomShareId, 0.5);
          contactDboomGithubId.attr('class', 'visibility-hidden');
          addDelayForAnimation(contactDboomGithubId, 0.5);
        },
        post: function postLink(scope, iElement, iAttrs) { 
          
          var ET_SENTENCE, MAIL_BUTTON, PHONE_BUTTON, GMAIL, NUMBER, mailButtonId, phoneButtonId, activeButton; 
          
          init();
          function init(){ 
           
            // variables and scope
            ET_SENTENCE = "I´ll beee...right...heeeree...";  MAIL_BUTTON = "mail"; PHONE_BUTTON = "phone"; GMAIL = 'estevez.dani@gmail.com'; NUMBER = '+34661711220'; scope.contactInfo = ET_SENTENCE; scope.isPhoneButtonActive = false; scope.isMailButtonActive = false;

            scope.$on('active-section:contact', function($event){ 
              contactDboomShareId.attr('class', 'animated fadeInUp');
              contactDboomGithubId.attr('class', 'animated fadeInUp');     
            });

            scope.$on('active-section:work', function($event){ 
              contactDboomShareId.attr('class', 'animated fadeOutDown');
              contactDboomGithubId.attr('class', 'animated fadeOutDown');
            });
          }

          function changeContactInfo (info) {
            contactInfoId.attr('class', 'animated flipOutX');
            $timeout(function() { 
              scope.contactInfo = info;
              contactInfoId.attr('class', 'animated flipInX');
            }, 500);
          }

          scope.toggleSocialButton = function(button){
            if (button == MAIL_BUTTON) {
              if (activeButton != MAIL_BUTTON) { changeContactInfo(GMAIL); activeButton =  MAIL_BUTTON; scope.isPhoneButtonActive = false; scope.isMailButtonActive = true; }
              else { changeContactInfo(ET_SENTENCE); activeButton = undefined; scope.mailButtonIsToogled = false; }
            }
            else {
              if (activeButton != PHONE_BUTTON) { changeContactInfo(NUMBER); activeButton =  PHONE_BUTTON; scope.isMailButtonActive = false; scope.isPhoneButtonActive = true; }
              else { changeContactInfo(ET_SENTENCE); activeButton = undefined; scope.phoneButtonIsToogled = true; }
            }
          }
        }
      }
    }
  }
});

/***************************************/
/***************** FOOT ****************/
/***************************************/

daniboomerangDirectives.directive('foot', function(socialSharingService) {
  return {
    restrict: 'E',
    templateUrl: 'views/foot.html',
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
        pre: function preLink(scope, iElement, iAttrs) { 
     
         function addDelayForAnimation(element, delay) {
            var delayAnimation = '-moz-animation-delay:' + delay + 's; -webkit-animation-delay:' + delay + 's; -ms-animation-delay:' + delay + 's;'
            element.attr('style', delayAnimation);            
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
          addDelayForAnimation(currentSectionWrapper, 0.2);
          toNextUpButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(toNextUpButtonWrapper, 0.3);
          toNextDownButtonWrapper.attr('class', 'visibility-hidden');
          addDelayForAnimation(toNextDownButtonWrapper, 0.5);
          
        },
        post: function postLink(scope, iElement, iAttrs) { 
          
          var COVER, ABOUT, LOVING, WORK, CONTACT;
          scope.currentSection, scope.toNextUpSection, scope.toNextDownSection, scope.isToogledShareMenu, scope.socialDescription, scope.socialUrl, scope.socialMedia, scope.socialType, scope.socialTitle;

          scope.toogleShareMenu = function (){ 
            scope.isToogledShareMenu = !scope.isToogledShareMenu; 
            if (scope.isToogledShareMenu) { showShareMenu(); }
            else { hideShareMenu(); }
          }

          function showShareMenu (){ if (scope.isToogledShareMenu) { shareMenuWrapper.attr('class', 'animated fadeInUp'); } }
          function hideShareMenu(){ shareMenuWrapper.attr('class', 'animated fadeOutDown'); }

          init();

          function init(){
            
            /* CONSTANTS */
            COVER = 'cover'; ABOUT = 'about'; LOVING = 'loving'; WORK = 'work';  CONTACT = 'contact'

            /* SECTIONS */
            scope.currentSection = undefined;
            scope.nextDownSection = ABOUT;
            scope.nextUpSection = COVER

            /* SOCIAL SHARING */
            scope.socialDescription = socialSharingService.getSocialDescription();
            scope.socialUrl = socialSharingService.getSocialUrl();
            scope.socialMedia = socialSharingService.getSocialMedia();
            scope.socialType = socialSharingService.getSocialType();
            scope.socialTitle = socialSharingService.getSocialTitle();

            function hideFooterElements(){          
              buttonsLeftSideWrapper.attr('class','animated bounceOutLeft'); buttonsRightSideWrapper.attr('class','animated bounceOutRight'); currentSectionWrapper.attr('class','animated bounceOutRight'); toNextUpButtonWrapper.attr('class','animated bounceOutRight'); toNextDownButtonWrapper.attr('class','animated bounceOutRight'); cvButtonWrapper.attr('class','animated bounceOutLeft'); shareButtonWrapper.attr('class','animated bounceOutLeft');
              hideShareMenu()
            }       
            function showFooterElements(){
              buttonsLeftSideWrapper.attr('class','animated bounceInUp');  buttonsRightSideWrapper.attr('class','animated bounceInUp'); currentSectionWrapper.attr('class','animated bounceInRight');  toNextUpButtonWrapper.attr('class','animated bounceInRight');  toNextDownButtonWrapper.attr('class','animated bounceInUp'); cvButtonWrapper.attr('class','animated bounceInLeft'); shareButtonWrapper.attr('class','animated bounceInUp'); 
              showShareMenu();
            }

            scope.$on('active-section:cover', function($event){ hideFooterElements(); currentSectionWrapper.attr('class','animated fadeOut'); scope.nextUpSection = COVER; scope.nextDownSection = ABOUT; scope.$apply(); });
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

/**********/
/* BUTTON */
/**********/

daniboomerangDirectives.directive('button', function() {
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


daniboomerangDirectives.directive('lightupText', function($document) {
  return {
    restrict: 'AE',
    scope: {},
    link: function (scope, element, attrs) {
      element.addClass('text-that-lightsup');
      scope.$on('active-section:' + attrs.section, function($event){ element.removeClass('text-gray'); element.addClass('text-orange'); });
      scope.$on('inactive-section:' + attrs.section, function($event){ element.removeClass('text-orange'); element.addClass('text-gray'); });
    }
  }
});

