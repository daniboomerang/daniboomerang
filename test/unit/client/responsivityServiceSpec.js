describe('Responsivity Service', function ($rootScope, $window){
  
    var scope;
    var mockedData;

    // excuted before each "it" is run.
    beforeEach(function (){

      module('daniboomerangServices');
      module('daniboomerangMockedDataServiceProvider');
      module('ngResize');

      // inject services.
      inject(function($rootScope, $window, _responsivityService_, mockedDataServiceProvider, _resize_) {
        window = $window;
        responsivityService = _responsivityService_;
        mockedData = mockedDataServiceProvider.getResponsivityMockedData();
        rootScope = $rootScope;
        resize = _resize_;
        spyOn(rootScope, '$broadcast').andCallThrough();
      });
    });
      
    // check to see if it has the expected functions
    it('should have all its expected functions', function () { 
        expect(angular.isFunction(responsivityService.init)).toBe(true);
        expect(angular.isFunction(responsivityService.subscribeResize)).toBe(true);
        expect(angular.isFunction(responsivityService.subscribeSidebarToggling)).toBe(true);
        expect(angular.isFunction(responsivityService.getResponsiveData)).toBe(true);
        expect(angular.isFunction(responsivityService.toggleSidebarMenu)).toBe(true);
    });

    // check the subscription is correctly returned
    it('should return the broadcasted event for the subscriptions when someone attends to subscribe', function (){
      expect(responsivityService.subscribeResize()).toBe(mockedData.subscriptionResize);
      expect(responsivityService.subscribeSidebarToggling()).toBe(mockedData.subscriptionTogglingSidebar);
    }); 

    // check to see if they do what they are supposed to do.
    it('should initialise correctly subscribing to resize event and broadcasting resize data correctly', function (){
      
      responsivityService.init();

      var expectedBroadcastedObject = {
        width: mockedData.width,
        height: mockedData.height,
        isResponsive: mockedData.isResponsive
      };

      // Preparing the triggering of resize event, so the service is listening and will get the mocked data
      // that we want
      window.innerWidth = mockedData.width;
      window.innerHeight = mockedData.height;
      resize.trigger();
      expect(rootScope.$broadcast).toHaveBeenCalledWith(mockedData.subscriptionResize, expectedBroadcastedObject);
      
      // expected to correctly return the corrent 
      expect(responsivityService.getResponsiveData()).toEqual(expectedBroadcastedObject);
      
    });

    // check to see if they do what they are supposed to do.
    it('should toggle the responsive menu and broadcast new responsive data', function (){

      responsivityService.toggleSidebarMenu();
      var showResponsiveMenuMocked = true;

      // Preparing the triggering of resize event, so the service is listening and will get the mocked data
      // that we want
      window.innerWidth = mockedData.widthResponsive;
      window.innerHeight = mockedData.heightResponsive;
      resize.trigger();
      expect(rootScope.$broadcast).toHaveBeenCalledWith(mockedData.subscriptionTogglingSidebar, showResponsiveMenuMocked);
      
      // expected to correctly return the corrent 
      expect(responsivityService.getResponsiveData().showResponsiveMenu).toEqual(showResponsiveMenuMocked);
      
    });
});