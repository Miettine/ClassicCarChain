Ethereum.Events = (function () {

	'use strict';

	var contractAddress = Ethereum.contractAddress();

	var eventTimeFilter = {fromBlock:0, toBlock:'latest'};

	var contractForEvents = Ethereum.contractInstance;
	
	var keyVehicleInformationUpdated = "eVehicleInformationUpdated";
	var keyHighlightRequestMade = 'eHighlightRequestMade';
	var keyHighlightSavedToChain = 'eHighlightSavedToChain';
	var keyHighlightDeleted = 'eHighlightDeleted';
	var keyVehicleOwnershipPassed = 'eVehicleOwnershipPassed';
	var keyErrorOccurred ='eErrorOccurred';

	//The first empty object "{}" could be used to give filters to the event 
	// (such as having a specific address in a specific field)

	var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated({},eventTimeFilter);
	var eHighlightRequestMade = contractForEvents.EHighlightRequestMade({},eventTimeFilter);
	var eHighlightSavedToChain = contractForEvents.EHighlightSavedToChain({},eventTimeFilter);
	var eHighlightDeleted = contractForEvents.EHighlightDeleted({},eventTimeFilter);
	var eVehicleOwnershipPassed = contractForEvents.EVehicleOwnershipPassed({},eventTimeFilter);
	var eErrorOccurred = contractForEvents.EErrorOccurred({},eventTimeFilter);

	var arrayEVehicleInformationUpdated = [];
	var arrayEHighlightRequestMade = [];
	var arrayEHighlightSavedToChain = [];
	var arrayEHighlightDeleted = [];
	var arrayEVehicleOwnershipPassed = [];
	var arrayEErrorOccurred = [];

	function createEventWatcher(eventKey, eventObject, eventArray) {
		
		eventObject.watch(function(error, result){
			if (error) {
				console.log(eventKey+", eventObject.watch error: "+error);

				return;
			}
			
			eventArray.push(result.args);

			Session.set(eventKey, eventArray);
			
			// append details of result.args to UI
		});
	}

	createEventWatcher(keyVehicleInformationUpdated, eVehicleInformationUpdated, arrayEVehicleInformationUpdated);
	createEventWatcher(keyHighlightRequestMade, eHighlightRequestMade, arrayEHighlightRequestMade);
	createEventWatcher(keyHighlightSavedToChain, eHighlightSavedToChain, arrayEHighlightSavedToChain);
	createEventWatcher(keyHighlightDeleted, eHighlightDeleted, arrayEHighlightDeleted);
	createEventWatcher(keyVehicleOwnershipPassed, eVehicleOwnershipPassed, arrayEVehicleOwnershipPassed);
	createEventWatcher(keyErrorOccurred, eErrorOccurred, arrayEErrorOccurred);

	return {
		vehicleInformationUpdated: function () {
			return Session.get(keyVehicleInformationUpdated);
		},
		highlightRequestMade: function () {
			return Session.get(keyHighlightRequestMade);
		},
		highlightSavedToChain: function () {
			return Session.get(keyHighlightSavedToChain);
		},
		highlightDeleted:function () {
			return Session.get(keyHighlightDeleted);
		},
		vehicleOwnershipPassed:function () {
			return Session.get(keyVehicleOwnershipPassed);
		},
		errorOccurred:function () {
			return Session.get(keyErrorOccurred);
		}
	}
}());
