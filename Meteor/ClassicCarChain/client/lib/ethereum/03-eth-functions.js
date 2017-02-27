Ethereum = (function() {

	'use strict';

	var abi = [{"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_reasonForDeletion","type":"string"}],"name":"DeleteExistingHighlight","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_reward","type":"uint256"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"GetIndexFromHighlightsArray","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"originBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlight","outputs":[{"name":"_highlightType","type":"uint256"},{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_reward","type":"uint256"},{"name":"_message","type":"string"},{"name":"_approvedToChain","type":"bool"},{"name":"_madeByOwner","type":"bool"},{"name":"_additionToChainDateTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"AddHighlightAsOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetHighlightsArrayLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"EHighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"madeByOwner","type":"bool"},{"indexed":false,"name":"additionToChainDateTime","type":"uint256"}],"name":"EHighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rejectionDateTime","type":"uint256"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"EHighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deletionDateTime","type":"uint256"},{"indexed":false,"name":"reasonForDeletion","type":"string"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"madeByOwner","type":"bool"},{"indexed":false,"name":"additionToChainDateTime","type":"uint256"}],"name":"EHighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"EVehicleOwnershipPassed","type":"event"}];
	
	var contractAddress = "0xff92d62a500dc1acd41649e8485158030602ef3f";

	//Session.set('contractAddress', contractAddress );

	var MyContract = web3.eth.contract(abi);

	var m_contractInstance = MyContract.at(contractAddress);

	var keyHighlightIndex = "highlightIndex";
	var keyVehicleOwner = "keyVehicleOwner";
	var keyVehicleModel = "vehicleModel";
	var keyVehicleManufacturingYear = "vehicleManufacturingYear";
	var keyHighlightRequests = "highlightRequests";

	var keyHighlightsArrayLength = "keyHighlightsArrayLength"

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
    		m_contractInstance.highlightIndex(function(e, val) {
				Session.set(keyHighlightIndex, val);
			}),
			/*m_contractInstance.GetHighlightsArrayLength(function(e, val) {
				Session.set(keyHighlightsArrayLength, val);
			}),*/
			m_contractInstance.vehicleOwner(function(e, val) {
				Session.set(keyVehicleOwner, val);
			}),
			m_contractInstance.vehicleModel(function(e, val) {
				Session.set(keyVehicleModel, val);
			}),
			m_contractInstance.vehicleManufacturingYear(function(e, val) {
				Session.set(keyVehicleManufacturingYear,  val);
			})
	    }
	});

	return {

		contractInstance:m_contractInstance,

		numberOfHighlights: function(){
			return 10;//Helpers.convertBigNumber(Session.get(keyHighlightsArrayLength));
		},

		highlightIndex: function(){
			return Helpers.convertBigNumber( Session.get(keyHighlightIndex));
		},

		contractAddress: function(){
			return contractAddress;
		},
		/*
		setContractAddress: function(_address){
			Session.set(keyContractAddress, _address );
			console.log("eth-functions.setContractAddress "+ _address);
		},
		*/
		vehicleOwner: function(){
			return Session.get(keyVehicleOwner);
		},

		vehicleModel: function(){
			return Session.get(keyVehicleModel);
		},

		vehicleManufacturingYear: function(){
			return Helpers.convertBigNumber(Session.get(keyVehicleManufacturingYear));
		},

		giveVehicleOwnership: function(_newOwnerAddress) {
			m_contractInstance.GiveVehicleOwnership.sendTransaction(_newOwnerAddress, { from: Account.current() } );
		}
	}
}());


