'use strict';

var daniboomerangMockedDataServiceProvider = angular.module('daniboomerangMockedDataServiceProvider', [])

daniboomerangMockedDataServiceProvider.value('defaultMockedData',
    {
        "locationMockedData": {
            "subscription": "event:currentLocation-changed",
            "previousURL": "://path/to/previousMocked",
            "currentURL": "://path/to/currentMocked",
            "currentSectionURL": "whoIAm"
        },
        "responsiveMockedData": {
            "subscriptionResize": "event:screenResize-changed",
            "subscriptionTogglingSidebar": "event:responsiveSidebarMenu-changed",
            "showResponsiveMenu": true,
            "width": 1280,
            "height": 680,
            "isResponsive": false
        },
        "dataMockedData": {
            "currentSection": "Who I am"
        }   
    });

daniboomerangMockedDataServiceProvider.factory('mockedDataServiceProvider', function (defaultMockedData) {
   
    return {
        getLocationMockedData: function() {
            return defaultMockedData.locationMockedData;
        },
        getResponsivityMockedData: function() {
            return defaultMockedData.responsivityMockedData;
        },
        getDataMockedData: function() {
            return defaultMockedData.dataMockedData;
        },
        getMockedData: function() {
            return defaultMockedData;
        },
    }     
});



