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
					if ('cover' == hash.substr(1)){ $rootScope.$broadcast('active-section:cover'); }
					if ('connectivity' == hash.substr(1)){ $rootScope.$broadcast('active-section:connectivity'); }
					if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('active-section:creativity'); }
					if ('remote-working' == hash.substr(1)){ $rootScope.$broadcast('active-section:remote-working'); }
			        if ('about' == hash.substr(1)){ $rootScope.$broadcast('active-section:about'); }
					if ('back-end' == hash.substr(1)){ $rootScope.$broadcast('active-section:back-end'); }
			        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('active-section:loving'); }
					if ('front-end' == hash.substr(1)){ $rootScope.$broadcast('active-section:front-end'); }
			        if ('work' == hash.substr(1)){ $rootScope.$broadcast('active-section:work'); }
			        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('active-section:contact'); }			        
				}
			});
			$rootScope.$on('duScrollspy:becameInactive', function($event, $element){  
		        var hash = $element.prop('hash');
		        if ('cover' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:cover'); }
		        if ('connectivity' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:connectivity'); }
		        if ('creativity' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:creativity'); }
		        if ('remote-working' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:remote-working'); }
		        if ('about' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:about'); }
		        if ('back-end' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:back-end'); }
		        if ('loving' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:loving'); }
		        if ('front-end' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:front-end'); }
		        if ('work' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:work'); }
		        if ('contact' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:contact'); }
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