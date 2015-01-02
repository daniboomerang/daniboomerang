var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('scrollObserverService', function ($rootScope, $location){

	return {
		init: function (){
			$rootScope.$on('duScrollspy:becameActive', function($event, $element){
				var hash = $element.prop('hash');
				if(hash) {
					var section = hash.replace('#', '');
					//Automaticly update location
					$location.path('/' + section);
					$rootScope.$apply();
					if ('cover' == hash.substr(1)){
			          	$rootScope.$broadcast('event:activeArea', 'Cover');
			        }
			        if ('who-i-am' == hash.substr(1)){
			        	$rootScope.$broadcast('event:activeArea', 'Who I am');
			        }
			        if ('what-i-like' == hash.substr(1)){
			        	$rootScope.$broadcast('event:activeArea', 'What I like');
			        }
			        if ('what-ive-done' == hash.substr(1)){
			        	$rootScope.$broadcast('event:activeArea', 'What I´ve done');
			        }
			        if ('what-ive-learnt' == hash.substr(1)){
			        	$rootScope.$broadcast('event:activeArea', 'What I´ve learnt');
			        }
			        
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        if (('cover' == hash.substr(1))){
		        	$rootScope.$broadcast('event:inactiveArea', 'Cover');
		        }
		        if ('who-i-am' == hash.substr(1)){
		        	$rootScope.$broadcast('event:inactiveArea', 'Who I am');
		        }
		        if ('what-i-like' == hash.substr(1)){
		        	$rootScope.$broadcast('event:inactiveArea', 'What I like');
		        }
		        if ('what-ive-done' == hash.substr(1)){
		        	$rootScope.$broadcast('event:inactiveArea', 'What I´ve done');
		        }
		        if ('what-ive-learnt' == hash.substr(1)){
		        	$rootScope.$broadcast('event:inactiveArea', 'What I´ve learnt');
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