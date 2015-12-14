'use strict'

var sectionsDirectives = angular.module('sectionsDirectives', []);

// Setting up Url into constant
sectionsDirectives.constant('SECTIONS_BASE_URL', '/components/parallax/components/sections/');

/**********************************************************************************
 ****** SECTIONS CAN BE PROVIDED BY SECTION PROVIDER WHICH WAITS TILL IMAGES *****
 ****** ARE LOADED AND SETSUP THE SECTION HEIGHT INTERCEPTOR WITH ITS HEIGHT *****
**********************************************************************************/

sections.directive('sectionHeightInterceptor', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs, $transclude) { 
      this.updateHeight = function (height) { 
        $scope.height = height;
        $element.attr('style','height:' + height + 'px');
      };
    }
  }
});

sections.directive('sectionProvider', function($window, SECTIONS_BASE_URL) {
  return {
    restrict: 'A',
    scope: true,
    require: '^sectionHeightInterceptor',
    templateUrl: function (elem, attrs) {
      var hyphenName =  attrs.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return SECTIONS_BASE_URL + 'views/' + hyphenName + '.html';
    },
    link: function (scope, element, attrs, sectionHeightInterceptorCtrl) {
      
      var height;
      var imagesSrcs;
      var imgs = [];

      init();

      function getImagesSrcs(){
        var srcs = [];
        var imagesElements = element.find('img');
        for (var i=0; i < imagesElements.length; i++){ 
          // extracting the host + port (if so) and adding '/'
          var hostWithSlash = imagesElements[i].src.split('/')[2] + '/';
          srcs.push(SECTIONS_BASE_URL + imagesElements[i].src.split(hostWithSlash)[1]);
          imagesElements[i].src = SECTIONS_BASE_URL + imagesElements[i].src.split(hostWithSlash)[1]
        }
        return srcs;
      }

      function setCurrentHeight () { sectionHeightInterceptorCtrl.updateHeight(element.prop('offsetHeight')); }

      function calculateHeight (imagesSrcs) {
        if (imagesSrcs.length == 0) { setCurrentHeight(); }
        else {
          var cnt = 0;
          for (var i = 0; i < imagesSrcs.length; i++) {
              var img = new Image();
              img.onload = function() {
                  ++cnt;
                  if (cnt >= imagesSrcs.length) {
                    setCurrentHeight();
                  } else {
                      // still more images to load
                  }
              };
              img.src = imagesSrcs[i];
              imgs.push(img);
          }
        }  
      }

      function init() {
        height = 0;
        imagesSrcs = getImagesSrcs();
        calculateHeight(imagesSrcs);
        var window = angular.element($window);
        window.bind('resize', function () {
          if (imgs.length == imagesSrcs.length) { setCurrentHeight(); }
          else { calculateHeight(imagesSrcs); }
        });
      }
    } 
  }
})

/****************************************/
/***************** COVER ****************/
/****************************************/

sectionsDirectives.directive('cover', function(SECTIONS_BASE_URL) {

  return {
    restrict: 'E',
    templateUrl: SECTIONS_BASE_URL + 'views/cover.html',
    compile: function compile(tElement, tAttrs, transclude) {
      
      // DOM ELEMENTS

      var liElements = tElement.find('li');
      var aboutLi = tElement.find('#about-li');
      var lovingLi = tElement.find('#loving-li');
      var workLi = tElement.find('#work-li');
      var contactLi = tElement.find('#contact-li');

      var name = tElement.find('#name');
      var skills1 = tElement.find('#skills-1');
      var skills2 = tElement.find('#skills-2');
      var scrolDownArrowId = tElement.find('#scroll-down');      
      
      return {
        pre: function preLink(scope, iElement, iAttrs) { 

          function addDelayForAnimation(element, delay) {
            var delayAnimation = '-moz-animation-delay:' + delay + 's; -webkit-animation-delay:' + delay + 's; -ms-animation-delay:' + delay + 's;'
            element.attr('style', delayAnimation);            
          }
 
          liElements.addClass('visibility-hidden');
          addDelayForAnimation(aboutLi, 1.5);
          addDelayForAnimation(lovingLi, 2.2);
          addDelayForAnimation(workLi, 2.5);
          addDelayForAnimation(contactLi, 1.8);
          name.addClass('visibility-hidden');
          addDelayForAnimation(name, 2.5);
          skills1.addClass('visibility-hidden');
          addDelayForAnimation(skills1, 3);
          skills2.addClass('visibility-hidden');
          addDelayForAnimation(skills2, 3.5);
          scrolDownArrowId.addClass('visibility-hidden');
          addDelayForAnimation(scrolDownArrowId, 3);
     
        },
        post: function postLink(scope, iElement, iAttrs) { 
                
          init();

          function init() {
            liElements.removeClass('visibility-hidden')
            liElements.addClass('animated zoomIn');
            name.removeClass('visibility-hidden')
            name.addClass('animated fadeIn');
            skills1.removeClass('visibility-hidden')
            skills1.addClass('skills animated fadeIn');
            skills2.removeClass('visibility-hidden')
            skills2.addClass('skills animated bounceIn');
            scrolDownArrowId.removeClass('visibility-hidden')
            scrolDownArrowId.addClass('animated zoomInDown');
          }
        }
      }
    }
  }  
});


/*******************************************/
/***************** BACK END ****************/
/*******************************************/
sections.directive('backEnd', function(SECTIONS_BASE_URL) {
  return {
    restrict: 'E',
    templateUrl: SECTIONS_BASE_URL + 'views/back-end.html'
  }
});

/********************************************/
/***************** FRONT END ****************/
/********************************************/
sections.directive('frontEnd', function(SECTIONS_BASE_URL) {
  return {
    restrict: 'E',
    templateUrl: SECTIONS_BASE_URL + 'views/front-end.html'
  }
});

/******************************************/
/***************** CONTACT ****************/
/******************************************/

sectionsDirectives.directive('contact', function($document, $timeout, SECTIONS_BASE_URL) {
  return {
    restrict: 'AE',
    templateUrl: SECTIONS_BASE_URL + 'views/contact.html',
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

/**********************************************/
/****************** ANIMATED ******************/
/**********************************************/

sectionsDirectives.directive('animatedSection', function() {
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

/*****************************************************/
/****************** LIGHTUP UTILITY ******************/
/*****************************************************/

sectionsDirectives.directive('lightupText', function($document) {
  return {
    restrict: 'AE',
    scope: {},
    link: function (scope, element, attrs) {
      element.addClass('text-that-lightsup');
      scope.$on('active-section:' + attrs.section, function($event){
       element.removeClass('text-gray'); element.addClass('text-orange'); });
      scope.$on('inactive-section:' + attrs.section, function($event){
       element.removeClass('text-orange'); element.addClass('text-gray'); });
    }
  }
});