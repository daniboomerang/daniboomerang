describe('Sidebar Data Provider Service', function (){
  
    // excuted before each "it" is run.
    beforeEach(function (){

      module('daniboomerangServices');
      module('daniboomerangMockedDataServiceProvider');

      // inject services.
      inject(function(mockedDataServiceProvider, _sidebarDataProviderService_,  _$httpBackend_)  {
        mockedData = mockedDataServiceProvider.getSidebarMockedData();
        $httpBackend = _$httpBackend_;
        sidebarDataProviderService = _sidebarDataProviderService_;
      });
    });
      
    // check to see if it has the expected functions
    it('should have all its expected functions', function () { 
        expect(angular.isFunction(sidebarDataProviderService.init)).toBe(true);
        expect(angular.isFunction(sidebarDataProviderService.getSidebarData)).toBe(true);
        expect(angular.isFunction(sidebarDataProviderService.getObjectFieldCorrespondence)).toBe(true);
    });

    // Init
    it('init should ....', function (){  

      $httpBackend.expectGET('common/data/sidebar-data.json').respond(mockedData.sectionsData);
    
      sidebarDataProviderService.init();
      $httpBackend.flush();

      expect(sidebarDataProviderService.getSidebarData()).toEqual(mockedData.sectionsData);

    });
});