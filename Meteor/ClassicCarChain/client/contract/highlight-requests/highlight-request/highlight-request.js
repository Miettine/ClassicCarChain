Template.HighlightRequest.events( {

	'click .accept-highlight': function(){
    	console.log("You clicked accept "+ this.id);
    	Ethereum.Highlights.acceptRequest(this.id);
	},
	'click .decline-highlight': function(){
    	console.log("You clicked decline "+ this.id);
    	Ethereum.Highlights.declineRequest(this.id);
	}
});