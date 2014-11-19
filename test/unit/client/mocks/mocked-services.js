var daniboomerangMockedServices = angular.module('daniboomerangMockedServices', ['daniboomerangMockedDataServiceProvider']);

daniboomerangMockedServices.factory('locationMockedService', function (mockedDataServiceProvider) {
   
    return {
        getCurrentSectionURL: function() {
            return mockedDataServiceProvider.getLocationMockedData().currentSectionURL;
        },
        subscribe: function(){
            return mockedDataServiceProvider.getLocationMockedData().subscription
        }
    }     
});

daniboomerangMockedServices.factory('responsivityMockedService', function (mockedDataServiceProvider) {

    return {
        getResponsiveData: function() {    
            var responsiveMockedData = {
                showResponsiveMenu: mockedDataServiceProvider.getResponsivityMockedData().showResponsiveMenu,
                width: mockedDataServiceProvider.getResponsivityMockedData().width,
                height: mockedDataServiceProvider.getResponsivityMockedData().height,
                isResponsive: mockedDataServiceProvider.getResponsivityMockedData().isResponsive
            };   
            return responsiveMockedData;
        },
        subscribeResize: function() {
            return mockedDataServiceProvider.getResponsivityMockedData().subscriptionResize;
        },
        subscribeSidebarToggling: function(){
            return mockedDataServiceProvider.getResponsivityMockedData().subscriptionTogglingSidebar
        }
    }         
});


daniboomerangMockedServices.factory('sidebarDataProviderMockedService', function (mockedDataServiceProvider) {
   
    var MOCKED_CURRENT_SECTION_URL = mockedDataServiceProvider.getLocationMockedData().currentSectionURL;

    // Those 2 variables are aimed to be able to mock the method 
    // getObjectFieldCorrespondence of the service dataService

    var sectionURL = 'sectionURL';
    var section = 'section';
    
    //////////////////////////////

    return {
        getObjectFieldCorrespondence: function(sectionURL, MOCKED_CURRENT_SECTION_URL, section) {
            return mockedDataServiceProvider.getSidebarMockedData().currentSection;
        },
        getSidebarData: function(){
            return mockedDataServiceProvider.getSidebarMockedData().sectionsData;
        }
    }     
});
