var daniboomerangControllers = angular.module('daniboomerangControllers', []);

daniboomerangControllers.controller('NavbarCtrl', function ($scope, $rootScope, locationService, responsivityService, dataServices){
	
	init();

	function init(){

		$scope.responsiveData = responsivityService.getResponsiveData();

		// Navbar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = dataServices.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});
		// Navbar subscribes to possible changes on responsivity
		$rootScope.$on(responsivityService.subscribeResize(), function(event, responsiveData) {
		    $scope.responsiveData = responsiveData;
		});
		$scope.currentSection = locationService.getCurrentSection();

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

daniboomerangControllers.controller('SidebarCtrl', function ($scope, $rootScope, $http, locationService, dataServices){

	init();

	function init(){

		$scope.sidebar = {};
		$scope.sidebar.sectionsData = dataServices.getSidebarData();
		
		// Sidebar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = dataServices.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});

		$scope.currentSection = locationService.getCurrentSection();
	}

});

daniboomerangControllers.controller('SidebarResponsiveCtrl', function ($scope, $rootScope, $http, locationService, responsivityService, dataServices){

	init();

	function init(){
		$scope.sidebarResp = {};
		$scope.sidebarResp.sectionsData = dataServices.getSidebarData();
		$scope.responsiveData = responsivityService.getResponsiveData();
		$scope.currentSection = locationService.getCurrentSection();

		// Responsive sidebar subscribes to possible changes on URL
		$rootScope.$on(locationService.subscribe(), function(event, locationData) {
		    $scope.currentSection = dataServices.getObjectFieldCorrespondence('sectionURL', locationData.currentSectionURL, 'section');
		});

		// Content subscribes on responsive sidebar menu changes
		$rootScope.$on(responsivityService.subscribeSidebarToggling(), function(event, showResponsiveMenu) {
		    $scope.responsiveData.showResponsiveMenu = showResponsiveMenu;
		});
	}

});