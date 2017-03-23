Ethereum.Events = (function () {

	'use strict';

	//var contractAddress = Ethereum.contractAddress();

	var eventTimeFilter = {fromBlock:0, toBlock:'latest'};
	
	
	var f_contractInstance = function (){
		return Ethereum.contractInstance();
	} 



	//The first empty object "{}" could be used to give filters to the event 
	// (such as having a specific address in a specific field)

	//var eVehicleInformationUpdated = contractForEvents.EVehicleInformationUpdated({},eventTimeFilter);
	
	var	keyEOfferRemoved = "keyEOfferRemoved";
	var	keyEOfferRejected ="keyEOfferRejected";
	var	keyEOfferAccepted = "keyEOfferAccepted";
	var	keyEHighlightRequestMade = "keyEHighlightRequestMade";
	var	keyEHighlightSavedToChain = "keyEHighlightSavedToChain";
	var	keyEHighlightRequestRejected = "keyEHighlightRequestRejected";
	var	keyEHighlightDeleted = "keyEHighlightDeleted";
	var	keyEVehicleOwnershipPassed = "keyEVehicleOwnershipPassed";

	var eOfferRemoved = f_contractInstance().EOfferRemoved({},eventTimeFilter);
	var eOfferRejected = f_contractInstance().EOfferRejected({},eventTimeFilter);
	var eOfferAccepted = f_contractInstance().EOfferAccepted({},eventTimeFilter);
	var eHighlightRequestMade = f_contractInstance().EHighlightRequestMade({},eventTimeFilter);
	var eHighlightSavedToChain = f_contractInstance().EHighlightSavedToChain({},eventTimeFilter);
	var eHighlightRequestRejected = f_contractInstance().EHighlightRequestRejected({},eventTimeFilter);
	var eHighlightDeleted = f_contractInstance().EHighlightDeleted({},eventTimeFilter);
	var eVehicleOwnershipPassed = f_contractInstance().EVehicleOwnershipPassed({},eventTimeFilter);

		console.log(eOfferRemoved);

	var arrayEOfferRemoved = [];
	var arrayEOfferRejected = [];
	var arrayEOfferAccepted = [];
	var arrayEHighlightRequestMade = [];
	var arrayEHighlightSavedToChain = [];
	var arrayEHighlightRequestRejected = [];
	var arrayEHighlightDeleted = [];
	var arrayEVehicleOwnershipPassed = [];


console.log("45");
	 var createEventWatcher = function (eventKey, eventObject, eventArray) {
		console.log("event:"+eventKey);
		console.log("48");

		eventObject.watch(function(error, result){
			console.log("50");
			console.log("event:"+eventKey);
			console.log(eventObject);
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

	createEventWatcher(keyEOfferRemoved, eOfferRemoved, arrayEOfferRemoved);
	createEventWatcher(keyEOfferRejected, eOfferRejected, arrayEOfferRejected);
	createEventWatcher(keyEOfferAccepted, eOfferAccepted, arrayEOfferAccepted);
	createEventWatcher(keyEHighlightRequestMade, eHighlightRequestMade, arrayEHighlightRequestMade);
	createEventWatcher(keyEHighlightSavedToChain, eHighlightSavedToChain, arrayEHighlightSavedToChain);
	createEventWatcher(keyEHighlightRequestRejected, eHighlightRequestRejected, arrayEHighlightRequestRejected);
	createEventWatcher(keyEHighlightDeleted, eHighlightDeleted, arrayEHighlightDeleted);
	createEventWatcher(keyEVehicleOwnershipPassed, eVehicleOwnershipPassed, arrayEVehicleOwnershipPassed);

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
		},
		get: function (_key) {
			return Session.get(_key);
		}
	}
}());

