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
					if ('connectivity' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'connectivity'); }
					if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'creativity'); }
					if ('remoteWorking' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'remoteWorking'); }
			        if ('about' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'About'); }
					if ('BESide' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'BESide'); }
			        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Loving'); }
					if ('FESide' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'FESide'); }
			        if ('work' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Work'); }
			        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('event:activeArea', 'Contact'); }			        
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        if ('cover' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Cover'); }
		        if ('connectivity' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'connectivity'); }
		        if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'creativity'); }
		        if ('remoteWorking' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'remoteWorking'); }
		        if ('about' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'About'); }
		        if ('BESide' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'BESide'); }
		        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Loving'); }
		        if ('FESide' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'FESide'); }
		        if ('work' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Work'); }
		        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('event:inactiveArea', 'Contact'); }
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