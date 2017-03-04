Ethereum.Events = (function () {

	'use strict';

	//var contractAddress = Ethereum.contractAddress();

	var eventTimeFilter = {fromBlock:0, toBlock:'latest'};

	var contractInstance = Ethereum.contractInstance();
	
	var keyHighlightRequestMade = 'eHighlightRequestMade';
	var keyHighlightSavedToChain = 'eHighlightSavedToChain';
	var keyHighlightDeleted = 'eHighlightDeleted';
	var keyVehicleOwnershipPassed = 'eVehicleOwnershipPassed';
	var keyHighlightRequestRejected = 'keyHighlightRequestRejected';

	//The first empty object "{}" could be used to give filters to the event 
	// (such as having a specific address in a specific field)

	//var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated({},eventTimeFilter);
	var eHighlightRequestMade = contractInstance.EHighlightRequestMade({},eventTimeFilter);
	var eHighlightSavedToChain = contractInstance.EHighlightSavedToChain({},eventTimeFilter);
	var eHighlightDeleted = contractInstance.EHighlightDeleted({},eventTimeFilter);
	var eVehicleOwnershipPassed = contractInstance.EVehicleOwnershipPassed({},eventTimeFilter);
	var eHighlightRequestRejected = contractInstance.EHighlightRequestRejected({},eventTimeFilter);
	
	var arrayEHighlightRequestMade = [];
	var arrayEHighlightSavedToChain = [];
	var arrayEHighlightDeleted = [];
	var arrayEVehicleOwnershipPassed = [];
	var arrayEHighlightRequestRejected = [];
/*
	function HighlightEvent(_array) {

		this.id = 0;

		this.highlightType = Helpers.convertBigNumber(_array[0]);
		
		this.emittedDateTime = 0;
		
		this.maker = _array[1];
		this.message = _array[4];
	}
	*/

	function createEventWatcher(eventKey, eventObject, eventArray) {
		
		eventObject.watch(function(error, result){
			if (error) {
				console.log(eventKey+", eventObject.watch error: "+error);

				return;
			}
			
			eventArray.push(result.args);
			
			//console.log(result.args);

			Session.set(eventKey, eventArray);
			
			// append details of result.args to UI
		});
	}

	createEventWatcher(keyHighlightRequestMade, eHighlightRequestMade, arrayEHighlightRequestMade);
	createEventWatcher(keyHighlightSavedToChain, eHighlightSavedToChain, arrayEHighlightSavedToChain);
	createEventWatcher(keyHighlightDeleted, eHighlightDeleted, arrayEHighlightDeleted);
	createEventWatcher(keyVehicleOwnershipPassed, eVehicleOwnershipPassed, arrayEVehicleOwnershipPassed);
	createEventWatcher(keyHighlightRequestRejected, eHighlightRequestRejected, arrayEHighlightRequestRejected );

	return {

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
		highlightRequestRejected:function () {
			return Session.get(keyHighlightRequestRejected);
		}
	}
}());

