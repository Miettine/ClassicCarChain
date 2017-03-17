Template.Offer.events( {

	'click .accept-offer': function(){
    	console.log("You clicked accept "+ this.id);
    	Ethereum.Offers.acceptOffer(this.id);
	}
});