var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);


/*******************************************************/
/****************** PARALLAX SECTIONS ******************/
/*******************************************************/

daniboomerangDirectives.directive('parallax', function($interval) {
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
    restrict: 'E',
    templateUrl: function (elem, attrs) {
      return 'views/sections/' + attrs.name + '.html';
    },
    link: function (scope, element, attrs){
      function isImageLoaded(img) {
        if (!img.complete) {return false;}
        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) { return false; }
        return true;
      }
      function setCurrentHeight (section) {
          var sectionId = element.find('#' + section);
          if ((typeof scope.dynamicSectionsHeight[section] == 0)) { scope.dynamicSectionsHeight[section] = sectionId.prop('offsetHeight'); } 
          else { scope.dynamicSectionsHeight[section] += sectionId.prop('offsetHeight'); }
        }
      function calculateHeight (section, type) {  
        /* For those sections that contain images, we wait the image to be loaded before calculate the height */
        if (type == 'text-image') {
          var img = new Image();
          img.src = element.find('img').attr('src');
          if (!isImageLoaded(img)) {
            img.onload = function () { 
              setCurrentHeight(section);
            }
          }
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


daniboomerangDirectives.directive('animatedSection', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs){

      function animateSectionIn() {
        animatedSection.removeClass(attrs.animatedout);
        animatedSection.addClass(attrs.animatedin);
        animatedSection.addClass('visibility-visible');
      }

      function animateSectionOut() {
        animatedSection.removeClass(attrs.animatedin);
        animatedSection.addClass(attrs.animatedout);
        animatedSection.removeClass('visibility-visible');  
      }

      var animatedSection = element.find('.animated-section');
      scope.$on('event:activeArea', function($event, area){ 
        if (area == attrs.triggeredby){
          if ('active' == attrs.triggeredon){ animateSectionIn(); }
          else { animateSectionOut(); }
        }
      });
      scope.$on('event:inactiveArea', function($event, area){ 
        if (area == attrs.triggeredby){
          if ('inactive' == attrs.triggeredon){ animateSectionIn(); }
          else { animateSectionOut(); }
        }
      });
    }
  }
});

daniboomerangDirectives.directive('cover', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/cover.html',
    scope: {},
    link: function (scope, element) {

      init();

      function init(){
       
        scope.position = {};
        $timeout(function() { scope.showMoon = true; }, 500);
        $timeout(function() { scope.showScrollRightArrow = true; }, 1000);
        $timeout(function() {  scope.sections = [
            {linkId: 'about', hash: '#about', text:'About', awesomeIcon: 'icon-dboom', animation:'fx-bounce-normal fx-speed-1000', duration: '1000'},
            {linkId: 'loving', hash: '#loving', text:'Loving', awesomeIcon: 'fa-heart', animation:'fx-bounce-normal fx-speed-1000', duration: '1500'},
            {linkId: 'work', hash: '#work', text:'Work', awesomeIcon: 'fa-suitcase', animation:'fx-bounce-normal fx-speed-1000', duration: '2000'},
            {linkId: 'contact', hash: '#contact', text:'Contact', awesomeIcon: 'fa-wechat', animation:'fx-bounce-normal fx-speed-1000', duration: '2500'}
          ]; }, 1500); 
        $timeout(function() { scope.showResponsiveNavbar = true; }, 1700);
        $timeout(function() { scope.name = "Daniel Estévez"; scope.position.engineer = "Software Engineer"; scope.position.fullStack = "Full Stack Web Developer"; }, 1900);
        $timeout(function() { scope.showScrollDownArrow = true; }, 2100);
      }
    }
  }  
});

daniboomerangDirectives.directive('contact', function($timeout, $document) {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/contact.html',
    scope: {},
    link: function (scope, element) {
      var ET_SENTENCE, MAIL_BUTTON, PHONE_BUTTON, GMAIL, NUMBER, mailButtonId, phoneButtonId, activeButton; 
      init();
      function init(){ 
        ET_SENTENCE = "I´ll beee...right...heeeree...";  MAIL_BUTTON = "mail"; PHONE_BUTTON = "phone"; GMAIL = 'estevez.dani@gmail.com'; NUMBER = '+34661711220'; mailButtonId = element.find('#mail-btn'); phoneButtonId = element.find('#phone-btn'); scope.showScrollUpArrow = false; scope.showContactInfo = false; scope.contactInfo = ET_SENTENCE; scope.activePhone = false; scope.activeMail = false; scope.repeatCount = 0;
        scope.$on('event:activeArea', function($event, area){ 
          if (area == 'Contact'){ $timeout(function() { scope.showScrollUpArrow = true; scope.showContactInfo = true; }, 500); }
        });
        scope.$on('event:inactiveArea', function($event, area){ 
          if (area == 'Contact'){ $timeout(function() { scope.showScrollUpArrow = false; }, 500); }
        });
      }
      scope.toggleSocialButton = function(button){
        if (button == MAIL_BUTTON) {
          if (activeButton != MAIL_BUTTON) { scope.contactInfo = GMAIL; mailButtonId.addClass("social-active"); phoneButtonId.removeClass("social-active"); activeButton =  MAIL_BUTTON; }
          else { scope.contactInfo = ET_SENTENCE; mailButtonId.removeClass("social-active"); activeButton = undefined; }
        }
        else {
          if (activeButton != PHONE_BUTTON) { scope.contactInfo = NUMBER; phoneButtonId.addClass("social-active"); mailButtonId.removeClass("social-active"); activeButton =  PHONE_BUTTON;}
          else { scope.contactInfo = ET_SENTENCE; phoneButtonId.removeClass("social-active"); activeButton = undefined; }
        }
      }
    }
  }
});

/******************************************/
/****************** FOOT ******************/
/******************************************/

daniboomerangDirectives.directive('foot', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/foot.html',
    scope: {},
    link: function (scope, element) {

      var SECTION_FOOTER, SHARING_FOOTER, footer, toTopButton, shareButton, ICON_SHARE, ICON_PROCESSING_SHARE;

      scope.toogleFooters = function (){
        if (scope.displayMenu == SECTION_FOOTER){
          footer.removeClass('expand-small');
          scope.shareIconToDisplay = ICON_PROCESSING_SHARE;
          $timeout(function() { footer.addClass('expand-big'); scope.displayMenu = SHARING_FOOTER; }, 500);
        }
        else {
          footer.removeClass('expand-big');
          scope.shareIconToDisplay = ICON_SHARE;
          $timeout(function() { footer.addClass('expand-small'); scope.displayMenu = SECTION_FOOTER; }, 500);
        }      
      }

      init();

      function init(){
        
        /* INIT CONSTANTS */
        SECTION_FOOTER = 'sectionFooter'; SHARING_FOOTER = 'sharingFooter'; ICON_SHARE = 'fa-share-alt'; ICON_PROCESSING_SHARE = 'fa-close faa faa-shake animated';
        /* INIT SCOPE */
        scope.displayMenu = SECTION_FOOTER; scope.shareIconToDisplay = ICON_SHARE;
        /* INIT DOM ELEMENTS */
        footer = element.find('footer'); toTopButton = element.find('#to-top-button'); shareButton = element.find('#share-button');

        scope.$on('event:activeArea', function($event, area){ 
          if (area == 'Cover'){
            footer.removeClass('expand-small'); footer.removeClass('expand-big');
            toTopButton.removeClass('reveal'); shareButton.removeClass('reveal');
          }
          else{
            scope.currentSection = area;
            if (scope.displayMenu == SECTION_FOOTER) { footer.addClass('expand-small'); }
            else { footer.addClass('expand-big'); }
            toTopButton.addClass('reveal'); shareButton.addClass('reveal');
          }
          scope.$apply();
        })  
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
        var aboutIcon = element.find('#about-icon');
        var lovingLink = element.find('#loving-link');
        var lovingIcon = element.find('#loving-icon');
        var workLink = element.find('#work-link');
        var workIcon = element.find('#work-icon');
        var contactLink = element.find('#contact-link');
        var contactIcon = element.find('#contact-icon');

        scope.$on('event:activeArea', function($event, area){ 
          // Dealing with Navbar
          if (area == 'Cover'){ header.removeClass('expand'); }
          else{ header.addClass('expand'); header.addClass('navbar-fixed-top box-shadow-down'); }
          // Dealing with sections
          if (area == 'About'){ aboutLink.addClass('active'); aboutIcon.addClass('faa-spin animated '); }
          else if (area == 'Loving'){ lovingLink.addClass('active'); lovingIcon.addClass('faa-pulse animated'); }
          else if (area == 'Work'){ workLink.addClass('active'); workIcon.addClass('faa-pulse animated'); }
          else if (area == 'Contact'){ header.removeClass('expand'); }
          else if (area == 'BESide'){ header.removeClass('expand'); }
          else if (area == 'FESide'){ header.removeClass('expand'); }
          else if (area == 'creativity'){ header.removeClass('expand'); }
          else if (area == 'connectivity'){ header.removeClass('expand'); }
          else if (area == 'remoteWorking'){ header.removeClass('expand'); }
        });

        scope.$on('event:inactiveArea', function($event, area){
          header.removeClass('expand'); 
          // Dealing with sections
          if (area == 'About'){ aboutLink.removeClass('active'); aboutIcon.removeClass('faa-spin animated '); } 
          else if (area == 'Loving'){ lovingLink.removeClass('active'); lovingIcon.removeClass('faa-pulse animated'); }
          else if (area == 'Work'){ workLink.removeClass('active'); workIcon.removeClass('faa-pulse animated'); }
        });
      }
    }
  };
});

/**************************/
/** SVG IMAGES DIRECTIVE **/
/**************************/
daniboomerangDirectives.directive('svgAlive', function($interval, $timeout) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: function (elem, attrs) { return '/images/' + attrs.name + '.svg'; },
    link: function (scope, element, attrs) {
        // ISS LIGHTS 
        $interval(function() { scope.issLight = '#' + Math.floor(Math.random()*16777215).toString(16); }, 1000);
        // NODES ON/OFF
        function processChanges(){
          timeToPorcess  = Math.floor((Math.random() * 2) + 1);
          nodeToProcess = Math.floor((Math.random() * 6));
          scope.aliveNodes[nodeToProcess] = !scope.aliveNodes[nodeToProcess];
          $timeout(function() { processChanges() }, timeToPorcess * 1000);
        }
        scope.aliveNodes = [true, true, true, true, true, true, true, true];
        var timeToPorcess; var nodeToProcess;
        processChanges(); 
        // LIGHT BULB
        scope.turnOnLightBulb = false;
        scope.$on('event:activeArea', function($event, area){ 
          if (area == 'creativity'){ scope.turnOnLightBulb = 'true'; scope.$apply(); }
        });

        scope.$on('event:inactiveArea', function($event, area){
          if (area == 'creativity'){ scope.turnOnLightBulb = 'false'; scope.$apply(); } 
        });
    }
  };
});  
