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

daniboomerangDirectives.directive('contact', function($document) {
  return {
    restrict: 'AE',
    templateUrl: 'views/sections/contact.html',
    scope: {},
    link: function (scope, element) {
      var ET_SENTENCE, MAIL_BUTTON, PHONE_BUTTON, GMAIL, NUMBER, mailButtonId, phoneButtonId, activeButton; 
      init();
      function init(){ ET_SENTENCE = "I´ll beee...right...heeeree...";  MAIL_BUTTON = "mail"; PHONE_BUTTON = "phone"; GMAIL = 'estevez.dani@gmail.com'; NUMBER = '+34661711220'; scope.contactInfo = ET_SENTENCE; scope.isPhoneButtonActive = false; scope.isMailButtonActive = false; }
      scope.toggleSocialButton = function(button){
        if (button == MAIL_BUTTON) {
          if (activeButton != MAIL_BUTTON) { scope.contactInfo = GMAIL; activeButton =  MAIL_BUTTON; scope.isPhoneButtonActive = false; scope.isMailButtonActive = true; }
          else { scope.contactInfo = ET_SENTENCE; activeButton = undefined; scope.mailButtonIsToogled = false; }
        }
        else {
          if (activeButton != PHONE_BUTTON) { scope.contactInfo = NUMBER; activeButton =  PHONE_BUTTON; scope.isMailButtonActive = false; scope.isPhoneButtonActive = true; }
          else { scope.contactInfo = ET_SENTENCE; activeButton = undefined; scope.phoneButtonIsToogled = true; }
        }
      }
    }
  }
});

/***************************************/
/***************** FOOT ****************/
/***************************************/

daniboomerangDirectives.directive('foot', function($timeout, socialSharingService) {
  return {
    restrict: 'E',
    templateUrl: 'views/foot.html',
    scope: {},
    link: function (scope, element) {

      var SECTION_FOOTER, SHARING_FOOTER, footer, toTopButtonWrapper, cvButtonWrapper, shareButtonWrapper;
      scope.socialDescription, scope.socialUrl, scope.socialMedia, scope.socialType, scope.socialTitle;

      scope.toogleFooters = function (){
        if (scope.displayMenu == SECTION_FOOTER){
          footer.removeClass('expand-small');
          $timeout(function() { footer.addClass('expand-big'); scope.displayMenu = SHARING_FOOTER; }, 500);
        }
        else {
          footer.removeClass('expand-big');
          $timeout(function() { footer.addClass('expand-small'); scope.displayMenu = SECTION_FOOTER; }, 500);
        }      
      }

      init();

      function init(){
        
        /* INIT CONSTANTS */
        SECTION_FOOTER = 'sectionFooter'; SHARING_FOOTER = 'sharingFooter';
        /* INIT SCOPE */
        scope.displayMenu = SECTION_FOOTER;
        /* INIT DOM ELEMENTS */
        footer = element.find('footer'); toTopButtonWrapper = element.find('#to-top-button-wrapper'); cvButtonWrapper = element.find('#cv-button-wrapper'); shareButtonWrapper = element.find('#share-button-wrapper');

        /* SOCIAL SHARING */
        scope.socialDescription = socialSharingService.getSocialDescription();
        scope.socialUrl = socialSharingService.getSocialUrl();
        scope.socialMedia = socialSharingService.getSocialMedia();
        scope.socialType = socialSharingService.getSocialType();
        scope.socialTitle = socialSharingService.getSocialTitle();

        function contractFooter(){
            footer.removeClass('expand-small'); footer.removeClass('expand-big');
            toTopButtonWrapper.removeClass('bounceInRight'); cvButtonWrapper.removeClass('bounceInLeft'); shareButtonWrapper.removeClass('bounceInUp');
            toTopButtonWrapper.addClass('bounceOutRight'); cvButtonWrapper.addClass('bounceOutLeft'); shareButtonWrapper.addClass('bounceOutDown');
            //toTopButtonWrapper.addClass('visibility-hidden'); cvButtonWrapper.addClass('visibility-hidden'); shareButtonWrapper.addClass('visibility-hidden');
        }
            
        function expandFooter(){
            if (scope.displayMenu == SECTION_FOOTER) { footer.addClass('expand-small'); }
            else { footer.addClass('expand-big'); }
            toTopButtonWrapper.removeClass('visibility-hidden'); cvButtonWrapper.removeClass('visibility-hidden'); shareButtonWrapper.removeClass('visibility-hidden');
            toTopButtonWrapper.addClass('bounceInRight'); cvButtonWrapper.addClass('bounceInLeft'); shareButtonWrapper.addClass('bounceInUp');
            toTopButtonWrapper.removeClass('bounceOutRight'); cvButtonWrapper.removeClass('bounceOutLeft'); shareButtonWrapper.removeClass('bounceOutDown');
        }

        scope.$on('active-section:cover', function($event){ contractFooter(); });
        scope.$on('active-section:connectivity', function($event){ scope.currentSection = 'connectivity'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:creativity', function($event){ scope.currentSection = 'creativity'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:remote-working', function($event){ scope.currentSection = 'remote-working'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:without-boundaries', function($event){ scope.currentSection = 'without-boundaries'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:about', function($event){ scope.currentSection = 'about'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:back-end', function($event){ scope.currentSection = 'back-end'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:loving', function($event){ scope.currentSection = 'loving'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:front-end', function($event){ scope.currentSection = 'front-end'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:work', function($event){ scope.currentSection = 'work'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:contact', function($event){ scope.currentSection = 'contact'; expandFooter(); scope.$apply(); }); 
      }
    }  
  };
});

/******************************************/
/**************** TOPNAVBAR ***************/
/******************************************/

daniboomerangDirectives.directive('topnavbar', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/topnavbar.html',
    link: function (scope, element) {

      init();
      
      function init(){

        var header = element.find('header');
        var aboutLink = element.find('#about-link');
        var aboutIcon = element.find('.about-icon');
        var lovingLink = element.find('#loving-link');
        var lovingIcon = element.find('.loving-icon');
        var workLink = element.find('#work-link');
        var workIcon = element.find('.work-icon');
        var contactLink = element.find('#contact-link');
        var contactIcon = element.find('.contact-icon');

        var activeTimeout;

        /*On active section*/
        scope.$on('active-section:about', function($event){ $timeout.cancel(activeTimeout); aboutLink.addClass('active'); aboutIcon.addClass('spin-right-whole-fastest'); header.attr('class', 'expand fadeIn animated navbar-fixed-top box-shadow-down'); });
        scope.$on('active-section:loving', function($event){ $timeout.cancel(activeTimeout); lovingLink.addClass('active'); lovingIcon.addClass('pulsing'); header.attr('class', 'expand fadeIn animated navbar-fixed-top box-shadow-down'); });
        scope.$on('active-section:work', function($event){ $timeout.cancel(activeTimeout); workLink.addClass('active'); workIcon.addClass('pulsing'); header.attr('class', 'expand fadeIn animated navbar-fixed-top box-shadow-down'); });
        
        /*On inactive section*/
        scope.$on('inactive-section:about', function($event){ header.removeClass('fadeIn'); header.addClass('fadeOut'); aboutLink.removeClass('active'); aboutIcon.removeClass('spin-right-whole-fastest'); activeTimeout = $timeout(function() { header.removeClass('expand'); }, 500); });
        scope.$on('inactive-section:loving', function($event){ header.removeClass('fadeIn'); header.addClass('fadeOut'); lovingLink.removeClass('active'); lovingIcon.removeClass('pulsing'); activeTimeout = $timeout(function() { header.removeClass('expand'); }, 500); });
        scope.$on('inactive-section:work', function($event){ header.removeClass('fadeIn'); header.addClass('fadeOut'); workLink.removeClass('active'); workIcon.removeClass('pulsing'); activeTimeout = $timeout(function() { header.removeClass('expand'); }, 500); });

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
      isActive: '='
    },
    template: function (elem, attrs) {
      function getLinkInfo(attrs){
        var linkInfo = {}
        linkInfo.href = '';
        linkInfo.target = '';
        if (attrs.href != undefined) { 
          linkInfo.href = attrs.href; linkInfo.target = "target='_blank_'"; }
        if (attrs.scrollSection != undefined) { linkInfo.href = '#' + attrs.scrollSection; }
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

