var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('scrollObserverService', function ($rootScope, $location){

	return {
		init: function (){
			$rootScope.$on('duScrollspy:becameActive', function($event, $element){
				var hash = $element.prop('hash');
				//Automaticly update location
				if(hash) {
					var section = hash.replace('#', '');
					$location.path('/' + section);
					$rootScope.$apply();
					if ('cover' == hash.substr(1)){
			          $rootScope.$broadcast('event:hide-navbar', {});
			        }
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        console.log('Leaving ', hash.substr(1), ' area');
		        if ('cover' == hash.substr(1)){
		          $rootScope.$broadcast('event:expand-navbar', {});
		        }
		    });
		}
	}
});


daniboomerangServices.factory('urlObserverService', function ($rootScope, $location){
	
	var onPageReload = true;

	return {
		init: function (){
			$rootScope.$on("$locationChangeSuccess", function (event, current, previous, rejection) {
				if (onPageReload){
					onPageReload = false;
					$location.path('/');
				}
			});
		}
	}	
});