Ethereum = (function() {
	'use strict';

	var abi = [{"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_reasonForDeletion","type":"string"}],"name":"DeleteExistingHighlight","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"highlights","outputs":[{"name":"id","type":"uint256"},{"name":"maker","type":"address"},{"name":"wasMadeByOwner","type":"bool"},{"name":"requestCreationDateTime","type":"uint256"},{"name":"additionToChainDateTime","type":"uint256"},{"name":"paidReward","type":"uint256"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"originBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"name":"UpdateVehicleInformation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlight","outputs":[{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_additionToChainDateTime","type":"uint256"},{"name":"_paidReward","type":"uint256"},{"name":"_description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"AddHighlightAsOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"highlightRequests","outputs":[{"name":"id","type":"uint256"},{"name":"maker","type":"address"},{"name":"requestCreationDateTime","type":"uint256"},{"name":"requestedReward","type":"uint256"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"}],"name":"UpdateVehicleModel","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlightRequest","outputs":[{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_requestedReward","type":"uint256"},{"name":"_description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint256"}],"name":"UpdateVehicleManufacturingYear","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"eventDateTime","type":"uint256"},{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"manufacturingYear","type":"uint256"}],"name":"EVehicleInformationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"additionToChainDateTime","type":"uint256"},{"indexed":false,"name":"madeByCurrentOwner","type":"bool"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rejectionDateTime","type":"uint256"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deletionDateTime","type":"uint256"},{"indexed":false,"name":"reasonForDeletion","type":"string"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"EHighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"EVehicleOwnershipPassed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"EErrorOccurred","type":"event"}];
	
	var contractAddress = "0xf45e98380d0cb1ee93ce19154b495aa2ab8c93d6";

	//Session.set('contractAddress', contractAddress );

	var MyContract = web3.eth.contract(abi);

	var m_contractInstance = MyContract.at(contractAddress);

	var keyContractAddress = "contractAddress";
	var keyHighlightIndex = "highlightIndex";
	var keyVehicleOwner = "vehicleOwner";
	var keyVehicleModel = "vehicleModel";
	var keyVehicleManufacturingYear = "vehicleManufacturingYear";
	var keyHighlightRequests = "highlightRequests";
	var keyHighlights = "highlights";

	Session.set(keyContractAddress, contractAddress);

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
    		m_contractInstance.highlightIndex(function(e, val) {
				Session.set(keyHighlightIndex, val);
			}),
			m_contractInstance.vehicleOwner(function(e, val) {
				Session.set(keyVehicleOwner, val);
			}),
			m_contractInstance.vehicleModel(function(e, val) {
				Session.set(keyVehicleModel, val);
			}),
			m_contractInstance.vehicleManufacturingYear(function(e, val) {
				Session.set(keyVehicleManufacturingYear,  val);
			}),
			m_contractInstance.highlightRequests(function(e, val) {
				Session.set(keyHighlightRequests,  val);
			}),
			m_contractInstance.highlights(function(e, val) {
				Session.set(keyHighlights,  val);
			});
	    }
	});

	return {

		contractInstance:m_contractInstance,

		setContractAddress: function(_address){
			Session.set(keyContractAddress, _address );
			console.log("eth-functions.setContractAddress "+ _address);
		},

		highlightIndex: function(){
			return Session.get(keyHighlightIndex);
		},

		contractAddress: function(){
			return Session.get(keyContractAddress);
		},
		
		vehicleOwner: function (){
			return Session.get(keyVehicleOwner);
		},

		vehicleModel: function(){
			return Session.get(keyVehicleModel);
		},

		vehicleManufacturingYear: function (){
			return Session.get(keyVehicleManufacturingYear);
		},

		highlightRequests: function (){
			return Session.get(keyHighlightRequests);
		},

		highlights: function (){
			return Session.get(keyHighlights);
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
		},

		addHiglightAsOwner: function (_message) {
			m_contractInstance.AddHighlightAsOwner.sendTransaction(_message, { from: Account.current(), gas:180000} );
		},

		makeHighlightRequest: function (_message, _amountInEther) {
			m_contractInstance.MakeHighlightRequest.sendTransaction(_message, _amountInEther, { from: Account.current() } );
		}


	}
}());


