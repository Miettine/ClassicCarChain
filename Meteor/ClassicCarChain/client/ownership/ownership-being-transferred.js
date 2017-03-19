Template.OwnershipBeingTransferred.events( {

	'click #cancel': function(){
    	console.log("Clicked cancel offer");
    	Ethereum.Offers.cancelOwnershipChange();
	},

	'click #gain': function(){
    	console.log("Clicked gain ownership");
    	Ethereum.Offers.acceptOwnershipChange();
	}
});
