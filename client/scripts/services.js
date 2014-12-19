var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('scrollObserverService', function ($rootScope, $location){
	
	var SHOW_HEADER_EVENT = 'event:show-header';
    var HIDE_HEADER_EVENT = 'event:hide-header';

	return {
		init: function (){
			$rootScope.$on('duScrollspy:becameActive', function($event, $element){
				var hash = $element.prop('hash');
				if ('cover' == hash.substr(1)){
		          $rootScope.$broadcast(HIDE_HEADER_EVENT, {});
		        }
				//Automaticly update location
				var hash = $element.prop('hash');
				if(hash) {
					var section = hash.replace('#', '');
					$location.path('/' + section);
					$rootScope.$apply();
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        console.log('Leaving ', hash.substr(1), ' area');
		        if ('cover' == hash.substr(1)){
		          $rootScope.$broadcast(SHOW_HEADER_EVENT, {});
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