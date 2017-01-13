//See Augmented pattern:
//http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

Ethereum = (function (events) {


	var eVehicleOwnershipPassed = contractInstance.EVehicleOwnershipPassed({fromBlock: 0, toBlock: 'latest'});
	var eventObject;
	eVehicleOwnershipPassed.watch(function(err, result) {
		if (err) {
			console.log("eVehicleOwnershipPassed, error: "+err);
			return;
		}
		console.log("eVehicleOwnershipPassed: "+result.args);
		eventObject=result.args;
		// check that result.args._from is web3.eth.coinbase then
		// display result.args._value in the UI and call    
		// exampleEvent.stopWatching()
	});


	Ethereum.eventObject = function () {
		return eventObject;
	};


	return Ethereum;

}(events));