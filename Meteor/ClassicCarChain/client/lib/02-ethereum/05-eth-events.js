Ethereum.Events = (function () {

	'use strict';

	var eventTimeFilter = {fromBlock:0, toBlock:'latest'};

	var contract = Ethereum.contractInstance()
	
	var keyHighlightRequestMade = 'keyHighlightRequestMade';
	var keyHighlightSavedToChain = 'keyHighlightSavedToChain';
	var keyHighlightDeleted = 'keyHighlightDeleted';
	var keyVehicleOwnershipPassed = 'keyVehicleOwnershipPassed';
	var keyHighlightRequestRejected = 'keyHighlightRequestRejected';

	//The first empty object "{}" could be used to give filters to the event 
	// (such as having a specific address in a specific field)

	//var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated({},eventTimeFilter);
	var eHighlightRequestMade = contract.EHighlightRequestMade({},eventTimeFilter);
	var eHighlightSavedToChain =  contract.EHighlightSavedToChain({},eventTimeFilter);
	var eHighlightDeleted =  contract.EHighlightDeleted({},eventTimeFilter);
	var eVehicleOwnershipPassed =  contract.EVehicleOwnershipPassed({},eventTimeFilter);
	var eHighlightRequestRejected =  contract.EHighlightRequestRejected({},eventTimeFilter);
	
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
			
			console.log(result.args);

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
/*
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
		}*/
	}
}());

