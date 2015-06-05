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
					if ('cover' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Cover'); }
					if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'creativity'); }
			        if ('about' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'About'); }
			        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Loving'); }
			        if ('work' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Work'); }
			        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Contact'); }
			        if ('BESide' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'BESide'); }
			        if ('FESide' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'FESide'); }
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        if ('cover' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Cover'); }
		        if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'creativity'); }
		        if ('about' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'About'); }
		        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Loving'); }
		        if ('work' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Work'); }
		        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Contact'); }
		        if ('BESide' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'BESide'); }
		        if ('FESide' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'FESide'); }
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