Ethereum = function() {
	'use strict';

	var abi = [{
	"constant":true,"inputs":[],"name":"vehicleOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"},{"name":"_optionalContactInformation","type":"string"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"highlights","outputs":[{"name":"id","type":"uint256"},{"name":"maker","type":"address"},{"name":"requestedReward","type":"uint256"},{"name":"optionalContactInformation","type":"string"},{"name":"description","type":"string"},{"name":"date","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"GiveHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"RevokeHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"DeleteExistingHighlight","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"name":"ChangeVehicleInformation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newState","type":"bool"}],"name":"SetHighlightRequestState","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"manufacturingYear","type":"uint256"}],"name":"VehicleInformationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"VehicleOwnershipPassed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"ErrorOccurred","type":"event"
	}];

	// For now, I should hardcode the address for each session.
	var contractAddress = "0x11ea2aacc3c0fa5ea9accc9f866556a547fdfe1d";
	//TODO: Make an inputfield which allows me to input this cursed thing, and remembers this variable during the whole development session.

	var MyContract = web3.eth.contract(abi);

	var contractInstance = MyContract.at(contractAddress);

	var currentAccount = web3.eth.defaultAccount;

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
	        contractInstance.vehicleOwner(function(e, val) {
	            Session.set('vehicleOwner', val);
	        });
	    }
	});

	return {

		contractAddress: function(){
			return contractAddress;
		},
		
		vehicleOwner: function (){
			return contractInstance.vehicleOwner();
		},

		vehicleModel: function(){
			return contractInstance.vehicleModel();
		},

		vehicleManufacturingYear: function (){
			return contractInstance.vehicleManufacturingYear();
		},
		
		currentAccount: function(){
			//Can't help but feel that this is a tad pointless and meaningless code.
			return currentAccount;
		},

		setCurrentAccount: function(_value){
			console.log("eth-functions.setCurrentAccount "+ _value);
			currentAccount = _value;
		},

		giveVehicleOwnership: function(_address) {
			console.log("In eth-functions:"+_address);
			
			contractInstance.GiveVehicleOwnership.sendTransaction({from:currentAccount, to:_address} );
			
		}

	}

}();

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
	return EthTools.formatBalance(wei, '0,0.0[00] unit', 'ether');
});

Template.registerHelper('allAccounts', function() {
	return EthAccounts.find().fetch();
});