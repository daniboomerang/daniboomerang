var daniboomerangDirectives = angular.module('daniboomerangDirectives', []);




/*******************************************************/
/****************** PARALLAX SECTIONS ******************/
/*******************************************************/

daniboomerangDirectives.directive('parallax', function($interval) {
  return {
    restrict: 'E',
    templateUrl: 'views/parallax.html',
    scope: true,
    link: function(scope){ 
      scope.textSectionsHeight = {} /* This is a global scope variable updated by the children directives 
                                       parallax text sections, in order to dynamically determine their height in pixels */
    }
  }
});

daniboomerangDirectives.directive('textSection', function($window, $document) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: function (elem, attrs) {
      return 'views/sections/' + attrs.name + '.html';
    },
    link: function (scope, element, attrs){
      function defineCurrentHeight (name) {
        var sectionId = element.find('#' + name);
        scope.textSectionsHeight[name] = sectionId.prop('offsetHeight') + 'px';
      }
      var window = angular.element($window);
      window.bind('resize', function () { defineCurrentHeight(attrs.name); });
      defineCurrentHeight(attrs.name);
    }
  }
})

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
            {linkId: 'work', hash: '#work', text:'Work', awesomeIcon: 'fa-github', animation:'fx-bounce-normal fx-speed-1000', duration: '2000'},
            {linkId: 'contact', hash: '#contact', text:'Contact', awesomeIcon: 'fa-wechat', animation:'fx-bounce-normal fx-speed-1000', duration: '2500'}
          ]; }, 1500); 
        $timeout(function() { scope.showResponsiveNavbar = true; }, 1700);
        $timeout(function() { scope.name = "Daniel Estévez"; scope.position.engineer = "Software Engineer"; scope.position.fullStack = "Full Stack Web Developer"; }, 1900);
        $timeout(function() { scope.showScrollDownArrow = true; }, 2100);
      }
    }
  }  
});

daniboomerangDirectives.directive('contact', function($interval) {
  return {
    restrict: 'E',
    templateUrl: 'views/sections/contact.html',
    scope: {},
    link: function (scope, element) {
      var MAIL_BUTTON, PHONE_BUTTON, GMAIL, NUMBER, activeButton, mailButtonId, phoneButtonId;
      init();
      function init(){ MAIL_BUTTON = "mail"; PHONE_BUTTON = "phone"; GMAIL = 'estevez.dani@gmail.com'; NUMBER = '+34661711220'; mailButtonId = element.find('#mail-button'); phoneButtonId = element.find('#phone-button'); }
      scope.toggleSocialButton = function(button){
        if (button == MAIL_BUTTON) {
          if (activeButton != MAIL_BUTTON) { scope.contactInfo = GMAIL; mailButtonId.addClass("social-active"); phoneButtonId.removeClass("social-active"); activeButton =  MAIL_BUTTON; }
          else { scope.contactInfo = ""; mailButtonId.removeClass("social-active"); activeButton = undefined; }
        }
        else {
          if (activeButton != PHONE_BUTTON) { scope.contactInfo = NUMBER; phoneButtonId.addClass("social-active"); mailButtonId.removeClass("social-active"); activeButton =  PHONE_BUTTON;}
          else { scope.contactInfo = ""; phoneButtonId.removeClass("social-active"); activeButton = undefined; }
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