var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('locationService', function ($rootScope) {
   
  var SUBSCRIPTION = 'event:currentLocation-changed';

  var previousURL;
  var currentURL;
  var currentSectionURL;

  function getSectionURL (URL){
      var splitURL = URL.split("/");
      return splitURL[splitURL.length - 1];
  };

  return {

    init: function() {

      // DEALING WITH A LOCATION SERVICE (Current Location)
      $rootScope.$on("$locationChangeSuccess", function (event, current, previous, rejection) {
          currentURL = current;
          previousURL = previous;
          currentSectionURL = getSectionURL(currentURL);
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
    getCurrentSectionURL: function(){
      return currentSectionURL;
    }
  }     
});

daniboomerangServices.factory('responsivityService', function ($rootScope, $window, resize) {
  
  var SUBSCRIPTION_RESIZE = 'event:screenResize-changed';
  var SUBSCRIPTION_SIDEBAR_TOGGLING = 'event:responsiveSidebarMenu-changed';
  var responsiveData = {};

  return {

    init: function() {

      responsiveData.showResponsiveMenu = true;

      $rootScope.$on('resize', function(data, $event){
        windowSize = $event;
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
    toggleSidebarMenu: function() {
      responsiveData.showResponsiveMenu = !responsiveData.showResponsiveMenu;
      $rootScope.$broadcast('event:responsiveSidebarMenu-changed', responsiveData.showResponsiveMenu);
    }
  }
});


daniboomerangServices.factory('sidebarDataProviderService', function ($http) {
  
  var sidebarData;
  
  return {

    init: function() {
      $http.get('common/data/sidebar-data.json').success (function(data){
        sidebarData = data;
      });
    },
    getSidebarData: function(){
      return sidebarData;
    },
    getObjectFieldCorrespondence: function(forThisField, andThisValue, thisOtherField){
      for (var i = 0; i < sidebarData.length -1; i++){
        if (sidebarData[i][forThisField] == andThisValue){
          return sidebarData[i][thisOtherField];
        }
      }
    }
  }
});