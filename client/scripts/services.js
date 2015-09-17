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
					if ('without-boundaries' == hash.substr(1)){ $rootScope.$broadcast('active-section:without-boundaries'); }
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
		        if ('without-boundaries' == hash.substr(1)){ $rootScope.$broadcast('inactive-section:without-boundaries'); }
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

daniboomerangServices.factory('cancelAsynchPromiseService', function ($interval){
	
	return {
		cancelInterval: function (interval){
			$interval.cancel(interval);
		}
	}	
});

daniboomerangServices.factory('nodeConnectionsService', function ($http){
	
	var BEConnections = [];
	var BEdataNodeRemainingConnections, BEavailableConnectionIndexes;
	var FEConnections = [];
	var FEdataNodeRemainingConnections, FEavailableConnectionIndexes;

	return {
		init: function(){
			$http.get('/data/be-connections.json').then(function(response){
	          	BEConnections = response.data.pairedConnections; 
	          	BEavailableConnectionIndexes = response.data.availableConnectionIndexes;
				BEdataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		    $http.get('/data/fe-connections.json').then(function(response){
	          	FEConnections = response.data.pairedConnections; 
	          	FEavailableConnectionIndexes = response.data.availableConnectionIndexes;
				FEdataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		},
      	getAvailableConnectionIndexes: function(side){
      		if (side == 'BE') { return BEavailableConnectionIndexes }
      		else return FEavailableConnectionIndexes;
      	},
      	getConnection: function(side, index){
      		if (side == 'BE') { BEavailableConnectionIndexes.splice(index, 1); return BEConnections[index]; }
      		else { FEavailableConnectionIndexes.splice(index, 1); return FEConnections[index]; }
      	},
      	getConnections: function(side){
      		if (side == 'BE') { return BEConnections }
      		else return FEConnections;
      	},
      	updateConnection: function(side, index, connection){
      		if (side == 'BE') { BEConnections[index] = connection; BEavailableConnectionIndexes.push(index); }
      		else { FEConnections[index] = connection; FEavailableConnectionIndexes.push(index);  }
      	},
      	getNodeRemainingConnections: function(side, nodeName){
      		if (side == 'BE') { return BEdataNodeRemainingConnections[nodeName]; }
      		else return FEdataNodeRemainingConnections[nodeName];
      	},
      	increaseNodeRemainingConnections: function(side, nodeName){
      		(side == 'BE') ? BEdataNodeRemainingConnections[nodeName]++ : FEdataNodeRemainingConnections[nodeName]++;
      	},
      	decreaseNodeRemainingConnections: function(side, nodeName){
      		(side == 'BE') ? BEdataNodeRemainingConnections[nodeName]-- : FEdataNodeRemainingConnections[nodeName]--;
      	}
	}	
});