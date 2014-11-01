var daniboomerangControllers = angular.module('daniboomerangControllers', []);

daniboomerangControllers.controller('LayoutCtrl', function ($scope){

	init();

	function init(){
		$scope.isToggledMenu = true;
		$scope.currentSection = "Who I am";
	}

});

daniboomerangControllers.controller('NavbarCtrl', function ($scope){
	
	$scope.toggleMenu = function(){
		$scope.$parent.isToggledMenu = !$scope.$parent.isToggledMenu;
	}

	$scope.isToggledMenu = function(){
		return $scope.$parent.isToggledMenu;
	}

});

daniboomerangControllers.controller('SidebarCtrl', function ($scope){
	

});

daniboomerangControllers.controller('SidebarResponsiveCtrl', function ($scope){

	$scope.isToggledMenu = function(){
		return $scope.$parent.isToggledMenu;
	}

});
