Template.Offer.events( {

	'click .cancel-button': function(){
    	console.log("Clicked cancel offer");
    	Ethereum.Offers.cancelOwnershipChange();
	},

	'click .accept-button': function(){
    	console.log("Clicked gain ownership");
    	Ethereum.Offers.acceptOwnershipChange();
	}
});
