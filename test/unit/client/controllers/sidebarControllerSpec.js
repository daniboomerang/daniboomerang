'use strict';

describe('Navbar Controller', function() {

    var $scope;
    var $rootScope;
    var _locationMockedService_;
    var _sidebarDataProviderMockedService_;
    var SidebarCtrl;
    var mockedData;

    beforeEach(function () {        
        module('daniboomerangControllers');
        module('daniboomerangMockedServices');
        module('daniboomerangMockedDataServiceProvider');   
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $controller,
                               locationMockedService, sidebarDataProviderMockedService,
                               mockedDataServiceProvider) {

        // Injecting Mocked Services
        _locationMockedService_ = locationMockedService;
        _sidebarDataProviderMockedService_ = sidebarDataProviderMockedService;

        // Getting mocked data
        mockedData = mockedDataServiceProvider.getMockedData();

        //////////////////////
        $rootScope = $injector.get('$rootScope');
        // Spying on the broadcasting to test if we listen the events correctly
        spyOn($rootScope, '$broadcast').andCallThrough();
        
        // And the Scope and the Controller
        $scope = $rootScope.$new();
        SidebarCtrl = $controller('SidebarCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            locationService: _locationMockedService_,
            sidebarDataProviderService: _sidebarDataProviderMockedService_
        });
    }));

    it('should get the current section', function() {
        expect($scope.currentSection).toBe(mockedData.sidebarMockedData.urlSectionToSectionFieldCorrespondence)
    });

    it('should get the sidebar data', function() {
        var sectionsDataMocked = mockedData.sidebarMockedData.sectionsData;
        expect($scope.sidebar.sectionsData).toEqual(sectionsDataMocked);
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
});   