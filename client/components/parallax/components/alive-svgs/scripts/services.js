'use strict';

/*
* @ngdoc module
* @name aliveSvgsServices
* @description
* Provides the data needed by some alive svgs
*/

var aliveSvgsServices = angular.module('aliveSvgsServices', []);

/*
* @ngdoc service
* @name nodeConnectionsService
* @module aliveSvgsServices
*
* @description
* Provides the combitation of the earth connections
* and maintains the state of those connections
*
* @param $http to read data from json
*/

aliveSvgsServices.factory('nodeConnectionsService', function ($http){
	
	var BEConnections = [];
	var BEDataNodeRemainingConnections, BEAvailableConnectionIndexes;
	var FEConnections = [];
	var FEDataNodeRemainingConnections, FEAvailableConnectionIndexes;
	var earthConnections = [];
	var earthDataNodeRemainingConnections, earthAvailableConnectionIndexes;
	

	return {
		init: function(componentBaseUrl){
			$http.get(componentBaseUrl + 'data/be-connections.json').then(function(response){
	          	BEConnections = response.data.pairedConnections; 
	          	BEAvailableConnectionIndexes = response.data.availableConnectionIndexes;
				BEDataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		    $http.get(componentBaseUrl + 'data/fe-connections.json').then(function(response){
	          	FEConnections = response.data.pairedConnections; 
	          	FEAvailableConnectionIndexes = response.data.availableConnectionIndexes;
				FEDataNodeRemainingConnections = response.data.dataNodeRemainingConnections;
		    });
		    $http.get(componentBaseUrl + 'data/earth-connections.json').then(function(response){
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