
Template.Contract.onCreated(function onCreated() {
	// contract abi
	var abi = [{
	[{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"RejectHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"},{"name":"_optionalContactInformation","type":"string"},{"name":"_message","type":"string"}],"name":"MakeHighlightRequest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"highlights","outputs":[{"name":"id","type":"uint256"},{"name":"maker","type":"address"},{"name":"requestedReward","type":"uint256"},{"name":"optionalContactInformation","type":"string"},{"name":"description","type":"string"},{"name":"date","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"GiveHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_givenAddress","type":"address"}],"name":"RevokeHighlightRequestRights","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"highlightIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"DeleteExistingHighlight","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleManufacturingYear","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"name":"ChangeVehicleInformation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"AcceptHighlightRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"GiveVehicleOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vehicleModel","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newState","type":"bool"}],"name":"SetHighlightRequestState","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_model","type":"string"},{"name":"_year","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"manufacturingYear","type":"uint256"}],"name":"VehicleInformationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightRequestMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightSavedToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightRequestRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"maker","type":"address"},{"indexed":false,"name":"highlightId","type":"uint256"}],"name":"HighlightDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"VehicleOwnershipPassed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"ErrorOccurred","type":"event"}]
	}];


	// creation of contract object
	var MyContract = web3.eth.contract(abi);

	// initiate contract for an address
	var myContractInstance = MyContract.at('0xc4abd0339eb8d57087278718986382264244252f');

	// call constant function
	var result = myContractInstance.myConstantMethod('myParam');
	console.log(result) // '0x25434534534'

});