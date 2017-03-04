Ethereum = (function() {

	'use strict';

	var abi = [{"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_reasonForDeletion","type":"string"}],"name":"DeleteExistingHighlight","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_reward","type":"uint256"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"GetIndexFromHighlightsArray","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"originBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"GetHighlight","outputs":[{"name":"_highlightType","type":"uint256"},{"name":"_maker","type":"address"},{"name":"_requestCreationDateTime","type":"uint256"},{"name":"_reward","type":"uint256"},{"name":"_message","type":"string"},{"name":"_approvedToChain","type":"bool"},{"name":"_madeByOwner","type":"bool"},{"name":"_additionToChainDateTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"AddHighlightAsOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetHighlightsArrayLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"EHighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"madeByOwner","type":"bool"},{"indexed":false,"name":"additionToChainDateTime","type":"uint256"}],"name":"EHighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rejectionDateTime","type":"uint256"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"requestedReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"EHighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"deletionDateTime","type":"uint256"},{"indexed":false,"name":"reasonForDeletion","type":"string"},{"indexed":false,"name":"highlightId","type":"uint256"},{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"requestCreationDateTime","type":"uint256"},{"indexed":false,"name":"paidReward","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"madeByOwner","type":"bool"},{"indexed":false,"name":"additionToChainDateTime","type":"uint256"}],"name":"EHighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"EVehicleOwnershipPassed","type":"event"}];
	

	//var keyContractAddress = "keyContractAddress";

	//var m_contractAddress = FlowRouter.getParam("address");

	var f_contractAddress = function(){
		var address= FlowRouter.getParam("address");
		if (address==null){
			console.log("null address");
			return "null";
		}
		console.log(address);
		return address;
		//return FlowRouter.getParam("_address");
		//Session.get(keyContractAddress);
	}
	
	/*var f_setContractAddress = function(_address){
		Session.set(keyContractAddress, _address );
		console.log("eth-functions.f_setContractAddress ");
		console.log(_address);
	}*/

	var CCCContract = web3.eth.contract(abi);

	var f_contractInstance = function(){

		var addr= f_contractAddress();

		console.log(addr);

		var obj = CCCContract.at(addr);

		console.log(obj);

		return obj;
	}


	var keyHighlightIndex = "highlightIndex";
	var keyVehicleOwner = "keyVehicleOwner";
	var keyVehicleModel = "vehicleModel";
	var keyVehicleManufacturingYear = "vehicleManufacturingYear";
	var keyHighlightRequests = "highlightRequests";

	var keyHighlightsArrayLength = "keyHighlightsArrayLength";
/*
	function setSessionVariable(eventKey, error, value) {
		if (!error){
			Session.set(eventKey, value);
		} else {
			console.log("Error at setSessionVariable: "+e);
		}
	}*/

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
   
			f_contractInstance().vehicleOwner(function(e, val) {
				Session.set(keyVehicleOwner, val);
			}),
			f_contractInstance().vehicleModel(function(e, val) {
				Session.set(keyVehicleModel, val);
				
			}),
			f_contractInstance().vehicleManufacturingYear(function(e, val) {
				Session.set(keyVehicleManufacturingYear,  val);
			});
/*
			var m_arrayLength = m_contractInstance.GetHighlightsArrayLength.call();
			setSessionVariable(keyHighlightsArrayLength, e,m_arrayLength);
	*/
	    } else {
	    	console.log("Error at listening eth-functions: " +e);
	    }
	});



	return {

		contractInstance: f_contractInstance,

		contractAddress: f_contractAddress,
		
		//setContractAddress: f_setContractAddress,
		
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


