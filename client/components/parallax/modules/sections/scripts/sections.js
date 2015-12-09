var sections = angular.module('sections', []);

/**********************************************/
/****************** ANIMATED ******************/
/**********************************************/

sections.directive('animatedSection', function() {
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

sections.directive('revealBackground', function() {
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

sections.directive('lightupText', function($document) {
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

/****************************************/
/***************** COVER ****************/
/****************************************/

sections.directive('cover', function() {
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

sections.directive('contact', function($document, $timeout) {
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