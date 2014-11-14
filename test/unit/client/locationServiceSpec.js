describe('Location Service', function ($rootScope){
  
    var scope;

    function getMockedData(){

      var SUBSCRIPTION = 'event:currentLocation-changed';
      var MOCKED_PREVIOUS_URL = '://path/to/previousMocked';
      var MOCKED_CURRENT_URL = '://path/to/currentMocked';
      var MOCKED_CURRENT_SECTION_URL = 'currentMocked';

      var mockedData = {
        subscription: SUBSCRIPTION,
        previousURL: MOCKED_PREVIOUS_URL,
        currentURL: MOCKED_CURRENT_URL,
        currentSectionURL: MOCKED_CURRENT_SECTION_URL
      };
      
      return mockedData;
    }

    // excuted before each "it" is run.
    beforeEach(function (){

      module('daniboomerangServices');
      module('ngResize');

      // inject services.
      inject(function($rootScope, _locationService_) {
        locationService = _locationService_;
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
      expect(locationService.subscribe()).toBe(getMockedData().subscription);
    }); 

    // check to see if they do what they are supposed to do.
    it('init should subscribe service for url events and broadcast the new location info', function (){
      
      // Lets call init()
      locationService.init();

      var expectedBroadcastedObject = {
        currentURL: getMockedData().currentURL,
        previousURL: getMockedData().previousURL,
        currentSectionURL: getMockedData().currentSectionURL
      }
      rootScope.$broadcast('$locationChangeSuccess', getMockedData().currentURL, getMockedData().previousURL);
      expect(rootScope.$broadcast).toHaveBeenCalledWith(getMockedData().subscription, expectedBroadcastedObject);
      
      // expected to correctly return the previous URL
      expect(locationService.getPreviousURL()).toBe(getMockedData().previousURL);
      // expected to correctly return the current URL
      expect(locationService.getCurrentURL()).toBe(getMockedData().currentURL);
      // expected to correctly return the current section URL
      expect(locationService.getCurrentSectionURL()).toBe(getMockedData().currentSectionURL);
    });
});