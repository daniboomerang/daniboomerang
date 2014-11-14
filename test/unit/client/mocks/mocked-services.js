var daniboomerangMockedServices = angular.module('daniboomerangMockedServices', []);

daniboomerangMockedServices.factory('locationMockedService', function () {
   
    // Location Service Data

    var MOCKED_SUBSCRIPTION_TO_LOCATION = 'event:currentLocation-changed';
    var MOCKED_PREVIOUS_URL = '://path/to/previousMocked';
    var MOCKED_CURRENT_URL = '://path/to/currentMocked';
    var MOCKED_CURRENT_SECTION_URL = 'whoIAm';

    return {
        getCurrentSectionURL: function() {
            return MOCKED_CURRENT_SECTION_URL;
        },
        subscribe: function(){
            return MOCKED_SUBSCRIPTION_TO_LOCATION;
        }
    }     
});

daniboomerangMockedServices.factory('responsivityMockedService', function () {
   
    // Responsivity Service Data

    var MOCKED_SUBSCRIPTION_TO_SCREEN_RESIZE = 'event:screenResize-changed';
    var MOCKED_SUBSCRIPTION_TO_SIDEBAR = 'event:responsiveSidebarMenu-changed';
    var MOCKED_SHOW_RESPONSIVE_MENU = true;
    var MOCKED_SCREEN_WIDTH = 1280;
    var MOCKED_SCREEN_HEIGHT = 680;
    var MOCKED_IS_RESPONSIVE = false;

    var responsiveMockedData = {
        showResponsiveMenu: true,
        width: MOCKED_SCREEN_WIDTH,
        height: MOCKED_SCREEN_HEIGHT,
        isResponsive: MOCKED_IS_RESPONSIVE
    };

    return {
        getResponsiveData: function() {       
            return responsiveMockedData;
        },
        subscribeResize: function() {
            return MOCKED_SUBSCRIPTION_TO_SCREEN_RESIZE;
        },
        subscribeSidebarToggling: function(){
            return MOCKED_SUBSCRIPTION_TO_SIDEBAR;
        }
    }         
});


daniboomerangMockedServices.factory('dataMockedService', function () {
   
     // Data Servcice Data
    
    var MOCKED_CURRENT_SECTION = 'Who I am';
    var MOCKED_CURRENT_SECTION_URL = 'whoIAm';

    // Those 2 variables are aimed to be able to mock the method 
    // getObjectFieldCorrespondence of the service dataService

    var sectionURL = 'sectionURL';
    var section = 'section';
    
    //////////////////////////////

    return {
        getObjectFieldCorrespondence: function(sectionURL, MOCKED_CURRENT_SECTION_URL, section) {
            return MOCKED_CURRENT_SECTION;
        }
    }     
});
