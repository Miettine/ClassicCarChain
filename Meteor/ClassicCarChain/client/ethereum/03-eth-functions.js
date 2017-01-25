Ethereum = (function() {
	'use strict';

	var abi = [{"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_reasonForDeletion","type":"string"}],"name":"DeleteExistingHighlight","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"},{"name":"_optionalContactInformation","type":"string"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"originBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"name":"UpdateVehicleInformation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlight","outputs":[{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_additionToChainDateTime","type":"uint256"},{"name":"_paidReward","type":"uint256"},{"name":"_description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"AddHighlightAsOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"}],"name":"UpdateVehicleModel","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlightRequest","outputs":[{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_requestedReward","type":"uint256"},{"name":"_description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint256"}],"name":"UpdateVehicleManufacturingYear","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"eventDateTime","type":"uint256"},{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"manufacturingYear","type":"uint256"}],"name":"EVehicleInformationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"additionToChainDateTime","type":"uint256"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rejectionDateTime","type":"uint256"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deletionDateTime","type":"uint256"},{"indexed":false,"name":"reasonForDeletion","type":"string"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"EVehicleOwnershipPassed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"EErrorOccurred","type":"event"}];

	//Use the console to set the value at the beginning of each development session.
	var contractAddress = "";

	//Session.set('contractAddress', contractAddress );

	var MyContract = web3.eth.contract(abi);

	var m_contractInstance = MyContract.at(contractAddress);

	Session.set('contractAddress', contractAddress);

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
			m_contractInstance.vehicleOwner(function(e, val) {
				Session.set('vehicleOwner', val);
			}),
			m_contractInstance.vehicleModel(function(e, val) {
				Session.set('vehicleModel', val);
			}),
			m_contractInstance.vehicleManufacturingYear(function(e, val) {
				Session.set('vehicleManufacturingYear',  val);
			});
	    }
	});






	return {
/*
		debugContractInstance:contractInstance, //For debugging purposes ONLY! Remove before release!
		events:m_eventObject,

		eVehicleOwnershipPassed:obj_vehicleOwnershipPassed,
*/


		contractInstance:m_contractInstance,

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
			m_contractInstance.GiveVehicleOwnership.sendTransaction(_newOwnerAddress, { from: Account.current() } );
		},

		updateVehicleInformation: function(_newModel, _newManufacturingYear) {
			//console.log ("updateVehicleModel: "+_newModel);
			m_contractInstance.UpdateVehicleInformation.sendTransaction(_newModel, _newManufacturingYear, { from: Account.current() } );
		},

		updateVehicleModel: function(_newModel) {
			//console.log ("updateVehicleModel: "+_newModel);
			m_contractInstance.UpdateVehicleModel.sendTransaction(_newModel, { from: Account.current() } );
		},

		updateVehicleManufacturingYear: function (_newManufacturingYear) {
			//console.log ("updateVehicleManufacturingYear: "+_newManufacturingYear);
			m_contractInstance.UpdateVehicleManufacturingYear.sendTransaction(_newManufacturingYear, { from: Account.current() } );
		}


	}
}());


