var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('locationService', function ($rootScope) {
   
  var SUBSCRIPTION = 'event:currentLocation-changed';
  var INITIAL_STATE = 'Who I am';

  var previousURL;
  var currentURL;
  var currentSection = INITIAL_STATE; 
  var currentSubsection;

  return {

    init: function() {

      var currentSection = function(URL){
          var splitURL = URL.split("/");
          return splitURL[splitURL.length - 1];
      };

      // DEALING WITH A LOCATION SERVICE (Current Location)
      $rootScope.$on("$locationChangeSuccess", function (event, current, previous, rejection) {
          currentURL = current;
          previousURL = previous;
          currentSectionURL = currentSection(currentURL);
          $rootScope.$broadcast('event:currentLocation-changed',
            {currentURL: currentURL, previousURL: previousURL, currentSectionURL: currentSectionURL}
          );
      });
    },
    subscribe: function(){
      return SUBSCRIPTION;
    },
    getPreviousURL: function(){
      return previousURL;
    },
    getCurrentURL: function(){
      return currentURL;
    },
    getCurrentSection: function(){
      return currentSection;
    },
    getCurrentSubsection: function(){
      return currentSubsection;
    }
  }      
});

daniboomerangServices.factory('responsivityService', function ($rootScope, $window, resize) {
  
  var SUBSCRIPTION_RESIZE = 'event:screenResize-changed';
  var SUBSCRIPTION_SIDEBAR_TOGGLING = 'event:responsiveSidebarMenu-changed';
  var responsiveData = {};
  responsiveData.showResponsiveMenu = true;
  
  return {

    init: function() {

      $rootScope.$on('resize', function(data, $event){
        windowSize = $event;
        console.log("Event", $event);
        responsiveData.width = windowSize.width;
        responsiveData.height = windowSize.height;
        responsiveData.isResponsive = windowSize.width < 768;
        $rootScope.$broadcast('event:screenResize-changed', responsiveData);
      });
    },
    subscribeResize: function(){
      return SUBSCRIPTION_RESIZE;
    },
    subscribeSidebarToggling: function(){
      return SUBSCRIPTION_SIDEBAR_TOGGLING;
    },
    getResponsiveData: function (){
      return responsiveData;
    },
    toggleSidebarMenu : function() {
      responsiveData.showResponsiveMenu = !responsiveData.showResponsiveMenu;
      $rootScope.$broadcast('event:responsiveSidebarMenu-changed', responsiveData.showResponsiveMenu);
    }
  }
});


daniboomerangServices.factory('dataServices', function ($http) {
  
  var sidebarData;
  
  return {

    init: function() {
      $http.get('common/data/sidebar-data.json').success (function(data){
        sidebarData = data;
      });
    },
    getSidebarData : function(){
      return sidebarData;
    },
    getObjectFieldCorrespondence : function(forThisField, andThisValue, thisOtherField){
      for (var i = 0; i < sidebarData.length -1; i++){
        if (sidebarData[i][forThisField] == andThisValue){
          return sidebarData[i][thisOtherField];
        }
      }
    }
  }
});