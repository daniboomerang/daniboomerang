var daniboomerangServices = angular.module('daniboomerangServices', []);

daniboomerangServices.factory('scrollObserverService', function ($rootScope, $location){

	var previousSection = 'cover'; // This will helps us to know the direction from
								   // where we are entering to a section

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
						$rootScope.$broadcast('active-section:cover');
						$rootScope.$broadcast('active-section:text');
					}
					if ('connectivity' == hash.substr(1)){
						$rootScope.$broadcast('active-section:connectivity');
						//if (previousSection == 'creativity') { $rootScope.$broadcast('active-section:connectivity-fromBottom'); }
						$rootScope.$broadcast('active-section:text');
					}
					if ('creativity' == hash.substr(1)){ 
						$rootScope.$broadcast('active-section:creativity');
						if (previousSection == 'connectivity') { $rootScope.$broadcast('active-section:creativity-fromTop'); }
					 }
					if ('remote-working' == hash.substr(1)){ $rootScope.$broadcast('active-section:remote-working'); }
					if ('without-boundaries' == hash.substr(1)){
						$rootScope.$broadcast('active-section:without-boundaries');
						if (previousSection == 'about') { $rootScope.$broadcast('active-section:without-boundaries-fromBottom'); }
					}
			        if ('about' == hash.substr(1)){
			        	$rootScope.$broadcast('active-section:about');
			        	$rootScope.$broadcast('active-section:text');
						//if (previousSection == 'without-boundaries') { $rootScope.$broadcast('active-section:about-fromTop'); }
			        }
					if ('back-end' == hash.substr(1)){ $rootScope.$broadcast('active-section:back-end'); }
			        if ('loving' == hash.substr(1)){ 
			        	$rootScope.$broadcast('active-section:loving');
			        	$rootScope.$broadcast('active-section:text');
			        }
					if ('front-end' == hash.substr(1)){ $rootScope.$broadcast('active-section:front-end'); }
			        if ('work' == hash.substr(1)){ 
			        	$rootScope.$broadcast('active-section:work');
			        	$rootScope.$broadcast('active-section:text');
			        	//if (previousSection == 'contact') { $rootScope.$broadcast('active-section:work-fromBottom'); }
			        }
			        if ('contact' == hash.substr(1)){ 
			        	$rootScope.$broadcast('active-section:contact');
			        	$rootScope.$broadcast('active-section:text');
			        }			        
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

		        // And we set the new inactive section as the previous section that was active
		        previousSection = hash.substr(1);
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

daniboomerangServices.factory('socialSharingService', function (){
	
	var socialDescription = "An amazing parallax universe aimed to show who I am and my job as web developer";
	var socialUrl = 'http://www.daniboomerang.com';
	var socialMedia = 'http://www.daniboomerang.com/images/dboom-universe.png';
	var socialType = 'website';
	var socialTitle = "Daniel Estevez - A creative portfolio";

	return {
		getSocialDescription: function (){ return socialDescription; },
		getSocialUrl: function (){ return socialUrl; },
		getSocialMedia: function (){ return socialMedia; },
		getSocialType: function (){ return socialType; },
		getSocialTitle: function (){ return socialTitle; }
	}	
});

daniboomerangServices.factory('cancelAsynchPromiseService', function ($interval, $timeout){
	
	return {
		cancelInterval: function (interval){
			$interval.cancel(interval);
			return interval = undefined;
		},
		cancelIntervals: function (intervals){
			for (var i=0; i<intervals.length; i++){
				$interval.cancel(intervals[i]);
				intervals[i] = undefined;
			}
			return intervals;
		},
		cancelTimeouts: function (timeouts){
			for (var i=0; i<timeouts.length; i++){
				$timeout.cancel(timeouts[i]);
				timeouts[i] = undefined;
			}
			return timeouts;
		}
	}	
});

daniboomerangServices.factory('nodeConnectionsService', function ($http){
	
	var BEConnections = [];
	var BEDataNodeRemainingConnections, BEAvailableConnectionIndexes;
	var FEConnections = [];
	var FEDataNodeRemainingConnections, FEAvailableConnectionIndexes;
	var earthConnections = [];
	var earthDataNodeRemainingConnections, earthAvailableConnectionIndexes;


	return {
		init: function(){
			$http.get('/data/be-connections.json').then(function(response){
	          	BEConnections = response.data.pairedConnections; 
	          	BEAvailableConnectionIndexes = response.data.availableConnectionIndexes;
				BEDataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		    $http.get('/data/fe-connections.json').then(function(response){
	          	FEConnections = response.data.pairedConnections; 
	          	FEAvailableConnectionIndexes = response.data.availableConnectionIndexes;
				FEDataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		    $http.get('/data/earth-connections.json').then(function(response){
	          	earthConnections = response.data.pairedConnections; 
	          	earthAvailableConnectionIndexes = response.data.availableConnectionIndexes;
				earthDataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		},
      	getAvailableConnectionIndexes: function(side){
      		if (side == 'BE') { return BEAvailableConnectionIndexes }
      		else if (side == 'FE') { return FEAvailableConnectionIndexes }
      		else { return earthAvailableConnectionIndexes }
      	},
      	getConnection: function(side, index){
      		if (side == 'BE') { BEAvailableConnectionIndexes.splice(index, 1); return BEConnections[index]; }
      		else if (side == 'FE') { FEAvailableConnectionIndexes.splice(index, 1); return FEConnections[index]; }
      		else { earthAvailableConnectionIndexes.splice(index, 1); return earthConnections[index]; }
      	},
      	getConnections: function(side){
      		if (side == 'BE') { return BEConnections }
      		else if (side == 'FE') { return FEConnections }
      		else { return earthConnections }
      	},
      	updateConnection: function(side, index, connection){
      		if (side == 'BE') { BEConnections[index] = connection; BEAvailableConnectionIndexes.push(index); }
      		else if (side == 'FE') { FEConnections[index] = connection; FEAvailableConnectionIndexes.push(index); }
      		else { earthConnections[index] = connection; earthAvailableConnectionIndexes.push(index); }
      	},
      	getNodeRemainingConnections: function(side, nodeName){
      		if (side == 'BE') { return BEDataNodeRemainingConnections[nodeName] }
      		else if (side == 'FE') { return FEDataNodeRemainingConnections[nodeName] }
      		else { return earthDataNodeRemainingConnections[nodeName] }
      	},
      	increaseNodeRemainingConnections: function(side, nodeName){
      		if (side == 'BE') { BEDataNodeRemainingConnections[nodeName]++ }
      		else if (side == 'FE') { FEDataNodeRemainingConnections[nodeName]++ }
      		else { earthDataNodeRemainingConnections[nodeName]++ }
      	},
      	decreaseNodeRemainingConnections: function(side, nodeName){
      		if (side == 'BE') { BEDataNodeRemainingConnections[nodeName]-- }
      		else if (side == 'FE') { FEDataNodeRemainingConnections[nodeName]-- }
      		else { earthDataNodeRemainingConnections[nodeName]-- }
      	},
        createDOMElementConnections: function(element, connections){
	        var DOMElementConnections = [];
	        var currentElement;
	        for (var i=0; i<connections.length; i++){
	          currentElement = { nodeA: {}, connectionAB: {}, nodeB: {} };
	          currentElement.nodeA = { elementConnection: element.find(connections[i].nodeA.connection),
	                                   elementShockWave: element.find(connections[i].nodeA.shockWave),
	                                   elementCenter: element.find(connections[i].nodeA.center) }
	          currentElement.connectionAB = { elementConnection: element.find(connections[i].connectionAB.name) }                                   
	          currentElement.nodeB = { elementConnection: element.find(connections[i].nodeB.connection),
	                                   elementShockWave: element.find(connections[i].nodeB.shockWave),
	                                   elementCenter: element.find(connections[i].nodeB.center) }
	          DOMElementConnections.push(currentElement);
	        }
	        return DOMElementConnections;
	    }
	}	
});