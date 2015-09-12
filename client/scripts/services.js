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
		cancelInterval: function (intervalName){
			$interval.cancel(intervalName);
		}
	}	
});

daniboomerangServices.factory('nodeConnexionsService', function ($interval){
	
	var connections = [];
	var dataNodeRemainingConnections = {
		'nodeZero': { remainingConnections:1 },
		'nodeOne': { remainingConnections:2 },
		'nodeTwo': { remainingConnections:1 },
		'nodeFour': { remainingConnections:1 },
		'nodeSeven': { remainingConnections:1 },
	}
	// Connection 
    var connectionZeroOne =  { isActive: true,
                          nodeA: { name: 'nodeZero', elements: ['#ng-connection-node-0', '#ng-node-0'] },
                          connectionAB: { name: '#ng-connection-0-1' },
                          nodeB: { name: 'nodeOne', elements: ['#ng-node-1', '#ng-connection-node-1'] }
                        };
    var connectionOneTwo =  { isActive: true,
					      nodeA: { name: 'nodeOne', elements: ['#ng-connection-node-1', '#ng-node-1'] },
					      connectionAB: { name: '#ng-connection-1-2' },
					      nodeB: { name: 'nodeTwo', elements: ['#ng-node-2', '#ng-connection-node-2'] }
    };
    var connectionSevenFour =  { isActive: true,
					      nodeA: { name: 'nodeSeven', elements: ['#ng-connection-node-7', '#ng-node-7'] },
					      connectionAB: { name: '#ng-connection-7-4' },
					      nodeB: { name: 'nodeFour', elements: ['#ng-node-4', '#ng-connection-node-4'] }
    };
    connections.push(connectionZeroOne);
    connections.push(connectionOneTwo);
    connections.push(connectionSevenFour);

	return {
      	getConnections: function(){
      		return connections;
      	},
      	getNodeRemainingConnections: function(node){
      		return dataNodeRemainingConnections[node].remainingConnections;
      	},
      	increaseNodeRemainingConnections: function(node){
      		dataNodeRemainingConnections[node].remainingConnections++;
      	},
      	decreaseNodeRemainingConnections: function(node){
      		dataNodeRemainingConnections[node].remainingConnections--;
      	},
      	updateConnections: function(updatedConnections){
      		connections = updatedConnections;
      	}
	}	
});
