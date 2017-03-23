Ethereum.Events = (function () {

	'use strict';

	//var contractAddress = Ethereum.contractAddress();

	var eventTimeFilter = {fromBlock:0, toBlock:'latest'};
	
	var f_contractInstance = function (){
		return Ethereum.contractInstance();
	} 


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
	


	//The first empty object "{}" could be used to give filters to the event 
	// (such as having a specific address in a specific field)

	//var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated({},eventTimeFilter);
	
	var	keyEOfferRemoved : "keyEOfferRemoved";
	var	keyEOfferRejected :"keyEOfferRejected";
	var	keyEOfferAccepted : "keyEOfferAccepted";
	var	keyEHighlightRequestMade : "keyEHighlightRequestMade";
	var	keyEHighlightSavedToChain : "keyEHighlightSavedToChain";
	var	keyEHighlightRequestRejected : "keyEHighlightRequestRejected";
	var	keyEHighlightDeleted : "keyEHighlightDeleted";
	var	keyEVehicleOwnershipPassed : "keyEVehicleOwnershipPassed";

	var eOfferRemoved = f_contractInstance().EOfferRemoved({},eventTimeFilter);
	var eOfferRejected = f_contractInstance().EOfferRejected({},eventTimeFilter);
	var eOfferAccepted = f_contractInstance().EOfferAccepted({},eventTimeFilter);
	var eHighlightRequestMade = f_contractInstance().EHighlightRequestMade({},eventTimeFilter);
	var eHighlightSavedToChain = f_contractInstance().EHighlightSavedToChain({},eventTimeFilter);
	var eHighlightRequestRejected = f_contractInstance().EHighlightRequestRejected({},eventTimeFilter);
	var eHighlightDeleted = f_contractInstance().EHighlightDeleted({},eventTimeFilter);
	var eVehicleOwnershipPassed = f_contractInstance().EVehicleOwnershipPassed({},eventTimeFilter);
		
	var arrayEOfferRemoved = [];
	var arrayEOfferRejected = [];
	var arrayEOfferAccepted = [];
	var arrayEHighlightRequestMade = [];
	var arrayEHighlightSavedToChain = [];
	var arrayEHighlightRequestRejected = [];
	var arrayEHighlightDeleted = [];
	var arrayEVehicleOwnershipPassed = [];

	createEventWatcher(keyEOfferRemoved, eOfferRemoved, arrayEOfferRemoved);
	createEventWatcher(keyEOfferRejected, eOfferRejected, arrayEOfferRejected);
	createEventWatcher(keyEOfferAccepted, eOfferAccepted, arrayEOfferAccepted);
	createEventWatcher(keyEHighlightRequestMade, eHighlightRequestMade, arrayEHighlightRequestMade);
	createEventWatcher(keyEHighlightSavedToChain, eHighlightSavedToChain, arrayEHighlightSavedToChain);
	createEventWatcher(keyEHighlightRequestRejected, eHighlightRequestRejected, arrayEHighlightRequestRejected);
	createEventWatcher(keyEHighlightDeleted, eHighlightDeleted, arrayEHighlightDeleted);
	createEventWatcher(keyEVehicleOwnershipPassed, eVehicleOwnershipPassed, arrayEVehicleOwnershipPassed);

	return {

		get: function (_key) {
			return Session.get(_key);
		}
	}
}());

