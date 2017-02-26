Template.MakeHighlightRequest.events( {
	'submit form': function(event) {
		event.preventDefault();

		var message = event.target.message.value;
		var requestedAmount = event.target.requestedAmount.value;
	
		console.log(requestedAmount);
		var big = new BigNumber(requestedAmount);

		console.log(big);
		Ethereum.Highlights.makeRequest( big, message);

	}
});