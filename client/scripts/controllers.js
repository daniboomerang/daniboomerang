var daniboomerangControllers = angular.module('daniboomerangControllers', []);

daniboomerangControllers.controller('LayoutController', function($scope){

	init();

	function init(){
		$scope.isToggledMenu = false;
	}

});

daniboomerangControllers.controller('NavController', function($scope){
	
	$scope.toggleMenu = function(){
		$scope.$parent.isToggledMenu = !$scope.$parent.isToggledMenu;
	}

	$scope.isToggledMenu = function(){
		return $scope.$parent.isToggledMenu;
	}

});
