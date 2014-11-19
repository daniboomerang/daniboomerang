'use strict';

describe('Navbar Controller', function() {

    var $scope;
    var $rootScope;
    var _locationMockedService_;
    var _sidebarDataProviderMockedService_;
    var _responsivityMockedService_;
    var NavbarCtrl;
    var mockedData;

    beforeEach(function () {        
        module('daniboomerangControllers');
        module('daniboomerangMockedServices');
        module('daniboomerangMockedDataServiceProvider');   
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $controller,
                               locationMockedService, responsivityMockedService,
                               sidebarDataProviderMockedService, mockedDataServiceProvider) {

        // Injecting Mocked Services
        _locationMockedService_ = locationMockedService;
        _responsivityMockedService_ = responsivityMockedService;
        _sidebarDataProviderMockedService_ = sidebarDataProviderMockedService;

        // Getting mocked data
        mockedData = mockedDataServiceProvider.getMockedData();

        //////////////////////
        $rootScope = $injector.get('$rootScope');
        // Spying on the broadcasting to test if we listen the events correctly
        spyOn($rootScope, '$broadcast').andCallThrough();
        
        // And the Scope and the Controller
        $scope = $rootScope.$new();
        NavbarCtrl = $controller('NavbarCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            locationService: _locationMockedService_,
            responsivityService: _responsivityMockedService_,
            sidebarDataProviderService: _sidebarDataProviderMockedService_
        });
    }));

    it('should get the current section and the responsive data', function() {
        expect($scope.responsiveData.showResponsiveMenu).toBe(mockedData.responsiveMockedData.showResponsiveMenu);
        expect($scope.responsiveData.width).toBe(mockedData.responsiveMockedData.width);
        expect($scope.responsiveData.height).toBe(mockedData.responsiveMockedData.height);
        expect($scope.responsiveData.isResponsive).toBe(mockedData.responsiveMockedData.isResponsive);
        expect($scope.currentSection).toBe(mockedData.sidebarMockedData.urlSectionToSectionFieldCorrespondence)
    });

    it('should be listening and get changes on location', function() {

        var expectedBroadcastedObject = {
            currentURL: mockedData.locationMockedData.currentURL,
            previousURL: mockedData.locationMockedData.previousURL,
            currentSectionURL: mockedData.locationMockedData.currentSectionURL
        }

        $rootScope.$broadcast(mockedData.locationMockedData.subscription,
                             mockedData.locationMockedData.currentURL,
                             mockedData.locationMockedData.previousURL,
                             mockedData.locationMockedData.currentSectionURL);
        expect($rootScope.$broadcast).toHaveBeenCalledWith(
                             mockedData.locationMockedData.subscription,
                             mockedData.locationMockedData.currentURL,
                             mockedData.locationMockedData.previousURL,
                             mockedData.locationMockedData.currentSectionURL);
        expect($scope.currentSection).toBe(mockedData.sidebarMockedData.urlSectionToSectionFieldCorrespondence);

    });

    it('should be listening and get changes on screen resizing', function() {

        var responsiveMockedData = {
                showResponsiveMenu: mockedData.responsiveMockedData.showResponsiveMenu,
                width: mockedData.responsiveMockedData.width,
                height: mockedData.responsiveMockedData.height,
                isResponsive: mockedData.responsiveMockedData.isResponsive
        };   

        $rootScope.$broadcast(mockedData.responsiveMockedData.subscriptionResize, responsiveMockedData);
        expect($rootScope.$broadcast).toHaveBeenCalledWith(mockedData.responsiveMockedData.subscriptionResize, responsiveMockedData);
        expect($scope.responsiveData).toBe(responsiveMockedData);
        
    });
});   