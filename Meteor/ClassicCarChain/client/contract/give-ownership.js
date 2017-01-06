Template.GiveOwnershipForm.events( {
	'submit form': function(event) {
		event.preventDefault();
		console.log("Form submitted");
		console.log(event.type);

		var address = event.target.newOwnerAddress.value;
		console.log("In ownershipFirm:"+address);

		Ethereum.giveVehicleOwnership(address);

	}
});