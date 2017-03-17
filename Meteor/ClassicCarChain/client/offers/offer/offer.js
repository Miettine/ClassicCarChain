Template.Offer.events( {

	'click .accept-offer': function(){
    	console.log("Clicked accept offer on "+ this.id);
    	Ethereum.Offers.acceptOffer(this.id);
	}
});

Template.Offer.helpers( {

	viewerIsOfferMaker: function () {
		var current = Account.current(); //Session.get('currentAccount')
	    var offerMaker = this.maker; //Session.get('vehicleOwner');
	    var currentAndMakerAreSame = current === sessionVehicleOwner;
	    console.log("current:"+current+" offerMaker:"+offerMaker+" currentAndMakerAreSame:"+currentAndMakerAreSame);
	    //If either is undefined, then ownership cannot be determined
	    return currentAndMakerAreSame && (current != undefined) && (offerMaker != undefined);
	
	}
});