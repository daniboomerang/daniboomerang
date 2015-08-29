var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);

/*******************************************************/
/****************** PARALLAX SECTIONS ******************/
/*******************************************************/

daniboomerangDirectives.directive('parallax', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope){ 
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

daniboomerangDirectives.directive('cover', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/cover.html',
    link: function (scope, element, attrs) {
      var liElements = element.find('li.animated');
      var name = element.find('#name');
      var skills1 = element.find('#skills-1');
      var skills2 = element.find('#skills-2');
      var scrolDownArrowId = element.find('#scroll-down');      
      scope.$on('app-starts', function($event){
        liElements.addClass("zoomIn visibility-visible");
        name.addClass("fadeIn visibility-visible");
        skills1.addClass("fadeIn visibility-visible");
        skills2.addClass("bounceIn visibility-visible");
        scrolDownArrowId.addClass("zoomInDown visibility-visible");
      }); 
    }
  }  
});

/******************************************/
/***************** CONTACT ****************/
/******************************************/

daniboomerangDirectives.directive('contact', function($document) {
  return {
    restrict: 'E',
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

daniboomerangDirectives.directive('foot', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/foot.html',
    scope: {},
    link: function (scope, element) {

      var SECTION_FOOTER, SHARING_FOOTER, footer, toTopButtonWrapper, shareButtonWrapper;

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
        footer = element.find('footer'); toTopButtonWrapper = element.find('#to-top-button-wrapper'); shareButtonWrapper = element.find('#share-button-wrapper');

        function contractFooter(){
            footer.removeClass('expand-small'); footer.removeClass('expand-big');
            toTopButtonWrapper.removeClass('rotateIn'); shareButtonWrapper.removeClass('rotateIn');
            toTopButtonWrapper.addClass('rotateOut'); shareButtonWrapper.addClass('rotateOut');
            toTopButtonWrapper.removeClass('visibility-visible'); shareButtonWrapper.removeClass('visibility-visible');
        }
            
        function expandFooter(){
            if (scope.displayMenu == SECTION_FOOTER) { footer.addClass('expand-small'); }
            else { footer.addClass('expand-big'); }
            toTopButtonWrapper.addClass('visibility-visible'); shareButtonWrapper.addClass('visibility-visible');
            toTopButtonWrapper.addClass('rotateIn'); shareButtonWrapper.addClass('rotateIn');
            toTopButtonWrapper.removeClass('rotateOut'); shareButtonWrapper.removeClass('rotateOut');
        }

        scope.$on('active-section:cover', function($event){ contractFooter(); });
        scope.$on('active-section:connectivity', function($event){ scope.currentSection = 'connectivity'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:creativity', function($event){ scope.currentSection = 'creativity'; expandFooter(); scope.$apply(); });
        scope.$on('active-section:remote-working', function($event){ scope.currentSection = 'remote-working'; expandFooter(); scope.$apply(); });
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

daniboomerangDirectives.directive('topnavbar', function() {
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

        /*On active section*/
        scope.$on('active-section:about', function($event){ aboutLink.addClass('active'); aboutIcon.addClass('spin-right-whole-fastest'); header.addClass('expand'); header.addClass('navbar-fixed-top box-shadow-down'); });
        scope.$on('active-section:loving', function($event){ lovingLink.addClass('active'); lovingIcon.addClass('pulsing'); header.addClass('expand'); header.addClass('navbar-fixed-top box-shadow-down'); });
        scope.$on('active-section:work', function($event){ workLink.addClass('active'); workIcon.addClass('pulsing'); header.addClass('expand'); header.addClass('navbar-fixed-top box-shadow-down'); });
        
        /*On inactive section*/
        scope.$on('inactive-section:about', function($event){ header.removeClass('expand'); aboutLink.removeClass('active'); aboutIcon.removeClass('spin-right-whole-fastest'); });
        scope.$on('inactive-section:loving', function($event){ header.removeClass('expand'); lovingLink.removeClass('active'); lovingIcon.removeClass('pulsing'); });
        scope.$on('inactive-section:work', function($event){ header.removeClass('expand'); workLink.removeClass('active'); workIcon.removeClass('pulsing'); });
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
        if ((scope.isActive == undefined) && (attrs.isToogledButton == 'true')) {
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

/********************************/
/** SVG ALIVE IMAGES DIRECTIVE **/
/********************************/

daniboomerangDirectives.directive('svgAlive', function($interval, $timeout) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: function (elem, attrs) { return '/images/' + attrs.name + '.svg'; },
    link: function (scope, element, attrs) {
        // ISS LIGHTS 
        $interval(function() { scope.issLight = '#' + Math.floor(Math.random()*16777215).toString(16); }, 1000);
        // ET SCENE
        scope.$on('active-section:contact', function($event){ $timeout(function() { scope.showEtFingerLight = true; }, 2500); })
        scope.$on('inactive-section:contact', function($event) { $timeout(function() { scope.showEtFingerLight = false; }, 2000); })
    }
  };
});  

daniboomerangDirectives.directive('svgAliveBebooks', function($interval, $timeout) {
  return {
    restrict: 'EA',
    scope: {},
    template: function (elem, attrs) { return '<div id="book-case" ng-include="\'/images/BE-books.svg\'"></div>';  },
    link: function (scope, element, attrs) {

      var bookCase, rightEngine, centerEngine, leftEngine, leftLight, centerLight, rightLight;

      /****************************************/
      /* Waits the bookCase SVG to be loaded  */
      /****************************************/

      scope.$on('$includeContentLoaded', function () { init(); });

      function init() {

          bookCase = element.find('#book-case');
          
          /* Engines */
          rightEngine = element.find('#ng-right-engine'); 
          leftEngine = element.find('#ng-left-engine'); 
          turnOnEngines();

          /* Lights */
          leftLight = element.find('#ng-left-light'); 
          centerLight = element.find('#ng-center-light'); 
          rightLight = element.find('#ng-right-light');
          turnOnLights();
      }

      function turnOnEngines() {
        $interval(function() {
          (rightEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? rightEngine.attr('class', 'animated fadeIn') : rightEngine.attr('class', 'animated fadeOut');
          (leftEngine.attr('class') ==  (undefined || 'animated fadeOut')) ? leftEngine.attr('class', 'animated fadeIn') : leftEngine.attr('class', 'animated fadeOut');
        }, 1750);  

        $timeout(function() {
          bookCase.attr('class', 'remarkable-suspension');
        }, 3600);
      }

      function turnOnLights() {
        $interval(function() {
          (leftLight.attr('class') ==  (undefined || 'animated fadeOut')) ? leftLight.attr('class', 'animated fadeIn') : leftLight.attr('class', 'animated fadeOut');
          (rightLight.attr('class') ==  (undefined || 'animated fadeOut')) ? rightLight.attr('class', 'animated fadeIn') : rightLight.attr('class', 'animated fadeOut');
        }, 2000);
        $interval(function() {
          (centerLight.attr('class') ==  (undefined || 'animated fadeOut')) ? centerLight.attr('class', 'animated fadeIn') : centerLight.attr('class', 'animated fadeOut');
        }, 2500);        
      }

    } 
  };
}); 