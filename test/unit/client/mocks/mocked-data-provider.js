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
        "sidebarMockedData": {
            "urlFieldToSectionCorrespondence": "Who I am",
            "sectionsData":[
                {
                    "section": "Who I am",
                    "sectionAcronym": "Who",
                    "sectionURL": "whoIAm",
                    "sectionImg": "/images/boomerang-white-24.svg"
                },
                {
                    "section": "What I like",
                    "sectionAcronym": "What",
                    "sectionURL": "whatILike",
                    "sectionImg": "/images/heart-24.png"
                },
                {
                    "section": "What I've done",
                    "sectionAcronym": "Github",
                    "sectionURL": "whatIveDone",
                    "sectionImg": "/images/github-24.png"
                },
                {
                    "section": "What I've learnt",
                    "sectionAcronym": "CV",
                    "sectionURL": "whatIveLearnt",
                    "sectionImg": "/images/cv-24.png"
                },
                {
                    "section": "Status",
                    "sectionAcronym": "Status",
                    "sectionURL": "Status",
                    "sectionImg": "/images/unlock-24.png"
                },
                {
                    "section": "Contact",
                    "sectionAcronym": "Contact",
                    "sectionURL": "Contact",
                    "sectionImg": "/images/contact-24.png"
                }
            ]
        }   
    });

daniboomerangMockedDataServiceProvider.factory('mockedDataServiceProvider', function (defaultMockedData) {
   
    return {
        getLocationMockedData: function() {
            return defaultMockedData.locationMockedData;
        },
        getResponsivityMockedData: function() {
            return defaultMockedData.responsiveMockedData;
        },
        getSidebarMockedData: function() {
            return defaultMockedData.sidebarMockedData;
        },
        getMockedData: function() {
            return defaultMockedData;
        },
    }     
});



