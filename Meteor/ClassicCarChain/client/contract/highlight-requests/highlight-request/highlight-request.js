Template.HighlightRequest.events( {

	'click #accept': function(){
    	console.log("You clicked accept "+ this.id);
    	Ethereum.Highlights.acceptRequest(this.id);
	},
	'click #decline': function(){
    	console.log("You clicked decline "+ this.id);
    	Ethereum.Highlights.rejectRequest(this.id);
	}
});