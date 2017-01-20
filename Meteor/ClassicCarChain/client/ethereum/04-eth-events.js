Ethereum = (function (Events) {

	

	var events = Ethereum.contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

	var arrayEVehicleInformationUpdated = [];
	var eVehicleInformationUpdated = Ethereum.contractInstance.EVehicleInformationUpdated({fromBlock: 0, toBlock: 'latest'});

	eVehicleInformationUpdated.watch(function(error, result){
		if (err) {
			console.log("eVehicleInformationUpdated, error: "+err);

			return;
		}
		
		arrayEVehicleInformationUpdated.push(result.args);

		Session.set('eVehicleInformationUpdated', arrayEVehicleInformationUpdated);
		console.log(arrayEVehicleInformationUpdated);
		// append details of result.args to UI
   });
/*
EVehicleInformationUpdated
EHighlightRequestMade
EHighlightSavedToChain
EHighlightDeleted
EVehicleOwnershipPassed
EErrorOccurred
*/
	Events.allEvents = function () {
		return arrayEVehicleInformationUpdated;
	};

	return Events;
}(Ethereum));