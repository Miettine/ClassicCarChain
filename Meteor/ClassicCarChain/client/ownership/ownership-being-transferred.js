Template.Offers.helpers( {

	Template.registerHelper('ownershipBeingTransferred', function() {
		return Ethereum.Offers.ownershipBeingTransferred();
	});
});