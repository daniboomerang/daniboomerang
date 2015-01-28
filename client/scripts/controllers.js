var daniboomerangControllers = angular.module('daniboomerangControllers', ['duParallax']);

daniboomerangControllers.controller('CoverCtrl', function ($scope){
	
});

daniboomerangControllers.controller('ContentCtrl', function ($scope, parallaxHelper){
	        $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

});
 