Ethereum = function() {
	'use strict';

	var abi = [{"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"},{"name":"_optionalContactInformation","type":"string"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"highlights","outputs":[{"name":"id","type":"uint256"},{"name":"maker","type":"address"},{"name":"requestedReward","type":"uint256"},{"name":"optionalContactInformation","type":"string"},{"name":"description","type":"string"},{"name":"date","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"GiveHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"RevokeHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"DeleteExistingHighlight","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"}],"name":"UpdateVehicleModel","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint256"}],"name":"UpdateVehicleManufacturingYear","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newState","type":"bool"}],"name":"SetHighlightRequestState","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"manufacturingYear","type":"uint256"}],"name":"EVehicleInformationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"EHighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"EHighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"EHighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"EHighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"EVehicleOwnershipPassed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"EErrorOccurred","type":"event"}];

	// For now, I should hardcode the address for each session.
	var contractAddress = "0x070d28ddc2dcc312cd601c41540fd4fdb73a982e";
	//TODO: Make an inputfield which allows me to input this cursed thing, and remembers this variable during the whole development session.

	//Session.set('contractAddress', contractAddress );

	var MyContract = web3.eth.contract(abi);

	var contractInstance = MyContract.at(contractAddress);

	Session.set('contractAddress', contractAddress);

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
			contractInstance.vehicleOwner(function(e, val) {
				Session.set('vehicleOwner', val);
			}),
			contractInstance.vehicleModel(function(e, val) {
				Session.set('vehicleModel', val);
			}),
			contractInstance.vehicleManufacturingYear(function(e, val) {
				Session.set('vehicleManufacturingYear',  val);
			});
	    }
	});
/*
	// Or pass a callback to start watching immediately
	var event = contractInstance.VehicleOwnershipPassed([{valueA: 23}] [, additionalFilterObject] , function(error, result){
	  	if (!error) {
			console.log(result);
	  	}
	});
*/
	var eVehicleOwnershipPassed = contractInstance.EVehicleOwnershipPassed();
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

/*
	var eVehicleOwnershipPassed = myContractInstance.VehicleOwnershipPassed(
		{some: 'args'}, {fromBlock: 0, toBlock: 'latest'}
	);

	eVehicleOwnershipPassed.watch(function(error, result) {
		console.log(result);
	});

	// would get all past logs again.
	var myResults = eVehicleOwnershipPassed.get(function(error, logs) { 
		console.log(logs);
	});*/
/*
//Here is another object inside the Ethereum-object. Accessed by typing "Ethereum.Events" in code.
// Disabled, for now. Should continue developing this, in case functions involving the events get more involved.
	eventsModule = {
	
		all: function(_address){
			return contractInstance.allEvents();
		}

 	};
*/
	return {
/*
		events: function(){
			return event;
		}, 
*/

		m_eventObject:eventObject,
		debugContractInstance:contractInstance, //For debugging purposes ONLY! Remove before release!

	m_eventObject: function(){
			return eventObject;
		},

		setContractAddress: function(_address){
			Session.set('contractAddress', _address );
			console.log("eth-functions.setContractAddress "+ _address);
		},

		contractAddress: function(){
			return Session.get('contractAddress');
		},
		
		vehicleOwner: function (){
			return Session.get('vehicleOwner');
		},

		vehicleModel: function(){
			return Session.get('vehicleModel');
		},

		vehicleManufacturingYear: function (){
			return Session.get('vehicleManufacturingYear');
		},

		giveVehicleOwnership: function(_newOwnerAddress) {
			contractInstance.GiveVehicleOwnership.sendTransaction(_newOwnerAddress, { from: Account.current() } );
		},

		updateVehicleModel: function(_newModel) {
			//console.log ("updateVehicleModel: "+_newModel);
			contractInstance.UpdateVehicleModel.sendTransaction(_newModel, { from: Account.current() } );
		},

		updateVehicleManufacturingYear: function (_newManufacturingYear) {
			//console.log ("updateVehicleManufacturingYear: "+_newManufacturingYear);
			contractInstance.UpdateVehicleManufacturingYear.sendTransaction(_newManufacturingYear, { from: Account.current() } );
		}
	}
}();

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
	return EthTools.formatBalance(wei, '0,0.0[00] unit', 'ether');
});

