Template.GiveOwnershipForm.events( {
	'submit form': function(event) {
		event.preventDefault();
		console.log("Form submitted");
		console.log(event.type);

		var address = event.target.newOwnerAddress.value;
		console.log(address);

		web3.eth.defaultAccount = web3.eth.accounts[0];

		ContractInstance().GiveVehicleOwnership.sendTransaction(address);

	}
});