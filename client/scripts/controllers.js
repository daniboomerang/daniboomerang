var daniboomerangControllers = angular.module('daniboomerangControllers', []);

daniboomerangControllers.controller('NavbarCtrl', function ($scope, $rootScope, locationService, responsivityService, sidebarDataProviderService){
	
	init();

	function init(){

		var SECTION_URL_FIELD = 'sectionURL';
		var SECTION_FIELD = 'section';
		var currentSectionURL = locationService.getCurrentSectionURL();

		$scope.responsiveData = responsivityService.getResponsiveData();

		// Navbar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});
		// Navbar subscribes to possible changes on responsivity
		$rootScope.$on(responsivityService.subscribeResize(), function(event, responsiveData) {
		    $scope.responsiveData = responsiveData;
		});
		$scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence(SECTION_URL_FIELD, currentSectionURL, SECTION_FIELD);
	}

	// Toggling sidebar menu on responsive
	$scope.toggleSidebarMenu = function(){
		responsivityService.toggleSidebarMenu();
	}

});

daniboomerangControllers.controller('ContentCtrl', function ($scope, $rootScope, $window, responsivityService){
	
	init();

	function init(){

		$scope.responsiveData = responsivityService.getResponsiveData();

		// Content subscribes to possible changes on responsivity
		$rootScope.$on(responsivityService.subscribeResize(), function(event, responsiveData) {
		    $scope.responsiveData = responsiveData;
		});
		// Content subscribes on responsive sidebar menu changes
		$rootScope.$on(responsivityService.subscribeSidebarToggling(), function(event, showResponsiveMenu) {
		    $scope.responsiveData.showResponsiveMenu = showResponsiveMenu;
		});
	}

	$scope.openResponsiveApp = function(){
		$window.open("http://localhost:8080/whatIveDone", "Daniboomerang", "width=767,height=600,resizable=1");
    }  	

});

daniboomerangControllers.controller('SidebarCtrl', function ($scope, $rootScope, locationService, sidebarDataProviderService){

	init();

	function init(){

		$scope.sidebar = {};
		$scope.sidebar.sectionsData = sidebarDataProviderService.getSidebarData();
		
		// Sidebar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});

		$scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence('sectionURL', locationService.getCurrentSectionURL(), 'section');
	}

});

daniboomerangControllers.controller('SidebarResponsiveCtrl', function ($scope, $rootScope, locationService, responsivityService, sidebarDataProviderService){

	init();

	function init(){
		$scope.sidebarResp = {};
		$scope.sidebarResp.sectionsData = sidebarDataProviderService.getSidebarData();
		$scope.responsiveData = responsivityService.getResponsiveData();
		$scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence('sectionURL', locationService.getCurrentSectionURL(), 'section');

		// Responsive sidebar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = sidebarDataProviderService.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});

		// Content subscribes on responsive sidebar menu changes
		$rootScope.$on(responsivityService.subscribeSidebarToggling(), function(event, showResponsiveMenu) {
		    $scope.responsiveData.showResponsiveMenu = showResponsiveMenu;
		});
	}

});