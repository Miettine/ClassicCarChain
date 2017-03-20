Template.Offer.events( {

	'click #accept': function(){
    	console.log("Clicked accept offer on "+ this.id);
    	Ethereum.Offers.accept(this.id);
	},

	'click #reject': function(){
    	console.log("Clicked reject/remove offer on "+ this.id);
    	Ethereum.Offers.rejectOrRemove(this.id);
	}
});

Template.Offer.helpers( {

	viewerIsOfferMaker: function () {
		var current = Account.current(); //Session.get('currentAccount')
	    var offerMaker = this.maker; //Session.get('vehicleOwner');
	    var currentAndMakerAreSame = current === offerMaker;
	    console.log("current:"+current+" offerMaker:"+offerMaker+" currentAndMakerAreSame:"+currentAndMakerAreSame);
	    //If either is undefined, then ownership cannot be determined
	    return currentAndMakerAreSame && (current != undefined) && (offerMaker != undefined);
	
	}
});