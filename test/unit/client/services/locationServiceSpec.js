describe('Location Service', function ($rootScope){
  
    var scope;
    var mockedData;

    // excuted before each "it" is run.
    beforeEach(function (){

      module('daniboomerangServices');
      module('daniboomerangMockedDataServiceProvider');

      // inject services.
      inject(function($rootScope, _locationService_, mockedDataServiceProvider) {
        locationService = _locationService_;
        mockedData = mockedDataServiceProvider.getLocationMockedData();
        rootScope = $rootScope;
        spyOn(rootScope, '$broadcast').andCallThrough();
      });
    });
      
    // check to see if it has the expected functions
    it('should have all its expected functions', function () { 
        expect(angular.isFunction(locationService.init)).toBe(true);
        expect(angular.isFunction(locationService.subscribe)).toBe(true);
        expect(angular.isFunction(locationService.getPreviousURL)).toBe(true);
        expect(angular.isFunction(locationService.getCurrentURL)).toBe(true);
        expect(angular.isFunction(locationService.getCurrentSectionURL)).toBe(true);
    });

    // check the subscription is correctly returned
    it('should return the broadcasted event for subscription when someone attends to subscribe', function (){
      expect(locationService.subscribe()).toBe(mockedData.subscription);
    }); 

    // check to see if they do what they are supposed to do.
    it('init should subscribe service for url events and broadcast the new location info', function (){
      
      // Lets call init()
      locationService.init();

      var expectedBroadcastedObject = {
        currentURL: mockedData.currentURL,
        previousURL: mockedData.previousURL,
        currentSectionURL: mockedData.currentSectionURL
      }
      rootScope.$broadcast('$locationChangeSuccess', mockedData.currentURL, mockedData.previousURL);
      expect(rootScope.$broadcast).toHaveBeenCalledWith(mockedData.subscription, expectedBroadcastedObject);
      
      // expected to correctly return the previous URL
      expect(locationService.getPreviousURL()).toBe(mockedData.previousURL);
      // expected to correctly return the current URL
      expect(locationService.getCurrentURL()).toBe(mockedData.currentURL);
      // expected to correctly return the current section URL
      expect(locationService.getCurrentSectionURL()).toBe(mockedData.currentSectionURL);
    });
});