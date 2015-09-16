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

daniboomerangServices.factory('BENodeConnectionsService', function ($http){
	
	var connections = [];
	var dataNodeRemainingConnections, availableConnectionIndexes;

	return {
		init: function(){
			$http.get('/data/be-connections.json').then(function(response){
	          	connections = response.data.pairedConnections; 
	          	availableConnectionIndexes = response.data.availableConnectionIndexes;
				dataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		},
      	getAvailableConnectionIndexes: function(){
      		return availableConnectionIndexes;
      	},
      	getConnection: function(index){
      		availableConnectionIndexes.splice(index, 1); // LOCKING THE CONNECTION
      		return connections[index];
      	},
      	getConnections: function(){
      		return connections;
      	},
      	updateConnection: function(index, connection){
      		connections[index] = connection;
      		availableConnectionIndexes.push(index); // UNLOCKING THE CONNECTION
      	},
      	getNodeRemainingConnections: function(nodeName){
      		return dataNodeRemainingConnections[nodeName];
      	},
      	increaseNodeRemainingConnections: function(nodeName){
      		dataNodeRemainingConnections[nodeName]++;
      	},
      	decreaseNodeRemainingConnections: function(nodeName){
      		dataNodeRemainingConnections[nodeName]--;
      	}
	}	
});

daniboomerangServices.factory('FENodeConnectionsService', function ($http){
	
	var connections = [];
	var dataNodeRemainingConnections, availableConnectionIndexes;

	return {
		init: function(){
			$http.get('/data/fe-connections.json').then(function(response){
	          	connections = response.data.pairedConnections; 
	          	availableConnectionIndexes = response.data.availableConnectionIndexes;
				dataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		},
      	getAvailableConnectionIndexes: function(){
      		return availableConnectionIndexes;
      	},
      	getConnection: function(index){
      		availableConnectionIndexes.splice(index, 1); // LOCKING THE CONNECTION
      		return connections[index];
      	},
      	getConnections: function(){
      		return connections;
      	},
      	updateConnection: function(index, connection){
      		connections[index] = connection;
      		availableConnectionIndexes.push(index); // UNLOCKING THE CONNECTION
      	},
      	getNodeRemainingConnections: function(nodeName){
      		return dataNodeRemainingConnections[nodeName];
      	},
      	increaseNodeRemainingConnections: function(nodeName){
      		dataNodeRemainingConnections[nodeName]++;
      	},
      	decreaseNodeRemainingConnections: function(nodeName){
      		dataNodeRemainingConnections[nodeName]--;
      	}
	}	
});
