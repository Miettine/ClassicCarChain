Template.MakeHighlightRequest.events( {
	'submit form': function(event) {
		event.preventDefault();

		var message = event.target.message.value;
		var requestedAmount = event.target.requestedAmount.value;
		
		Ethereum.makeHighlightRequest(message, requestedAmount);

	}
});