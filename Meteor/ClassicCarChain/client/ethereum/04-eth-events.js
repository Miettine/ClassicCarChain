Ethereum.Events = (function () {

	'use strict';

	var eventFilterObject = {fromBlock: 0, toBlock: 'latest', address: Ethereum.contractAddress()};

	var contractForEvents = Ethereum.contractInstance;

	var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated(eventFilterObject);
	var eHighlightRequestMade = contractForEvents.EHighlightRequestMade(eventFilterObject);
	var eHighlightSavedToChain = contractForEvents.EHighlightSavedToChain(eventFilterObject);
	var eHighlightDeleted = contractForEvents.EHighlightDeleted(eventFilterObject);
	var eVehicleOwnershipPassed = contractForEvents.EVehicleOwnershipPassed(eventFilterObject);
	var eErrorOccurred = contractForEvents.EErrorOccurred(eventFilterObject);

	var arrayEVehicleInformationUpdated =[];
	var arrayEHighlightRequestMade =[];
	var arrayEHighlightSavedToChain =[];
	var arrayEHighlightDeleted =[];
	var arrayEVehicleOwnershipPassed =[];
	var arrayEErrorOccurred =[];

	function createEventWatcher(eventName, eventObject, eventArray) {
		eventObject.get(function(error, logs){ 
			if (error) {
				console.log(eventName+", eventObject.get error: "+error);

				return;
			}
			
			//eventArray.push(logs);
			console.log(logs);
		});

		eventObject.watch(function(error, result){
			if (error) {
				console.log(eventName+", eventObject.watch error: "+error);

				return;
			}
			
			eventArray.push(result.args);

			//Session.set(eventName, eventArray);
			//console.log(eventArray);

			// append details of result.args to UI
		});
	}

	createEventWatcher("eVehicleInformationUpdated", eVehicleInformationUpdated, arrayEVehicleInformationUpdated);
	createEventWatcher("eHighlightRequestMade", eHighlightRequestMade, arrayEHighlightRequestMade);
	createEventWatcher("eHighlightSavedToChain", eHighlightSavedToChain, arrayEHighlightSavedToChain);
	createEventWatcher("eHighlightDeleted", eHighlightDeleted, arrayEHighlightDeleted);
	createEventWatcher("eVehicleOwnershipPassed", eVehicleOwnershipPassed, arrayEVehicleOwnershipPassed);
	createEventWatcher("eErrorOccurred", eErrorOccurred, arrayEErrorOccurred);

	return{
		vehicleInformationUpdated: function () {
			return Session.get('eVehicleInformationUpdated');
		},
		highlightRequestMade: function () {
			return Session.get('eHighlightRequestMade');
		},
		highlightSavedToChain: function () {
			return Session.get('eHighlightSavedToChain');
		},
		highlightDeleted:function () {
			return Session.get('eHighlightDeleted');
		},
		vehicleOwnershipPassed:function () {
			return Session.get('eVehicleOwnershipPassed');
		},
		errorOccurred:function () {
			return Session.get('eErrorOccurred');
		}
	}
}());