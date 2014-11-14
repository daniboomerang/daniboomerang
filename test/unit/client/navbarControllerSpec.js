'use strict';


describe('Navbar Controller', function() {

    var scope;
    var rootScope;
    var LocationMockedService;
    var ResponsivityMockedService;
    var DataMockedService;
    var NavbarCtrl;

    beforeEach(function () {        
        module('daniboomerangControllers');
        module('daniboomerangMockedServices');
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $rootScope, $controller, locationMockedService, responsivityMockedService, dataMockedService) {

        // Injecting Mocked Services
        LocationMockedService = locationMockedService;
        ResponsivityMockedService = responsivityMockedService;
        DataMockedService = dataMockedService;

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
        expect(scope.responsiveData.showResponsiveMenu).toBe(true);
        expect(scope.responsiveData.width).toBe(1280);
        expect(scope.responsiveData.height).toBe(680);
        expect(scope.responsiveData.isResponsive).toBe(false);
        expect(scope.currentSection).toBe('Who I am')
    });

    it('should be listening and get changes on location', function() {

        var expectedBroadcastedObject = {
            currentURL: '://path/to/currentMocked',
            previousURL: '://path/to/previousMocked',
            currentSectionURL: 'whoIAm'
        }

        rootScope.$broadcast('event:currentLocation-changed', '://path/to/currentMocked', '://path/to/previousMocked', 'whoIAm');
        expect(rootScope.$broadcast).toHaveBeenCalledWith('event:currentLocation-changed',
            '://path/to/currentMocked', '://path/to/previousMocked', 'whoIAm');
        expect(scope.currentSection).toBe('Who I am');

    });

    it('should be listening and get changes on screen resizing', function() {

        var responsiveMockedData = ResponsivityMockedService.getResponsiveData();

        rootScope.$broadcast('event:responsiveSidebarMenu-changed', responsiveMockedData);
        expect(rootScope.$broadcast).toHaveBeenCalledWith('event:responsiveSidebarMenu-changed',
            responsiveMockedData);
        expect(scope.responsiveData).toBe(responsiveMockedData);
        
    });
});   