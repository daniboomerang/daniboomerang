'use strict';

var cancelAsynchPromiseService = angular.module('cancelAsynchPromiseService', []);

cancelAsynchPromiseService.factory('cancelAsynchPromiseService', function ($interval, $timeout){
	
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
