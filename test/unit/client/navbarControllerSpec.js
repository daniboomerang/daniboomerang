'use strict';


describe('Navbar Controller', function() {

    var scope;
    var rootScope;
    var LocationMockedService;
    var ResponsivityMockedService;
    var DataMockedService;
    var NavbarCtrl;
    var mockedData;

    beforeEach(function () {        
        module('daniboomerangControllers');
        module('daniboomerangMockedServices');
        module('daniboomerangMockedDataServiceProvider');   
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $rootScope, $controller,
                               locationMockedService, responsivityMockedService,
                               dataMockedService, mockedDataServiceProvider) {

        // Injecting Mocked Services
        LocationMockedService = locationMockedService;
        ResponsivityMockedService = responsivityMockedService;
        DataMockedService = dataMockedService;

        // Getting mocked data
        mockedData = mockedDataServiceProvider.getMockedData();

        //////////////////////
        rootScope = $injector.get('$rootScope');
        // Spying on the broadcasting to test if we listen the events correctly
        spyOn($rootScope, '$broadcast').andCallThrough();
        
        // And the Scope and the Controller
        scope = $rootScope.$new();
        NavbarCtrl = $controller('NavbarCtrl', {
            $scope: scope,
            rootScope: $rootScope,
            locationService: LocationMockedService,
            responsivityService: ResponsivityMockedService,
            dataService: DataMockedService
        });
    }));

    it('should get the current section and the responsive data', function() {
        expect(scope.responsiveData.showResponsiveMenu).toBe(mockedData.responsiveMockedData.showResponsiveMenu);
        expect(scope.responsiveData.width).toBe(mockedData.responsiveMockedData.width);
        expect(scope.responsiveData.height).toBe(mockedData.responsiveMockedData.height);
        expect(scope.responsiveData.isResponsive).toBe(mockedData.responsiveMockedData.isResponsive);
        expect(scope.currentSection).toBe(mockedData.dataMockedData.currentSection)
    });

    it('should be listening and get changes on location', function() {

        var expectedBroadcastedObject = {
            currentURL: mockedData.locationMockedData.currentURL,
            previousURL: mockedData.locationMockedData.previousURL,
            currentSectionURL: mockedData.locationMockedData.currentSectionURL
        }

        rootScope.$broadcast(mockedData.locationMockedData.subscription,
                             mockedData.locationMockedData.currentURL,
                             mockedData.locationMockedData.previousURL,
                             mockedData.locationMockedData.currentSectionURL);
        expect(rootScope.$broadcast).toHaveBeenCalledWith(
                             mockedData.locationMockedData.subscription,
                             mockedData.locationMockedData.currentURL,
                             mockedData.locationMockedData.previousURL,
                             mockedData.locationMockedData.currentSectionURL);
        expect(scope.currentSection).toBe(mockedData.dataMockedData.currentSection);

    });

    it('should be listening and get changes on screen resizing', function() {

        var responsiveMockedData = ResponsivityMockedService.getResponsiveData();

        rootScope.$broadcast(mockedData.responsiveMockedData.subscriptionResize, responsiveMockedData);
        expect(rootScope.$broadcast).toHaveBeenCalledWith(mockedData.responsiveMockedData.subscriptionResize, responsiveMockedData);
        expect(scope.responsiveData).toBe(responsiveMockedData);
        
    });
});   